import { BuildSchemaOptions, buildSchema } from "type-graphql";
import { GraphQLSchema } from "graphql";
import { authChecker } from "./authChecker";
const path = require('path');
export async function generateSchema(
  ...resolvers: BuildSchemaOptions['resolvers']
): Promise<GraphQLSchema> {
  try {
    return await buildSchema({
      resolvers: resolvers,
      emitSchemaFile: path.resolve(__dirname, "schema.gql"),
      authChecker
    })
  } catch (error) {
    console.log(`There was an error generating schema. Error was: ${error}`);
    throw error;
  }
}