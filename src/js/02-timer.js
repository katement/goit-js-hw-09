import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btn = document.querySelector('[data-start]');
const pickerId = document.getElementById('datetime-picker');
const date = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

btn.disabled = true;

btn.addEventListener('click', startTimer);

let intervalId = null;

function startTimer() {
  if (intervalId) {
    return;
  }
  const futureTime = new Date(pickerId.value).getTime();
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const timeLeft = futureTime - currentTime;
    const convertTime = convertMs(timeLeft);

    date.days.textContent = pad(convertTime.days);
    date.hours.textContent = pad(convertTime.hours);
    date.minutes.textContent = pad(convertTime.minutes);
    date.seconds.textContent = pad(convertTime.seconds);

    if (timeLeft < 0) {
      clearInterval(intervalId);

      Notiflix.Notify.success('Qui timide rogat docet negare');

      btn.disabled = true;

      date.days.textContent = pad(0);
      date.hours.textContent = pad(0);
      date.minutes.textContent = pad(0);
      date.seconds.textContent = pad(0);

      return;
    }
  }, 1000);
}

// Дополнительный импорт стилей
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      console.log(selectedDates[0]);
      Notiflix.Notify.failure('Qui timide rogat docet negare');
    } else btn.disabled = false;
  },
};

flatpickr(pickerId, options);

// function convertFn({ days, hours, minutes, seconds }) {
//     date.days =

// }

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
