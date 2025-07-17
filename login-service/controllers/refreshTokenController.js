const { PrismaClient, Prisma } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

exports.handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);

    //console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    const user = await prisma.user.findUnique({where : {refreshToken: refreshToken}})
    if(!user) return res.sendStatus(403);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET,
        (err, decoded) => {
            if (err || user.id !== decoded.userId) return res.sendStatus(403);

            const accessToken = jwt.sign({"userId": user.id}, process.env.ACCESS_SECRET, {expiresIn: '30s'});

            res.json({ accessToken });
        }
    )
}