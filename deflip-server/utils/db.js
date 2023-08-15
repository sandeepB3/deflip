import mysql from "mysql";
import session from "express-session";
import MySQLStore from "express-mysql-session";
import { promisify } from "util";

const MySQLStoreSession = MySQLStore(session);

export const db = mysql.createConnection({
    host: "database-1.cfs3lkdpwrvj.ap-southeast-2.rds.amazonaws.com",
    database: "deflip",
    user: "admin",
    password: "hello1234",
    port: "3306"
});

export const sessionStore = new MySQLStoreSession({
    expiration: 1000000000,
    createDatabaseTable: true,
    schema:{
        tableName: 'sessiontbl',
        columnNames:{
            session_id: 'sessionID',
            expires: 'expires',
            data: 'data'
        }
    }
}, db);

export const connectToDatabase = async () => {
    try {
        await promisify(db.connect).call(db);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
};
