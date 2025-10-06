// возвращает строку: 'Visa' | 'MasterCard' | 'Мир' | 'Unknown'
export function getCardIssuer(number) {
  const n = number.replace(/\D/g, '');
  if (!n) return 'Unknown';

  // Visa: начинается с 4, длина 13,16,19 (включая возможные варианты)
  if (/^4\d{12}(\d{3})?(\d{3})?$/.test(n)) return 'Visa';

  // MasterCard:
  // старые BIN: 51-55 (16 цифр)
  // новые диапазоны: 2221-2720 (16 цифр)
  // проверим для 16-значных карт
  if (/^(5[1-5]\d{14})$/.test(n)) return 'MasterCard';
  if (/^(222[1-9]\d{12}|22[3-9]\d{13}|2[3-6]\d{14}|27[01]\d{13}|2720\d{12})$/.test(n)) return 'MasterCard';

  // Мир: российская платёжная система — BINы начинаются с 2200..2204, обычно 16 цифр
  if (/^220[0-4]\d{12}$/.test(n)) return 'Мир';

  return 'Unknown';
}
