<template lang="jade">
.betbj10
  ul.betbj10-top
    li
      i.iconfont.icon-left(@click="banckto")
    li
      p.wangfa
        | 玩
        br
        | 法
      .menu(@click='show = !show')
        | {{titles}}
        i.iconfont(:class="show ? 'icon-up' : 'icon-down'")
      .menu-list
        van-popup(v-model='show', position='top')
          .popscroll
            ul.menu-list-top
              li(v-for='(into,index) in playGroups', :key='index')
                .title {{into.title}}
                .menu-list-list-box
                  .menu-list-list(v-for='(group,indexa) in into.groups', :key='indexa')
                    span(v-for='(player,indexb) in group.players', :key='indexb', @click='k3Tab($event,indexa,indexb,player,group,into,index)')
                      a {{player.groupName}}{{player.title}}
    li.betbj10list
      span(@click='showa = !showa') {{listname}}
      i.iconfont(:class="showa ? 'icon-up' : 'icon-down' ", @click='showa = !showa')
      van-popup(v-model=' showa', position='top')
        ul
          li(v-for='(listk3,index) in LotteryList', :key='index', @click='listnames($event,index,listk3)')
            a {{listk3.name}}
  .lookAllDiv(v-show='lookAllUl')
    p.lookAllDivTitle
      i.iconfont.icon-left(@click='lookAllDivTitle')
      b.cont 查看更多
      span
    .lookAllUlBox
      ul.lookAllUl
        li
          p 期号
          p 开奖号码
        li(v-for='(item,index) in getPastOpens', :key='index')
          p(v-if="$route.query.id === 'pk10'")
            | {{item.seasonId}}
            i.iconfont.icon-plus-minus
          p(v-else)
            | {{item.seasonId.substring(4).split("-").join("")*1}}
            i.iconfont.icon-plus-minus
          p
            a {{item.n1 < 10 ? '0'+item.n1 : item.n1}}
            a {{item.n2 < 10 ? '0'+item.n2 : item.n2}}
            a {{item.n3 < 10 ? '0'+item.n3 : item.n3}}
            a {{item.n4 < 10 ? '0'+item.n4 : item.n4}}
            a {{item.n5 < 10 ? '0'+item.n5 : item.n5}}
            a {{item.n6 < 10 ? '0'+item.n6 : item.n6}}
            a {{item.n7 < 10 ? '0'+item.n7 : item.n7}}
            a {{item.n8 < 10 ? '0'+item.n8 : item.n8}}
            a {{item.n9 < 10 ? '0'+item.n9 : item.n9}}
            a {{item.n10 < 10 ? '0'+item.n10 : item.n10}}
  .betbj10-content
    div(v-show='!show')
      .betk3-content-top
        .content-left(@click=' betsscContentTopPop = !betsscContentTopPop')
          p(v-if="$route.query.id === 'pk10'") {{lastSeasonId*1}}期开奖号码
          p(v-else) {{lastSeasonId !== '' ? lastSeasonId.slice(4)*1 : lastSeasonIds}}期开奖号码
            i.iconfont(:class="betsscContentTopPop ? 'icon-up' : 'icon-down'")
          div(v-if="shownum === false")
            p {{n1 < 10 ? '0'+n1 : n1}}
            p {{n2 < 10 ? '0'+n2 : n2}}
            p {{n3 < 10 ? '0'+n3 : n3}}
            p {{n4 < 10 ? '0'+n4 : n4}}
            p {{n5 < 10 ? '0'+n5 : n5}}
            p {{n6 < 10 ? '0'+n6 : n6}}
            p {{n7 < 10 ? '0'+n7 : n7}}
            p {{n8 < 10 ? '0'+n8 : n8}}
            p {{n9 < 10 ? '0'+n9 : n9}}
            p {{n10 < 10 ? '0'+n10 : n10}}
          .contnet-left-num(v-if="shownum === true && isGetItem === true")
            .num
              .span
                transition(name='down-up-translate-fade')
                  div {{i}}
              .span
                transition(name='down-up-translate-fade')
                  div {{j}}
              .span
                transition(name='down-up-translate-fade')
                  div {{k}}
              .span
                transition(name='down-up-translate-fade')
                  div {{l}}
              .span
                transition(name='down-up-translate-fade')
                  div {{h}}
              .span
                transition(name='down-up-translate-fade')
                  div {{q}}
              .span
                transition(name='down-up-translate-fade')
                  div {{w}}
              .span
                transition(name='down-up-translate-fade')
                  div {{e}}
              .span
                transition(name='down-up-translate-fade')
                  div {{r}}
              .span
                transition(name='down-up-translate-fade')
                  div {{t}}
        .content-right(@click='tolooksucc')
          div
            p.seasonId(v-if="$route.query.id === 'pk10'") {{seasonId}}期投注截止
            p.seasonId(v-else) {{seasonId2 !== '' ? seasonId2.slice(4)*1 : Number(lastSeasonIds)+1}}期投注截止
            .time
              p {{countDown !== '' ? countDown : "00:00:00"}}
          i.iconfont.icon-sanjiaoleft
      .betk3-content-top-pop(v-show='betsscContentTopPop')
        ul.look
          li
            p 期号
            p 开奖号码
          li(v-for='(item,index) in getPastOpens', :key='index', v-if='index < 10')
            p(v-if="$route.query.id === 'pk10'")
              | {{item.seasonId}}
              i.iconfont.icon-plus-minus
            p(v-else)
              | {{item.seasonId.substring(4).split("-").join("")*1}}
              i.iconfont.icon-plus-minus
            p
              a {{item.n1 < 10 ? '0'+item.n1 : item.n1}}
              a {{item.n2 < 10 ? '0'+item.n2 : item.n2}}
              a {{item.n3 < 10 ? '0'+item.n3 : item.n3}}
              a {{item.n4 < 10 ? '0'+item.n4 : item.n4}}
              a {{item.n5 < 10 ? '0'+item.n5 : item.n5}}
              a {{item.n6 < 10 ? '0'+item.n6 : item.n6}}
              a {{item.n7 < 10 ? '0'+item.n7 : item.n7}}
              a {{item.n8 < 10 ? '0'+item.n8 : item.n8}}
              a {{item.n9 < 10 ? '0'+item.n9 : item.n9}}
              a {{item.n10 < 10 ? '0'+item.n10 : item.n10}}
        p.lookAll
          button(@click='lookAll') 查看更多
          button(@click='lookAllTo') 往期开奖
      .betk3-content-foot
        div(v-for='(item,indexc) in playGroups', :key='indexc', v-show='indexc === navlist')
          .betssc-list-box(v-for='(group,indexd) in item.groups', :key='indexd', v-show='indexd === navlistb')
            span(v-for='(itemabc,indexabc) in playBonus', :key='indexabc', v-show='itemabc.id === playGroupsId')
              | {{itemabc.remark}}
              b
                | 。奖金
                i(v-show='Number(itemabc.displayBonus)') {{itemabc.displayBonus | keepTwoNum}}
                i(v-show='isNaN(itemabc.displayBonus)') {{displayBonus1 | keepTwoNum}}—{{displayBonus2 | keepTwoNum}}
                |  元
              br
            ul.fushi
              li(v-for='(player,indexf) in group.players', :key='indexf', v-show='playGroupsId === player.id')
                p(v-for='(numViews,indexff) in player.numView', :key='indexff')
                  b {{numViews.title}}
                  span
                    a(v-for='(num,indexg) in numViews.nums', :key='indexg', :class="num.choose ? 'active' : '' ", @click='curBalls(indexff,indexg,num,numViews,player)') {{num.ball}}
  .betbj10-footer
    .betbj10-footer-top(v-show='zhu > 0')
      .betbj10-footer-tops
        p 当前选号
        span {{con}}
      .betbj10-footer-buttoms
        p 每注金额
        input(type='number', v-model='money', onfocus='this.select()')
        span(v-show="money === '' ") 请输入要投注的金额
        span(v-show="money !== '' && playGroupsId !== 'pk10_star2_dj' && playGroupsId !== 'pk10_star3_dj' && playGroupsId !== 'pk10_star4_dj' && playGroupsId !== 'pk10_star5_dj'")
          | 单注最高可中
          p(v-show='! isNaN(money*displayBonus)') {{(money*parseInt(displayBonus*1000))/1000 | keepTwoNum}}
          p(v-show='isNaN(money*displayBonus)')
            | {{youdashuang ? (money*parseInt(displayBonus2*1000))/1000 : (money*parseInt(displayBonus1*1000))/1000 | keepTwoNum}}
          | 元
    .betbj10-footer-buttom
      .betbj10-footer-buttom-left
        button(@click='iscreat') 清空
        p
          span(v-if='zhu >0') 共{{zhu}}注,
          span(v-if="this.money !== '' ") 共{{zhu*money}}元
      .betbj10-footer-buttom-right(@click='betC', v-show='betnot') 马上投注
  .betcBox(v-show='betGoshow')
    ul.betc(v-show='betGoshow')
      li 投注确认
      li
        p
          span {{listname}}PK10 ：
          | {{seasonId}}期
        p
          span 投注金额：
          b {{money*zhu}}元
        p
          span 投注内容：
          span.popcon {{con}}
      li
        button(@click='betCancel') 取消
        button(@click='betGo') 确定
  .betcBox(v-show='betsuccess')
    ul.betc(v-show='betsuccess')
      li 温馨提示！
      li
        p
          b 投注成功,
          span 您可以在我的账户查看注单详情
      li
        button(@click='looksucc') 查看注单
        button(@click='betsucc') 继续投注
  van-popup.pop2(v-model='betfail', :close-on-click-overlay='false')
    div
      ul
        .title
          p 温馨提示！
        .cont
          p
            b 投注失败,
            br
            | 请检查您的连线
        .but
          button.nodel(@click='betfail = ! betfail') 确定
  van-popup.pop2(v-model='showTimesUp', :close-on-click-overlay='false')
    div
      ul
        .title
          p 温馨提示！
        .cont
          p(v-if="$route.query.id === 'pk10'")
            | {{lastSeasonId*1}}期已截止
            br
            | 当前期号{{seasonId}}
            br
            | 投注时请注意期号
          p(v-else)
            | {{lastSeasonId.slice(4)*1}}期已截止
            br
            | 当前期号{{seasonId2.slice(4)*1}}
            br
            | 投注时请注意期号
        .but
          button.nodel(@click='showTimesUp = ! showTimesUp') 确定
  van-popup.betshow(v-model='showpop') {{content}}
  bets(ref='pop')
</template>
<script>
import bets from '../../page-five/money/bets.vue';
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
      n1: 1, //动画
      n2: 1,
      n3: 1,
      n4: 1,
      n5: 1,
      n6: 1,
      n7: 1,
      n8: 1,
      n9: 1,
      n10: 1,
      looks:false,
      shwoBet:false,
      lookAllUl:false,
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
      money: "", //投注金额
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
      getPastOpenB: "", //获取过去开奖号码第一个
      getPastO: "", //获取过去开奖号码1个
      seasonId: "", //截取后的期号
      seasonId2: "", //当前期号
      seasonId3: "",
      lastSeasonId: "",
      lastSeasonIds: "",
      isGetItem:false,
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
      historyNum: 0,
      betnot:true,
      betfail:false,
    };
  },
  destroyed() {
    this.endCount();
    this.iscreat();
  },
  created() {
    this.noGetItem();
    this.getLotteryList();
    this.endCount();
  },
  mounted() {
    this.endCount();
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
            this.money = "";
          }
        }, 1000);
      } else {
        this.money = parseInt(newVal);
      }
    }
  },
  methods: {
    //没打接口前
    noGetItem(){
      if(this.startyet == false){
        this.start();
        this.initSetTimeout();
        this.isGetItem = true;
        this.shownum = true;
        let myDate = new Date();
        let getMonth = myDate.getMonth()+1;
        let getDate = myDate.getDate();
        let getHours = myDate.getHours()*60;
        let getMinutes = myDate.getMinutes();
        let getHM = getHours+getMinutes;
        if(getHM < 1000){
          getHM = "0"+getHM;
        }
        this.lastSeasonIds = getMonth+getDate.toString()+getHM;
      }else{
        this.end();
        this.isGetItem = false;
        this.shownum = false;
      }
    },
    //返回到上一次进来的页面
    banckto() {
      this.$router.push(this.$store.state.historyNum);
    },
    //查看20条记录
    lookAll() {
      this.betsscContentTopPop = !this.betsscContentTopPop;
      this.lookAllUl = !this.lookAllUl;
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
    lookAllDivTitle() {
      this.lookAllUl = !this.lookAllUl;
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
        this.con =this.an +"," +this.bn +"," +this.cn +"," +this.dn +"," +this.en;
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
        this.playGroupsId === "pk10_star5") {
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
        this.playGroupsId === "pk10_star5_dj") {
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
        this.playGroupsId === "pk10_star5") {
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
        this.playGroupsId === "pk10_star5_dj") {
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
      this.betnot = false;
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
      this.iscreat();
      this.$axios
        .post(this.$store.state.url + "api/lottery/bet", formData, config)
        .then(res => {
          if (res.data.message === "success") {
            setTimeout(() => {
              this.showpop = !this.showpop;
              this.content = "投注成功!";
              this.betnot = true;
              this.iscreat();
              setTimeout(() => {
                this.showpop = false;
                this.betsuccess = !this.betsuccess;
              }, 600);
            }, 0);
          } else {
              this.betnot = true;
              this.iscreat();
          }
        })
        .catch(error => {
          console.log("投注No");
          this.iscreat();
          this.betfail = true;
          this.betnot = true;
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
        this.$axios
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
        this.$axios
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
    tolooksucc(){
      this.looks = !this.looks;
      this.$refs.pop.banckto();
      this.$refs.pop.getTradeList();
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
      this.money = "";
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
      for (let h = 0; h < this.snumView.length; h++) {
        if (null != this.snumView[h]) {
          for (let j = 0; j < this.snumView[h].length; j++) {
            for (let k = 0; k < this.snumView[h][j].nums.length; k++) {
              this.snumView[h][j].nums[k].choose = false;
            }
          }
        }
      }
    },
    betCancel() {
      this.betGoshow = !this.betGoshow;
    },
    //获取彩種當前獎期時間
    geteServerTime() {
      clearInterval(this.timer);
      clearTimeout(this.timer2);
      this.$axios
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
    //時間格式轉換
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
        if(this.getPastOpenB[0].seasonId !== this.lastSeasonId && this.today === 47){
          this.getPastOp();
        }else if(this.getPastOpenB[0].seasonId !== this.lastSeasonId && this.today === 46){
          this.getPastOp();
        }else if(this.getPastOpenB[0].seasonId !== this.lastSeasonId && this.today === 45){
          this.getPastOp();
        }
      }, 1000);
    },
    //時間到彈窗
    timesUp() {
      this.showTimesUp = !this.showTimesUp;
      setTimeout(() => {
        this.showTimesUp = false;
      },3000);
      this.geteServerTime();
    },
    //获取过去开奖号码20个
    getPastOp() {
      if (this.startyet == false) {
        this.start();
      }
      this.shownum = true;
      this.$axios
        .get(this.$store.state.url + "api/lottery/getPastOpen", {
          params: { lotteryId: this.$route.query.id, count: 20 }
        })
        .then(res => {
          this.getPastOpens = res.data.data;
          this.getPastOpenB = res.data.data;
          this.n1 = this.getPastOpens[0].n1;
          this.n2 = this.getPastOpens[0].n2;
          this.n3 = this.getPastOpens[0].n3;
          this.n4 = this.getPastOpens[0].n4;
          this.n5 = this.getPastOpens[0].n5;
          this.n6 = this.getPastOpens[0].n6;
          this.n7 = this.getPastOpens[0].n7;
          this.n8 = this.getPastOpens[0].n8;
          this.n9 = this.getPastOpens[0].n9;
          this.n10 = this.getPastOpens[0].n10;
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
      }, 12000);
    },
  },
  components:{
    bets
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
<style lang="scss" scoped>
.menu-list.van-popup {
  transition: 0s ease-out !important;
}
.van-popup--top {
  transition: 0s ease-out !important;
}
</style>