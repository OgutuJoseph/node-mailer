const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors");
require("dotenv").config();

// middleware
app.use(express.json());
app.use(cors());

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    pass: process.env.WORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
});
transporter.verify((err, success) => {
    err
    ? console.log(err)
    : console.log(`=== Server is ready to take messages: ${success} ===`);
});

app.post("/send", function (req, res) {
    let mailOptions = {
        to: `${req.body.mailerState.email}`,
        from: process.env.EMAIL,
        subject: `Message from: ${req.body.mailerState.name}`,
        text: ` Hi Mr. ${req.body.mailerState.name}, here is your invoice for the Order Ref #: ${req.body.mailerState.reference}.

        Customer Details:
        Customer: ${req.body.mailerState.name}
        Address: ${req.body.mailerState.address}
        Phone: ${req.body.mailerState.phone}
        Email: ${req.body.mailerState.email}

        Invoice:
        Order Ref #: ${req.body.mailerState.reference}
        Amount Due: ${req.body.mailerState.amount_due}
        Invoice Date: ${req.body.mailerState.invoice_date}
        Due Date: ${req.body.mailerState.due_date}

        For Items:
        Item: ${req.body.mailerState.item}
        Price: ${req.body.mailerState.price}
        Quantity: ${req.body.mailerState.quantity}
        Total: ${req.body.mailerState.total_price}
        
        `,
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            res.json({
            status: "fail",
            });
        } else {
            console.log("== Message Sent ==");
            res.json({
            status: "success",
            });
        }
    });
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});