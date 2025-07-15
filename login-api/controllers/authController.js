const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const prisma = new PrismaClient()

exports.signup = async (req, res) => {
    const {email, password} = req.body;

    const userExists = await prisma.user.findUnique({where: { email }})
    if (userExists) return res.status(400).json({error: "Email already exists"})

    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
        data: {email, password: hashed }
    })

    res.json({message: "User created", user: {id: user.id, email: user.email}})
}

exports.login = async (req, res) => {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({where: {email}})
    if (!user) return res.status(401).json({error: "Invalid Credentials"})

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(401).json({error: "Invalid Credentials"})

    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'})
    res.json({ message: "Login Successful", token})
}