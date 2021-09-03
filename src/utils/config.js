export const LINKAPI = "https://api.nomoreparties.co";
export const time = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  if (hours === 0) {
    return minutes + "мин";
  }
  return hours + "ч " + minutes + "мин";
};
export const timeDuration = 40;
export const calculate = (i) => {
  let firstParsing, lastParsing;
  if (i > 768) {
    firstParsing = 12;
    lastParsing = 4;
  } else if (i > 480) {
    firstParsing = 8;
    lastParsing = 2;
  } else {
    firstParsing = 5;
    lastParsing = 2;
  }
  return { firstParsing, lastParsing };
};
