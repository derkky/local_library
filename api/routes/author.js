const express = require("express")
const router = express.Router()

const author_controller = require("../controllers/authorController")

// Get all authors
router.get("/all", author_controller.author_list)

// Get one author
router.get("/:id", author_controller.author_detail)

// Create new author 
router.post("/create", author_controller.create_author)

// Update one author
router.post("/:id/update", author_controller.update_author)

// Delete one author
router.post("/:id/delete", author_controller.delete_author)

module.exports = router