const Readline = require('readline');

function randomString(length) {
  let result             = '';
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/** @returns {Promise<void>} */
async function clearLines(count = 1) {
  async function clearLine() {
    return new Promise(async resolve => {
      Readline.clearLine(process.stdout, 0, resolve);
    });
  }

  await clearLine();
  while (count-- > 0) {
    await moveCursor(0, -1);
    await clearLine();
  }
}

/** @returns {Promise<void>} */
function moveCursor(x = 0, y = 0) {
  return new Promise(resolve => {
    Readline.moveCursor(process.stdout, x, y, resolve);
  });
}

/** 
 * @param {number} ms
 * @returns {Promise<void>} 
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * @param {() => Promise<void>} func 
 * @param {number} ms 
 * @returns {string}
 */
function setAsyncInterval(func, ms) {
  const id = randomString(8);
  if (!global.asyncIntervals) {
    global.asyncIntervals = {[id]: true};
  }

  async function start() {
    if (!global.asyncIntervals[id]) return;
    await sleep(ms);
    await func();
    start();
  }

  start();

  return id;
}

function clearAsyncInterval(id) {
  delete global.asyncIntervals[id];
}

/**
 * @param {number} secs 
 * @param {(secondsLeft: number) => Promise<string>} cb 
 * @returns {Promise<void>}
 */
function timer(secs, cb) {
  const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let moveLength = 0;

  const timelogger = async (sec) => {
    const writeMessage = await cb(sec);
    const linesCount = writeMessage.split('\n').length;

    // Readline.moveCursor(process.stdout, 0, -2);
    if (moveLength) await clearLines(linesCount);
    moveLength = writeMessage.length;

    // Readline.moveCursor(process.stdout, -moveLength, -1);
    rl.write('\n' + writeMessage);
    // rl.write('\n');
  }

  return new Promise(async resolve => {
    await timelogger(secs);
    const interval = setAsyncInterval(async () => {
      if (secs > 1) return timelogger(--secs);

      await timelogger(--secs);
      clearAsyncInterval(interval);
      rl.write('\n');
      rl.close();
      return resolve();
    }, 1000);
  });
}

module.exports = {
  sleep,
  setAsyncInterval,
  clearAsyncInterval,
  timer
};
