let errors = {};

let form = document.getElementById('login-page');

const email = document.getElementById('email');
const password = document.getElementById('password');

let emailValidation = function(){
    let feedback = '';
    let feedbackElement = email.nextElementSibling

    if(email.value.trim() == ''){
        feedback = 'Debes ingresar un email';
    }

    if(feedback) {
        email.classList.add('error-input');
        errors.email = feedback;
    } else {
        email.classList.remove('error-input');
        delete errors.email;
    }

    feedbackElement.innerText = feedback;
}

let passwordValidation = function() {
    let feedback = '';
    let feedbackElement = password.nextElementSibling

    if(password.value.trim() == ''){
        feedback = 'Debes ingresar una contraseña';
    }

    if(feedback) {
        password.classList.add('error-input');
        errors.password = feedback;
    } else {
        password.classList.remove('error-input');
        delete errors.password;
    }

    feedbackElement.innerText = feedback;
}

email.addEventListener('blur', emailValidation);
password.addEventListener('blur', passwordValidation);

form.addEventListener('submit', function(e){
    emailValidation();
    passwordValidation();

    if(Object.keys(errors).length){
        e.preventDefault();
    }
})

