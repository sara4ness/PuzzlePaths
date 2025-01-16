let pieces = [];

let columns = 3; let rows = 3;
let colSize = 100; let rowSize = 100; 

let rectX = 800;
let rectY = 100;

//Arduino connection variables
let port; 
let connectBtn;
let myVal = 0;

let solvedBtn;
let input;
let msg;

let myCanvas, savedImg;

let mazes = [];

//load images
function preload() {
for (let i = 0; i < 9; i++) {
  mazes[i] = loadImage('assets/maze-0' + i + '.png');
}
}


function setup() {
  myCanvas = createCanvas(1120, 600);

  //Connect button for Arduino
  port = createSerial();

  connectBtn = createButton('Connect to Arduino');
  connectBtn.size(80, 20);
  connectBtn.position(20, height - 40);
  connectBtn.mousePressed(connectBtnClick);

  //create button for when solved
  solvedBtn = createButton('Finished!');
  solvedBtn.size(80, 20)
  solvedBtn.position(width - 100, height - 40);
  solvedBtn.mousePressed(solvedBtnClick);

  //name field for saving
  input = createInput('Name');
  input.position(800,height - 40 )

  //making puzzzle pieces and giving them random positions
for (let i = 0; i < 9; i++) {
    pieces[i] = new Piece();
    pieces[i].maze = i;
    pieces[i].x = random(50, 400);
    pieces[i].y = random(50, 400);
    // pieces[i].r = random(255);
    // pieces[i].g = random(255);
    // pieces[i].b = random(255);
}
}

function draw() {
  background(0);

   // puzzle grid
   for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      stroke(255)
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

  //arduino connection
  let val = port.readUntil("\n"); //read each line
  if (val.length > 0) {
    myVal = val; // Update with new value
    print(myVal); //see if value is coming through

    for(let pieceX = 0; pieceX < pieces.length; pieceX++) {
      if (myVal == pieceX) {
        pieces[pieceX].x = rectX;
        pieces[pieceX].y = rectY;
      } else if (myVal == 9) {
        pieces[pieceX].x = random(50, 400);
        pieces[pieceX].y = random(50, 400);
      }
    }

    // cursor moving
    if(myVal == 10) {
      rectX += colSize;
    } else if(myVal == 11) {
      rectX -= colSize;
    }
  }  

}

class Piece {
  constructor( ) {
    this.x = 200;
    this.y = 150;
    this.maze = 0;
    // this.r = 220;
    // this.g = 220;
    // this.b = 220;
  }
  show() {
    // stroke(this.r, this.g, this.b);
    // // strokeWeight(2);
    // noStroke();
    // fill(this.r, this.g, this.b);
    // rect(this.x, this.y, 100, 100);
    image(mazes[this.maze], this.x, this.y, 100, 100);
  }
}

function connectBtnClick() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
  } else {
    port.close();
  }
}

function solvedBtnClick() {
  let msg = input.value();
  savedImg = myCanvas.get(780, 80, 340, 340);
  savedImg.save(msg, 'png');
}