"use client";
import { Editor } from "@monaco-editor/react";
import React, { useState } from "react";
import { Resizable, ResizableBox } from "react-resizable";
import FileExplorer from "./(components)/FileExplorer";
import WebView from "./(components)/WebView";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CodeTerminal from "./(components)/Terminal";
import Sidebar from "./(components)/Sidebar";
import { Drawer } from "vaul";
import useTraverseTree from "./hooks/useTraverseTree";

export interface FileInterface {
  id: string;
  name: string;
  isDirectory: boolean;
  value?: string;
  children: FileInterface[];
}

const Files: FileInterface[] = [
  {
    id: "1",
    name: "root",
    isDirectory: true,
    children: [
      {
        id: "9",
        name: "folder1",
        isDirectory: true,
        children: [
          {
            id: "31",
            name: "Javascript.js",
            isDirectory: false,
            children: [],
            value: "this is javascript file",
          },
          {
            id: "41",
            name: "file2.ts",
            isDirectory: false,
            children: [],
            value: "this is python file",
          },
          {
            id: "51",
            name: "subfolder1",
            isDirectory: true,
            children: [
              {
                id: "61",
                name: "Code.cpp",
                isDirectory: false,
                children: [],
                value: "this is C++ file",
              },
              {
                id: "71",
                name: "file4.txt",
                isDirectory: false,
                children: [],
                value: "this is TextFile file",
              },
            ],
          },
        ],
      },
      {
        id: "2",
        name: "folder1",
        isDirectory: true,
        children: [
          {
            id: "3",
            name: "Javascript.js",
            isDirectory: false,
            children: [],
            value: "this is javascript file",
          },
          {
            id: "4",
            name: "file2.ts",
            isDirectory: false,
            children: [],
            value: "this is python file",
          },
          {
            id: "5",
            name: "subfolder1",
            isDirectory: true,
            children: [
              {
                id: "6",
                name: "Code.cpp",
                isDirectory: false,
                children: [],
                value: "this is C++ file",
              },
              {
                id: "7",
                name: "file4.txt",
                isDirectory: false,
                children: [],
                value: "this is TextFile file",
              },
            ],
          },
        ],
      },
      {
        id: "8",
        name: "file5.html",
        isDirectory: false,
        children: [],
        value: "this is html file",
      },
    ],
  },
];

const extensionToLanguage = {
  ts: "typescript",
  py: "python",
  cpp: "cpp",
  js: "javascript",
  html: "html",
};
const Playground = () => {
  const [Data, setData] = useState(Files);
  const [codeValue, setCodeValue] = useState<string>("");
  const [codeLanguage, setCodeLanguage] = useState("javascript");
  const { insertNode } = useTraverseTree();

  // const handleInsertNode = (folderId, item, isFolder) => {
  //   const newData = insertNode(explorerData, folderId, item, isFolder);
  //   setData(newData);
  // };
  const fileLanguageDetection: (filename: string) => string = (
    filename: string
  ) => {
    const extension = filename.split(".")[1];
    // let language: string = (<string>extensionToLanguage[extension]);
    let language: string = extensionToLanguage[extension] as string;
    return language;
  };
  const getCodeValueAndLanguage: (arg1: string, arg2: string) => void = (
    code: string,
    filename: string
  ) => {
    const proglanguage = fileLanguageDetection(filename);
    console.log(proglanguage);
    setCodeLanguage(proglanguage);
    setCodeValue(code);
  };
  // const handleFileUpdate:()=>{

  // }

  return (
    <ResizablePanelGroup direction="horizontal" className="w-screen h-screen">
      <ResizablePanel defaultSize={20}>
        <div className="h-screen   min-w-[300px] bg-black text-white">
          <FileExplorer
            Data={Data}
            getCodeValueAndLanguage={getCodeValueAndLanguage}
          />
        </div>
      </ResizablePanel>
      <ResizableHandle className="bg-black" />
      <ResizablePanel defaultSize={40}>
        <div className="flex-1  h-full   min-w-[300px] flex-col flex">
          <Editor
            height="100vh"
            theme="vs-dark"
            defaultValue="// pls write your code here"
            value={codeValue}
            language={codeLanguage}
            onChange={(value: string | undefined) => {
              setCodeValue(value!);
            }}
            options={{
              suggestOnTriggerCharacters: true,
              quickSuggestions: true,
              quickSuggestionsDelay: 100,
              // You can customize other options as needed
            }}
          />
        </div>
      </ResizablePanel>
      <ResizableHandle className="bg-transparent" />
      <ResizablePanel>
        <ResizablePanelGroup
          direction="vertical"
          className="min-h-screen flex flex-col"
        >
          <ResizablePanel defaultSize={40} className="flex1">
            {/* <div className="flex-1  h-screen   bg-gree-500 "> */}
            <WebView codeValue={codeValue} setCodeValue={setCodeValue} />
            {/* </div> */}
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel className="flex1">
            <div className="min-h-screen">
              <CodeTerminal />
            </div>

            {/* <div>yash</div> */}
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Playground;

/**
 * <div className="flex items-center h-screen relative">
      <div className="w-[300px] h-full    bg-red-200">
        <FileExplorer
          Data={Data}
          handleFileSpecification={handleFileSpecification}
        />
      </div>
      <div className="flex-1  h-full   bg-blue-300 flex-col flex">
        <Editor
          height="100vh"
          theme="vs-dark"
          defaultValue="// pls write your code here"
          value={codeValue}
          language={codeLanguage}
          onChange={(value: string | undefined) => {
            setCodeValue(value);
          }}
          options={{
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            quickSuggestionsDelay: 100,
            // You can customize other options as needed
          }}
        />
      </div>
      <div className="flex-1  h-full   bg-gree-500 ">
        div3
        <WebView codeValue={codeValue} setCodeValue={setCodeValue} />
      </div>
    </div>
 * 
 * 
 */

{
  /* <ResizablePanel defaultSize={50}>
  <ResizablePanelGroup direction="vertical">
    <ResizablePanel defaultSize={25}>
      <div className="flex h-full items-center justify-center p-6">
        <span className="font-semibold">Two</span>
      </div>
    </ResizablePanel>
    <ResizableHandle />
    <ResizablePanel defaultSize={75}>
      <div className="flex h-full items-center justify-center p-6">
        <span className="font-semibold">Three</span>
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
</ResizablePanel>; */
}
