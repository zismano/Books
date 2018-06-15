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

export {getAuthorsQuery, getBooksQuery};