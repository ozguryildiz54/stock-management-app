"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose: { Schema, model } } = require('../configs/dbConnection');
/* ------------------------------------------------------- */

const productSchema = new Schema({

    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    brandId: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },

    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },

    quantity: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

module.exports = model('Product', productSchema);
