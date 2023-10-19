/** @template T */
module.exports = class Stack {
  /** @param {number} size */
  constructor(size) {
    /** @private */
    this._maxSize = size;
    /** @private */
    this._currentSize = 0;
    /** @private @type {T[]} */
    this._arr = [];
    /** @private */
    this._index = -1;
  }

  /** @param {T} item */
  push(item) {
    // if (this.full()) throw new Error('Stack overflow');
    this._index = (this._index >= this._maxSize - 1) ? 0 : this._index + 1;
    this._currentSize++;
    this._arr[this._index] = item;
  }

  pop() {
    if (this.empty()) throw new Error('Stack empty');
    const item = this._arr[this._index];
    this._currentSize--;
    this._index = (this._index === 0) ? this._maxSize - 1 : this._index - 1;
    return item;
  }

  top() {
    return this._arr[this._index];
  }

  full() {
    return this._currentSize >= this._maxSize;
  }

  empty() {
    return this._currentSize === 0;
  }

  clear() {
    this._currentSize = 0;
    this._index = -1;
  }
};
