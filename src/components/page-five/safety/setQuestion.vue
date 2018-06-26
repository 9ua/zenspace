<template lang="jade">
.setQuestion
  .setQuestion-top
    router-link.el-icon-arrow-left(to='/safety', tag='i')
    p 设置密保问题
    span
  .setQuestion-input
    div
      p 问题一
      select(v-model='title1', @change='selecteds1($event)')
        option(v-for='(item,index) in options', :key='index', :value='item.value') {{item.label}}
    div
      p 答案：
      input(type='text', v-model='answer1', v-focus='')
  .setQuestion-input
    div
      p 问题二
      select(v-model='title2', @change='selecteds2($event)')
        option(v-for='(item,index) in options', :key='index', :value='item.value') {{item.label}}
    div
      p 答案：
      input(type='text', v-model='answer2')
  .setQuestion-but
    button(@click='setQuestion') 确定
</template>
<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      options: [
        { value: 1, label: "您的出生地是哪里？" },
        { value: 2, label: "您高中的学校是？" },
        { value: 3, label: "您父亲的名字是？" },
        { value: 4, label: "您母亲的名字是？" },
        { value: 5, label: "您的兴趣爱好是什么？" },
        { value: 6, label: "您配偶的名字是？" },
        { value: 7, label: "您大学学校的名字是？" },
        { value: 8, label: "你的家乡是？" }
      ],
      title1: "1", //密保问题一
      title2: "1", //密保问题二
      answer1: "", //密保答案一
      answer2: "" //密保答案二
    };
  },
  methods: {
    selecteds1(e) {
      this.title1 = e.target.value;
    },
    selecteds2(e) {
      this.title2 = e.target.value;
    },
    //设置密保问题
    setQuestion() {
      let md5answer1 = md5(this.answer1);
      let md5answer2 = md5(this.answer2);
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true
      };
      let formData = new FormData();
      formData.append("title1", this.title1);
      formData.append("title2", this.title2);
      formData.append("answer1", md5answer1);
      formData.append("answer2", md5answer2);
      if (this.title1 != this.title2) {
        this.$axios
          .post(
            this.$store.state.url + "api/userCenter/setSecurityQuestion",
            formData,
            config
          )
          .then(res => {
            this.show = !this.show;
            this.content = res.data.data.message;
            setTimeout(() => {
              if (this.content === "设定成功！") {
                this.$router.push({ path: "/safety" });
              }
            }, 2000);
          })
          .catch(error => {
            console.log("设置密保问题No");
          });
      } else {
        this.show = !this.show;
        this.content = "密保问题不能相同！";
      }
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
@import "../../../assets/scss/page-five/safety/setQuestion.scss";
</style>