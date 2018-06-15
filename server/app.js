const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// connect to mlab database
mongoose.connect("mongodb://ofir:test123@ds035290.mlab.com:35290/gql-ninja");
mongoose.connection.once('open', () => {
	console.log('connected to database');
})

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql:true
}));

app.listen(4000, () => {
	console.log("now listening for requests on port 4000");
});