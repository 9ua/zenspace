<template lang="jade">
.head-top
  .pop-top
    p(v-for='(contents,index) in content', :key='index') {{contents.show === routerUrl ? contents.title : ''}} 
    img(v-show="routerUrl === 'one'", src='@/assets/img/one/logo.png')
    router-link.dim(v-show="routerUrl === 'five'", to='service', tag='li') 客服
    a(:href='os', v-show="routerUrl === 'one'", target='_top')
      b APP
      b.el-icon-download
</template>
<script>
export default {
  data() {
    return {
      os: "",
      content: [
        {
          // title: '首页',
          show: "one",
          check: false
        },
        {
          title: "往期开奖",
          show: "second",
          check: false
        },
        {
          title: "活动中心",
          show: "three",
          check: false
        },
        {
          title: "我的",
          show: "five",
          check: true
        }
      ],
      routerUrl: this.$route.name
    };
  },
  created() {
    this.checkOs();
  },
  methods: {
    checkOs() {
      var userAgent = navigator.userAgent;
      if (/Android/i.test(userAgent)) {
        //是否為Android
        this.os = "/app/hongfayule.apk";
      } else if (/iPhone|iPad/i.test(userAgent)) {
        //是否為iPhone或iPad
        this.os = "http://www.pgyer.com/mjn2";
      } else if (/Windows/i.test(userAgent)) {
        //使否是用電腦觀看
        this.os = "/app/hongfayule.apk";
      }
      //判斷瀏覽器
      if (/Chrome/i.test(userAgent)) {
        //是否為Chrome
      } else if (/Firefox/i.test(userAgent)) {
        //是否為Chrome
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/main.scss";
.dim {
  border: solid 1px #fff;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  position: absolute;
  right: 16px;
  padding: 3px 8px 6px;
  & span {
    padding: 3px;
  }
}
.head-top {
  height: 50px;
  width: 100%;
  background: rgb(175, 58, 49);
  position: fixed;
  top: 0px;
  z-index: 11;
  & .pop-top {
    height: 50px;
    width: 100%;
    @extend %faj;
    font-size: 20px;
    color: #fff;
    position: relative;
    & i {
      position: absolute;
      left: 16px;
    }
    & a {
      @extend %flex;
      @extend %aitems;
      @extend %sbetween;
      position: absolute;
      right: 16px;
      font-size: 20px;
      width: 60px;
      color: #ffffff;
      & b:nth-child(2) {
        font-size: 26px;
      }
    }
  }
}
</style>
