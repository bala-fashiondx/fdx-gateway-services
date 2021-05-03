import { AnyObject } from '@loopback/repository';
import { EcommService } from '../services';
export declare class EcommApiGatewayController {
    protected ecommService: EcommService;
    constructor(ecommService: EcommService);
    filters(merchant_id: string, portfolio: string, category: string): Promise<string>;
    categories(merchant_id: string, portfolio: string): Promise<string>;
    profile_form(input: AnyObject, merchant_id: string): Promise<string>;
    body_profile(input: AnyObject, merchant_id: string): Promise<string>;
    mix_match(input: AnyObject, merchant_id: string, type: string): Promise<string>;
    get_products(input: AnyObject, merchant_id: string, type: string): Promise<string>;
}
