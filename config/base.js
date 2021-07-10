module.exports = {
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    parser: require.resolve('babel-eslint'),
    sourceType: "module",
    ecmaVersion: 2018,
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: false,
      jsx: false
    }
  },
  env: {
    browser: true,
    es6: true
  },
  plugins: ['boilerplate'],
  rules: {
    'vue-property-precheck/property-precheck': 'error',
  }
}