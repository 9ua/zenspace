<template>
  <div class="betk3">
    <ul class="betk3-top">
      <li>
        <router-link to="/one" tag="i" class="el-icon-arrow-left"></router-link>
      </li>
      <li>
        <p class="wangfa">玩<br/>法</p>
        <div class="menu" @click="show = !show">{{titles}}
          <i :class="show ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
        </div>
        <div class="menu-list">
          <van-popup v-model="show" position="top">
            <ul class="menu-list-top">
              <li v-for="(into,index) in playBonus" :key="index" :class="{'active': index === navlist}" @click="k3Tab($event,index,into)">
                <div class="title"> {{into.title}} </div>
                <div class="xq" v-show=" index !== 3">赔率 {{into.displayBonus | keepTwoNum}}</div>
                <div class="xq" v-show=" index === 3"></div>
                <div class="img">
                  <span class="img1"></span>
                  <span class="img2"></span>
                  <span class="img3"></span>
                </div>
              </li>
            </ul>
          </van-popup>
        </div>
      </li>
      <li class="betk3list">
        <span @click="showa = !showa">{{listname}}</span>
        <i :class="showa ? 'el-icon-caret-top' : 'el-icon-caret-bottom' " @click="showa = !showa"></i>
        <van-popup v-model=" showa" position="top">
          <ul>
            <li v-for="(listk3,index) in LotteryList" :key="index" @click="listnames($event,index,listk3)">
              <a>{{listk3.name}}</a>
            </li>
          </ul>
        </van-popup>
      </li>
    </ul>
    <div class="betk3-content">
      <div v-show="!show">
        <div class="betk3-content-top" @click=" betk3ContentTopPop = !betk3ContentTopPop">
          <div class="content-left" v-for="(item,index) in getPastO" :key="index">
            <p>{{item.seasonId.slice(4)}}期开奖号码</p>
            <div>
              <p>{{item.n1}}</p>
              <p>{{item.n2}}</p>
              <p>{{item.n3}}</p>
              <!-- <p><img src="../../../assets/img/one/diceK3.png" alt="" /></p>
              <p><img src="../../../assets/img/one/diceK3.png" alt="" /></p>
              <p><img src="../../../assets/img/one/diceK3.png" alt="" /></p> -->
              <i :class="betk3ContentTopPop ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
            </div>
          </div>
          <div class="content-right">
            <p>{{seasonId}}期投注截止</p>
            <div>
              <p>{{countDown}}</p>
            </div>
          </div>
        </div>
        <div class="betk3-content-top-pop" v-show="betk3ContentTopPop">
          <ul>
            <li>
              <p>期号</p>
              <p>开奖号码</p>
              <p>和值</p>
              <p>大小</p>
              <p>单双 </p>
            </li>
            <li v-for="(item,index) in getPastOpens" :key="index">
              <p>{{item.seasonId.substring(4).split("-").join("")}}
                <i class="el-icon-minus"></i>
              </p>
              <p>
                <a>{{item.n1}}</a>
                <a>{{item.n2}}</a>
                <a>{{item.n3}}</a>
                <!-- <a><img src="../../../assets/img/one/diceK3.png" alt="" /></a>
                <a><img src="../../../assets/img/one/diceK3.png" alt="" /></a>
                <a><img src="../../../assets/img/one/diceK3.png" alt="" /></a> -->
              </p>
              <p>{{item.n1+item.n2+item.n3}}</p>
              <p>{{item.n1+item.n2+item.n3 < 11 ? '小' : '大'}}</p><p>{{(item.n1+item.n2+item.n3)%2 === 0  ? '双' : '单'}}</p>
            </li>
          </ul>
        </div>
      <div class="betk3-content-foot">
        <p v-for="(item,index) in playBonus" :key="index" v-show="index === navlist">{{item.remark}}
          <span v-show="index !== 3">赔率 <span class="k3remark">{{ item.displayBonus | keepTwoNum}}</span> 倍。</span>
        <!-- 单挑一骰 -->
        <ul class="yishai" v-show="index === 0">
          <li :class="k3item.selected ? 'active' : ''" v-for="(k3item,index) in yishai" :key="index" @click="k3option($event,index,k3item)">
            <h2>
              <!-- {{k3item.title}} -->
              <span></span>
            </h2>
          </li>
        </ul>
        <!-- 二同号 -->
        <ul class="ertonghao" v-show="index === 1">
          <li>
            <ul>
              <li v-for="(ertongh,index) in ertonghao" :key="index" @click="ertonghaoto($event,index,ertongh)">
                <span :class="ertongh.selected ? 'active' : ''">
                  {{ertongh.title}}
                  <!-- <a></a>
                  <a></a>
                  <a></a> -->
                </span>
              </li>
            </ul>
          </li>
        </ul>
        <!-- 二不同 -->
        <ul class="erbutong" v-show="index === 2">
          <li :class="k3item.selected ? 'active' : ''" v-for="(k3item,index) in erbutong" :key="index" @click="k3option($event,index,k3item)">
            <h2>
              <span></span>
            </h2>
          </li>
        </ul>
        <!-- 和值 -->
        <ul class="hezhi" v-show="index === 3">
          <li :class="k3item.selected ? 'active' : ''" v-for="(k3item,index) in k3options" :key="index" @click="hezhidaxiaodanshuang($event,index,k3item)">
            <h2>{{k3item.title}}</h2>
            <span>赔 {{k3item.rate | keepTwoNum}}</span>
          </li>
        </ul>
        <!-- 大小单双 -->
        <ul class="daoxiaodanshuang" v-show="index === 4">
          <li :class="k3item.selected ? 'active' : ''" v-for="(k3item,index) in daxiaodanshuang" :key="index" @click="k3option($event,index,k3item)">
            <h2>{{k3item.title}}</h2>
          </li>
        </ul>
        <!-- 三连号 -->
        <ul class="sanlianhao" v-show="index === 5">
          <li :class="k3item.selected ? 'active' : ''" v-for="(k3item,index) in sanlianhao" :key="index" @click="k3option($event,index,k3item)">
            <h2>
              <a></a>
              <a></a>
              <a></a>
            </h2>
          </li>
        </ul>
        <!-- 三同号 -->
        <ul class="santonghao" v-show="index === 6">
          <li :class="k3item.selected ? 'active' : ''" v-for="(k3item,index) in santonghao" :key="index" @click="k3option($event,index,k3item)">
            <h2>
              <a></a>
              <a></a>
              <a></a>
            </h2>
          </li>
          <p><span :class="issantonghao ? 'active' : ''" @click="tosantonghao">通选</span></p>
        </ul>
        <!-- 三不同 -->
        <ul class="sanbutong" v-show="index === 7">
          <li :class="k3item.selected ? 'active' : ''" v-for="(k3item,index) in sanbutong" :key="index" @click="k3option($event,index,k3item)">
            <h2>
              <span></span>
            </h2>
          </li>
        </ul>
        </p>
      </div>
    </div>
    </div>
    <div class="betk3-footer">
      <div class="betk3-footer-top" v-show="zhu > 0">
        <div class="betk3-footer-tops">
          <p>当前选号</p><span>{{con}}</span>
        </div>
        <div class="betk3-footer-buttoms">
          <p>每注金额</p><input type="number" v-model="money" onfocus="this.select()"/>
          <span v-if="money === '' ">请输入要投注的金额</span>
          <span v-else>单注最高可中<p>{{navlist === 3 ? parseInt(rates*1000)*money/1000  : parseInt(rates*1000)*money/1000  | keepTwoNum}}</p>元</span>
        </div>
      </div>
      <div class="betk3-footer-buttom">
        <div class="betk3-footer-buttom-left">
          <button @click="iscreat">清空</button>
          <p><span v-if="zhu >0">共{{zhu}}注,</span><span v-if="this.money !== '' ">共{{zhu*money}}元</span></p>
        </div>
        <div class="betk3-footer-buttom-right" @click="betC">马上投注</div>
      </div>
    </div>
    <ul class="betc" v-show="betGoshow">
      <li>投注确认</li>
      <li>
        <p><span>{{listname}}快3 ：</span>{{seasonId}}期</p>
        <p><span>投注金额：</span><b>{{money*zhu}}元</b></p>
        <p><span>投注内容：</span><span class="popcon">{{con}}</span></p>
      </li>
      <li><button @click="betCancel">取消</button><button @click="betGo">确定</button></li>
    </ul>
    <ul class="betc"  v-show="betsuccess">
      <li>温馨提示！</li>
      <li>
        <p><b>投注成功,</b>您可以在我的账户查看注单详情</p>
      </li>
      <li><button @click="looksucc">查看注单</button><button @click="betsucc">继续投注</button></li>
    </ul>
    <van-popup class="pop2" v-model="showTimesUp" :close-on-click-overlay="false">
      <div>
      <ul>
        <div class="title">
          <p>温馨提示！</p>
        </div>
        <div class="cont">
          <p>{{seasonId - 1}}期已截止<br>当前期号{{seasonId}}<br>投注时请注意期号</p>
        </div>
        <div class="but">
            <button class="nodel" @click="showTimesUp = ! showTimesUp">确定</button>
        </div>
      </ul>
      </div>
    </van-popup>
    <van-popup class="betshow" v-model="betshow">{{content}}</van-popup>
  </div>
</template>
<script>
import { setStore, getStore, removeStore } from '../../../config/mutil'
export default {
  data() {
    return {
      showTimesUp: false,
      betshow: false, //投注弹窗
      content: "提示内容!", //弹窗内容
      issantonghao: false,
      show: false, //头部中间
      showa: false, //头部右
      showan: 0, //头部右数字
      money: 1, //投注金额
      amount: 0, //总金额
      rates: 0,
      bet: false, //投注弹窗
      zhu: 0,
      zhu1: 0,
      zhu2: 0,
      navs: 0,
      navlist: 3,
      timer: "",
      titles: "和值",
      listname: "江苏",
      lotteryId: "jsk3",
      playId: "k3_star1", //玩法术
      playId1: "", //玩法术
      playId2: "", //玩法术
      n1: 1,
      n2: 1,
      n3: 1,
      cacheTime: 600000,
      getPastOpens: "", //获取过去开奖号码10个
      getPastO: "", //获取过去开奖号码1个
      LotteryList: "",
      seasonId: "", //截取后的期号
      seasonId2: "", //当前期号
      seasonId3: "", //当前期号-1
      betsuccess: false,
      betGoshow: false,
      betk3ContentTopPop: false,
      today: "",
      countDown: "",
      peilv: [], //当前赔率
      peilv1: [], //当前赔率
      d: [], //选中的号码的下标
      d1: [], //选中的号码的下标
      d2: [], //选中的号码的下标
      dd: [], //选中的号码的下标
      dd1: [], //选中的号码的下标
      dd2: [], //选中的号码的下标
      hezhiitem: [], //和值时选中的号码的下标
      con: "",
      con1: "",
      con2: "",
      cons: "",
      playBonus: "", //玩法树
      timer2:'',
      // 单挑一骰
      yishai: [
        { title: "1", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "2", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "3", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "4", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "5", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "6", rates: "赔率63.72", rate: "63.72", selected: false }
      ],
      // 二同号
      ertonghao: [
        { title: "112", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "221", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "331", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "113", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "223", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "332", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "114", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "224", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "334", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "115", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "225", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "335", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "116", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "226", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "336", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "全选-11", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "全选-22", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "全选-33", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "441", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "551", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "661", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "442", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "552", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "662", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "443", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "553", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "663", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "445", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "554", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "664", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "446", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "556", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "665", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "全选-44", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "全选-55", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "全选-66", rates: "赔率63.72", rate: "63.72", selected: false }
      ],
      // 二不同
      erbutong: [
        { title: "1", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "2", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "3", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "4", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "5", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "6", rates: "赔率63.72", rate: "63.72", selected: false }
      ],
      // 和值
      k3options: [
        {
          title: "大",
          rates: "赔率1.998750",
          rate: "1.998750",
          selected: false
        },
        {
          title: "小",
          rates: "赔率1.998750",
          rate: "1.998750",
          selected: false
        },
        {
          title: "单",
          rates: "赔率1.998750",
          rate: "1.998750",
          selected: false
        },
        {
          title: "双",
          rates: "赔率1.998750",
          rate: "1.998750",
          selected: false
        },
        { title: "04", rates: "赔率60.8400", rate: "60.8400", selected: false },
        { title: "05", rates: "赔率30.4200", rate: "30.4200", selected: false },
        { title: "06", rates: "赔率20.2800", rate: "20.2800", selected: false },
        { title: "07", rates: "赔率12.1680", rate: "12.1680", selected: false },
        { title: "08", rates: "赔率8.6914", rate: "8.6914", selected: false },
        { title: "09", rates: "赔率7.6050", rate: "7.6050", selected: false },
        { title: "10", rates: "赔率6.7600", rate: "6.7600", selected: false },
        { title: "11", rates: "赔率6.7600", rate: "6.7600", selected: false },
        { title: "12", rates: "赔率7.6050", rate: "7.6050", selected: false },
        { title: "13", rates: "赔率8.6914", rate: "8.6914", selected: false },
        { title: "14", rates: "赔率12.1680", rate: "12.1680", selected: false },
        { title: "15", rates: "赔率20.2800", rate: "20.2800", selected: false },
        { title: "16", rates: "赔率30.4200", rate: "30.4200", selected: false },
        { title: "17", rates: "赔率60.8400", rate: "60.8400", selected: false }
      ],
      // 大小单双
      daxiaodanshuang: [
        { title: "大", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "小", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "单", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "双", rates: "赔率63.72", rate: "63.72", selected: false }
      ],
      // 三连号
      sanlianhao: [
        { title: "123", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "234", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "345", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "456", rates: "赔率63.72", rate: "63.72", selected: false }
      ],
      // 三同号
      santonghao: [
        { title: "111", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "222", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "333", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "444", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "555", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "666", rates: "赔率63.72", rate: "63.72", selected: false }
      ],
      // 三不同
      sanbutong: [
        { title: "1", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "2", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "3", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "4", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "5", rates: "赔率63.72", rate: "63.72", selected: false },
        { title: "6", rates: "赔率63.72", rate: "63.72", selected: false }
      ]
    };
  },
  created(){
      this.getLotteryList();
  },
  mounted(){
        if(!this.$route.meta.isBack){
      this.getPlayTree();
      this.geteServerTime();//获取彩種當前獎期時間
    }
    this.$route.meta.isBack=false;
  },
  destroyed() {
    this.endCount();
    this.iscreat();
  },
  watch:{
    money(newVal) {
      if (this.money === '') {
        setTimeout(() => {
          if (this.money === '') {
            this.money = 1;
          }
        }, 1000);
      }else{
        this.money = parseInt(newVal);
      }
    }
  },
  methods: {
    endCount(){
        clearInterval(this.timer);
        clearTimeout(this.timer2);
    },
    //获取彩種當前獎期時間
    geteServerTime() {
      clearInterval(this.timer);
      clearTimeout(this.timer2);
      this.$http.get(this.$store.state.url + "api/lottery/getCurrentSaleTime", {params: { lotteryId: this.$route.query.id }}).then(res => {
          if (res.data.code === 1) {
            this.seasonId2 = res.data.data.seasonId;
            this.seasonId3 = this.seasonId2 - 1;
            // this.seasonId = this.seasonId2.substring(4).split("-").join("");
            this.seasonId = this.seasonId2.slice(4);
            this.today = res.data.data.restSeconds;
            this.getPastOpen();
            this.getPastOp();
            this.initSetTimeout();
          }
        })
        .catch(error => {
          console.log("获取彩種當前獎期時間No");
        });
    },
    //倒计时
    initSetTimeout() {
      this.timer = setInterval(() => {
        this.today = this.today - 1;
        var hours = Math.floor(
          (this.today % (1 * 60 * 60 * 24)) / (1 * 60 * 60)
        );
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
    },
    //获取过去开奖号码10个
    getPastOpen() {
      this.$http.get(this.$store.state.url + "api/lottery/getPastOpen", {params: { lotteryId: this.$route.query.id, count: 10 }}).then(res => {
        this.getPastOpens = res.data.data;
      })
      .catch(error => {
        console.log("获取过去开奖号码No");
      });
    },
    //获取过去开奖号码1个
    getPastOp() {
      this.$http.get(this.$store.state.url + "api/lottery/getPastOpen", {params: { lotteryId: this.$route.query.id, count: 1 }}).then(res => {
          this.getPastO = res.data.data;
          console.log(res.data.data)
          if (res.data.data[0].seasonId !== this.seasonId3 && (res.data.data[0].seasonId-this.seasonId3)<=2) {
              this.reGetPastOp();
          }
        })
        .catch(error => {
          console.log("获取过去开奖号码No");
        });
    },
    reGetPastOp(){
        clearTimeout(this.timer2);
        this.timer2 = setTimeout(() => {
        this.getPastOp();
        }, 10000);
    },
    //右上获取彩种
    getLotteryList() {
      if(localStorage.getItem('lotteryList') !== null){
          this.LotteryList = JSON.parse(localStorage.getItem('lotteryList')).k3;
          for (let i = 0; i < this.LotteryList.length; i++) {
                if(this.LotteryList[i].id === this.$route.query.id){
                  this.listname = this.LotteryList[i].name.substring(0, 2);
                }
              }
				} else {
            this.$http.get(this.$store.state.url + "api/lottery/getLotteryList").then(res => {
              localStorage.setItem('lotteryList',JSON.stringify(res.data.data)); 
              this.LotteryList = res.data.data.k3;
              for (let i = 0; i < this.LotteryList.length; i++) {
                if(this.LotteryList[i].id === this.$route.query.id){
                  this.listname = this.LotteryList[i].name.substring(0, 2);
                }
              }
            })
            .catch(error => {
              console.log("右上彩种No");
            });
        }
    },
    //头部菜单项
    k3Tab(e, index, into) {
      this.iscreat();
      this.titles = into.title;
      this.navlist = index;
      this.show = !this.show;
      this.playId = this.playBonus[index].id;
      this.rates = this.playBonus[this.navlist].displayBonus;
    },
    //头部右->菜单点击
    listnames(e, index, into) {
      this.listname = into.name.substring(0, 2);
      this.lotteryId = into.id;
      this.showan = index;
      this.showa = !this.showa;
      this.$router.push({query:{id:into.id}})
      this.getPastOpen();//获取过去开奖号码10个
      this.getPastOp();//获取过去开奖号码1个
      this.geteServerTime();//获取彩種當前獎期時間
      this.getPlayTree();//玩法术
      this.iscreat();//清空
    },
    //三同号全/反选
    tosantonghao() {
      this.issantonghao = !this.issantonghao;
      for (let i = 0; i < this.santonghao.length; i++) {
        if (this.issantonghao === true) {
          this.santonghao[i].selected = true;
          this.zhu++;
          this.con = "111,222,333,444,555,666";
        } else if (this.issantonghao === false) {
          this.santonghao[i].selected = false;
          this.iscreat();
        }
      }
    },
    //二同複選xx
    onClickStan1(e){
      //同時被選取時 清空
      if (this.ertonghao[0].selected === true && this.ertonghao[3].selected === true && this.ertonghao[6].selected === true && this.ertonghao[9].selected === true && this.ertonghao[12].selected === true) {
        for (let i=0;i<15;i=i+3) {
            this.ertonghaoto(e, i,this.ertonghao[i]);
        }
      } else {  //有缺項時 該列全選
          for (let i=0;i<15;i=i+3) {
            if (this.ertonghao[i].selected === false){
                this.ertonghaoto(e, i,this.ertonghao[i]);
            }
          }
      }
    },
    onClickStan2(e){
      //同時被選取時 清空
      if (this.ertonghao[1].selected === true && this.ertonghao[4].selected === true && this.ertonghao[7].selected === true && this.ertonghao[10].selected === true && this.ertonghao[13].selected === true) {
        for (let i=1;i<16;i=i+3) {
            this.ertonghaoto(e, i,this.ertonghao[i]);
        }
      } else {  //有缺項時 該列全選
          for (let i=1;i<16;i=i+3) {
            if (this.ertonghao[i].selected === false){
                this.ertonghaoto(e, i,this.ertonghao[i]);
            }
          }
      }
    },
    onClickStan3(e){
      //同時被選取時 清空
      if (this.ertonghao[2].selected === true && this.ertonghao[5].selected === true && this.ertonghao[8].selected === true && this.ertonghao[11].selected === true && this.ertonghao[14].selected === true) {
        for (let i=2;i<17;i=i+3) {
            this.ertonghaoto(e, i,this.ertonghao[i]);
        }
      } else {  //有缺項時 該列全選
          for (let i=2;i<17;i=i+3) {
            if (this.ertonghao[i].selected === false){
                this.ertonghaoto(e, i,this.ertonghao[i]);
            }
          }
      }
    },
    onClickStan4(e){
      //同時被選取時 清空
      if (this.ertonghao[18].selected === true && this.ertonghao[21].selected === true && this.ertonghao[24].selected === true && this.ertonghao[27].selected === true && this.ertonghao[30].selected === true) {
        for (let i=18;i<33;i=i+3) {
            this.ertonghaoto(e, i,this.ertonghao[i]);
        }
      } else {  //有缺項時 該列全選
          for (let i=18;i<33;i=i+3) {
            if (this.ertonghao[i].selected === false){
                this.ertonghaoto(e, i,this.ertonghao[i]);
            }
          }
      }
    },
    onClickStan5(e){
      //同時被選取時 清空
      if (this.ertonghao[19].selected === true && this.ertonghao[22].selected === true && this.ertonghao[25].selected === true && this.ertonghao[28].selected === true && this.ertonghao[31].selected === true) {
        for (let i=19;i<34;i=i+3) {
            this.ertonghaoto(e, i,this.ertonghao[i]);
        }
      } else {  //有缺項時 該列全選
          for (let i=19;i<34;i=i+3) {
            if (this.ertonghao[i].selected === false){
                this.ertonghaoto(e, i,this.ertonghao[i]);
            }
          }
      }
    },
    onClickStan6(e){
      //同時被選取時 清空
      if (this.ertonghao[20].selected === true && this.ertonghao[23].selected === true && this.ertonghao[26].selected === true && this.ertonghao[29].selected === true && this.ertonghao[32].selected === true) {
        for (let i=20;i<35;i=i+3) {
            this.ertonghaoto(e, i,this.ertonghao[i]);
        }
      } else {  //有缺項時 該列全選
          for (let i=20;i<35;i=i+3) {
            if (this.ertonghao[i].selected === false){
                this.ertonghaoto(e, i,this.ertonghao[i]);
            }
          }
      }
    },
    //二同号
    ertonghaoto(e, index, k3item) {
      k3item.selected = !k3item.selected;
      //取余==0
      if (k3item.selected === true && index !== 15 && index !== 16 && index !== 17 && index !== 33 && index !== 34 && index !== 35) {
        this.d[index] = k3item.title;
        this.dd = this.d.filter(function(n) {return n;});
        this.con = this.dd.join(",");
        this.zhu ++;
      }else if (k3item.selected === false && index !== 15 && index !== 16 && index !== 17 && index !== 33 && index !== 34 && index !== 35) {
        this.d.splice(index, 1, "");
        this.dd = this.d.filter(function(n) {return n;});
        this.con = this.dd.join(",");
        this.zhu--;
      } 
      if ( index === 15) {
        k3item.selected = !k3item.selected;
        this.onClickStan1(e);
      }
      if ( index === 16) {
        k3item.selected = !k3item.selected;
        this.onClickStan2(e);
      }
      if ( index === 17) {
        k3item.selected = !k3item.selected;
        this.onClickStan3(e);
      }
      if ( index === 33) {
        k3item.selected = !k3item.selected;
        this.onClickStan4(e);
      }
      if ( index === 34) {
        k3item.selected = !k3item.selected;
        this.onClickStan5(e);
      }
      if ( index === 35) {
        k3item.selected = !k3item.selected;
        this.onClickStan6(e);
      }
    },
    //和值-大小单双
    hezhi(e, index, k3item) {
      k3item.selected = !k3item.selected;
      let dxds = ["大", "小", "单", "双"];
      let rets = [3, 6, 10, 15, 21, 25, 27, 27, 25, 21, 15, 10, 6, 3];
      let selectedx = ["04","05","06","07","08","09","10","11","12","13","14","15","16","17"];
      let j = 0;
      if (k3item.selected === true) {
        this.rates = k3item.rate;
        this.d[index] = k3item.title;
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.con = this.dd.join(",");

        for (var i = 0; i < selectedx.length; i++) {
          for (var k = 0; k < this.d.length; k++) {
            if (selectedx[i] == this.d[k]) {
              this.hezhiitem[i] = rets[i];
              j += this.hezhiitem[i];
            }
          }
        }
        this.zhu = j;
      } else if (k3item.selected === false) {
        this.rates = 0;
        this.d.splice(index, 1, "");
        this.hezhiitem.splice(index, 1, "");
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.con = this.dd.join(",");
      }
    },
    //和值-大小单双 +
    hezhidaxiaodanshuang(e, index, k3item) {
      k3item.selected = !k3item.selected;
      if (k3item.selected === true) {
        if (index <= 3) {
          this.playId1 = "k3_star3_big_odd";
          this.d1[index] = k3item.title;
          this.dd = this.d1.filter(function(n) {
            return n;
          });
          this.con1 = this.dd.join(",");
          this.zhu1++;
        } else if (index > 3) {
          this.playId2 = "k3_star3_and";
          this.d2[index] = k3item.title;
          this.dd = this.d2.filter(function(n) {
            return n;
          });
          this.con2 = this.dd.join(",");
          this.zhu2++;
        }

        this.d[index] = k3item.title;
        this.peilv[index] = k3item.rate;
        this.peilv1 = this.peilv.filter(function(n) {
          return n;
        });
        this.rates = Math.max(...this.peilv1);
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.con = this.dd.join(",");
        this.zhu = this.zhu1 + this.zhu2;
      } else if (k3item.selected === false) {
        if (index <= 3) {
          this.playId1 = "k3_star3_big_odd";
          this.d1.splice(index, 1, "");
          this.dd = this.d1.filter(function(n) {return n;});
          this.con1 = this.dd.join(",");
          this.zhu1--;
        } else if (index > 3) {
          this.playId2 = "k3_star3_and";
          this.d2.splice(index, 1, "");
          this.dd = this.d2.filter(function(n) {return n;});
          this.con2 = this.dd.join(",");
          this.zhu2--;
        }
        this.d.splice(index, 1, "");
        this.peilv.splice(index, 1, "");
        this.peilv1 = this.peilv.filter(function(n) {return n;});
        this.rates = Math.max(...this.peilv1);
        this.dd = this.d.filter(function(n) {return n;});
        this.con = this.dd.join(",");
        this.zhu = this.zhu1 + this.zhu2;
      }
    },
    setupPlayTree(resData){
    //console.log("resdatresData")
    console.log(resData , 9999999999)
      this.playBonus = resData;
          let arrpeilv1 = [];
          let arrpeilv2 = [];
          arrpeilv1 = this.playBonus[3].bonusArray;
          arrpeilv2 = this.playBonus[4].bonusArray;
          for (let i = 0; i < this.k3options.length; i++) {
            this.k3options[0].rate = arrpeilv2.大;
            this.k3options[1].rate = arrpeilv2.小;
            this.k3options[2].rate = arrpeilv2.单;
            this.k3options[3].rate = arrpeilv2.双;
            this.k3options[4].rate = arrpeilv1[4];
            this.k3options[5].rate = arrpeilv1[5];
            this.k3options[6].rate = arrpeilv1[6];
            this.k3options[7].rate = arrpeilv1[7];
            this.k3options[8].rate = arrpeilv1[8];
            this.k3options[9].rate = arrpeilv1[9];
            this.k3options[10].rate = arrpeilv1[10];
            this.k3options[11].rate = arrpeilv1[11];
            this.k3options[12].rate = arrpeilv1[12];
            this.k3options[13].rate = arrpeilv1[13];
            this.k3options[14].rate = arrpeilv1[14];
            this.k3options[15].rate = arrpeilv1[15];
            this.k3options[16].rate = arrpeilv1[16];
            this.k3options[17].rate = arrpeilv1[17];
          }
    },
    // 玩法树
    getPlayTree() {
      var now = new Date().getTime();
      //to check if localstorage exists
      console.log(localStorage.getItem("playTree_" + this.$route.query.id));
      if(localStorage.getItem("playTree_" + this.$route.query.id) !== null){
        var setupTime = localStorage.getItem("date_playTree_" + this.$route.query.id);
      
        if(null == setupTime || now-setupTime > this.cacheTime){
          localStorage.removeItem("playTree_" + this.$route.query.id);
          localStorage.removeItem("date_playTree_" + this.$route.query.id);

          this.$http.get(this.$store.state.url + "api/lottery/getPlayTree", {params: { lotteryId: this.$route.query.id }}).then(res => {
          this.setupPlayTree( JSON.parse(JSON.stringify(res.data.data.playBonus)));
          //set to local storage
          localStorage.setItem("playTree_" + this.$route.query.id, JSON.stringify(res.data.data.playBonus));
          localStorage.setItem("date_playTree_" + this.$route.query.id, now);      
          })
          .catch(error => {
            console.log(error);
            this.$store.state.loginStatus = false;
            this.betshow = !this.betshow;
            this.content = "获取不成功!";
            setTimeout(() => {
              this.betshow = !this.betshow;
              this.$router.push("/login");
            }, 1300);
          });
        }
        else
          this.setupPlayTree(JSON.parse(localStorage.getItem("playTree_" + this.$route.query.id)));
      }
      else{
        this.$http.get(this.$store.state.url + "api/lottery/getPlayTree", {params: { lotteryId: this.$route.query.id }}).then(res => { 
        console.log(res.data.data.playBonus);
          this.setupPlayTree(JSON.parse(JSON.stringify(res.data.data.playBonus)));
          console.log("開始塞玩法數localstorage")
          //set to local storage
          localStorage.setItem("playTree_" + this.$route.query.id, JSON.stringify(res.data.data.playBonus));
          localStorage.setItem("date_playTree_" + this.$route.query.id, now);      
        })
        .catch(error => {
          console.log(error);
          this.$store.state.loginStatus = false;
          this.betshow = !this.betshow;
          this.content = "获取不成功!";
          setTimeout(() => {
            this.betshow = !this.betshow;
            this.$router.push("/login");
          }, 1300);
        });
      }
    },
    //中间->投注选号
    k3option(e, index, k3item) {
      k3item.selected = !k3item.selected;
      if (k3item.selected === true) {
        this.d[index] = k3item.title;
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.con = this.dd.join(",");
        this.zhu++;
        //二不同时 +
        if (this.playId === "k3_star2_same_not") {
          let ret = this.groupSplit(this.dd, 2);
          let arr = [];
          let abc = "";
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          abc = arr.join(",");
          this.con = abc;
          this.zhu = arr.length;
        }
        //三不同时 +
        if (this.playId === "k3_star3_same_not") {
          let ret = this.groupSplit(this.dd, 3);
          let arr = [];
          let abc = "";
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          abc = arr.join(",");
          this.con = abc;
          this.zhu = arr.length;
        }
      } else if (k3item.selected === false) {
        this.d.splice(index, 1, "");
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.con = this.dd.join(",");
        this.zhu--;
        //二不同时 -
        if (this.playId === "k3_star2_same_not") {
          let ret = this.groupSplit(this.dd, 2);
          let arr = [];
          let abc = "";
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          abc = arr.join(",");
          this.con = abc;
          this.zhu = arr.length;
        }
        //三不同时 -
        if (this.playId === "k3_star3_same_not") {
          let ret = this.groupSplit(this.dd, 3);
          let arr = [];
          let abc = "";
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          abc = arr.join(",");
          this.con = abc;
          this.zhu = arr.length;
        }
      }
    },

    //清空
    iscreat() {
      // 单挑一骰
      for (let i = 0; i < this.yishai.length; i++) {
        this.yishai[i].selected = false;
        this.d = [];
        this.con = "";
        this.zhu = 0;
        this.money = 1;
      }
      // 二同号
      for (let i = 0; i < this.ertonghao.length; i++) {
        this.ertonghao[i].selected = false;
        this.d = [];
        this.con = "";
        this.zhu = 0;
        this.money = 1;
      }
      // 二不同
      for (let i = 0; i < this.erbutong.length; i++) {
        this.erbutong[i].selected = false;
        this.d = [];
        this.con = "";
        this.zhu = 0;
        this.money = 1;
      }
      // 和值
      for (let i = 0; i < this.k3options.length; i++) {
        this.k3options[i].selected = false;
        this.d = [];
        this.d1 = [];
        this.d2 = [];
        this.con = "";
        this.con1 = "";
        this.con2 = "";
        this.zhu = 0;
        this.zhu1 = 0;
        this.zhu2 = 0;
        this.money = 1;
        this.playId1 = '';
        this.playId2 = '';
      }
      // 大小单双
      for (let i = 0; i < this.daxiaodanshuang.length; i++) {
        this.daxiaodanshuang[i].selected = false;
        this.d = [];
        this.con = "";
        this.zhu = 0;
        this.money = 1;
      }
      // 三连号
      for (let i = 0; i < this.sanlianhao.length; i++) {
        this.sanlianhao[i].selected = false;
        this.d = [];
        this.con = "";
        this.zhu = 0;
        this.money = 1;
      }
      // 三同号
      for (let i = 0; i < this.santonghao.length; i++) {
        this.santonghao[i].selected = false;
        this.d = [];
        this.con = "";
        this.zhu = 0;
        this.money = 1;
      }
      // 三不同
      for (let i = 0; i < this.sanbutong.length; i++) {
        this.sanbutong[i].selected = false;
        this.d = [];
        this.con = "";
        this.zhu = 0;
        this.money = 1;
      }
    },
    betCancel() {
      this.betGoshow = !this.betGoshow;
    },
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
    //投注
    betGo() {
      this.betGoshow = !this.betGoshow;
      let config = {headers: { "Content-Type": "application/x-www-form-urlencoded" },withCredentials: true};
      if (this.playId1 === "k3_star3_big_odd" || this.playId2 === "k3_star3_and" || this.playId === "k3_star3_and") {
        if (this.playId1 === "k3_star3_big_odd" && this.con1 !== '') {
          let formData = new FormData();
          formData.append("order[0].content", this.con1);
          formData.append("order[0].betCount", this.zhu1);
          formData.append("order[0].price", this.money);
          formData.append("order[0].unit", 1);
          formData.append("order[0].playId", this.playId1);
          formData.append("count", this.zhu1);
          formData.append("traceOrders[0].price", this.money);
          formData.append("traceOrders[0].seasonId", this.seasonId2);
          formData.append("bounsType", 0);
          formData.append("traceWinStop", 0);
          formData.append("isTrace", 0);
          formData.append("lotteryId", this.$route.query.id);
          formData.append("amount", this.money * this.zhu1);
          this.$axios.post(this.$store.state.url + "api/lottery/bet", formData, config).then(res => {
              if (res.data.message === "success") {
                this.con1 = "";
                setTimeout(() => {
                  this.betshow = !this.betshow;
                  this.content = "投注成功!";
                  // this.betGoshow = !this.betGoshow;
                  this.iscreat();
                  setTimeout(() => {
                    this.betshow = false;
                    this.betsuccess = !this.betsuccess;
                  }, 600);
                }, 0);
              }
            })
            .catch(error => {
              console.log("No");
            });
        }
        if (this.playId2 === "k3_star3_and" && this.con2 !== '') {
          let formData = new FormData();
          formData.append("order[0].content", this.con2);
          formData.append("order[0].betCount", this.zhu2);
          formData.append("order[0].price", this.money);
          formData.append("order[0].unit", 1);
          formData.append("order[0].playId", this.playId2);
          formData.append("count", this.zhu2);
          formData.append("traceOrders[0].price", this.money);
          formData.append("traceOrders[0].seasonId", this.seasonId2);
          formData.append("bounsType", 0);
          formData.append("traceWinStop", 0);
          formData.append("isTrace", 0);
          formData.append("lotteryId", this.$route.query.id);
          formData.append("amount", this.money * this.zhu1);
          this.$axios
            .post(this.$store.state.url + "api/lottery/bet", formData, config)
            .then(res => {
              if (this.zhu1 < 1) {
                if (res.data.message === "success") {
                  setTimeout(() => {
                    this.betshow = !this.betshow;
                    this.content = "投注成功!";
                    this.betGoshow = !this.betGoshow;
                    this.iscreat();
                    setTimeout(() => {
                      this.betshow = !this.betshow;
                      this.betsuccess = !this.betsuccess;
                    }, 1300);
                  }, 600);
                }
              }
            })
            .catch(error => {
              console.log("No");
            });
        }
      } else 
        // default
        if (this.playId1 !== "k3_star3_big_odd" && this.playId2 !== "k3_star3_and" && this.playId !== "k3_star3_and") {
          let formData = new FormData();
          formData.append("order[0].content", this.con);
          formData.append("order[0].betCount", this.zhu);
          formData.append("order[0].price", this.money);
          formData.append("order[0].unit", 1);
          formData.append("order[0].playId", this.playId);
          formData.append("count", this.zhu);
          formData.append("traceOrders[0].price", this.money);
          formData.append("traceOrders[0].seasonId", this.seasonId2);
          formData.append("bounsType", 0);
          formData.append("traceWinStop", 0);
          formData.append("isTrace", 0);
          formData.append("lotteryId", this.$route.query.id);
          formData.append("amount", this.money * this.zhu);
          this.$axios.post(this.$store.state.url + "api/lottery/bet", formData, config).then(res => {
              if (res.data.message === "success") {
                setTimeout(() => {
                  this.betshow = !this.betshow;
                  this.content = "投注成功!";
                  this.betGoshow = !this.betGoshow;
                  setTimeout(() => {
                    this.betshow = !this.betshow;
                    this.betsuccess = !this.betsuccess;
                    this.iscreat();
                  }, 1300);
                }, 600);
              }
            })
            .catch(error => {
              console.log("No");
            });
        }
      
    },
    //查看注单
    looksucc(){
      this.$router.push({path:'/bet'});
      this.betsuccess = !this.betsuccess;
    },
    //继续投注
    betsucc() {
      this.betsuccess = !this.betsuccess;
      this.iscreat();
    },
    //排列组合
    groupSplit(arr, size) {
      let maxSize = arr.length,
        groupArr = [];
      if (size >= 1 && size <= maxSize) {
        getArr(arr, 0, []);
      }
      function each(arr, index, fn) {
        for (let i = index; i < maxSize; i++) {
          fn(arr[i], i, arr);
        }
      }
      function getArr(arr, _size, _arr, index) {
        if (_size === size) {
          return;
        }
        let len = _size + 1;
        each(arr, index || 0, function(val, i, arr) {
          _arr.splice(_size, 1, val);
          if (_size === size - 1) {
            groupArr.push(_arr.slice());
          }
          getArr(arr, len, _arr, i + 1);
        });
      }
      return groupArr;
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
      value = parseInt(value * 1000) / 1000;
      return value;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/lotter-list/lotterbet/betk3.scss";
@import "../../../assets/scss/popcorn.scss";
</style>