if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .catch((err) => console.log("SW registration failed:", err));
  });
}

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  self.clients.claim();
});

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
