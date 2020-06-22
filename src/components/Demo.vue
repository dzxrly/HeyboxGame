<template>
  <div class="demo-wrap">
    <div class="arr">
      <div class="arrNumber"
           v-for="(num, index) in array"
           :key="index">
        <span class="number">{{num}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Demo',
  data () {
    return {
      array: [5, 1, 3, 2, 4]
    }
  }
}
</script>
<style scoped lang="stylus">
.demo-wrap {
  display flex
  flex-flow column nowrap
  .arr {
    margin-top 100px
    display flex
    flex-flow row nowrap
    text-align center
    justify-content center
    .arrNumber {
      margin 20px 30px 20px 30px
      width 60px
      height 60px
      border solid 2px white
      .number {
        color white
        font-size 48px
      }
    }
  }
}
</style>
