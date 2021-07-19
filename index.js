module.exports = {
  rules: {
    'no-property-pre': require('./rules/no-property-pre')
  },
  configs: {
    'property': {
      rules: {
        'vue-property-precheck/no-property-pre': 'warn'
      }
    }
  }
}
