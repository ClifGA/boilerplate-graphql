const sequelize = require('./sequelize'); // Import your Sequelize instance
const User = require('./models/user'); // Import your User model

// Define the user data you want to seed
const userData = {
  username: 'seeded_username',
  password: 'seeded_password',
  email: 'seeded_email@example.com',
};

// Create the user in the database
User.create(userData)
  .then(user => {
    console.log('User seeded successfully:', user.get());
  })
  .catch(error => {
    console.error('Error seeding user:', error);
  })
  .finally(() => {
    // Close the database connection
    sequelize.close();
  });