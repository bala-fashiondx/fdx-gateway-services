/// <reference types="node" />
import { ApplicationConfig } from '@loopback/core';
import { Application } from './application';
import * as http from 'http';
import { Socket } from 'net';
import { EcommService } from './services';
export declare class Graceful {
    private app;
    private config;
    private server;
    private ecommService;
    connections: {
        [key: string]: Socket;
    };
    constructor(app: Application, config: ApplicationConfig, server: http.Server, ecommService: EcommService);
    start(): Promise<void>;
    stop(): Promise<void>;
}
