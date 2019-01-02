var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({

name: String,
images: [
      {URL: String, 
       alt: String}
      ],
graph: String,
category: String,
description: String,
downloadFiles:[
      {URL: String, 
       name: String}
      ],
});

module.exports = mongoose.model("Product", productSchema);