const inputField = document.getElementById('input');
const output = document.getElementById('output');
let isLocked = true;
let mode = 'command';
let activeEffect = null;
let commandHistory = [];
let historyIndex = -1;

const observer = new MutationObserver(() => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
});
observer.observe(output, { childList: true, subtree: true });

inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = inputField.value.trim(); // Без toLowerCase, чтобы видеть капс

        output.insertAdjacentHTML('beforeend', '<p>> ' + (mode === 'password' ? '********' : cmd) + '</p>');
        const p = document.createElement('p');
        output.appendChild(p);

         if (cmd !== '') {
        commandHistory.unshift(cmd);
        historyIndex = -1;
    }
        if (isLocked) {
            if (cmd === '080211') {
                output.insertAdjacentHTML('beforeend', '<p>PASSWORD ACCEPTED...</p>');
                showLoading(() => {
                    isLocked = false;
                    output.insertAdjacentHTML('beforeend', '<p>SYSTEM UNLOCKED. ENTER "help" FOR HELP</p>');
                });
            } else {
                output.insertAdjacentHTML('beforeend', '<p style="color:red">DENIED.</p>');
            }
        } else if (mode === 'password') {
            // Сравниваем строго капсом
            if (cmd === 'BEGINNER') { 
                output.insertAdjacentHTML('beforeend', '<p>ACCESS GRANTED. WELCOME, USER...</p>');
                mode = 'command';
                if (typeof showArchive === 'function') showArchive();
            } else {
                output.insertAdjacentHTML('beforeend', '<p style="color:red">ACCESS DENIED. WRONG KEY.</p>');
            }
        } else {
            // Для остальных команд приводим к нижнему регистру только здесь, если надо
            executeCommand(cmd.toLowerCase(), p, inputField);
        }
        inputField.value = '';
    }
    if (e.key === 'ArrowUp') {
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            inputField.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        if (historyIndex > 0) {
            historyIndex--;
            inputField.value = commandHistory[historyIndex];
        } else {
            historyIndex = -1;
            inputField.value = ''; // Если дошли до конца, очищаем поле
        }
    }
});