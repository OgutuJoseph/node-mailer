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
    const data = req.body.values;
    console.log('dataa: ', data);
    const reference = data.reference;
    const customer_name = data.customer_name;
    const customer_email = data.customer_email;
    const description = data.description;
    const invoice_date = data.invoice_date;
    const invoiceData = data.invoiceData;
    let mailOptions = {
        to: `${customer_email}`,
        from: process.env.EMAIL,
        subject: `Invoice for: Order Ref # ${reference}`,
        text: ` 
        Hi Mr. ${customer_name}, here is your invoice for the Order Ref #: ${reference}.

        Customer Details:
        Customer: ${customer_name}
        Email: ${customer_email}

        Invoice:
        Order Ref #: ${reference}
        invoice Date: ${invoice_date}
        Description: ${description}
        

        // For Items:
        <-- TBD -->
        
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