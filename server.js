const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const sequelize = require('./sequelize');


const app = express();
const port = process.env.PORT || 3000;

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // Enable GraphiQL for testing
}));

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
