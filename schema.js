const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

const axios = require("axios");

// Launch Type
const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType },
  }),
});

// Rocket Type
const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      // GraphQLList is to fetch more than one
      type: new GraphQLList(LaunchType),
      async resolve(parent, args) {
        const res = await axios.get(`https://api.spacexdata.com/v3/launches`);
        return await res.data;
      },
    },
    launch: {
      // When we just need to fetch one result we just pass the type
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        const res = await axios.get(
          `https://api.spacexdata.com/v3/launches/${args.flight_number}`
        );
        return await res.data;
      },
    },

    rockets: {
      type: new GraphQLList(RocketType),
      async resolve(parent, args) {
        const res = await axios.get(`https://api.spacexdata.com/v3/rockets`);
        return await res.data;
      },
    },
    rocket: {
      type: RocketType,
      args: {
        rocket_id: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const res = await axios.get(
          `https://api.spacexdata.com/v3/rockets/${args.rocket_id}`
        );
        return await res.data;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
