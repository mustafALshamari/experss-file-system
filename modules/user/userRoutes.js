import express from "express";
import UserController from "./userController";

const userRoutes = (router) => {
  const userRouter = express.Router();

  userRouter.get("/all", UserController.listUsers);
  userRouter.get("/:id", UserController.getUser);
  userRouter.post("/", UserController.signupUser);
  userRouter.patch('/:id', UserController.updateUser);
  userRouter.delete("/:id", UserController.deleteUser);

  router.use("/users", userRouter);
};

export default userRoutes;