const { buildSchema } = require("graphql");
const User = require("./models/user");
const Blog = require("./models/blog");

const schema = buildSchema(`
  type Blog {
    id: Int
    title: String
    content: String
    ownerId: Int
    owner: User
  }

  type User {
    id: Int
    username: String
    email: String
    blogs: [Blog]
  }

  type Mutation {
    addUser(username: String!, email: String!): User
    deleteUser(id: Int!): Boolean
  }

  type Query {
    users: [User]
    blogs: [Blog]
  }
`);
const root = {
  users: async () => {
    try {
      const users = await User.findAll({
        include: [{ model: Blog, as: "blogs" }], // Specify the alias "blogs"
      });

      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  },
  blogs: async () => {
    try {
      const blogs = await Blog.findAll();
      return blogs;
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return [];
    }
  },
};
module.exports = { schema, root };
