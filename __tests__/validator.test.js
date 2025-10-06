import { isValidCardNumber } from '../src/js/validator';

test('valid Visa card', () => {
  expect(isValidCardNumber('4111111111111111')).toBe(true);
});

test('valid MasterCard', () => {
  expect(isValidCardNumber('5105105105105100')).toBe(true);
});

test('invalid card', () => {
  expect(isValidCardNumber('1234567890123456')).toBe(false);
});
