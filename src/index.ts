import { startDatabase } from "./database";
import { startKoaServer } from "./server";
import { startGraphQLServer } from "./graphql";

startDatabase();
startKoaServer();
startGraphQLServer();
