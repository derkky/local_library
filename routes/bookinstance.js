const express = require("express")
const router = express.Router()

const book_instance_controller = require("../controllers/bookInstanceController")

// Get all book instances
router.get("/all", book_instance_controller.book_instance_list)

// Get one book instance
router.get("/:id", book_instance_controller.book_instance_detail)

// Create new book instance
router.post("/create", book_instance_controller.create_book_instance)

// Update one book instance
router.post("/:id/update", book_instance_controller.update_book_instance)

// Delete one book instance
router.post("/:id/delete", book_instance_controller.delete_book_instance)

module.exports = router