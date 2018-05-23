const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function authorization(req, res, next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send(
                            'Access denied. No token')

    try {
        const decoded = jwt.verify(
                    token, config.get('jwtPrivateKey'));
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).send('invalid token');
    }
}


