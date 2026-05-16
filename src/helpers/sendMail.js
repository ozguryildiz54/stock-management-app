"use strict"
// sendMail(to, subject, message)

const nodemailer = require('nodemailer')

module.exports = function sendMail(to, subject, message) {

    // No-op when mail credentials are not configured.
    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) return

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    })

    transporter.sendMail({
        from: process.env.MAIL_USER,
        to,
        subject,
        text: message,
        html: message,
    }, (error, info) => {
        error ? console.log(error) : console.log(info)
    })
}
