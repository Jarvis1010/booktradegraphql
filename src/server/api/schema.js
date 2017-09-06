import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql/type';

import User from '../data/users.model';

export function getProjection (fieldASTs) {
    return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
      projections[selection.name.value] = true;
      return projections;
    }, {});
  }

const userType = new GraphQLObjectType({
    name:'user',
    description:'User',
    fields(){
        username:{
            type:(GraphQLString)
        },
        name: { type: (GraphQLString) },
        location: { type: (GraphQLString) },
        email: { type: (GraphQLString) },
        password:{type:(GraphQLString)}
    }
);

var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQueryType',
      fields: {
        user: {
          type: new GraphQLList(userType),
          args: {
            username: {
              name: 'username',
              type: new GraphQLNonNull(GraphQLInt)
            }
          },
          resolve(root, {username}, source, fieldASTs){
            const projections = getProjection(fieldASTs);
            const foundUser = new Promise((resolve, reject) => {
                User.findOne({username}, projections,(err, user) => {
                    err ? reject(err) : resolve(user)
                })
            })
  
            return foundUser
          }
        }
      }
    })
    
  });

  export default schema;