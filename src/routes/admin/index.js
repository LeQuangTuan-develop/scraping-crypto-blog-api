const adminBlogRouter = require("./adminBlogs")

const AdminRoute = (admin) => {
  admin.use("/blogs", adminBlogRouter)
}

module.exports = AdminRoute
