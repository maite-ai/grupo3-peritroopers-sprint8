let errors = {};

const form = document.getElementById('edit-form');
const productName = document.getElementById('name');
const description = document.getElementById('description');
const image = document.getElementById('image');
const stock = document.getElementById('stock');
const price = document.getElementById('price');

let fieldIsEmpty = function(field) {
    if(field.value.trim() == '') {
        return "Este campo no puede estar vacío";
    } else {
        return "";
    }
};

let fieldMin = function(field, min) {
    if(field.value.trim().length < min) {
        return `Este campo tiene que tener, al menos ${min} caracteres`;
    } else {
        return "";
    }
};

let justNumbers = function(event){
    if(event.key < 48 || event.key > 57){
        event.preventDefault
        return "Solo debe ingresar números"
    }
}

const fileExtValidate = function(path, msg, values) {
    let pathExt = path.split('.')[path.split('.').length-1];
    return values.some(value => value === pathExt) ? "" : msg
}

let validateProductName = function() {
    let feedback = "";
    let feedbackElement = productName.nextElementSibling;

    if(fieldIsEmpty(productName)) {
        feedback = fieldIsEmpty(productName);
    } else if(fieldMin(productName, 5)) {
        feedback = fieldMin(productName, 5);
    }

    if(feedback) {
        productName.classList.add("error-input");
        errors.productName = feedback;
    } else {
        productName.classList.remove("error-input");
        delete errors.productName
    }

    feedbackElement.innerText = feedback;
};

let validateDescription = function() {
    let feedback = "";
    let feedbackElement = description.nextElementSibling;
    if(fieldIsEmpty(description)) {
        feedback = fieldIsEmpty(description)
    } else if(fieldMin(description, 20)) {
        feedback = fieldMin(description, 20)
    }

    if(feedback) {
        description.classList.add("error-input");
        errors.description = feedback;
    } else {
        description.classList.remove("error-input");
        delete errors.description
    }

    feedbackElement.innerText = feedback;
};

let validateImage = function(){
    let validExtension = ["jpg", "jpeg", "png", "gif"];
    let errorMsg = "Solo se permite formatos de archivo .JPG, .JPEG, .PNG y .GIF";
    let feedback = !!image.value ? fileExtValidate(image.value, errorMsg, validExtension) : "";
    let feedbackElement = image.nextElementSibling;
    
    if(!!feedback){
        image.classList.add("error-input");
        errors.image = feedback;
        console.log(feedback)
        console.log(feedbackElement)
    } else {
        image.classList.remove("error-input");
        delete errors.image;
    }

    feedbackElement.innerText = feedback;
};

let validateStock = function() {
    let feedback = "";
    let feedbackElement = stock.nextElementSibling;
    if(fieldIsEmpty(stock)) {
        feedback = fieldIsEmpty(stock)
    }
    if(justNumbers(stock)){
        feedback = justNumbers(stock)
    }
    if (feedback) {
        stock.classList.add("error-input");
        errors.stock = feedback;
    } else {
        stock.classList.remove("error-input");
        delete errors.stock;
    }

    feedbackElement.innerText = feedback;
};

let validatePrice = function() {
    let feedback = "";
    let feedbackElement = price.nextElementSibling;
    
    if(fieldIsEmpty(price)) {
        feedback = fieldIsEmpty(price)
    }

    if (feedback) {
        price.classList.add("error-input");
        errors.price = feedback;
    } else {
        price.classList.remove("error-input");
        delete errors.price;
    }

    feedbackElement.innerText = feedback;
};

productName.addEventListener("blur", validateProductName);
description.addEventListener("blur", validateDescription);
image.addEventListener("change", validateImage);
stock.addEventListener("blur", validateStock);
price.addEventListener("blur", validatePrice);

form.addEventListener("submit", function(e) {
    validateProductName();
    validateDescription();
    validateImage();
    validateStock();
    validatePrice();

    if(Object.keys(errors).length) {
        e.preventDefault();
    }
})