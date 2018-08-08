<template lang="jade">
ul.bet-top
  li
    i.iconfont.icon-left(@click='banckto')
  li
    p.wangfa
      | 玩
      br
      | 法
    .menu(@click='showCenter = !showCenter')
      | {{titles}}
      i.iconfont(:class="showCenter ? 'icon-up' : 'icon-down'")
    .menu-list(v-show='showCenter', @click='showCenter = false')
      .menu-listShow
        .popscroll
          ul.menu-list-top
            li(v-for='(into,index) in playGroups', :key='index')
              .title {{into.title}}
              .menu-list-list-box
                .menu-list-list(v-for='(group,indexa) in into.groups', :key='indexa')
                  span(v-for='(player,indexb) in group.players', :key='indexb', @click='tab($event,indexa,indexb,player,group,into,index)')
                    a {{player.groupName}}{{player.title}}
  li.betlist
    span(@click.stop='rightFlag') {{listname}}
    i.iconfont(:class="showRight ? 'icon-up' : 'icon-down' ", @click.stop='rightFlag')
    .betk3listRight(v-show='showRight')
      ul
        li(v-for='(listssc,index) in LotteryList', :key='index', @click.stop='listnames($event,index,listssc)')
          a {{listssc.name}}
</template>
<script>
export default {
  props: {
    lotteryId: {
      type: String,
      default: "cqssc"
    }
  },
  computed: {
    listname() {
      return this.$store.state.listname;
    },
    showRight(){
      return this.$store.state.showRight;
    }
  },
  data() {
    return {
      titles: "五星 复式", //标题
      LotteryList: "", //彩种
      historyNum: 0, //添加历史记录堆栈
      playGroups: [], //玩法树，
      showCenter: false, //头部中间
    };
  },
  mounted() {
    this.getPlayTree();
    this.getLotteryList();
  },
  methods: {
    rightFlag() {
      this.$store.state.showRight = !this.$store.state.showRight;
      this.$store.state.betContentTopPopFlag = false;
    },
    //返回到上一次进来的页面
    banckto() {
      this.$router.push(this.$store.state.historyNum);
    },
    //玩法术
    getPlayTree() {
      const now = new Date().getTime();
      if (localStorage.getItem("playTree_" + this.$route.query.id) !== null) {
        this.playBonus = JSON.parse(
          localStorage.getItem("playTree_" + this.$route.query.id)
        ).playBonus;
        this.playGroups = JSON.parse(
          localStorage.getItem("playTree_" + this.$route.query.id)
        ).playGroups;
        this.$store.state.current_player = this.playGroups[0].groups[0].players[0];
      } else if (
        localStorage.getItem("playTree_" + this.$route.query.id) === null
      ) {
        this.$axios
          // .get( "./static/ssc.json", {
          .get(this.$store.state.url + "api/lottery/getPlayTree", {
            params: { lotteryId: this.lotteryId }
          })
          .then(res => {
            this.playBonus = res.data.data.playBonus;
            this.playGroups = res.data.data.playGroups;
            this.$store.state.current_player = this.playGroups[0].groups[0].players[0];
            localStorage.setItem(
              "playTree_" + this.$route.query.id,
              JSON.stringify(res.data.data)
            );
            localStorage.setItem("date_playTree_" + this.$route.query.id, now);
          })
          .catch(error => {
            console.log("玩法树No");
            this.$store.state.loginStatus = false;
            this.$pop.show({
              title: "温馨提示",
              content: "获取不成功,请检查您的网络！",
              content1: "",
              content2: "",
              number: 1
            });
          });
      }
    },
    //右上获取彩种
    getLotteryList() {
      if (localStorage.getItem("lotteryList") !== null) {
        this.LotteryList = JSON.parse(localStorage.getItem("lotteryList")).ssc;
        this.groupId = this.LotteryList[0].groupId;
        for (let i = 0; i < this.LotteryList.length; i++) {
          if (this.LotteryList[i].id === this.$route.query.id) {
            this.$store.state.listname = this.LotteryList[i].name.substring(
              0,
              2
            );
          }
        }
      } else {
        this.$axios
          .get(this.$store.state.url + "api/lottery/getLotteryList")
          .then(res => {
            localStorage.setItem("lotteryList", JSON.stringify(res.data.data));
            this.LotteryList = res.data.data.ssc;
            this.groupId = this.LotteryList[0].groupId;
            for (let i = 0; i < this.LotteryList.length; i++) {
              if (this.LotteryList[i].id === this.$route.query.id) {
                this.$store.state.listname = this.LotteryList[i].name.substring(
                  0,
                  2
                );
              }
            }
          })
          .catch(error => {
            console.log("右上彩种No");
          });
      }
    },
    //头部右->菜单点击
    listnames(e, index, into) {
      this.historyNum++;
      this.$store.state.listname = into.name.substring(0, 2);
      this.showan = index;
      this.$store.state.showRight = !this.$store.state.showRight;
      this.$router.push({ query: { id: into.id } });
      this.getPlayTree(); //玩法术
      this.$router.push({
        query: {
          id: this.$route.query.id,
          name: into.name,
          group: this.groupId
        }
      });
      this.$emit("changeLotteryId", into.id);
    },
    //头部菜单项
    tab(e, indexa, indexb, items, group, into, index) {
      this.titles = into.title + " " + items.groupName + " " + items.title;
      this.showCenter = !this.showCenter;
      this.$store.state.playBonusId = items.id;
      this.$store.state.current_player = items;
      this.$emit("iscreat");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../assets/scss/lotter-list/lotterbet/components/betTop.scss";
</style>

