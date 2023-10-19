const cp = require('../helpers/color-picker');

const templates = {
  topRight: {
    symbols: {
      0: '\0',
      1: cp.FgRed('_'),
      4: cp.FgRed('‾'),
      7: cp.FgRed('|'),
      2: cp.FgYellow('#'),
      3: cp.FgGreen('*'),
      5: cp.FgRed('\\'),
      6: cp.FgRed('/')
    },
    templates: [
      [
        [ 0, 0, 0, 0, 1, 1 ],
        [ 0, 0, 0, 6, 3, 3 ],
        [ 0, 0, 6, 2, 6, 4 ],
        [ 0, 6, 3, 6, 0, 0 ],
        [ 7, 3, 7, 0, 0, 0 ],
        [ 0, 5, 3, 5, 0, 0 ],
        [ 0, 0, 5, 3, 5, 0 ],
        [ 0, 0, 0, 7, 3, 7 ]
      ],
      [
        [ 0, 0, 0, 0, 1, 1 ],
        [ 0, 0, 0, 6, 2, 3 ],
        [ 0, 0, 6, 3, 6, 4 ],
        [ 0, 6, 3, 6, 0, 0 ],
        [ 7, 3, 7, 0, 0, 0 ],
        [ 0, 5, 3, 5, 0, 0 ],
        [ 0, 0, 5, 3, 5, 0 ],
        [ 0, 0, 0, 7, 3, 7 ]
      ],
      [
        [ 0, 0, 0, 0, 1, 1 ],
        [ 0, 0, 0, 6, 3, 2 ],
        [ 0, 0, 6, 3, 6, 4 ],
        [ 0, 6, 3, 6, 0, 0 ],
        [ 7, 3, 7, 0, 0, 0 ],
        [ 0, 5, 3, 5, 0, 0 ],
        [ 0, 0, 5, 3, 5, 0 ],
        [ 0, 0, 0, 7, 3, 7 ]
      ],
      [
        [ 0, 0, 0, 0, 1, 1 ],
        [ 0, 0, 0, 6, 3, 3 ],
        [ 0, 0, 6, 3, 6, 4 ],
        [ 0, 6, 3, 6, 0, 0 ],
        [ 7, 3, 7, 0, 0, 0 ],
        [ 0, 5, 3, 5, 0, 0 ],
        [ 0, 0, 5, 3, 5, 0 ],
        [ 0, 0, 0, 7, 2, 7 ]
      ],
      [
        [ 0, 0, 0, 0, 1, 1 ],
        [ 0, 0, 0, 6, 3, 3 ],
        [ 0, 0, 6, 3, 6, 4 ],
        [ 0, 6, 3, 6, 0, 0 ],
        [ 7, 3, 7, 0, 0, 0 ],
        [ 0, 5, 3, 5, 0, 0 ],
        [ 0, 0, 5, 2, 5, 0 ],
        [ 0, 0, 0, 7, 3, 7 ]
      ],
      [
        [ 0, 0, 0, 0, 1, 1 ],
        [ 0, 0, 0, 6, 3, 3 ],
        [ 0, 0, 6, 3, 6, 4 ],
        [ 0, 6, 3, 6, 0, 0 ],
        [ 7, 3, 7, 0, 0, 0 ],
        [ 0, 5, 2, 5, 0, 0 ],
        [ 0, 0, 5, 3, 5, 0 ],
        [ 0, 0, 0, 7, 3, 7 ]
      ],
      [
        [ 0, 0, 0, 0, 1, 1 ],
        [ 0, 0, 0, 6, 3, 3 ],
        [ 0, 0, 6, 3, 6, 4 ],
        [ 0, 6, 3, 6, 0, 0 ],
        [ 7, 2, 7, 0, 0, 0 ],
        [ 0, 5, 3, 5, 0, 0 ],
        [ 0, 0, 5, 3, 5, 0 ],
        [ 0, 0, 0, 7, 3, 7 ]
      ],
      [
        [ 0, 0, 0, 0, 1, 1 ],
        [ 0, 0, 0, 6, 3, 3 ],
        [ 0, 0, 6, 3, 6, 4 ],
        [ 0, 6, 2, 6, 0, 0 ],
        [ 7, 3, 7, 0, 0, 0 ],
        [ 0, 5, 3, 5, 0, 0 ],
        [ 0, 0, 5, 3, 5, 0 ],
        [ 0, 0, 0, 7, 3, 7 ]
      ]
    ]
  },
  topLeft: {
    symbols: {
      0: '\0',
      1: cp.FgRed('_'),
      2: cp.FgYellow('#'),
      3: cp.FgGreen('*'),
      4: cp.FgRed('‾'),
      5: cp.FgRed('\\'),
      6: cp.FgRed('/'),
      7: cp.FgRed('|')
    },
    templates: [
      [
        [ 1, 1, 0, 0, 0, 0, ],
        [ 3, 3, 5, 0, 0, 0, ],
        [ 4, 5, 3, 5, 0, 0, ],
        [ 0, 6, 2, 6, 0, 0, ],
        [ 7, 3, 7, 0, 0, 0, ],
        [ 0, 5, 3, 5, 0, 0, ],
        [ 0, 0, 5, 3, 5, 0, ],
        [ 0, 0, 0, 7, 3, 7, ]
      ],
      [
        [ 1, 1, 0, 0, 0, 0, ],
        [ 3, 3, 5, 0, 0, 0, ],
        [ 4, 5, 3, 5, 0, 0, ],
        [ 0, 6, 3, 6, 0, 0, ],
        [ 7, 2, 7, 0, 0, 0, ],
        [ 0, 5, 3, 5, 0, 0, ],
        [ 0, 0, 5, 3, 5, 0, ],
        [ 0, 0, 0, 7, 3, 7, ]
      ],
      [
        [ 1, 1, 0, 0, 0, 0, ],
        [ 3, 3, 5, 0, 0, 0, ],
        [ 4, 5, 3, 5, 0, 0, ],
        [ 0, 6, 3, 6, 0, 0, ],
        [ 7, 3, 7, 0, 0, 0, ],
        [ 0, 5, 2, 5, 0, 0, ],
        [ 0, 0, 5, 3, 5, 0, ],
        [ 0, 0, 0, 7, 3, 7, ]
      ],
      [
        [ 1, 1, 0, 0, 0, 0, ],
        [ 3, 3, 5, 0, 0, 0, ],
        [ 4, 5, 3, 5, 0, 0, ],
        [ 0, 6, 3, 6, 0, 0, ],
        [ 7, 3, 7, 0, 0, 0, ],
        [ 0, 5, 3, 5, 0, 0, ],
        [ 0, 0, 5, 2, 5, 0, ],
        [ 0, 0, 0, 7, 3, 7, ]
      ],
      [
        [ 1, 1, 0, 0, 0, 0, ],
        [ 3, 3, 5, 0, 0, 0, ],
        [ 4, 5, 3, 5, 0, 0, ],
        [ 0, 6, 3, 6, 0, 0, ],
        [ 7, 3, 7, 0, 0, 0, ],
        [ 0, 5, 3, 5, 0, 0, ],
        [ 0, 0, 5, 3, 5, 0, ],
        [ 0, 0, 0, 7, 2, 7, ]
      ],
      [
        [ 1, 1, 0, 0, 0, 0, ],
        [ 2, 3, 5, 0, 0, 0, ],
        [ 4, 5, 3, 5, 0, 0, ],
        [ 0, 6, 3, 6, 0, 0, ],
        [ 7, 3, 7, 0, 0, 0, ],
        [ 0, 5, 3, 5, 0, 0, ],
        [ 0, 0, 5, 3, 5, 0, ],
        [ 0, 0, 0, 7, 3, 7, ]
      ],
      [
        [ 1, 1, 0, 0, 0, 0, ],
        [ 3, 2, 5, 0, 0, 0, ],
        [ 4, 5, 3, 5, 0, 0, ],
        [ 0, 6, 3, 6, 0, 0, ],
        [ 7, 3, 7, 0, 0, 0, ],
        [ 0, 5, 3, 5, 0, 0, ],
        [ 0, 0, 5, 3, 5, 0, ],
        [ 0, 0, 0, 7, 3, 7, ]
      ],
      [
        [ 1, 1, 0, 0, 0, 0, ],
        [ 3, 3, 5, 0, 0, 0, ],
        [ 4, 5, 2, 5, 0, 0, ],
        [ 0, 6, 3, 6, 0, 0, ],
        [ 7, 3, 7, 0, 0, 0, ],
        [ 0, 5, 3, 5, 0, 0, ],
        [ 0, 0, 5, 3, 5, 0, ],
        [ 0, 0, 0, 7, 3, 7, ]
      ],
    ]
  },
  leftTop: {
    symbols: {
      0: '\0',
      1: cp.FgRed('_'),
      2: cp.FgYellow('#'),
      3: cp.FgGreen('*'),
      4: cp.FgRed('‾'),
      5: cp.FgRed('\\'),
      6: cp.FgRed('/'),
      7: cp.FgRed('|')
    },
    templates: [
      [
        [ 0, 0, 0, 7, 3, 7, ],
        [ 0, 0, 0, 6, 3, 6, ],
        [ 0, 0, 6, 3, 6, 0, ],
        [ 0, 7, 3, 7, 0, 0, ],
        [ 0, 7, 2, 7, 0, 0, ],
        [ 0, 0, 5, 3, 5, 1, ],
        [ 0, 0, 0, 5, 3, 3, ],
        [ 0, 0, 0, 0, 4, 4, ]
      ],
      [
        [ 0, 0, 0, 7, 3, 7, ],
        [ 0, 0, 0, 6, 3, 6, ],
        [ 0, 0, 6, 3, 6, 0, ],
        [ 0, 7, 2, 7, 0, 0, ],
        [ 0, 7, 3, 7, 0, 0, ],
        [ 0, 0, 5, 3, 5, 1, ],
        [ 0, 0, 0, 5, 3, 3, ],
        [ 0, 0, 0, 0, 4, 4, ]
      ],
      [
        [ 0, 0, 0, 7, 3, 7, ],
        [ 0, 0, 0, 6, 3, 6, ],
        [ 0, 0, 6, 2, 6, 0, ],
        [ 0, 7, 3, 7, 0, 0, ],
        [ 0, 7, 3, 7, 0, 0, ],
        [ 0, 0, 5, 3, 5, 1, ],
        [ 0, 0, 0, 5, 3, 3, ],
        [ 0, 0, 0, 0, 4, 4, ]
      ],
      [
        [ 0, 0, 0, 7, 3, 7, ],
        [ 0, 0, 0, 6, 2, 6, ],
        [ 0, 0, 6, 3, 6, 0, ],
        [ 0, 7, 3, 7, 0, 0, ],
        [ 0, 7, 3, 7, 0, 0, ],
        [ 0, 0, 5, 3, 5, 1, ],
        [ 0, 0, 0, 5, 3, 3, ],
        [ 0, 0, 0, 0, 4, 4, ]
      ],
      [
        [ 0, 0, 0, 7, 2, 7, ],
        [ 0, 0, 0, 6, 3, 6, ],
        [ 0, 0, 6, 3, 6, 0, ],
        [ 0, 7, 3, 7, 0, 0, ],
        [ 0, 7, 3, 7, 0, 0, ],
        [ 0, 0, 5, 3, 5, 1, ],
        [ 0, 0, 0, 5, 3, 3, ],
        [ 0, 0, 0, 0, 4, 4, ]
      ],
      [
        [ 0, 0, 0, 7, 3, 7, ],
        [ 0, 0, 0, 6, 3, 6, ],
        [ 0, 0, 6, 3, 6, 0, ],
        [ 0, 7, 3, 7, 0, 0, ],
        [ 0, 7, 3, 7, 0, 0, ],
        [ 0, 0, 5, 3, 5, 1, ],
        [ 0, 0, 0, 5, 3, 2, ],
        [ 0, 0, 0, 0, 4, 4, ]
      ],
      [
        [ 0, 0, 0, 7, 3, 7, ],
        [ 0, 0, 0, 6, 3, 6, ],
        [ 0, 0, 6, 3, 6, 0, ],
        [ 0, 7, 3, 7, 0, 0, ],
        [ 0, 7, 3, 7, 0, 0, ],
        [ 0, 0, 5, 3, 5, 1, ],
        [ 0, 0, 0, 5, 2, 3, ],
        [ 0, 0, 0, 0, 4, 4, ]
      ],
      [
        [ 0, 0, 0, 7, 3, 7, ],
        [ 0, 0, 0, 6, 3, 6, ],
        [ 0, 0, 6, 3, 6, 0, ],
        [ 0, 7, 3, 7, 0, 0, ],
        [ 0, 7, 3, 7, 0, 0, ],
        [ 0, 0, 5, 2, 5, 1, ],
        [ 0, 0, 0, 5, 3, 3, ],
        [ 0, 0, 0, 0, 4, 4, ]
      ]
    ]
  },
  vertical: {
    symbols: {
      0: '\0',
      1: cp.FgRed('|'),
      2: cp.FgYellow('#'),
      3: cp.FgGreen('*'),
      5: cp.FgRed('\\'),
      6: cp.FgRed('/')
    },
    templates: [
      [
        [ 0, 0, 0, 1, 3, 1 ],
        [ 0, 0, 6, 3, 6, 0 ],
        [ 0, 6, 3, 6, 0, 0 ],
        [ 1, 2, 1, 0, 0, 0 ],
        [ 1, 3, 1, 0, 0, 0 ],
        [ 0, 5, 3, 5, 0, 0 ],
        [ 0, 0, 5, 3, 5, 0 ],
        [ 0, 0, 0, 1, 3, 1 ]
      ],
      [
        [ 0, 0, 6, 3, 6, 0 ],
        [ 0, 6, 3, 6, 0, 0 ],
        [ 1, 3, 1, 0, 0, 0 ],
        [ 1, 2, 1, 0, 0, 0 ],
        [ 0, 5, 3, 5, 0, 0 ],
        [ 0, 0, 5, 3, 5, 0 ],
        [ 0, 0, 0, 1, 3, 1 ],
        [ 0, 0, 0, 1, 3, 1 ]
      ],
      [
        [ 0, 6, 3, 6, 0, 0 ],
        [ 1, 3, 1, 0, 0, 0 ],
        [ 1, 3, 1, 0, 0, 0 ],
        [ 0, 5, 2, 5, 0, 0 ],
        [ 0, 0, 5, 3, 5, 0 ],
        [ 0, 0, 0, 1, 3, 1 ],
        [ 0, 0, 0, 1, 3, 1 ],
        [ 0, 0, 6, 3, 6, 0 ]
      ],
      [
        [ 1, 3, 1, 0, 0, 0 ],
        [ 1, 3, 1, 0, 0, 0 ],
        [ 0, 5, 3, 5, 0, 0 ],
        [ 0, 0, 5, 2, 5, 0 ],
        [ 0, 0, 0, 1, 3, 1 ],
        [ 0, 0, 0, 1, 3, 1 ],
        [ 0, 0, 6, 3, 6, 0 ],
        [ 0, 6, 3, 6, 0, 0 ]
      ],
      [
        [ 1, 3, 1, 0, 0, 0 ],
        [ 0, 5, 3, 5, 0, 0 ],
        [ 0, 0, 5, 3, 5, 0 ],
        [ 0, 0, 0, 1, 2, 1 ],
        [ 0, 0, 0, 1, 3, 1 ],
        [ 0, 0, 6, 3, 6, 0 ],
        [ 0, 6, 3, 6, 0, 0 ],
        [ 1, 3, 1, 0, 0, 0 ]
      ],
      [
        [ 0, 5, 3, 5, 0, 0 ],
        [ 0, 0, 5, 3, 5, 0 ],
        [ 0, 0, 0, 1, 3, 1 ],
        [ 0, 0, 0, 1, 2, 1 ],
        [ 0, 0, 6, 3, 6, 0 ],
        [ 0, 6, 3, 6, 0, 0 ],
        [ 1, 3, 1, 0, 0, 0 ],
        [ 1, 3, 1, 0, 0, 0 ]
      ],
      [
        [ 0, 0, 5, 3, 5, 0 ],
        [ 0, 0, 0, 1, 3, 1 ],
        [ 0, 0, 0, 1, 3, 1 ],
        [ 0, 0, 6, 2, 6, 0 ],
        [ 0, 6, 3, 6, 0, 0 ],
        [ 1, 3, 1, 0, 0, 0 ],
        [ 1, 3, 1, 0, 0, 0 ],
        [ 0, 5, 3, 5, 0, 0 ]
      ],
      [
        [ 0, 0, 0, 1, 3, 1 ],
        [ 0, 0, 0, 1, 3, 1 ],
        [ 0, 0, 6, 3, 6, 0 ],
        [ 0, 6, 2, 6, 0, 0 ],
        [ 1, 3, 1, 0, 0, 0 ],
        [ 1, 3, 1, 0, 0, 0 ],
        [ 0, 5, 3, 5, 0, 0 ],
        [ 0, 0, 5, 3, 5, 0 ]
      ]
    ]
  },
  horizontal: {
    symbols: {
      0: '\0',
      1: cp.FgRed('_'),
      2: cp.FgYellow('#'),
      3: cp.FgGreen('*'),
      4: cp.FgRed('‾'),
      5: cp.FgRed('\\'),
      6: cp.FgRed('/')
    },
    templates: [
      [
        [ 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0 ],
        [ 0, 0, 0, 6, 3, 3, 2, 3, 3, 5, 0, 0 ],
        [ 1, 1, 6, 3, 6, 4, 4, 4, 5, 3, 5, 1 ],
        [ 3, 3, 3, 6, 0, 0, 0, 0, 0, 5, 3, 3 ],
        [ 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 4, 4 ]
      ],
      [
        [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0 ],
        [ 0, 0, 0, 0, 6, 3, 2, 3, 3, 3, 5, 0 ],
        [ 1, 1, 1, 6, 3, 6, 4, 4, 4, 5, 3, 5 ],
        [ 3, 3, 3, 3, 6, 0, 0, 0, 0, 0, 5, 3 ],
        [ 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 4 ]
      ],
      [
        [ 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0 ],
        [ 0, 0, 0, 0, 0, 6, 2, 3, 3, 3, 3, 5 ],
        [ 5, 1, 1, 1, 6, 3, 6, 4, 4, 4, 5, 3 ],
        [ 3, 3, 3, 3, 3, 6, 0, 0, 0, 0, 0, 5 ],
        [ 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0 ]
      ],
      [
        [ 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1 ],
        [ 5, 0, 0, 0, 0, 0, 6, 3, 3, 3, 3, 3 ],
        [ 3, 5, 1, 1, 1, 6, 2, 6, 4, 4, 4, 5 ],
        [ 5, 3, 3, 3, 3, 3, 6, 0, 0, 0, 0, 0 ],
        [ 0, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0 ]
      ],
      [
        [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1 ],
        [ 3, 5, 0, 0, 0, 0, 0, 6, 3, 3, 3, 3 ],
        [ 5, 3, 5, 1, 1, 1, 6, 3, 6, 4, 4, 4 ],
        [ 0, 5, 3, 3, 3, 3, 2, 6, 0, 0, 0, 0 ],
        [ 0, 0, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0 ]
      ],
      [
        [ 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1 ],
        [ 3, 3, 5, 0, 0, 0, 0, 0, 6, 3, 3, 3 ],
        [ 4, 5, 3, 5, 1, 1, 1, 6, 3, 6, 4, 4 ],
        [ 0, 0, 5, 3, 3, 3, 2, 3, 6, 0, 0, 0 ],
        [ 0, 0, 0, 4, 4, 4, 4, 4, 0, 0, 0, 0 ]
      ],
      [
        [ 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1 ],
        [ 3, 3, 3, 5, 0, 0, 0, 0, 0, 6, 3, 3 ],
        [ 4, 4, 5, 3, 5, 1, 1, 1, 6, 3, 6, 4 ],
        [ 0, 0, 0, 5, 3, 3, 2, 3, 3, 6, 0, 0 ],
        [ 0, 0, 0, 0, 4, 4, 4, 4, 4, 0, 0, 0 ]
      ],
      [
        [ 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1 ],
        [ 3, 3, 3, 3, 5, 0, 0, 0, 0, 0, 6, 3 ],
        [ 4, 4, 4, 5, 3, 5, 1, 1, 1, 6, 3, 6 ],
        [ 0, 0, 0, 0, 5, 3, 2, 3, 3, 3, 6, 0 ],
        [ 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 0, 0 ]
      ],
      [
        [ 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
        [ 3, 3, 3, 3, 3, 5, 0, 0, 0, 0, 0, 6 ],
        [ 6, 4, 4, 4, 5, 3, 5, 1, 1, 1, 6, 3 ],
        [ 0, 0, 0, 0, 0, 5, 2, 3, 3, 3, 3, 6 ],
        [ 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 0 ]
      ],
      [
        [ 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0 ],
        [ 6, 3, 3, 3, 3, 3, 5, 0, 0, 0, 0, 0 ],
        [ 3, 6, 4, 4, 4, 5, 2, 5, 1, 1, 1, 6 ],
        [ 6, 0, 0, 0, 0, 0, 5, 3, 3, 3, 3, 3 ],
        [ 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4 ]
      ],
      [
        [ 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0 ],
        [ 0, 6, 3, 3, 3, 3, 2, 5, 0, 0, 0, 0 ],
        [ 6, 3, 6, 4, 4, 4, 5, 3, 5, 1, 1, 1 ],
        [ 3, 6, 0, 0, 0, 0, 0, 5, 3, 3, 3, 3 ],
        [ 4, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4 ]
      ],
      [
        [ 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0 ],
        [ 0, 0, 6, 3, 3, 3, 2, 3, 5, 0, 0, 0 ],
        [ 1, 6, 3, 6, 4, 4, 4, 5, 3, 5, 1, 1 ],
        [ 3, 3, 6, 0, 0, 0, 0, 0, 5, 3, 3, 3 ],
        [ 4, 4, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4 ]
      ]
    ]
  }
};

templates.rightTop = JSON.parse(JSON.stringify(templates.topRight));

module.exports = templates;
