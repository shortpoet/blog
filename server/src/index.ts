import express = require('express');
import cors = require('cors');
import { createConnection } from "typeorm";
const { graphqlHTTP } = require('express-graphql');

import { generateSchema } from "./graphQL/generateSchema";
import { UserResolver } from './graphQL/user.resolvers';
import { buildSchema } from 'type-graphql';

// const config = require('../ormconfig.js');

const util = require('util');
(async () => {
  console.log("$# START @7");
  // console.log(config);
  // could insert config as options into createConnection 
  // if need to read from.env to have node modules up a directory 
  const connection = await createConnection();
  // console.log(`name ${connection.name}`);
  // console.log(util.inspect(connection.options, false, null, true /* enable colors */));
  if (connection) {
    const app = express();
    app.use(cors());
    // const schema = generateSchema(UserResolver);
    const schema = await buildSchema({
      resolvers: [UserResolver]
    });
  
    app.use('/graphql', graphqlHTTP({
      schema,
      graphiql: true
    }))
    app.listen(5000)
  }
})();