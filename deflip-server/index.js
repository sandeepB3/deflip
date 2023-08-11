const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const { connectToDatabase } = require("./db.js");
require('dotenv').config();

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());


//Iske files mien changes
const myMiddleware = require('./middlewares/Auth.js');
const UserAuth = require('./routes/UserAuth.js');
const SellerAuth = require('./routes/SellerAuth.js');

//Idhar use karte jaa
app.use(myMiddleware, UserAuth);
app.use(myMiddleware, SellerAuth);

app.get("/", (req,res) =>{
    res.send("This is index.js");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectToDatabase();
});