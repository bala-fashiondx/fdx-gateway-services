import {Request, RestBindings, get} from '@loopback/rest';
import {inject} from '@loopback/context';
import {HealthCheckStatus} from '../models/health-check-status.model';

/**
 * A simple controller to check health-status of the server
 */
export class HealthCheckController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @get('/health-check', {
    responses: {
      '200': {
        description: 'Health Check Status',
        content: {
          'application/json': {schema: {'x-ts-type': HealthCheckStatus}},
        },
      },
    },
  })
  check(): HealthCheckStatus {
    return new HealthCheckStatus({
      health_status: 'Up',
    });
  }
}
