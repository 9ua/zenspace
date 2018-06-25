<template lang="jade">
.datum
  ul.datum-top
    li(@click='show = !show')
      p 头像
      div
        img(:src='"@/assets/img/five/"+image+".jpg"', alt='')
        i.el-icon-arrow-right
    li
      p 昵称
      div
        el-input(placeholder='请设置昵称', v-model='nickname', :value='nickname', clearable='', ref='isnickname', @blur='nickNameFocus', @focus='nickNameFocus', v-show='isnicknameto')
        p {{nickname}}
        i.el-icon-arrow-right(v-show='!nickname')
    li
      p 账号
      div
        p {{$store.state.Globalusername}}
  van-actionsheet(v-model='show', title='修改头像')
    .datum-img
      p 预览
      img(:src='imgUrl ? imgUrl : imgsrc')
      p {{imgName ? imgName : '小姐姐'}}
    .datum-img-box
      .datum-hide
        ul.datum-imgs
          li(v-for='(img,index) in imgs', :key='index')
            img(:src='img.paths', @click='tonickname(img,$event,index)')
    .datum-but
      button(@click='saveImg') 保存头像
      button(@click='show = !show') 取消
  ul.datum-btn
    li
      p 手机
      div
        router-link(v-if='mobile === null', to='setmobile') {{ mobile === null ? '未设置' : 'mobile' }}
        span {{mobile}}
        i.el-icon-arrow-right(v-show=' !mobile')
    li
      p 邮箱
      div
        router-link(v-if='email === null', to='setemail') {{ email === null ? '未设置' : email }}
        span {{email}}
        i.el-icon-arrow-right(v-show=' !email')
    li
      p 性别
      div
        select(v-model='sex', @change='selecteds($event)')
          option(v-for='(sexs,index) in sexlist', :key='index', :value='index') {{sexs}}
        i.el-icon-arrow-right
    li
      p 生日
      div
        p
          el-date-picker(v-model='birthday', type='date', value-format='yyyy/MM/dd', @change='(value) => toBirthday(value)', format='yyyy/MM/dd', :editable='false', placeholder='选择日期')
        i.el-icon-arrow-right
</template>
<script>
import { setStore, getStore, removeStore } from "../../../config/mutil";
export default {
  data() {
    return {
      isnicknameto: false,
      input: false,
      show: false,
      imgName: "",
      userImg: "",
      imgUrl: "",
      imgindex: 0, //头像ID
      image: 0, //用户头像ID
      nickname: "", //昵称
      sex: 0, //性别ID
      mobile: null, //手机号码
      email: null, //邮箱
      birthday: "1988/11/11", //生日
      nicknameShow1: true,
      nicknameShow2: false,
      imgsrc: require("@/assets/img/five/0.jpg"),
      sexlist: ["保密", "男", "女"],
      imgs: [
        { name: "小姐姐", paths: require("@/assets/img/five/0.jpg") },
        { name: "杰森斯坦森", paths: require("@/assets/img/five/1.jpg") },
        { name: "金莎", paths: require("@/assets/img/five/2.jpg") },
        { name: "高圆圆", paths: require("@/assets/img/five/3.jpg") },
        { name: "迪丽热巴", paths: require("@/assets/img/five/4.jpg") },
        { name: "黄宗泽", paths: require("@/assets/img/five/5.jpg") },
        { name: "肌肉男", paths: require("@/assets/img/five/6.jpg") },
        { name: "刘德华", paths: require("@/assets/img/five/7.jpg") },
        { name: "李冰冰", paths: require("@/assets/img/five/8.jpg") },
        { name: "苏有朋", paths: require("@/assets/img/five/9.jpg") }
      ]
    };
  },
  mounted() {
    this.getUserData();
  },
  methods: {
    //生日选择
    toBirthday(value) {
      this.birthday = value;
      this.$store.state.birthday = this.birthday;
      setStore("birthday", this.$store.state.birthday);
      this.saveUserData();
    },
    //性别选择
    selecteds(e) {
      this.sex = e.target.value;
      this.$store.state.sex = this.sex;
      setStore("sex", this.$store.state.sex);
      this.saveUserData();
    },
    //昵称
    nickNameFocus() {
      if (this.$refs.isnickname.value === "") {
        this.isnicknameto = true;
      } else if (this.$refs.isnickname.value !== "") {
        this.nickname = this.$refs.isnickname.value;
        this.$store.state.nickname = this.nickname;
        setStore("nickname", this.$store.state.nickname);
        this.saveUserData();
      }
    },
    //提交个人信息
    saveUserData() {
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true
      };
      let formData = new FormData();
      formData.append("image", this.image);
      formData.append("nickName", this.nickname);
      formData.append("sex", this.sex);
      formData.append("birthday", this.birthday);
      this.$axios
        .post(
          this.$store.state.url + "api/userCenter/saveUserData",
          formData,
          config
        )
        .then(res => {
          if (this.$refs.isnickname.value !== "") {
            this.isnicknameto = false;
          }
        })
        .catch(error => {
          console.log("用户信息保存失败");
        });
    },
    //获取个人信息
    getUserData() {
      this.$http
        .get(this.$store.state.url + "api/userCenter/getUserData")
        .then(res => {
          this.image = res.data.data.image;
          this.nickname = res.data.data.nickName;
          if (!res.data.data.nickName) {
            this.isnicknameto = true;
          }
          this.mobile = res.data.data.mobile;
          this.email = res.data.data.email;
          if (res.data.data.sex !== null) {
            this.sex = res.data.data.sex;
          }
          if (res.data.data.sex !== null) {
            this.birthday = res.data.data.birthday;
          }
        })
        .catch(error => {
          console.log("获取个人信息No");
        });
    },
    //头像选择与编辑
    tonickname(img, event, index) {
      this.imgName = img.name;
      this.imgUrl = img.paths;
      this.imgindex = index;
      this.image = this.imgindex;
      setStore("image", this.$store.state.image);
      this.saveUserData();
    },
    //头像选择与提交
    saveImg() {
      this.userImg = this.imgUrl;
      this.show = !this.show;
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/page-five/details/datum.scss";
</style>