import ErrorMessages from '../constants/ErrorMessages';

export function getErrorMessage({ code, message }) {
  return ErrorMessages[code] || message;
}
