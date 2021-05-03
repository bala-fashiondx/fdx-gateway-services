import { inject } from '@loopback/core';
import { AnyObject, AnyType } from '@loopback/repository';
import { api, getModelSchemaRef, post, requestBody, param, get } from '@loopback/rest';
import { EcommService } from '../services';

let env = process.env.NODE_ENV ;

if(!env){
  env = "dev";
}

const baseUrl = '/' + env

@api({
  basePath: baseUrl,
  paths: {},
})
export class EcommApiGatewayController {
  constructor(
    @inject('services.EcommService')
    protected ecommService: EcommService
  ) {}

  @get('ecomm/{merchant_id}/{portfolio}/getFilters', {
    responses: {
      '200': {
        description: 'Get Filters',
        content: { 'application/json': { schema: getModelSchemaRef(AnyType) } },
      },
    },
  })
  async filters(
    @param.path.string('merchant_id') 
    merchant_id: string,
    @param.path.string('portfolio') 
    portfolio: string,
    @param.query.string('category') category: string): Promise<string> {
    const response = await this.ecommService.filters(merchant_id,portfolio,category);
    return response;
  }

  @get('ecomm/{merchant_id}/{portfolio}/getCategory', {
    responses: {
      '200': {
        description: 'Get Filters',
        content: { 'application/json': { schema: getModelSchemaRef(AnyType) } },
      },
    },
  })
  async categories(
    @param.path.string('merchant_id') 
    merchant_id: string,
    @param.path.string('portfolio') 
    portfolio: string): Promise<string> {
    const response = await this.ecommService.categories(merchant_id,portfolio);
    return response;
  }

  @post('ecomm/{merchant_id}/profile_form', {
    responses: {
      '200': {
        description: 'Get Filters',
        content: { 'application/json': { schema: getModelSchemaRef(AnyType) } },
      },
    },
  })
  async profile_form(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            item: getModelSchemaRef(AnyType, {includeRelations: true}),
          },
        },
      },
    })
    input: AnyObject,
    @param.path.string('merchant_id') 
    merchant_id: string): Promise<string> {
    const response = await this.ecommService.profile_form(input,merchant_id);
    return response;
  }

  @post('ecomm/{merchant_id}/body_profile', {
    responses: {
      '200': {
        description: 'Get Filters',
        content: { 'application/json': { schema: getModelSchemaRef(AnyType) } },
      },
    },
  })
  async body_profile(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            item: getModelSchemaRef(AnyType, {includeRelations: true}),
          },
        },
      },
    })
    input: AnyObject,
    @param.path.string('merchant_id') 
    merchant_id: string): Promise<string> {
    const response = await this.ecommService.body_profile(input,merchant_id);
    return response;
  }

  @post('ecomm/{merchant_id}/mix_match/type/{type}', {
    responses: {
      '200': {
        description: 'Get Filters',
        content: { 'application/json': { schema: getModelSchemaRef(AnyType) } },
      },
    },
  })
  async mix_match(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AnyType),
        },
      },
    })
    input: AnyObject,
    @param.path.string('merchant_id') merchant_id: string,
    @param.path.string('type') type: string): Promise<string> {
    const response = await this.ecommService.mix_match(input,merchant_id,type);
    return response;
  }

  @post('ecomm/{merchant_id}/products/type/{type}', {
    responses: {
      '200': {
        description: 'Get Filters',
        content: { 'application/json': { schema: getModelSchemaRef(AnyType) } },
      },
    },
  })
  async get_products(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AnyType),
        },
      },
    })
    input: AnyObject,
    @param.path.string('merchant_id') merchant_id: string,
    @param.path.string('type') type: string): Promise<string> {
    const response = await this.ecommService.get_products(input,merchant_id,type);
    return response;
  }

}
