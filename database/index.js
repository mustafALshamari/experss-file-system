import FileHandler from "../lib/FileHandler";
import { userModel } from "../modules/user/userModel";

export const bootDB =  async ()  => {
  await FileHandler.boot(process.env.FILE_PATH, userModel);
};
