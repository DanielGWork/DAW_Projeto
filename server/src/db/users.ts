import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  username: { type: String, require: true},
  email: { type: String, require: true},
  authentication: {
    password: { type: String, require: true, select: false},
    salt: { type: String, select: false},
    sessionToken: { type: String, select: false}
  }
});

export const UserModel = mongoose.model('User', UsersSchema);

export const getUsers = () => UserModel.find();
export const getUserByMail = (email: string) => UserModel.findOne({email});
export const getUsersBySessionToken = (sessionToken: string) => UserModel.findOne({
  'authentication.sessionToken' : sessionToken,
});
export const getUserById = (id: string) => UserModel.findById(id);
export const creatUser = (values: Record<string, any>) => new UserModel(values).save().then(
  (user) => user.toObject()
);
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id});
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);