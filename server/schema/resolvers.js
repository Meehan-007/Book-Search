const { User } = require('../models');

const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, { userId }) => {
      if (userId) {
        const userData = await User.findOne({ _id: userId }).select('-__v -password');
        return userData;
      }
    }
  },
  
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
    
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
    
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
    
      const correctPw = await user.isCorrectPassword(password);
    
     
    
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { bookData}, context ) => { 
      
     console.log(context)
      console.log("hello")
      {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } },
          { new: true }
        );
    
        return updatedUser;
      }
    },
    removeBook: async (parent, { bookId, userId }) => {
      if (userId) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
    
        return updatedUser;
      }
    }
    
  
   
  }
  }


module.exports = resolvers;