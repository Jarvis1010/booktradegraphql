import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLInputObjectType,
} from 'graphql/type';
import mongoose from 'mongoose';

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
    _id: { type: GraphQLString },
  }),
});

const profile = {
  name: 'profileInputType',
  description: 'Profile Input',
  fields: () => ({
    username: { type: GraphQLString },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    email: { type: GraphQLString },
    _id: { type: GraphQLString },
  }),
};
const profileInputType = new GraphQLInputObjectType(profile);

const profileType = new GraphQLObjectType({
  ...profile,
  name: 'profileType',
  description: 'profile type',
});

const query = new GraphQLObjectType({
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
});

const mutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    updateProfile: {
      type: profileType,
      description: 'Update User Profile',
      args: {
        profile: {
          name: 'Profile',
          type: profileInputType,
        },
      },
      resolve(root, { profile: { _id, ...profile } }) {
        console.log(_id, profile);
        const updatedProfile = new Promise((resolve, reject) => {
          const id = mongoose.Types.ObjectId(_id);
          User.findByIdAndUpdate(
            { _id },
            profile,
            { new: true },
            (err, updatedUser) => {
              err ? reject(err) : resolve(updatedUser);
            }
          );
        });
        return updatedProfile;
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query,
  mutation,
});
