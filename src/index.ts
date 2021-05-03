import {Application} from './application';
import {ApplicationConfig, BindingScope} from '@loopback/core';
import {RestServer} from '@loopback/rest';
import * as http from 'http';

export {Application};

export async function main(options: ApplicationConfig = {}) {
  const app = new Application(options);

  // Initialize http-server with provided rest-server from @loopback/rest
  const restServer = await app.getServer(RestServer);
  const httpServer = http.createServer(restServer.requestHandler);

  // Bind http-server as a singleton
  app
    .bind('fdx.http.server')
    .to(httpServer)
    .inScope(BindingScope.SINGLETON);

  await app.boot();
  await app.start();

  return app;
}
