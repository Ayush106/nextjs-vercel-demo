// import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
// import { configureWunderGraphServer } from '@wundergraph/sdk/server';
// import type { HooksConfig } from './generated/wundergraph.hooks';
// import type { InternalClient } from './generated/wundergraph.internal.client';

// export default configureWunderGraphServer<HooksConfig, InternalClient>(() => ({
// 	hooks: {
// 		queries: {},
// 		mutations: {},
// 	},
// 	graphqlServers: [],
// }));

import { GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { configureWunderGraphServer } from '@wundergraph/sdk/server';
import type { HooksConfig } from './generated/wundergraph.hooks';
import type { InternalClient } from './generated/wundergraph.internal.client';

// Define the User type
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

// Create a new array of User objects
const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
  { id: '3', name: 'Hritik Thakur', email: 'hritik@example.com' },
  { id: '4', name: 'Devesh', email: 'devesh@example.com' },
  { id: '5', name: 'Bijendra', email: 'bijendra@example.com' },
  { id: '6', name: 'Ayush', email: 'ayush@example.com' }
];

// Define a new query field to return the User array
const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve: () => users,
    },
  }),
});

// Create a new GraphQL schema with the Query field
const schema = new GraphQLSchema({
  query: QueryType,
});

// Create a new object that implements the GraphQLServerConfig interface
const serverConfig = {
  serverName: 'my-graphql-server',
  schema,
};

// Pass the serverConfig object to the configureWunderGraphServer function
export default configureWunderGraphServer<HooksConfig, InternalClient>(() => ({
  hooks: {
    queries: {},
    mutations: {},
  },
  graphqlServers: [serverConfig],
}));

