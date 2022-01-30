const blogRouter = require("./blogs");

const route = (app) => {
  app.use("/blogs", blogRouter);
};

module.exports = route;
