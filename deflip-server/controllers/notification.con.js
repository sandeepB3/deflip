import db from '../utils/db'
export const publishNotification=async (message,userID)=>{
    db.query('INSERT INTO NOIFICATION(publishedTo,content,createdAt',[userID,message,new Date()])
}

export const getNotifications=async(req,res)=>{
    const {userID}=req.params
    db.query(`SELECT * FROM NOTIFICATION WHERE publishedTo=?
    ORDER BY createdAt DESC;
    `,[userID],async(err,result)=>{
        if (err) {
            console.error(err);
            
            return res.status(500).send({
              message: 'Error fetching notifications',
              error: err
            });
          }

  
          
          res.status(200).send({
            message: 'Notifications fetched successfully',
            notifications: result, 
          });
    })
}