const user = require("../model/User");

const addUser = (userData) => {
  return findByLoginId({ loginId: userData.loginId })
    .then((existingUser) => {
      if (existingUser) {
        return {
          message: "Login ID already exists, please enter a different Login ID",
        };
      } else {
        const newUser = new user(userData);
        console.log("New User Data: " + newUser);
        return newUser.save().then((savedUser) => {
          return { user: savedUser, message: "User added Successfully" };
        });
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

const updateUser = (userId, updateData) => {
  return user
    .findByIdAndUpdate(userId, updateData)
    .then((updatedUser) => {
      if (!updatedUser) {
        throw new Error("User not found");
      } else {
        return { message: "User updated successfully" };
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

const deleteUser = (userId) => {
  return user
    .findByIdAndDelete(userId)
    .then((deletedUser) => {
      if (!deletedUser) {
        throw new Error("User not found");
      } else {
        return { message: "User deleted successfully" };
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

const getUserById = (userId) => {
  return user
    .findById(userId)
    .then((user) => {
      if (!user) {
        throw new Error("User not found");
      } else {
        return user;
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

const searchUser = (query) => {
  console.log("query: ", query);
  return user
    .find(query)
    .then((users) => {
      if (!users) {
        throw new Error({ error: "User record not found" });
      } else {
        return users;
      }
    })
    .catch((error) => {
      throw new Error({ error: error.message });
    });
};

const findByLoginId = (loginId) => {
  console.log("Login ID: ", loginId);
  return user.findOne(loginId).then((user) => {
    if (!user) {
      return null;
    } else {
      return user;
    }
  });
};

const authenticate = (loginId, password) => {
  return user
    .findOne({ loginId, password })
    .then((user) => {
      if (!user) {
        throw new Error('invlaid loginId and password');
      } else {
        return user;
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
};

module.exports = {
  addUser,
  updateUser,
  deleteUser,
  getUserById,
  searchUser,
  findByLoginId,
  authenticate,
};
