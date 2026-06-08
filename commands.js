    const MOTIVATION_QUOTES = [
    "Stay focused. Code clean. Achieve more. [VERIFIED]",
    "Your code is the architect of the future. [CONFIRMED]",
    "Errors are just opportunities for better debugging. [DEBUG]",
    "Console logs are the heartbeat of development. [SYSTEM]",
    "Efficiency is the key to great software. [OPTIMIZED]"
];

const CONFIG = {
    ACCESS_KEY: "200808", // Твой секретный ключ
    ALLOWED_THEMES: ['green', 'purple', 'red', 'white', 'amber', 'blue', 'pink', 'cyan', 'magenta', 'yellow']
};
const commandMap = {
    'help': (p) => typeEffect('Available: help, projects, clear, matrix, stop, view [apollyon|chester], quote, hack, theme [color]', p),
    'clear': () => document.getElementById('output').innerHTML = '',
    'view': (p, args) => view(args[0]),
    'projects': (p) => typeEffect('Projects: 1. Avito-Clone, 2. Terminal-Portfolio, 3. Interactive card for the game "The Binding of Isaac".', p),
    'quote': (p) => {
        const quote = MOTIVATION_QUOTES[Math.floor(Math.random() * MOTIVATION_QUOTES.length)];
        typeEffect('[MOTIVATION]>> ' + quote, p);
    },
    'hack': (p, _, inputField) => triggerHack(p, inputField),
    'theme': (p, args) => changeTheme(args[0]),
    'matrix': (p) => matrixEffect(),
    'stop': () => {
        if (activeEffect) {
            clearInterval(activeEffect.interval);
            activeEffect.canvas.remove();
            activeEffect = null;

            typeEffect('[SYSTEM] EFFECTS STOPPED.', document.getElementById('output'));
        } else {
            typeEffect('[SYSTEM] NO ACTIVE EFFECTS TO FOUND.', document.getElementById('output'));
        }
    }
};

function executeCommand(cmdInput, p, inputField) {
    const output = document.getElementById('output');
    const [command, ...args] = cmdInput.trim().toLowerCase().split(' ');
    if (commandMap[command]) {
        commandMap[command](p, args, inputField);
    }
    else if (command === CONFIG.ACCESS_KEY) { 
        handlePassword(output);
    }
    else {
        typeEffect(`Error: "${command}" not found. Type "help".`, p);
    }
}

// Вспомогательная функция для хака (оставляем, она норм)
    function triggerHack(p, inputField) {
    const output = document.getElementById('output');
    inputField.disabled = true;
    let count = 0;
    const interval = setInterval(() => {
        output.insertAdjacentHTML('beforeend', '<div>0101_SYSTEM_OVERRIDE_0101</div>');
        if (++count > 10) {
            clearInterval(interval);
            output.innerHTML = '<h2 style="color:red">ACCESS GRANTED</h2>';
            setTimeout(() => {
                output.innerHTML = '';
                inputField.disabled = false;
                inputField.focus();
                typeEffect('System ready. Welcome back, user.', output);
            }, 2000);
        }
    }, 100);
}

function handlePassword(output) {
    const modal = document.getElementById('password-modal');
    const modalInput = document.getElementById('modal-pass-input');
    modal.style.display = 'block';
    modalInput.focus();
    modalInput.onkeypress = function(e) {
        if (e.key === 'Enter') {
            if (modalInput.value === 'BEGINNER') {
                modal.style.display = 'none';
                modalInput.value = '';
                output.innerHTML += '<p style="color: var(--terminal-color);">[SYSTEM] ACCESS GRANTED.</p>';
                showArchive();
            } else {
                modalInput.value = '';
                output.innerHTML += '<p style="color: red;">[ERROR] ACCESS DENIED.</p>';
            }
        }
    };
}