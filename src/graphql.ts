import { bootstrap } from "vesper";
import { blueBright, cyanBright } from "chalk";
import { AuthorityController } from "./controller/AuthorityController";
import { GroupController } from "./controller/GroupController";
import { Authority } from "./entity/Authorities";
import { Group } from "./entity/Groups";
import { Table } from "./entity/Tables";
import { ServerConfiguration } from "./constants/config";

const PORT = ServerConfiguration.PORT2;

export const startGraphQLServer = () => {
  bootstrap({
    port: PORT,
    controllers: [AuthorityController, GroupController],
    entities: [Authority, Group, Table],
    schemas: [__dirname + "/schema/**/*.graphql"],
    cors: true,
  })
    .then(() => {
      console.log(
        blueBright(
          `${new Date().toLocaleString()}: ` +
            `Your app is up and running on http://localhost:${cyanBright(
              PORT
            )}. ` +
            `You can use playground in development mode on http://localhost:${PORT}/playground.`
        )
      );
    })
    .catch((error) => {
      console.error(error.stack ? error.stack : error);
    });
};
