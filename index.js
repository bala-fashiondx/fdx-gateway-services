const application = require('./dist');
const logger = require('./utils/logger');
const config = require('./config.js');

// Function to log common errors in catch block
const logAppError = (eventType = '', error = {}, exiting = false) => {  
  logger.error(`${error.message}`, {
    eventType,
    eventSubType: error.name,
    stack: error.stack,
  }); 
  if (exiting) {
    logger.info('Exiting', {
      eventType: 'INFO',
      eventSubType: 'APP_STOP',
    });
  }  
}

module.exports = application;

if (require.main === module) {
  // Pass the configuration.
  const appConfig = {
    appName: config.get('name'),
    rest: {
      host: config.get('host'),
      port: config.get('port'),
      // TODO Add basePath for the API
      //basePath: '/api/v1/body-profile/',

      /*
       * Would like to keep the following configuration
       * for serving OpenAPI spec across all LB4 apps.
       * If required, will make it configurable.
       */
      openApiSpec: {
        // useful when used with OASGraph to locate your application
        setServersFromRequest: true,
        servers: [{url: 'http://127.0.0.1:80'}],
        endpointMapping: {
          '/openapi.json': {version: '3.0.0', format: 'json'},
          '/openapi.yaml': {version: '3.0.0', format: 'yaml'},
        },
      },
      apiExplorer: {
        disabled: true,
      },
    },
    datasources: {
      ecomm_service: {
        base_url: config.get('datasources.ecomm_service.base_url'),
        },
    },
    params: {
      timeout: config.get('params.timeout'),
      metric: config.get('params.metric'),
    },
  };

  // Run the application.
  application
    .main(appConfig)
    .then(app => {
      // Add application-wide event-listeners here.
      process.on('unhandledRejection', (reason, promise) => {
        logAppError('UNHANDLED_REJECTION', err);

        app
          .stop()
          .then(() => {
            process.exit(1);
          })
          .catch(error => {
            logAppError('GRACEFUL_STOP_FAILED', error, true);
            process.exit(1);
          });
      });

      process.on('uncaughtException', err => {
        logAppError('UNCAUGHT_EXCEPTION', err);
        app
          .stop()
          .then(() => {
            process.exit(1);
          })
          .catch(error => {
            logAppError('GRACEFUL_STOP_FAILED', error, true);
            process.exit(1);
          });
      });

      process.on('SIGTERM', () => {
        logger.info('SIGTERM signal recieved', {
          eventType: 'INFO',
          eventSubType: 'SIGTERM',
        });
        app
          .stop()
          .then(() => {
            process.exit(0);
          })
          .catch(error => {
            logAppError('SIGTERM_STOP_FAILED', error, true);
            process.exit(1);
          });
      });

      process.on('SIGINT', () => {
        logger.info('SIGINT signal recieved', {
          eventType: 'INFO',
          eventSubType: 'SIGINT',
        });
        app
          .stop()
          .then(() => {
            process.exit(0);
          })
          .catch(error => {
            logAppError('SIGINT_STOP_FAILED', error, true);
            process.exit(1);
          });
      });
    })
    .catch(err => {
      // Exit after logging to file.
      logAppError('GRACEFUL_START_FAILED',  err, true);
      process.exit(1);
    });
}
