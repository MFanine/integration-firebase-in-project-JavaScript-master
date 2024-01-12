const express = require("express");

const {    createProduct  } = require("../controllers/productController");
const {    handleFileUploads  } = require("../middlewares/FirebaseImgMiddlewares"); // Update the path
  
const router = express.Router();

router.route("/").post(handleFileUploads, createProduct);
module.exports = router;