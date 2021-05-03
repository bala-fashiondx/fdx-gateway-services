"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("@loopback/rest");
const context_1 = require("@loopback/context");
const health_check_status_model_1 = require("../models/health-check-status.model");
/**
 * A simple controller to check health-status of the server
 */
let HealthCheckController = class HealthCheckController {
    constructor(req) {
        this.req = req;
    }
    check() {
        return new health_check_status_model_1.HealthCheckStatus({
            health_status: 'Up',
        });
    }
};
__decorate([
    rest_1.get('/health-check', {
        responses: {
            '200': {
                description: 'Health Check Status',
                content: {
                    'application/json': { schema: { 'x-ts-type': health_check_status_model_1.HealthCheckStatus } },
                },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", health_check_status_model_1.HealthCheckStatus)
], HealthCheckController.prototype, "check", null);
HealthCheckController = __decorate([
    __param(0, context_1.inject(rest_1.RestBindings.Http.REQUEST)),
    __metadata("design:paramtypes", [Object])
], HealthCheckController);
exports.HealthCheckController = HealthCheckController;
//# sourceMappingURL=health-check.controller.js.map