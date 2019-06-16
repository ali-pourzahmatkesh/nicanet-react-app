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

export function urlify(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function(url) {
    return '<a href="' + url + '">' + url + '</a>';
  });
}

export async function setCase(caseId, values) {
  try {
    const storageName = `case_info_${caseId}`;
    const currentCase = await getCase(caseId);
    // console.log('values', values);
    const params = { ...currentCase, ...values };
    await localStorage.setItem(storageName, JSON.stringify(params));
  } catch (error) {
    console.log('error in set case', error);
  }
}

export async function getCase(caseId) {
  try {
    const storageName = `case_info_${caseId}`;

    let currentCase = null;
    currentCase = await localStorage.getItem(storageName);
    if (currentCase === null) return;
    return JSON.parse(currentCase);
  } catch (_) {}
}
