"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose: { Schema, model } } = require('../configs/dbConnection');
/* ------------------------------------------------------- */

const purchaseSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    firmId: {
        type: Schema.Types.ObjectId,
        ref: 'Firm',
        required: true
    },

    brandId: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },

    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        min: 1
    },

    price: {
        type: Number,
        required: true,
        min: 1
    },

    amount: {
        type: Number,
        set: function () { return this.quantity * this.price }, // only works if this field is sent
        default: function () { return this.quantity * this.price }, // works on create
        transform: function () { return this.quantity * this.price }, // works on update
    }

}, { timestamps: true });

module.exports = model('Purchase', purchaseSchema);
