const jwt = require('jsonwebtoken');
const config = require('../config/default.json')

module.exports =  async function(req, res, next) {
    try {
        // Get token
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (req.method == 'GET') {
            //Generate token
            if(!token){
                const generatedToken = jwt.sign({data: req.headers['Access-key']}, config.token_secret, { expiresIn: '7d' });
                req.token = generatedToken
                return next()
            }
            req.token = token
            return next()
        }
        if (!token) return res.status(401).send('Unauthorized') //lacks valid authentication credentials
        //Verify token
        const decoded = jwt.verify(token, config.token_secret)
        if(!decoded) return res.status(403).send('Forbidden') //the server refuses to authorize it
        req.token = token
        return next()
    } catch (ex) {
        console.log(ex)
        return res.status(403).send('Forbidden') //the server refuses to authorize it
    }
}