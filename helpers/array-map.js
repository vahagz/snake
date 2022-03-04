/**
 * @template T
 * @extends {Array<T>}
 */
module.exports = class ArrayMap extends Array {
  /** @param {(e: T) => string} indexGenerator */
  constructor(indexGenerator) {
    super();

    /** @private */
    this._indexGenerator = indexGenerator;
    /** @type {Map<string, T>} */
    this._cache = new Map();
  }

  /**
   * @param {Iterable<T>} coreArr
   */
  assign(iterable) {
    this._cache = new Map();
    this.length = 0;
    for (const i in iterable) {
      this.push(iterable[i]);
    }
  }

  /** @returns {T} */
  top() {
    return this[this.length - 1];
  }

  /** @param {T} e */
  push(e) {
    this._cache.set(this._indexGenerator(e), e);
    return super.push(e);
  }

  /** @param {T} e */
  has(e) {
    return this._cache.has(this._indexGenerator(e));
  }

  /** @param {string} key */
  hasKey(key) {
    return this._cache.has(key);
  }

  /** @returns {T} */
  get(e) {
    return this._cache.get(this._indexGenerator(e));
  }

  /** @param {number} i */
  delete(i) {
    const e = this[i];
    this._cache.delete(this._indexGenerator(e));
    this.splice(i, 1);
    return e;
  }
};
