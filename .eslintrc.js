module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'airbnb',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
};
