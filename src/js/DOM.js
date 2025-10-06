import { isValidCardNumber } from './validator';
import { getCardIssuer } from './issuer';
import visaImg from '../assets/visa.png';
import mcImg from '../assets/mastercard.png';
import mirImg from '../assets/mir.png';

const issuerImages = {
  Visa: visaImg,
  MasterCard: mcImg,
  'Мир': mirImg,
  Unknown: ''
};

// форматируем номер для отображения: группы по 4 цифры
function formatCardNumberForDisplay(rawDigits) {
  return rawDigits.replace(/(.{4})/g, '$1 ').trim();
}

export function setupCardWidget(container) {
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Введите номер карты';
  input.maxLength = 23; // с пробелами, 19 цифр + пробелы
  input.autocomplete = 'cc-number';
  input.inputMode = 'numeric';

  const img = document.createElement('img');
  img.className = 'card-image';
  img.alt = '';

  const result = document.createElement('div');
  result.className = 'card-result';

  container.append(input, img, result);

  input.addEventListener('input', (e) => {
    // 1) берем только цифры из текущего ввода
    const onlyDigits = input.value.replace(/\D/g, '');

    // 2) форматируем отображаемое значение (делаем user-friendly)
    const formatted = formatCardNumberForDisplay(onlyDigits);
    // чтобы не ломать каретку при вводе, обновляем значение аккуратно:
    const selectionStart = input.selectionStart;
    input.value = formatted;
    // попытаемся вернуть каретку в разумное место
    input.setSelectionRange(selectionStart, selectionStart);

    // 3) определяем эмитента и показываем картинку
    const issuer = getCardIssuer(onlyDigits);
    img.src = issuerImages[issuer] || '';
    img.alt = issuer !== 'Unknown' ? issuer : '';

    // 4) проверяем валидность (показываем только если длина >=13)
    if (onlyDigits.length >= 13) {
      result.textContent = isValidCardNumber(onlyDigits) ? '✅ Валидно' : '❌ Невалидно';
    } else {
      result.textContent = '';
    }
  });
}
