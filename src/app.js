import {
  generatePassword,
  passwordStrength,
  passwordStrengthScore,
} from "./password";
import zxcvbn from "zxcvbn";

const password = document.getElementById("password");
const copyButton = document.getElementById("copy-to-clipboard");
const successMessage = document.getElementById("copy-success-message");
const rangeInput = document.getElementById("character-length");
const rangeOutput = document.getElementById("character-length-value");
const form = document.querySelector("form");
const errorMessage = form.querySelector(".error-message");
const checkboxes = form.querySelectorAll('input[type="checkbox"]');
const strengthBars = document.querySelectorAll("b");
const strengthElem = document.querySelector("figcaption");

function registerCheckboxListeners() {
  // removes error message as soon as a checkbox is checked
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

function setStrengthBar(bar, category) {
  bar.className = `filled ${category}`;
}

function setStrengthBars(score, category) {
  // reset strength bars
  for (let i = 0; i < 4; i++) {
    strengthBars[i].className = "";
  }

  if (score > 1) {
    for (let i = 0; i < score; i++) {
      setStrengthBar(strengthBars[i], category);
    }
  } else {
    setStrengthBar(strengthBars[0], category);
  }

  if (category == "too-weak") {
    strengthElem.textContent = "too weak!";
  } else {
    strengthElem.textContent = category;
  }
}

function buildPasswordOptions(inputs) {
  const passwordOptions = {};

  for (const input of inputs) {
    if (input.type == "range") {
      passwordOptions.length = Number(input.value);
    } else {
      passwordOptions[input.name] = input.checked;
    }
  }

  return passwordOptions;
}

function handleSubmit(e) {
  e.preventDefault();

  // ignores button which is the last form element
  const inputs = Array.from(e.target.elements).slice(0, -1);

  // clear error state
  errorMessage.style.display = "none";
  // now handle error state where no checkboxes are selected
  const hasCheckedInput = inputs.slice(1).reduce((output, currInput) => {
    if (currInput.checked) return true;
    else return output;
  }, false);

  if (!hasCheckedInput) {
    // no options checked -> abort
    errorMessage.style.display = "block";
    return;
  }

  const passwordOptions = buildPasswordOptions(inputs);
  const newPassword = generatePassword(passwordOptions);
  const strengthScore = zxcvbn(newPassword).score;
  const strengthCategory = passwordStrength(strengthScore);
  setStrengthBars(strengthScore, strengthCategory);

  password.style.color = "var(--almost-white)";
  password.textContent = newPassword;
}

export default function app() {
  registerCheckboxListeners();
  copyButton.addEventListener("click", handleCopyPassword);
  rangeInput.addEventListener("input", setRangeOutput);
  form.addEventListener("submit", handleSubmit);
}
