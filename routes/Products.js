const express = require("express");
const router = express.Router({mergeParams:true}); 
const controller = require("./../controllers/product.js");
const middleware = require("./../middleware/index.js");


router.get("/categories", controller.renderCategories)

router.get("/categories/:category", controller.renderProductsInCategory)

router.get("/product/new", controller.addProduct)

router.post("/product", controller.createProduct)


router.get("/product/:id", controller.viewProduct)

router.get("/product/:id/edit", controller.editProduct)

router.get("/product/:id/delete", controller.deleteProduct)

router.post("/product/:id/", controller.updateProduct)


module.exports = router;