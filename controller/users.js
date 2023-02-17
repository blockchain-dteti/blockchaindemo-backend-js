const users = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.getUser = async (req, res) => {
    try {
        const user = await users.findAll({
            attributes: ['id', 'name']
        });
        res.json(user)
    } catch (error) {
        console.log(error)
    }
};

exports.newUser = async (req, res) => {
    const { name, password, role } = req.body
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt)
    try {
        await users.create({
            name: name,
            password: hashPassword,
            role: role,
        });
        res.json({ msg: "User Ditambahkan" })
    } catch (error) {
        console.log(error)
    }
}

exports.login = async (req, res) => {
    try {
        const user = await users.findAll({
            where: {
                name: req.body.name
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password)
        if (!match) res.status(400).json({ msg: "Password tidak sesuai" })
        const userId = user[0].id
        const name = user[0].name
        const accessToken = jwt.sign({ userId, name }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        })
        const refreshToken = jwt.sign({ userId, name }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })
        await users.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
            }
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.json({ accessToken })
    } catch {
        res.status(404).json({ msg: "Username tidak ditemukan" })
    }
}

exports.logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await users.findAll({
        where: {
            refresh_token: refreshToken
        }
    })
    if (!user[0]) return res.sendStatus(204)
    const userId = user[0].id
    await users.update({ refreshToken: null }, {
        where: {
            id: userId
        }
    })
    res.clearCookie('refreshToken');
    return res.sendStatus(200)
}