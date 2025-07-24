import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

const onFormSubmit = e => {
  e.preventDefault();

  const delay = Number(e.target.elements.delay.value);
  const state = e.target.elements.state.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve() : reject();
    }, delay);
  });

  promise
    .then(() => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay} ms`,
        position: 'topCenter',
      });
    })
    .catch(() => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay} ms`,
        position: 'topCenter',
      });
    });

  e.target.reset();
};

form.addEventListener('submit', onFormSubmit);
