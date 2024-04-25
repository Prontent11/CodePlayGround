const pty = require("pty.js");

export function TerminalCommandExecution(
  containerName: string,
  command: string
) {
  // Create a single pseudo-terminal for reuse
  const term = pty.spawn("docker", ["exec", "-i", "YOUR_CONTAINER_ID", "sh"], {
    name: "xterm-color",
    cols: 80,
    rows: 30,
    cwd: process.cwd(),
    env: process.env,
  });
  let output = "";

  term.on("data", (data) => {
    output += data;
  });

  term.write(`${command}\n`);

  // Respond with the output when the command completes
  term.on("exit", (code) => {
    // res.status(200).json({ output, exitCode: code });
    console.log(output, code);
    return { output, code };
  });
}
