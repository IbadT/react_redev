const TodoService = require("../services/TodoService");

class TodoController {

    async getAllTodos(req, res) {
        try {
            const todos = await TodoService.getAllTodos();
            res.send(todos);
        } catch ({ message }) {
            console.log(message);
            res.json(message);
        }
    };

    async createTodo(req, res) {
        try {
            const createdTodo = await TodoService.createTodo(req.body);
            res.send(createdTodo);
        } catch ({ message }) {
            console.log(message);
            res.json(message);
        }
    }

};

module.exports = new TodoController();