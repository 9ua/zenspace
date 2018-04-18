<template>
  <div class="verifySafePwd">
    <div class="verifySafePwd-top">
      <router-link to="/resetpwd" tag="i" class="el-icon-arrow-left"></router-link>
      <p>验证安全密码</p>
    </div>
    <div class="verifySafePwd-input">
      <p>原安全密码</p>
      <input type="password" placeholder="请输入当前所使用的密码" v-focus/> </div>
    <div class="verifySafePwd-but">
      <el-button type="primary" @click="verifySafePwd">确定</el-button>
    </div>
    <!--<el-button type="primary" v-show="popshow">{{poptext}}</el-button>-->
    <div class="verifySafePwd-tisi"> 安全密码用于提现、绑定银行卡等操作，可保障资金安全。 </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        popshow: false,
        a: 1,
        b: 2
      }
    },
    methods: {
      verifySafePwd() {
        this.$router.push({
          path: '/setPwd'
        });
      },
    },
    directives: {
      focus: {
        inserted: function(el) {
          el.focus()
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/scss/page-five/safety/verifySafePwd.scss';
</style>