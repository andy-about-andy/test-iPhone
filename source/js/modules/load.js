const LANG_DEFAULT = ["en", "ru", "es", "fr", "ja", "nl", "zh"];
let lang;

let language = window.navigator ? (
  window.navigator.language ||
  window.navigator.systemLanguage ||
  window.navigator.userLanguage
  ) : "en";
language = language.substring(0, 2).toLowerCase();

const languageFind = LANG_DEFAULT.find(el => el === language);

const initLang = () => {
  if (languageFind) {
    return languageFind;
  } else {
    return language = "en";
  }
};
lang = initLang();

async function load() {
  let url = `lang/${lang}.json`;
  try {
      let res = await fetch(url);
      return await res.json();
  } catch (error) {
      console.log(error);
  }
}

export {load};
