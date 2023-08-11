const mysql = require("mysql");
const { promisify } = require("util");

exports.db = mysql.createConnection({
    host: "localhost",
    user: "sandeep",
    password: "password",
    database: "IRCTC"
});

exports.connectToDatabase = async () => {
    try {
        await promisify(exports.db.connect).call(exports.db);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
};
