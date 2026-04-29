// // 1. Працюємо з датою (сьогодні мінус 3 дні)
// const date = new Date();
// date.setDate(date.getDate() - 3);

// // Форматуємо дату: додаємо "0", якщо число менше 10
// const day = String(date.getDate()).padStart(2, "0");
// const month = String(date.getMonth() + 1).padStart(2, "0");
// const year = date.getFullYear();
// const hours = String(date.getHours()).padStart(2, "0");
// const minutes = String(date.getMinutes()).padStart(2, "0");

// const formattedDate = `+ Документ оновлено о ${hours}:${minutes} | ${day}.${month}.${year}`;

// // 2. Знаходимо елемент та вставляємо текст
// const line = document.querySelector("h4:nth-of-type(3)"); // Знаходить третій h4 у вашому коді
// line.textContent = formattedDate;
// line.id = "running-text"; // Додаємо ID для анімації

// // 3. Стилізація для руху
// line.style.position = "fixed";
// line.style.whiteSpace = "nowrap";
// line.style.left = "100%";

// // 4. Анімація руху справа наліво
// let pos = window.innerWidth;

// function scroll() {
//   pos -= 2; // Швидкість
//   if (pos < -line.offsetWidth) {
//     pos = window.innerWidth;
//   }
//   line.style.left = pos + "px";
//   requestAnimationFrame(scroll);
// }

// function updateClock() {
//   const timeElement = document.getElementById("current-time");
//   const now = new Date();

//   const hours = String(now.getHours()).padStart(2, "0");
//   const minutes = String(now.getMinutes()).padStart(2, "0");

//   timeElement.textContent = `${hours}:${minutes}`;
// }

// // Запускаємо відразу і ставимо інтервал оновлення
// updateClock();
// setInterval(updateClock, 1000);

// scroll();

// 1. ФУНКЦІЯ ГОДИННИКА (працює автономно)
function updateClock() {
  const timeElement = document.getElementById("current-time");
  if (timeElement) {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    timeElement.textContent = `${hours}:${minutes}`;
  }
}

// 2. ФУНКЦІЯ ДАТИ ДЛЯ СТРІЧКИ (сьогодні мінус 1 день)
function getFormattedOldDate() {
  const date = new Date();
  date.setDate(date.getDate() - 1);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  //   const hours = String(date.getHours()).padStart(2, "0");
  //   const minutes = String(date.getMinutes()).padStart(2, "0");

  return `Документ оновлено о 21:37 | ${day}.${month}.${year}`;
}

// 3. ЗАПУСК ТА ЛОГІКА СТРІЧКИ
const runningLine = document.getElementById("running-line");

if (runningLine) {
  const infoText = getFormattedOldDate();
  // Дублюємо текст для ефекту нескінченності
  // Повторюємо текст 5-6 разів, щоб заповнити всю ширину екрана
  const content = `${infoText} • `;
  runningLine.textContent = content.repeat(60);
}

// Запускаємо годинник
updateClock();
setInterval(updateClock, 1000);
