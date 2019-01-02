const Products = require("./../models/Product");

const categoriesList = require("./../categories.js");
var controller = []


controller.renderCategories = (req,res,next) => {
	res.render("categories", {categories:categoriesList});
}


controller.renderProductsInCategory = (req,res,next) => {
	var category = req.params.category;
	
	if(category=="all"){
		Products.find({}, (err, allProducts) => {
			if(err){
				console.log(err);
				req.flash("error",err.message);
				return res.redirect("/categories");

			} else {
				res.render("productsinCategories", {products:allProducts, category:"All products"});
			}
		}).sort({"name":1})

	} else {
		Products.find({"category":category}, (err, allProducts) => {
			if(err){
				console.log(err);
				req.flash("error",err.message);
				return res.redirect("/categories");
			} else {
				res.render("productsinCategories", {products:allProducts, category:category});
			}
		}).sort({"name":1})
	}
}

controller.addProduct = (req,res,next) => {
	res.render("newProduct", {categories:categoriesList});
}


controller.viewProduct = (req,res,next) => {
	Products.findById(req.params.id, (err, product) => {
		if(err){
			console.log(err);
			req.flash("error",err.message)
			return res.redirect("/categories")


		} else {
			res.render("view", {product:product});
		}
	})

}

controller.editProduct = (req,res,next) => {
	Products.findById(req.params.id, (err, editedProduct) => {
		if(err){
			console.log(err);
			req.flash("error",err.message)
			return res.redirect("/admin")
		} else {
			res.render("editProduct", {product:editedProduct, categories:categoriesList});
		}
	})
}	

////////////////////////////////////////////////////////////////
controller.deleteProduct = (req,res,next) => {
	Products.deleteOne( { _id: req.params.id }, function(err){
		if(err){
			req.flash("error",err.message)
			return res.redirect("/admin")
		} else {
			res.redirect("/admin");
		}

	})	
}
////////////////////////////////////////////////////////////////

controller.updateProduct = (req,res,next) => {

	let updatedProduct = {};

	updatedProduct.name = req.body.name;
	updatedProduct.description = req.body.description;

	if(req.files.newImage !== undefined){
	updatedProduct.images=[];
	updatedProduct.images.push({URL: '/'+req.files.newImage.name, alt: req.files.newImage.name})
	
	let imageRoute =  __dirname +'/../images/'+req.files.newImage.name;
	req.files.newImage.mv(imageRoute, function(err) {
		if(err){
			console.log(err);
		}else{
			console.log("uploaded");
		}
	});
	}
	
	if(req.files.newGraphURL !== undefined){
	updatedProduct.graph = "/"+ req.files.newGraphURL.name; 

    let graphRoute =  __dirname +'/../images/'+ req.files.newGraphURL.name;
	req.files.newGraphURL.mv(graphRoute, function(err) {
		if(err){
			console.log(err);
		}else{
			console.log("uploaded");
		}
	});

	}
	updatedProduct.category = req.body.category;    

  

	Products.findByIdAndUpdate(req.params.id, updatedProduct, (err, product) => {
		if(err){
			console.log(err);
			req.flash("error",err.message)
			return res.redirect("/admin")
		} else {
			console.log(updatedProduct);
			res.redirect("/admin");
		}
	})

}



controller.createProduct = (req,res,next) => {
	let name = req.body.name;
	let description = req.body.description;
	// let image = req.body.image;
	let imageFile = req.files.image1;  
	let graph = req.files.graphURL;
	let category = req.body.category;      
	
	let downloadFilesArray =[
		req.files.file1,
		req.files.file2,
		req.files.file3,
		req.files.file4,
		req.files.file5,
		req.files.file6,
		req.files.file7,
		req.files.file8,
		req.files.file9,
		req.files.file10
	];

let newProduct = {name:name, images:[], graph:graph, category:category, description:description, downloadFiles:[]}
 	

downloadFilesArray.forEach(function(item){
	if(item !== undefined){
		let uploadRoute = __dirname +'/../downloads/' + item.name;
		
		item.mv(uploadRoute, function(err) {
			if(err){
				console.log(err);
			}else{
				console.log("uploaded");			
			}
		});
		newProduct.downloadFiles.push({URL: '/'+ item.name, name: item.name})
	}
})

////////////////
let imageRoute =  __dirname +'/../images/'+imageFile.name;
imageFile.mv(imageRoute, function(err) {
	if(err){
		console.log(err);
	}else{
		console.log("uploaded");
	}
});
newProduct.images.push({URL: '/'+imageFile.name, alt: imageFile.name});
//////////////////

////////////////
let graphRoute =  __dirname +'/../images/'+graph.name;
graph.mv(graphRoute, function(err) {
	if(err){
		console.log(err);
	}else{
		console.log("uploaded");
	}
});
newProduct.graph = '/'+graph.name;
//////////////////



Products.create(newProduct, function(err, newProduct){
	if(err){ console.log(err)
	} else {
		res.redirect(`/product/${newProduct._id}`);
	}
})



}



module.exports = controller;