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

    /* ---------------------------------------------------
       3. GLOBAL UX ADDITIONS (Scroll Progress & Back to Top)
       --------------------------------------------------- */
    // Scroll progress bar
    const scrollBar = document.createElement('div');
    scrollBar.id = 'top-scroll-progress';
    document.body.appendChild(scrollBar);

    // Back to top button
    const backBtn = document.createElement('button');
    backBtn.id = 'btn-back-to-top';
    backBtn.innerHTML = '↑';
    backBtn.title = 'Back to top';
    document.body.appendChild(backBtn);

    backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // On scroll listener for both
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        scrollBar.style.width = scrolled + "%";

        if (winScroll > 300) {
            backBtn.classList.add('show');
        } else {
            backBtn.classList.remove('show');
        }
    });

    /* ---------------------------------------------------
       4. DYNAMIC MOUSE BACKGROUND PARALLAX & GLOW
       --------------------------------------------------- */
    // Paraleaksa na celotnem ozadju (grid)
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;
        
        // Premikamo background grid glede na pozicijo miške (do 40px)
        const offsetX = x * 40; 
        const offsetY = y * 40;
        document.body.style.backgroundPosition = `calc(50% + ${offsetX}px) calc(50% + ${offsetY}px)`;
    });

    // Hover glow efekt na karticah, ki natančno sledi miški (flashlight UX)
    document.querySelectorAll('.tool-card, .chain-step, .screenshot-box').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

});
