import fs from "fs";
import fsE from "fs-extra";
import { resolve } from "path";
interface File {
  type: "file" | "dir";
  name: string;
}
export const updateFileContent: (filePath: string, content: string) => void = (
  filePath,
  content
) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, "utf-8", (err) => {
      if (err) {
        reject(err);
      } else resolve("File copied succesfully");
    });
  });
};

const updateNameFile_or_Folder = (oldFilePath, newFilePath) => {
  fs.rename(oldFilePath, newFilePath, (err) => {
    if (err) {
      console.error("Error renaming file:", err);
    } else {
      console.log("File renamed successfully");
    }
  });
};

const createNewFolder = (filePath) => {
  fs.mkdir(filePath, { recursive: true }, (err) => {
    if (err) throw err;
    console.log("New Folder created successfully!");
  });
};

export const fetchDir = (dir: string, baseDir: string): Promise<File[]> => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, { withFileTypes: true }, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          files.map((file) => ({
            type: file.isDirectory() ? "dir" : "file",
            name: file.name,
            path: `${baseDir}/${file.name}`,
          }))
        );
      }
    });
  });
};

export const fetchFileContent = (file: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const copyFolder = (srcPath: string, destPath: string) => {
  return new Promise((resolve, reject) => {
    fsE.copy(
      `C:/Users/Yash/OneDrive/Desktop/webdev/codePlayground/BoilerPlateCode/${srcPath}`,
      `C:/Users/Yash/OneDrive/Desktop/webdev/codePlayground/UserCodes/${destPath}`,
      { recursive: true },
      (err: Error) => {
        if (err) reject(err);
        else resolve("file copied succesfully");
      }
    );
  });
  // return `C:/Users/Yash/OneDrive/Desktop/webdev/codePlayground/UserCodes/${destPath}`;
};

export const saveFile = async (
  file: string,
  content: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, content, "utf8", (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};
