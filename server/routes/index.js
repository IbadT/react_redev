const router = require('express').Router();

const userRoutes = require('./userRouter.js');
router.use('/user', userRoutes);

const todoRoutes = require('./todoRouter.js')
router.use('/todo', todoRoutes);

module.exports = router;