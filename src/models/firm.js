"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose: { Schema, model } } = require('../configs/dbConnection');
/* ------------------------------------------------------- */

const firmSchema = new Schema({

    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },

    phone: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },

    address: {
        type: String,
        trim: true,
        required: true
    },

    image: {
        type: String,
        trim: true
    }
    
}, { timestamps: true });

module.exports = model('Firm', firmSchema);
