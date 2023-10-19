const Animation = require('./animation');
const ConsoleTyper = require('../helpers/console-typer');

module.exports = class AnimationsArray extends Array {
  /** @param  {...Animation} animations */
  add(...animations) {
    animations.map(anim => anim.on('destroy', (id) => {
      const index = this.findIndex((item => id == item.options._id));
      this.splice(index, 1);
    }));
    super.push(...animations);
  }

  /**
   * @param {number} i 
   * @returns {Animation}
   */
  get(i) {
    return this[i];
  }
};
