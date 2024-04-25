"use client";
import React, { useState } from "react";

interface FileInterface {
  id: string;
  name: string;
  isDirectory: boolean;
  children: FileInterface[];
}

const FileExplorer = ({
  Data,
  getCodeValueAndLanguage,
}: {
  Data: FileInterface[];
  getCodeValueAndLanguage: (code: string, filename: string) => void;
}) => {
  const [data, setData] = useState(Data);
  const [toggleExpand, setToggleExpand] = useState<string[]>();
  const handleToggleExpand = (fileId: string) => {
    // if (fileId === toggleExpand[]) {
    //   setToggleExpand("");
    //   return;
    // }
    // setToggleExpand(fileId);
  };
  const createNewFile = (folder: any) => {
    folder.push({
      id: Date.now(),
      name: "this is testfile",
      isDirectory: false,
      children: "",
      value: "",
    });
  };
  const createNewFolder = () => {};
  return (
    <div>
      {data?.map((item: any) => {
        return (
          <div key={item.id}>
            <span
              onClick={() => getCodeValueAndLanguage(item.value, item.name)}
            >
              {item.isDirectory === false ? (
                <>
                  📄
                  {<span>{item.name}</span>}
                </>
              ) : (
                <>
                  📂
                  {
                    <span>
                      {" "}
                      <span onClick={() => handleToggleExpand(item.id)}>
                        {item.name + " "}{" "}
                      </span>
                      <span onClick={() => createNewFile(item.children)}>
                        ➕
                      </span>{" "}
                      <span>❌</span>
                    </span>
                  }
                </>
              )}
            </span>
            {toggleExpand !== item.id ? (
              <div className="m-3">
                {item.isDirectory && (
                  <FileExplorer
                    Data={item.children}
                    getCodeValueAndLanguage={getCodeValueAndLanguage}
                  />
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FileExplorer;
