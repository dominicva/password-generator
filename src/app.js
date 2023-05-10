const rangeInput = document.getElementById('character-length');
const rangeOutputElement = document.getElementById('character-length-value');

rangeInput.addEventListener('input', e => {
  rangeOutputElement.textContent = e.target.value;
});
