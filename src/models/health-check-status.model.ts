import {Model, model, property} from '@loopback/repository';

@model({settings: {}})
export class HealthCheckStatus extends Model {
  @property({
    type: 'string',
    required: true,
  })
  health_status: string;

  constructor(data?: Partial<HealthCheckStatus>) {
    super(data);
  }
}
