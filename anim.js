const audio = document.querySelector("audio");
const lyrics = document.querySelector("#lyrics");
const contenedorParticulas = document.getElementById("particulas");

// ==========================================
// LETRAS DE SALVATORE - LANA DEL REY
// Una frase a la vez
// Los tiempos son aproximados
// ==========================================

const lyricsData = [
    { time: 41, text: "All the lights in Miami begin to gleam" },
    { time: 48, text: "Ruby, blue and green, neon too" },
    { time: 57, text: "Everything looks better from above, my king" },
    { time: 64, text: "Like aquamarine, ocean's blue" },

    { time: 72, text: "Ah, ah, ah, ah" },
    { time: 76, text: "Cacciatore" },
    { time: 80, text: "La da da da da" },
    { time: 85, text: "Limousines" },
    { time: 89, text: "Ah, ah, ah, ah" },
    { time: 92, text: "Ciao amore" },
    { time: 97, text: "La da da da da" },
    { time: 100, text: "Soft ice cream" },

    { time: 106, text: "All the lights are sparkling for you, it seems" },
    { time: 113, text: "On the downtown scenes, shady blue" },
    { time: 121, text: "Beatboxing and rapping in the summer rain" },
    { time: 128, text: "Like a boss, he sang jazz and blues" },

    { time: 136, text: "Ah, ah, ah, ah" },
    { time: 141, text: "Cacciatore" },
    { time: 145, text: "La da da da da" },
    { time: 149, text: "Limousines" },
    { time: 153, text: "Ah, ah, ah, ah" },
    { time: 156, text: "Ciao amore" },
    { time: 160, text: "La da da da da" },
    { time: 164, text: "Soft ice cream" },

    { time: 169, text: "The summer's wild" },
    { time: 170, text: "And I've been waiting for you all this time" },
    { time: 176, text: "I adore you, can't you see, you're meant for me?" },
    { time: 184, text: "Summer's hot, but I've been cold without you" },
    { time: 189, text: "I was so wrong not to doubt your Medellín" },
    { time: 196, text: "tangerine dreams" },
    { time: 201, text: "Catch me if you can" },
    { time: 203, text: "Working on my tan" },
    { time: 205, text: "Salvatore" },
    { time: 208, text: "Dying by the hand of a foreign man" },
    { time: 213, text: "Happily" },
    { time: 216, text: "Calling out my name" },
    { time: 219, text: "In the summer rain" },
    { time: 220, text: "Ciao amore" },
    { time: 224, text: "Salvatore can wait" },
    { time: 226, text: "Now it's time to eat" },
    { time: 228, text: "Soft ice cream" },
    { time: 233, text: "..." }
];

// ==========================================
// SINCRONIZACIÓN DE LAS LETRAS
// ==========================================

let ultimaFrase = "";
let temporizadorLetra;

function updateLyrics() {
    if (!audio || !lyrics) return;

    const tiempoActual = audio.currentTime;

    const lineaActual = lyricsData.find((linea, index) => {
        const siguienteLinea = lyricsData[index + 1];

        return tiempoActual >= linea.time &&
            (!siguienteLinea || tiempoActual < siguienteLinea.time);
    });

    if (lineaActual) {
        if (ultimaFrase !== lineaActual.text) {
            ultimaFrase = lineaActual.text;

            clearTimeout(temporizadorLetra);

            lyrics.style.opacity = "0";

            temporizadorLetra = setTimeout(() => {
                lyrics.textContent = lineaActual.text;
                lyrics.style.opacity = "1";
            }, 250);
        }
    } else {
        ultimaFrase = "";
        clearTimeout(temporizadorLetra);
        lyrics.style.opacity = "0";
        lyrics.textContent = "";
    }
}

if (audio && lyrics) {
    audio.addEventListener("timeupdate", updateLyrics);
    audio.addEventListener("seeked", updateLyrics);
    audio.addEventListener("loadedmetadata", updateLyrics);

    // Mostrar la primera frase si el audio comienza desde cero
    updateLyrics();
}

// ==========================================
// DESAPARICIÓN DEL TÍTULO
// ==========================================

let temporizadorTitulo;
let tituloOcultado = false;

function ocultarTitulo() {
    const titulo = document.querySelector(".titulo");

    if (!titulo || tituloOcultado) return;

    tituloOcultado = true;

    titulo.style.animation = "none";
    titulo.style.transition = "opacity 3s ease-in-out";

    requestAnimationFrame(() => {
        titulo.style.opacity = "0";
    });

    setTimeout(() => {
        titulo.style.display = "none";
    }, 3000);
}

function programarOcultarTitulo() {
    if (!audio) return;

    clearTimeout(temporizadorTitulo);

    // Si conocemos la duración, ocultamos el título
    // durante los últimos 3 segundos de la canción.
    const duracion = audio.duration;

    const tiempoEspera = Number.isFinite(duracion)
        ? Math.max(0, (duracion - 3) * 1000)
        : 278000;

    temporizadorTitulo = setTimeout(
        ocultarTitulo,
        tiempoEspera
    );
}

if (audio) {
    audio.addEventListener("loadedmetadata", programarOcultarTitulo);
    audio.addEventListener("ended", ocultarTitulo);

    // Tiempo de respaldo si no se obtiene la duración del audio
    temporizadorTitulo = setTimeout(ocultarTitulo, 278000);
}

// ==========================================
// SISTEMA DE PARTÍCULAS
// ==========================================

const colores = [
    "#ff4fb5",
    "#cd90b3",
    "#ff58bf",
    "#c0338a",
    "#d46415",
    "#ff69c8",
    "#ff76d0",
    "#f2f5f6",
    "#96ebf8",
    "#d8d3ba"
];

function crearParticula() {
    if (!contenedorParticulas) return;

    const particula = document.createElement("div");

    particula.classList.add("particula");

    const color = colores[
        Math.floor(Math.random() * colores.length)
    ];

    particula.style.background = color;

    particula.style.boxShadow = `
        0 0 12px ${color},
        0 0 25px ${color},
        0 0 40px ${color},
        0 0 60px ${color}
    `;

    particula.style.left = Math.random() * 100 + "%";
    particula.style.top = Math.random() * 100 + "%";

    const tamano = 3 + Math.random() * 5;

    particula.style.width = tamano + "px";
    particula.style.height = tamano + "px";

    particula.style.animationDuration =
        (3 + Math.random() * 4) + "s";

    // Movimiento horizontal aleatorio
    particula.style.setProperty(
        "--movimiento-x",
        (Math.random() * 160 - 80) + "px"
    );

    contenedorParticulas.appendChild(particula);

    // Eliminar la partícula al terminar su animación
    setTimeout(() => {
        particula.remove();
    }, 7000);
}

// Crear partículas continuamente
if (contenedorParticulas) {
    setInterval(crearParticula, 150);
}
