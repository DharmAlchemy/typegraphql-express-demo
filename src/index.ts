import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HiResolvers } from "./resolvers/HiResolvers";
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import * as express from 'express';
import * as http from 'http';

(async () =>{
  const app = express();
  const httpServer = http.createServer(app);

  const schema = await buildSchema(
    { resolvers : [HiResolvers] }
 );

  const server = new ApolloServer({ schema });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})();




