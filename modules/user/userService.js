import { userModel } from "./userModel";
class UserService {
  constructor() {
    this.userModel = userModel;
  }

  async createUser(userData) {
    try {
      const user = await this.userModel.create(userData);
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteUserById(id) {
    try {
      await this.userModel.delete(id);
    } catch (err) {
      throw new Error(err);
    }
  }

  async findAllUsers() {
    try {
      const userList = await  this.userModel.getAll();

      return userList;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findUserById(userId) {
    try {
      const user = await  this.userModel.findOne(userId);

      if (user === null) {
        throw new Error(`User with id ${userId} doesn't exist.`);
      }

      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateUser(userId, userData) {
    try {
      const user = await this.userModel.update(userId, userData);
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new UserService();