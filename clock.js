function updateClock() {
    const clockElement = document.getElementById('clock');
    if (!clockElement) return; // Чтобы не было ошибок, если элемента нет

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    clockElement.innerText = `${hours}:${minutes}:${seconds}`;
}

// Запускаем обновление каждую 1000мс (1 секунду)
setInterval(updateClock, 1000);
updateClock(); // Вызываем сразу, чтобы не ждать секунду при загрузке