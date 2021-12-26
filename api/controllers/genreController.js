const express = require("express")
const mongoose = require("mongoose")
const Genre = require('../models/genre')
const Book = require("../models/book")
const { body, validationResult } = require("express-validator")

exports.genre_list = async (req, res) => {
    try {
        const genres = await Genre.find()
        res.status(200).json(genres)
    } catch (err) {
        res.status(500).json({errors: [{msg: err.message}]})
    }
}

exports.genre_detail = async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id)

        if (genre == null){
            res.status(404).json({errors: [{msg: "Genre not found"}]})
            return
        }

        const books = await Book.find({"genre": req.params.id})
        res.status(200).json({genre: genre, books: books})

    } catch (err) {
        res.status(500).json({errors: [{msg: err.message}]})
    }
}

exports.create_genre = [
    body("name", "Genre name required").trim().isLength({ min: 1 }).escape(),
    async (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(400).json({genre: req.body, errors:errors.array()})
            return
        } else {
            try {
                // Check for existing genre
                foundGenre = await Genre.findOne( {"name": req.body.name})
                if (foundGenre) {
                    res.status(400).json({errors: [{msg: "Genre already exists"}]})
                    return
                } else {
                    const genre = new Genre(req.body)
                    const newGenre = await genre.save()
                    res.status(200).json(newGenre)
                }
            } catch (err) {
                res.status(500).json({errors: [{msg: err.message}]})
            }
        }
    }
]

exports.update_genre = [
    body("name", "Genre name required").trim().isLength({ min: 1 }).escape(),

    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(400).json({genre: req.body, errors:errors.array()})
            return
        } else {
            try {
                const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, req.body, {new:true})
                if (updatedGenre == null){
                    res.status(404).json({errors: [{msg: "Genre not found"}]})
                    return
                }
                res.status(200).json(updatedGenre)
            } catch (err) {
                res.status(500).json({errors: [{msg: err.message}]})
            }
        }
    }
]

exports.delete_genre = async (req, res) => {
    try {
        const books = await Book.find({"genre": req.params.id})
        if (books.length > 0){
            res.json({msg: "Genre has books, delete them first"})
            return
        } else {
            const deletedGenre = await Genre.findByIdAndRemove(req.params.id)
            if (deletedGenre == null){
                res.status(404).json({errors: [{msg: "Genre not found"}]})
                return 
            }
            res.status(200).json(deletedGenre)
        }
    } catch (err) {
        res.status(500).json({errors: [{msg: err.message}]})
    }
}