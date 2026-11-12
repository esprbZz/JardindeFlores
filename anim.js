// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
var lyricsData = [
  { text: "At the time", time: 15 },
  { text: "The whisper of birds", time: 18 },
  { text: "Lonely before the sun cried", time: 27 },
  { text: "Fell from the sky", time: 32 },
  { text: "Like water drops", time: 33 },
  { text: "Where I'm now? I don't know why", time: 41 },
  { text: "Nice butterflies in my hands", time: 47 },
  { text: "Too much light for twilight", time: 54 },
  { text: "In the mood for the flowers love", time: 59 },
  { text: "That vision", time: 67 },
  { text: "Really strong, blew my mind", time: 72 },
  { text: "Silence Let me see what it was", time: 78 },
  { text: "I only want to live in clouds", time: 83 },
  { text: "Where I'm now? I don't know why", time: 91 },
  { text: "Nice butterflies in my hands", time: 97 },
  { text: "Too much light for twilight", time: 104 },
  { text: "In the mood for the flowers love", time: 108 },
  { text: "At the time", time: 144 },
  { text: "The whisper of birds", time: 148 },
  { text: "Lonely before the sun cried", time: 153 },
  { text: "Fell from the sky", time: 158 },
  { text: "Like water drops", time: 164 },
  { text: "Where I'm now? I don't know why", time: 169 },
  { text: "Nice butterflies in my hands", time: 176 },
  { text: "Too much light for twilight", time: 183 },
  { text: "In the mood for the flowers", time: 188 },
  { text: "Love.", time: 140 },
];

// Animar las letras
function updateLyrics() {
  var time = Math.floor(audio.currentTime);
  var currentLine = lyricsData.find(
    (line) => time >= line.time && time < line.time + 6
  );

  if (currentLine) {
    // Calcula la opacidad basada en el tiempo en la línea actual
    var fadeInDuration = 0.1; // Duración del efecto de aparición en segundos
    var opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);

    // Aplica el efecto de aparición
    lyrics.style.opacity = opacity;
    lyrics.innerHTML = currentLine.text;
  } else {
    // Restablece la opacidad y el contenido si no hay una línea actual
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
}

setInterval(updateLyrics, 1000);

//funcion titulo
// Función para ocultar el título después de 216 segundos
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  titulo.style.animation =
    "fadeOut 3s ease-in-out forwards"; /* Duración y función de temporización de la desaparición */
  setTimeout(function () {
    titulo.style.display = "none";
  }, 3000); // Espera 3 segundos antes de ocultar completamente
}

// Llama a la función después de 216 segundos (216,000 milisegundos)
setTimeout(ocultarTitulo, 216000);
//NUEVO
const contenedorParticulas =
document.getElementById("particulas");

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

function crearParticula(){

    const p =
    document.createElement("div");

    p.classList.add("particula");

    const color =
    colores[
        Math.floor(
            Math.random()*colores.length
        )
    ];

    p.style.background = color;

    p.style.boxShadow =
    `0 0 12px ${color},
    0 0 25px ${color},
    0 0 40px ${color},
    0 0 60px ${color}`;

    p.style.left =
        Math.random()*100 + "%";

    p.style.top =
        Math.random()*100 + "%";

    p.style.width =
        (3 + Math.random()*5)+"px";

    p.style.height =
        p.style.width;

    p.style.animationDuration =
        (3 + Math.random()*4)+"s";
    
    // Movimiento horizontal aleatorio
    p.style.setProperty(
    "--movimiento-x",
    (Math.random() * 160 - 80) + "px");

    contenedorParticulas.appendChild(p);

    setTimeout(()=>{
        p.remove();
    },7000);
}

setInterval(crearParticula,150);