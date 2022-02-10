const Blog = require("../models/Blog")

class BlogService {
  async getAllBlogs() {
    return await Blog.find()
    // use Blog.find().lean() If you're executing a query and sending the results without modification to
  }

  async createBlog(data) {
    const newBlog = await new Blog(data)
    const saveBlog = await newBlog.save()

    return saveBlog
  }

  async getBlogById(id) {
    const blog = await Blog.findById(id)
    return blog
  }
}

module.exports = new BlogService()
