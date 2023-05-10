import generatePassword from "./password";

const passwordElem = document.getElementById("text-to-copy");
const copyButton = document.getElementById("copy-to-clipboard");
const successMessage = document.getElementById("copy-success-message");
const rangeInput = document.getElementById("character-length");
const rangeOutput = document.getElementById("character-length-value");
const form = document.querySelector("form");
const errorMessage = form.querySelector(".error-message");
const checkboxInputs = form.querySelectorAll('input[type="checkbox"]');

copyButton.addEventListener("click", () => {
  const textToCopy = passwordElem.textContent;
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
});

rangeInput.addEventListener("input", e => {
  rangeOutput.textContent = e.target.value;
});

for (checkboxInput of checkboxInputs) {
  checkboxInput.addEventListener("click", () => {
    errorMessage.style.display = "none";
  });
}

form.addEventListener("submit", e => {
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

  const password = generatePassword(passwordOptions);
  passwordElem.textContent = password;
});
