<template lang="jade">
.listStyle
  .listStyle-content
    div
      ul.listStyle-IV(v-show='showFlag')
        li(v-for='(item,index) in letterlist', :key='index', @click='select(item,$event)')
          .mInvite-left
            p
              a
                span [ {{item.id}} ]
                br
                | 发送时间 {{item.createTime}}
              br
              |  {{item.title}}
          .mInvite-right
            p
              span
    van-actionsheet(v-model='show2')
      ul.listStyle-V
        li
          span {{selected.title}}
        div(style='padding:20px 30px 0; max-height: 420px; overflow-y: scroll;', v-html='notice')
        li
          .button
            button.button1(@click='show2 =! show2') 确定
</template>
<script>
export default {
  data() {
    return {
      letterlist: [],
      showFlag: true,
      show2: false,
      notice: "",
      selected: "",
      content: ""
    };
  },
  mounted() {
    this.getUserNoticeList();
  },
  methods: {
    select(a) {
      this.selected = a;
      this.getNoticeInfor(a.id);
      this.show2 = !this.show2;
    },
    onClick(item) {
      this.timeline = item.name;
      this.betweenType = item.Type;
      this.show = !this.show;
      this.getTradeList();
    },
    print(index, title) {
      this.status = this.pagelist[index].Type;
      this.getTradeList();
    },
    getUserNoticeList() {
      this.$http
        .get(this.$store.state.url + "api/proxy/getUserNoticeList", {
          params: { type: 1 }
        })
        .then(res => {
          this.letterlist = res.data.data;
        })
        .catch(error => {
          console.log("获取彩種ratio ERROR");
        });
    },
    getNoticeInfor(x) {
      this.$http
        .get(this.$store.state.url + "/api/proxy/getNoticeInfor", {
          params: { id: x }
        })
        .then(res => {
          this.notice = res.data.data.content;
        })
        .catch(error => {
          console.log("获取CCCCONTENT ERROR");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/listStyle.scss";
</style>