## eslint-plugin-vue-property-precheck

English | [简体中文](./README_CN.md)

In the Vue project, when the multi-layer properties of the object are used in the code, eslint prompts to verify whether the object before the property exists

**Notice** Change the rule to skip the attribute verification prompt of this

#### Usage

.eslintrc.js config example

```
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
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}

```


### test

npm i && npm run test

log:

```
   4:10  warning  Get object properties, Make sure person.name exists  vue-property-precheck/no-property-pre
   6:31  warning  Get object properties, Make sure $route.meta exists  vue-property-precheck/no-property-pre
   6:70  warning  Get object properties, Make sure obj.name exists     vue-property-precheck/no-property-pre
   7:25  warning  Get object properties, Make sure list[0] exists      vue-property-precheck/no-property-pre
   7:48  warning  Get object properties, Make sure item.id exists      vue-property-precheck/no-property-pre
   8:10  warning  Get object properties, Make sure item.abc exists     vue-property-precheck/no-property-pre
  29:24  warning  Get object properties, Make sure arr[0] exists       vue-property-precheck/no-property-pre
  32:19  warning  Get object properties, Make sure obj.name exists     vue-property-precheck/no-property-pre
  34:20  warning  Get object properties, Make sure obj.address exists  vue-property-precheck/no-property-pre
  35:8   warning  Get object properties, Make sure obj.aaa.bbb exists  vue-property-precheck/no-property-pre
  38:32  warning  Get object properties, Make sure other.list exists   vue-property-precheck/no-property-pre
```

