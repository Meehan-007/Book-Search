const typeDefs = `
  type User { 
      username: String! 
      email: String! 
      password: String! 
      savedBooks [bookSchema]
  } 
  type Auth {
    token: ID!
    user: User
  } 

  type bookSchema {
    authors: [String!]  
    description: String!  
    bookId: String!  
    image: String!  
    link: String! 
    title: String!
  }

  type Query{ 
    getSingleUser(_id: String): [User]
  } 

  type Mutation {
    login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  saveBook(bookData: bookSchema!): User
  removeBook(bookId: ID!): User
  }
` 

