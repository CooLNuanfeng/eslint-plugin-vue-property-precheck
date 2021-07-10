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
    this.name = arr[0].name
  }
}
</script>

<style>

</style>