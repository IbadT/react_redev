const router = require('express').Router();
const UserController = require('../controllers/UserController.js');
const validation = require('../helpers/validation.js');
// *                 pattern: `^\+?/d{1,3}(?\d{2})-?\d{2}-?\d{2}-?\d{3}$`
// *                 pattern: `^\+?\d{1,3}-?\d{3}-?\d{3}-?\d{4}$`

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: ibadtoff@gmail.com
 *               password:
 *                 type: string
 *                 example: qwerty
 *     responses:
 *       '200':
 *         description: Seccess
 */

router.post('/login', UserController.login);


/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Registration
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *                 example: Eduard
 *               email:
 *                 type: string
 *                 example: ibadtoff@gmail.com
 *               password:
 *                 type: string
 *                 example: qwerty
 *               birth_date:
 *                 type: string
 *                 pattern: "dd-MM-yyyy"
 *                 example: "26.04.2001"
 *               phone_number:
 *                 type: string
 *                 example: +375(29)27-69-407
 *               gender:
 *                 type: string
 *                 example: Male
 *     responses:
 *       '200':
 *         description: Seccess
 */

router.post('/register', UserController.register);

module.exports = router;