import { bootstrap, VesperFramework } from "vesper";
import { blueBright, yellowBright } from "chalk";
import { AuthorityController } from "../graphql/controller/authority.controller";
import { AdminGroupsController } from "../graphql/controller/admin.groups.controller";
import Authority from "../entity/authority";
import Group from "../entity/group";
import Table from "../entity/table";
import { ServerConfiguration } from "../constants/config";

const PORT = ServerConfiguration.PORT2;

export const startServerGraphQL = async (): Promise<VesperFramework | null> => {
  let vesper: VesperFramework | null = null;
  try {
    vesper = await bootstrap({
      port: PORT,
      controllers: [AuthorityController, AdminGroupsController],
      entities: [Authority, Group, Table],
      schemas: [process.cwd() + "/src/graphql/schema/**/*.graphql"],
      cors: true,
    });
    console.debug(
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
  } catch (error) {
    console.error(error.stack ? error.stack : error);
  }
  return vesper;
};
