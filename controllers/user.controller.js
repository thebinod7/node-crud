const UserModel = require("../models/users");

const signupUser = (payload) => {
  let obj = new UserModel(payload);
  return obj.save();
};

const listUsers = async () => {
  let users = await UserModel.find({});
  return users;
};

const getById = (userId) => {
  return UserModel.findById(userId);
};

const updateUser = (userId, payload) => {
  return UserModel.findOneAndUpdate(
    { _id: userId },
    { $set: payload },
    { new: true }
  );
};

const deleteUser = (userId) => {
  return UserModel.remove({ _id: userId });
};

module.exports = { signupUser, listUsers, getById, updateUser, deleteUser };
