require("dotenv").config()

import jwt from 'jsonwebtoken';

export const createJWT = () => {
    let payload = {name: 'sonw', address: "ha noi"}
    let key= process.env.JWT_SECRET
    let token= null;
    try {
        token = jwt.sign(payload, key);
    } catch(error) {
        console.log(error)
    }

    return token ;
}


export const verifyToken = (token) => {
    let key= process.env.JWT_SECRET
    let data = null

    try {
        let decode = jwt.verify(token, key);
        data = decode;
    } catch (error) {
        console.log("error:", error)
    }
    
    return data

}