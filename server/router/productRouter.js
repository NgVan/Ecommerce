const express = require('express');
const router = require('express-promise-router')();

const productCtrl = require('../controller/productCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

const {validateBody, schemas} = require('../helper/validateHelper')

router.route('/product')
    .get(productCtrl.getProducts)
    .post(auth, authAdmin, productCtrl.createProduct)

router.route('/product/:id')
    .get(productCtrl.getProduct)
    .delete(auth, authAdmin, productCtrl.deleteProduct)
    .patch(auth, authAdmin, validateBody(schemas.productUpdateSchema), productCtrl.updateProduct)

module.exports = router