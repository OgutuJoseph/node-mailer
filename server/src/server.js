const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();


const EmailRoutes = require('./routes/email');

// middleware
app.use(cors());
app.use(express.json());



app.use('/api', EmailRoutes);


const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});