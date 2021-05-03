import { ApplicationConfig } from '@loopback/core';
export declare class DatasourceConfigBuilder {
    configValues: {
        [key: string]: string;
    };
    defaultConfig: object;
    ecommServiceConfig: object;
    constructor(appConfig: ApplicationConfig, datasourceKey: string, ecommServiceConfig?: object);
    getDefaultConfig(datasourceKey: string): object;
    buildConfig(): object;
    get(): object;
}
