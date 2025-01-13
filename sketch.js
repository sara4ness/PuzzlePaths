let columns = 3; let rows = 3;
let colSize = 100; let rowSize = 100; 

let rectX = 800;
let rectY = 100;

let pieceX = 100;
let pieceY = 100;

let pieceW = 100;
let pieceQ = 100;

function setup() {
  createCanvas(1400, 800);
  pieceX = random(100, 600);
  pieceY = random(100, 600);

  pieceW = random(100, 600);
  pieceQ = random(100, 600);
}

function draw() {
  background(0);
  
  // puzzle grid
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      stroke('red')
      strokeWeight(4);
      fill(255)
      rect(800 + i * colSize, 100 + j * rowSize, colSize, rowSize);
    }
  }

  // the square that marks the space of the grid
  fill(0);
  noStroke();
  rect(rectX, rectY, colSize, rowSize);

  //make sure the marking is staying within the grid
  if (rectX == 1100) {
    rectX = 800;
    rectY += rowSize;
  } 
  if (rectX == 700) {
    rectX = 1000;
    rectY -= rowSize;
  }
  if (rectY == 400) {
    rectY = 100;
    rectX = 800;
  }
  if (rectY == 0) {
    rectY = 300;
    rectX = 1000;
  }

  // making the puzzle pieces
  fill('green');
  rect(pieceX, pieceY, colSize, rowSize);

  // second puzzle piece
  fill('blue');
  rect(pieceW, pieceQ, colSize, rowSize);

}

function keyReleased () {
    if(keyCode == 50) {
      rectX += colSize;
    } else if(keyCode == 49) {
      rectX -= colSize;
    }

    if (keyCode == 65) {
      pieceX = rectX;
      pieceY = rectY;
    }
    if (keyCode == 83) {
      pieceW = rectX;
      pieceQ = rectY;
    }
}