const mongoose = require("mongoose")
const express = require("express")
const BookInstance = require("../models/bookInstance")
const { body, validationResult } = require("express-validator")

exports.book_instance_list = async (req, res) => {
    try {
        const bookInstances = await BookInstance.find().populate("book")
        res.status(200).json(bookInstances)
    } catch (err) {
        res.status(500).json({errors: [{msg: err.message}]})
    }
}

exports.book_instance_detail = async (req, res) => {
    try {
        const bookInstance = await BookInstance.findById(req.params.id).populate("book")
        if (bookInstance == null) {
            res.status(404).json({errors: [{msg: "Book instance not found"}]})
            return
        }
        res.status(200).json(bookInstance)
    } catch {
        res.status(500).json({errors: [{msg: err.message}]})
    }
}

exports.create_book_instance = [
    body("book", "Book must be specified").trim().isLength({min: 1}).escape(),
    body("imprint", "Imprint must be specified").trim().isLength({min: 1}).escape(),
    body("status").escape(),
    body("due_back", "Invalid date").optional({checkFalsy: true}).isISO8601().toDate(),

    async (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            res.status(400).json({bookInstance: req.body, errors: errors.array()})
            return
        } else {
            try {
                const bookInstance = new BookInstance(req.body)
                const newBookInstance = await bookInstance.save()
                res.status(201).json(newBookInstance)
            } catch (err) {
                res.status(500).json({errors: [{msg: err.message}]})
            }
        }
    }
]

exports.update_book_instance = [
    body("book", "Book must be specified").trim().isLength({min: 1}).escape(),
    body("imprint", "Imprint must be specified").trim().isLength({min: 1}).escape(),
    body("status").escape(),
    body("due_back", "Invalid date").optional({checkFalsy: true}).isISO8601().toDate(),

    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            res.status(400).json({bookInstace: req.body, errors: errors.array()})
            return
        } else {
            try {
                const updatedBookInstance = await BookInstance.findByIdAndUpdate(req.params.id, req.body, {new: true})
                if (updatedBookInstance == null) {
                    res.status(404).json({errors: [{msg: "Book instance not found"}]})
                    return
                }
                res.status(200).json(updatedBookInstance)
            } catch (err) {
                res.status(500).json({errors: [{msg: err.message}]})
            }
        }
    }
]

exports.delete_book_instance = async (req, res) => {
    try {
        const deletedBookInstance = await BookInstance.findByIdAndRemove(req.params.id)
        if (deletedBookInstance == null) {
            res.status(404).json({errors: [{msg: "Book instance not found"}]})
            return
        }
        res.status(200).json({deletedBookInstance})
    } catch {
        res.status(500).json({errors: [{msg: err.message}]})
    }
}