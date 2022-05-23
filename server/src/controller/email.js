
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.NM_EMAIL,
        pass: process.env.NM_WORD,
        clientId: process.env.NM_OAUTH_CLIENTID,
        clientSecret: process.env.NM_OAUTH_CLIENT_SECRET,
        refreshToken: process.env.NM_OAUTH_REFRESH_TOKEN,
    },
});
transporter.verify((err, success) => {
    err
    ? console.log(err)
    : console.log(`=== Server is ready to take messages: ${success} ===`);
});

exports.SendNewEmail = (req, res) => {
    const data = req.body.values;
    const reference = data.reference
    const customer_name= data.customer_name
    const customer_email= data.customer_email
    const description= data.description
    const invoice_date= data.invoice_date
    const invoicedata= data.invoicedata
    // const { reference, customer_name, customer_email, description, invoice_date, invoiceData } = data;
    
    let mailOptions = {
        to: `${customer_email}`,
        from: process.env.NM_EMAIL,
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
            console.log('errror: ', err);
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
};