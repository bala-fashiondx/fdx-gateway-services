import { juggler } from '@loopback/repository';
export declare class EcommDataSource extends juggler.DataSource {
    static dataSourceName: string;
    constructor(dsConfig?: object);
}
