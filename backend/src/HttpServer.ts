// import { exec } from "child_process";
import { exec } from "child_process";
import { copyFolder } from "./fileHandling";
export function HttpServer(app) {
  app.post("/createProject", async (req, res) => {
    const { username, projectType } = req.body;
    // Validate project type (for demo, only supporting "react" for now)
    if (projectType !== "react") {
      return res
        .status(400)
        .json({ success: false, message: "Unsupported project type" });
    }
    const ProjectName = `${username + projectType + Date.now()}`;
    const ProjectPath = await copyFolder("JsCode", `${ProjectName}`);
    console.log(ProjectPath, ProjectName);
    // res.json({ success: true, message: "Folder copied", data: ProjectName });
    exec(
      `docker run -v C:/Users/Yash/OneDrive/Desktop/webdev/codePlayground/UserCodes/${ProjectName}/:/src/src/  -p 4040:8080 --name ${ProjectName} js-runtime-image`,
      (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ success: false, message: "Error creating project" });
        }
        console.log(stdout);
        console.error(stderr);
        res.status(200).json({
          success: true,
          message: "Project created successfully",
          data: ProjectName,
        });
      }
    );
  });
}

export default HttpServer;
