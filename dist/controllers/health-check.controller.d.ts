/// <reference types="express" />
import { Request } from '@loopback/rest';
import { HealthCheckStatus } from '../models/health-check-status.model';
/**
 * A simple controller to check health-status of the server
 */
export declare class HealthCheckController {
    private req;
    constructor(req: Request);
    check(): HealthCheckStatus;
}
