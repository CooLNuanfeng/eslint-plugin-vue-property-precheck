module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: "module",
    ecmaVersion: 2018,
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: false,
      jsx: false
    }
  },
  extends: [ 
    'plugin:vue-property-precheck/property',
    'plugin:vue/recommended',
    'eslint:recommended',  
  ], 
  plugins: ['vue','vue-property-precheck'],
  rules: {
    // 'property/no-property-pre': 'warn',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
