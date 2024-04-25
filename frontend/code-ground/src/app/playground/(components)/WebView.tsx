import React, { Dispatch, SetStateAction } from "react";
import Iframe from "react-iframe";
const WebView = ({
  codeValue,
  setCodeValue,
}: {
  codeValue: string;
  setCodeValue: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <Iframe
      url="https://ui.shadcn.com/docs/components/resizable"
      id=""
      className="h-full w-full"
      display="block"
      position="relative"
    />
  );
};

export default WebView;
