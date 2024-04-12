const UserModel = require('../models/UserModel.js');
const TodoModel = require('./TodoModel.js');

(async () => {
    // await UserModel.sync({ force: true }).then(() => console.log("User model was created..."));
    // await TodoModel.sync({ force: true }).then(() => console.log("Todo Model was created..."));
})()

module.exports = {
    UserModel,
    TodoModel
}