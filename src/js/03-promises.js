import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onGenerate);

let position = 0;

function onGenerate(e) {
  e.preventDefault();
  let delay = Number(form.elements.delay.value);
  let step = Number(form.elements.step.value);
  let amount = Number(form.elements.amount.value);

  for (position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
