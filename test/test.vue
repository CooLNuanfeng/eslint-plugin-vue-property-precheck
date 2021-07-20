<template>
  <div v-if="list[0]"></div>
</template>

<script>
const arr = []
export default {
  data(){
    return {
      list: []
    }
  },
  mounted () {
    let obj = {}
    // this.name = this.name && arr[0].name && arr[0].name.age
    this.name =  obj.name.age
    arr[0] = obj.name.age
  }
}
</script>

<style>

</style>