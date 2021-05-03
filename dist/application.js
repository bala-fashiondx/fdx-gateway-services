"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boot_1 = require("@loopback/boot");
const core_1 = require("@loopback/core");
const rest_explorer_1 = require("@loopback/rest-explorer");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const service_proxy_1 = require("@loopback/service-proxy");
const sequence_1 = require("./sequence");
const graceful_1 = require("./graceful");
const path = require("path");
const helpers_1 = require("./datasources/helpers");
const datasources_1 = require("./datasources");
// Import logger.
const logger = require('../utils/logger');
class Application extends boot_1.BootMixin(service_proxy_1.ServiceMixin(repository_1.RepositoryMixin(rest_1.RestApplication))) {
    constructor(options = {}) {
        super(options);
        // TODO: look into providers
        this.logError = error => {
            logger.error(`${error.message}`, {
                eventType: 'ERROR',
                eventSubType: error.name,
                stack: error.stack,
            });
        };
        // Set app name.
        this.appName = options.appName;
        // Bind app configuration.
        this.bind('fdx.app.config').to(options);
        // Set up the custom sequence
        this.sequence(sequence_1.DefaultSequence);
        // Set up root directory.
        this.projectRoot = __dirname;
        // Set up default home page
        this.static('/', path.join(__dirname, '../public'));
        // Customize @loopback/rest-explorer configuration here
        this.bind(rest_explorer_1.RestExplorerBindings.CONFIG).to({
            path: '/explorer',
        });
        // Mount Rest-Explorer component on the app.
        this.component(rest_explorer_1.RestExplorerComponent);
        // FIXME This needs further exploration, could be better.
        // Bind LOG_ERROR to custom logger.
        this.bind(rest_1.RestBindings.SequenceActions.LOG_ERROR).to(this.logError);
        // Configure Elasticsearch
        // Create datasource configuration from the app configuration.
        const ecommConfig = new helpers_1.DatasourceConfigBuilder(options, 'ecomm_service');
        // Bind datasource configuration as singleton.
        this.bind('fdx.ecomm.config')
            .to(ecommConfig.get())
            .inScope(core_1.BindingScope.SINGLETON);
        // Bind datasource.
        this.bind('fdx.datasources.ecomm').toClass(datasources_1.EcommDataSource);
        // Bind Graceful class as singleton
        this.bind('fdx.scripts.graceful')
            .toClass(graceful_1.Graceful)
            .inScope(core_1.BindingScope.SINGLETON);
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
    async start() {
        const graceful = await this.get('fdx.scripts.graceful');
        await graceful.start();
        // await super.start();
    }
    ;
    async stop() {
        /*
         * This is where you would do whatever is necessary before stopping your
         * app (graceful closing of connections, flushing buffers, etc).
         */
        const graceful = await this.get('fdx.scripts.graceful');
        /*
         * The superclass stop method will call stop on all servers that are
         * bound to the application.
         */
        await graceful.stop();
        await super.stop();
    }
    ;
}
exports.Application = Application;
//# sourceMappingURL=application.js.map