const form = document.querySelector("form");
const email = document.querySelector("#email");
const country = document.querySelector("#country");
const postalCode = document.querySelector("#postal-code");
const password = document.querySelector("#password");
const passwordConfirmation = document.querySelector("#password-confirmation");
const submit = document.querySelector("button");
const info = document.querySelector("p");

class FormElement {
    constructor(element) {
        this.element = element;
    }
    handleElement(event) {
        event.target.reportValidity();
    }
}

const formElements = [email, country, postalCode, password, passwordConfirmation];
const formElementObjs = [];

formElements.forEach(element => formElementObjs.push(new FormElement(element)));

formElementObjs[3].handleElement = event => {
    if(event.target.validity.patternMismatch) {
        event.target.setCustomValidity("Must contain at least one uppercase "+ 
            "letter, one lowercase letter, and one number");
    } else {
        event.target.setCustomValidity("");
    }
    event.target.reportValidity();
};

formElementObjs[4].handleElement = () => {
    if(passwordConfirmation.value !== password.value) {
        passwordConfirmation.setCustomValidity("Password doesn't match");
    } else {
        passwordConfirmation.setCustomValidity("");
    }
    passwordConfirmation.reportValidity();   
}

formElementObjs.forEach(obj => {
    obj.element.addEventListener("input", event => obj.handleElement(event));
    obj.element.addEventListener("blur", event => obj.handleElement(event));
});

submit.addEventListener("click", (event) => {
    event.preventDefault();
    if(form.reportValidity()) {
        info.textContent = "Congratulations! Your form is successfully submitted!";
    }
});