const { User} = require("../models");
const { signToken } = require('../utils/auth');

  const resolvers = {
    Query: {
        user: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return User.find(params);
          },
     
    },
    Mutation: { 
      createUser: async (parent, args) => {
          const user = await User.create(args); 
          const token = signToken(user);
    
      return { token, user };
      }, 
      saveBook: async (parent, {bookData}) => {
          const book = await User.findOneAndUpdate( 
            { _id: user._id },
            { $addToSet: { savedBooks: bookData } },
            { new: true }

          )
          return book
      },

      deleteBook: async (parent, { bookId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId } } },
            { new: true }
          );
      
          return updatedUser;
        }
      
        throw new AuthenticationError('You need to be logged in!');
      },
        login: async (parent, { email, password }) => {
          // Find the user by email
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error('User not found.');
          }
    
          // Compare the provided password with the hashed password stored in the database
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error('Invalid password.');
          }
    
          const token = signToken(user);
          return { token, user };
        }
    },
  };
  
  module.exports = resolvers;
  