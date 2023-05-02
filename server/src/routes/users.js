const router = require('express').Router();

const userController = require('../controllers/user');
const auth = require('../middlewares/auth');

router.post('/sign-up', userController.signUp);
router.post('/login', userController.login);
router.get('/list', auth, userController.getAllUsers);
module.exports = router;