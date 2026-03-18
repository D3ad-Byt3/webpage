// terminal.js
// Logika za tipkanje ukazov in prikazovanje rezultatov v stilu Kali Linuxa

document.addEventListener("DOMContentLoaded", () => {
    const terminals = document.querySelectorAll('.animated-terminal');

    terminals.forEach(terminal => {
        const linesData = JSON.parse(terminal.getAttribute('data-lines'));
        const body = terminal.querySelector('.terminal-body');
        
        // Ensure the container is empty before starting
        body.innerHTML = '';
        
        let currentLineIndex = 0;

        function runNextLine() {
            if (currentLineIndex >= linesData.length) {
                // Končano, dodajmo samo utripajoči kurzor na koncu
                const finalPrompt = document.createElement('div');
                finalPrompt.className = 'terminal-line';
                finalPrompt.innerHTML = `<span class="cmd-prompt">root@kali:~#</span> <span class="cursor"></span>`;
                body.appendChild(finalPrompt);
                return;
            }

            const line = linesData[currentLineIndex];
            const lineDiv = document.createElement('div');
            lineDiv.className = 'terminal-line';

            if (line.type === 'input') {
                // Tipkanje komande
                const promptSpan = document.createElement('span');
                promptSpan.className = 'cmd-prompt';
                promptSpan.textContent = 'root@kali:~# ';
                
                const textSpan = document.createElement('span');
                textSpan.className = 'cmd-text';
                
                const cursorSpan = document.createElement('span');
                cursorSpan.className = 'cursor';

                lineDiv.appendChild(promptSpan);
                lineDiv.appendChild(textSpan);
                lineDiv.appendChild(cursorSpan);
                body.appendChild(lineDiv);

                typeText(textSpan, line.text, 0, () => {
                    cursorSpan.remove(); // odstrani kurzor, ko preidemo na output
                    setTimeout(() => {
                        currentLineIndex++;
                        runNextLine();
                    }, line.delayAfter || 500);
                });

            } else if (line.type === 'output') {
                // Instant prikaz rezultata
                const outSpan = document.createElement('span');
                outSpan.className = 'cmd-output';
                outSpan.textContent = line.text;
                lineDiv.appendChild(outSpan);
                body.appendChild(lineDiv);

                setTimeout(() => {
                    currentLineIndex++;
                    runNextLine();
                }, line.delayAfter || 200);
            }
        }

        // Helper funkcija za tipkanje
        function typeText(element, text, index, callback) {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                setTimeout(() => {
                    typeText(element, text, index + 1, callback);
                }, Math.random() * 50 + 30); // Hitrost tipkanja med 30 in 80ms na znak
            } else {
                callback();
            }
        }

        // Preverjanje če je terminal v vidnem polju (Scroll trigger animacije)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !terminal.dataset.started) {
                    terminal.dataset.started = 'true';
                    setTimeout(runNextLine, 500); // Kratek premor preden začne
                }
            });
        }, { threshold: 0.5 }); // Ko je 50% terminala vidnega

        observer.observe(terminal);
    });
});
