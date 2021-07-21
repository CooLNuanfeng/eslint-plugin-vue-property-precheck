<template>
  <div>
    <p>{{ person.name && person.name.address }}</p>
    <div v-if="products[0].name"></div>
    <div v-for="item in list[0]" :key="item.id">
      {{ item.abc.ccc }}
    </div>
  </div>
</template>

<script>
const arr = []
let flag = {}
export default {
  data(){
    return {
      person: null,
      list: [],
      products: [],
      flag: false
    }
  },
  mounted () {
    let obj = {}
    let other = {}
    this.name = this.name && arr[0].name && arr[0].name.age
    this.name =  obj.age.cc && obj.name.age
    arr[0] = obj['name']
    obj.name.age = obj.address.name
    if(obj.aaa.bbb.ccc){
      console.log('aaaa')
    }
    flag.status ? other.name : other.list.product

  }
}
</script>

<style>

</style>