import { getService } from '@loopback/service-proxy';
import { inject, Provider } from '@loopback/core';
import { EcommDataSource } from '../datasources';
import { AnyType } from '@loopback/repository';

export interface EcommService {
  // this is where you define the Node.js methods that will be
  // mapped to the SOAP operations as stated in the datasource
  // json file.
  checkHealth():Promise<any>;
  mix_match(reqObj:any,merchant_id:string,type:string): Promise<any>;
  categories(merchant_id:string,portfolio:string): Promise<any>;
  filters(merchant_id:string,portfolio:string,category:string): Promise<any>;
  profile_form(reqObj:any,merchant_id:string): Promise<any>;
  body_profile(reqObj:any,merchant_id:string): Promise<any>;
  get_products(reqObj:any,merchant_id:string,type:string): Promise<any>;
}

export class EcommServiceProvider implements Provider<EcommService> {
  constructor(
    // elasticsearch must match the name property in the datasource json file
    @inject('fdx.datasources.ecomm')
    protected dataSource: EcommDataSource = new EcommDataSource(),
  ) { }

  value(): Promise<EcommService> {
    return getService(this.dataSource);
  }
}
