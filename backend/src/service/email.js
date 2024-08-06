const nodemailer = require("nodemailer");

// Create Transporter
let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Send Email function
let sendMail = async (mailOptions) => {
    console.log("email sending options: ", mailOptions);
    mailOptions.from = process.env.SMTP_MAILFROM;
    console.log(" mailOptions.from: ",  mailOptions.from);

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Email error')
            return console.log(error);
        }
    });
};

async function wrappedSendEmail(mailOptions) {
    return new Promise((resolve, reject) => {
        mailOptions.from = process.env.SMTP_MAILFROM;
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error("error is" + erro);
                reject(false); // or use reject(false) but then you will have to handle errors
            }
            else {
                console.log('Email sent: ' + info.response);
                resolve(true);
              }
        })
    })
}

module.exports = { sendMail, wrappedSendEmail };
