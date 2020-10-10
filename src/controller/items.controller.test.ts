import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import supertest, { Response } from "supertest";
import { Connection } from "typeorm";
import { Server } from "http";
import { startServerRESTAPI } from "../server/restapi";
import { startServerDatabase } from "../server/database";

let database: Connection | null = null;
let server: Server | null = null;

beforeAll(async () => {
  database = await startServerDatabase();
  server = startServerRESTAPI();
});

afterAll(() => {
  if (database) database.close();
  if (server) server.close();
});

describe("Test items.controller.ts", () => {
  test("It should respond the GET method", (done: any) => {
    supertest(server)
      .get("/items")
      .then((response: Response) => {
        expect(response.status).toBe(200);
        expect(response.body.items).toBeDefined();
        expect(response.body.items.length).toBeGreaterThanOrEqual(0);
        done();
      });
  });
});
