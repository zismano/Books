import {gql} from 'apollo-boost';

// gql and then right afterwards the query syntax like in graphiql
const getBooksQuery = gql`
  {
  	books {
  		name
  		id
  	}
  }
`

// gql and then right afterwards the query syntax like in graphiql
const getAuthorsQuery = gql`
  {
  	authors {
  		name
  		id
  	}
  }
`

// in mutation = addBook is the field in schema.js
// in mutation - we pass dynamic variables
const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
  	addBook(name: $name, genre: $genre, authorId: $authorId) {
  		name
  		id
  	}
  }
`

const getBookQuery = gql`
  query($id: ID) {
  	book(id: $id) {
  		id
  		name
  		genre
  		author {
  			id
  			name
  			age
  			books {
  				name
  				id
  			}
  		}
  	}
  }
`

export {getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery};