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
const application_1 = require("./application");
const http = require("http");
// TODO: convert to imports
const logger = require('../utils/logger');
const wait = require('../utils/wait');
let Graceful = class Graceful {
    constructor(app, config, server, ecommService) {
        this.app = app;
        this.config = config;
        this.server = server;
        this.ecommService = ecommService;
        this.connections = {};
    }
    /*
     * Graceful start operation
     * Performs following operations in the following order:
     * 1. Check if Elasticsearch cluster is up and running.
     * 2. Start listening for connections at http-server.
     */
    async start() {
        // 1. Check if Elasticsearch is up and running.
        try {
            logger.info('Checking EcommService  status', {
                eventType: 'INFO',
                eventSubType: 'ES_HEALTH',
            });
            const response = await this.ecommService.checkHealth();
            //TODO: Ideally atleast two nodes should be there with cluster status being 'green'
            if (response) {
                logger.info('Ecomm Service is healthy', {
                    eventType: 'INFO',
                    eventSubType: 'ES_HEALTHY',
                });
            }
            else {
                throw new Error('Ecomm Service is unhealthy');
            }
        }
        catch (error) {
            logger.error(`${error.message}`, {
                eventType: "ECOMM_SERVICE_UNHEALTHY",
                eventSubType: error.name,
                stack: error.stack,
            });
            throw error;
        }
        // 2. Start listening for connections at http-server.
        try {
            const host = this.config.rest.host;
            const port = this.config.rest.port;
            const url = `http://${host}:${port}`;
            /*
              * Subscribe to the 'connection' event of the server
              * and add opened sockets to the connections map.
              */
            this.server.on('connection', connection => {
                const key = connection.remoteAddress + ':' + connection.remotePort;
                this.connections[key] = connection;
                /* Keep track of the open sockets by subscribing to
                 * their 'close' event and removing the closed ones
                 * from the connection map.
                 */
                connection.on('close', () => {
                    delete this.connections[key];
                });
            });
            this.server.listen(port);
            // Log server URL to the console
            logger.info(`Server is listening for connections at ${url}`, {
                eventType: 'INFO',
                eventSubType: 'SERVER_LISTENING',
            });
        }
        catch (error) {
            logger.error('Could not start HTTP server');
            logger.error(`${error.message}`, {
                eventType: "SERVER_NOT_LISTENING",
                eventSubType: error.name,
                stack: error.stack,
            });
            throw error;
        }
    }
    /*
     * Graceful stop operation
     * Performs following operations in the given order:
     * 1. Stop listening for connections at http-server
     * 2. Serve ongoing requests
     */
    async stop() {
        // 1. Stop listening for connections at http-server    
        this.server.close();
        logger.info('Server closed', {
            eventType: 'INFO',
            eventSubType: 'SERVER_NOT_LISTENING',
        });
        // 2. Serve ongoing requests    
        // Wait for a given time for ongoing requests to complete.
        await wait(this.config.params.timeout);
        let numConnections = 0;
        for (const key in this.connections) {
            numConnections += 1;
            this.connections[key].destroy();
        }
        logger.info(`Closed ${numConnections} connections`, {
            eventType: 'INFO',
            eventSubType: 'CONNS_CLOSED',
        });
    }
};
Graceful = __decorate([
    __param(0, core_1.inject(core_1.CoreBindings.APPLICATION_INSTANCE)),
    __param(1, core_1.inject('fdx.app.config')),
    __param(2, core_1.inject('fdx.http.server')),
    __param(3, core_1.inject('services.EcommService')),
    __metadata("design:paramtypes", [application_1.Application, Object, http.Server, Object])
], Graceful);
exports.Graceful = Graceful;
//# sourceMappingURL=graceful.js.map