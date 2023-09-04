const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const ageInput = document.getElementById("age");
const passwordInput = document.getElementById("password");
const repasswordInput = document.getElementById("repassword");
const submitButton = document.getElementById("submitButton");

const nameRegex = /^[A-Za-z]+$/;
const emailRegex = /.+@.+\..+/;
const phoneRegex = /^\d{10}$/;
const ageRegex =/^\d+$/;

function passwordsMatch() {
  return passwordInput.value === repasswordInput.value;
}

function validateForm() {
  const isNameValid = nameRegex.test(nameInput.value);
  const isEmailValid = emailRegex.test(emailInput.value);
  const isPhoneValid = phoneRegex.test(phoneInput.value);
  const isAgeValid = ageRegex.test(ageInput.value);
  const isPasswordValid = passwordInput.value.length >= 8;
  const doPasswordsMatch = passwordsMatch();

  if (
    isNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isAgeValid &&
    isPasswordValid &&
    doPasswordsMatch
  ) {
    submitButton.removeAttribute("disabled");
  } else {
    submitButton.setAttribute("disabled", true);
  }
}

nameInput.addEventListener("input", validateForm);
emailInput.addEventListener("input", validateForm);
phoneInput.addEventListener("input", validateForm);
ageInput.addEventListener("input", validateForm);
passwordInput.addEventListener("input", validateForm);
repasswordInput.addEventListener("input", validateForm);

validateForm();