import { startServerDatabase } from "./serverDatabase";
import { startServerRESTAPI } from "./serverRESTAPI";
import { startServerGraphQL } from "./serverGraphQL";

startServerDatabase();
startServerRESTAPI();
startServerGraphQL();
