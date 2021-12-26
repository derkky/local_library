const express = require("express")
const router = express.Router()

const bookController = require("../controllers/bookController")

// Get all books
router.get("/all", bookController.book_list)

// Get one book
router.get("/:id", bookController.book_details)

// Create book
router.post("/create", bookController.create_book)

// Update book
router.post("/:id/update", bookController.update_book)

// Delete book
router.post("/:id/delete", bookController.delete_book)

module.exports = router
