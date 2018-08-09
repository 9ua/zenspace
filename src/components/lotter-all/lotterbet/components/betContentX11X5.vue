<template lang='jade'>
.bet-content-foot
  div
    .bet-list-box
      span
        | {{current_player.remark}}
        b
          | 。奖金
          i(v-show='!isNaN(current_player.displayBonus)') {{current_player.displayBonus | keepTwoNum}}
          i(v-show='isNaN(current_player.displayBonus)') {{displayBonus1 | keepTwoNum}}—{{displayBonus2 | keepTwoNum}}
          |  元
        br
      ul.fushi
        li(v-for='(numViews, indexff) in current_player.numView', :key='indexff')
          p
            b {{numViews.title}}
            span
              a(v-for='(num,indexg) in numViews.nums', :key='indexg', :class="num.choose ? 'active' : '' ", @click='curBalls(indexff,indexg,num,numViews,current_player)') {{num.ball}}
</template>
<script>
export default {
  data() {
    return {
      d: [], //选中的号码的下标
      dd: [], //选中的号码的下标
      ka: [], //选中的号码的下标
      kb: [], //选中的号码的下标
      kc: [], //选中的号码的下标
      kd: [], //选中的号码的下标
      ke: [], //选中的号码的下标
      kf: [], //选中的号码的下标
      kg: [], //选中的号码的下标
      kh: [], //选中的号码的下标
      ki: [], //选中的号码的下标
      kj: [], //选中的号码的下标
      an: "",
      bn: "",
      cn: "",
      dn: "",
      en: "",
      fn: "",
      gn: "",
      hn: "",
      in: "",
      jn: ""
    };
  },
  computed: {
    current_player() {
      return this.$store.state.current_player;
    },
    playBonusId() {
      return this.$store.getters.playBonusId;
    },
    displayBonus1() {
      return this.$store.getters.displayBonus1;
    },
    displayBonus2() {
      return this.$store.getters.displayBonus2;
    }
  },
  methods: {
    //清空
    iscreat() {
      this.$store.commit("ZHU", "");
      this.$store.commit("CON", "");
      // this.$store.state.money = "";
      this.d = [];
      this.dd = [];
      this.ka = [];
      this.kb = [];
      this.kc = [];
      this.kd = [];
      this.ke = [];
      this.kf = [];
      this.kg = [];
      this.kh = [];
      this.ki = [];
      this.kj = [];
      this.an = "";
      this.bn = "";
      this.cn = "";
      this.dn = "";
      this.en = "";
      this.fn = "";
      this.gn = "";
      this.hn = "";
      this.in = "";
      this.jn = "";
      this.$store.commit("CURRENT_PLAYER", "clear");
    },
    //中间->投注选号
    curBalls(indexff, indexg, num, numViews, player) {
      console.log(this.playBonusId);
      num.choose = !num.choose;
      if (num.choose === true) {
        this.d[indexg] = num.ball;
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.commit("CON", this.dd.join(","));
        this.$store.commit("ZHU", "add");
        this.bet_boxjia(indexff, indexg, num, numViews, player);
      } else if (num.choose === false) {
        this.d.splice(indexg, 1, "");
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.commit("CON", this.dd.join(","));
        this.$store.commit("ZHU", "reduce");
        this.bet_boxjian(indexff, indexg, num, numViews, player);
      }
    },
    //----------公用函数-----------
    //复式 betContent = [0,0,0,0,0] , count = 5
    getCount(betContent, stars) {
      if (betContent.length != stars) {
        return 0;
      }
      let count = 1;
      for (let i = 0; i < stars; i++) {
        let n = betContent[i];
        n = [...new Set(n)];
        count *= n.length;
      }
      return count;
    },
    //组选共用函数
    getCombin(num, len) {
      if (num < len) {
        return 0;
      }
      let nums = 1;
      let lens = 1;
      for (let i = 0; i < len; i++) {
        nums *= num - i;
        lens *= len - i;
      }
      return nums / lens;
    },

    //投注 ++++
    bet_boxjia(indexff, indexg, num, numViews, player) {
      //五星、四星、三星、二星二码不定位 、前四组选6+
      if (
        this.playBonusId === "ssc_star4_front_group6" ||
        this.playBonusId === "ssc_star5_none2" ||
        this.playBonusId === "ssc_star4_front_none2" ||
        this.playBonusId === "ssc_star3_front_none2" ||
        this.playBonusId === "ssc_star3_mid_none2" ||
        this.playBonusId === "ssc_star3_last_none2"
      ) {
        let ret = this.groupSplit(this.dd, 2);
        let arr = [];
        let abc = "";
        for (var k = 0; k < ret.length; k++) {
          var cc = ret[k].join("");
          arr.push(cc);
        }
        abc = arr.join(",");
        this.$store.commit("ZHU",arr.length);
      }
    },
    //投注 ----
    //五星、四星、三星、二星二码不定位 、前四组选6 -

    bet_boxjian(indexff, indexg, num, numViews, player) {
      if (
        this.playBonusId === "ssc_star4_front_group6" ||
        this.playBonusId === "ssc_star5_none2" ||
        this.playBonusId === "ssc_star4_front_none2" ||
        this.playBonusId === "ssc_star3_front_none2" ||
        this.playBonusId === "ssc_star3_mid_none2" ||
        this.playBonusId === "ssc_star3_last_none2"
      ) {
        let ret = this.groupSplit(this.dd, 2);
        let arr = [];
        let abc = "";
        for (var k = 0; k < ret.length; k++) {
          var cc = ret[k].join("");
          arr.push(cc);
        }
        abc = arr.join(",");
        this.$store.commit("ZHU",arr.length);
      }
    }
  },
  // 保留三个小数,不四舍五入
  filters: {
    keepTwoNum(value) {
      value = parseInt(value * 100) / 100;
      return value;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../assets/scss/lotter-list/lotterbet/components/betContentFoot.scss";
</style>


