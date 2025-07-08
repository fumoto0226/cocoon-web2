/********************************************
 *         ADJUSTABLE PARAMETERS            *
 ********************************************/

// Overall ASCII "screen" size (in characters)
const SCREEN_WIDTH  = 150;
const SCREEN_HEIGHT = 40;

// Each letter in our new high–resolution fontMap is drawn on a 12×12 grid.
const CHAR_WIDTH  = 14;
const CHAR_HEIGHT = 12;

// Characters used when lighting up a pixel
const CHARACTERS = " .:-=+*#%@&$0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Fade speed and relight parameters
const FADE_DECAY = 0.005;      // How fast a pixel fades each tick
const RELIGHT_COUNT = 3;       // How many pixels get re-lit per tick
const RELIGHT_THRESHOLD = 0.6; // Only re-light if fade level is below this threshold
const FRAME_INTERVAL = 20;     // Desired frame interval (ms)

/********************************************
 *                GLOBALS                   *
 ********************************************/

let asciiArt = [];     // 2D array storing characters (or span-wrapped HTML)
let fadeLevels = [];   // 2D array of fade values (0 to 1) for each pixel
let letterCoords = []; // Array of [y, x] positions for letter pixels
let animationFrameId = null; // For canceling the animation loop if needed
let lastTimestamp = 0;       // For frame-timing

/********************************************
 *            COLOR INTERPOLATION           *
 ********************************************/

/*
  Monochrome fadeToColor:
    f = 1.0 → white (#ffffff)
    f = 0.0 → black (#000000)
*/
function fadeToColor(f) {
  const brightness = Math.round(f * 255);
  const hex = brightness.toString(16).padStart(2, '0');
  return `#${hex}${hex}${hex}`;
}

/********************************************
 *              HIGH–RES FONT MAP           *
 ********************************************/

/*
  Each letter is now represented using 12 strings (rows) of 12 characters.
  Adjust or extend these definitions as desired.
*/
const fontMap = {
  A: [
    "     ##     ",
    "    ####    ",
    "   ##  ##   ",
    "  ##    ##  ",
    " ##      ## ",
    "############",
    "############",
    "##        ##",
    "##        ##",
    "##        ##",
    "##        ##",
    "            "
  ],
  B: [
    "########    ",
    "##      ##  ",
    "##       ## ",
    "##      ##  ",
    "########    ",
    "########    ",
    "##      ##  ",
    "##       ## ",
    "##      ##  ",
    "##       ## ",
    "########    ",
    "            "
  ],
  C: [
    "   #######  ",
    "  ##     ## ",
    " ##       ##",
    "##          ",
    "##          ",
    "##          ",
    "##          ",
    " ##       ##",
    "  ##     ## ",
    "   #######  ",
    "            ",
    "            "
  ],
  D: [
    "########    ",
    "##     ##   ",
    "##      ##  ",
    "##       ## ",
    "##       ## ",
    "##       ## ",
    "##       ## ",
    "##      ##  ",
    "##     ##   ",
    "########    ",
    "            ",
    "            "
  ],
  E: [
    "########### ",
    "##          ",
    "##          ",
    "##          ",
    "########    ",
    "########    ",
    "##          ",
    "##          ",
    "##          ",
    "########### ",
    "            ",
    "            "
  ],
  F: [
    "########### ",
    "##          ",
    "##          ",
    "##          ",
    "########    ",
    "########    ",
    "##          ",
    "##          ",
    "##          ",
    "##          ",
    "            ",
    "            "
  ],
  G: [
    "   #######  ",
    "  ##     ## ",
    " ##         ",
    "##          ",
    "##   ###### ",
    "##       ## ",
    "##       ## ",
    " ##     ##  ",
    "  #######   ",
    "            ",
    "            ",
    "            "
  ],
  H: [
    "##        ##",
    "##        ##",
    "##        ##",
    "########### ",
    "########### ",
    "##        ##",
    "##        ##",
    "##        ##",
    "##        ##",
    "            ",
    "            ",
    "            "
  ],
  I: [
    "    ###     ",
    "     #      ",
    "     #      ",
    "     #      ",
    "     #      ",
    "     #      ",
    "     #      ",
    "     #      ",
    "    ###     ",
    "            ",
    "            ",
    "            "
  ],
  J: [
    "       ###  ",
    "        ##  ",
    "        ##  ",
    "        ##  ",
    "        ##  ",
    "##      ##  ",
    "##      ##  ",
    "##     ##   ",
    " ######     ",
    "            ",
    "            ",
    "            "
  ],
  K: [
    "##       ## ",
    "##      ##  ",
    "##     ##   ",
    "##   ##     ",
    "####        ",
    "####        ",
    "##   ##     ",
    "##     ##   ",
    "##      ##  ",
    "##       ## ",
    "            ",
    "            "
  ],
  L: [
    "##          ",
    "##          ",
    "##          ",
    "##          ",
    "##          ",
    "##          ",
    "##          ",
    "##          ",
    "########### ",
    "########### ",
    "            ",
    "            "
  ],
  M: [
    "##      ##  ",
    "###    ###  ",
    "####  ####  ",
    "## #### ##  ",
    "##  ####  ##",
    "##      ##  ",
    "##      ##  ",
    "##      ##  ",
    "##      ##  ",
    "            ",
    "            ",
    "            "
  ],
  N: [
    "##        ##",
    "###       ##",
    "####      ##",
    "## ##     ##",
    "##  ##    ##",
    "##   ##   ##",
    "##    ##  ##",
    "##     ## ##",
    "##      ####",
    "##        ##",
    "##        ##",
    "            "
  ],
  O: [
    "   ######   ",
    "  ##    ##  ",
    " ##      ## ",
    "##        ##",
    "##        ##",
    "##        ##",
    "##        ##",
    " ##      ## ",
    "  ##    ##  ",
    "   ######   ",
    "            ",
    "            "
  ],
  P: [
    "########    ",
    "##     ##   ",
    "##      ##  ",
    "##      ##  ",
    "########    ",
    "########    ",
    "##          ",
    "##          ",
    "##          ",
    "##          ",
    "            ",
    "            "
  ],
  Q: [
    "   ######   ",
    "  ##    ##  ",
    " ##      ## ",
    "##        ##",
    "##        ##",
    "##        ##",
    "##    ##  ##",
    " ##   ## ## ",
    "  #### ###  ",
    "     ####   ",
    "            ",
    "            "
  ],
  R: [
    "########    ",
    "##     ##   ",
    "##      ##  ",
    "##      ##  ",
    "########    ",
    "########    ",
    "##   ##     ",
    "##    ##    ",
    "##     ##   ",
    "##      ##  ",
    "            ",
    "            "
  ],
  S: [
    "  #######   ",
    " ##     ##  ",
    "##          ",
    "##          ",
    "  ######    ",
    "     ####   ",
    "         ## ",
    "##     ##   ",
    " #######    ",
    "            ",
    "            ",
    "            "
  ],
  T: [
    "############",
    "     ##     ",
    "     ##     ",
    "     ##     ",
    "     ##     ",
    "     ##     ",
    "     ##     ",
    "     ##     ",
    "     ##     ",
    "     ##     ",
    "            ",
    "            "
  ],
  U: [
    "##        ##",
    "##        ##",
    "##        ##",
    "##        ##",
    "##        ##",
    "##        ##",
    "##        ##",
    " ##      ## ",
    "  ########  ",
    "            ",
    "            ",
    "            "
  ],
  V: [
    "##        ##",
    "##        ##",
    "##        ##",
    " ##      ## ",
    "  ##    ##  ",
    "   ##  ##   ",
    "    ####    ",
    "     ##     ",
    "     ##     ",
    "            ",
    "            ",
    "            "
  ],
  W: [
    "##        ##",
    "##        ##",
    "##        ##",
    "##   ##   ##",
    "##   ##   ##",
    "##   ##   ##",
    "##  ####  ##",
    "##  ####  ##",
    " ########## ",
    "            ",
    "            ",
    "            "
  ],
  X: [
    "##        ##",
    " ##      ## ",
    "  ##    ##  ",
    "   ##  ##   ",
    "    ####    ",
    "    ####    ",
    "   ##  ##   ",
    "  ##    ##  ",
    " ##      ## ",
    "##        ##",
    "            ",
    "            "
  ],
  Y: [
    "##        ##",
    " ##      ## ",
    "  ##    ##  ",
    "   ##  ##   ",
    "    ####    ",
    "     ##     ",
    "     ##     ",
    "     ##     ",
    "     ##     ",
    "            ",
    "            ",
    "            "
  ],
  Z: [
    "############",
    "         ## ",
    "        ##  ",
    "       ##   ",
    "      ##    ",
    "     ##     ",
    "    ##      ",
    "   ##       ",
    "  ##        ",
    "############",
    "            ",
    "            "
  ]
};

/********************************************
 *          BUILD INITIAL ARRAYS            *
 ********************************************/

function generateAsciiArray(word) {
  // Initialize the "screen" arrays with spaces and zero fade levels.
  asciiArt = Array.from({ length: SCREEN_HEIGHT }, () => Array(SCREEN_WIDTH).fill(" "));
  fadeLevels = Array.from({ length: SCREEN_HEIGHT }, () => Array(SCREEN_WIDTH).fill(0));
  letterCoords = [];

  // Center the text on the "screen"
  const totalTextWidth = word.length * CHAR_WIDTH;
  const startX = Math.floor((SCREEN_WIDTH - totalTextWidth) / 2);
  const startY = Math.floor((SCREEN_HEIGHT - CHAR_HEIGHT) / 2);

  // For each letter, map its high-res pattern onto the screen arrays.
  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    // Use a blank pattern if the letter is not defined.
    const pattern = fontMap[letter] || Array.from({ length: CHAR_HEIGHT }, () => " ".repeat(CHAR_WIDTH));
    for (let r = 0; r < CHAR_HEIGHT; r++) {
      for (let c = 0; c < CHAR_WIDTH; c++) {
        if (pattern[r][c] === '#') {
          const x = startX + i * CHAR_WIDTH + c;
          const y = startY + r;
          if (x >= 0 && x < SCREEN_WIDTH && y >= 0 && y < SCREEN_HEIGHT) {
            asciiArt[y][x] = " ";
            fadeLevels[y][x] = 0;
            letterCoords.push([y, x]);
          }
        }
      }
    }
  }
}

/********************************************
 *           RENDERING FUNCTION             *
 ********************************************/

function renderAscii() {
  // Join each row into a string and update the innerHTML.
  const output = asciiArt.map(row => row.join("")).join("\n");
  document.getElementById("asciiContainer").innerHTML = output;
}

/********************************************
 *         MAIN ANIMATION LOOP              *
 ********************************************/

function animate(timestamp) {
  if (!lastTimestamp) lastTimestamp = timestamp;
  const delta = timestamp - lastTimestamp;
  
  if (delta >= FRAME_INTERVAL) {
    // 1) Fade out pixels.
    for (const [y, x] of letterCoords) {
      if (fadeLevels[y][x] > 0) {
        fadeLevels[y][x] = Math.max(fadeLevels[y][x] - FADE_DECAY * (delta / FRAME_INTERVAL), 0);
        const lvl = fadeLevels[y][x];
        if (lvl > 0) {
          const rawChar = asciiArt[y][x].replace(/<[^>]+>/g, "") || " ";
          asciiArt[y][x] = `<span style="color:${fadeToColor(lvl)}">${rawChar}</span>`;
        } else {
          asciiArt[y][x] = " ";
        }
      }
    }

    // 2) Randomly relight some pixels.
    for (let i = 0; i < RELIGHT_COUNT; i++) {
      const idx = Math.floor(Math.random() * letterCoords.length);
      const [ry, rx] = letterCoords[idx];
      if (fadeLevels[ry][rx] <= RELIGHT_THRESHOLD) {
        fadeLevels[ry][rx] = 1;
        const newChar = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        asciiArt[ry][rx] = `<span style="color:${fadeToColor(1)}">${newChar}</span>`;
      }
    }

    renderAscii();
    lastTimestamp = timestamp;
  }
  
  animationFrameId = requestAnimationFrame(animate);
}

function startAnimation() {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  lastTimestamp = 0;
  animationFrameId = requestAnimationFrame(animate);
}

/********************************************
 *        ENTRY POINT / EVENT HOOKS         *
 ********************************************/

function updateWord() {
  const inp = document.getElementById("userInput");
  const word = (inp.value || "").toUpperCase().replace(/[^A-Z]/g, "");
  generateAsciiArray(word);
  renderAscii();
  startAnimation();
}

document.getElementById("updateButton").addEventListener("click", updateWord);
window.addEventListener("DOMContentLoaded", updateWord);