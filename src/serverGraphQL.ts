import { bootstrap } from "vesper";
import { blueBright, yellowBright } from "chalk";
import { AuthorityController } from "./graphql/controller/AuthorityController";
import { GroupController } from "./graphql/controller/GroupController";
import { Authority } from "./entity/Authorities";
import { Group } from "./entity/Groups";
import { Table } from "./entity/Tables";
import { ServerConfiguration } from "./constants/config";

const PORT = ServerConfiguration.PORT2;

export const startServerGraphQL = () => {
  bootstrap({
    port: PORT,
    controllers: [AuthorityController, GroupController],
    entities: [Authority, Group, Table],
    schemas: [__dirname + "/graphql/schema/**/*.graphql"],
    cors: true,
  })
    .then(() => {
      console.log(
        blueBright(
          `${new Date().toLocaleString()}: ` +
            `Start GraphQL server up and running on http://localhost:${yellowBright(
              PORT
            )}/graphql. ` +
            `You can use playground in development mode on http://localhost:${yellowBright(
              PORT
            )}/playground.`
        )
      );
    })
    .catch((error) => {
      console.error(error.stack ? error.stack : error);
    });
};
