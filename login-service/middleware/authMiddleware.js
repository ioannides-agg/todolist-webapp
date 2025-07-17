jwt = require("jsonwebtoken")

function authToken(req, res, next) {
    const authHeader = req.headers['authorization']
    if (!authHeader) return res.sendStatus(401);

    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_SECRET, (err, decodedId) => {
        if (err) return res.sendStatus(403); //invalid token
            req.userId = decodedId.userId;
            next();
    });
}

module.exports = authToken;