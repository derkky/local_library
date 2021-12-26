const Book = require("../models/book")
const BookInstance = require("../models/bookInstance")
const express = require("express")
const mongoose = require("mongoose")
const { body, validationResult } = require("express-validator")

exports.book_list = async (req, res) => {
    try {
        const books = await Book.find().populate("author")
        res.status(200).json(books)
    } catch (err) {
        res.status(500).json({errors: [{msg: err.message}]})
    }
}

exports.book_details = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("author").populate("genre")
        if (book == null){
            res.status(404).json({errors: [{msg: "Book not found"}]})
            return
        }

        const bookInstances = await BookInstance.find({"book": req.params.id}, "imprint status due_back")
        res.status(200).json({book: book, bookInstances: bookInstances})
    } catch (err) {
        res.status(500).json({errors: [{msg: err.message}]})
    }
}

exports.create_book = [
    body("title", "Title must not be empty").trim().isLength({min: 1}).escape(),
    body("author", "Author must not be empty").trim().isLength({min: 1}).escape(),
    body("summary", "Summary must not be empty").trim().isLength({min: 1}).escape(),
    body("isbn", "ISBN must not be empty").trim().isLength({min: 1}).escape(),
    body("genre.*").escape(),

    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            res.status(400).json({book: req.body, errors: errors.array()})
            return
        } else {
            const book = new Book(req.body)
            try {
                const newBook = await book.save()
                res.status(201).json(newBook)
            } catch (err) {
                res.status(500).json({errors: [{msg: err.message}]})
            }
        }
    }
]

exports.update_book = [
    body("title", "Title must not be empty").trim().isLength({min: 1}).escape(),
    body("author", "Author must not be empty").trim().isLength({min: 1}).escape(),
    body("summary", "Summary must not be empty").trim().isLength({min: 1}).escape(),
    body("isbn", "ISBN must not be empty").trim().isLength({min: 1}).escape(),
    body("genre.*").escape(),

    async (req, res) => {
        const errors = validationResult(req)
        
        if (!errors.isEmpty()){
            res.json({book: req.body, errors: errors.array()})
            return
        } else {
            try {
                const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true})
                if (updatedBook == null){
                    return res.status(404).json({msg: "Book not found"})
                }
                res.status(200).json(updatedBook)
            } catch (err) {
                res.status(500).json({errors: [{msg: err.message}]})
            }
        }
    }
]

exports.delete_book = async (req, res) => {
    try {
        const bookInstances = await BookInstance.find( {"book": req.params.id} )
        if  (bookInstances.length > 0){
            res.json({errors: [{msg: "Book has book instances, delete them first"}]})
            return
        } else {
            const deletedBook = await Book.findByIdAndRemove(req.params.id)
            if (deletedBook == null){
                res.status(404).json({errors: [{msg: "Book not found"}]})
                return
            }
            res.status(200).json(deletedBook)
        }
    } catch (err) {
        res.status(500).json({errors: [{msg: err.message}]})
    }
}