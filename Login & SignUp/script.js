const logregBox = document.querySelector('.logreg-box');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

registerLink.addEventListener('click', () => {
    logregBox.classList.add('active');
});

loginLink.addEventListener('click', () => {
    logregBox.classList.remove('active');
});

const signupForm = document.querySelector('.form-box.register form');
const signupName = signupForm.querySelector('input[type="text"]');
const signupEmail = signupForm.querySelector('input[type="email"]');
const signupPassword = signupForm.querySelector('input[type="password"]');
const termsCheckbox = signupForm.querySelector('input[type="checkbox"]');
const signupButton = signupForm.querySelector('button');
const signupErrorMessage = document.createElement('div');
signupErrorMessage.classList.add('error-message');
signupForm.appendChild(signupErrorMessage);

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    signupErrorMessage.innerHTML = '';

    // Name validation
    if (signupName.value.trim() === '') {
        valid = false;
        displayError('Name is required');
    }

    // Email validation
    if (!isValidEmail(signupEmail.value)) {
        valid = false;
        displayError('Invalid email address');
    }

    // Password validation
    if (signupPassword.value.length < 6) {
        valid = false;
        displayError('Password must be at least 6 characters long');
    }

    // Terms and conditions validation
    if (!termsCheckbox.checked) {
        valid = false;
        displayError('You must agree to the terms & conditions');
    }

    if (valid) {
        // Perform form submission (e.g., send data to the backend)
        console.log('Form submitted');
    }
});

function isValidEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

function displayError(message) {
    const error = document.createElement('p');
    error.textContent = message;
    signupErrorMessage.appendChild(error);
}
