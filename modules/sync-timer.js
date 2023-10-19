module.exports = class SyncTimer {
  /**
   * @param {number} fps 
   * @param {function (): any} updateHandler 
   */
  constructor(fps, updateHandler = function() {}) {
    /** @private */
    this._fps = fps;
    /** @private */
    this._lastUpdate = Date.now();
    /** @private */
    this._started = false;

    this._updateHandler = updateHandler;
  }

  /** @param {function (): any} updateHandler  */
  onUpdate(updateHandler) {
    this._updateHandler = updateHandler;
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
    fps = Number(fps);
    this._fps = fps > 0 ? fps : 1;
  }

  getFPS() {
    return this._fps;
  }

  start() {
    this._started = true;
    const startFunction = async () => {
      if (!this.started()) return;

      if (this.shouldUpdate()) {
        await this._updateHandler();
      }

      setTimeout(startFunction);
    };

    setTimeout(startFunction);
  }

  stop() {
    this._started = false;
  }

  started() {
    return this._started;
  }
};
