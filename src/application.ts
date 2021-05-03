import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, BindingScope} from '@loopback/core';
import {RestExplorerBindings, RestExplorerComponent} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication, LogError, RestBindings} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import {DefaultSequence} from './sequence';
import {Graceful} from './graceful';
import * as path from 'path';
import {DatasourceConfigBuilder} from './datasources/helpers';
import {EcommDataSource} from './datasources';

// Import logger.
const logger = require('../utils/logger');

export class Application extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
  appName: string;
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set app name.
    this.appName = options.appName;

    // Bind app configuration.
    this.bind('fdx.app.config').to(options);

    // Set up the custom sequence
    this.sequence(DefaultSequence);

    // Set up root directory.
    this.projectRoot = __dirname;

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });

    // Mount Rest-Explorer component on the app.
    this.component(RestExplorerComponent);

    // FIXME This needs further exploration, could be better.
    // Bind LOG_ERROR to custom logger.
    this.bind(RestBindings.SequenceActions.LOG_ERROR).to(this.logError);

    // Configure Elasticsearch
    // Create datasource configuration from the app configuration.
    const ecommConfig = new DatasourceConfigBuilder(options, 'ecomm_service');
    // Bind datasource configuration as singleton.
    this.bind('fdx.ecomm.config')
      .to(ecommConfig.get())
      .inScope(BindingScope.SINGLETON);

    // Bind datasource.
    this.bind('fdx.datasources.ecomm').toClass(EcommDataSource);

    // Bind Graceful class as singleton
    this.bind('fdx.scripts.graceful')
      .toClass(Graceful)
      .inScope(BindingScope.SINGLETON);


    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  // TODO: look into providers
  logError: LogError = error => {
    logger.error(`${error.message}`, {
      eventType: 'ERROR',
      eventSubType: error.name,
      stack: error.stack,
    });
  };

  async start() {
    const graceful = await this.get<Graceful>('fdx.scripts.graceful');
    await graceful.start();

    // await super.start();
  };

  async stop() {
    /*
     * This is where you would do whatever is necessary before stopping your
     * app (graceful closing of connections, flushing buffers, etc).
     */
    const graceful = await this.get<Graceful>('fdx.scripts.graceful');

    /*
     * The superclass stop method will call stop on all servers that are
     * bound to the application.
     */
    await graceful.stop();
    await super.stop();
  };
}
