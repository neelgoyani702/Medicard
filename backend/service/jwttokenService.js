// usage : to sign the JWT tokens
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SEC = process.env.JWT_SEC;

const genToken = (payload) => {

    const token = jwt.sign(
        payload,
        JWT_SEC, 
        {
         expiresIn: '10s'
        }
    );

    return token;

}

module.exports = genToken;