const express = require("express")
const router = express.Router()

const genre_controller = require("../controllers/genreController")

// Get all genres
router.get("/all", genre_controller.genre_list)

// Get one genre
router.get("/:id", genre_controller.genre_detail)

// Create new genre
router.post("/create", genre_controller.create_genre)

// Update one genre
router.post("/:id/update", genre_controller.update_genre)

// Delete one genre
router.post("/:id/delete", genre_controller.delete_genre)

module.exports = router

