import { BuildSchemaOptions, buildSchema } from "type-graphql";
import { GraphQLSchema } from "graphql";

export async function generateSchema(
  ...resolvers: BuildSchemaOptions['resolvers']
): Promise<GraphQLSchema> {
  try {
    return await buildSchema({
      resolvers: resolvers
    })
  } catch (error) {
    console.log(`There was an error generating schema. Error was: ${error}`);
    throw error;
  }
}