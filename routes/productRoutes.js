const express = require("express")
const productController=require('../controllers/productController')

const router=express.Router();

//admin
router.route('/dashboard').post(productController.createProduct);
router.route('/dashboard').get(productController.getDashboardPage);
router.route('/offer/:id').get(productController.getDetailOffer);
router.route('/offer/:id').put(productController.postOffer);


router.route('/dashboard/:id').delete(productController.deleteProduct);
//customer
router.route('/').get(productController.getProduct);
router.route('/offerdetail/:id').get(productController.getCustomerDetailOffer);
module.exports=router