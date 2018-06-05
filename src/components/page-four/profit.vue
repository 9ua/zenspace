<template>
  <div class="profit">
    <ul v-show="showFlag">
      <li v-for="(item,index) in paishu" :key="index" v-show="index < 10">
        <!-- <li v-for="(item,index) in paishu" @click="selectFood(item,$event)" :key="index" v-show="index <10"> -->
        <div class="profit-left">
          <img :src="item.paths" />
          <div class="profit-xq">
            <p>账号昵称：
              <span>{{item.name | capitalize}}</span>
            </p>
            <p>昨日盈利：
              <span>￥{{item.money}}</span>
            </p>
          </div>
        </div>
        <div class="profit-right">
          <span>{{index+1}}</span>
        </div>
      </li>
    </ul>
    <pop :pop="selectedFood" ref="pop" @sonclick="haashow"></pop>
  </div>
</template>
<script>
  import pop from './pop'
  import { setStore, getStore, removeStore } from '../../config/mutil'
  export default {
    data() {
      return {
        haa: [
        	{name:'william',money:95.08,lotterylist:'宏發快3',paths: require('@/assets/img/five/6.jpg')},
        	{name:'daniel',money:1238.654,lotterylist:'安徽快3',paths: require('@/assets/img/five/3.jpg')},
        	{name:'江若泊',money:853.66,lotterylist:'宏發快3',paths: require('@/assets/img/five/1.jpg')},
        	{name:'james',money:452.442,lotterylist:'北京赛车',paths: require('@/assets/img/five/2.jpg')},
        	{name:'noah',money:45.244,lotterylist:'北京PK10',paths: require('@/assets/img/five/0.jpg')},
        	{name:'samuel',money:85.17,lotterylist:'上海快3',paths: require('@/assets/img/five/7.jpg')},
        	{name:'david',money:132.04,lotterylist:'宏發快3',paths: require('@/assets/img/five/9.jpg')},
        	{name:'sophia',money:158.25,lotterylist:'宏發快3',paths: require('@/assets/img/five/2.jpg')},
          {name:'anthony',money:458.23,lotterylist:'宏發快3',paths: require('@/assets/img/five/3.jpg')},
        	{name:'elizabeth',money:5499.08,lotterylist:'宏發快3',paths: require('@/assets/img/five/6.jpg')},
        	{name:'christian',money:77.654,lotterylist:'宏發快3',paths: require('@/assets/img/five/5.jpg')},
        	{name:'brandon',money:856.07,lotterylist:'宏發快3',paths: require('@/assets/img/five/1.jpg')},
        	{name:'zachary',money:1207.654,lotterylist:'宏發快3',paths: require('@/assets/img/five/0.jpg')},
        	{name:'jessica,',money:21.36,lotterylist:'宏發快3',paths: require('@/assets/img/five/2.jpg')},
        	{name:'robert',money:31.55,lotterylist:'宏發快3',paths: require('@/assets/img/five/3.jpg')},
        	{name:'Justin',money:31.55,lotterylist:'宏發快3',paths: require('@/assets/img/five/8.jpg')},
        	{name:'Hunter',money:1587.24,lotterylist:'宏發快3',paths: require('@/assets/img/five/5.jpg')},
          {name:'Victoria',money:13.14,lotterylist:'宏發快3',paths: require('@/assets/img/five/4.jpg')},
          {name:'若烟',money:4524.28,lotterylist:'宏發快3',paths: require('@/assets/img/five/7.jpg')},
        	{name:'adfas',money:7452.00,lotterylist:'宏發快3',paths: require('@/assets/img/five/2.jpg')},
        	{name:'Jasmine',money:8532.66,lotterylist:'宏發快3',paths: require('@/assets/img/five/1.jpg')},
        	{name:'霍去病',money:9535.03,lotterylist:'宏發快3',paths: require('@/assets/img/five/8.jpg')},
        	{name:'fdsawqg',money:156877.10,lotterylist:'宏發快3',paths: require('@/assets/img/five/7.jpg')},
        	{name:'gfukhgj',money:1563.20,lotterylist:'宏發快3',paths: require('@/assets/img/five/6.jpg')},
        	{name:'dfhteuj',money:15687.88,lotterylist:'宏發快3',paths: require('@/assets/img/five/9.jpg')},
        	{name:'辛弃疾',money:21.36,lotterylist:'宏發快3',paths: require('@/assets/img/five/0.jpg')},
        	{name:'ytmioi',money:89.12,lotterylist:'宏發快3',paths: require('@/assets/img/five/1.jpg')},
          {name:'nkkrtuy',money:7552.12,lotterylist:'宏發快3',paths: require('@/assets/img/five/3.jpg')},
          {name:'hfdw6mm',money:1356.16,lotterylist:'宏發快3',paths: require('@/assets/img/five/2.jpg')},
        	{name:'ksfgfdsg',money:1535.00,lotterylist:'宏發快3',paths: require('@/assets/img/five/6.jpg')},
        	{name:'ewdghtr',money:15687.88,lotterylist:'宏發快3',paths: require('@/assets/img/five/5.jpg')},
        	{name:'rey',money:26.12,lotterylist:'宏發快3',paths: require('@/assets/img/five/7.jpg')},
        	{name:'rewhtro',money:12.04,lotterylist:'宏發快3',paths: require('@/assets/img/five/8.jpg')},
        	{name:'asfei',money:138.32,lotterylist:'宏發快3',paths: require('@/assets/img/five/9.jpg')},
        	{name:'Nathan',money:853482.66,lotterylist:'宏發快3',paths: require('@/assets/img/five/1.jpg')},
          {name:'Stan',money:85000,lotterylist:'天津时时彩',paths: require('@/assets/img/five/0.jpg')},
          {name:'Jason',money:1238.654,lotterylist:'北京快3',paths: require('@/assets/img/five/9.jpg')},
          {name:'Tino',money:85000,lotterylist:'宏發快3',paths: require('@/assets/img/five/6.jpg')},
          {name:'Stephen',money:85000,lotterylist:'新疆时时彩',paths: require('@/assets/img/five/3.jpg')},
          {name:'Neo',money:6120,lotterylist:'广西快3',paths: require('@/assets/img/five/8.jpg')},
        ],
        selectedFood: {},
        showFlag: true,
        paishu:'',
        kk:[],
        time59:'',
        newdata:new Date(),

      }
    },
    mounted(){
      this.daojishi();
    },
    methods: {
      selectFood(item, event) {
        this.selectedFood = item;
        this.$refs.pop.show();
        this.showFlag = false;
      },
      haashow(isshow){
      	this.showFlag = !isshow.showPage;
      },
      //获取昨日盈利数据
      gitdata(){
        this.$http .get(this.$store.state.url + "api/lottery/getCurrentSaleTime", { params: { count:10 } }).then(res => {
          console.log("haaa");
        }) .catch(error => {
          console.log("获取昨日盈利数据No");
        });
      },
      paixu(){
        setStore('paixuArry',this.shuffle(this.haa).slice(0,10));
        this.paishu = JSON.parse(getStore('paixuArry'));
        this.paishu.sort(function(x, y){return x.money < y.money ? 1:-1;});
      },
      daojishi(){
        removeStore('paixuArry');
        this.time59 = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
        if(this.paishu === ''){
          if(JSON.parse(getStore('paixuArry')) === null){
            this.paixu();
          }
        }         
      },
      //随机打乱数组
      shuffle(a) {
        let len = a.length;
        for(let i=0;i<len;i++){
          let end = len - 1 ;
          let index = (Math.random()*(end + 1)) >> 0;
          let t = a[end];
          a[end] = a[index];
          a[index] = t;
        }
       return a;
      },
    },
    //  隐藏中间内容,以*代替
    filters: {
      capitalize(value) {
        let start = value.slice(0, 1);
        let end = value.slice(-1);
        return `${start}***${end}`;
      }
    },
    components: {
      pop
    }
  }
</script>
<style>

</style>
<style lang="scss" scoped>
  @import '../../assets/scss/page-four/profit.scss';
</style>