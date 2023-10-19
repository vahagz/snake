const templates = require('./templates');
const SyncTimer = require('./sync-timer');
const Animation = require('./animation');
const ConsoleTyper = require('../helpers/console-typer');
const GameObject = require('./game-object');
const AnimationsArray = require('./animations-array');

module.exports = class Snake extends GameObject {
  constructor() {
    super(103, 44, 'top', 10);
    this.animations = new AnimationsArray();
    this.animations.add(
      new Animation({
        name: 'top',
        symbols: templates.vertical.symbols,
        templates: templates.vertical.templates,
        order: 'back',
        direction: 'top',
        stay: false,
        clearBack: true,
        repeat: 2,
        move: true,
        x: this.coords.x - 3,
        y: this.coords.y,
        fps: this.fps(),
        // distanceToHide: 20,
        distanceToAppear: 0
      })
    );

    this.timer = new SyncTimer(this.fps(), async () => {
      // ConsoleTyper.cursorTo(0, 0);
      // console.log(this.coords);
      // ConsoleTyper.cursorTo(0, 1);
      // console.log(this);
      ConsoleTyper.logTo(this.coords.x - 1, this.coords.y - 1, '@');
      this.move();
    });
  }

  start() {
    this.timer.start();

    this.animations.forEach(animation => {
      animation.start();
    });
  }

  stop() {
    this.timer.stop();
    this.animations.forEach(animation => animation.stop());
  }

  started() {
    return this.timer.started();
  }

  setFPS(fps) {
    super.setFPS(fps);
    this.animations.forEach(animation => animation.setFPS(fps));
  }

  /** @private */
  static checkDir(dir) {
    if (!['left', 'right', 'top', 'bot'].includes(dir)) throw new Error(`Unknown direction => ${dir}`);
  }


  calculateTurningAnimationStartCoords(turningAnimation, templateName, currentDir, newDir) {
    const offset = templates.vertical.templates.length - this.animations.get(0).currentTemplateIndex();
    if (currentDir === 'top' && newDir === 'right') {
      const obj = {
        turningAnimationCoords: {
          x: this.coords.x + 5,
          y: this.coords.y - 8 + offset,
        },
        newAnimationCoords: {
          x: turningAnimation.coords.x - templates[templateName].templates[0][0].length + 5,
          y: turningAnimation.coords.y
        }
      }
      this.coords.y = obj.turningAnimationCoords.y + 3;
      return obj;
    } else if (currentDir === 'top' && newDir === 'left') {
      const obj = {
        turningAnimationCoords: {
          x: this.coords.x,
          y: this.coords.y - 8 + offset,
        },
        newAnimationCoords: {
          x: turningAnimation.coords.x + templates[templateName].templates[0][0].length,
          y: turningAnimation.coords.y
        }
      }
      this.coords.y = obj.turningAnimationCoords.y + 3;
      this.coords.x += 6;
      return obj;
    } else if (currentDir === 'right' && newDir === 'top') {
      return {
        turningAnimationCoords: {
          x: this.coords.x,
          y: this.coords.y,
        },
        newAnimationCoords: {
          x: turningAnimation.coords.x - templates[templateName].templates[0][0].length - 1,
          y: turningAnimation.coords.y
        }
      }
    } else if (currentDir === 'left' && newDir === 'top') {
      return {
        turningAnimationCoords: {
          x: this.coords.x + 3,
          y: this.coords.y - 5,
        },
        newAnimationCoords: {
          x: turningAnimation.coords.x + templates[templateName].templates[0][0].length + 6,
          y: turningAnimation.coords.y
        }
      }
    }
  }

  changeDirection(dir) {
    if (!this.timer.started()) return;
    Snake.checkDir(dir);

    // if (this.direction() === 'top' && dir === 'right') {
    //   const offset = templates.vertical.templates.length - this.animations.get(0).currentTemplateIndex();
    //   this.animations.get(0).clear();
    //   this.animations.get(0).startHiding(offset);

    //   const topRightAnimation = new Animation({
    //     name: 'topRight',
    //     symbols: templates.topRight.symbols,
    //     templates: templates.topRight.templates,
    //     order: 'forward',
    //     direction: 'top',
    //     stay: true,
    //     clearBack: true,
    //     repeat: 1,
    //     move: true,
    //     x: this.coords.x,
    //     y: this.coords.y - 8 + offset,
    //     fps: this.fps(),
    //     distanceToHide: this.animations.get(0).trueLength() + this.animations.get(0).options.distanceToHide - this.animations.get(0).distanceMoved,
    //     distanceToAppear: 0
    //   }).start();
    //   this.animations.add(topRightAnimation);
      
    //   const length = templates.horizontal.templates[0][0].length;
    //   const ratio = length / topRightAnimation.length();
    //   const rightAnimation = new Animation({
    //     name: 'horizontal',
    //     symbols: templates.horizontal.symbols,
    //     templates: templates.horizontal.templates,
    //     order: 'back',
    //     direction: 'right',
    //     stay: false,
    //     clearBack: true,
    //     repeat: this.animations.get(0).options.repeat,
    //     move: true,
    //     x: topRightAnimation.coords.x - templates.topRight.templates[0][0].length - 1,
    //     y: topRightAnimation.coords.y/**Object.assign */,
    //     fps: this.fps() * ratio,
    //     distanceToAppear: topRightAnimation.length() * ratio,
    //     startIndex: 7
    //   }).start();
    //   this.animations.add(rightAnimation);
    // }


    // if (this.direction() === 'top' && dir === 'right') {
    const currentOrientation = (this.direction() === 'top' || this.direction() === 'bot') ? 'vertical' : 'horizontal';
    const offset = templates[currentOrientation].templates.length - this.animations.get(0).currentTemplateIndex();
    const lastAnimation = this.animations.get(this.animations.length - 1);
    lastAnimation.clear();
    lastAnimation.startHiding(offset);

    const templateName = this.direction() + dir[0].toUpperCase() + dir.slice(1);
    const turningAnimationOrder = (dir === 'right') ? 'forward' : 'back';
    const turningAnimation = new Animation({
      name: templateName,
      symbols: templates[templateName].symbols,
      templates: templates[templateName].templates,
      order: turningAnimationOrder,
      direction: dir,
      stay: true,
      clearBack: true,
      repeat: 1,
      move: true,
      x: this.coords.x,
      y: this.coords.y - 8 + offset,
      fps: this.fps(),
      distanceToHide: this.animations.get(0).trueLength() + this.animations.get(0).options.distanceToHide - this.animations.get(0).distanceMoved,
      distanceToAppear: 0
    });

    const coords = this.calculateTurningAnimationStartCoords(turningAnimation, templateName, this.direction(), dir);
    turningAnimation.coords.x = coords.turningAnimationCoords.x;
    turningAnimation.coords.y = coords.turningAnimationCoords.y;
    turningAnimation.start();
    this.animations.add(turningAnimation);
    
    const newOrientation = (dir === 'right' || dir === 'left') ? 'horizontal' : 'vertical';
    const newAnimationOrder = (dir === 'right') ? 'back' : 'forward';
    const rightAnimation = new Animation({
      name: dir,
      symbols: templates[newOrientation].symbols,
      templates: templates[newOrientation].templates,
      order: newAnimationOrder,
      direction: dir,
      stay: false,
      clearBack: true,
      repeat: this.animations.get(0).options.repeat,
      move: true,
      x: turningAnimation.coords.x - templates[templateName].templates[0][0].length - 1,
      y: turningAnimation.coords.y,
      fps: this.fps(),
      distanceToAppear: turningAnimation.length(),
      startIndex: 7
    });

    rightAnimation.coords.x = coords.newAnimationCoords.x;
    rightAnimation.coords.y = coords.newAnimationCoords.y;
    rightAnimation.start();
    this.animations.add(rightAnimation);

    

    // if (
    //   !(((dir === 'left' || dir === 'right') && this.directionIs('vertical')) ||
    //   ((dir === 'top' || dir === 'bot') && this.directionIs('horizontal')))
    // ) return;

    // const isVertical = this.directionIs('vertical');
    // this.setFPS(this.fps() * (isVertical ? 2 : 0.5));

    // const animationsToStop = isVertical ? this.animations.vertical : this.animations.horizontal;
    // animationsToStop.forEach(animation => {
    //   if (animation.started()) {
    //     animation.stop();
    //     animation.clear();
    //   }
    // });

    // const animationsToStart = isVertical ? this.animations.horizontal : this.animations.vertical;
    // animationsToStart.forEach(animation => {
    //   animation.coords.set(this.coords);
    //   animation.setDirection(dir);
    //   animation.setOrder((dir === 'right' || dir === 'top') ? 'back' : 'forward');
    //   animation.start();
    // });

    // if        (dir === 'right') {
    //   this.animations.horizontal[this.animations.horizontal.length - 1].setClearBack(false);
    //   this.animations.horizontal[0].setClearBack(true);
    // } else if (dir === 'left') {
    //   this.animations.horizontal[0].setClearBack(false);
    //   this.animations.horizontal[this.animations.horizontal.length - 1].setClearBack(true);
    // } else if (dir === 'top') {
    //   this.animations.vertical[this.animations.vertical.length - 1].setClearBack(false);
    //   this.animations.vertical[0].setClearBack(true);
    // } else if (dir === 'bot') {
    //   this.animations.vertical[0].setClearBack(false);
    //   this.animations.vertical[this.animations.vertical.length - 1].setClearBack(true);
    // }

    this.setDirection(dir);
  }
};
