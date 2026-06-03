import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const buttonStart = document.querySelector('[data-start]');
const daysCount = document.querySelector('[data-days]');
const hoursCount = document.querySelector('[data-hours]');
const minutesCount = document.querySelector('[data-minutes]');
const secondsCount = document.querySelector('[data-seconds]');
const inputDate = document.querySelector('#datetime-picker');
let userSelectedDate = null;
let timerId = null;
buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const today = new Date();

    if (!selectedDate) return;

    if (selectedDate <= today) {
      window.alert('Please choose a date in the future');
      buttonStart.disabled = true;
      userSelectedDate = null;
    } else {
      buttonStart.disabled = false;
      userSelectedDate = selectedDate;
    }
    console.log(selectedDates[0]);
  },
};

flatpickr(inputDate, options);

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function formatDate({ days, hours, minutes, seconds }) {
  daysCount.textContent = String(days).length < 2 ? addLeadingZero(days) : days;
  hoursCount.textContent = addLeadingZero(hours);
  minutesCount.textContent = addLeadingZero(minutes);
  secondsCount.textContent = addLeadingZero(seconds);
}

function timerOn() {
  const currentDate = Date.now();
  const timeDif = userSelectedDate.getTime() - currentDate;
  if (timeDif <= 0) {
    clearInterval(timerId);
    formatDate({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    inputDate.disabled = false;
    return;
  }

  const timeValues = convertMs(timeDif);
  formatDate(timeValues);
}

function countStart(event) {
  event.preventDefault();
  buttonStart.disabled = true;
  inputDate.disabled = true;

  timerOn();
  timerId = setInterval(timerOn, 1000);
}

buttonStart.addEventListener('click', countStart);
