import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const buttonStart = document.querySelector('[data-start]');
const inputDate = document.querySelector('#datetime-picker');
let userSelectedDate = null;
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
