let pieces = [];

let columns = 3; let rows = 3;
let colSize = 100; let rowSize = 100; 

let rectX = 800;
let rectY = 100;

function setup() {
  createCanvas(1400, 800);

  //making puzzzle pieces and giving them random positions
for (let i = 0; i < 9; i++) {
    pieces[i] = new Piece();
    pieces[i].x = random(100, 600);
    pieces[i].y = random(100, 600);
    pieces[i].r = random(255);
    pieces[i].g = random(255);
    pieces[i].b = random(255);
}
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

  //displaying puzzle pieces
  for(let i = 0; i < pieces.length; i++) {
    pieces[i].show();
  }
}

class Piece {
  constructor() {
    this.x = 200;
    this.y = 150;
    this.r = 220;
    this.g = 220;
    this.b = 220;
  }
  show() {
    // stroke(this.r, this.g, this.b);
    // strokeWeight(2);
    noStroke();
    fill(this.r, this.g, this.b);
    rect(this.x, this.y, 100, 100);
  }
}

function keyReleased () {
  if(keyCode == 50) {
    rectX += colSize;
  } else if(keyCode == 49) {
    rectX -= colSize;
  }

  if (keyCode == 65) {
    pieces[1].x = rectX;
    pieces[1].y = rectY;
  }
  if (keyCode == 83) {
    pieces[2].x = rectX;
    pieces[2].y = rectY;
  }
  if (keyCode == 68) {
    pieces[3].x = rectX;
    pieces[3].y = rectY;
  }
  if (keyCode == 70) {
    pieces[4].x = rectX;
    pieces[4].y = rectY;
  }
  if (keyCode == 71) {
    pieces[5].x = rectX;
    pieces[5].y = rectY;
  }
  if (keyCode == 72) {
    pieces[6].x = rectX;
    pieces[6].y = rectY;
  }
  if (keyCode == 74) {
    pieces[7].x = rectX;
    pieces[7].y = rectY;
  }
  if (keyCode == 75) {
    pieces[8].x = rectX;
    pieces[8].y = rectY;
  }
  if (keyCode == 76) {
    pieces[0].x = rectX;
    pieces[0].y = rectY;
  }
}