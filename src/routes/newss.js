const express = require("express")
const router = express.Router()
const NewsController = require("../app/controllers/News.controller")

router.get("/", NewsController.index)
router.get("/:id", NewsController.showNews)
router.post("/create", NewsController.create)

module.exports = router
