const monthYear = document.getElementById('monthYear');
const currentDate = document.getElementById('currentDate');
const calendarBody = document.getElementById('calendarBody');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDate = null;

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function generateCalendar(month, year) {
  monthYear.innerHTML = `${months[month]} ${year}`;
  currentDate.innerHTML = selectedDate ? selectedDate : new Date().toDateString();

  // First day of the month
  const firstDay = new Date(year, month, 1).getDay();
  // Days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Clear previous cells
  calendarBody.innerHTML = "";

  let date = 1;
  for (let i = 0; i < 6; i++) { // 6 weeks max
    let row = document.createElement('tr');

    for (let j = 0; j < 7; j++) {
      let cell = document.createElement('td');

      if (i === 0 && j < firstDay) {
        cell.innerHTML = "";
      } else if (date > daysInMonth) {
        break;
      } else {
        cell.innerHTML = date;
        if (date === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
          cell.classList.add('today');
        }

        // Add event listener to each date cell
        cell.addEventListener('click', () => selectDate(date, month, year));

        date++;
      }
      row.appendChild(cell);
    }
    calendarBody.appendChild(row);
  }
}

function selectDate(date, month, year) {
  if (date <= new Date(year, month + 1, 0).getDate()) {
    selectedDate = `${months[month]} ${date}, ${year}`;
    generateCalendar(month, year); // regenerate the calendar with the selected date
  }
}

function changeMonth(offset) {
  currentMonth += offset;

  // Handle month overflow
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  } else if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }

  generateCalendar(currentMonth, currentYear);
}

generateCalendar(currentMonth, currentYear);
