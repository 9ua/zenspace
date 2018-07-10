<template lang="jade">
.pop(v-show='isshow.showPage')
  .one-top
    .pop-top
      i.el-icon-arrow-left(@click='hide')
      p 玩家信息
  .pop-center
    .pop-center-top
      img(src='http://imagess-google.com/system/common/other/playerHomeBg.jpg')
    .pop-center-middle
      .pop-center-box
        .pop-center-position
          img(:src='pop.paths')
        h3 {{pop.name}}
        ul
          li 账号：{{$store.state.Globalusername | capitalize}}
          li 性别：保密
          li
            // <p>头衔：农民</p>
            p 累计中奖：{{pop.money | keepTwoNum}}
    .pop-center-bottom
      h3 Ta喜欢的彩票
      ul
        li.active(v-for='(item,index) in imgs', :key='index')
          img(:src='item.paths', v-show='item.selected')
</template>
<script>
export default {
  data() {
    return {
      imgs: [
        { paths: require("../../../static/images/1.jpg"), selected: false },
        { paths: require("../../../static/images/2.jpg"), selected: false },
        { paths: require("../../../static/images/3.jpg"), selected: false },
        { paths: require("../../../static/images/4.jpg"), selected: false },
        { paths: require("../../../static/images/5.jpg"), selected: false },
        { paths: require("../../../static/images/6.jpg"), selected: false },
        { paths: require("../../../static/images/7.jpg"), selected: false },
        { paths: require("../../../static/images/8.jpg"), selected: false }
      ],
      isshow: {
        showPage: false
      }
    };
  },
  props: {
    pop: {
      type: Object
    }
  },
  mounted() {
    this.imgshow();
  },
  methods: {
    imgshow() {
      let arrA = [6, 2, 4, 3, 5, 1, 0, 7];
      let arrB = this.shuffle(arrA).slice(0, 3);
      for (let i = 0; i < this.imgs.length; i++) {
        for (let j = 0; j < arrB.length; j++) {
          if (i === arrB[j]) {
            this.imgs[i].selected = !this.imgs[i].selected;
          }
        }
      }
    },
    //随机打乱数组
    shuffle(a) {
      let len = a.length;
      for (let i = 0; i < len; i++) {
        let end = len - 1;
        let index = (Math.random() * (end + 1)) >> 0;
        let t = a[end];
        a[end] = a[index];
        a[index] = t;
      }
      return a;
    },
    show() {
      this.isshow.showPage = true;
    },
    hide() {
      this.imgshow();
      this.isshow.showPage = false;
      this.$emit("sonclick", this.isshow);
    }
  },
  filters: {
    capitalize(value) {
      let start = value.slice(0, 1);
      let end = value.slice(-1);
      return `${start}***${end}`;
    },
    keepTwoNum(value) {
      value = Number(value);
      return value.toFixed(2);
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/scss/page-four/pop.scss";
</style>