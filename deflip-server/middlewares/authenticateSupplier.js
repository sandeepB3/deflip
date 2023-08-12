export const authenticateSupplier=(req,res,next)=>{
    
    if(!req.session.supplier){
    return res.status(500).send({
        message:"Your session has been timed out"
    })
}
next()
}