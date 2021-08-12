import { v4 as uuid } from "uuid";
import FileHandler from "../../lib/FileHandler";

class User {
  ModelName = "users";

  constructor() {
    this.dbBaseClass = new FileHandler(process.env.FILE_PATH, this.ModelName);
  }

  create(userData) {
    const id = uuid();
    
    return this.dbBaseClass.insertNewDataToEntity({ id, ...userData });
  }

  findOne(id) {
    return this.dbBaseClass.getElementFroFileById(id);
  }

  getAll() {
    return this.dbBaseClass.getAllElementsFromFile();
  }

  update(id, data) {
    return this.dbBaseClass.updateElementById(id, data);
  }

  delete(id) {
    return this.dbBaseClass.deleteElementFromFile(id);
  }
}


export const userModel = new User();
