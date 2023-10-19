/**
 * @typedef {{
 *  name?: string,
 *  templates: number[][][],
 *  symbols: Object.<number, string>,
 *  order: string,
 *  clearBack: boolean,
 *  repeat: number,
 *  direction: string,
 *  move: boolean,
 *  stay: boolean,
 *  x: number,
 *  y: number,
 *  fps: number,
 *  distanceToHide?: number,
 *  distanceToAppear?: number,
 *  startIndex?: number,
 *  _id: string
 * }} AnimationOptions 
 */

const ConsoleTyper = require('../helpers/console-typer');
const Coordinates = require('./coordinates');
const GameObject = require('./game-object');
const { string } = require('../helpers/random');

class Animation extends GameObject {
  /** @param {number[][]} template */
  static createHorizontalTemplate(template) {
    const result = [];
    const count = template[0].length;
    const rows = template.length;

    for (let i = 0; i < count; i++) {
      result[i] = [];
      for (let j = 0; j < rows; j++) {
        result[i].push([...template[j]]);
        template[j].push(template[j].shift());
      }
    }

    return result;
  }

  /** @param {number[][]} template */
  static createVerticalTemplate(template) {
    const result = [];
    const count = template.length;

    for (let i = 0; i < count; i++) {
      result[i] = [];
      for (let j = 0; j < count; j++) {
        result[i].push([...template[j]]);
      }
      template.push(template.shift());
    }

    return result;
  }

  /** @param {AnimationOptions} userOptions */
  constructor(userOptions = {}) {
    /** @private  @type {AnimationOptions} */
    let options = {
      name: 'default',
      templates: [],
      symbols: {},
      order: 'forward',
      direction: '',
      clearBack: true,
      stay: false,
      repeat: 1,
      x: 0,
      y: 0,
      fps: 10,
      distanceToHide: null,
      distanceToAppear: null,
      startIndex: 0,
      _id: string(8)
    };
    Object.assign(options, userOptions);
    super(options.x, options.y, options.direction, options.fps);

    /** @private */
    this._start;
    /** @private */
    this._end;

    this.options = options;

    /** @readonly */
    this.distanceMoved = 0;

    /** @private */
    this._destroyed = false;

    /** @private */
    this._currentTemplateIndex = this.options.startIndex;

    this.timer.onUpdate(() => {
      if (!this.started() || this.destroyed()) return;
      if (this.isMoving()) this.move();
      // if (this.options.stay) this.clear();

      const length = this.length();
      const template = this.nextTemplate();

      ConsoleTyper.logTo(this.coords.x - 1, this.coords.y - 1, '%');

      for (let i of this.renderIndexes()) {
        for (const y in template) {
          ConsoleTyper.logTo(70, 0, 'distanceMoved:    ', this.distanceMoved);
          ConsoleTyper.logTo(70, 1, 'distanceToAppear: ', this.options.distanceToAppear);
          ConsoleTyper.logTo(70, 2, 'distanceToHide:   ', this.options.distanceToHide);
          ConsoleTyper.logTo(70, 3, 'length:           ', length);
          ConsoleTyper.logTo(70, 4, 'repeat:           ', this.options.repeat);
          ConsoleTyper.logTo(70, 5, 'direction:        ', this.direction());
          ConsoleTyper.logTo(70, 6, 'coords:           ', this.coords.x, ', ', this.coords.y);

          for (const x in template[y]) {
            if (!this.partCoordShouldRender(Number(i), Number(x), Number(y))) continue;

            const coord = this.physicalCoordinate(Number(i), Number(x), Number(y));
            this.clearCoordIfNeeds(Number(i), Number(x), Number(y));
            ConsoleTyper.cursorToCoord(coord);
            ConsoleTyper.writeSymbol(this.options.symbols[template[y][x]]);
          }
        }
      }

      if (this.fullyHided()) {
        // if (this.options.stay) this.clearBack();
        this.stop();
        this.destroy();
        return;
      }

      if (this.needToClearBack()) this.clearBack();
      ConsoleTyper.cursorTo(0, 0);
    });
  }

  renderIndexes() {
    this._start = this.options.stay ? this.partIndexToAppear() : this.partIndexToHide();
    this._end = this.options.stay ? this.partIndexToHide() : this.partIndexToAppear();
    const target = this;
    return {
      [Symbol.iterator]() {return this;},
      next() {
        if (target._start <= target._end) {
          return { value: target._start++, done: false };
        } else return { done: true };
      }
    };
  }

  /** @private */
  nextTemplate() {
    if (this.options.order === 'forward') {
      this._currentTemplateIndex = (this._currentTemplateIndex + 1) % this.options.templates.length;
    }
    else if (this.options.order === 'back') {
      this._currentTemplateIndex--;
      if (this._currentTemplateIndex < 0) this._currentTemplateIndex = this.options.templates.length - 1;
    }

    return this.options.templates[this._currentTemplateIndex];
  }

  /** @private */
  previousTemplate() {
    let previousTemplateIndex = this._currentTemplateIndex;
    if (this.options.order === 'forward') {
      previousTemplateIndex--;
      if (previousTemplateIndex < 0) previousTemplateIndex = this.options.templates.length - 1;
    }
    else if (this.options.order === 'back') {
      previousTemplateIndex = (this._currentTemplateIndex + 1) % this.options.templates.length;
    }

    return this.options.templates[previousTemplateIndex];
  }

  /** @private */
  currentTemplate() {
    return this.options.templates[this._currentTemplateIndex];
  }

  currentTemplateIndex() {
    return this._currentTemplateIndex;
  }

  /** @private */
  move() {
    if (!this.directionIs('static')) super.move();
    this.distanceMoved++;
  }

  /** @param {'horizontal' | 'vertical' | 'static'} type */
  directionIs(type) {
    if (type === 'static') {
      return Boolean(this.options.stay);
    } else {
      return super.directionIs(type);
    }
  }

  length() {
    return this.directionIs('horizontal')
      ? this.options.templates[0][0].length
      : this.options.templates[0].length;
  }

  trueLength() {
    return this.length() * this.options.repeat;
  }

  clearBack() {
    const previousTemplate = this.previousTemplate();
    const clearSymbol = '+';
    const length = this.length();

    if      (this.direction() === 'top') {
      let y = this.coords.y + this.options.templates[0].length * this.options.repeat;
      let offset = 0;
      
      if (this.options.distanceToHide !== null && this.options.stay) {
        offset = this.distanceMoved - this.options.distanceToHide;
        if (offset <= 0) return;
        y -= offset;
        offset--;
      }

      for (let i = 0; i < this.options.templates[0][0].length; i++) {
        const x = this.coords.x + i;
        if (!previousTemplate[previousTemplate.length - 1 - offset % length][i]) continue;
        if (!ConsoleTyper.isReachable(x, y)) continue;
        ConsoleTyper.cursorTo(x, y);
        ConsoleTyper.writeSymbol(clearSymbol);
      }
    } else if (this.direction() === 'bot') {
      let y = this.coords.y - this.options.repeat * length;
      let offset = 0;
      
      if (this.options.distanceToHide !== null && this.options.stay) {
        offset = this.distanceMoved - this.options.distanceToHide;
        if (offset <= 0) return;
        y += offset;
        offset--;
      }

      for (let i = 0; i < this.options.templates[0][0].length; i++) {
        const x = this.coords.x + i;
        if (!previousTemplate[offset % length][i]) continue;
        if (!ConsoleTyper.isReachable(x, y)) continue;
        ConsoleTyper.cursorTo(x, y);
        ConsoleTyper.writeSymbol(clearSymbol);
      }
    } else if (this.direction() === 'right') {
      let x = this.coords.x - this.options.repeat * length;
      let offset = 0;

      if (this.options.distanceToHide !== null && this.options.stay) {
        offset = this.distanceMoved - this.options.distanceToHide;
        if (offset <= 0) return;
        x += offset;
        offset--;
      }

      for (let i = 0; i < this.options.templates[0].length; i++) {
        const y = this.coords.y + i;
        if (!previousTemplate[i][offset % length]) continue;
        if (!ConsoleTyper.isReachable(x, y)) continue;
        ConsoleTyper.cursorTo(x, y);
        ConsoleTyper.writeSymbol(clearSymbol);
      }
    } else if (this.direction() === 'left') {
      let x = this.coords.x + this.options.templates[0][0].length * this.options.repeat;
      let offset = 0;
        
      if (this.options.distanceToHide !== null && this.options.stay) {
        offset = this.distanceMoved - this.options.distanceToHide;
        if (offset <= 0) return;
        x -= offset;
        offset--;
      }

      for (let i = 0; i < this.options.templates[0].length; i++) {
        let y = this.coords.y + i;
        if (!previousTemplate[i][previousTemplate[i].length - 1 - offset % length]) continue;
        if (!ConsoleTyper.isReachable(x, y)) continue;
        ConsoleTyper.cursorTo(x, y);
        ConsoleTyper.writeSymbol(clearSymbol);
      }
    }
  }

  clearCoordIfNeeds(index, x, y) {
    const previousTemplate = this.options.stay ? this.previousTemplate() : this.currentTemplate();
    const physicalCoord = this.physicalCoordinate(index, x, y);
    if (previousTemplate[y][x]) ConsoleTyper.logToCoord(physicalCoord, ' ');
  }

  clear() {
    const currentTemplate = this.currentTemplate();
    const clearSymbol = ' ';

    for (const i of this.renderIndexes()) {
      for (const y in currentTemplate) {
        for (const x in currentTemplate[y]) {
          if (!currentTemplate[y][x]) continue;
          ConsoleTyper.cursorToCoord(this.physicalCoordinate(i, Number(x), Number(y)));
          ConsoleTyper.writeSymbol(clearSymbol);
        }
      }
    }
  }

  start() {
    if (!this.destroyed()) this.timer.start();;
    return this;
  }

  stop() {
    this.timer.stop();
  }

  started() {
    return this.timer.started();
  }

  destroy() {
    this._destroyed = true;
    this.emit('destroy', this.options._id);
  }

  destroyed() {
    return this._destroyed;
  }

  inc() {
    this.options.repeat++;
  }

  dec() {
    this.options.repeat--;
    if (this.options.repeat <= 0) this.options.repeat = 1;
  }

  setOrder(order) {
    if (!['forward', 'back'].includes(order)) throw new Error(`unknown order => ${order}`);
    this.options.order = order;
  }

  setMove(val) {
    this.options.move = Boolean(val);
  }

  isMoving() {
    return this.options.move;
  }

  setClearBack(value) {
    this.options.clearBack = Boolean(value);
  }

  getClearBack() {
    return this.options.clearBack;
  }

  isAppearing() {
    return Boolean(
      this.distanceMoved - this.options.distanceToAppear > 0 &&
      this.distanceMoved - this.options.distanceToAppear < this.options.repeat * this.length()
    );
  }

  fullyAppeared() {
    return Boolean(
      this.options.distanceToAppear !== null &&
      this.distanceMoved - this.options.distanceToAppear >= this.options.repeat * this.length()
    )
  }

  isHiding() {
    return Boolean(
      this.distanceMoved - this.options.distanceToHide > 0 &&
      this.distanceMoved - this.options.distanceToHide < this.options.repeat * this.length()
    );
  }

  fullyHided() {
    return Boolean(
      this.options.distanceToHide !== null &&
      this.distanceMoved - this.options.distanceToHide > this.options.repeat * this.length()
    );
  }

  physicalCoordinate(index, x, y) {
    const length = this.length();
    return new Coordinates(
      this.coords.x + (this.direction() === 'right' ? -(index + 1) * length + 1 : (this.direction() === 'left' ? index * length : 0)) + x,
      this.coords.y + (this.direction() === 'bot'   ? -(index + 1) * length + 1 : (this.direction() === 'top'  ? index * length : 0)) + y
    );
  }

  partShouldRender(index) {
    if (this.options.distanceToHide === null && this.options.distanceToAppear === null) return true;

    return Boolean(!this.partShouldHide(index) && !this.partShouldNotAppear(index));
  }

  partCoordShouldRender(index, x, y) {
    if (!this.partShouldRender(index)) return false;

    const pCoords = this.physicalCoordinate(index, x, y);
    if (!ConsoleTyper.isReachableCoord(pCoords)) return false;

    const length = this.length();
    let shouldRender = true;

    if (!this.options.stay) {
      if (shouldRender && this.options.distanceToAppear !== null && this.partIndexToAppear() === index) {
        if ((
          this.direction() === 'right' &&
          this.distanceMoved - this.options.distanceToAppear - index * length < length - x
        ) || (
          this.direction() === 'left' &&
          this.distanceMoved - this.options.distanceToAppear - index * length <= x
        ) || (
          this.direction() === 'bot' &&
          this.distanceMoved - this.options.distanceToAppear - index * length < length - y
        ) || (
          this.direction() === 'top' &&
          this.distanceMoved - this.options.distanceToAppear - index * length <= y
        )) shouldRender = false;
      }
      if (shouldRender && this.options.distanceToHide !== null && this.partIndexToHide() === index) {
        if ((
          this.direction() === 'right' &&
          this.distanceMoved - this.options.distanceToHide - index * length >= length - x
        ) || (
          this.direction() === 'left' &&
          this.distanceMoved - this.options.distanceToHide - index * length > x
        ) || (
          this.direction() === 'bot' &&
          this.distanceMoved - this.options.distanceToHide - index * length >= length - y
        ) || (
          this.direction() === 'top' &&
          this.distanceMoved - this.options.distanceToHide - index * length > y
        )) shouldRender = false;
      }
    } else {
      if (shouldRender && this.options.distanceToAppear !== null && this.partIndexToAppear() === index) {
        if ((
          this.direction() === 'right' &&
          this.distanceMoved - this.options.distanceToAppear <= (this.options.repeat - index - 1) * length + x
        ) || (
          this.direction() === 'left' &&
          this.distanceMoved - this.options.distanceToAppear < (this.options.repeat - index) * length - x
        ) || (
          this.direction() === 'bot' &&
          this.distanceMoved - this.options.distanceToAppear <= (this.options.repeat - index - 1) * length + y
        ) || (
          this.direction() === 'top' &&
          this.distanceMoved - this.options.distanceToAppear < (this.options.repeat - index) * length - y
        )) shouldRender = false;
      }
      if (shouldRender && this.options.distanceToHide !== null && this.partIndexToHide() === index) {
        if ((
          this.direction() === 'right' &&
          this.distanceMoved - this.options.distanceToHide > (this.options.repeat - index - 1) * length + x
        ) || (
          this.direction() === 'left' &&
          this.distanceMoved - this.options.distanceToHide >= (this.options.repeat - index) * length - x
        ) || (
          this.direction() === 'bot' &&
          this.distanceMoved - this.options.distanceToHide > (this.options.repeat - index - 1) * length + y
        ) || (
          this.direction() === 'top' &&
          this.distanceMoved - this.options.distanceToHide >= (this.options.repeat - index) * length - y
        )) shouldRender = false;
      }
    }

    return shouldRender;
  }

  partShouldHide(index) {
    const length = this.length();
    if (!this.options.stay) {
      return (this.options.distanceToHide !== null && this.distanceMoved - this.options.distanceToHide >= length * (index + 1));
    } else {
      index = this.options.repeat - index - 1;
      return (this.options.distanceToHide !== null && this.distanceMoved - this.options.distanceToHide >= length * (index + 1));
    }
  }

  partShouldNotAppear(index) {
    const length = this.length();
    if (!this.options.stay) {
      return (this.options.distanceToAppear !== null && this.distanceMoved - this.options.distanceToAppear <= length * (index));
    } else {
      index = this.options.repeat - index - 1;
      return (this.options.distanceToAppear !== null && this.distanceMoved - this.options.distanceToAppear <= length * (index));
    }
  }

  partIndexToHide() {
    if (this.options.distanceToHide === null) return this.options.stay ? this.options.repeat - 1 : 0;

    const length = this.length();
    const index = Math.ceil((this.distanceMoved - this.options.distanceToHide) / length) - 1;
    
    if (!this.options.stay) {
      return index < 0 ? 0 : Math.min(index, this.options.repeat - 1);
    } else {
      return this.options.repeat - (index < 0 ? 0 : Math.min(index, this.options.repeat - 1)) - 1;
    }
  }

  partIndexToAppear() {
    if (this.options.distanceToAppear === null) return this.options.stay ? 0 : this.options.repeat - 1;
    
    const length = this.length();
    const index = Math.ceil((this.distanceMoved - this.options.distanceToAppear) / length) - 1;

    if (!this.options.stay) {
      return index < 0 ? -1 : Math.min(index, this.options.repeat - 1);
    } else {
      return this.options.repeat - (index < 0 ? -1 : Math.min(index, this.options.repeat - 1)) - 1;
    }
  }

  needToClearBack() {
    const trueLength = this.trueLength();
    ConsoleTyper.logTo(70, 8, (
      this.options.distanceToHide === null ||
      this.distanceMoved - this.options.distanceToHide - trueLength <= 0
    ));
    return Boolean(
      // !this.options.stay && 
      this.isMoving() && 
      this.getClearBack() && (
        this.options.distanceToHide === null ||
        this.distanceMoved - this.options.distanceToHide - trueLength <= 0
      ) && (
        this.options.distanceToAppear === null ||
        this.distanceMoved - this.options.distanceToAppear - (trueLength - Number(Boolean(this.options.stay)) * (this.distanceMoved + this.options.distanceToHide)) > 0
      )
    );
  }

  startHiding(offset = 0) {
    this.options.distanceToHide = this.distanceMoved - offset;
  }
};

module.exports = Animation;
