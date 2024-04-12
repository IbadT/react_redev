const { UserModel } = require('../models/_models.js');

class UserService {

    async findUserByEmail(email) {
        const findUserByEmail = await UserModel.findOne({ where: { email }});
        return findUserByEmail;
    };

    async createUser(user) {
        const createdUser = await UserModel.create(user);
        return createdUser;
    };

};

module.exports = new UserService();