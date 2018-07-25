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
              span {{item}}
            | ...
        p
          | 888888投注：
          span
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
import cart from "../../public/cart";
export default {
  data() {
    return {
      selected: [], //已经选择的号码
      con: "", //转换成数字后的号码
      choose1: 1, //号码选中状态
      choose2: "", //号码选中状态
      show: false,
      show1: false,
      lottery: true,
      pop3: false,
      pop4: false,
      pop5: false,
      pop6: false,
      pop7: false,
      navs: 0,
      renxuanlist: 0,
      quweilist: 0,
      titles: "任选一",
      annotation: [
        {
          title:
            "从01-80中选择1个号码组成一注，当期开奖结果的20个号码中包含所选号码，即可中奖。"
        },
        {
          title:
            "从01-80中选择2-8个号码，当期开奖结果的20个号码中包含所选号码中的两个，即可中奖。"
        },
        {
          title:
            "从01-80中选择3-8个号码，当期开奖结果的20个号码中包含所选号码中的三个，即可中奖。"
        },
        {
          title:
            "从01-80中选择4-8个号码，当期开奖结果的20个号码中包含所选号码中的四个，即可中奖。"
        },
        {
          title:
            "从01-80中选择5-8个号码，当期开奖结果的20个号码中包含所选号码中的五个，即可中奖。"
        },
        {
          title:
            "从01-80中选择6-8个号码，当期开奖结果的20个号码中包含所选号码中的六个，即可中奖。"
        },
        {
          title:
            "从01-80中选择7-8个号码，当期开奖结果的20个号码中包含所选号码中的七个，即可中奖。"
        }
      ],
      renxuan: [
        {
          a: ["任选", "趣味"],
          valus: [
            "任选一",
            "任选二",
            "任选三",
            "任选四",
            "任选五",
            "任选六",
            "任选七"
          ]
        }
      ],
      quwei: ["上下盘", "奇偶盘", "和值大小单双"]
    };
  },
  methods: {
    menunav(event, index, muens) {
      if (muens) {
        this.navs = index;
      }
    },
    showrenxuan(e, item, index) {
      this.titles = item;
      this.renxuanlist = index;
      this.show = !this.show;
      this.con = "";
    },
    showquwei(event, item, index) {
      this.titles = item;
      this.quweilist = index;
      this.show = !this.show;
      this.con = "";
    },
    selecNumShang(e, shang, val) {
      switch (this.renxuanlist) {
        case 0:
          if (e.target.className.indexOf("choose1 active")) {
            e.target.className = "choose1 active"; //切换按钮样式
            this.selected.push(e.target.innerHTML);
          } else {
            e.target.className = "choose1";
            this.selected.pop(e.target.innerHTML);
          }
          this.selected = [...new Set(this.selected)]; //ES6去重
          this.con = this.selected.join(" ");
          return this.con;
          break;
        case 1:
          if (e.target.className.indexOf("choose1 active")) {
            e.target.className = "choose1 active"; //切换按钮样式
            this.selected.push(e.target.innerHTML);
          } else {
            e.target.className = "choose1";
            this.selected.pop(e.target.innerHTML);
          }
          this.selected = [...new Set(this.selected)]; //ES6去重
          this.con = this.selected.join(" ");
          return this.con;
      }
    },
    selecNumXia(e, xia, val) {
      switch (this.renxuanlist) {
        case 0:
          if (e.target.className.indexOf("choose2 active")) {
            e.target.className = "choose2 active"; //切换按钮样式
            this.selected.push(e.target.innerHTML);
          } else {
            e.target.className = "choose2";
            this.selected.pop(e.target.innerHTML);
          }
          this.selected = [...new Set(this.selected)]; //ES6去重
          this.con = this.selected.join(" ");
          return this.con;
          break;
        case 1:
          break;
      }
    }
  },
  components: {
    cart
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/lotter-list/lotterbet/betbjkl8.scss";
</style>