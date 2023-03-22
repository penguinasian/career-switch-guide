import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config()

const authValidation = async (req, res, next) => {

    const { authorization } = req.headers
    console.log(req.headers)
    console.log(authorization)

    console.log(authorization !== 'undefined')
    
    if (authorization === 'undefined') {
        return res.status(401).json({error: 'Authorization token needed'})
    }

    const token = authorization.split(' ')[1]

    try {

       jwt.verify(token, process.env.JWT_SECRET)
       next()
       

    } catch (error) {
        console.error(error)
        res.status(401).json({error: 'Request is not authorized!'})
    }
}

export default authValidation