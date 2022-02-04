const News = require("../models/News");

class NewsController {
  // GET Newss
  async index(req, res) {
    try {
      const newss = await News.find();
      res.status(200).json(newss);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // POST Newss/create
  async create(req, res) {
    const newNews = await new News(req.body);
    try {
      const saveNews = await newNews.save();
      res.status(200).json(saveNews);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new NewsController();
