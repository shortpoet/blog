import express = require('express');
import cors = require('cors');
import { createConnection } from "typeorm";
const { graphqlHTTP } = require('express-graphql');

import { generateSchema } from "./graphQL/generateSchema";
import { UserResolver } from './graphQL/user.resolvers';
import { buildSchema } from 'type-graphql';

(async () => {
  const app = express();
  app.use(cors());
  const connection = await createConnection();
  // const schema = generateSchema(UserResolver);
  const schema = await buildSchema({
    resolvers: [UserResolver]
  });

  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }))
  app.listen(5000)
})();