const { PrismaClient, Prisma } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

exports.handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);

    //console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    const user = prisma.user.findUnique({where : {refreshToken: refreshToken}})
    if(!user) return res.sendStatus(403);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);

            const accessToken = jwt.sign({"userId": user.id}, process.env.ACCESS_SECRET, {expiresIn: '30s'});

            res.json({ accessToken });
        }
    )
}