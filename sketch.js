// Constants
const WIDTH = 800;
const HEIGHT = 600;
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 10;
const PADDLE_SPEED = 10;
const BRICK_ROWS = 4;
const BRICK_COLUMNS = 8;
const BRICK_WIDTH = WIDTH / BRICK_COLUMNS;
const BRICK_HEIGHT = 20;

// Variables
let paddleX;
let ballX;
let ballY;
let ballSpeedX;
let ballSpeedY;
let bricks;

function setup() {
  createCanvas(WIDTH, HEIGHT);

  paddleX = WIDTH / 2 - PADDLE_WIDTH / 2;
  ballX = WIDTH / 2;
  ballY = HEIGHT / 2;
  ballSpeedX = 5;
  ballSpeedY = -5;

  bricks = [];
  for (let row = 0; row < BRICK_ROWS; row++) {
    for (let col = 0; col < BRICK_COLUMNS; col++) {
      bricks.push(createBrick(col, row));
    }
  }
}

function draw() {
  background(0);

  // Move the paddle
  if (keyIsDown(LEFT_ARROW) && paddleX > 0) {
    paddleX -= PADDLE_SPEED;
  }
  if (keyIsDown(RIGHT_ARROW) && paddleX + PADDLE_WIDTH < WIDTH) {
    paddleX += PADDLE_SPEED;
  }

  // Move the ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Check collisions
  if (ballX + ballSpeedX < 0 || ballX + ballSpeedX > WIDTH) {
    ballSpeedX *= -1;
  }
  if (ballY + ballSpeedY < 0) {
    ballSpeedY *= -1;
  }
  if (ballY + ballSpeedY > HEIGHT) {
    // Reset the ball position
    ballX = WIDTH / 2;
    ballY = HEIGHT / 2;
    ballSpeedX = 5;
    ballSpeedY = -5;
  }

  // Check paddle collision
  if (
    ballY + ballSpeedY > HEIGHT - PADDLE_HEIGHT &&
    ballX + ballSpeedX > paddleX &&
    ballX + ballSpeedX < paddleX + PADDLE_WIDTH
  ) {
    ballSpeedY *= -1;
  }

  // Check brick collisions
  for (let i = bricks.length - 1; i >= 0; i--) {
    const brick = bricks[i];
    if (
      ballY - ballSpeedY < brick.y + BRICK_HEIGHT &&
      ballX + ballSpeedX > brick.x &&
      ballX + ballSpeedX < brick.x + BRICK_WIDTH
    ) {
      bricks.splice(i, 1);
      ballSpeedY *= -1;
    }
  }

  // Draw the paddle
  fill(255);
  rect(paddleX, HEIGHT - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);

  // Draw the ball
  fill(255);
  ellipse(ballX, ballY, 10);

  // Draw the bricks
  for (const brick of bricks) {
    fill(brick.color);
    rect(brick.x, brick.y, BRICK_WIDTH, BRICK_HEIGHT);
  }

  // Check game over
  if (bricks.length === 0) {
    fill(255);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("You Win!", WIDTH / 2, HEIGHT / 2);
  }
}

function createBrick(col, row) {
  const x = col * BRICK_WIDTH;
  const y = row * BRICK_HEIGHT + 50;
  const colors = ["#FF4136", "#FF851B", "#FFDC00", "#2ECC40", "#0074D9"];
  const color = colors[row % colors.length];
  return { x, y, color };
}

// Create an instance of p5.js
new p5();
