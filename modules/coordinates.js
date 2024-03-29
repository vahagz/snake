module.exports = class Coordinates {
  /** @param {Coordinates} coords */
  static copy(coords) {
    return new Coordinates(coords.x, coords.y);
  }

  constructor(x = 0, y = 0) {
    /** @private */
    this._x = x;
    /** @private */
    this._y = y;
  }

  get x() {
    return this._x;
  }

  set x(x) {
    this._x = x;
  }

  get y() {
    return this._y;
  }

  set y(y) {
    this._y = y;
  }

  /** @param {Coordinates} coords */
  set(coords) {
    this.x = coords.x;
    this.y = coords.y;
  }

  /** @param {Coordinates} coords */
  equals(coords) {
    return Boolean(this.x == coords.x && this.y == coords.y);
  }
};
