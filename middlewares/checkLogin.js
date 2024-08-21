const jwt = require('jsonwebtoken')
const checkLogin = (req, res, next) =>{
    const { authorization} = req.headers;
    try {
        const token = authorization.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const {username, userId} = decode;
        req.username = username;
        req.userId = userId;
        next()
    } catch (error) {
        next('Authorization failed');
    }
}

module.exports = checkLogin;