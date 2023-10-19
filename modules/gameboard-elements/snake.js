const Readline = require('readline');
const GameboardElement = require('./gameboard-element');
const Coordinates = require('../coordinates');
const Gameboard = require('../gameboard');
const RenderSymbol = require('../render-symbol');

const { int } = require('../../helpers/random');

const symbols = {
  head: {
    top: '^',
    bot: 'v',
    right: '>',
    left: '<',
  },
  tailX: {
    index: 0,
    arr: ['_', '—', '—', '¯', '¯', '—', '—', '_']
  },
  tailY: {
    index: 0,
    arr: ['(', ')']
  }
}

module.exports = class Snake extends GameboardElement {
  /**
   * @private
   * @param {string} currenctDir 
   * @param {string} nextDir 
   */
  static checkDir(currenctDir, nextDir) {
    return Boolean(
      (nextDir === 'top' && currenctDir === 'bot') ||
      (nextDir === 'right' && currenctDir === 'left') ||
      (nextDir === 'left' && currenctDir === 'right') ||
      (nextDir === 'bot' && currenctDir === 'top')
    );
  }

  /**
   * @param {number} x 
   * @param {number} y 
   * @param {Gameboard} gameboard 
   */
  constructor(x, y, gameboard) {
    super(x, y, gameboard);

    /** @private @type {'top' | 'bot' | 'left' | 'right'} */
    this._direction = 'right';
    /** @private @type {'top' | 'bot' | 'left' | 'right' | null} */
    this._nextDirection = this._direction;
    /** @private */
    this._movedAfterDirChange = false;

    /** @private */
    this._parts.assign([new RenderSymbol(this.headSymbol(), this.coordinates)]);

    /** @private */
    this._ate = 0;
  }

  render() {
    super.render();
    Readline.clearLine(process.stdout, 1);
    console.log('\n', 
      'fps:', this.fps, '\n',
      'score:', this._parts.length, '\n',
      'direction:', this._direction, '\n',
      'next direction:', this._nextDirection, '\n',
      'moved:', this._movedAfterDirChange, '\n'
    );
  }

  update() {
    if (!this.started()) return;

    this.move();
    this.render();

    this.emit('update');
  }

  /** @param {'top' | 'bot' | 'left' | 'right'} dir */
  changeDirection(dir) {
    if (!['top', 'bot', 'left', 'right'].includes(dir)) throw new Error('Unknown direction => ' + dir);

    if (!this._movedAfterDirChange) {
      this._nextDirection = dir;
      return;
    }

    if (Snake.checkDir(this._direction, this._nextDirection)) return;

    if (this._nextDirection !== this._direction)
    if (this._nextDirection === 'top' || this._nextDirection === 'bot') {
      this.updateFps(this.fps / 2);
    } else {
      this.updateFps(this.fps * 2);
    }

    this._direction = this._nextDirection;
    this._nextDirection = null;

    this.emit('direction_change');
  }

  /** @param {Coordinates} coords */
  isSnakePart(coords) {
    const part = this._parts.get(new RenderSymbol('*', coords));
    return Boolean(part && !part.disabled);
  }



  /** @private */
  headSymbol() {
    return symbols.head[this._direction];
  }

  /** @private */
  tailSymbol() {
    let tail;
    if (this._direction === 'left' || this._direction === 'right') {
      tail = symbols.tailX;
    } else {
      tail = symbols.tailY;
    }

    tail.index = (tail.index === tail.arr.length - 1) ? 0 : tail.index + 1;
    return tail.arr[tail.index];
  }

  /** @private @param {Coordinates} coords */
  nextHeadCoords() {
    const coords = new Coordinates(
      (this._direction === 'left'  ? this.coordinates.x - 1 : this._direction === 'right' ? this.coordinates.x + 1 : this.coordinates.x),
      (this._direction === 'top'   ? this.coordinates.y - 1 : this._direction === 'bot'   ? this.coordinates.y + 1 : this.coordinates.y)
    );

    if (this._nextDirection) {
      this._movedAfterDirChange = true;
      this.changeDirection(this._nextDirection);
      this._movedAfterDirChange = false;
    }

    return coords;
  }

  /** @private */
  move() {
    if (!this.started()) return;
    if (this._ate && this._ate--) {
      this.emit('eat');
    } else {
      this._parts[0].disable();
    }

    const newHeadCoords = this.nextHeadCoords();
    const isSnakePart = this.isSnakePart(newHeadCoords);

    this.coordinates.set(newHeadCoords);
    this._parts.top().symbol = this.tailSymbol();
    this._parts.push(new RenderSymbol(this.headSymbol(), newHeadCoords));

    if (isSnakePart) {
      // this.stop();
      // this.emit('stop');
    }
    this.emit('move', newHeadCoords);
  }

  /** @param {number} n */
  moveX(n) {
    const length = this._parts.length;
    this.coords.x += n;
    for (let i = 0; i < length; i++) {
      const part = this._parts[i];
      part.disable();
      part.coords.x += n;
      this._parts.push(new RenderSymbol(part.symbol, Coordinates.copy(part.coords)));
    }
  }

  /** @param {number} n */
  moveY(n) {
    const length = this._parts.length;
    this.coords.y += n;
    for (let i = 0; i < length; i++) {
      const part = this._parts[i];
      part.disable();
      part.coords.y += n;
      this._parts.push(new RenderSymbol(part.symbol, Coordinates.copy(part.coords)));
    }
  }

  eat(n = 0) {
    this._ate += Number(n === 0 ? 1 : n);
  }
};
