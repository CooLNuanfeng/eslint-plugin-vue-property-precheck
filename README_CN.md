## eslint-plugin-vue-property-precheck

简体中文 | [English](./README.md)

在Vue项目中，当代码中使用对象的多层属性时，eslint提示验证属性之前的对象是否存在

**注意** 改规则跳过this的属性验证提示

#### 使用

npm i eslint-plugin-vue-property-precheck -D

.eslintrc.js 配置示例

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


### 测试

npm i && npm link && npm link eslint-plugin-vue-property-precheck && npm run test

log:

```
   4:10  warning  Get object properties, Make sure person.name exists  vue-property-precheck/no-property-pre
   6:31  warning  Get object properties, Make sure $route.meta exists  vue-property-precheck/no-property-pre
   6:70  warning  Get object properties, Make sure obj.name exists     vue-property-precheck/no-property-pre
   7:25  warning  Get object properties, Make sure list[0] exists      vue-property-precheck/no-property-pre
   7:48  warning  Get object properties, Make sure item.id exists      vue-property-precheck/no-property-pre
   8:10  warning  Get object properties, Make sure item.abc exists     vue-property-precheck/no-property-pre
  29:24  warning  Get object properties, Make sure arr[0] exists       vue-property-precheck/no-property-pre
  32:17  warning  Get object properties, Make sure obj.name exists     vue-property-precheck/no-property-pre
  33:7   warning  Unexpected console statement                         no-console
  35:20  warning  Get object properties, Make sure obj.address exists  vue-property-precheck/no-property-pre
  36:8   warning  Get object properties, Make sure obj.aaa.bbb exists  vue-property-precheck/no-property-pre
  39:32  warning  Get object properties, Make sure other.list exists   vue-property-precheck/no-property-pre
```