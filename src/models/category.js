"use strict"
const { mongoose: { Schema, model } } = require('../configs/dbConnection');
/* ------------------------------------------------------- */

const CategorySchema = new Schema({

    name: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    }

}, { timestamps: true, collection: 'categories' });

module.exports = model('Category', CategorySchema);
