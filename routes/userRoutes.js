const express = require("express")
const userController=require('../controllers/userController')

const router=express.Router();

//admin
router.route('/register').get(userController.getRegister);
router.route('/register').post(userController.postRegister);
router.route('/login').get(userController.getLogin);
router.route('/login').post(userController.postLogin);
router.route('/logout').get(userController.getLogout);

module.exports=router