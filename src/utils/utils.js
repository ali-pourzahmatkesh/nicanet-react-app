const toEnNumberMap = {
  '۰': 0,
  '٠': 0,
  '۱': 1,
  '١': 1,
  '۲': 2,
  '٢': 2,
  '۳': 3,
  '٣': 3,
  '۴': 4,
  '٤': 4,
  '۵': 5,
  '٥': 5,
  '۶': 6,
  '٦': 6,
  '۷': 7,
  '٧': 7,
  '۸': 8,
  '٨': 8,
  '۹': 9,
  '٩': 9
};

export function englishNumber(number) {
  let str;
  let arr;

  if (!number && number !== 0) {
    return '';
  }

  str = number.toString();
  arr = str.split('');

  for (let i = 0; i < arr.length; i++) {
    const char = arr[i];
    if (char in toEnNumberMap) {
      arr[i] = toEnNumberMap[char];
    }
  }

  return arr.join('');
}
