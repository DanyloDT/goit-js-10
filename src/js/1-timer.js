import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;
const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('[data-start]');
const ref = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      iziToast.error({
        title: 'Please choose a date in the future',
        position: 'topCenter',
      });

      btn.disabled = true;
    }
    if (selectedDates[0] > Date.now()) {
      userSelectedDate = selectedDates[0];
      btn.disabled = false;
    }
  },
});

const startTimer = () => {
  const time = setInterval(() => {
    const diff = userSelectedDate - Date.now();

    if (diff <= 0) {
      clearInterval(time);
      btn.disabled = false;
      input.disabled = false;

      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);
    ref.days.textContent = addLeadingZero(days);
    ref.hours.textContent = addLeadingZero(hours);
    ref.minutes.textContent = addLeadingZero(minutes);
    ref.seconds.textContent = addLeadingZero(seconds);
  }, 1000);

  btn.disabled = true;
  input.disabled = true;
};

btn.addEventListener('click', startTimer);

const convertMs = ms => {
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
};

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};
