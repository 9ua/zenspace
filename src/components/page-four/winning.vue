<template lang="jade">
.winning
  ul(v-show='showFlag')
    li(v-for='(item,index) in winpool', :key='index', v-show='index <10')
      .winning-left
        img(:src='item.paths')
        .winning-xq
          p
            span {{item.name | capitalize}}
            span 在{{item.lotterylist}}
          p
            span 喜中
            span ￥{{item.money | keepTwoNum}}
      .winning-right
  pop(:pop='selectedFood', @sonclick='haashow', ref='pop')
</template>
<script>
import pop from "./pop";
import index from "vue";
export default {
  data() {
    return {
      b: 0,
      haa: [
        {
          name: "william",
          money: 95.08,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/16.jpg")
        },
        {
          name: "daniel",
          money: 1238.654,
          lotterylist: "安徽快3",
          paths: require("../../../static/images/13.jpg")
        },
        {
          name: "stanjklfdsa",
          money: 853.66,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/1.jpg")
        },
        {
          name: "james",
          money: 452.442,
          lotterylist: "北京赛车",
          paths: require("../../../static/images/12.jpg")
        },
        {
          name: "noah",
          money: 45.244,
          lotterylist: "北京赛车",
          paths: require("../../../static/images/0.jpg")
        },
        {
          name: "samuel",
          money: 85.17,
          lotterylist: "上海快3",
          paths: require("../../../static/images/7.jpg")
        },
        {
          name: "david",
          money: 132.04,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/9.jpg")
        },
        {
          name: "sophia",
          money: 158.25,
          lotterylist: "上海快3",
          paths: require("../../../static/images/21.jpg")
        },
        {
          name: "anthony",
          money: 458.23,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/31.jpg")
        },
        {
          name: "elizabeth",
          money: 5499.08,
          lotterylist: "北京快3",
          paths: require("../../../static/images/6.jpg")
        },
        {
          name: "christian",
          money: 77.654,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/15.jpg")
        },
        {
          name: "brandon",
          money: 856.07,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/1.jpg")
        },
        {
          name: "zachary",
          money: 1207.654,
          lotterylist: "上海快3",
          paths: require("../../../static/images/10.jpg")
        },
        {
          name: "jessica,",
          money: 21.36,
          lotterylist: "北京快3",
          paths: require("../../../static/images/2.jpg")
        },
        {
          name: "robert",
          money: 31.55,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/3.jpg")
        },
        {
          name: "Justin",
          money: 31.55,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/8.jpg")
        },
        {
          name: "Hunter",
          money: 1587.24,
          lotterylist: "湖北快3",
          paths: require("../../../static/images/5.jpg")
        },
        {
          name: "Victoria",
          money: 13.14,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/4.jpg")
        },
        {
          name: "ttqwera",
          money: 4524.28,
          lotterylist: "湖北快3",
          paths: require("../../../static/images/7.jpg")
        },
        {
          name: "adfas",
          money: 7452.0,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/16.jpg")
        },
        {
          name: "Jasmine",
          money: 8532.66,
          lotterylist: "广西快3",
          paths: require("../../../static/images/1.jpg")
        },
        {
          name: "霍去病",
          money: 9535.03,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/8.jpg")
        },
        {
          name: "fdsawqg",
          money: 156877.1,
          lotterylist: "广西快3",
          paths: require("../../../static/images/17.jpg")
        },
        {
          name: "gfukhgj",
          money: 1563.2,
          lotterylist: "江苏快3",
          paths: require("../../../static/images/6.jpg")
        },
        {
          name: "dfhteuj",
          money: 15687.88,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/9.jpg")
        },
        {
          name: "辛弃疾",
          money: 21.36,
          lotterylist: "江苏快3",
          paths: require("../../../static/images/10.jpg")
        },
        {
          name: "ytmioi",
          money: 89.12,
          lotterylist: "甘肃快3",
          paths: require("../../../static/images/1.jpg")
        },
        {
          name: "nkkrtuy",
          money: 7552.12,
          lotterylist: "安徽快3",
          paths: require("../../../static/images/3.jpg")
        },
        {
          name: "hfdw6mm",
          money: 1356.16,
          lotterylist: "吉林快3",
          paths: require("../../../static/images/2.jpg")
        },
        {
          name: "ksfgfdsg",
          money: 1535.0,
          lotterylist: "北京赛车",
          paths: require("../../../static/images/6.jpg")
        },
        {
          name: "ewdghtr",
          money: 15687.88,
          lotterylist: "新疆时时彩",
          paths: require("../../../static/images/15.jpg")
        },
        {
          name: "rey",
          money: 26.12,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/7.jpg")
        },
        {
          name: "Joey",
          money: 12.04,
          lotterylist: "新疆时时彩",
          paths: require("../../../static/images/8.jpg")
        },
        {
          name: "John",
          money: 138.32,
          lotterylist: "河北快3",
          paths: require("../../../static/images/9.jpg")
        },
        {
          name: "Nathan",
          money: 853482.66,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/1.jpg")
        },
        {
          name: "Stan",
          money: 85000,
          lotterylist: "重庆时时彩",
          paths: require("../../../static/images/10.jpg")
        },
        {
          name: "Jason",
          money: 1238.654,
          lotterylist: "北京快3",
          paths: require("../../../static/images/9.jpg")
        },
        {
          name: "Tino",
          money: 85000,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/6.jpg")
        },
        {
          name: "Stephen",
          money: 85000,
          lotterylist: "新疆时时彩",
          paths: require("../../../static/images/3.jpg")
        },
        {
          name: "Neo",
          money: 6120,
          lotterylist: "宏發时时彩",
          paths: require("../../../static/images/18.jpg")
        },
        {
          name: "来fsadfsl",
          money: 6120,
          lotterylist: "宏發pk10",
          paths: require("../../../static/images/28.jpg")
        },
        {
          name: "F不来钱",
          money: 6120,
          lotterylist: "广西快3",
          paths: require("../../../static/images/32.jpg")
        },
        {
          name: "k12234",
          money: 6120,
          lotterylist: "宏發pk10",
          paths: require("../../../static/images/22.jpg")
        }
      ],
      selectedFood: {},
      winpool: [
        {
          name: "william",
          money: 95.08,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/16.jpg")
        },
        {
          name: "daniel",
          money: 1238.654,
          lotterylist: "安徽快3",
          paths: require("../../../static/images/13.jpg")
        },
        {
          name: "stanjklfdsa",
          money: 853.66,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/1.jpg")
        },
        {
          name: "james",
          money: 452.442,
          lotterylist: "北京赛车",
          paths: require("../../../static/images/12.jpg")
        },
        {
          name: "noah",
          money: 45.244,
          lotterylist: "北京赛车",
          paths: require("../../../static/images/0.jpg")
        },
        {
          name: "samuel",
          money: 85.17,
          lotterylist: "上海快3",
          paths: require("../../../static/images/7.jpg")
        },
        {
          name: "david",
          money: 132.04,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/9.jpg")
        },
        {
          name: "sophia",
          money: 158.25,
          lotterylist: "上海快3",
          paths: require("../../../static/images/21.jpg")
        },
        {
          name: "anthony",
          money: 458.23,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/31.jpg")
        },
        {
          name: "elizabeth",
          money: 5499.08,
          lotterylist: "北京快3",
          paths: require("../../../static/images/6.jpg")
        },
        {
          name: "christian",
          money: 77.654,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/15.jpg")
        },
        {
          name: "brandon",
          money: 856.07,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/1.jpg")
        },
        {
          name: "zachary",
          money: 1207.654,
          lotterylist: "上海快3",
          paths: require("../../../static/images/10.jpg")
        },
        {
          name: "jessica,",
          money: 21.36,
          lotterylist: "北京快3",
          paths: require("../../../static/images/2.jpg")
        },
        {
          name: "robert",
          money: 31.55,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/3.jpg")
        },
        {
          name: "Justin",
          money: 31.55,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/8.jpg")
        },
        {
          name: "Hunter",
          money: 1587.24,
          lotterylist: "湖北快3",
          paths: require("../../../static/images/5.jpg")
        },
        {
          name: "Victoria",
          money: 13.14,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/4.jpg")
        },
        {
          name: "ttqwera",
          money: 4524.28,
          lotterylist: "湖北快3",
          paths: require("../../../static/images/7.jpg")
        },
        {
          name: "adfas",
          money: 7452.0,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/16.jpg")
        },
        {
          name: "Jasmine",
          money: 8532.66,
          lotterylist: "广西快3",
          paths: require("../../../static/images/1.jpg")
        },
        {
          name: "霍去病",
          money: 9535.03,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/8.jpg")
        },
        {
          name: "fdsawqg",
          money: 156877.1,
          lotterylist: "广西快3",
          paths: require("../../../static/images/17.jpg")
        },
        {
          name: "gfukhgj",
          money: 1563.2,
          lotterylist: "江苏快3",
          paths: require("../../../static/images/6.jpg")
        },
        {
          name: "dfhteuj",
          money: 15687.88,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/9.jpg")
        },
        {
          name: "辛弃疾",
          money: 21.36,
          lotterylist: "江苏快3",
          paths: require("../../../static/images/10.jpg")
        },
        {
          name: "ytmioi",
          money: 89.12,
          lotterylist: "甘肃快3",
          paths: require("../../../static/images/1.jpg")
        },
        {
          name: "nkkrtuy",
          money: 7552.12,
          lotterylist: "安徽快3",
          paths: require("../../../static/images/3.jpg")
        },
        {
          name: "hfdw6mm",
          money: 1356.16,
          lotterylist: "吉林快3",
          paths: require("../../../static/images/2.jpg")
        },
        {
          name: "ksfgfdsg",
          money: 1535.0,
          lotterylist: "北京赛车",
          paths: require("../../../static/images/6.jpg")
        },
        {
          name: "ewdghtr",
          money: 15687.88,
          lotterylist: "新疆时时彩",
          paths: require("../../../static/images/15.jpg")
        },
        {
          name: "rey",
          money: 26.12,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/7.jpg")
        },
        {
          name: "Joey",
          money: 12.04,
          lotterylist: "新疆时时彩",
          paths: require("../../../static/images/8.jpg")
        },
        {
          name: "John",
          money: 138.32,
          lotterylist: "河北快3",
          paths: require("../../../static/images/9.jpg")
        },
        {
          name: "Nathan",
          money: 853482.66,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/1.jpg")
        },
        {
          name: "Stan",
          money: 85000,
          lotterylist: "重庆时时彩",
          paths: require("../../../static/images/10.jpg")
        },
        {
          name: "Jason",
          money: 1238.654,
          lotterylist: "北京快3",
          paths: require("../../../static/images/9.jpg")
        },
        {
          name: "Tino",
          money: 85000,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/6.jpg")
        },
        {
          name: "Stephen",
          money: 85000,
          lotterylist: "新疆时时彩",
          paths: require("../../../static/images/3.jpg")
        },
        {
          name: "Neo",
          money: 6120,
          lotterylist: "宏發时时彩",
          paths: require("../../../static/images/18.jpg")
        },
        {
          name: "来fsadfsl",
          money: 6120,
          lotterylist: "宏發pk10",
          paths: require("../../../static/images/28.jpg")
        },
        {
          name: "F不来钱",
          money: 6120,
          lotterylist: "广西快3",
          paths: require("../../../static/images/32.jpg")
        },
        {
          name: "k12234",
          money: 6120,
          lotterylist: "宏發pk10",
          paths: require("../../../static/images/22.jpg")
        }
      ],
      showFlag: true,
      a: 0,
      x: 0
    };
  },
  //可以倒计时，或做秒钟
  created() {
    var countdown = () => {
      this.a = 1;
      let max = 798121.51545;
      let min = 100;
      this.x = Math.random(this.a) * 3500;
      this.b = Math.floor(Math.random(this.a) * 10 + 1);
      this.winpool.reverse();
      this.winpool.push(this.haa[Math.floor(Math.random(this.a) * 10 + 1)]);
      // this.winpool[10].money = this.x;
      this.winpool.shift();
      this.winpool.reverse();
      //随机整数数
      this.a = Math.floor(Math.random(this.a) * (max - min + 1) + min);
      setTimeout(countdown, 1400);
    };
    setTimeout(countdown, 1400);
  },
  methods: {
    selectFood(item, event) {
      this.showFlag = false;
      this.selectedFood = item;
      this.$refs.pop.show();
    },
    haashow(isshow) {
      this.showFlag = !isshow.showF;
    }
  },
  filters: {
    capitalize(value) {
      let start = value.slice(0, 1);
      let end = value.slice(-1);
      return `${start}***${end}`;
    },
    keepTwoNum(value) {
      value = Number(value);
      return value.toFixed(2);
    }
  },
  components: {
    pop
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/page-four/winning.scss";
</style>