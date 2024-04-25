const Docker = require("dockerode");
const docker = new Docker();

function createFileInContainer(containerId, filePath, fileName, fileContent) {
  const command = `sh -c 'echo "${fileContent}" > ${filePath}/${fileName}'`;

  docker.getContainer(containerId).exec(
    {
      Cmd: ["/bin/sh", "-c", command],
      AttachStdout: true,
      AttachStderr: true,
    },
    (err, exec) => {
      if (err) {
        console.error("Error creating file in container:", err);
        return;
      }

      exec.start((err, stream) => {
        if (err) {
          console.error("Error starting exec instance:", err);
          return;
        }

        docker
          .getContainer(containerId)
          .modem.demuxStream(stream, process.stdout, process.stderr);
      });
    }
  );
}

// Example usage
const containerId = "3e7400cbbe5e"; // Replace with your container ID
const filePath = "/src/src"; // Path to the src folder inside the container
const fileName = "yash.js";
const fileContent = 'console.log("Hello, Yash!");';

createFileInContainer(containerId, filePath, fileName, fileContent);
