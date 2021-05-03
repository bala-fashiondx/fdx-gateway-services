
export const RecInputSchema = {
  schema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      merchant_id: {
        type: 'string',
      },
      category: {
        type: 'string',
      },
      type: {
        type: 'string',
        enum: ['fabrics', 'apparels', 'test', 'mix_match'],
      },
      combination_type:{
        type: 'string',
        enum: ['ensemble', 'duplets'],
      },
      body_type: {
        type: 'string',
      },
      filters: {
        type: 'object',
        additionalProperties: true,
        properties: {
          match_with_category:{
            type: 'object',
            additionalProperties: true,
            properties: {
              top_wear: {
                type: 'string',
              },
              bottom_wear:{
                type: 'string',
              },
              outer_wear:{
                type: 'string',
              },
            }
          },
          store_id: {
            type: 'string',
          },
          fabric_id: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          stock_id: {
            type: 'string',
          },
          style_id: {
            type: 'string',
          },
          exclude_style_id: {
            type: 'string',
          },
          colors: {
            type: 'array',
            minItems: 0,
            uniqueItems: true,
            items: {
              type: 'string',
            },
          },
          patterns: {
            type: 'array',
            minItems: 0,
            uniqueItems: true,
            items: {
              type: 'string',
            },
          },
          occasions: {
            type: 'array',
            minItems: 0,
            uniqueItems: true,
            items: {
              type: 'string',
            },
          },
          price_min: {
            type: 'number',
          },
          price_max: {
            type: 'number',
          }
        },
        required: [],
      },
      must_not_filters: {
        type: 'object',
        additionalProperties: true,
        properties: {
          match_with_category:{
            type: 'object',
            additionalProperties: true,
            properties: {
              top_wear: {
                type: 'string',
              },
              bottom_wear:{
                type: 'string',
              },
              outer_wear:{
                type: 'string',
              },
            }
          },
          store_id: {
            type: 'string',
          },
          fabric_id: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          stock_id: {
            type: 'string',
          },
          style_id: {
            type: 'string',
          },
          exclude_style_id: {
            type: 'string',
          },
          colors: {
            type: 'array',
            minItems: 0,
            uniqueItems: true,
            items: {
              type: 'string',
            },
          },
          patterns: {
            type: 'array',
            minItems: 0,
            uniqueItems: true,
            items: {
              type: 'string',
            },
          },
          occasions: {
            type: 'array',
            minItems: 0,
            uniqueItems: true,
            items: {
              type: 'string',
            },
          },
          price_min: {
            type: 'number',
          },
          price_max: {
            type: 'number',
          }
        },
        required: [],
      },
      ecomm_filters: {
        type: 'array',
        items:{
          type: 'object',
           additionalProperties: true,
           properties: {
          match_with_category:{
            type: 'object',
            additionalProperties: true,
            properties: {
              top_wear: {
                type: 'string',
              },
              bottom_wear:{
                type: 'string',
              },
              outer_wear:{
                type: 'string',
              },
            }
          },
          profileKey:{
            type: 'string',
          },
          filterName:{
            type: 'string',
          },
          store_id: {
            type: 'string',
          },
          fabric_id: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          stock_id: {
            type: 'string',
          },
          style_id: {
            type: 'string',
          },
          exclude_style_id: {
            type: 'string',
          },
          colors: {
            type: 'array',
            minItems: 0,
            uniqueItems: true,
            items: {
              type: 'string',
            },
          },
          patterns: {
            type: 'array',
            minItems: 0,
            uniqueItems: true,
            items: {
              type: 'string',
            },
          },
          occasions: {
            type: 'array',
            minItems: 0,
            uniqueItems: true,
            items: {
              type: 'string',
            },
          },
          price_min: {
            type: 'number',
          },
          price_max: {
            type: 'number',
          }
        },
        required: [],
        },        
      },
      sort_by: {
        type: 'object',
        additionalProperties: false,
        properties: {
          field: {
            type: 'string',
            enum: ['recommended', 'price_max','price_min'],
            default: 'recommended',
          },
          order: {
            type: 'string',
            enum: ['asc', 'desc'],
            default: 'desc',
          },
        },
        required: ['field', 'order'],
      },
      metric: {
        type: 'string',
        enum: ['search_appearances', 'clicks', 'trials', 'add_to_carts', 'purchases', 'ctr', 'cvr'],
        default: 'ctr',
      },
      pagination: {
        type: 'object',
        additionalProperties: false,
        properties: {
          offset: {
            type: 'number',
            default: 0,
          },
          size: {
            type: 'number',
            default: 10,
          },
        },
        required: [],
      },
      match_wear: {
        type: 'string'
      },
      fabric_category: {
        type: 'string'
      }
    },
    required: ['merchant_id','filters'],
  },
};
