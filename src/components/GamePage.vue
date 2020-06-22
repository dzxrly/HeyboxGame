<template>
  <div class="gamepage-wrap">
    <div class="gameinfo-wrap">
      <div class="row1">
        <span class="gamename">小黑盒连连看</span>
        <span class="auothername">By 鎧羅突擊弩賊</span>
      </div>
      <div class="row2">
        <span class="sizeText">棋盘大小：</span>
        <van-stepper v-model="size"
                     min="4"
                     max="64"></van-stepper>
        <span class="emojiNumText">表情种类数量：</span>
        <van-stepper v-model="emojiNumber"
                     min="2"
                     max="36"></van-stepper>
      </div>
      <div class="row3">
        <van-button class="btn"
                    size="small"
                    color="#f2f3f5"
                    @click="createGame">生成</van-button>
        <van-button class="btn"
                    size="small"
                    color="#f2f3f5"
                    @click="flushGame">刷新</van-button>
      </div>
    </div>
    <div class="gamearea-wrap"
         v-if="isCreated">
      <div class="scorePane"><span class="scoreText">{{score}} 分</span></div>
      <div class="gamearea-xaxis"
           v-for="(xaxisData, index_x) in layoutArray"
           :key="index_x">
        <div class="gamearea-yaxis"
             v-for="(yaxisData, index_y) in xaxisData"
             :key="index_y">
          <img width="46"
               height="46"
               :src='yaxisData'
               v-show="yaxisData !== '#'"
               @click="handleSelect(index_x, index_y)"
               :class="{'active': currentSelected_x === index_x && currentSelected_y === index_y}">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { shuffle, isRemove } from '../script/logic.js'
export default {
  name: 'GamePage',
  data () {
    return {
      xaxis: 12,
      yaxis: 12,
      layoutArray: [[]],
      currentSelected_x: -3,
      currentSelected_y: -3,
      firstSelectedPointX: -1,
      firstSelectedPointY: -1,
      secondSelectedPointX: -2,
      secondSelectedPointY: -2,
      selectedTimes: 0,
      score: 0,
      size: 12,
      emojiNumber: 12,
      isCreated: false
    }
  },
  methods: {
    setAxis (size) {
      this.xaxis = size
      this.yaxis = size
    },
    layoutInit (maxNumber) {
      if (maxNumber > 36) alert('error: 超过表情总量！')
      else {
        var num = 1
        var tempLayout = [[]]
        for (let i = 0; i < this.xaxis / 2; i++) {
          tempLayout[i] = []
          for (let j = 0; j < this.yaxis; j++) {
            tempLayout[i][j] = require('../assets/emoji' + num++ + '.jpg')
            if (num > maxNumber) num = 1
          }
        }
        for (let i = this.xaxis / 2; i < this.xaxis; i++) {
          tempLayout[i] = []
          for (let j = 0; j < this.yaxis; j++) {
            tempLayout[i][j] = tempLayout[i - (this.xaxis / 2)][j]
          }
        } // 初始化数组
        tempLayout.forEach(element => {
          shuffle(element)
        })
        shuffle(tempLayout) // 洗牌算法打乱
        for (let i = 0; i < this.xaxis + 2; i++) {
          this.layoutArray[i] = []
          for (let j = 0; j < this.yaxis + 2; j++) {
            this.layoutArray[i][j] = '#'
          }
        }
        for (let i = 1; i < this.xaxis + 1; i++) {
          for (let j = 1; j < this.yaxis + 1; j++) {
            this.layoutArray[i][j] = tempLayout[i - 1][j - 1]
          }
        } // 转移到大一圈的棋盘上
      }
    },
    handleSelect (x, y) {
      this.currentSelected_x = x
      this.currentSelected_y = y
      this.selectedTimes++
      if (this.selectedTimes > 2) this.selectedTimes = 1
      if (this.selectedTimes === 1) {
        this.firstSelectedPointX = x
        this.firstSelectedPointY = y
      } // 选择第一个点
      if (this.selectedTimes === 2) {
        this.secondSelectedPointX = x
        this.secondSelectedPointY = y
        if (isRemove(this.firstSelectedPointX, this.firstSelectedPointY, this.secondSelectedPointX, this.secondSelectedPointY, this.layoutArray, this.xaxis + 2, this.yaxis + 2) && !this.isSamePoint()) {
          this.layoutArray[this.firstSelectedPointX][this.firstSelectedPointY] = '#'
          this.layoutArray[this.secondSelectedPointX][this.secondSelectedPointY] = '#'
          this.score++
        }
      } // 选择第二个点
    },
    isSamePoint () {
      if (this.firstSelectedPointX === this.secondSelectedPointX && this.firstSelectedPointY === this.secondSelectedPointY) return true
      else return false
    },
    createGame () {
      this.setAxis(this.size)
      this.layoutInit(this.emojiNumber)
      this.isCreated = true
    },
    flushGame () {
      window.location.reload()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.gamepage-wrap {
  width 100%
  height 100%
  .gameinfo-wrap {
    margin-top 1vh
    display flex
    flex-flow column nowrap
    text-align center
    justify-content center
    flex 0 0 auto
    .row1 {
      margin 2px 0 5px 0
      display flex
      flex-flow column nowrap
      text-align center
      justify-content center
      flex 0 0 auto
      .gamename {
        color #f2f3f5
        font-size 30px
        font-weight bolder
      }
      .auothername {
        color #f2f3f5
        font-size 12px
        font-font-weight lighter
      }
    }
    .row2 {
      margin 5px 0 5px 0
      display flex
      flex-flow row nowrap
      text-align center
      justify-content center
      flex 0 0 auto
      .sizeText {
        margin 0 5px 0 10px
        color #f2f3f5
        font-size 20px
      }
      .emojiNumText {
        margin 0 5px 0 30px
        color #f2f3f5
        font-size 20px
      }
    }
    .row3 {
      margin 5px 0 10px 0
      display flex
      flex-flow row nowrap
      text-align center
      justify-content center
      flex 0 0 auto
      .btn {
        margin 0 10px 0 10px
        width 50px
        color #323233 !important
      }
    }
  }
  .gamearea-wrap {
    margin-top 20px
    .scorePane {
      color #f2f3f5
      font-size 20px
      font-weight bolder
    }
    .gamearea-xaxis {
      display flex
      flex-flow row nowrap
      text-align center
      justify-content center
      flex 0 0 auto
      .gamearea-yaxis {
        margin 2px 2px 2px 2px
        width 48px
        height 48px
      }
      .active {
        border solid 2px white
      }
    }
  }
}
</style>
