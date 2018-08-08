<template lang='jade'>
.bet-content-top-pop(v-show='betContentTopPopFlag', @click='changeBetContentTopPop')
  ul.look
    li
      p 期号
      p 开奖号码
      p 开奖时间
    li(v-for='(item,index) in getPastOpens', :key='index', v-if='index < 10')
      p
        | {{item.seasonId.substring(4).split("-").join("")*1}}
        i.iconfont.icon-plus-minus
      p
        a {{item.n1}}
        a {{item.n2}}
        a {{item.n3}}
        a {{item.n4}}
        a {{item.n5}}
      p {{item.addTime.substring(11)}}
  p.lookAll
    button(@click.stop='lookAll') 查看更多
    button(@click='lookAllTo') 往期开奖
</template>
<script>
export default {
  computed: {
    betContentTopPopFlag() {
      return this.$store.state.betContentTopPopFlag;
    },
    seasonId() {
      return this.$store.state.seasonId;
    },
    getPastOpens() {
      return this.$store.state.getPastOpens;
    }
  },
  mounted() {
    this.getPastOp(20);
  },
  methods: {
    changeBetContentTopPop() {
      this.$store.state.betContentTopPopFlag = !this.$store.state
        .betContentTopPopFlag;
    },
    //查看20条记录
    lookAll() {
      this.$store.state.betContentTopPopFlag = false;
      this.$store.state.lookAllUl = !this.$store.state.lookAllUl;
    },

    //往期开奖
    lookAllTo() {
      this.$router.push({
        path: "second/past",
        query: {
          id: this.$route.query.id,
          name: this.$route.query.name,
          group: this.groupId
        }
      });
    },
    //获取过去开奖号码20个
    getPastOp(count) {
      this.$axios
        .get(this.$store.state.url + "api/lottery/getPastOpen", {
          params: { lotteryId: this.$route.query.id, count: count }
        })
        .then(res => {
          this.$store.state.getPastOpens = res.data.data;
        })
        .catch(error => {
          console.log("获取过去开奖号码No");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../assets/scss/lotter-list/lotterbet/components/betContentTopPop.scss";
</style>


