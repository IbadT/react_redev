require('dotenv').config();
const UserService = require('../services/UserService.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


class UserController {

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const findUserByEmail = await UserService.findUserByEmail(email);
            if(findUserByEmail) {
                const { id } = findUserByEmail;
                const comparePassword = await bcrypt.compare(password, findUserByEmail.password);
                if(comparePassword) {
                    const token = jwt.sign({ id }, process.env.SECURITY_WORD);
                    return res.json(token);
                } else return res.sendStatus(400);
            } else return res.sendStatus(401);
        } catch ({ message }) {
            console.log(message);
            res.json(message);
        }

    };

    async register(req, res) {
        try {
            const { user_name, email, password, birth_date, phone_number, gender } = req.body;
            const findUserByEmail = await UserService.findUserByEmail(email);
            if(!findUserByEmail) {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);
                const createdUser = await UserService.createUser({
                    user_name,
                    email,
                    password: hashPassword,
                    birth_date, 
                    phone_number,
                    gender
                })
                return res.send(createdUser);
            } else return res.sendStatus(400);
        } catch ({ message }) {
            console.log(message);
            res.json(message);
        }
    };
    
};

module.exports = new UserController();