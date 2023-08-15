export const authenticateUser = (req, res, next) => {
    if(!req.session.user){
        return res.status(500).send({
            message:"Your session has been timed out"
        })
    }
    next()
}

