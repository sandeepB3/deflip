import db from '../utils/db'
export const publishNotification=(message,userID)=>{
    db.query('INSERT INTO NOIFICATION(publishedTo,content,createdAt',[userID,message,new Date()])
}