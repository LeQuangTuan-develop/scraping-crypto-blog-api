const blogRouter = require("./blogs")
const newsRouter = require("./newss")
const userRouter = require("./users")

const route = (app, admin) => {
  app.use("/api/blogs", blogRouter)
  app.use("/api/news", newsRouter)
  app.use("/api/users", userRouter)

  app.use("/api/admin", admin)

  app.get("*", (req, res) => {
    res.json({
      message: "don't exist this api",
    })
  })
}

module.exports = route
