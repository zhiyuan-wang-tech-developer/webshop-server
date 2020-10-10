import "reflect-metadata";
// Your other imports and initialization code comes here after you imported the reflect-metadata package!
import { startServerDatabase } from "./server/database";
import { startServerRESTAPI } from "./server/restapi";
import { startServerGraphQL } from "./server/graphql";

startServerDatabase();
startServerRESTAPI();
startServerGraphQL();
