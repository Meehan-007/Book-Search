import gql from 'graphql-tag';

export const GET_ME = gql`
   {
    token 
    me {
      _id
      username
      email
      savedBooks {
          bookId
          description
          title
          image
          authors
          link
      }
    }
  }
`;