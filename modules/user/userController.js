import UserService from './userService';

export default class UserController {
  static async signupUser(req, res, next) {
    try {
      const user = await UserService.createUser(req.body);

      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  static async getUser(req, res, next) {
    try {
      const { id } = req.params;

      const user = await UserService.findUserById(id);

      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  static async listUsers(req, res, next) {
    try {
      const userList = await UserService.findAllUsers();

      res.json(userList);
    } catch (err) {
      next(err);
    }
  }


  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;

      const updatedUser = await UserService.updateUser(id, data);

      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      await UserService.deleteUserById(id);

      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
}