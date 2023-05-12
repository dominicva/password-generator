function generateUppercase() {
  const ASCII_START = 65;
  const MAX_OFFSET = 25;
  const randomCharCode = Math.floor(Math.random() * MAX_OFFSET + ASCII_START);
  return String.fromCharCode(randomCharCode);
}

function generateLowerCase() {
  const ASCII_START = 97;
  const MAX_OFFSET = 25;
  const randomCharCode = Math.floor(Math.random() * MAX_OFFSET + ASCII_START);
  return String.fromCharCode(randomCharCode);
}

function generateDigit() {
  return Math.floor(Math.random() * 10);
}

function generateSymbol() {
  const SPECIAL_CHARS = " !\"#$%&'()*+,-./:;<=>?@[]^_`{|}~".split("");
  const randomIndex = Math.floor(Math.random() * SPECIAL_CHARS.length);
  return SPECIAL_CHARS[randomIndex];
}

export function passwordStrength(score) {
  // score calculated by zxcvbn package will be between 0 and 4
  switch (score) {
    case 4:
      return "strong";
    case 3:
      return "medium";
    case 2:
      return "weak";
    case 1:
    case 0:
      return "too-weak";
  }
}

export function generatePassword({
  length = 7,
  upper = true,
  lower = true,
  numbers = true,
  symbols = true,
} = {}) {
  const chars = Array(length).fill(null);
  const fns = [];

  if (upper) fns.push(generateUppercase);
  if (lower) fns.push(generateLowerCase);
  if (numbers) fns.push(generateDigit);
  if (symbols) fns.push(generateSymbol);

  for (let i = 0; i < chars.length; i++) {
    const randomIndex = Math.floor(Math.random() * fns.length);
    const randomFn = fns[randomIndex];
    chars[i] = randomFn();
  }

  return chars.join("");
}
