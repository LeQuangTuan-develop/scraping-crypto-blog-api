const blogRouter = require("./blogs");

const route = (app, admin) => {
  app.use("/api/blogs", blogRouter);

  app.use("/api/admin", admin);

  app.get("*", (req, res) => {
    res.json({
      message: "don't exist this api",
    });
  });
};

module.exports = route;
