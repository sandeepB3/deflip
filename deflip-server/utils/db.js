import mysql from "mysql";
import { promisify } from "util";

export const db = mysql.createConnection({
    host: "database-1.cfs3lkdpwrvj.ap-southeast-2.rds.amazonaws.com",
    database: "deflip",
    user: "admin",
    password: "hello1234",
    port: "3306"
});

export const connectToDatabase = async () => {
    try {
        await promisify(db.connect).call(db);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
};