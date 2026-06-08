    function typeEffect(text, element, speed = 30) {
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else {
            element.innerHTML += '<span class="cursor">_</span>';
        }
    }
    typing();
}

// --- CONFIGURATION ---
const MEDIA_LIBRARY = {
    'apollyon': { src: 'apollyon.png', label: 'FILE_ID: APOLLYON_PNG [ENCRYPTED]' },
    'chester': { src: 'chester.jpg', label: 'LINKIN_PARK_LEGEND', quote: '"Who cares if one more light goes out?"' }
};

// --- CORE FUNCTIONS ---
    function view(category) {
    const output = document.getElementById('output');
    const data = MEDIA_LIBRARY[category];

    if (!data) {
        typeEffect('Error: Media not found. Available: apollyon, chester', output);
        return;
    }

    output.insertAdjacentHTML('beforeend', `<p style="color: var(--terminal-color);">> Processing ${category}.cmd...</p>`);

    const container = document.createElement('div');
    container.className = 'media-container';
    container.style.cssText = 'opacity:0; transition: all 1s; margin: 15px 0;';

    const img = document.createElement('img');
    img.src = data.src;
    img.style.cssText = 'width: 300px; border: 2px solid var(--terminal-color); border-radius: 4px; box-shadow: 0 0 10px var(--terminal-color);';

    container.appendChild(img);
    if (data.quote) container.innerHTML += `<p style="font-family:monospace; margin-top:10px;">${data.quote}</p>`;
    container.innerHTML += `<div style="color:var(--terminal-color); font-size:9px; margin-top:5px;">${data.label}</div>`;

    output.appendChild(container);
    setTimeout(() => container.style.opacity = '1', 50);
}

function showLoading(callback) {
    const output = document.getElementById('output');
    const p = document.createElement('p');
    output.appendChild(p);
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        p.innerHTML = 'SYSTEM LOADING: [' + '|'.repeat(progress / 10) + '-'.repeat(10 - progress / 10) + '] ' + progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
            p.innerHTML += ' [OK]';
            callback();
        }
    }, 200);
}

function spawnSystemLogs() {
    const logs = ["ACCESSING NODE_77...", "ENCRYPTING DATA...", "CONNECTION STABLE", "PING: 24MS", "SYSTEM_CHECK: OK"];
    const log = document.createElement('p');
    log.style.color = 'var(--terminal-color)';
    log.style.fontSize = '20px';
    log.style.position = 'fixed';
    log.style.bottom = '20px';
    log.style.right = '20px';
    log.innerText = logs[Math.floor(Math.random() * logs.length)];
    document.body.appendChild(log);
    setTimeout(() => log.remove(), 2000);
}

setInterval(spawnSystemLogs, 3000);

function changeTheme(color) {
    const root = document.documentElement;
    let newColor = '#0f0';

    if (color === 'purple') {
        newColor = '#bd00ff';
    } else if (color === 'red') {
        newColor = '#ff0000';
    } else if (color === 'green') {
        newColor = '#0f0';
    } else if (color === 'white') {
        newColor = '#ffffff';
    } else if (color === 'amber') {
        newColor = '#ffbf00';
    } else if (color === 'blue') {
        newColor = '#00bfff';
    } else if (color === 'pink') {
        newColor = '#ff69b4';
    } else if (color === 'cyan') {
        newColor = '#00ffff';
    } else if (color === 'magenta') {
        newColor = '#ff00ff';
    } else if (color === 'yellow') {
        newColor = '#ffff00';
    }
    else {
        typeEffect(`[SYSTEM] ERROR: THEME "${color}" NOT FOUND.`, output);
        return;
    }
        root.style.setProperty('--terminal-color', newColor);
        typeEffect(`[SYSTEM] THEME CHANGED TO ${color.toUpperCase()}.`, output);
    }

function showArchive() {
    const output = document.getElementById('output');
    console.log("Archive loaded successfully");
    output.insertAdjacentHTML('beforeend', '<br><p style="color: var(--terminal-color);">[ACCESS_GRANTED] DECRYPTING ARCHIVE...</p>');
    
    const archive = document.createElement('div');
    archive.style.marginTop = '20px';
    archive.style.border = '1px solid var(--terminal-color)';
    archive.style.padding = '15px';

    archive.innerHTML = `
        <div class="archive-box">
            <h3>[SECURE_DATA_ARCHIVE]</h3>
            <ul>
                <li><strong>Project: Avito-Clone</strong> | Tech: JS, HTML, CSS (Responsive)</li>
                <li><strong>Project: Terminal-Portfolio</strong> | Tech: Vanilla JS (CLI Simulation)</li>
                <li><strong>Security:</strong> System Access Logs (Encrypted)</li>
            </ul>
        </div>
    `;
    output.appendChild(archive);
}
    
function matrixEffect() {
    const output = document.getElementById('output');
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '9999';
    output.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '0123456789ABCDEF';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        const currentColor = getComputedStyle(document.documentElement).getPropertyValue('--terminal-color').trim();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = currentColor;
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
        activeEffect = {
        canvas: canvas,
        interval: setInterval(draw, 33)
    };
}