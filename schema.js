// schema.js
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLSchema,
} = require("graphql");
const User = require("./models/user");

const UserTypeWithoutPassword = new GraphQLObjectType({
  name: "UserWithoutPassword",
  fields: () => ({
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    blogs: {
      type: new GraphQLList(BlogType),
      resolve: async (parent, args) => {
        return parent.getBlogs();
      },
    },
  }),
});

const BlogType = new GraphQLObjectType({
  name: "Blog",
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    userId: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserTypeWithoutPassword), // Use UserTypeWithoutPassword
      resolve: async () => {
        try {
          const users = await User.findAll();
          return users;
        } catch (error) {
          console.error("Error fetching users:", error);
          return [];
        }
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserTypeWithoutPassword, // Use UserTypeWithoutPassword
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const { username, password, email } = args;
        try {
          const user = await User.create({ username, password, email });
          return user;
        } catch (error) {
          console.error("Error adding a user:", error);
          throw new Error("User creation failed");
        }
      },
    },
    deleteUser: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parent, args) => {
        const { id } = args;
        try {
          const result = await User.destroy({ where: { id } });
          return result === 1;
        } catch (error) {
          console.error("Error deleting a user:", error);
          throw Error("User deletion failed");
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
