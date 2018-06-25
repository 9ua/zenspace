<template lang="jade">
.pop(v-show='show')
  div
    ul
      li.title {{title}}
      li.cont
        .contBox
          ul
            li(v-show='betshow')
              | {{content}}
      li.but
        button 确定
        button(@click='show = !show') 取消
</template>
<script>
export default {
  data() {
    return {
      show: true,
      title: "温馨提示！",
      nums: 1
    };
  },
  props: {
    pop: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.pop {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  & div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    & ul {
      width: 76%;
      border-radius: 4px;
      background: #fff;
      & li {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }
      & .title {
        border-radius: 4px 4px 0 0;
        height: 30px;
        background: rgb(175, 58, 49);
        color: #fff;
        font-size: 14px;
      }
      & .cont {
        & .contBox {
          width: 90%;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          min-height: 30px;
          & ul {
            width: 100%;
            & li {
              height: 36px;
            }
          }
        }
      }
      & .but {
        display: flex;
        flex-direction: row;
        & button {
          height: 30px;
          width: 50%;
          border: none;
          background: #fff;
          border-top: 1px solid #eee;
          font-size: 14px;
        }
        & button:nth-child(1) {
          color: #dc3b40;
        }
      }
    }
  }
}
</style>

