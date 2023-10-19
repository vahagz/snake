// const Readline = require('readline');
// const ArrayMap = require('../helpers/array-map');

// const Gameboard = require('./gameboard');
// const Snake = require('./gameboard-elements/snake');

// const Wall = require('./gameboard-elements/wall');
// const Food = require('./gameboard-elements/food');
// const RenderSymbol = require('./render-symbol');
// const { int } = require('../helpers/random');


// module.exports = class Game {
//   constructor(width, height) {
//     this.gameboard = new Gameboard(width, height);
//     this.snake = new Snake(parseInt(this.gameboard.width() / 2), parseInt(this.gameboard.height() / 2), this.gameboard);
//     this.food = new Food(1, 1, this.gameboard);
    
//     /** @type {ArrayMap<Wall>} */
//     this.walls = new ArrayMap(e => e.coords.x + '_' + e.coords.y);
//   }

//   init() {
//     this.generateWalls();
//     this.initFood();
//     this.initSnake();
//     this.initController();
//   }

//   start() {
//     this.snake.start(5);
//     this.snake.eat(5);
//     // this.snake.moveX(10);
//     // this.snake.moveY(5);
//     this.food.start(30);
//     this.food.respawn();

//     setTimeout((function f() {
//       if (this.snake.timer.shouldUpdate()) {
//         this.snake.update();
//       }

//       if (this.food.timer.shouldUpdate()) {
//         this.food.update();
//       }

//       setTimeout(f.bind(this));
//     }).bind(this));
//   }

//   generateWalls() {
//     console.clear();

//     for (let y = 0; y < this.gameboard.height(); y++) {
//       if (y === 0 || y == this.gameboard.height() - 1) {
//         for (let x = 1; x < this.gameboard.width() - 1; x++) {
//           const wall = new Wall(x, y, this.gameboard);
//           this.walls.push(wall);
//           wall.render();
//         }
//       }
    
//       let wall = new Wall(0, y, this.gameboard);
//       this.walls.push(wall);
//       wall.render();
    
//       wall = new Wall(this.gameboard.width() - 1, y, this.gameboard);
//       this.walls.push(wall);
//       wall.render();
//     }
//   }

//   initFood() {
//     // this.food.start(1);
//     // this.food.on('update', () => {
//     //   this.food.render();
//     // });
//   }

//   initSnake() {    
//     this.snake.on('move', (coords) => {
//       if        (this.walls.has(new RenderSymbol('#', coords))) {
//         // this.snake.stop();
//         // if        (this.snake._direction === 'left') {
//         //   this.snake.moveX(2);
//         // } else if (this.snake._direction === 'right') {
//         //   this.snake.moveX(-2);
//         // } else if (this.snake._direction === 'top') {
//         //   this.snake.moveY(2);
//         // } else {
//         //   this.snake.moveY(-2);
//         // }

//         // this.snake.changeDirection(
//         //   this.snake._direction === 'left' || this.snake._direction === 'right'
//         //     ? ['top', 'bot'][int(0, 1)]
//         //     : ['left', 'right'][int(0, 1)]
//         // );
//       } else if (this.snake.coords.equals(this.food.coords)) {
//         this.snake.eat();
//       }
//     });

//     this.snake.on('eat', () => {
//       this.food.respawn();
//     });

//     this.snake.on('stop', () => {
//       this.snake.render();
//       console.log('GAME OVER!!!11111111!!1');
//     });

//     // this.snake.start(5);
//     // this.snake.eat();
//     // this.snake.eat();
//   }

//   initController() {
//     Readline.emitKeypressEvents(process.stdin);

//     if (process.stdin.isTTY) process.stdin.setRawMode(true);

//     process.stdin.on('keypress', (chunk, key) => {
//       Readline.moveCursor(process.stdout, -1);
//       Readline.clearLine(process.stdout, 1);

//       if      (key.name === 'w' || key.name === 'up') this.snake.changeDirection('top');
//       else if (key.name === 'a' || key.name === 'left') this.snake.changeDirection('left');
//       else if (key.name === 'd' || key.name === 'right') this.snake.changeDirection('right');
//       else if (key.name === 's' || key.name === 'down') this.snake.changeDirection('bot');
//       else if (key.name === 'p') console.log(this.snake);
//       else if (key.sequence === '+') {
//         this.snake.updateFps(this.snake.fps + 1);
//       } else if (key.sequence === '-') {
//         this.snake.updateFps(this.snake.fps - 1);
//       }
//     });
//   }
// }


const ConsoleTyper = require('../helpers/console-typer');
const Readline = require('readline');
const Snake = require('./snake');
console.clear();


generateWall({
  startX: 101,
  startY: 5,
  width: 10,
  height: 10,
  symbol: '#'
});

generateWall({
  startX: 101,
  startY: 20,
  width: 10,
  height: 10,
  symbol: '#'
});

generateWall({
  startX: 101,
  startY: 35,
  width: 10,
  height: 10,
  symbol: '#'
});

generateWall({
  startX: 60,
  startY: 20,
  width: 20,
  height: 10,
  symbol: '#'
});

generateWall({
  startX: 70,
  startY: 19,
  width: 1,
  height: 1,
  symbol: '#'
});

generateWall({
  startX: 30,
  startY: 20,
  width: 10,
  height: 10,
  symbol: '#'
});

// generateWall({
//   startX: 0,
//   startY: 0,
//   width: 200,
//   height: 200,
//   symbol: '#'
// });

const snake = new Snake();
snake.start();


Readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (chunk, key) => {
  if      (key.sequence === '\x03') process.exit();
  else if (key.name === 'w') snake.changeDirection('top');
  else if (key.name === 'a') snake.changeDirection('left');
  else if (key.name === 'd') snake.changeDirection('right');
  else if (key.name === 's') snake.changeDirection('bot');
  else if (key.name === 'left') {
    snake.turnLeft();
    snake.animations.vertical.forEach(animation => animation.turnLeft());
    snake.animations.horizontal.forEach(animation => animation.turnLeft());
  }
  else if (key.name === 'right') {
    snake.turnRight();
    snake.animations.vertical.forEach(animation => animation.turnRight());
    snake.animations.horizontal.forEach(animation => animation.turnRight());
  }
  else if (key.name === 'down') {
    snake.turnBack();
    snake.animations.vertical.forEach(animation => animation.turnBack());
    snake.animations.horizontal.forEach(animation => animation.turnBack());
  }
  else if (key.name === 'p') console.clear();
  else if (key.name === 'i') snake.started() ? snake.stop() : snake.start();
  else if (key.name === 'k') {
    snake.animations.vertical[0].options.repeat++;
    snake.animations.horizontal[0].options.repeat++;
  }
  else if (key.name === 'l') {
    snake.animations.vertical[0].options.repeat--;
    snake.animations.horizontal[0].options.repeat--;
  }
  else if (key.name === 'j') {
    snake.stepForward(10);
    const animations = snake.directionIs('horizontal') ? snake.animations.horizontal : snake.animations.vertical;
    animations.forEach(animation => {
      animation.clear();
      animation.coords.set(snake.coords);
    });
  }
  else if (key.sequence === '+') snake.setFPS(snake.fps() + 1);  
  else if (key.sequence === '-') snake.setFPS(snake.fps() - 1);
});

function generateWall(customParams = {
  startX: 0,
  startY: 0,
  width: 1,
  height: 1,
  symbol: '#'
}) {
  const params = {
    startX: 0,
    startY: 0,
    width: 1,
    height: 1,
    symbol: '#'
  };
  Object.assign(params, customParams);

  for (let y = 0; y < params.height; y++) {
    ConsoleTyper.cursorTo(params.startX, params.startY + y);
    ConsoleTyper.writeSymbol(params.symbol.repeat(params.width));
  }
}