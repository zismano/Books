const graphql = require('graphql');
const _ = require('lodash');

const { 
	GraphQLObjectType, 
	GraphQLString, 
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList
} = graphql;

// dummy data
var books = [
	{name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'},
	{name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'},
	{name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'},	
	{name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2'},
	{name: 'The Color of Magic', genre: 'Fantasy', id: '5', authorId: '3'},
	{name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3'},
];

var authors = [
	{name: 'Patrick Rothfuss', age: 44, id: '1'},
	{name: 'Brandon Sanderson', age: 42, id: '2'},
	{name: 'Terry Pratchett', age: 66, id: '3'},	
];

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {	// use of resolve to get related data in graphql. Parent is a book
				console.log(parent);
				return _.find(authors, {id: parent.authorId})
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType), // to get array of books
			resolve(parent, args) {
				return _.filter(books, {authorId: parent.id});
			}
		}
	})
});

// define all queries possible (particular book, all books, particular author, all authors)
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: {id: {type: GraphQLID}},	// argument that user passes when user looks for a book
			resolve(parent, args) {
				// code to get data from db/other source
				console.log(typeof args.id);
				return _.find(books, {id: args.id});
			}
		},
		author: {
			type: AuthorType,
			args: { id: {type: GraphQLID}},
			resolve(parent, args) {
				return _.find(authors, {id: args.id});
			}
		}
	}
});

/* 
  book(id: "2") {
	name
	genre
  }
*/

module.exports = new GraphQLSchema({
	query: RootQuery
});