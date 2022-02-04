const Blog = require("../models/Blog");

class BlogService {
  async getAllBlogs() {
    return await Blog.find();
  }

  async createBlog(data) {
    const newBlog = await new Blog(data);
    const saveBlog = await newBlog.save();

    return saveBlog
  }
}

module.exports = new BlogService();
