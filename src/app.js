import generatePassword from "./password";

const password = document.getElementById("password");
const copyButton = document.getElementById("copy-to-clipboard");
const successMessage = document.getElementById("copy-success-message");
const rangeInput = document.getElementById("character-length");
const rangeOutput = document.getElementById("character-length-value");
const form = document.querySelector("form");
const errorMessage = form.querySelector(".error-message");
const checkboxes = form.querySelectorAll('input[type="checkbox"]');

function registerCheckboxListeners() {
  for (const checkbox of checkboxes) {
    checkbox.addEventListener("click", () => {
      errorMessage.style.display = "none";
    });
  }
}

function handleCopyPassword() {
  const textToCopy = password.textContent;
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      successMessage.style.transition =
        "opacity 0.2s cubic-bezier(0.5, 0, 0.5, 1)";
      successMessage.style.opacity = 1;

      setTimeout(() => {
        successMessage.style.transition = "none";
        successMessage.style.opacity = 0;
      }, 1200);
    })
    .catch(e => console.error(e));
}

function setRangeOutput(e) {
  rangeOutput.textContent = e.target.value;
}

function handleSubmit(e) {
  e.preventDefault();
  errorMessage.style.display = "none";

  const inputs = Array.from(e.target.elements).slice(0, -1);

  const hasCheckedInput = inputs.slice(1).reduce((output, currInput) => {
    if (currInput.checked) return true;
    else return output;
  }, false);

  if (!hasCheckedInput) {
    errorMessage.style.display = "block";
    return;
  }

  const passwordOptions = {};

  for (const input of inputs) {
    if (input.type == "range") {
      passwordOptions.length = Number(input.value);
    } else {
      passwordOptions[input.name] = input.checked;
    }
  }

  const newPassword = generatePassword(passwordOptions);
  password.textContent = newPassword;
}

export default function App() {
  registerCheckboxListeners();

  copyButton.addEventListener("click", handleCopyPassword);

  rangeInput.addEventListener("input", setRangeOutput);

  form.addEventListener("submit", handleSubmit);
}
