import { createConnection, Connection } from "typeorm";
import chalk from "chalk";

export const startServerDatabase = async (): Promise<Connection | null> => {
  // createConnection method will automatically read connection options
  // from your ormconfig.json file in project root directory or environment variables
  let connection: Connection | null = null;
  try {
    connection = await createConnection();
    if (connection.isConnected) {
      console.debug(
        chalk.blueBright(
          `${new Date().toLocaleString()}: Connected to the database server ${chalk.yellowBright(
            connection.name
          )}.`
        )
      );
    }
  } catch (error) {
    console.error(chalk.red(error));
  }
  return connection;
};
