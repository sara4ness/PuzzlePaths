let pieces = [];

let columns = 3; let rows = 3;
let colSize = 100; let rowSize = 100; 

let pos = [[800, 100], [900, 100], [1000, 100], [800, 200], [900, 200], [1000, 200], [800, 300], [900, 300], [1000, 300]];
let cursor = 0;

//Arduino connection variables
let port; 
let connectBtn;
let myVal = 0;

//save button and name input
let solvedBtn;
let input;
let msg;

//saving canvas
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
  rect(pos[cursor][0], pos[cursor][1], colSize, rowSize);


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
        pieces[pieceX].x = pos[cursor][0];
        pieces[pieceX].y = pos[cursor][1];
      } else if (myVal == 9) {
        pieces[pieceX].x = random(50, 400);
        pieces[pieceX].y = random(50, 400);
      }
    }

    // cursor moving
        if(myVal == 10) {
          cursor++;
          if (cursor == 9) {
            cursor = 0;
          }
        } else if (myVal == 11) {
          cursor--;
          if (cursor < 0) {
            cursor = 8;
          }
        }
  }
}

class Piece {
  constructor( ) {
    this.x = 200;
    this.y = 150;
    this.maze = 0;
  }
  show() {
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