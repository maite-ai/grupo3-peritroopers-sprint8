let errors = {}

const startWithLetter = /^[A-z]+/;
const isValidPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-])[A-Za-z][A-Za-z\d!@#$%^&*()_+]{7,}$/;

const form = document.getElementById('register-form');
const firstName = document.getElementById('name');
const lastName = document.getElementById('lastName');
const birthDate = document.getElementById('birthDate');
const address = document.getElementById('address');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const avatar = document.getElementById('avatar');

let fieldIsEmpty = function(field) {
    if(field.value.trim() == '') {
        return "Este campo no puede estar vacío";
    } else {
        return "";
    }
}

let fieldMin = function(field, min) {
    if(field.value.trim().length < min) {
        return `Este campo tiene que tener, al menos ${min} caracteres`;
    } else {
        return "";
    }
}

let fieldRegex = function(field, regex, message) {
    if(!regex){
        return message;
    } else {
        return "";
    }
}

const fileExtValidate = function(path, msg, values) {
    let pathExt = path.split('.')[path.split('.').length-1];
    return values.some(value => value === pathExt) ? "" : msg
}

const areSameValues = (value1, value2, msg) => value1 == value2 ? "" : msg;

let validateName = function() {
    let feedback = "";
    let feedbackElement = firstName.nextElementSibling;
    let regEx = /^[A-zÁÉÍÓÚáéíóúñNüÜöÖËë\- ']+$/.test(firstName.value);
    let message = "El nombre no puede contener números ni símbolos";

    if(fieldIsEmpty(firstName)) {
        feedback = fieldIsEmpty(firstName);
    } else if(fieldMin(firstName, 3)) {
        feedback = fieldMin(firstName, 3);
    } else if(fieldRegex(firstName, regEx, message)) {
        feedback = fieldRegex(firstName, regEx, message);
    }

    if(feedback) {
        firstName.classList.add("error-input");
        errors.firstName = feedback;
    } else {
        firstName.classList.remove("error-input");
        delete errors.firstName;
    }

    feedbackElement.innerText = feedback;
}


let validateLastName = function() {
    let feedback = "";
    let feedbackElement = lastName.nextElementSibling;
    let regex = /^[A-zÁÉÍÓÚáéíóúñNüÜöÖËë\- ']+$/.test(lastName.value);
    let message = "El apellido no puede contener números ni símbolos";

    if(fieldIsEmpty(lastName)) {
        feedback = fieldIsEmpty(lastName);
    } else if(fieldMin(lastName, 3)) {
        feedback = fieldMin(lastName, 3);
    } else if(fieldRegex(lastName, regex, message)) {
        feedback = fieldRegex(lastName, regex, message);
    }

    if(feedback) {
        lastName.classList.add("error-input");
        errors.lastName = feedback;
    } else {
        lastName.classList.remove("error-input");
        delete errors.lastName;
    }

    feedbackElement.innerText = feedback;
}

let validateEmail = function() {
    let feedback = "";
    let feedbackElement = email.nextElementSibling;
    let regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(fieldIsEmpty(email)) {
        feedback = fieldIsEmpty(email);
    } else if(!regEx.test(email.value)){
        feedback = "Debe ingresar un email válido";
    } 

    if(feedback) {
        email.classList.add("error-input");
        errors.email = feedback;
    } else {
        email.classList.remove("error-input");
        delete errors.email;
    }

    feedbackElement.innerText = feedback;
}

let validatePassword = function() {
    let feedback = "";
    let feedbackElement = password.nextElementSibling;

    if(fieldIsEmpty(password)) {
        feedback = fieldIsEmpty(password);
    } else if(fieldMin(password, 8)){
        feedback = fieldMin(password, 8);
    } 

    if(feedback) {
        password.classList.add("error-input");
        errors.password = feedback;
    } else {
        password.classList.remove("error-input");
        delete errors.password;
    }

    feedbackElement.innerText = feedback;
}

let validateConfirmPassword = function() {
    let feedback = "";
    let feedbackElement = confirmPassword.nextElementSibling;

    if(fieldIsEmpty(confirmPassword)) {
        feedback = fieldIsEmpty(confirmPassword);
    } else if(fieldMin(confirmPassword, 8)){
        feedback = fieldMin(confirmPassword, 8);
    } else if(areSameValues(password.value, confirmPassword.value, "Las contraseñas deben coincidir")){
        feedback = areSameValues(password.value, confirmPassword.value, "Las contraseñas deben coincidir");
    }

    if(feedback) {
        confirmPassword.classList.add("error-input");
        errors.confirmPassword = feedback;
    } else {
        confirmPassword.classList.remove("error-input");
        delete errors.confirmPassword;
    }

    feedbackElement.innerText = feedback;
}

let validateAvatar = function(){
    let validExtension = ["jpg", "jpeg", "png", "gif"];
    let errorMsg = "Solo se permite formatos de archivo .JPG, .JPEG, .PNG y .GIF";
    let feedback = !!avatar.value ? fileExtValidate(avatar.value, errorMsg, validExtension) : "";
    let feedbackElement = avatar.nextElementSibling;
    
    if(!!feedback){
        avatar.classList.add("error-input");
        errors.avatar = feedback;
    } else {
        avatar.classList.remove("error-input");
        delete errors.avatar;
    }

    feedbackElement.innerText = feedback;
}

firstName.addEventListener("blur", validateName);
lastName.addEventListener("blur", validateLastName);
email.addEventListener("blur", validateEmail);
password.addEventListener("blur", validatePassword);
password.addEventListener("keyup", validatePassword);
confirmPassword.addEventListener("blur", validateConfirmPassword);
confirmPassword.addEventListener("keyup", validateConfirmPassword);
avatar.addEventListener("change", validateAvatar);

form.addEventListener("submit", function(e){
    validateName();
    validateLastName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    validateAvatar();

    if(Object.keys(errors).length) {
        e.preventDefault();
    }
})