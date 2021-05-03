import { Provider } from '@loopback/core';
import { EcommDataSource } from '../datasources';
export interface EcommService {
    checkHealth(): Promise<any>;
    mix_match(reqObj: any, merchant_id: string, type: string): Promise<any>;
    categories(merchant_id: string, portfolio: string): Promise<any>;
    filters(merchant_id: string, portfolio: string, category: string): Promise<any>;
    profile_form(reqObj: any, merchant_id: string): Promise<any>;
    body_profile(reqObj: any, merchant_id: string): Promise<any>;
    get_products(reqObj: any, merchant_id: string, type: string): Promise<any>;
}
export declare class EcommServiceProvider implements Provider<EcommService> {
    protected dataSource: EcommDataSource;
    constructor(dataSource?: EcommDataSource);
    value(): Promise<EcommService>;
}
