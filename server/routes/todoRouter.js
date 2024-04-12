const router = require('express').Router();
const TodoController = require('../controllers/TodoController.js');
const validation = require('../helpers/validation.js')

/**
 * @swagger
 * /api/todo:
 *   get:
 *     summary: Get All Todos
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Success
 *       '500':
 *         description: Server Error
 */

router.get('/', validation, TodoController.getAllTodos);


/**
 * @swagger
 * /api/todo/todo:
 *   post: 
 *     summary: Create Todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:  
 *               title:
 *                 type: string
 *                 example: First Todo
 *               isCompleted:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       '200':
 *         description: Success
 */

router.post('/todo', validation, TodoController.createTodo);

module.exports = router;