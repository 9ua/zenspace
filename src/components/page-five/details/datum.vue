<template lang="jade">
.datum
  ul.datum-top
    li(@click='show = !show')
      p 头像
      div
        img(:src='"../../../../static/images/"+image+".jpg"', alt='')
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
      imgsrc: require("../../../../static/images/0.jpg"),
      sexlist: ["保密", "男", "女"],
      imgs: [
        { name: "小姐姐", paths: require("../../../../static/images/0.jpg") },
        { name: "杰森斯坦森", paths: require("../../../../static/images/1.jpg") },
        { name: "金莎", paths: require("../../../../static/images/2.jpg") },
        { name: "高圆圆", paths: require("../../../../static/images/3.jpg") },
        { name: "迪丽热巴", paths: require("../../../../static/images/4.jpg") },
        { name: "黄宗泽", paths: require("../../../../static/images/5.jpg") },
        { name: "肌肉男", paths: require("../../../../static/images/6.jpg") },
        { name: "刘德华", paths: require("../../../../static/images/7.jpg") },
        { name: "李冰冰", paths: require("../../../../static/images/8.jpg") },
        { name: "苏有朋", paths: require("../../../../static/images/9.jpg") },
        { name: "贝克汉姆", paths: require("../../../../static/images/10.jpg") },
        { name: "谢霆锋", paths: require("../../../../static/images/11.jpg") },
        { name: "李敏镐", paths: require("../../../../static/images/12.jpg") },
        { name: "郑伊健", paths: require("../../../../static/images/13.jpg") },
        { name: "全智贤", paths: require("../../../../static/images/14.jpg") },
        { name: "李小龙", paths: require("../../../../static/images/15.jpg") },
        { name: "李连杰", paths: require("../../../../static/images/16.jpg") },
        { name: "小妹妹", paths: require("../../../../static/images/17.jpg") },
        { name: "特朗普", paths: require("../../../../static/images/18.jpg") },
        { name: "葛优", paths: require("../../../../static/images/19.jpg") },
        { name: "文章", paths: require("../../../../static/images/20.jpg") },
        { name: "赵薇", paths: require("../../../../static/images/21.jpg") },
        { name: "张学友", paths: require("../../../../static/images/22.jpg") },
        { name: "陈小春", paths: require("../../../../static/images/23.jpg") },
        { name: "林心如", paths: require("../../../../static/images/24.jpg") },
        { name: "吴奇隆", paths: require("../../../../static/images/25.jpg") },
        { name: "张一山", paths: require("../../../../static/images/26.jpg") },
        { name: "钟汉良", paths: require("../../../../static/images/27.jpg") },
        { name: "波多野结衣", paths: require("../../../../static/images/28.jpg") },
        { name: "赵丽颖", paths: require("../../../../static/images/29.jpg") },
        { name: "王宝强", paths: require("../../../../static/images/30.jpg") },
        { name: "朱茵", paths: require("../../../../static/images/31.jpg") },
        { name: "科比", paths: require("../../../../static/images/32.jpg") },
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
      localStorage.setItem("image",this.imgindex);
      this.image = localStorage.getItem("image");
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