const BlogService = require("../services/blog.service")

class BlogController {
  // GET blogs
  async index(req, res) {
    console.log("hello nodejs")
    try {
      const blogs = await BlogService.getAllBlogs()
      res.status(200).json(blogs)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // Get blogs/:id
  async showBlog(req, res) {
    try {
      const blog = await BlogService.getBlogById(req.params.id)
      res.status(200).json(blog)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // POST blogs/create
  async create(req, res) {
    try {
      const saveBlog = await BlogService.createBlog(req.body)
      res.status(200).json(saveBlog)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = new BlogController()
