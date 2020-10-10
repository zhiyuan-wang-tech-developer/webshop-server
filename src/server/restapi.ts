// make sure to import "reflect-metadata" before you use routing-controllers
// import "reflect-metadata"; // this shim is required
import { useKoaServer, useContainer } from "routing-controllers";
import Koa from "koa";
import chalk from "chalk";
import KoaLogger from "koa-logger";
import { Server } from "http";
import { Container } from "typedi";
import { authorizationChecker } from "../security/json.web.token";
import { ItemsController } from "../controller/items.controller";
import { UsersController } from "../controller/users.controller";
import { CartController } from "../controller/cart.controller";
import { AdminGroupsController } from "../controller/admin.groups.controller";
import { AdminUsersController } from "../controller/admin.users.controller";
import { AuthorityController } from "../controller/authority.controller";
import { OptionsController } from "../controller/options.controller";
import { ServerConfiguration } from "../constants/config";

const PORT = process.env.PORT || ServerConfiguration.PORT1;

const configServerRESTAPI = (): Koa => {
  // It is important to set container before any operation you do with routing-controllers,
  // including importing controllers.
  useContainer(Container);

  const app: Koa = new Koa(); // create a new Koa application instance
  // koaApp.use() // you can configure the use of middleware globally

  // register created koa application instance in routing-controllers
  useKoaServer<Koa>(app, {
    cors: true, // enable CORS
    controllers: [
      ItemsController,
      UsersController,
      CartController,
      AdminGroupsController,
      AdminUsersController,
      AuthorityController,
      OptionsController,
    ], // we specify controllers we want to use
    middlewares: [KoaLogger],
    classTransformer: true,
    validation: false,
    authorizationChecker,
  });

  return app;
};

export const startServerRESTAPI = (): Server => {
  const app: Koa = configServerRESTAPI();
  // run Koa application instance on specified port
  const server: Server = app.listen(PORT, () => {
    console.debug(
      chalk.blueBright(
        `${new Date().toLocaleString()}: Start REST API server up and running on http://localhost:${chalk.yellowBright(
          PORT
        )}.`
      )
    );
  });
  // server.on("close", () => {
  //   console.debug(`REST API server closed!`);
  // });
  return server;
};
