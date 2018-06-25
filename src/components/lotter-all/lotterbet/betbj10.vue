<template lang="jade">
.betbjkl8
  ul.betbjkl8-top
    li
      router-link.el-icon-arrow-left(to='/one', tag='i')
    li
      p.wangfa
        | 玩
        br
        | 法
      .menu(@click='show = !show')
        | {{titles}}
        i(:class="show ? 'el-icon-caret-top' : 'el-icon-caret-bottom'")
      .menu-list
        van-popup(v-model='show', position='top')
          .menu-list-top(v-for='(val,index) in renxuan', :key='index')
            p(:class="{'active': index === navs}", v-for='(muens,index) in val.a', :key='index', @click='menunav($event,index,muens)') {{muens}}
          ul
            li(v-for='(val,index) in renxuan', :key='index', v-show='navs === 0')
              p(:class="{'active': index === renxuanlist}", v-for='(item,index) in val.valus', :key='index', @click='showrenxuan($event,item,index)') {{item}}
            li(v-show='navs === 1')
              p(:class="{'active': index === quweilist}", v-for='(item,index) in quwei', :key='index', @click='showquwei($event,item,index)') {{item}}
    li
      p 北京快乐8
  .betbjkl8-content
    .lottery-box
      .lottery-top(@click='lottery = !lottery')
        p
          | 888888开奖：
          ul
            li(v-for='(item,index) in 10', :key='index')
              yd-countup(:endnum='item', duration='1', decimals='0', separator='', suffix='')
            | ...
        p
          | 888888投注：
          span
            yd-countdown(time='2018/04/13 22:00:00')
              span
                | {%h}
                i :
              span
                | {%m}
                i :
              span {%s}
          i(:class=" lottery ? 'el-icon-arrow-down' :'el-icon-arrow-up'")
        .lottery-ms(v-show=' !lottery')
          p
            span 期号
            span 开奖号码
          ul
            li(v-for=' (item,index) in 10', :key='index')
              div
                span 888888
                span 00:00:00
              i.el-icon-minus
              div
                ul
                  li(v-for='(item,index) in 20', :key='index') 02
      .lottery-content
        .lottery-scoll-box
          p(v-for='(annotations,index) in annotation', :key='index', v-show='index === renxuanlist')
            | {{annotations.title}}
            ul
              li(v-show='index===0')
                | 奖金
                span 7.80
                | 元
              li(v-show='index===1')
                | 奖金
                span 32.43
                | 元
              li(v-show='index===2')
                span(@click='pop3=!pop3') 奖金详情
              li(v-show='index===3')
                span(@click='pop4=!pop4') 奖金详情
              li(v-show='index===4')
                span(@click='pop5=!pop5') 奖金详情
              li(v-show='index===5')
                span(@click='pop6=!pop6') 奖金详情
              li(v-show='index===6')
                span(@click='pop7=!pop7') 奖金详情
          .lottery-scoll.lottery-scoll1
            p
              span 上盘
            ul
              li.choose1(v-for='(val,shang) in 40', :key='shang', @click='selecNumShang($event,shang,val)') {{ shang < 9 ? '0'+(shang+1) : (shang+1) }}
          .lottery-scoll.lottery-scoll2
            p
              span 下盘
            ul
              li.choose2(v-for='(val,xia) in 40', :key='xia', @click='selecNumXia($event,xia,val)') {{xia+41}}
      .bjkl8popup
        van-popup(v-model='pop3')
          div
            ul
              li
                span 猜中
                span 单注最高奖金
              li
                span 3
                span
                  b 70.26
                  | 元
              li
                span 2
                span
                  b 7.02
                  | 元
            .popBut
              button(@click='pop3=!pop3') 确定
        van-popup(v-model='pop4')
          div
            ul
              li
                span 猜中
                span 单注最高奖金
              li
                span 4
                span
                  b 212.28
                  | 元
              li
                span 3
                span
                  b 15.02
                  | 元
              li
                span 2
                span
                  b 3.05
                  | 元
            .popBut
              button(@click='pop4=!pop4') 确定
        van-popup(v-model='pop5')
          div
            ul
              li
                span 猜中
                span 单注最高奖金
              li
                span 5
                span
                  b 1007.86
                  | 元
              li
                span 4
                span
                  b 53.75
                  | 元
              li
                span 3
                span
                  b 7.74
                  | 元
            .popBut
              button(@click='pop5=!pop5') 确定
        van-popup(v-model='pop6')
          div
            ul
              li
                span 猜中
                span 单注最高奖金
              li
                span 6
                span
                  b 3779.51
                  | 元
              li
                span 5
                span
                  b 157.47
                  | 元
              li
                span 4
                span
                  b 17.08
                  | 元
              li
                span 3
                span
                  b 3.75
                  | 元
            .popBut
              button(@click='pop6=!pop6') 确定
        van-popup(v-model='pop7')
          div
            ul
              li
                span 猜中
                span 单注最高奖金
              li
                span 7
                span
                  b 15981.93
                  | 元
              li
                span 6
                span
                  b 532.73
                  | 元
              li
                span 5
                span
                  b 45.14
                  | 元
              li
                span 4
                span
                  b 7.47
                  | 元
              li
                span 0
                span
                  b 3.20
                  | 元
            .popBut
              button(@click='pop7=!pop7') 确定
      cart(:cart='con,selected', ref='cart')
</template>
<script>
export default {
  data() {
    return {
      i: 1, //动画
      j: 1,
      k: 1,
      l: 1,
      h: 1,
      q: 1,
      w: 1,
      e: 1,
      r: 1,
      t: 1,
      shownum: false,
      startyet: false,
      interval: null, //动画
      youdashuang: false, //判断是否有‘大双’
      showTimesUp: false,
      showpop: false, //弹窗
      content: "提示内容!", //弹窗内容
      bet: false, //投注弹窗
      betsuccess: false,
      betGoshow: false,
      show: false, //头部中间
      showa: false, //头部右
      showan: 0, //头部右数字
      titles: "两面盘 龙虎",
      intotitle: "",
      itemstitle: "复式",
      listname: "北京",
      lotteryId: "pk10",
      LotteryList: "",
      money: 1, //投注金额
      displayBonus: 1.96,
      displayBonus1: 0,
      displayBonus2: 0,
      displayBonus3: "",
      amount: 0, //总金额
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
      jn: "",
      con: "",
      zhu: 0,
      rates: 0, //最高可中
      groupId: "",
      playBonus: "", //玩法树1
      playGroups: "", //玩法树2
      pk10star2dj: true,
      playGroupsId: "pk10_side_lh", //点击选中后获取此玩法ID
      betsscContentTopPop: false,
      getPastOpens: "", //获取过去开奖号码10个
      getPastO: "", //获取过去开奖号码1个
      seasonId: "", //截取后的期号
      seasonId2: "", //当前期号
      seasonId3: "",
      lastSeasonId: "",
      countDown: "",
      players: "",
      intotitle: "",
      navlist: 0,
      navlistb: 0,
      navlistf: 0,
      cacheTime: 60000,
      splayGroups: [],
      sgroups: [], //
      sgroups2: [], //
      splayers: [], //
      snumView: [], //
      snums: "", //
      timer: "",
      timer2: "",
      historyNum: 0
    };
  },
  destroyed() {
    this.endCount();
    this.iscreat();
  },
  created() {
    this.getLotteryList();
  },
  mounted() {
    if (!this.$route.meta.isBack) {
      this.getPlayTree();
      this.geteServerTime(); //获取彩種當前獎期時間
    }
    this.$route.meta.isBack = false;
  },
  watch: {
    money(newVal) {
      if (this.money === "") {
        setTimeout(() => {
          if (this.money === "") {
            this.money = 1;
          }
        }, 1000);
      } else {
        this.money = parseInt(newVal);
      }
    }
  },
  methods: {
    //返回到上一次进来的页面
    banckto() {
      this.$router.push(this.$store.state.historyNum);
    },
    //查看更多记录
    lookAll() {
      this.$router.push({
        path: "second/past",
        query: {
          id: this.$route.query.id,
          name: this.$route.query.name,
          group: this.groupId
        }
      });
    },
    //筛子动画
    start() {
      var _this = this;
      this.startyet = true;
      this.interval = setInterval(function() {
        _this.i = Math.floor(Math.random() * 10 + 1);
        _this.j = Math.floor(Math.random() * 10 + 1);
        _this.k = Math.floor(Math.random() * 10 + 1);
        _this.l = Math.floor(Math.random() * 10 + 1);
        _this.h = Math.floor(Math.random() * 10 + 1);
        _this.q = Math.floor(Math.random() * 10 + 1);
        _this.w = Math.floor(Math.random() * 10 + 1);
        _this.e = Math.floor(Math.random() * 10 + 1);
        _this.r = Math.floor(Math.random() * 10 + 1);
        _this.t = Math.floor(Math.random() * 10 + 1);
      }, 39);
    },
    end() {
      var _this = this;
      clearInterval(this.interval);
    },
    endCount() {
      clearInterval(this.timer);
      clearTimeout(this.timer2);
    },
    //中间->投注选号
    curBalls(indexff, indexg, num, numViews, player) {
      num.choose = !num.choose;
      if (num.choose === true) {
        this.d[indexg] = num.ball;
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.con = this.dd.join(",");
        this.zhu++;
        if (this.con.indexOf("大") !== -1 || this.con.indexOf("双") !== -1) {
          this.youdashuang = true;
        } else if (
          this.con.indexOf("大") === -1 ||
          this.con.indexOf("双") === -1
        ) {
          this.youdashuang = false;
        }
        this.pk10_boxjia(indexff, indexg, num, numViews, player);
      } else if (num.choose === false) {
        this.d.splice(indexg, 1, "");
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.con = this.dd.join(",");
        this.zhu--;
        if (this.con.indexOf("大") !== -1 || this.con.indexOf("双") !== -1) {
          this.youdashuang = true;
        } else if (
          this.con.indexOf("大") === -1 ||
          this.con.indexOf("双") === -1
        ) {
          this.youdashuang = false;
        }
        this.pk10_boxjian(indexff, indexg, num, numViews, player);
      }
    },
    // ++++
    pk10_boxjia(indexff, indexg, num, numViews, player) {
      //两面盘，龙虎
      if (this.playGroupsId === "pk10_side_lh") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = "[1V10]" + this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = "[2V9]" + this.dd.join("");
        }
        if (indexff === 2) {
          this.kc[indexg] = num.ball;
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = "[3V8]" + this.dd.join("");
        }
        if (indexff === 3) {
          this.kd[indexg] = num.ball;
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = "[4V7]" + this.dd.join("");
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = "[5V6]" + this.dd.join("");
        }
        if (this.an === "") {
          this.an = "-";
        }
        if (this.bn === "") {
          this.bn = "-";
        }
        if (this.cn === "") {
          this.cn = "-";
        }
        if (this.dn === "") {
          this.dn = "-";
        }
        if (this.en === "") {
          this.en = "-";
        }
        this.con =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en;
      }
      //两面盘，大小
      if (this.playGroupsId === "pk10_side_ds") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc[indexg] = num.ball;
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd[indexg] = num.ball;
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = this.dd.join("");
        }
        if (indexff === 5) {
          this.kf[indexg] = num.ball;
          this.dd = this.kf.filter(function(n) {
            return n;
          });
          this.fn = this.dd.join("");
        }
        if (indexff === 6) {
          this.kg[indexg] = num.ball;
          this.dd = this.kg.filter(function(n) {
            return n;
          });
          this.gn = this.dd.join("");
        }
        if (indexff === 7) {
          this.kh[indexg] = num.ball;
          this.dd = this.kh.filter(function(n) {
            return n;
          });
          this.hn = this.dd.join("");
        }
        if (indexff === 8) {
          this.ki[indexg] = num.ball;
          this.dd = this.ki.filter(function(n) {
            return n;
          });
          this.in = this.dd.join("");
        }
        if (indexff === 9) {
          this.kj[indexg] = num.ball;
          this.dd = this.kj.filter(function(n) {
            return n;
          });
          this.jn = this.dd.join("");
        }
        if (this.an === "") {
          this.an = "-";
        }
        if (this.bn === "") {
          this.bn = "-";
        }
        if (this.cn === "") {
          this.cn = "-";
        }
        if (this.dn === "") {
          this.dn = "-";
        }
        if (this.en === "") {
          this.en = "-";
        }
        if (this.fn === "") {
          this.fn = "-";
        }
        if (this.gn === "") {
          this.gn = "-";
        }
        if (this.hn === "") {
          this.hn = "-";
        }
        if (this.in === "") {
          this.in = "-";
        }
        if (this.jn === "") {
          this.jn = "-";
        }
        this.con =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en +
          "," +
          this.fn +
          "," +
          this.gn +
          "," +
          this.hn +
          "," +
          this.in +
          "," +
          this.jn;
      }
      //定位胆，前五
      if (this.playGroupsId === "pk10_star1_dwd") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc[indexg] = num.ball;
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd[indexg] = num.ball;
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = this.dd.join("");
        }
        if (this.an === "") {
          this.an = "-";
        }
        if (this.bn === "") {
          this.bn = "-";
        }
        if (this.cn === "") {
          this.cn = "-";
        }
        if (this.dn === "") {
          this.dn = "-";
        }
        if (this.en === "") {
          this.en = "-";
        }
        this.con =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en;
      }
      //定位胆，后五
      if (this.playGroupsId === "pk10_star1_dwd_last") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc[indexg] = num.ball;
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd[indexg] = num.ball;
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = this.dd.join("");
        }
        if (this.an === "") {
          this.an = "-";
        }
        if (this.bn === "") {
          this.bn = "-";
        }
        if (this.cn === "") {
          this.cn = "-";
        }
        if (this.dn === "") {
          this.dn = "-";
        }
        if (this.en === "") {
          this.en = "-";
        }
        this.con =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en;
      }
      //前二，冠亚和
      if (this.playGroupsId === "pk10_star2_and") {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.zhu = this.qianergyh(this.dd);
      }
      //前二、前三、前四、前五，复式
      if (
        this.playGroupsId === "pk10_star2" ||
        this.playGroupsId === "pk10_star3" ||
        this.playGroupsId === "pk10_star4" ||
        this.playGroupsId === "pk10_star5"
      ) {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc[indexg] = num.ball;
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd[indexg] = num.ball;
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = this.dd.join("");
        }
        if (this.playGroupsId === "pk10_star2") {
          this.con = this.an + "," + this.bn;
          this.zhu = this.fushi(this.con.split(","), 2);
        }
        if (this.playGroupsId === "pk10_star3") {
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.fushi(this.con.split(","), 3);
        }
        if (this.playGroupsId === "pk10_star4") {
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.zhu = this.fushi(this.con.split(","), 4);
        }
        if (this.playGroupsId === "pk10_star5") {
          this.con =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.zhu = this.fushi(this.con.split(","), 5);
        }
      }
      //猜前二、猜前三、猜前四、猜前五
      if (
        this.playGroupsId === "pk10_star2_dj" ||
        this.playGroupsId === "pk10_star3_dj" ||
        this.playGroupsId === "pk10_star4_dj" ||
        this.playGroupsId === "pk10_star5_dj"
      ) {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc[indexg] = num.ball;
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd[indexg] = num.ball;
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = this.dd.join("");
        }
        if (this.playGroupsId === "pk10_star2_dj") {
          this.con = this.an + "," + this.bn;
          this.zhu = this.fushi(this.con.split(","), 2);
        }
        if (this.playGroupsId === "pk10_star3_dj") {
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.fushi(this.con.split(","), 3);
        }
        if (this.playGroupsId === "pk10_star4_dj") {
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.zhu = this.fushi(this.con.split(","), 4);
        }
        if (this.playGroupsId === "pk10_star5_dj") {
          this.con =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.zhu = this.fushi(this.con.split(","), 5);
        }
      }
    },
    // ----
    pk10_boxjian(indexff, indexg, num, numViews, player) {
      //两面盘，龙虎
      if (this.playGroupsId === "pk10_side_lh") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = "[1V10]" + this.dd.join("");
          if (this.an == "" || this.an == "-" || this.an == "[1V10]") {
            this.an = this.dd.join("");
          }
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = "[2V9]" + this.dd.join("");
          if (this.bn == "" || this.bn == "-" || this.bn == "[2V9]") {
            this.bn = this.dd.join("");
          }
        }
        if (indexff === 2) {
          this.kc.splice(indexg, 1, "");
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = "[3V8]" + this.dd.join("");
          if (this.cn == "" || this.cn == "-" || this.cn == "[3V8]") {
            this.cn = this.dd.join("");
          }
        }
        if (indexff === 3) {
          this.kd.splice(indexg, 1, "");
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = "[4V7]" + this.dd.join("");
          if (this.dn == "" || this.dn == "-" || this.dn == "[4V7]") {
            this.dn = this.dd.join("");
          }
        }
        if (indexff === 4) {
          this.ke.splice(indexg, 1, "");
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = "[5V6]" + this.dd.join("");
          if (this.en == "" || this.en == "-" || this.en == "[5V6]") {
            this.en = this.dd.join("");
          }
        }
        if (this.an === "") {
          this.an = "-";
        }
        if (this.bn === "") {
          this.bn = "-";
        }
        if (this.cn === "") {
          this.cn = "-";
        }
        if (this.dn === "") {
          this.dn = "-";
        }
        if (this.en === "") {
          this.en = "-";
        }
        this.con =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en;
      }
      //两面盘，大小
      if (this.playGroupsId === "pk10_side_ds") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc.splice(indexg, 1, "");
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd.splice(indexg, 1, "");
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke.splice(indexg, 1, "");
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = this.dd.join("");
        }
        if (indexff === 5) {
          this.kf.splice(indexg, 1, "");
          this.dd = this.kf.filter(function(n) {
            return n;
          });
          this.fn = this.dd.join("");
        }
        if (indexff === 6) {
          this.kg.splice(indexg, 1, "");
          this.dd = this.kg.filter(function(n) {
            return n;
          });
          this.gn = this.dd.join("");
        }
        if (indexff === 7) {
          this.kh.splice(indexg, 1, "");
          this.dd = this.kh.filter(function(n) {
            return n;
          });
          this.hn = this.dd.join("");
        }
        if (indexff === 8) {
          this.ki.splice(indexg, 1, "");
          this.dd = this.ki.filter(function(n) {
            return n;
          });
          this.in = this.dd.join("");
        }
        if (indexff === 9) {
          this.kj.splice(indexg, 1, "");
          this.dd = this.kj.filter(function(n) {
            return n;
          });
          this.jn = this.dd.join("");
        }
        if (this.an === "") {
          this.an = "-";
        }
        if (this.bn === "") {
          this.bn = "-";
        }
        if (this.cn === "") {
          this.cn = "-";
        }
        if (this.dn === "") {
          this.dn = "-";
        }
        if (this.en === "") {
          this.en = "-";
        }
        if (this.fn === "") {
          this.fn = "-";
        }
        if (this.gn === "") {
          this.gn = "-";
        }
        if (this.hn === "") {
          this.hn = "-";
        }
        if (this.in === "") {
          this.in = "-";
        }
        if (this.jn === "") {
          this.jn = "-";
        }
        this.con =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en +
          "," +
          this.fn +
          "," +
          this.gn +
          "," +
          this.hn +
          "," +
          this.in +
          "," +
          this.jn;
      }
      //定位胆，前五
      if (this.playGroupsId === "pk10_star1_dwd") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc.splice(indexg, 1, "");
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd.splice(indexg, 1, "");
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke.splice(indexg, 1, "");
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = this.dd.join("");
        }
        if (this.an === "") {
          this.an = "-";
        }
        if (this.bn === "") {
          this.bn = "-";
        }
        if (this.cn === "") {
          this.cn = "-";
        }
        if (this.dn === "") {
          this.dn = "-";
        }
        if (this.en === "") {
          this.en = "-";
        }
        this.con =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en;
      }
      //定位胆，后五
      if (this.playGroupsId === "pk10_star1_dwd_last") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc.splice(indexg, 1, "");
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd.splice(indexg, 1, "");
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke.splice(indexg, 1, "");
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = this.dd.join("");
        }
        if (this.an === "") {
          this.an = "-";
        }
        if (this.bn === "") {
          this.bn = "-";
        }
        if (this.cn === "") {
          this.cn = "-";
        }
        if (this.dn === "") {
          this.dn = "-";
        }
        if (this.en === "") {
          this.en = "-";
        }
        this.con =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en;
      }
      //前二，冠亚和
      if (this.playGroupsId === "pk10_star2_and") {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.zhu = this.qianergyh(this.dd);
      }
      //前二，复式
      if (
        this.playGroupsId === "pk10_star2" ||
        this.playGroupsId === "pk10_star3" ||
        this.playGroupsId === "pk10_star4" ||
        this.playGroupsId === "pk10_star5"
      ) {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc.splice(indexg, 1, "");
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd.splice(indexg, 1, "");
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke.splice(indexg, 1, "");
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = this.dd.join("");
        }
        if (this.playGroupsId === "pk10_star2") {
          this.con = this.an + "," + this.bn;
          this.zhu = this.fushi(this.con.split(","), 2);
        }
        if (this.playGroupsId === "pk10_star3") {
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.fushi(this.con.split(","), 3);
        }
        if (this.playGroupsId === "pk10_star4") {
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.zhu = this.fushi(this.con.split(","), 4);
        }
        if (this.playGroupsId === "pk10_star5") {
          this.con =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.zhu = this.fushi(this.con.split(","), 5);
        }
      }
      //猜前二、猜前三、猜前四、猜前五
      if (
        this.playGroupsId === "pk10_star2_dj" ||
        this.playGroupsId === "pk10_star3_dj" ||
        this.playGroupsId === "pk10_star4_dj" ||
        this.playGroupsId === ""
      ) {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc.splice(indexg, 1, "");
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd.splice(indexg, 1, "");
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke.splice(indexg, 1, "");
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = this.dd.join("");
        }
        if (this.playGroupsId === "pk10_star2_dj") {
          this.con = this.an + "," + this.bn;
          this.zhu = this.fushi(this.con.split(","), 2);
        }
        if (this.playGroupsId === "pk10_star3_dj") {
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.fushi(this.con.split(","), 3);
        }
        if (this.playGroupsId === "pk10_star4_dj") {
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.zhu = this.fushi(this.con.split(","), 4);
        }
        if (this.playGroupsId === "pk10_star5_dj") {
          this.con =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.zhu = this.fushi(this.con.split(","), 5);
        }
      }
    },
    //前二-冠亚和
    qianergyh(bets) {
      let betCount = [2, 2, 4, 4, 6, 6, 8, 8, 10, 8, 8, 6, 6, 4, 4, 2, 2];
      let count = 0;
      for (let i = 0; i < bets.length; i++) {
        let a = bets[i];
        count += betCount[a - 3];
      }
      return count;
    },
    //公用
    toListByLength(str, len) {
      let line = [];
      if (str !== "-" || str !== "") {
        for (let i = 0; i < str.length; i += len) {
          line.push(str.substring(i, i + len));
        }
      }
      return line;
    },
    getCountall(lines) {
      return this.getCountCached(lines, 0, lines.length, new Set());
    },
    getCountCached(lines, index, allSize, cache) {
      let line = lines[index];
      let size = line.length;
      let count = 0;
      for (let i = 0; i < size; i++) {
        let n = line[i];
        if (!cache.has(n)) {
          if (index + 1 < allSize) {
            cache.add(n);
            count += this.getCountCached(lines, index + 1, allSize, cache);
            cache.delete(n);
          } else {
            count++;
          }
        }
      }
      return count;
    },
    //复式
    fushi(bets, zhu) {
      if (bets.length != zhu) {
        return 0;
      }
      let all = [];
      for (let i = 0; i < bets.length; i++) {
        let n = this.toListByLength(bets[i], 2);
        all.push(n);
      }
      let count = this.getCountall(all);
      return count;
    },

    //投注
    betGo() {
      this.betGoshow = false;
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true
      };
      let formData = new FormData();
      formData.append("order[0].content", this.con);
      formData.append("order[0].betCount", this.zhu);
      formData.append("order[0].price", this.money);
      formData.append("order[0].unit", 1);
      formData.append("order[0].playId", this.playGroupsId);
      formData.append("count", this.zhu);
      formData.append("traceOrders[0].price", this.money);
      formData.append("traceOrders[0].seasonId", this.seasonId2);
      formData.append("bounsType", 0);
      formData.append("traceWinStop", 0);
      formData.append("isTrace", 0);
      formData.append("lotteryId", this.$route.query.id);
      formData.append("amount", this.money * this.zhu);
      this.$axios
        .post(this.$store.state.url + "api/lottery/bet", formData, config)
        .then(res => {
          if (res.data.message === "success") {
            setTimeout(() => {
              this.showpop = !this.showpop;
              this.content = "投注成功!";
              this.iscreat();
              setTimeout(() => {
                this.showpop = false;
                this.betsuccess = !this.betsuccess;
              }, 100);
            }, 100);
          }
        })
        .catch(error => {
          console.log("投注No");
        });
    },
    //玩法树
    getPlayTree() {
      const now = new Date().getTime();
      if (localStorage.getItem("playTree_" + this.$route.query.id) !== null) {
        this.playBonus = JSON.parse(
          localStorage.getItem("playTree_" + this.$route.query.id)
        ).playBonus;
        this.playGroups = JSON.parse(
          localStorage.getItem("playTree_" + this.$route.query.id)
        ).playGroups;
        for (let i = 0; i < this.playGroups.length; i++) {
          this.splayGroups.push(this.playGroups[i]);
        }
        for (let j = 0; j < this.splayGroups.length; j++) {
          this.sgroups.push(this.splayGroups[j].groups);
        }
        for (let k = 0; k < this.sgroups.length; k++) {
          for (let j = 0; j < this.sgroups[k].length; j++) {
            this.sgroups2.push(this.sgroups[k][j]);
          }
        }
        for (let i = 0; i < this.sgroups2.length; i++) {
          this.splayers.push(this.sgroups2[i].players);
        }
        for (let h = 0; h < this.splayers.length; h++) {
          for (let i = 0; i < this.splayers[h].length; i++) {
            this.snumView.push(this.splayers[h][i].numView);
          }
        }
        this.displayBonus = this.splayers[0][0].displayBonus;
      } else if (
        localStorage.getItem("playTree_" + this.$route.query.id) === null
      ) {
        this.$http
          .get(this.$store.state.url + "api/lottery/getPlayTree", {
            params: { lotteryId: this.lotteryId }
          })
          .then(res => {
            this.playBonus = res.data.data.playBonus;
            this.playGroups = res.data.data.playGroups;
            localStorage.setItem(
              "playTree_" + this.$route.query.id,
              JSON.stringify(res.data.data)
            );
            localStorage.setItem("date_playTree_" + this.$route.query.id, now);
            for (let i = 0; i < this.playGroups.length; i++) {
              this.splayGroups.push(this.playGroups[i]);
            }
            for (let j = 0; j < this.splayGroups.length; j++) {
              this.sgroups.push(this.splayGroups[j].groups);
            }
            for (let k = 0; k < this.sgroups.length; k++) {
              for (let j = 0; j < this.sgroups[k].length; j++) {
                this.sgroups2.push(this.sgroups[k][j]);
              }
            }
            for (let i = 0; i < this.sgroups2.length; i++) {
              this.splayers.push(this.sgroups2[i].players);
            }
            for (let h = 0; h < this.splayers.length; h++) {
              for (let i = 0; i < this.splayers[h].length; i++) {
                this.snumView.push(this.splayers[h][i].numView);
              }
            }
            this.displayBonus = this.splayers[0][0].displayBonus;
          })
          .catch(error => {
            console.log("玩法树No");
          });
      }
    },
    // getPlayTree() {
    //   var now = new Date().getTime();
    //   //to check if localstorage exists
    //   console.log(localStorage.getItem("playTree_" + this.$route.query.id));
    //   if(localStorage.getItem("playTree_" + this.$route.query.id) !== null){
    //     var setupTime = localStorage.getItem("date_playTree_" + this.$route.query.id);

    //     if(null == setupTime || now-setupTime > this.cacheTime){
    //       localStorage.removeItem("playTree_" + this.$route.query.id);
    //       localStorage.removeItem("date_playTree_" + this.$route.query.id);

    //       this.$http.get(this.$store.state.url + "api/lottery/getPlayTree", {params: { lotteryId: this.$route.query.id }}).then(res => {
    //       this.setupPlayTree( JSON.parse(JSON.stringify(res.data.data)));
    //       //set to local storage
    //       localStorage.setItem("playTree_" + this.$route.query.id, JSON.stringify(res.data.data));
    //       localStorage.setItem("date_playTree_" + this.$route.query.id, now);
    //       })
    //       .catch(error => {
    //         console.log(error);
    //         this.$store.state.loginStatus = false;
    //         this.betshow = !this.betshow;
    //         this.content = "获取不成功!";
    //         setTimeout(() => {
    //           this.betshow = !this.betshow;
    //         }, 1300);
    //       });
    //     }
    //     else
    //       this.setupPlayTree(JSON.parse(localStorage.getItem("playTree_" + this.$route.query.id)));
    //   }
    //   else{
    //     this.$http.get(this.$store.state.url + "api/lottery/getPlayTree", {params: { lotteryId: this.$route.query.id }}).then(res => {
    //       this.setupPlayTree(JSON.parse(JSON.stringify(res.data.data)));
    //       console.log("開始塞玩法數localstorage")
    //       //set to local storage
    //       localStorage.setItem("playTree_" + this.$route.query.id, JSON.stringify(res.data.data));
    //       localStorage.setItem("date_playTree_" + this.$route.query.id, now);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       this.$store.state.loginStatus = false;
    //       this.betshow = !this.betshow;
    //       this.content = "获取不成功!";
    //       setTimeout(() => {
    //         this.betshow = !this.betshow;
    //         this.$router.push("/login");
    //       }, 1300);
    //     });
    //   }
    // },

    // setupPlayTree(resData){
    //   this.playBonus = resData.playBonus;
    //   this.playGroups = resData.playGroups;
    //   for (let i = 0; i < this.playGroups.length; i++) {
    //     this.splayGroups.push(this.playGroups[i])
    //   }
    //   for (let j = 0; j < this.splayGroups.length; j++) {
    //     if(this.navlist === j){
    //       this.sgroups.push(this.splayGroups[j].groups)
    //     }
    //   }
    //   for (let k = 0; k < this.sgroups.length; k++) {
    //     for (let j = 0; j < this.sgroups[k].length; j++) {
    //       this.sgroups2.push(this.sgroups[k][j])
    //     }
    //   }
    //   for (let i = 0; i < this.sgroups2.length; i++) {
    //     this.splayers.push(this.sgroups2[i].players)
    //   }
    //   for (let h = 0; h < this.splayers.length; h++) {
    //     for (let i = 0; i < this.splayers[h].length; i++) {
    //       this.snumView.push(this.splayers[h][i].numView)
    //     }
    //   }
    //   this.displayBonus = this.splayers[0][0].displayBonus
    // },

    //右上获取彩种
    getLotteryList() {
      if (localStorage.getItem("lotteryList") !== null) {
        this.LotteryList = JSON.parse(localStorage.getItem("lotteryList")).pk10;
        this.groupId = this.LotteryList[0].groupId;
        for (let i = 0; i < this.LotteryList.length; i++) {
          if (this.LotteryList[i].id === this.$route.query.id) {
            this.listname = this.LotteryList[i].name.substring(0, 2);
          }
        }
      } else {
        this.$http
          .get(this.$store.state.url + "api/lottery/getLotteryList")
          .then(res => {
            localStorage.setItem("lotteryList", JSON.stringify(res.data.data));
            this.LotteryList = res.data.data.pk10;
            this.groupId = this.LotteryList[0].groupId;
            for (let i = 0; i < this.LotteryList.length; i++) {
              if (this.LotteryList[i].id === this.$route.query.id) {
                this.listname = this.LotteryList[i].name.substring(0, 2);
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
      this.listname = into.name.substring(0, 2);
      this.lotteryId = into.id;
      this.showan = index;
      this.showa = !this.showa;
      this.$router.push({ query: { id: into.id } });
      this.getPlayTree(); //玩法术
      this.geteServerTime(); //获取彩種當前獎期時間
      this.iscreat();
      this.$router.push({
        query: {
          id: this.$route.query.id,
          name: into.name,
          group: this.groupId
        }
      });
    },
    //头部菜单项
    k3Tab(e, indexa, indexb, items, group, into, index) {
      this.titles = into.title + " " + items.title;
      this.navlist = index;
      this.show = !this.show;
      this.intotitle = into.title;
      this.itemstitle = items.title;
      this.playGroupsId = items.id;
      this.navlist = index;
      this.navlistb = indexa;
      this.navlistf = indexb;
      this.displayBonus = items.displayBonus;
      if (isNaN(this.displayBonus)) {
        let ar = [];
        ar = this.displayBonus.split("-");
        this.displayBonus1 = Number(ar[0]);
        this.displayBonus2 = Number(ar[1]);
        this.displayBonus3 = this.displayBonus1 + "-" + this.displayBonus2;
      }
      this.iscreat();
    },
    //查看注单
    looksucc() {
      this.$router.push({ path: "/bet" });
      this.betsuccess = !this.betsuccess;
    },
    //继续投注
    betsucc() {
      this.betsuccess = !this.betsuccess;
      this.iscreat();
    },
    //马上投注
    betC() {
      if (this.zhu <= 0) {
        this.betshow = !this.betshow;
        this.content = "请至少选择一注号码投注!";
      }
      if (this.money === "") {
        this.betshow = !this.betshow;
        this.content = "请填写您要投注的金额!";
      }
      if (this.zhu > 0 && this.money !== "") {
        this.betGoshow = !this.betGoshow;
      }
    },
    //清空
    iscreat() {
      this.zhu = "";
      this.money = 1;
      this.con = "";
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
      for (let i = 0; i < this.snumView.length; i++) {
        for (let j = 0; j < this.snumView[i].length; j++) {
          for (let k = 0; k < this.snumView[i][j].nums.length; k++) {
            this.snumView[i][j].nums[k].choose = false;
          }
        }
      }
    },
    betCancel() {
      this.betGoshow = !this.betGoshow;
    },
    //获取过去开奖号码10个
    getPastOp() {
      if (this.startyet == false) {
        this.start();
      }
      this.shownum = true;
      this.$http
        .get(this.$store.state.url + "api/lottery/getPastOpen", {
          params: { lotteryId: this.$route.query.id, count: 10 }
        })
        .then(res => {
          this.getPastOpens = res.data.data;
          if (Number(res.data.data[0].seasonId) !== Number(this.lastSeasonId)) {
            this.reGetPastOp();
          } else {
            clearTimeout(this.timer2);
            this.end();
            this.startyet = false;
            this.shownum = false;
          }
        })
        .catch(error => {
          console.log("获取过去开奖号码No");
        });
    },
    reGetPastOp() {
      clearTimeout(this.timer2);
      this.timer2 = setTimeout(() => {
        this.getPastOp();
      }, 10000);
    },
    //获取彩種當前獎期時間
    geteServerTime() {
      clearInterval(this.timer);
      clearTimeout(this.timer2);
      this.$http
        .get(this.$store.state.url + "api/lottery/getCurrentSaleTime", {
          params: { lotteryId: this.$route.query.id }
        })
        .then(res => {
          if (res.data.code === 1) {
            this.seasonId2 = res.data.data.seasonId;
            this.seasonId = this.seasonId2 * 1;
            this.seasonId3 = this.seasonId2 - 1;
            this.lastSeasonId = res.data.data.lastSeasonId;
            this.today = res.data.data.restSeconds;
            this.setTimeMode();
            this.getPastOp(); //获取过去开奖号码10个
            this.initSetTimeout();
          }
        })
        .catch(error => {
          console.log("获取彩種當前獎期時間No");
        });
    },
    //時間格式
    setTimeMode() {
      var hours = Math.floor((this.today % (1 * 60 * 60 * 24)) / (1 * 60 * 60));
      var minutes = Math.floor((this.today % (1 * 60 * 60)) / (1 * 60));
      var seconds = Math.floor((this.today % (1 * 60)) / 1);
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      this.countDown = hours + ":" + minutes + ":" + seconds;
    },
    //倒计时
    initSetTimeout(today) {
      this.timer = setInterval(() => {
        this.today = this.today - 1;
        this.setTimeMode();
        if (this.today < 1) {
          clearInterval(this.timer);
          this.timesUp();
        }
      }, 1000);
    },
    //時間到彈窗
    timesUp() {
      this.showTimesUp = !this.showTimesUp;
      this.geteServerTime();
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  // 保留三个小数,不四舍五入
  filters: {
    keepTwoNum(value) {
      value = parseInt(value * 100) / 100;
      return value;
    },
    keepThreeNum(value) {
      value = parseInt(value * 1000) / 1000;
      return value;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/lotter-list/lotterbet/betbj10.scss";
@import "../../../assets/scss/popcorn.scss";
</style>
<style>
.menu-list.van-popup {
  transition: 0s ease-out !important;
}
.van-popup--top {
  transition: 0s ease-out !important;
}
</style>