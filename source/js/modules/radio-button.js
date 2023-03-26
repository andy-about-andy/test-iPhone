const bth = document.querySelector('.btn--price');
const sale = document.querySelector('.page-content__price-input--sale');

const radioButton = () => {
  bth.addEventListener('click', () => {
    if(sale.checked) {
      bth.href = "https://google.com/";
    } else
      bth.href = "https://apple.com/";
  });
};

export {radioButton};
