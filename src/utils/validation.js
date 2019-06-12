/* eslint-disable no-useless-escape */
import { englishNumber } from './utils';

export function emailValidation(value) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
  return value && emailRegex.test(value);
}

export function mobileValidation(value) {
  const mobileRegex = /^09[0-9]{9}$/;
  return value && mobileRegex.test(value);
}

export function phoneValidation(value) {
  const phoneRegex = /^0[0-9]{10,12}$/;
  return value && phoneRegex.test(value);
}

export function passwordValidation(value) {
  const passwordRegex = /^.{6,}$/;
  return value && passwordRegex.test(value);
}

export function numberValidation(value) {
  value = englishNumber(value);
  return (
    toString(value) &&
    (!isNaN(Number(value.toString())) &&
      value.toString().length === value.toString().trim().length)
  );
}

export function urlValidation(value) {
  const urlRegex = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
  return value && urlRegex.test(value.toLowerCase());
}
