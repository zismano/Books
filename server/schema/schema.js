const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		genre: { type: GraphQLString }
	})
});

// define all queries possible (particular book, all books, particular author, all authors)
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: {id: {type: GraphQLString}},	// argument that user passes when user looks for a book
			resolve(parent, args) {
				// code to get data from db/other source
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});