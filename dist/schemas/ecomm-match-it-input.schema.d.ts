export declare const EcommMatchItInputSchema: {
    schema: {
        type: string;
        additionalProperties: boolean;
        properties: {
            merchant_id: {
                type: string;
            };
            category: {
                type: string;
            };
            type: {
                type: string;
                enum: string[];
            };
            combination_type: {
                type: string;
                enum: string[];
            };
            body_type: {
                type: string;
            };
            filters: {
                type: string;
                additionalProperties: boolean;
                properties: {
                    match_with_category: {
                        type: string;
                        additionalProperties: boolean;
                        properties: {
                            top_wear: {
                                type: string;
                            };
                            bottom_wear: {
                                type: string;
                            };
                            outer_wear: {
                                type: string;
                            };
                        };
                    };
                    store_id: {
                        type: string;
                    };
                    fabric_id: {
                        type: string;
                    };
                    description: {
                        type: string;
                    };
                    stock_id: {
                        type: string;
                    };
                    style_id: {
                        type: string;
                    };
                    exclude_style_id: {
                        type: string;
                    };
                    colors: {
                        type: string;
                        minItems: number;
                        uniqueItems: boolean;
                        items: {
                            type: string;
                        };
                    };
                    patterns: {
                        type: string;
                        minItems: number;
                        uniqueItems: boolean;
                        items: {
                            type: string;
                        };
                    };
                    occasions: {
                        type: string;
                        minItems: number;
                        uniqueItems: boolean;
                        items: {
                            type: string;
                        };
                    };
                    price_min: {
                        type: string;
                    };
                    price_max: {
                        type: string;
                    };
                };
                required: never[];
            };
            ecomm_filters: {
                type: string;
                items: {
                    type: string;
                    additionalProperties: boolean;
                    properties: {
                        match_with_category: {
                            type: string;
                            additionalProperties: boolean;
                            properties: {
                                top_wear: {
                                    type: string;
                                };
                                bottom_wear: {
                                    type: string;
                                };
                                outer_wear: {
                                    type: string;
                                };
                            };
                        };
                        profileKey: {
                            type: string;
                        };
                        filterName: {
                            type: string;
                        };
                        combination_type: {
                            type: string;
                        };
                        store_id: {
                            type: string;
                        };
                        fabric_id: {
                            type: string;
                        };
                        description: {
                            type: string;
                        };
                        stock_id: {
                            type: string;
                        };
                        style_id: {
                            type: string;
                        };
                        exclude_style_id: {
                            type: string;
                        };
                        colors: {
                            type: string;
                            minItems: number;
                            uniqueItems: boolean;
                            items: {
                                type: string;
                            };
                        };
                        patterns: {
                            type: string;
                            minItems: number;
                            uniqueItems: boolean;
                            items: {
                                type: string;
                            };
                        };
                        occasions: {
                            type: string;
                            minItems: number;
                            uniqueItems: boolean;
                            items: {
                                type: string;
                            };
                        };
                        price_min: {
                            type: string;
                        };
                        price_max: {
                            type: string;
                        };
                    };
                    required: never[];
                };
            };
            sort_by: {
                type: string;
                additionalProperties: boolean;
                properties: {
                    field: {
                        type: string;
                        enum: string[];
                        default: string;
                    };
                    order: {
                        type: string;
                        enum: string[];
                        default: string;
                    };
                };
                required: string[];
            };
            metric: {
                type: string;
                enum: string[];
                default: string;
            };
            pagination: {
                type: string;
                additionalProperties: boolean;
                properties: {
                    offset: {
                        type: string;
                        default: number;
                    };
                    size: {
                        type: string;
                        default: number;
                    };
                };
                required: never[];
            };
            match_wear: {
                type: string;
            };
            fabric_category: {
                type: string;
            };
        };
        required: string[];
    };
};
