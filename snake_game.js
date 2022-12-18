// Copyright (C) December 2022 {Sunny Patel} <{sunnypatel124555@gmail.com}>

// This file is part of the {Snake Game} project.

// The {Snake Game} project can not be copied, distributed, and/or modified without the express
// permission of {Sunny Patel} <{sunnypatel124555@gmail.com}>.

// Set up the canvas element and the game board
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const boardSize = 20; // Number of cells in the game board
const cellSize = 20; // Size of each cell in pixels

// Create the snake and its starting position
const snake = [{x: 10, y: 10}];

// Set the initial direction of the snake
let direction = 'right';

// Set the initial position of the food
let food = {x: 15, y: 15};

// Function to draw the game board and all of its elements
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  ctx.fillStyle = 'green';
  snake.forEach(cell => {
    ctx.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
  });

  // Draw the food
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
}

// Function to move the snake
function move() {
  // Get the next position of the snake based on its current direction
  const nextPosition = {...snake[0]};
  switch (direction) {
    case 'up':
      nextPosition.y--;
      break;
    case 'down':
      nextPosition.y++;
      break;
    case 'left':
      nextPosition.x--;
      break;
    case 'right':
      nextPosition.x++;
      break;
  }

  // Check if the snake has hit a wall or itself
  if (nextPosition.x < 0 || nextPosition.x >= boardSize || nextPosition.y < 0 || nextPosition.y >= boardSize || snake.some(cell => cell.x === nextPosition.x && cell.y === nextPosition.y)) {
    // Game over
    alert('Game over!');
    // Restart the game
    snake.length = 0;
    snake.push({x: 10, y: 10});
    direction = 'right';
    food = {x: 15, y: 15};
    return;
  }

  // Add the next position to the beginning of the snake
  snake.unshift(nextPosition);

  // Check if the snake has eaten the food
  if (nextPosition.x === food.x && nextPosition.y === food.y) {
    // Generate a new piece of food
    food = {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize)
    };
    // Add a new block to the end of the snake
    snake.push({...snake[snake.length - 1]});
  }
}

// Set the game to run at a fixed interval
setInterval(() => {
  move();
  draw();
}, 200);

// Set up event listeners to handle arrow key presses
document.addEventListener('keydown', event => {
    switch (event.key) {
      case 'ArrowUp':
        if (direction !== 'down') direction = 'up';
        break;
      case 'ArrowDown':
        if (direction !== 'up') direction = 'down';
        break;
      case 'ArrowLeft':
        if (direction !== 'right') direction = 'left';
        break;
      case 'ArrowRight':
        if (direction !== 'left') direction = 'right';
        break;
    }
  });
  