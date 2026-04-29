const pension = 9448.23;
const inflationRates = [
  100.1, 99.8, 101.2, 100.9, 100.8, 100.6, 101.3, 101.6, 104.5, 103.1, 102.7,
  103.1, 100.7, 101.1, 101.9, 102.5, 100.7, 100.7, 100.8, 100.7, 101.5, 100.2,
  100.5, 100.8, 99.4, 98.6, 100.5, 100.8, 100.5, 100.7, 100.4,
];

const tableBody = document.querySelector("table tbody");
const totalCompensationElement = document.getElementById("totalCompensation");

// Начальная дата
let startDate = new Date("2021-07-01");

// Функция для форматирования даты в мм.гггг
function formatDate(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}.${year}`;
}

let totalCompensation = 0;

for (let i = 0; i < inflationRates.length; i++) {
  const inflationRate = inflationRates[i];

  let cumulativeProduct = 1;
  for (let j = i; j < inflationRates.length; j++) {
    cumulativeProduct *= inflationRates[j] / 100;
  }

  const calculatedPension = pension * cumulativeProduct;
  const compensation = calculatedPension - pension;

  totalCompensation += compensation;

  const row = tableBody.insertRow();
  const numberCell = row.insertCell();
  const dateCell = row.insertCell(); // Добавлена ячейка для даты
  const rateCell = row.insertCell();
  const compensationCell = row.insertCell();

  numberCell.textContent = i + 1;

  // Вычисление и форматирование текущей даты
  const currentDate = new Date(startDate);
  currentDate.setMonth(startDate.getMonth() + i);
  dateCell.textContent = formatDate(currentDate); // Заполнение ячейки датой

  rateCell.textContent = inflationRate.toFixed(2);
  compensationCell.textContent = compensation.toFixed(2);
}

totalCompensationElement.textContent = `Загальна сума компенсації: ${totalCompensation.toFixed(
  2
)} грн`;

// const pension = 9448.23;
// const inflationRates = [
//   100.1, 99.8, 101.2, 100.9, 100.8, 100.6, 101.3, 101.6, 104.5, 103.1, 102.7,
//   103.1, 100.7, 101.1, 101.9, 102.5, 100.7, 100.7, 100.8, 100.7, 101.5, 100.2,
//   100.5, 100.8, 99.4, 98.6, 100.5, 100.8, 100.5, 100.7, 100.4, 100.3,
// ];

// const tableBody = document.querySelector("table tbody");
// const totalCompensationElement = document.getElementById("totalCompensation");

// let totalCompensation = 0;

// for (let i = 0; i < inflationRates.length; i++) {
//   const inflationRate = inflationRates[i];

//   let cumulativeProduct = 1;
//   for (let j = i; j < inflationRates.length; j++) {
//     cumulativeProduct *= inflationRates[j] / 100;
//   }

//   const calculatedPension = pension * cumulativeProduct;
//   const compensation = calculatedPension - pension;

//   totalCompensation += compensation;

//   const row = tableBody.insertRow();
//   const monthCell = row.insertCell();
//   const rateCell = row.insertCell();
//   const compensationCell = row.insertCell();

//   monthCell.textContent = i + 1;
//   rateCell.textContent = inflationRate.toFixed(2);
//   compensationCell.textContent = compensation.toFixed(2);
// }

// totalCompensationElement.textContent = `Загальна сума компенсації: ${totalCompensation.toFixed(
//   2
// )} грн`;
