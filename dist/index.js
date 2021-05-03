"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("./application");
exports.Application = application_1.Application;
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const http = require("http");
async function main(options = {}) {
    const app = new application_1.Application(options);
    // Initialize http-server with provided rest-server from @loopback/rest
    const restServer = await app.getServer(rest_1.RestServer);
    const httpServer = http.createServer(restServer.requestHandler);
    // Bind http-server as a singleton
    app
        .bind('fdx.http.server')
        .to(httpServer)
        .inScope(core_1.BindingScope.SINGLETON);
    await app.boot();
    await app.start();
    return app;
}
exports.main = main;
//# sourceMappingURL=index.js.map