import {load} from './load.js';

async function renderText() {
  let users = await load();
  const wrapper = document.querySelector('.wrapper');
  for (const user in users) {
    wrapper.querySelector('.restore').textContent = users.restore;
    wrapper.querySelector('.features').textContent = users.features;
    wrapper.querySelector('.documents').textContent = users.documents;
    wrapper.querySelector('.mode').textContent = users.mode;
    wrapper.querySelector('.recognition').textContent = users.recognition;
    wrapper.querySelector('.monthly').textContent = users.monthly;
    wrapper.querySelector('.price').textContent = users.price;
    wrapper.querySelector('.free').textContent = users.free;
    wrapper.querySelector('.priceMonth').textContent = users.priceMonth;
    wrapper.querySelector('.annually').textContent = users.annually;
    wrapper.querySelector('.priceYear').textContent = users.priceYear;
    wrapper.querySelector('.popular').textContent = users.popular;
    wrapper.querySelector('.priceYearMonth').textContent = users.priceYearMonth;
    wrapper.querySelector('.continue').textContent = users.continue;
    wrapper.querySelector('.autoRenewable').textContent = users.autoRenewable;
    wrapper.querySelector('.terms').textContent = users.terms;
    wrapper.querySelector('.continue').textContent = users.continue;
    wrapper.querySelector('.privacyPolicy').textContent = users.privacyPolicy;
  };
}

export {renderText};
