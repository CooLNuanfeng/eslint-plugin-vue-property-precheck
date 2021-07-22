<template>
  <div>
    <p :class="{'active': list[0]}">
      {{ person.name.address }}
    </p>
    <div v-if="hasdownload && $route.meta.hasdownload && !isUplus && obj.name.age"></div> 
    <div v-for="item in list[0].product" :key="item.id.aaa">
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
    let stu = false
    this.name = stu || arr[0].name || arr[0].name.age
    this.name =  obj.age && obj.name
    if(this.$route.query.id){
      this.name = obj.name.age
    }
    obj.name.age = obj.address.name
    if(obj.aaa.bbb.ccc){
      arr[0] = obj['name']
    }
    flag.status ? other.name : other.list.product

  }
}
</script>

<style>

</style>