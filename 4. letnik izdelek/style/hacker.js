// hacker.js - Združena skripta za Inovacije

document.addEventListener("DOMContentLoaded", () => {
    
    /* ---------------------------------------------------
       1. THEME SWITCHER (Hacker vs Corporate)
       --------------------------------------------------- */
    // Ustvarimo gumb dinamično v headerju
    const nav = document.querySelector('nav');
    if (nav) {
        const themeBtn = document.createElement('a');
        themeBtn.href = "#";
        themeBtn.id = "theme-toggle";
        themeBtn.style.cursor = "pointer";
        themeBtn.style.marginLeft = "auto";
        themeBtn.style.background = "transparent";
        themeBtn.style.border = "1px solid var(--accent-green)";
        themeBtn.style.padding = "4px 10px";
        themeBtn.style.borderRadius = "4px";
        themeBtn.innerText = "👔 Corp Mode";
        nav.appendChild(themeBtn);

        // Naložimo shranjeno temo
        if(localStorage.getItem('theme') === 'corporate') {
            document.body.classList.add('corporate-theme');
            themeBtn.innerText = "🕵️ Hacker Mode";
            themeBtn.style.borderColor = "#0ea5e9";
        }

        themeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.toggle('corporate-theme');
            if(document.body.classList.contains('corporate-theme')) {
                localStorage.setItem('theme', 'corporate');
                themeBtn.innerText = "🕵️ Hacker Mode";
                themeBtn.style.borderColor = "#0ea5e9";
            } else {
                localStorage.setItem('theme', 'hacker');
                themeBtn.innerText = "👔 Corp Mode";
                themeBtn.style.borderColor = "var(--accent-green)";
            }
        });
    }

    /* ---------------------------------------------------
       2. KONAMI CODE EASTER EGG (Matrix Rain)
       --------------------------------------------------- */
    let secretCode = ['r', 'o', 'o', 't'];
    let codeIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === secretCode[codeIndex]) {
            codeIndex++;
            if (codeIndex === secretCode.length) {
                triggerMatrix();
                codeIndex = 0; // reset
            }
        } else {
            codeIndex = 0; // napaka na tipki - reset
        }
    });

    function triggerMatrix() {
        // Preprečimo dvojni zagon
        if(document.getElementById('matrix-canvas')) return;

        const canvas = document.createElement('canvas');
        canvas.id = 'matrix-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0'; 
        canvas.style.left = '0';
        canvas.style.width = '100vw'; 
        canvas.style.height = '100vh';
        canvas.style.zIndex = '9998';
        canvas.style.background = 'black';
        document.body.appendChild(canvas);

        const hackText = document.createElement('h1');
        hackText.textContent = 'SYSTEM COMPROMISED';
        hackText.style.position = 'fixed';
        hackText.style.top = '50%'; 
        hackText.style.left = '50%';
        hackText.style.transform = 'translate(-50%, -50%)';
        hackText.style.color = 'red';
        hackText.style.fontSize = '8vw';
        hackText.style.zIndex = '9999';
        hackText.style.textShadow = '0 0 30px red, 0 0 10px darkred';
        hackText.style.fontFamily = "'Share Tech Mono', monospace";
        hackText.style.margin = '0';
        hackText.style.textAlign = 'center';
        document.body.appendChild(hackText);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~';
        const fontSize = 18;
        const columns = Math.ceil(canvas.width / fontSize);
        const drops = Array(columns).fill(1);

        const interval = setInterval(() => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }, 33);

        // Ustavi po 5 sekundah
        setTimeout(() => {
            clearInterval(interval);
            canvas.style.transition = "opacity 1s ease";
            hackText.style.transition = "opacity 1s ease";
            canvas.style.opacity = "0";
            hackText.style.opacity = "0";
            setTimeout(() => {
                canvas.remove();
                hackText.remove();
            }, 1000);
        }, 4000);
    }
});
