const Readline = require('readline');
const ArrayMap = require('../helpers/array-map');

const Gameboard = require('./gameboard');
const Snake = require('./gameboard-elements/snake');

const Wall = require('./gameboard-elements/wall');
const Food = require('./gameboard-elements/food');
const RenderSymbol = require('./render-symbol');
const { int } = require('../helpers/random');


module.exports = class Game {
  constructor(width, height) {
    this.gameboard = new Gameboard(width, height);
    this.snake = new Snake(parseInt(this.gameboard.width() / 2), parseInt(this.gameboard.height() / 2), this.gameboard);
    this.food = new Food(1, 1, this.gameboard);
    
    /** @type {ArrayMap<Wall>} */
    this.walls = new ArrayMap(e => e.coords.x + '_' + e.coords.y);
  }

  init() {
    this.generateWalls();
    this.initFood();
    this.initSnake();
    this.initController();
  }

  start() {
    this.snake.start(5);
    this.snake.eat(5);
    // this.snake.moveX(10);
    // this.snake.moveY(5);
    this.food.start(30);
    this.food.respawn();

    setTimeout((function f() {
      if (this.snake.timer.shouldUpdate()) {
        this.snake.update();
      }

      if (this.food.timer.shouldUpdate()) {
        this.food.update();
      }

      setTimeout(f.bind(this));
    }).bind(this));
  }

  generateWalls() {
    console.clear();

    for (let y = 0; y < this.gameboard.height(); y++) {
      if (y === 0 || y == this.gameboard.height() - 1) {
        for (let x = 1; x < this.gameboard.width() - 1; x++) {
          const wall = new Wall(x, y, this.gameboard);
          this.walls.push(wall);
          wall.render();
        }
      }
    
      let wall = new Wall(0, y, this.gameboard);
      this.walls.push(wall);
      wall.render();
    
      wall = new Wall(this.gameboard.width() - 1, y, this.gameboard);
      this.walls.push(wall);
      wall.render();
    }
  }

  initFood() {
    // this.food.start(1);
    // this.food.on('update', () => {
    //   this.food.render();
    // });
  }

  initSnake() {    
    this.snake.on('move', (coords) => {
      if        (this.walls.has(new RenderSymbol('#', coords))) {
        // this.snake.stop();
        // if        (this.snake._direction === 'left') {
        //   this.snake.moveX(2);
        // } else if (this.snake._direction === 'right') {
        //   this.snake.moveX(-2);
        // } else if (this.snake._direction === 'top') {
        //   this.snake.moveY(2);
        // } else {
        //   this.snake.moveY(-2);
        // }

        // this.snake.changeDirection(
        //   this.snake._direction === 'left' || this.snake._direction === 'right'
        //     ? ['top', 'bot'][int(0, 1)]
        //     : ['left', 'right'][int(0, 1)]
        // );
      } else if (this.snake.coords.equals(this.food.coords)) {
        this.snake.eat();
      }
    });

    this.snake.on('eat', () => {
      this.food.respawn();
    });

    this.snake.on('stop', () => {
      this.snake.render();
      console.log('GAME OVER!!!11111111!!1');
    });

    // this.snake.start(5);
    // this.snake.eat();
    // this.snake.eat();
  }

  initController() {
    Readline.emitKeypressEvents(process.stdin);

    if (process.stdin.isTTY) process.stdin.setRawMode(true);

    process.stdin.on('keypress', (chunk, key) => {
      Readline.moveCursor(process.stdout, -1);
      Readline.clearLine(process.stdout, 1);

      if      (key.name === 'w' || key.name === 'up') this.snake.changeDirection('top');
      else if (key.name === 'a' || key.name === 'left') this.snake.changeDirection('left');
      else if (key.name === 'd' || key.name === 'right') this.snake.changeDirection('right');
      else if (key.name === 's' || key.name === 'down') this.snake.changeDirection('bot');
      else if (key.name === 'p') console.log(this.snake);
      else if (key.sequence === '+') {
        this.snake.updateFps(this.snake.fps + 1);
      } else if (key.sequence === '-') {
        this.snake.updateFps(this.snake.fps - 1);
      }
    });
  }
}