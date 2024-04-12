const { TodoModel } = require('../models/_models.js');

class TodoService {

    async getAllTodos() {
        const todos = await TodoModel.findAll();
        return todos;
    };

    async createTodo(todo) {
        const createdTodo = await TodoModel.create(todo);
        return createdTodo;
    };
    
};

module.exports = new TodoService();