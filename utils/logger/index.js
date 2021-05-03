const fdxLogger = require('@fashiondx/fdx-logger-module');

// environment
const env = process.env.NODE_ENV || 'dev';

// Log level
const level = env === 'dev' ? 'debug' : 'info';

// Service name to be used for meta
const serviceName = process.env.APP_NAME || 'gateway-service';

const logger = fdxLogger.getLogger(env, level, serviceName);

module.exports = logger;