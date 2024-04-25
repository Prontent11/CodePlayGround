import { useEffect, useRef, useState } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
const fitAddon = new FitAddon();

const OPTIONS_TERM = {
  useStyle: true,
  screenKeys: true,
  cursorBlink: true,
  cols: 200,
  theme: {
    background: "black",
  },
};
const CodeTerminal = () => {
  const terminalRef = useRef();
  useEffect(() => {
    if (!terminalRef || !terminalRef.current) {
      return;
    }
    const term = new Terminal(OPTIONS_TERM);
    console.log(terminalRef.current);
    term.open(terminalRef.current!);
    term.write("hello world");

    term.onData((data) => {
      console.log(data);
      term.writeln(data);
    });
    return () => {
      term.dispose();
    };
  }, []);
  return (
    <div className=" bg-black text-white min-h-screen" ref={terminalRef}></div>
  );
};

export default CodeTerminal;
