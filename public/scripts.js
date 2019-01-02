var number = 2;


let productsFilesDiv = document.querySelector(".productsFiles");
let productsFilesEdit = document.querySelector(".productsFilesEdit");


let addFileButton = document.querySelector(".addFileButton");
let editFormButton = document.querySelector(".editFormButton");

if(addFileButton!=null)
addFileButton.addEventListener("click", function(){
addFileForm();
});

editFormButton.addEventListener("click", function(){
addNewFileToEdit();
});



function addFileForm(){
	let fileNo = "file"+number;
	if(number<=10){
	productsFilesDiv.innerHTML += '<input type="file" class="form-control" name="'+fileNo+'" value=""><br>';
	number +=1;
     }
}


