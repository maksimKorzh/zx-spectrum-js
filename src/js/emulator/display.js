// display constants
const SCREEN_WIDTH = 768;
const SCREEN_HEIGHT = 576; //528
const PIXEL_SIZE = 3;
const CHAR_OFFSET = PIXEL_SIZE * 8;
const SCREEN_COLS = 32;
const SCREEN_ROWS = 24;

// init canvas
const canvas = document.getElementById('tv');
canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;
const context = canvas.getContext('2d');
// 256 X 192  || 768x576 => 24x24 pixel

// FPS
var oldCycleTime = 0;
var cycleCount = 0;
var fps_rate = '...';

// draw pixel
function renderPixel(x, y, color) {
  context.fillStyle = color;
  context.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
}

function renderByte(address, lineOffset, byteOffset) {
  for (let bx = 0; bx < 8; bx++) {
    let bitValue = memory[address] & (1 << 7 - bx);
    renderPixel(bx * PIXEL_SIZE + byteOffset * CHAR_OFFSET, lineOffset * PIXEL_SIZE, bitValue ? 'Black' : 'White')
  }
}

// render line
function renderLine(line, lineOffset) {
  for (let byteOffset = 0; byteOffset < 32; byteOffset++) {
    let address = line * 32 + byteOffset + 0x4000
    //if (address > 0x57FF) console.log('addr overflow ' + address.toString(16))
    renderByte(address, lineOffset, byteOffset);
    //console.log(address.toString(16) + ' ' + memory[address].toString(16));
  }
}

function fillMemory() {
  for (let i = 0x4000; i <= 0x57FF; i++) memory[i] = 0xFF;
}

// draw screen
function renderScreen() {
  for (let area = 0; area < 17; area += 8) { console.log('next area ')
    let shiftLine = 0;
    for (let times = area; times < area + 8; times++) {
      for (let line = area; line < area + 8; line++) {
        let nextLine = times * 8 + line; console.log('next line: ' + nextLine + ' times: ' + times + ' line: ' + line + ' area: ' + area)
        let nextOffset = line * 8 + shiftLine;
        if (nextLine > 191) return; // 134
        renderLine(nextLine, nextOffset);
      } shiftLine++;
    }
  }
}
