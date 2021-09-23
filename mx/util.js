// https://lokeshdhakar.com/projects/color-thief/
const rgbToHex = (r, g, b) => "#" + [r, g, b].map(x => {
  const hex = x.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}).join("");

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

module.exports = {
  rgbToHex,
  sleep
};