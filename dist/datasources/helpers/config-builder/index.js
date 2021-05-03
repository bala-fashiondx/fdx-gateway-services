"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ECOMM_SERVICE_CONFIG = require("../../ecomm.datasource.json");
// A class to manipulate datasource(in this case,  ecomm_service REST API)
// configuration. This allows us to configure both application and database
// from a single source (config.js).
// NOTE: the configuration defined in config.js can be overidden using
// environment variables.
class DatasourceConfigBuilder {
    constructor(appConfig, datasourceKey, ecommServiceConfig = ECOMM_SERVICE_CONFIG) {
        this.configValues = appConfig.datasources[datasourceKey];
        this.ecommServiceConfig = ecommServiceConfig;
        this.defaultConfig = Object.assign({}, this.getDefaultConfig(datasourceKey));
    }
    // Returns the default configuration for a given datasource using it's key, if found
    // otherwise return an empty object
    getDefaultConfig(datasourceKey) {
        let config;
        switch (datasourceKey) {
            case 'ecomm_service': {
                config = this.ecommServiceConfig;
                break;
            }
            default: {
                config = {};
                break;
            }
        }
        return config;
    }
    // Builds the datasource configuration by replacing '${}' strings
    // in default configuration with appropriate configuration parameters
    // defined in the provided configuration.
    buildConfig() {
        // If default configuration is an empty object, return default configuration
        if (Object.keys(this.defaultConfig).length === 0) {
            return this.defaultConfig;
        }
        let defaultConfig = JSON.stringify(this.defaultConfig);
        const configValues = this.configValues;
        for (const key in configValues) {
            defaultConfig = defaultConfig.split('${' + key + '}').join(configValues[key]);
        }
        return JSON.parse(defaultConfig);
    }
    // Returns the built datasource configuration
    get() {
        const config = this.buildConfig();
        return config;
    }
}
exports.DatasourceConfigBuilder = DatasourceConfigBuilder;
//# sourceMappingURL=index.js.map