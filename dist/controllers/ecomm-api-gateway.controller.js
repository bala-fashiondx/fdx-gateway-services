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
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
let env = process.env.NODE_ENV;
if (!env) {
    env = "dev";
}
const baseUrl = '/' + env;
let EcommApiGatewayController = class EcommApiGatewayController {
    constructor(ecommService) {
        this.ecommService = ecommService;
    }
    async filters(merchant_id, portfolio, category) {
        const response = await this.ecommService.filters(merchant_id, portfolio, category);
        return response;
    }
    async categories(merchant_id, portfolio) {
        const response = await this.ecommService.categories(merchant_id, portfolio);
        return response;
    }
    async profile_form(input, merchant_id) {
        const response = await this.ecommService.profile_form(input, merchant_id);
        return response;
    }
    async body_profile(input, merchant_id) {
        const response = await this.ecommService.body_profile(input, merchant_id);
        return response;
    }
    async mix_match(input, merchant_id, type) {
        const response = await this.ecommService.mix_match(input, merchant_id, type);
        return response;
    }
    async get_products(input, merchant_id, type) {
        const response = await this.ecommService.get_products(input, merchant_id, type);
        return response;
    }
};
__decorate([
    rest_1.get('ecomm/{merchant_id}/{portfolio}/getFilters', {
        responses: {
            '200': {
                description: 'Get Filters',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(repository_1.AnyType) } },
            },
        },
    }),
    __param(0, rest_1.param.path.string('merchant_id')),
    __param(1, rest_1.param.path.string('portfolio')),
    __param(2, rest_1.param.query.string('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], EcommApiGatewayController.prototype, "filters", null);
__decorate([
    rest_1.get('ecomm/{merchant_id}/{portfolio}/getCategory', {
        responses: {
            '200': {
                description: 'Get Filters',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(repository_1.AnyType) } },
            },
        },
    }),
    __param(0, rest_1.param.path.string('merchant_id')),
    __param(1, rest_1.param.path.string('portfolio')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EcommApiGatewayController.prototype, "categories", null);
__decorate([
    rest_1.post('ecomm/{merchant_id}/profile_form', {
        responses: {
            '200': {
                description: 'Get Filters',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(repository_1.AnyType) } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    item: rest_1.getModelSchemaRef(repository_1.AnyType, { includeRelations: true }),
                },
            },
        },
    })),
    __param(1, rest_1.param.path.string('merchant_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EcommApiGatewayController.prototype, "profile_form", null);
__decorate([
    rest_1.post('ecomm/{merchant_id}/body_profile', {
        responses: {
            '200': {
                description: 'Get Filters',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(repository_1.AnyType) } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    item: rest_1.getModelSchemaRef(repository_1.AnyType, { includeRelations: true }),
                },
            },
        },
    })),
    __param(1, rest_1.param.path.string('merchant_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EcommApiGatewayController.prototype, "body_profile", null);
__decorate([
    rest_1.post('ecomm/{merchant_id}/mix_match/type/{type}', {
        responses: {
            '200': {
                description: 'Get Filters',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(repository_1.AnyType) } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(repository_1.AnyType),
            },
        },
    })),
    __param(1, rest_1.param.path.string('merchant_id')),
    __param(2, rest_1.param.path.string('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], EcommApiGatewayController.prototype, "mix_match", null);
__decorate([
    rest_1.post('ecomm/{merchant_id}/products/type/{type}', {
        responses: {
            '200': {
                description: 'Get Filters',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(repository_1.AnyType) } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(repository_1.AnyType),
            },
        },
    })),
    __param(1, rest_1.param.path.string('merchant_id')),
    __param(2, rest_1.param.path.string('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], EcommApiGatewayController.prototype, "get_products", null);
EcommApiGatewayController = __decorate([
    rest_1.api({
        basePath: baseUrl,
        paths: {},
    }),
    __param(0, core_1.inject('services.EcommService')),
    __metadata("design:paramtypes", [Object])
], EcommApiGatewayController);
exports.EcommApiGatewayController = EcommApiGatewayController;
//# sourceMappingURL=ecomm-api-gateway.controller.js.map