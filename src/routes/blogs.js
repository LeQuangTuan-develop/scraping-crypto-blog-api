const express = require("express")
const router = express.Router()
const BlogController = require("../app/controllers/Blog.controller")

router.get("/", BlogController.index)
router.get("/:id", BlogController.showBlog)
router.post("/create", BlogController.create)

module.exports = router
