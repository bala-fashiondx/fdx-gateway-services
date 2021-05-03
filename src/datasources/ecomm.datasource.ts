import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './ecomm.datasource.json';

export class EcommDataSource extends juggler.DataSource {
  static dataSourceName = 'ecomm_service';

  constructor(
    @inject('fdx.ecomm.config', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
