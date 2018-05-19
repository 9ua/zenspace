<template>
  <div class="winning">
    <ul v-show="showFlag">
      <li v-for="(item,index) in winpool" :key="index" v-show="index <10" @click="selectFood(item,$event)">
        <div class="winning-left">
          <img :src="item.paths" />
          <div class="winning-xq">
            <p>
              <span>{{item.name | capitalize}}</span>
              <span>在{{item.lotterylist}}</span>
            </p>
            <p>
              <span>喜中</span>
              <span>￥{{item.money | keepTwoNum}}</span>
            </p>
          </div>
        </div>
        <div class="winning-right">
          <span><i class="el-icon-arrow-right"></i></span>
        </div>
      </li>
    </ul>
    <pop :pop="selectedFood" @sonclick="haashow" ref="pop"></pop>
  </div>
</template>
<script>
	import pop from './pop'
import index from 'vue';
  export default {
    data() {
      return {
        b:0,
        haa: [
        	{name:'william',money:95.08,lotterylist:'大发快3',paths: require('../../assets/img/five/6.jpg')},
        	{name:'daniel',money:1238.654,lotterylist:'安徽快3',paths: require('../../assets/img/five/3.jpg')},
        	{name:'江若泊',money:853.66,lotterylist:'大发快3',paths: require('../../assets/img/five/1.jpg')},
        	{name:'james',money:452.442,lotterylist:'北京赛车',paths: require('../../assets/img/five/2.jpg')},
        	{name:'noah',money:45.244,lotterylist:'北京PK10',paths: require('../../assets/img/five/0.jpg')},
        	{name:'samuel',money:85.17,lotterylist:'上海快3',paths: require('../../assets/img/five/7.jpg')},
        	{name:'david',money:132.04,lotterylist:'大发快3',paths: require('../../assets/img/five/9.jpg')},
        	{name:'sophia',money:158.25,lotterylist:'大发快3',paths: require('../../assets/img/five/2.jpg')},
          {name:'anthony',money:458.23,lotterylist:'大发快3',paths: require('../../assets/img/five/3.jpg')},
        	{name:'elizabeth',money:5499.08,lotterylist:'大发快3',paths: require('../../assets/img/five/6.jpg')},
        	{name:'christian',money:77.654,lotterylist:'大发快3',paths: require('../../assets/img/five/5.jpg')},
        	{name:'brandon',money:856.07,lotterylist:'大发快3',paths: require('../../assets/img/five/1.jpg')},
        	{name:'zachary',money:1207.654,lotterylist:'大发快3',paths: require('../../assets/img/five/0.jpg')},
        	{name:'jessica,',money:21.36,lotterylist:'大发快3',paths: require('../../assets/img/five/2.jpg')},
        	{name:'robert',money:31.55,lotterylist:'大发快3',paths: require('../../assets/img/five/3.jpg')},
        	{name:'Justin',money:31.55,lotterylist:'大发快3',paths: require('../../assets/img/five/8.jpg')},
        	{name:'Hunter',money:1587.24,lotterylist:'大发快3',paths: require('../../assets/img/five/5.jpg')},
          {name:'Victoria',money:13.14,lotterylist:'大发快3',paths: require('../../assets/img/five/4.jpg')},
          {name:'若烟',money:4524.28,lotterylist:'大发快3',paths: require('../../assets/img/five/7.jpg')},
        	{name:'adfas',money:7452.00,lotterylist:'大发快3',paths: require('../../assets/img/five/2.jpg')},
        	{name:'Jasmine',money:8532.66,lotterylist:'大发快3',paths: require('../../assets/img/five/1.jpg')},
        	{name:'霍去病',money:9535.03,lotterylist:'大发快3',paths: require('../../assets/img/five/8.jpg')},
        	{name:'fdsawqg',money:156877.10,lotterylist:'大发快3',paths: require('../../assets/img/five/7.jpg')},
        	{name:'gfukhgj',money:1563.20,lotterylist:'大发快3',paths: require('../../assets/img/five/6.jpg')},
        	{name:'dfhteuj',money:15687.88,lotterylist:'大发快3',paths: require('../../assets/img/five/9.jpg')},
        	{name:'辛弃疾',money:21.36,lotterylist:'大发快3',paths: require('../../assets/img/five/0.jpg')},
        	{name:'ytmioi',money:89.12,lotterylist:'大发快3',paths: require('../../assets/img/five/1.jpg')},
          {name:'nkkrtuy',money:7552.12,lotterylist:'大发快3',paths: require('../../assets/img/five/3.jpg')},
          {name:'hfdw6mm',money:1356.16,lotterylist:'大发快3',paths: require('../../assets/img/five/2.jpg')},
        	{name:'ksfgfdsg',money:1535.00,lotterylist:'大发快3',paths: require('../../assets/img/five/6.jpg')},
        	{name:'ewdghtr',money:15687.88,lotterylist:'大发快3',paths: require('../../assets/img/five/5.jpg')},
        	{name:'rey',money:26.12,lotterylist:'大发快3',paths: require('../../assets/img/five/7.jpg')},
        	{name:'rewhtro',money:12.04,lotterylist:'大发快3',paths: require('../../assets/img/five/8.jpg')},
        	{name:'asfei',money:138.32,lotterylist:'大发快3',paths: require('../../assets/img/five/9.jpg')},
        	{name:'Nathan',money:853482.66,lotterylist:'大发快3',paths: require('../../assets/img/five/1.jpg')},
          {name:'Stan',money:85000,lotterylist:'天津时时彩',paths: require('../../assets/img/five/0.jpg')},
          {name:'Jason',money:1238.654,lotterylist:'北京快3',paths: require('../../assets/img/five/9.jpg')},
          {name:'Tino',money:85000,lotterylist:'大发快3',paths: require('../../assets/img/five/6.jpg')},
          {name:'Stephen',money:85000,lotterylist:'新疆时时彩',paths: require('../../assets/img/five/3.jpg')},
          {name:'Neo',money:6120,lotterylist:'广西快3',paths: require('../../assets/img/five/8.jpg')},
        ],
        selectedFood: {},
        winpool:[
          {name:'william',money:95.08,lotterylist:'大发快3',paths: require('../../assets/img/five/6.jpg')},
        	{name:'daniel',money:1238.654,lotterylist:'安徽快3',paths: require('../../assets/img/five/3.jpg')},
        	{name:'江若泊',money:853.66,lotterylist:'大发快3',paths: require('../../assets/img/five/1.jpg')},
        	{name:'james',money:452.442,lotterylist:'北京赛车',paths: require('../../assets/img/five/2.jpg')},
        	{name:'noah',money:45.244,lotterylist:'北京PK10',paths: require('../../assets/img/five/0.jpg')},
        	{name:'samuel',money:85.17,lotterylist:'上海快3',paths: require('../../assets/img/five/7.jpg')},
        	{name:'david',money:132.04,lotterylist:'大发快3',paths: require('../../assets/img/five/9.jpg')},
        	{name:'sophia',money:158.25,lotterylist:'大发快3',paths: require('../../assets/img/five/2.jpg')},
          {name:'anthony',money:458.23,lotterylist:'大发快3',paths: require('../../assets/img/five/3.jpg')},
        	{name:'elizabeth',money:5499.08,lotterylist:'大发快3',paths: require('../../assets/img/five/6.jpg')},
        	{name:'christian',money:77.654,lotterylist:'大发快3',paths: require('../../assets/img/five/5.jpg')},
        	{name:'brandon',money:856.07,lotterylist:'大发快3',paths: require('../../assets/img/five/1.jpg')},
        	{name:'zachary',money:1207.654,lotterylist:'大发快3',paths: require('../../assets/img/five/0.jpg')},
        	{name:'jessica,',money:21.36,lotterylist:'大发快3',paths: require('../../assets/img/five/2.jpg')},
        	{name:'robert',money:31.55,lotterylist:'大发快3',paths: require('../../assets/img/five/3.jpg')},
        	{name:'Justin',money:31.55,lotterylist:'大发快3',paths: require('../../assets/img/five/8.jpg')},
        	{name:'Hunter',money:1587.24,lotterylist:'大发快3',paths: require('../../assets/img/five/5.jpg')},
          {name:'Victoria',money:13.14,lotterylist:'大发快3',paths: require('../../assets/img/five/4.jpg')},
          {name:'若烟',money:4524.28,lotterylist:'大发快3',paths: require('../../assets/img/five/7.jpg')},
        	{name:'adfas',money:7452.00,lotterylist:'大发快3',paths: require('../../assets/img/five/2.jpg')},
        	{name:'Jasmine',money:8532.66,lotterylist:'大发快3',paths: require('../../assets/img/five/1.jpg')},
        	{name:'霍去病',money:9535.03,lotterylist:'大发快3',paths: require('../../assets/img/five/8.jpg')},
        	{name:'fdsawqg',money:156877.10,lotterylist:'大发快3',paths: require('../../assets/img/five/7.jpg')},
        	{name:'gfukhgj',money:1563.20,lotterylist:'大发快3',paths: require('../../assets/img/five/6.jpg')},
        	{name:'dfhteuj',money:15687.88,lotterylist:'大发快3',paths: require('../../assets/img/five/9.jpg')},
        	{name:'辛弃疾',money:21.36,lotterylist:'大发快3',paths: require('../../assets/img/five/0.jpg')},
        	{name:'ytmioi',money:89.12,lotterylist:'大发快3',paths: require('../../assets/img/five/1.jpg')},
          {name:'nkkrtuy',money:7552.12,lotterylist:'大发快3',paths: require('../../assets/img/five/3.jpg')},
          {name:'hfdw6mm',money:1356.16,lotterylist:'大发快3',paths: require('../../assets/img/five/2.jpg')},
        	{name:'ksfgfdsg',money:1535.00,lotterylist:'大发快3',paths: require('../../assets/img/five/6.jpg')},
        	{name:'ewdghtr',money:15687.88,lotterylist:'大发快3',paths: require('../../assets/img/five/5.jpg')},
        	{name:'rey',money:26.12,lotterylist:'大发快3',paths: require('../../assets/img/five/7.jpg')},
        	{name:'rewhtro',money:12.04,lotterylist:'大发快3',paths: require('../../assets/img/five/8.jpg')},
        	{name:'asfei',money:138.32,lotterylist:'大发快3',paths: require('../../assets/img/five/9.jpg')},
        	{name:'Nathan',money:853482.66,lotterylist:'大发快3',paths: require('../../assets/img/five/1.jpg')},
          {name:'Stan',money:85000,lotterylist:'天津时时彩',paths: require('../../assets/img/five/0.jpg')},
          {name:'Jason',money:1238.654,lotterylist:'北京快3',paths: require('../../assets/img/five/9.jpg')},
          {name:'Tino',money:85000,lotterylist:'大发快3',paths: require('../../assets/img/five/6.jpg')},
          {name:'Stephen',money:85000,lotterylist:'新疆时时彩',paths: require('../../assets/img/five/3.jpg')},
          {name:'Neo',money:6120,lotterylist:'广西快3',paths: require('../../assets/img/five/8.jpg')},
          ],
        showFlag: true,
        a:0,
        x:0,
      }
    },
    //可以倒计时，或做秒钟
    created() {
      var countdown = () => {
          this.a = 1;
          let max = 798121.51545;
          let min = 100;
          this.x = Math.random(this.a)*3500;
          this.b = Math.floor(Math.random(this.a)*10+1);
          this.winpool.reverse();
          this.winpool.push(this.haa[Math.floor(Math.random(this.a)*10+1)]);
          // this.winpool[10].money = this.x;
          this.winpool.shift();
          this.winpool.reverse();
        //随机整数数
          this.a = Math.floor(Math.random(this.a)*(max-min+1)+min)
          setTimeout(countdown, 1400)
      }
      setTimeout(countdown, 1400)
    },
    methods: {
      selectFood(item, event) {
      	this.showFlag = false;
        this.selectedFood = item;
        this.$refs.pop.show();
      },
      haashow(isshow){
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
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/scss/page-four/winning.scss';
</style>