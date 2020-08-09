// make sure to import "reflect-metadata" before you use routing-controllers
import "reflect-metadata"; // this shim is required
import { useKoaServer } from "routing-controllers";
import { ServerConfiguration } from "./config";
import Koa from "koa";
import chalk from "chalk";
import KoaLogger from "koa-logger";
import { authorizationChecker } from "./security/JsonWebToken";
import { ItemsController } from "./controller/ItemsController";
import { UsersController } from "./controller/UsersController";
import { CartController } from "./controller/CartController";
import { GroupController } from "./controller/GroupController";
import { AdminUserController } from "./controller/AdminUserController";
import { AuthorityController } from "./controller/AuthorityController";
import { OptionsController } from "./controller/OptionsController";

const PORT = process.env.PORT || ServerConfiguration.PORT;
const koaApp = new Koa(); // creates Koa server app instance

export const startServer = () => {
  // koaApp.use() // you can configure the use of middleware globally

  // register created koa server app in routing-controllers
  useKoaServer(koaApp, {
    cors: true, // enable CORS
    controllers: [
      ItemsController,
      UsersController,
      CartController,
      GroupController,
      AdminUserController,
      AuthorityController,
      OptionsController,
    ], // we specify controllers we want to use
    middlewares: [KoaLogger],
    classTransformer: true,
    validation: true,
    authorizationChecker,
  });

  // run Koa application instance on specified port
  koaApp.listen(PORT, () => {
    console.log(
      chalk.blueBright(
        `${new Date().toLocaleString()}: Start listening on http://localhost:${chalk.yellowBright(
          PORT
        )}`
      )
    );
  });
};
