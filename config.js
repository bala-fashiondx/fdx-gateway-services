const convict = require('convict');
const fs = require('fs');

// Default 'dev' environment configuration
const config = convict({
  name: {
    doc: 'Application name',
    format: String,
    default: 'Recommendation Service',
    env: 'APP_NAME',
  },
  env: {
    doc: 'Application environment',
    format: ['dev', 'test', 'staging', 'prod'],
    default: 'dev',
    env: 'NODE_ENV',
  },
  host: {
    doc: 'Server host name',
    format: 'ipaddress',
    default: '0.0.0.0',
    env: 'HOST',
  },
  port: {
    doc: 'Server port',
    format: 'port',
    default: 3009,
    env: 'PORT',
  },
  datasources: {
    ecomm_service: {
      base_url: {
        doc: 'Ecomm Base URL',
        format: 'url',
        default: 'http://fdx-ap-south-1-dev-lb-30a06202197f4692.elb.ap-south-1.amazonaws.com:3008/',
        env: 'ELASTICSEARCH_CLUSTER_URL',
      }
    },
  },
  params: {
    timeout: {
      doc: 'Time interval(ms) to complete requests before destroying all open connections',
      format: Number,
      default: 1000,
      env: 'GRACEFUL_TIMEOUT',
    },
    metric: {
      doc: 'Metric to use as a tie-breaker while serving recommendations',
      format: ['search_appearances', 'clicks', 'trials', 'add_to_carts', 'purchases', 'ctr', 'cvr'],
      default: 'ctr',
      env: 'METRIC',
    },
  },
});

// Load the environment-specific configuration
const env = config.get('env');
// Check if environment-specific configuration file exists
// else use default 'dev' configuration
if (fs.existsSync('./config/' + env + '.json')) {
  config.loadFile('./config/' + env + '.json');
}
// Perform validation
config.validate({allowed: 'strict'});

module.exports = config;
