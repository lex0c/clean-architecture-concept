import { UserController } from '../../../controllers';

export const schemas = `
  extend type Query {
    user(id: Int!): User!
    users: [User]!
  }
  extend type Mutation {
    createUser(input: CreateUserInput!): User!
  }
  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }
  type User {
    id: Int!
    name: String
    email: String
  }
`;

export const resolvers = {
  Query: {
    user: async (_: any, args: any) => {
      return UserController.getUser(args.id);
    },
    users: async () => {
      return UserController.getUsers(null);
    },
  },
  Mutation: {
    createUser: (_: any, { input }: any) => {
      return UserController.createUser(input);
    },
  },
};

export default {
  schemas,
  resolvers,
};
