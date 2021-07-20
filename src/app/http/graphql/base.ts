import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLUpload } from 'graphql-upload';
import { merge } from 'lodash';

import graphql from './graphql';

const schemaBase = `
  type Query {
    test: String
  }
  type Mutation {
    _empty(id: ID): String
  }
  scalar Upload
  scalar Date
`;

const resolversBase = {
  Query: { test: () => 'ok' },
  Mutation: { _empty: () => '' },
  Upload: GraphQLUpload,
};

export const typeDefs = schemaBase.concat(graphql.schemas).replace(/,/g, '');
export const resolvers = merge(resolversBase, graphql.resolvers);

export default makeExecutableSchema({ typeDefs, resolvers });
