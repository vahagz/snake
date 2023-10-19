const Coordinates = require("./coordinates");
const SyncTimer = require("./sync-timer");
const { EventEmitter } = require('stream');

module.exports = class GameObject extends EventEmitter {
  constructor(x, y, direction = '', fps = 0, updateFunc = function update() {}) {
    super();
    this.coords = new Coordinates(x, y);
    this.setDirection(direction);
    this.timer = new SyncTimer(fps, updateFunc);
  }

  step(direction, stepCount = 1) {
    this.coords.move(direction, stepCount);
  }

  move(count = 1) {
    this.step(this.direction(), count);
  }

  stepForward(stepCount = 1) {
    this.move(stepCount);
  }

  stepBack(stepCount = 1) {
    this.step(this.oppositeDirection(), stepCount);
  }

  stepLeft(stepCount = 1) {
    this.step(this.leftDirection(), stepCount);
  }

  stepRight(stepCount = 1) {
    this.step(this.rightDirection(), stepCount);
  }

  turnBack() {
    this.setDirection(this.oppositeDirection());
  }

  turnLeft() {
    this.setDirection(this.leftDirection());
  }

  turnRight() {
    this.setDirection(this.rightDirection());
  }

  oppositeDirection() {
    return this.direction() === 'right' ? 'left'  :
      this.direction() === 'left'  ? 'right' :
      this.direction() === 'top'   ? 'bot'   : 'top';
  }

  leftDirection() {
    return this.direction() === 'right' ? 'top'  :
      this.direction() === 'left'  ? 'bot' :
      this.direction() === 'top'   ? 'left'   : 'right';
  }

  rightDirection() {
    return this.direction() === 'right' ? 'bot'  :
      this.direction() === 'left'  ? 'top' :
      this.direction() === 'top'   ? 'right'   : 'left';
  }

  /** @param {'horizontal' | 'vertical'} type */
  directionIs(type) {
    if (type === 'horizontal') {
      return Boolean(this.direction() === 'left' || this.direction() === 'right');
    } else if (type === 'vertical') {
      return Boolean(this.direction() === 'top' || this.direction() === 'bot');
    }

    throw new Error(`Unknown direction type => ${type}`);
  }

  /** @param {'right' | 'left' | 'top' | 'bot'} dir */
  setDirection(dir) {
    if (!['right', 'left', 'top', 'bot', ''].includes(dir)) throw new Error(`unknown direction => ${dir}`);
    this._direction = dir;
  }

  direction() {
    return this._direction;
  }

  setFPS(fps) {
    this.timer.fps(fps);
  }

  fps() {
    return this.timer.getFPS();
  }
};
