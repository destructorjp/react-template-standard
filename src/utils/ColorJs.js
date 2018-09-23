import ColorJs from 'color-js';

import Color from '../constants/Color';

export function getColorJsObject(color) {
  return ColorJs(color);
}

export function getRgbaString(color, opacity) {
  const colorObject = getColorJsObject(color);

  const { red, blue, green } = colorObject.toRGB();

  const redDeg = Math.floor(red * 255);

  const blueDeg = Math.floor(blue * 255);

  const greenDeg = Math.floor(green * 255);

  return `rgba(${redDeg},${greenDeg},${blueDeg},${opacity})`;
}

export function getInvertColor(hex, bw) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }

  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);

  if (bw) {
    // http://stackoverflow.com/a/3943023/112731
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? Color.black : Color.white;
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return

  return '#' + `0${r}`.slice(-2) + `0${g}`.slice(-2) + `0${b}`.slice(-2);
}
