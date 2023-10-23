const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { schema, root } = require('./schema'); // Import schema and root
const sequelize = require('./sequelize');

const app = express();
const port = process.env.PORT || 3000;

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root, // Set the root value to your root object
  graphiql: true, // Enable GraphiQL for testing
}));

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});