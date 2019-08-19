const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.default,
  rules: {
    ...fabric.default.rules,
    'jsx-a11y/alt-text': [0],
    'arrow-parens': [0],
    'no-underscore-dangle': [0],
    'global-require': [0],
    'lines-between-class-members': [0],
    'no-param-reassign': [0],
    'eslint-comments/no-unlimited-disable': [0],
    'operator-assignment': [0],
    'react/react-in-jsx-scope': [0],
    'space-before-function-paren': 0,
    'key-spacing': [2, { mode: 'minimum', align: 'value' }],
  },
  globals: {
    IS_PRERENDER: true,
    __IS_BROWSER: true,
    API: true,
    GLOBAL: true,
    dd: true
  }
};
