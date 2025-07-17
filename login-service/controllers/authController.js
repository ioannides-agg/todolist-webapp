const { PrismaClient, Prisma } = require('@prisma/client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

exports.signup = async (req, res) => {
    const {email, password} = req.body;

    const userExists = await prisma.user.findUnique({where: { email }});
    if (userExists) return res.status(400).json({error: "Email already exists"});

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {email: email, password: hashed, refreshToken: ""}
    });

    res.json({message: "User created", user: {id: user.id, email: user.email}});
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({where: {email}});
    if (!user) return res.status(401).json({error: "Invalid Credentials"});

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({error: "Invalid Credentials"});

    const accessToken = jwt.sign({"userId": user.id}, process.env.ACCESS_SECRET, {expiresIn: '30s'});

    let refreshToken;

    if (user.refreshToken /*&& jwt.verify*/) {
        refreshToken = user.refreshToken;
    } else {
        refreshToken = jwt.sign({"userId": user.id}, process.env.REFRESH_SECRET, {expiresIn: '1d'});
        const storeRefreshToken = await prisma.user.update({
            where:{id: user.id},
            data: {
                email: Prisma.skip,
                password: Prisma.skip,
                refreshToken: refreshToken,
            }
        });

        if(!storeRefreshToken) return res.status(500); //return internal server error
    }

    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.json({accessToken: accessToken});
}

exports.validate = async (req, res) => {
    const userId = req.userId;
    
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        }, 
        select:{
            email: true,
        }})

    if (!user) return res.status(404).json({error: 'User not found'});

    res.json(user);
}