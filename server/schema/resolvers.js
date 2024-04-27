const { User } = require('../models');
const jwt = require('jsonwebtoken');

const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // me: async (parent, { userId }) => {
    //   console.log("checking get route", userId)
    //   if (userId) {
    //     const userData = await User.findOne({ _id: userId }).select('-__v -password');
    //     return userData;
    //   }
    // } 
    me: async (parent, { token }) => { 
      console.log("checking get route", token)
      const decodedToken = jwt.decode(token, { complete: true });
    const userId = decodedToken.payload.data._id;
      console.log("checking get route", userId) 
      const user = await User.findOne(userId);

    return user;
      
    },
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
    saveBook: async (parent, {_id, bookData}) => { 
      console.log(_id)
      const decodedToken = jwt.decode(_id, { complete: true }); 
      const userId = decodedToken.payload.data._id; 
     console.log(userId)
      console.log("hello")
      {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: userId },
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