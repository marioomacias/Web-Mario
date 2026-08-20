// Reset de Scroll
if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
window.scrollTo(0, 0);

// --- 1. MÁQUINA DE ESCRIBIR (Solo Logo) ---
const logoMarioText = "Mario_";
const logoMaciasText = "Macias";
const speed = 80;

function typeWriter() {
    let i = 0, j = 0;
    const logoMarioEl = document.getElementById("logo-mario");
    const logoMaciasEl = document.getElementById("logo-macias");

    // Si por algún motivo no encuentra el logo, que no crashee
    if (!logoMarioEl || !logoMaciasEl) return;

    function typeLogoMario() {
        if (i < logoMarioText.length) {
            logoMarioEl.innerHTML += logoMarioText.charAt(i);
            i++;
            setTimeout(typeLogoMario, speed);
        } else {
            setTimeout(typeLogoMacias, 50);
        }
    }

    function typeLogoMacias() {
        if (j < logoMaciasText.length) {
            logoMaciasEl.innerHTML += logoMaciasText.charAt(j);
            j++;
            setTimeout(typeLogoMacias, speed);
        }
    }

    // Empieza a escribir casi al instante (400ms)
    setTimeout(typeLogoMario, 400);
}
document.addEventListener("DOMContentLoaded", typeWriter);

// --- 2. GLOBAL SPOTLIGHT & 3D TILT ---
document.addEventListener('mousemove', e => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
});

const supportsHover = window.matchMedia('(hover: hover)').matches;
if (supportsHover) {
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    });
}

// --- 3. BOOT SEQUENCE DE DESPEDIDA (TERMINAL PURA) ---
const bootMessages = [
    "> System.exit",
    "> Waiting for user...",
    "> Charging text...",
    "> Locating next objective...",
    "> State: Ready for the next challengue."
];

function runBootSequence() {
    const terminal = document.getElementById('bootTerminal');
    if (!terminal) return;

    let msgIdx = 0;
    function showNextMessage() {
        if (msgIdx < bootMessages.length) {
            terminal.textContent = bootMessages[msgIdx];
            msgIdx++;
            setTimeout(showNextMessage, 1800); 
        }
        // Al terminar la lista, no hace nada más. 
        // El último mensaje se queda fijo en pantalla con el cursor parpadeando.
    }
    showNextMessage();
}

const terminalCard = document.getElementById('terminal-card');
if (terminalCard && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runBootSequence();
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });
    observer.observe(terminalCard);
} else if (terminalCard) {
    runBootSequence();
}

// --- 4. MENÚ MÓVIL ---
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}