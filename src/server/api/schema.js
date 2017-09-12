import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql/type';
import { buildSchema } from 'graphql';

import User from '../data/users.model';

export function getProjection(fieldASTs) {
  return fieldASTs.fieldNodes[
    0
  ].selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = true;
    return projections;
  }, {});
}

const userType = new GraphQLObjectType({
  name: 'user',
  description: 'User',
  fields: () => ({
    username: { type: GraphQLString },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: {
        type: new GraphQLList(userType),
        args: {
          username: {
            name: 'username',
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve: (root, { username }, source, fieldASTs) => {
          const projections = getProjection(fieldASTs);
          const foundUser = new Promise((resolve, reject) => {
            User.find({ username }, projections, (err, user) => {
              err ? reject(err) : resolve(user);
            });
          });
          return foundUser;
        },
      },
    },
  }),
});
