import "reflect-metadata";
import { createConnection } from "typeorm";
import chalk from "chalk";

export const startServerDatabase = () => {
  // createConnection method will automatically read connection options
  // from your ormconfig.json file in project root directory or environment variables
  createConnection()
    .then((connection) => {
      if (connection.isConnected) {
        console.info(
          chalk.blueBright(
            `${new Date().toLocaleString()}: Connected to the database server ${chalk.yellowBright(
              connection.name
            )}.`
          )
        );
      }
    })
    .catch((error) => console.error(chalk.red(error)));
};
