import dotenv from 'dotenv'
dotenv.config()

import jwt from 'jsonwebtoken';

export const verifySupplierToken = (req, res, next) => {
  let token = null; 
  console.log(req.headers)
  if (req.headers.authorization) {
    const authHeaderVal = req.headers.authorization;
    token = authHeaderVal.split(' ')[1];
  }else {
    token = req.cookie.access_token; 
  }
  
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.redirect('/supplier/login');
        }
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.supplier = decoded;
      next();
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error verifying token' });
  }
};