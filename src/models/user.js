"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose: { Schema, model } } = require('../configs/dbConnection');
const passwordEncrypt = require('../helpers/passwordEncrypt');
const CustomError = require('../helpers/customError');
/* ------------------------------------------------------- */

const userSchema = new Schema({

    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
    },

    password: {
        type: String,
        trim: true,
        required: true,
        set: passwordEncrypt
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
    },

    firstName: {
        type: String,
        trim: true,
        required: true,
    },

    lastName: {
        type: String,
        trim: true,
        required: true,
    },

    isActive: {
        type: Boolean,
        default: true
    },

    isStaff: {
        type: Boolean,
        default: false
    },

    isAdmin: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

userSchema.pre(['save', 'findOneAndUpdate'], function (next) {
    // console.log('pre-save worked');
    // console.log(this);

    const data = this._update ?? this;

    const isPassValidated = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(data.password);
    const isEmailValidated = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email);

    if (!isEmailValidated) next(new CustomError('Email is not validated', 400));
    if (!isPassValidated) next(new CustomError('Password is not validated', 400));

    if (this._update) { // update
        this._update.password = passwordEncrypt(data.password);
    } else { // create
        this.password = passwordEncrypt(data.password);
    }

    next();
});

module.exports = model('User', userSchema);
