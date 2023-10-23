const sequelize = require('./sequelize'); // Import your Sequelize instance
const User = require('./models/user'); // Import your User model
const Blog = require('./models/blog'); // Import your Blog model

// Define user data for the first user
const userData1 = {
  username: 'user1_username',
  password: 'user1_password',
  email: 'user1_email@example.com',
};

// Define the blog data for the first user
const blogData1 = [
  { title: 'User 1 Blog 1', content: 'Content of User 1 Blog 1' },
  { title: 'User 1 Blog 2', content: 'Content of User 1 Blog 2' },
];

// Define user data for the second user
const userData2 = {
  username: 'user2_username',
  password: 'user2_password',
  email: 'user2_email@example.com',
};

// Define the blog data for the second user
const blogData2 = [
  { title: 'User 2 Blog 1', content: 'Content of User 2 Blog 1' },
  { title: 'User 2 Blog 2', content: 'Content of User 2 Blog 2' },
];

// Create the first user and seed the blogs
User.create(userData1)
  .then(user1 => {
    console.log('User 1 seeded successfully:', user1.get());

    // Create and associate the blogs with the first user
    return Promise.all(
      blogData1.map(blogInfo => Blog.create(blogInfo).then(blog => user1.addBlog(blog)))
    );
  })
  .then(blogs1 => {
    console.log('Blogs for User 1 seeded successfully:', blogs1.map(blog => blog.get()));
  })
  .then(() => {
    // Create the second user and seed the blogs
    return User.create(userData2)
      .then(user2 => {
        console.log('User 2 seeded successfully:', user2.get());

        // Create and associate the blogs with the second user
        return Promise.all(
          blogData2.map(blogInfo => Blog.create(blogInfo).then(blog => user2.addBlog(blog))
        ));
      })
      .then(blogs2 => {
        console.log('Blogs for User 2 seeded successfully:', blogs2.map(blog => blog.get()));
      });
  })
  .catch(error => {
    console.error('Error seeding users and blogs:', error);
  })
  .finally(() => {
    // Close the database connection
    sequelize.close();
  });
