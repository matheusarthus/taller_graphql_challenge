import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const users = [
  {
    id: 1,
    name: "matheus",
    email: "email@ok.com",
    age: 35
  },
  {
    id: 2,
    name: "mosiah",
    email: "email@ok.com",
    age: 35
  },
];


const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Query {
    getUser(id: ID!): User
    listUsers(limit: Int): [User!]!
  }
`;

interface User {
  id: Number;
  name: String;
  email: String;
  age: Number;
}

interface getUserArgs {
  id: Number;
}

const resolvers = {
  Query: {
    getUser: (_: any, args: getUserArgs) => users.find((user) => user.id == args.id),
    listUsers: (limit: Number) => users,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});


const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
