const noBtn = document.getElementById("noBtn");

let intentos = 0;
let transformado = false;

function escapar() {

    if (transformado) return;

    intentos++;

    // Después de 5 intentos, se rinde
    if (intentos >= 8) {

        transformado = true;

        noBtn.textContent = "OKI";
        noBtn.href = "flower.html";

        noBtn.classList.remove("no");
        noBtn.classList.add("oki");

        noBtn.style.position = "relative";
        noBtn.style.left = "0";
        noBtn.style.top = "0";

        return;
    }

    // Buscar una nueva posición en la pantalla
    const rect = noBtn.getBoundingClientRect();

    const maxX = window.innerWidth - rect.width - 20;
    const maxY = window.innerHeight - rect.height - 20;

    const nuevaX = Math.random() * Math.max(0, maxX - 20) + 10;
    const nuevaY = Math.random() * Math.max(0, maxY - 20) + 10;

    noBtn.style.position = "fixed";
    noBtn.style.left = nuevaX + "px";
    noBtn.style.top = nuevaY + "px";
}

// Cuando el cursor se acerque
noBtn.addEventListener("mouseenter", escapar);

// Para celulares
noBtn.addEventListener("touchstart", (e) => {
    if (!transformado) {
        e.preventDefault();
        escapar();
    }
}, { passive: false });

// Si intenta hacer clic
noBtn.addEventListener("click", (e) => {
    if (!transformado) {
        e.preventDefault();
        escapar();
    }
});