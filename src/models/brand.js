"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose: { Schema, model } } = require('../configs/dbConnection');
/* ------------------------------------------------------- */

const brandSchema = new Schema({

    name: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },

    image: {
        type: String,
        trim: true,
    }
    
}, { timestamps: true });

module.exports = model('Brand', brandSchema);
