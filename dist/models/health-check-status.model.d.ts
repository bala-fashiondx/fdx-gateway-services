import { Model } from '@loopback/repository';
export declare class HealthCheckStatus extends Model {
    health_status: string;
    constructor(data?: Partial<HealthCheckStatus>);
}
