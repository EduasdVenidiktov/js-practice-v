if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js") // ← ./sw.js — відносно HTML-файлу
      .then((reg) => console.log("Service Worker registered!", reg))
      .catch((err) => console.error("SW registration failed:", err));
  });
}

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

// 2. ФУНКЦІЯ ДАТИ ДЛЯ СТРІЧКИ (сьогодні мінус 6 годин (1 день)
function getFormattedOldDate() {
  const date = new Date();
  // date.setDate(date.getDate() - 1);

  // Віднімаємо 6 годин від поточного часу
  date.setHours(date.getHours() - 5);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  // ОБОВ'ЯЗКОВО: Отримуємо години та хвилини, щоб вони працювали в return
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Тепер змінні hours та minutes існують і код спрацює
  return `Документ оновлено о ${hours}:37 | ${day}.${month}.${year}`;
}

// 3. ЗАПУСК ТА ЛОГІКА СТРІЧКИ
const runningLine = document.getElementById("running-line");

if (runningLine) {
  const infoText = getFormattedOldDate();
  const single = `${infoText} • `;

  // Дублюємо достатньо разів, щоб було мінімум 2–3 екрани
  const longText = single.repeat(40); // багато разів

  runningLine.textContent = longText + longText; // дві копії → анімація на -50%
}

// Запускаємо годинник
updateClock();
setInterval(updateClock, 1000);

// Для кастомного install-промпту (Android/Chrome)
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  // Запобігаємо показу стандартного промпту
  e.preventDefault();
  deferredPrompt = e;
  // ПОКАЗУЄМО КНОПКУ:
  const btn = document.getElementById("installBtn");
  if (btn) btn.style.display = "block";
});

function installPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted install");
      }
      deferredPrompt = null;
    });
  }
}

document.getElementById("installBtn")?.addEventListener("click", installPWA);

// 4. ЛОГІКА МОДАЛЬНОГО ВІКНА (Bottom Sheet)

document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("open-modal-btn");
  const overlay = document.getElementById("modal-overlay");
  const sheet = document.getElementById("modal-sheet");

  let startY = 0;
  let currentY = 0;

  // Функція закриття
  const closeModal = () => {
    sheet.style.transform = `translateY(100%)`; // Відлітає вниз
    overlay.classList.remove("active");
    sheet.classList.remove("active");
    setTimeout(() => {
      overlay.style.display = "none";
      sheet.style.transform = ""; // Скидаємо стилі після закриття
    }, 300);
  };

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      overlay.style.display = "block";
      setTimeout(() => {
        overlay.classList.add("active");
        sheet.classList.add("active");
      }, 10);
    });
  }

  // Обробка свайпу вниз
  sheet?.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
    sheet.style.transition = "none"; // Вимикаємо анімацію під час руху пальцем
  });

  sheet?.addEventListener("touchmove", (e) => {
    currentY = e.touches[0].clientY;
    const diff = currentY - startY;

    if (diff > 0) {
      // Рухаємо вікно за пальцем
      sheet.style.transform = `translateY(${diff}px)`;
    }
  });

  sheet?.addEventListener("touchend", () => {
    sheet.style.transition = "transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)";
    const diff = currentY - startY;

    if (diff > 100) {
      // Якщо свайпнули вниз більше ніж на 100px — закриваємо
      closeModal();
    } else {
      // Інакше повертаємо на місце
      sheet.style.transform = "translateY(0)";
    }
    // Скидаємо змінні
    startY = 0;
    currentY = 0;
  });

  // Закриття по кліку на фон
  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
});

//функції вмикають та вимикають перегляд фото.
function showUpdateOverlay() {
  const overlay = document.getElementById("update-overlay");
  if (overlay) {
    overlay.style.display = "flex";
  }
  // Закриваємо меню Bottom Sheet, якщо воно відкрите
  closeModal();
}

function hideUpdateOverlay() {
  const overlay = document.getElementById("update-overlay");
  if (overlay) {
    overlay.style.display = "none";
  }
}
