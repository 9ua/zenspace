<template>
  <div class="setSafePwd">
    <div class="setSafePwd-top">
      <router-link to="/safety" tag="i" class="el-icon-arrow-left"></router-link>
      <p>修改安全密码</p>
    </div>
    <div class="setSafePwd-input">
      <div>
        <p>安全密码</p>
        <input type="password" v-model="newPassword" placeholder="请输入6位数密码" v-focus/>
      </div>
      <div>
        <p>确认密码</p>
        <input type="password" v-model="newPassword2" placeholder="请输入6位数密码" />
      </div>
    </div>
    <div class="setSafePwd-but">
      <button @click="setSecurityCodes">确定</button>
    </div>
    <div class="setSafePwd-tisi">
      安全密码用于提现、绑定银行卡等操作，可保障资金安全。
    </div>
    <van-popup class="pop2" v-model="show" :close-on-click-overlay="false">
      <div>
        <ul>
          <div class="title">
            <p>温馨提示！</p>
          </div>
          <div class="cont">
            <p>{{content}}</p>
          </div>
          <div class="but">
            <button class="nodel" @click="show = ! show">确定</button>
          </div>
        </ul>
      </div>
    </van-popup>
  </div>
</template>
<script>
  import md5 from 'js-md5';
  export default {
    data() {
      return {
        show:false,//弹窗
        content:'提示内容!',//弹窗内容
        newPassword:null,//安全码
        newPassword2:null,//确认安全码
      }
    },
    methods: {
      setSecurityCodes() {
        const newPassword_yz = /^[0-9]{6,6}$/;
        let yzPassword = newPassword_yz.test(this.newPassword);
        if (this.newPassword === '') {
          this.content = '密码不能为空';
          this.show = true;
        } else if (yzPassword == false) {
          this.content = '安全密码：6位数字'
          this.show = true;
        } else if (this.newPassword !== this.newPassword2) {
          this.content = '两次密码输入不一致'
          this.show = true;
        } else {
        let config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'},withCredentials:true};
        let pwd1 = md5(this.newPassword);
        let pwd2 = md5(this.newPassword2);
        let formData = new FormData();
        formData.append('newPassword', pwd1);
        formData.append('newPassword2', pwd2);
        if(pwd1 === pwd2){
          this.$axios.post(this.$store.state.url+'api/userCenter/setSecurityCode', formData, config).then((res) => {
            this.show = !this.show;
            this.content = res.data.data.message
            setTimeout(() => {
              if(this.content === '修改成功！'){
                this.$router.push({path: '/safety'});
              }
            }, 1500);
          }).catch((error) => {
              console.log("setSecurityCodesNo")
          })
        }else{
          this.show = !this.show;
          this.content = '两次密码不相同！'
        }
      }
      }
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
  @import '../../../assets/scss/page-five/safety/setSafePwd.scss';
  @import "../../../assets/scss/popcorn.scss";
</style>