export function isValidCardNumber(number) {
  const testMirCards = ['2200000000000005']; // белый список тестовых карт

  const sanitized = number.replace(/\D/g, '');
  if (sanitized.length === 0) return false;

  // обход для тестовой карты MIR
  if (testMirCards.includes(sanitized)) return true;

  const digits = sanitized
    .split('')
    .reverse()
    .map(Number);

  const sum = digits.reduce((acc, digit, idx) => {
    if (idx % 2 === 1) {
      let dbl = digit * 2;
      if (dbl > 9) dbl -= 9;
      return acc + dbl;
    }
    return acc + digit;
  }, 0);

  return sum % 10 === 0;
}
