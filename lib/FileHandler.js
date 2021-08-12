import { resolve } from "path";
import { writeFile, readFile, access, mkdir } from "fs/promises";

export default class FileHandler {
  constructor(path, file) {
    this.path = path;
    this.file = file;
  }

  static async boot(path, ...entities) {
    await this.createDir(path);
    const files = entities.map((entity) => entity.ModelName);

    for (let file of files) {
      await this.createFile(path, file);
    }
  }

  static async createFile(path, file) {
    const filePath = resolve(path, `${file}.json`);
    try {
      await access(filePath);
    } catch (error) {
      await writeFile(filePath, "[]");
    }
  }

  static async createDir(path) {
    const dirPath = resolve(path);

    try {
      await access(dirPath);
    } catch (error) {
      await mkdir(dirPath);
    }
  }

  async insertNewDataToEntity(dataToInsert) {
    const fileContent = await this.getFileContent(this.file);

    await this.setFileContent(
      this.file,
      JSON.stringify([...fileContent, dataToInsert])
    );
  }

  async setFileContent(file, data) {
    const path = resolve(this.path, `${file}.json`);
    try {
      await writeFile(path, data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async getFileContent(file) {
    const path = resolve(this.path, `${file}.json`);

    try {
      const fileContent = await readFile(path, "utf-8");

      return JSON.parse(fileContent);
    } catch (err) {
      throw new Error(err);
    }
  }

  async getElementFroFileById(id) {
    const fileContent = await this.getFileContent(this.file);

    const outPut = fileContent.find((entity) => entity.id === id);
    if (outPut) {
      return outPut;
    } else {
      throw new Error(`The Entity with ${id} is not found`);
    }
  }

  async getAllElementsFromFile() {
    const fileContent = await this.getFileContent(this.file);
    return fileContent;
  }

  async updateElementById(id , data) {
    const fileContent = await this.getFileContent(this.file);

    const updatedContent = fileContent.map((element) => element.id === id ?
    {
        id,
        ...element,
        ...data,
    }
    : data );

    await this.setFileContent(this.file, JSON.stringify(updatedContent))

    return {id , ...updatedContent };
  }

  async deleteElementFromFile(id) {
      const fileContent = await this.getFileContent(this.file) ;
      const updatedContent = fileContent.filter((element) => element.id !== id);

      await this.setFileContent(this.file, JSON.stringify(updatedContent))
  }
}

