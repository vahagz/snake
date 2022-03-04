module.exports = class Timer {
  /**
   * @param {number} fps 
   */
  constructor(fps) {
    /** @private */
    this._fps = fps;
    /** @private */
    this._lastUpdate = Date.now();
  }

  shouldUpdate() {
    if (Boolean(Date.now() - this._lastUpdate > 1000 / this._fps)) {
      this._lastUpdate = Date.now();
      return true;
    }
    return false;
  }

  /** @param {number} fps */
  fps(fps) {
    fps = parseInt(fps);
    this._fps = fps > 0 ? fps : 1;
  }
};
