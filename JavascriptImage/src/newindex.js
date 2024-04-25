export const callingfunc = (app) => {
  app.get("/king", (req, res) => {
    res.send("king is here bro don't take any kind of tension");
  });
};
