import { getCardIssuer } from '../src/js/issuer';

test('Visa card', () => {
  expect(getCardIssuer('4111111111111111')).toBe('Visa');
});

test('MasterCard', () => {
  expect(getCardIssuer('5105105105105100')).toBe('MasterCard');
});

test('Mir card', () => {
  expect(getCardIssuer('2200123456789012')).toBe('Мир');
});

test('Unknown card', () => {
  expect(getCardIssuer('1234567890123456')).toBe('Unknown');
});
