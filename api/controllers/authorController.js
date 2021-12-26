const Author = require("../models/author")
const Book = require("../models/book")
const mongoose = require("mongoose")
const express = require("express")
const { body, validationResult } = require("express-validator")

exports.author_list = async (req, res) => {
    try {
        const authors = await Author.find()
        res.json(authors)
    } catch (err) {
        res.status(500).json({errors: [{msg: err.message}]})
    }
}

exports.author_detail = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id)
        if (author == null) {
            res.status(404).json({errors: [{msg:"Author not found"}]})
            return
        }

        const authorBooks = await Book.find( {"author" : req.params.id }, "title summary")
        
        res.status(200).json({author: author, books:authorBooks})
    } catch(err) {
        res.status(500).json({errors: [{msg: err.message}]})
    }
}

exports.create_author = [
    body("first_name").trim().isLength({min: 1}).escape().withMessage("First name must be specified")
        .isAlphanumeric().withMessage("First name has non-alphanumeric characters"),
    body("family_name").trim().isLength({min: 1}).escape().withMessage("Family name must be specified")
        .isAlphanumeric().withMessage("Family name has non-alphanumeric characters"),
    body("date_of_birth", "Invalid date of birth").optional({checkFalsy: true}).isISO8601().toDate(),
    body("date_of_death", "Invalid date of death").optional({checkFalsy: true}).isISO8601().toDate(),

    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            res.status(400).json({author: req.body, errors: errors.array()})
            return
        } else {
            try {
                const author = new Author(req.body)
                const newAuthor = await author.save()
                res.status(201).json(newAuthor)
            } catch (err) {
                res.status(500).json({errors: [{msg: err.message}]})
            }
        }
    }
]

exports.update_author = [
    body("first_name").trim().isLength({min: 1}).escape().withMessage("First name must be specified")
        .isAlphanumeric().withMessage("First name has non-alphanumeric characters"),
    body("family_name").trim().isLength({min: 1}).escape().withMessage("Family name must be specified")
        .isAlphanumeric().withMessage("Family name has non-alphanumeric characters"),
    body("date_of_birth", "Invalid date of birth").optional({checkFalsy: true}).isISO8601().toDate(),
    body("date_of_death", "Invalid date of death").optional({checkFalsy: true}).isISO8601().toDate(),

    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            res.status(400).json({author: req.body, errors: errors.array()})
            return
        } else {
            try {
                const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, {new: true})
                if (updatedAuthor == null) {
                    res.status(404).json({errors: [{msg:"Author not found"}]})
                    return
                }
                res.status(200).json(updatedAuthor)
            } catch(err) {
                res.status(500).json({errors: [{msg: err.message}]})
            }
        }
    }
]

exports.delete_author = async (req, res) => {

    try {
        const authorBooks = await Book.find( {"author" : req.params.id })
        if (authorBooks.length > 0){
            res.json({errors: [{msg: "Author has books, delete them first"}]})
            return
        } else {
            const deletedAuthor = await Author.findByIdAndRemove(req.params.id)
            if (deletedAuthor == null) {
                res.status(404).json({errors: [{msg:"Author not found"}]})
                return
            }
            res.status(200).json(deletedAuthor)
        }
    } catch (err) {
        res.status(500).json({errors: [{msg: err.message}]})
    }
}