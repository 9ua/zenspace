<template>
  <div class="betssc">
    <ul class="betssc-top">
      <li>
        <router-link to="/one" tag="i" class="el-icon-arrow-left"></router-link>
      </li>
      <li>
        <p class="wangfa">玩
          <br/>法</p>
        <div class="menu" @click="show = !show">{{titles}}
          <i :class="show ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
        </div>
        <div class="menu-list">
          <van-popup v-model="show" position="top">
            <div class="popscroll">
              <ul class="menu-list-top">
                <li v-for="(into,index) in playGroups" :key="index">
                  <div class="title">{{into.title}}</div>
                  <div class="menu-list-list-box">
                    <div class="menu-list-list" v-for="(group,indexa) in into.groups" :key="indexa">
                      <span v-for="(player,indexb) in group.players" :key="indexb" @click="k3Tab($event,indexa,indexb,player,group,into,index)">
                        <a>{{player.groupName}}{{player.title}}</a>
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </van-popup>
        </div>
      </li>
      <li class="betssclist">
        <span @click="showa = !showa">{{listname}}</span>
        <i :class="showa ? 'el-icon-caret-top' : 'el-icon-caret-bottom' " @click="showa = !showa"></i>
        <van-popup v-model=" showa" position="top">
          <ul>
            <li v-for="(listssc,index) in LotteryList" :key="index" @click="listnames($event,index,listssc)">
              <a>{{listssc.name}}</a>
            </li>
          </ul>
        </van-popup>
      </li>
    </ul>
    <div class="betssc-content">
      <div v-show="!show">
        <div class="betk3-content-top" @click=" betsscContentTopPop = !betsscContentTopPop">
          <div class="content-left" v-for="(item,index) in getPastO" :key="index">
            <p>{{item.seasonId.substring(4).split("-").join("")}}期开奖号码</p>
            <div>
              <p>{{item.n1}}</p>
              <p>{{item.n2}}</p>
              <p>{{item.n3}}</p>
              <p>{{item.n4}}</p>
              <p>{{item.n5}}</p>
              <i :class="betsscContentTopPop ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
            </div>
          </div>
          <div class="content-right">
            <p>{{seasonId}}期投注截止</p>
            <div>
              <p>{{countDown}}</p>
            </div>
          </div>
        </div>
        <div class="betk3-content-top-pop" v-show="betsscContentTopPop">
          <ul>
            <li>
              <p>期号</p>
              <p>开奖号码</p>
              <p>开奖时间</p>
            </li>
            <li v-for="(item,index) in getPastOpens" :key="index">
              <p>{{item.seasonId.substring(4).split("-").join("")}}
                <i class="el-icon-minus"></i>
              </p>
              <p>
                <a>{{item.n1}}</a>
                <a>{{item.n2}}</a>
                <a>{{item.n3}}</a>
                <a>{{item.n4}}</a>
                <a>{{item.n5}}</a>
              </p>
              <p>{{item.addTime.substring(11)}}</p>
            </li>
          </ul>
        </div>
        <div class="betk3-content-foot">
          <div v-for="(item,indexc) in playGroups" :key="indexc" v-show="indexc === navlist">
            <div class="betssc-list-box" v-for="(group,indexd) in item.groups" :key="indexd" v-show="indexd === navlistb">
              <span v-for="(player,indexe) in group.players" :key="indexe" v-show="indexe === navlistf">{{player.remark}}
                <b>。奖金
                  <i v-show="Number(player.displayBonus)">{{player.displayBonus | keepTwoNum}}</i>
                  <i v-show="isNaN(player.displayBonus)">{{displayBonus1 | keepTwoNum}}—{{displayBonus2 | keepTwoNum}}</i> 元</b>
                 </span>
              <ul class="fushi">
                <li v-for="(player,indexf) in group.players" :key="indexf" v-show="playBonusId === player.id">
                  <p v-for="(numViews,indexff) in player.numView" :key="indexff">
                    <b>{{numViews.title}}</b>
                    <span>
                      <a v-for="(num,indexg) in numViews.nums" :key="indexg" :class="num.choose ? 'active' : '' " @click="curBalls(indexff,indexg,num,numViews,player)">{{num.ball}}</a>
                    </span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="betssc-footer">
      <div class="betssc-footer-top" v-show="zhu > 0">
        <div class="betssc-footer-tops">
          <p>当前选号</p>
          <span>{{con}}</span>
        </div>
        <div class="betssc-footer-buttoms">
          <p>每注金额</p>
          <input type="text" v-model="money" />
          <span v-if="money === '' ">请输入要投注的金额</span>
          <span v-else v-show="playBonusId !== 'ssc_dxds'">单注最高可中
            <p v-show="Number(money*displayBonus)">{{money*displayBonus | keepTwoNum}}</p>
            <p v-show="isNaN(money*displayBonus)">{{youhezhi ? money*displayBonus2 : money*displayBonus1 | keepTwoNum}}</p>元</span>
        </div>
      </div>
      <div class="betssc-footer-buttom">
        <div class="betssc-footer-buttom-left">
          <button @click="iscreat">清空</button>
          <p>
            <span v-if="zhu >0">共{{zhu}}注,</span>
            <span v-if="this.money !== '' ">共{{zhu*money}}元</span>
          </p>
        </div>
        <div class="betssc-footer-buttom-right" @click="betC">马上投注</div>
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
        <p><b>投注成功,</b><span>您可以在我的账户查看注单详情</span></p>
      </li>
      <li><router-link to="/bet" tag='button'>查看注单</router-link><button @click="betsucc">继续投注</button></li>
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
    <van-popup class="sscpop" v-model="showpop">{{content}}</van-popup>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        youhezhi:false,//判断是否有‘和’
        showTimesUp: false,
        showpop: false, //弹窗
        content: '提示内容!', //弹窗内容
        bet: false, //投注弹窗
        betsuccess: false,
        betGoshow: false,
        show: false, //头部中间
        showa: false, //头部右
        showan: 0, //头部右数字
        time: '',
        titles: '五星 复式',
        listname: '重庆',
        lotteryId: 'cqssc',
        LotteryList: '',
        money: 1, //投注金额
        displayBonus:0,
        displayBonus1:0,
        displayBonus2:0,
        displayBonus3:'',
        amount: 0, //总金额
        con: '', //已选号码
        zhu: 0, //注数
        rates: 0, //最高可中
        playBonus: '', //玩法树
        playBonusId: 'ssc_star5', //点击选中后获取此玩法ID
        playGroups: '',
        navlist: 0,
        navlistb: 0,
        navlistf: 0,
        betsscContentTopPop: false,
        getPastOpens: '', //获取过去开奖号码10个
        getPastO: '', //获取过去开奖号码1个
        seasonId: '', //截取后的期号
        seasonId2: '', //当前期号
        countDown: '',
        players: '',
        intotitle: '',
        itemstitle: '复式',
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
        an: '',
        bn: '',
        cn: '',
        dn: '',
        en: '',
        fn: '',
        gn: '',
        hn: '',
        in : '',
        jn: '',
        splayGroups:[],
        sgroups:[],//
        sgroups2:[],//
        splayers:[],//
        snumView:[],//
        snums:'',//
      }
    },
    mounted() {
      this.getPastOpen(); //获取过去开奖号码10个
      this.getPastOp(); //获取过去开奖号码1个
      this.getPlayTree(); //玩法树
    },
    created() {
      this.geteServerTime(); //input显示当前时间
    },
    methods: {
      //中间->投注选号
      curBalls(indexff, indexg, num, numViews, player) {
        num.choose = !num.choose;
        if(num.choose === true) {
          this.d[indexg] = num.ball
          this.dd = this.d.filter(function(n) {return n;});
          this.con = this.dd.join(',');
          this.zhu++;
          this.betssc_boxjia(indexff, indexg, num, numViews, player);
        } else if(num.choose === false) {
          this.d.splice(indexg, 1, "");
          this.dd = this.d.filter(function(n) {return n;});
          this.con = this.dd.join(',');
          this.zhu--;
          this.betssc_boxjian(indexff, indexg, num, numViews, player);
        }
      },
      //投注 ++++
      betssc_boxjia(indexff, indexg, num, numViews, player){
        //大小单双 +
        if(this.playBonusId === 'ssc_dxds') {
          if(indexff === 0) {
            this.ka[indexg] = num.ball;
            this.dd = this.ka.filter(function(n) {
              return n;
            });
            this.an = this.dd.join('+');
          }
          if(indexff === 1) {
            this.kb[indexg] = num.ball;
            this.dd = this.kb.filter(function(n) {
              return n;
            });
            this.bn = this.dd.join('+');
          }
          if(indexff === 2) {
            this.kc[indexg] = num.ball;
            this.dd = this.kc.filter(function(n) {
              return n;
            });
            this.cn = this.dd.join('+');
          }
          if(indexff === 3) {
            this.kd[indexg] = num.ball;
            this.dd = this.kd.filter(function(n) {
              return n;
            });
            this.dn = this.dd.join('+');
          }
          if(indexff === 4) {
            this.ke[indexg] = num.ball;
            this.dd = this.ke.filter(function(n) {
              return n;
            });
            this.en = this.dd.join('+');
          }
          if(this.playBonusId === 'ssc_dxds') {
            if(this.an === '') {
              this.an = '-';
            }
            if(this.bn === '') {
              this.bn = '-';
            }
            if(this.cn === '') {
              this.cn = '-';
            }
            if(this.dn === '') {
              this.dn = '-';
            }
            if(this.en === '') {
              this.en = '-';
            }
            this.con = this.an + ',' + this.bn + ',' + this.cn + ',' + this.dn + ',' + this.en;
          }
        }
        //五星、四星、三星、二星二码不定位 、前四组选6+
        if(this.playBonusId === 'ssc_star4_front_group6' || this.playBonusId === 'ssc_star5_none2' || this.playBonusId === 'ssc_star4_front_none2' || this.playBonusId === 'ssc_star3_front_none2' || this.playBonusId === 'ssc_star3_mid_none2' || this.playBonusId === 'ssc_star3_last_none2') {
          let ret = this.groupSplit(this.dd, 2);
          let arr = [];
          let abc = '';
          for(var k = 0; k < ret.length; k++) {
            var cc = ret[k].join('');
            arr.push(cc);
          }
          abc = arr.join(',')
          this.zhu = arr.length;
        }
        //三码不定位、三星组六 +
        if(this.playBonusId === 'ssc_star5_none3' || this.playBonusId === 'ssc_star3_mid_group6' || this.playBonusId === 'ssc_star3_last_group6' || this.playBonusId === 'ssc_star3_front_group6') {
          let ret = this.groupSplit(this.dd, 3);
          let arr = [];
          let abc = '';
          for(var k = 0; k < ret.length; k++) {
            var cc = ret[k].join('');
            arr.push(cc);
          }
          abc = arr.join(',')
          this.zhu = arr.length;
        }
        //复式 +
        if(this.playBonusId === 'ssc_star5' || this.playBonusId === 'ssc_star4_front' || this.playBonusId === 'ssc_star3_front' || this.playBonusId === 'ssc_star3_mid' || this.playBonusId === 'ssc_star3_last' || this.playBonusId === 'ssc_star2_front' || this.playBonusId === 'ssc_star2_last' || this.playBonusId === 'ssc_star1_dwd') {
          if(indexff === 0) {
            this.ka[indexg] = num.ball;
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join('');
          }
          if(indexff === 1) {
            this.kb[indexg] = num.ball;
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = this.dd.join('');
          }
          if(indexff === 2) {
            this.kc[indexg] = num.ball;
            this.dd = this.kc.filter(function(n) {return n;});
            this.cn = this.dd.join('');
          }
          if(indexff === 3) {
            this.kd[indexg] = num.ball;
            this.dd = this.kd.filter(function(n) {return n;});
            this.dn = this.dd.join('');
          }
          if(indexff === 4) {
            this.ke[indexg] = num.ball;
            this.dd = this.ke.filter(function(n) {return n;});
            this.en = this.dd.join('');
          }
          if(this.playBonusId === 'ssc_star4_front') {
            this.con = this.an + ',' + this.bn + ',' + this.cn + ',' + this.dn;
            this.zhu = this.getCount(this.con.split(','), 4);
            this.con = this.con + ',-';
          }
          if(this.playBonusId === 'ssc_star3_front') {
            this.con = this.an + ',' + this.bn + ',' + this.cn;
            this.zhu = this.getCount(this.con.split(','), 3);
            this.con = this.con + ',-' + ',-';
          }
          if(this.playBonusId === 'ssc_star3_mid') {
            this.con = this.an + ',' + this.bn + ',' + this.cn;
            this.zhu = this.getCount(this.con.split(','), 3);
            this.con = '-,' + this.con + ',-';
          }
          if(this.playBonusId === 'ssc_star3_last') {
            this.con = this.an + ',' + this.bn + ',' + this.cn;
            this.zhu = this.getCount(this.con.split(','), 3);
            this.con = '-,-,' + this.con;
          }
          if(this.playBonusId === 'ssc_star2_front') {
            this.con = this.an + ',' + this.bn;
            this.zhu = this.getCount(this.con.split(','), 2);
            this.con = this.con + ',-' + ',-' + ',-';
          }
          if(this.playBonusId === 'ssc_star2_last') {
            this.con = this.an + ',' + this.bn;
            this.zhu = this.getCount(this.con.split(','), 2);
            this.con = '-,-,-,' + this.con;
          }
          if(this.playBonusId === 'ssc_star1_dwd') {
            this.con = this.an + ',' + this.bn + ',' + this.cn + ',' + this.dn + ',' + this.en;
          }
          if(this.playBonusId === 'ssc_star5') {
            this.con = this.an + ',' + this.bn + ',' + this.cn + ',' + this.dn + ',' + this.en;
            this.zhu = this.getCount(this.con.split(','), 5);
          }
        }
        //龙虎和 +
        if(this.playBonusId === 'ssc_side_lhh') {
          if(indexff === 0) {
            this.ka[indexg] = num.ball;
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = '[万千]' + this.dd.join('');
          }
          if(indexff === 1) {
            this.kb[indexg] = num.ball;
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = '[万百]' + this.dd.join('');
          }
          if(indexff === 2) {
            this.kc[indexg] = num.ball;
            this.dd = this.kc.filter(function(n) {return n;});
            this.cn = '[万十]' + this.dd.join('');
          }
          if(indexff === 3) {
            this.kd[indexg] = num.ball;
            this.dd = this.kd.filter(function(n) {return n;});
            this.dn = '[万个]' + this.dd.join('');
          }
          if(indexff === 4) {
            this.ke[indexg] = num.ball;
            this.dd = this.ke.filter(function(n) {return n;});
            this.en = '[千百]' + this.dd.join('');
          }
          if(indexff === 5) {
            this.kf[indexg] = num.ball;
            this.dd = this.kf.filter(function(n) {return n;});
            this.fn = '[千十]' + this.dd.join('');
          }
          if(indexff === 6) {
            this.kg[indexg] = num.ball;
            this.dd = this.kg.filter(function(n) {return n;});
            this.gn = '[千个]' + this.dd.join('');
          }
          if(indexff === 7) {
            this.kh[indexg] = num.ball;
            this.dd = this.kh.filter(function(n) {return n;});
            this.hn = '[百十]' + this.dd.join('');
          }
          if(indexff === 8) {
            this.ki[indexg] = num.ball;
            this.dd = this.ki.filter(function(n) {return n;});
            this.in = '[百个]' + this.dd.join('');
          }
          if(indexff === 9) {
            this.kj[indexg] = num.ball;
            this.dd = this.kj.filter(function(n) {return n;});
            this.jn = '[十个]' + this.dd.join('');
          }
          if(this.playBonusId === 'ssc_side_lhh') {
            if(this.an === '') {
              this.an = '-';
            }
            if(this.bn === '') {
              this.bn = '-';
            }
            if(this.cn === '') {
              this.cn = '-';
            }
            if(this.dn === '') {
              this.dn = '-';
            }
            if(this.en === '') {
              this.en = '-';
            }
            if(this.fn === '') {
              this.fn = '-';
            }
            if(this.gn === '') {
              this.gn = '-';
            }
            if(this.hn === '') {
              this.hn = '-';
            }
            if(this.in === '') {
              this.in = '-';
            }
            if(this.jn === '') {
              this.jn = '-';
            }
          }
          this.con = this.an + ',' + this.bn + ',' + this.cn + ',' + this.dn + ',' + this.en + ',' + this.fn + ',' + this.gn + ',' + this.hn + ',' + this.in + ',' + this.jn;
          if(this.con.indexOf("和") !== -1){
            this.youhezhi = true;
          }else if(this.con.indexOf("和") === -1){
            this.youhezhi = false;
          }
        }
        //三星包胆 +
        if(this.playBonusId === 'ssc_star3_front_group_contains' || this.playBonusId === 'ssc_star3_mid_group_contains' || this.playBonusId === 'ssc_star3_last_group_contains') {
          for(let i = 0; i < numViews.nums.length; i++) {
            this.zhu = 54;
            this.con = num.ball;
            numViews.nums[i].choose = false;
            numViews.nums[indexg].choose = true;
          }
        }
        //二星包胆 +
        if(this.playBonusId === 'ssc_star2_front_group_contains' || this.playBonusId === 'ssc_star2_last_group_contains') {
          for(let i = 0; i < numViews.nums.length; i++) {
            this.zhu = 9;
            this.con = num.ball;
            numViews.nums[i].choose = false;
            numViews.nums[indexg].choose = true;
          }
        }
        //五星--组选5 +
        if(this.playBonusId === 'ssc_star5_group5') {
          if(indexff === 0) {
            this.ka[indexg] = num.ball;
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join('');
          }
          if(indexff === 1) {
            this.kb[indexg] = num.ball;
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = this.dd.join('');
          }
          this.con = this.an + ',' + this.bn;
          this.zhu = this.getzuCount5(this.con.split(','));
        }
        //五星--组选10 +
        if(this.playBonusId === 'ssc_star5_group10') {
          if(indexff === 0) {
            this.ka[indexg] = num.ball;
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join('');
          }
          if(indexff === 1) {
            this.kb[indexg] = num.ball;
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = this.dd.join('');
          }
          this.con = this.an + ',' + this.bn;
          this.zhu = this.getzuCount10(this.con.split(','));
        }
        //五星--组选20 +
        if(this.playBonusId === 'ssc_star5_group20') {
          if(indexff === 0) {
            this.ka[indexg] = num.ball;
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join('');
          }
          if(indexff === 1) {
            this.kb[indexg] = num.ball;
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = this.dd.join('');
          }
          this.con = this.an + ',' + this.bn;
          this.zhu = this.getzuCount20(this.con.split(','));
        }
        //五星--组选30 +
        if(this.playBonusId === 'ssc_star5_group30') {
          if(indexff === 0) {
            this.ka[indexg] = num.ball;
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join('');
          }
          if(indexff === 1) {
            this.kb[indexg] = num.ball;
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = this.dd.join('');
          }
          this.con = this.an + ',' + this.bn;
          this.zhu = this.getzuCount30(this.con.split(','));
        }
        //五星--组选60 +
        if(this.playBonusId === 'ssc_star5_group60') {
          if(indexff === 0) {
            this.ka[indexg] = num.ball;
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join('');
          }
          if(indexff === 1) {
            this.kb[indexg] = num.ball;
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = this.dd.join('');
          }
          this.con = this.an + ',' + this.bn;
          this.zhu = this.getzuCount60(this.con.split(','));
        }
        //五星--组选120 +
        if(this.playBonusId === 'ssc_star5_group120') {
          this.dd = this.d.filter(function(n) {return n;})
          let lengths = this.dd.length;
          this.zhu = this.getCount120(lengths);
        }
        //前四--组选4 +
        if(this.playBonusId === 'ssc_star4_front_group4') {
          if(indexff === 0) {
            this.ka[indexg] = num.ball;
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join('');
          }
          if(indexff === 1) {
            this.kb[indexg] = num.ball;
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = this.dd.join('');
          }
          this.con = this.an + ',' + this.bn;
          this.zhu = this.getzuCount4(this.con.split(','));
        }
        //前四--组选12 +
        if(this.playBonusId === 'ssc_star4_front_group12') {
          if(indexff === 0) {
            this.ka[indexg] = num.ball;
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join('');
          }
          if(indexff === 1) {
            this.kb[indexg] = num.ball;
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = this.dd.join('');
          }
          this.con = this.an + ',' + this.bn;
          this.zhu = this.getzuCount12(this.con.split(','));
        }
        //前四--组选24 +
        if(this.playBonusId === 'ssc_star4_front_group24') {
          this.dd = this.d.filter(function(n) {return n;})
          let lengths = this.dd.length;
          this.zhu = this.getzuCount24(lengths);
        }
        //前三、中三、后三组选 -
        if(this.playBonusId === 'ssc_star3_front_group3' || this.playBonusId === 'ssc_star3_mid_group3' || this.playBonusId === 'ssc_star3_last_group3') {
          this.dd = this.d.filter(function(n) {return n;})
          let lengths = this.dd.length;
          this.zhu = this.getzuCount3(lengths);
        }
        //二星组选 复式 +
        if(this.playBonusId === 'ssc_star2_front_group' || this.playBonusId === 'ssc_star2_last_group') {
          this.dd = this.d.filter(function(n) {return n;})
          this.zhu = this.erzuxuanfushi(this.dd);
        }
        //三星直选和值 +
        if(this.playBonusId === 'ssc_star3_front_and' || this.playBonusId === 'ssc_star3_mid_and' || this.playBonusId === 'ssc_star3_last_and') {
          this.dd = this.d.filter(function(n) {return n;})
          this.zhu = this.sanzhixuanhezhi(this.dd);
        }
        //三星组选和值 +
        if(this.playBonusId === 'ssc_star3_front_group_and' || this.playBonusId === 'ssc_star3_mid_group_and' || this.playBonusId === 'ssc_star3_last_group_and') {
          this.dd = this.d.filter(function(n) {return n;})
          this.zhu = this.sanzuxuanhezhi(this.dd);
        }
        //三星跨度 +
        if(this.playBonusId === 'ssc_star3_front_kd' || this.playBonusId === 'ssc_star3_mid_kd' || this.playBonusId === 'ssc_star3_last_kd') {
          this.dd = this.d.filter(function(n) {return n;})
          this.zhu = this.sankuadu(this.dd);
        }
        //二星直选和值 +
        if(this.playBonusId === 'ssc_star2_front_and' || this.playBonusId === 'ssc_star2_last_and') {
          this.dd = this.d.filter(function(n) {return n;})
          this.zhu = this.erzhixuanhezhi(this.dd);
        }
        //二星组选和值 +
        if(this.playBonusId === 'ssc_star2_front_group_and' || this.playBonusId === 'ssc_star2_last_group_and') {
          this.dd = this.d.filter(function(n) {return n;})
          this.zhu = this.erzuxuanhezhi(this.dd);
        }
        //二星跨度 +
        if(this.playBonusId === 'ssc_star2_front_kd' || this.playBonusId === 'ssc_star2_last_kd') {
          this.dd = this.d.filter(function(n) {return n;})
          this.zhu = this.erkuadu(this.dd);
        }
      },
      //投注 ----
      betssc_boxjian(indexff, indexg, num, numViews, player){
        //大小单双 -
        if(this.playBonusId === 'ssc_dxds') {
          if(indexff === 0) {
            this.ka.splice(indexg, 1, "");
            this.dd = this.ka.filter(function(n) {
              return n;
            });
            this.an = this.dd.join('+');
          }
          if(indexff === 1) {
            this.kb.splice(indexg, 1, "");
            this.dd = this.kb.filter(function(n) {
              return n;
            });
            this.bn = this.dd.join('+');
          }
          if(indexff === 2) {
            this.kc.splice(indexg, 1, "");
            this.dd = this.kc.filter(function(n) {
              return n;
            });
            this.cn = this.dd.join('+');
          }
          if(indexff === 3) {
            this.kd.splice(indexg, 1, "");
            this.dd = this.kd.filter(function(n) {
              return n;
            });
            this.dn = this.dd.join('+');
          }
          if(indexff === 4) {
            this.ke.splice(indexg, 1, "");
            this.dd = this.ke.filter(function(n) {
              return n;
            });
            this.en = this.dd.join('+');
          }
          if(this.playBonusId === 'ssc_dxds') {
            if(this.an === '') {
              this.an = '-';
            }
            if(this.bn === '') {
              this.bn = '-';
            }
            if(this.cn === '') {
              this.cn = '-';
            }
            if(this.dn === '') {
              this.dn = '-';
            }
            if(this.en === '') {
              this.en = '-';
            }
            this.con = this.an + ',' + this.bn + ',' + this.cn + ',' + this.dn + ',' + this.en;
          }
        }
        //五星、四星、三星、二星二码不定位 、前四组选6 -
        if(this.playBonusId === 'ssc_star4_front_group6' || this.playBonusId === 'ssc_star5_none2' || this.playBonusId === 'ssc_star4_front_none2' || this.playBonusId === 'ssc_star3_front_none2' || this.playBonusId === 'ssc_star3_mid_none2' || this.playBonusId === 'ssc_star3_last_none2') {
          let ret = this.groupSplit(this.dd, 2);
          let arr = [];
          let abc = '';
          for(var k = 0; k < ret.length; k++) {
            var cc = ret[k].join('');
            arr.push(cc);
          }
          abc = arr.join(',')
          this.zhu = arr.length;
        }
        //三码不定位、前三组六、中三组六、后三组六 -
        if(this.playBonusId === 'ssc_star5_none3' || this.playBonusId === 'ssc_star3_mid_group6' || this.playBonusId === 'ssc_star3_last_group6' || this.playBonusId === 'ssc_star3_front_group6') {
          let ret = this.groupSplit(this.dd, 3);
          let arr = [];
          let abc = '';
          for(var k = 0; k < ret.length; k++) {
            var cc = ret[k].join('');
            arr.push(cc);
          }
          abc = arr.join(',')
          this.zhu = arr.length;
        }
        //复式 -
        if(this.playBonusId === 'ssc_star5' || this.playBonusId === 'ssc_star4_front' || this.playBonusId === 'ssc_star3_front' || this.playBonusId === 'ssc_star3_mid' || this.playBonusId === 'ssc_star3_last' || this.playBonusId === 'ssc_star2_front' || this.playBonusId === 'ssc_star2_last' || this.playBonusId === 'ssc_star1_dwd') {
          if(indexff === 0) {
            this.ka.splice(indexg, 1, "");
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join('');
          }
          if(indexff === 1) {
            this.kb.splice(indexg, 1, "");
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = this.dd.join('');
          }
          if(indexff === 2) {
            this.kc.splice(indexg, 1, "");
            this.dd = this.kc.filter(function(n) {return n;});
            this.cn = this.dd.join('');
          }
          if(indexff === 3) {
            this.kd.splice(indexg, 1, "");
            this.dd = this.kd.filter(function(n) {return n;});
            this.dn = this.dd.join('');
          }
          if(indexff === 4) {
            this.ke.splice(indexg, 1, "");
            this.dd = this.ke.filter(function(n) {return n;});
            this.en = this.dd.join('');
          }
          if(this.playBonusId === 'ssc_star4_front') {
            this.con = this.an + ',' + this.bn + ',' + this.cn + ',' + this.dn;
            this.zhu = this.getCount(this.con.split(','), 4);
          } else if(this.playBonusId === 'ssc_star3_front') {
            this.con = this.an + ',' + this.bn + ',' + this.cn;
            this.zhu = this.getCount(this.con.split(','), 3);
          } else if(this.playBonusId === 'ssc_star3_mid') {
            this.con = this.an + ',' + this.bn + ',' + this.cn;
            this.zhu = this.getCount(this.con.split(','), 3);
          } else if(this.playBonusId === 'ssc_star3_last') {
            this.con = this.an + ',' + this.bn + ',' + this.cn;
            this.zhu = this.getCount(this.con.split(','), 3);
          } else if(this.playBonusId === 'ssc_star2_front') {
            this.con = this.an + ',' + this.bn;
            this.zhu = this.getCount(this.con.split(','), 2);
          } else if(this.playBonusId === 'ssc_star2_last') {
            this.con = this.an + ',' + this.bn;
            this.zhu = this.getCount(this.con.split(','), 2);
          } else if(this.playBonusId === 'ssc_star1_dwd') {
            this.con = this.an + ',' + this.bn + ',' + this.cn + ',' + this.dn + ',' + this.en;
          } else if(this.playBonusId === 'ssc_star5') {
            this.con = this.an + ',' + this.bn + ',' + this.cn + ',' + this.dn + ',' + this.en;
            this.zhu = this.getCount(this.con.split(','), 5);
          }
        }
        //龙虎和 -
        if(this.playBonusId === 'ssc_side_lhh') {
          if(indexff === 0) {
            this.ka.splice(indexg, 1, "");
            this.dd = this.ka.filter(function(n) {
              return n;
            });
            this.an = '[万千]' + this.dd.join('');
            if(this.an == '' || this.an == '-' || this.an == '[万千]') {
              this.an = this.dd.join('');
            }
          }
          if(indexff === 1) {
            this.kb.splice(indexg, 1, "");
            this.dd = this.kb.filter(function(n) {
              return n;
            });
            this.bn = '[万百]' + this.dd.join('');
            if(this.bn == '' || this.bn == '-' || this.bn == '[万百]') {
              this.bn = this.dd.join('');
            }
          }
          if(indexff === 2) {
            this.kc.splice(indexg, 1, "");
            this.dd = this.kc.filter(function(n) {
              return n;
            });
            this.cn = '[万十]' + this.dd.join('');
            if(this.cn == '' || this.cn == '-' || this.cn == '[万十]') {
              this.cn = this.dd.join('');
            }
          }
          if(indexff === 3) {
            this.kd.splice(indexg, 1, "");
            this.dd = this.kd.filter(function(n) {
              return n;
            });
            this.dn = '[万个]' + this.dd.join('');
            if(this.dn == '' || this.dn == '-' || this.dn == '[万个]') {
              this.dn = this.dd.join('');
            }
          }
          if(indexff === 4) {
            this.ke.splice(indexg, 1, "");
            this.dd = this.ke.filter(function(n) {
              return n;
            });
            this.en = '[千百]' + this.dd.join('');
            if(this.en == '' || this.en == '-' || this.en == '[千百]') {
              this.en = this.dd.join('');
            }
          }
          if(indexff === 5) {
            this.kf.splice(indexg, 1, "");
            this.dd = this.kf.filter(function(n) {
              return n;
            });
            this.fn = '[千十]' + this.dd.join('');
            if(this.fn == '' || this.fn == '-' || this.fn == '[千十]') {
              this.fn = this.dd.join('');
            }
          }
          if(indexff === 6) {
            this.kg.splice(indexg, 1, "");
            this.dd = this.kg.filter(function(n) {
              return n;
            });
            this.gn = '[千个]' + this.dd.join('');
            if(this.gn == '' || this.gn == '-' || this.gn == '[千个]') {
              this.gn = this.dd.join('');
            }
          }
          if(indexff === 7) {
            this.kh.splice(indexg, 1, "");
            this.dd = this.kh.filter(function(n) {
              return n;
            });
            this.hn = '[百十]' + this.dd.join('');
            if(this.hn == '' || this.hn == '-' || this.hn == '[百十]') {
              this.hn = this.dd.join('');
            }
          }
          if(indexff === 8) {
            this.ki.splice(indexg, 1, "");
            this.dd = this.ki.filter(function(n) {
              return n;
            });
            this.in = '[百个]' + this.dd.join('');
            if(this.in == '' || this.in == '-' || this.in == '[百个]') {
              this.in = this.dd.join('');
            }
          }
          if(indexff === 9) {
            this.kj.splice(indexg, 1, "");
            this.dd = this.kj.filter(function(n) {return n;});
            this.jn = '[十个]' + this.dd.join('');
            if(this.jn == '' || this.jn == '-' || this.jn == '[十个]') {
              this.jn = this.dd.join('');
            }
          }
          if(this.playBonusId === 'ssc_side_lhh') {
            if(this.an === '') {
              this.an = '-';
            }
            if(this.bn === '') {
              this.bn = '-';
            }
            if(this.cn === '') {
              this.cn = '-';
            }
            if(this.dn === '') {
              this.dn = '-';
            }
            if(this.en === '') {
              this.en = '-';
            }
            if(this.fn === '') {
              this.fn = '-';
            }
            if(this.gn === '') {
              this.gn = '-';
            }
            if(this.hn === '') {
              this.hn = '-';
            }
            if(this.in === '') {
              this.in = '-';
            }
            if(this.jn === '') {
              this.jn = '-';
            }
          }
          this.con = this.an + ',' + this.bn + ',' + this.cn + ',' + this.dn + ',' + this.en + ',' + this.fn + ',' + this.gn + ',' + this.hn + ',' + this.in + ',' + this.jn;
        }
        //三星包胆 -
        if(this.playBonusId === 'ssc_star3_front_group_contains' || this.playBonusId === 'ssc_star3_mid_group_contains' || this.playBonusId === 'ssc_star3_last_group_contains') {
          for(let i = 0; i < numViews.nums.length; i++) {
            this.zhu = 0;
            this.con = '';
          }
        }
        //二星包胆 -
        if(this.playBonusId === 'ssc_star2_front_group_contains' || this.playBonusId === 'ssc_star2_last_group_contains') {
          for(let i = 0; i < numViews.nums.length; i++) {
            this.zhu = 0;
            this.con = '';
          }
        }
        //五星--组选5 -
        if(this.playBonusId === 'ssc_star5_group5') {
          if(indexff === 0) {
            this.ka.splice(indexg, 1, "");
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join('');
          }
          if(indexff === 1) {
            this.kb.splice(indexg, 1, "");
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = this.dd.join('');
          }
          this.con = this.an + ',' + this.bn;
          this.zhu = this.getzuCount5(this.con.split(','));
        }
        //五星--组选10 -
        if(this.playBonusId === 'ssc_star5_group10') {
          if(indexff === 0) {
            this.ka.splice(indexg, 1, "");
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join('');
          }
          if(indexff === 1) {
            this.kb.splice(indexg, 1, "");
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = this.dd.join('');
          }
          this.con = this.an + ',' + this.bn;
          this.zhu = this.getzuCount10(this.con.split(','));
        }
        //五星--组选20 -
        if(this.playBonusId === 'ssc_star5_group20') {
          if(indexff === 0) {
            this.ka.splice(indexg, 1, "");
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join('');
          }
          if(indexff === 1) {
            this.kb.splice(indexg, 1, "");
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = this.dd.join('');
          }
          this.con = this.an + ',' + this.bn;
          this.zhu = this.getzuCount20(this.con.split(','));
        }
        //五星--组选30 -
        if(this.playBonusId === 'ssc_star5_group30') {
          if(indexff === 0) {
            this.ka.splice(indexg, 1, "");
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join('');
          }
          if(indexff === 1) {
            this.kb.splice(indexg, 1, "");
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = this.dd.join('');
          }
          this.con = this.an + ',' + this.bn;
          this.zhu = this.getzuCount30(this.con.split(','));
        }
        //五星--组选60 -
        if(this.playBonusId === 'ssc_star5_group60') {
          if(indexff === 0) {
            this.ka.splice(indexg, 1, "");
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join('');
          }
          if(indexff === 1) {
            this.kb.splice(indexg, 1, "");
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = this.dd.join('');
          }
          this.con = this.an + ',' + this.bn;
          this.zhu = this.getzuCount60(this.con.split(','));
        }
        //五星--组选120 -
        if(this.playBonusId === 'ssc_star5_group120') {
          this.dd = this.d.filter(function(n) {return n;});
          let lengths = this.dd.length;
          this.zhu = this.getCount120(lengths);
        }
        //前四--组选4 -
        if(this.playBonusId === 'ssc_star4_front_group4') {
          if(indexff === 0) {
            this.ka.splice(indexg, 1, "");
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join('');
          }
          if(indexff === 1) {
            this.kb.splice(indexg, 1, "");
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = this.dd.join('');
          }
          this.con = this.an + ',' + this.bn;
          this.zhu = this.getzuCount4(this.con.split(','));
        }
        //前四--组选12 -
        if(this.playBonusId === 'ssc_star4_front_group12') {
          if(indexff === 0) {
            this.ka.splice(indexg, 1, "");
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join('');
          }
          if(indexff === 1) {
            this.kb.splice(indexg, 1, "");
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = this.dd.join('');
          }
          this.con = this.an + ',' + this.bn;
          this.zhu = this.getzuCount12(this.con.split(','));
        }
        //前四--组选24 -
        if(this.playBonusId === 'ssc_star4_front_group24') {
          this.dd = this.d.filter(function(n) {return n;});
          let lengths = this.dd.length;
          this.zhu = this.getzuCount24(lengths);
        }
        //前三、中三、后三组选 -
        if(this.playBonusId === 'ssc_star3_front_group3' || this.playBonusId === 'ssc_star3_mid_group3' || this.playBonusId === 'ssc_star3_last_group3') {
          this.dd = this.d.filter(function(n) {return n;});
          let lengths = this.dd.length;
          this.zhu = this.getzuCount3(lengths);
        }
        //二星组选 复式 -
        if(this.playBonusId === 'ssc_star2_front_group' || this.playBonusId === 'ssc_star2_last_group') {
          this.dd = this.d.filter(function(n) {return n;});
          this.zhu = this.erzuxuanfushi(this.dd);
        }
        //三星直选和值 -
        if(this.playBonusId === 'ssc_star3_front_and' || this.playBonusId === 'ssc_star3_mid_and' || this.playBonusId === 'ssc_star3_last_and') {
          this.dd = this.d.filter(function(n) {return n;});
          this.zhu = this.sanzhixuanhezhi(this.dd);
        }
        //三星组选和值 -
        if(this.playBonusId === 'ssc_star3_front_group_and' || this.playBonusId === 'ssc_star3_mid_group_and' || this.playBonusId === 'ssc_star3_last_group_and') {
          this.dd = this.d.filter(function(n) {return n;});
          this.zhu = this.sanzuxuanhezhi(this.dd);
        }
        //三星跨度 -
        if(this.playBonusId === 'ssc_star3_front_kd' || this.playBonusId === 'ssc_star3_mid_kd' || this.playBonusId === 'ssc_star3_last_kd') {
          this.dd = this.d.filter(function(n) {return n;});
          this.zhu = this.sankuadu(this.dd);
        }
        //二星直选和值 -
        if(this.playBonusId === 'ssc_star2_front_and' || this.playBonusId === 'ssc_star2_last_and') {
          this.dd = this.d.filter(function(n) {return n;});
          this.zhu = this.erzhixuanhezhi(this.dd);
        }
        //二星组选和值 -
        if(this.playBonusId === 'ssc_star2_front_group_and' || this.playBonusId === 'ssc_star2_last_group_and') {
          this.dd = this.d.filter(function(n) {return n;});
          this.zhu = this.erzuxuanhezhi(this.dd);
        }
        //二星跨度 -
        if(this.playBonusId === 'ssc_star2_front_kd' || this.playBonusId === 'ssc_star2_last_kd') {
          this.dd = this.d.filter(function(n) {return n;});
          this.zhu = this.erkuadu(this.dd);
        }
      },
      
      //----------公用函数-----------
      //复式 betContent = [0,0,0,0,0] , count = 5
      getCount(betContent, stars) {
        if(betContent.length != stars) {
          return 0;
        }
        let count = 1;
        for(let i = 0; i < stars; i++) {
          let n = betContent[i]
          n = [...new Set(n)];
          count *= n.length;
        }
        return count;
      },
      //组选共用函数
      getCombin(num, len) {
        if(num < len) {
          return 0;
        }
        let nums = 1;
        let lens = 1;
        for(let i = 0; i < len; i++) {
          nums *= (num - i);
          lens *= (len - i);
        }
        return nums / lens;
      },
      //組選五
      // bets = ["0,1", "1,2,3"]
      getzuCount5(bets) {
        if(bets.length != 2) {
          return 0;
        }
        let n1 = bets[0];
        let n2 = bets[1];
        let count = 0;
        for(let i = 0; i < n1.length; i++) {
          count += n2.length;
          if(n2.indexOf(n1[i]) >= 0) {
            count--;
          }
        }
        return count;
      },
      // 組選10
      // bets = ["0,1,3", "1,2,3"]
      getzuCount10(bets) {
        if(bets.length != 2) {
          return 0;
        }
        let n1 = bets[0];
        let n2 = bets[1];
        let count = 0;
        for(let i = 0; i < n1.length; i++) {
          count += n2.length;
          if(n2.indexOf(n1[i]) >= 0) {
            count--;
          }
        }
        return count;
      },
      // 組選20
      // bets = ["0,1,3", "1,2,3"]
      getzuCount20(bets) {
        if(bets.length != 2) {
          return 0;
        }
        let n1 = bets[0];
        let n2 = bets[1];
        let count = 0;
        for(let i = 0; i < n1.length; i++) {
          let nowCount = n2.length;
          if(n2.indexOf(n1[i]) >= 0) {
            nowCount--;
          }
          count += this.getCombin(nowCount, 2);
        }
        return count;
      },
      //組選30
      // bets = ["0,1,3", "1,2,3"]
      getzuCount30(bets) {
        if(bets.length != 2) {
          return 0;
        }
        let n1 = bets[0];
        let n2 = bets[1];
        let count = 0;
        for(let i = 0; i < n2.length; i++) {
          let nowCount = n1.length;
          if(n1.indexOf(n2[i]) >= 0) {
            nowCount--;
          }
          count += this.getCombin(nowCount, 2);
        }
        return count;
      },
      //組選60
      // bets = ["0,1,3", "1,2,3"]
      getzuCount60(bets) {
        if(bets.length != 2) {
          return 0;
        }
        let n1 = bets[0];
        let n2 = bets[1];
        let count = 0;
        for(let i = 0; i < n1.length; i++) {
          let nowCount = n2.length;
          if(n2.indexOf(n1[i]) >= 0) {
            nowCount--;
          }
          count += this.getCombin(nowCount, 3);
        }
        return count;
      },
      //組選120
      // bets = ["0", "1","3","7","9"]
      getCount120(bets) {
        return this.getCombin(bets, 5);
      },
      //四星-組選4
      // bets = ["0,1,3", "1,2,3"]
      getzuCount4(bets) {
        if(bets.length != 2 || bets[0] === '' || bets[1] === '') {
          return 0;
        }
        let n1 = bets[0];
        let n2 = bets[1];
        let count = 0;
        for(let i = 0; i < n1.length; i++) {
          count += n2.length;
          if(n2.indexOf(n1[i])) {
            count--;
          }
        }
        return count;
      },
      //四星-組選12
      // bets = ["0,1,3", "1,2,3"]
      getzuCount12(bets) {
        if(bets.length != 2 || bets[0] === '' || bets[1] === '') {
          return 0;
        }
        let n1 = bets[0];
        let n2 = bets[1];
        if(n1.length < 1) {
          return 0;
        }
        if(n2.length < 2) {
          return 0;
        }
        let count = 0;
        for(let i = 0; i < n1.length; i++) {
          let a = n2.length;
          if(n2.indexOf(n1[i]) >= 0) {
            a--;
          }
          count += this.getCombin(a, 2);
        }
        return count;
      },
      //四星-組選24
      //bets = ["0", "1","9"]
      getzuCount24(bets) {
        return this.getCombin(bets, 4);
      },
      //三星-组三
      //bets = ["0", "1","9"]
      getzuCount3(bets) {
        return this.getCombin(bets, 2) * 2;
      },
      //三星-跨度
      sankuadu(bets) {
        let betCount = [10, 54, 96, 126, 144, 150, 144, 126, 96, 54];
        let count = 0;
        for(let i = 0; i < bets.length; i++) {
          count += betCount[bets[i]];
        }
        return count;
      },
      //三星-直选和值
      sanzhixuanhezhi(bets) {
        let betCount = [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75, 75, 73, 69, 63, 55, 45, 36, 28, 21, 15, 10, 6, 3, 1];
        let count = 0;
        for(let i = 0; i < bets.length; i++) {
          count += betCount[Number(bets[i])];
        }
        return count;
      },
      //三星-组选和值
      sanzuxuanhezhi(bets) {
        let betCount = [1, 2, 2, 4, 5, 6, 8, 10, 11, 13, 14, 14, 15, 15, 14, 14, 13, 11, 10, 8, 6, 5, 4, 2, 2, 1];
        let count = 0;
        for(let i = 0; i < bets.length; i++) {
          count += betCount[(Number(bets[i]) - 1)];
        }
        return count;
      },
      // 二星-组选複式
      //bets = ["6","7"]
      erzuxuanfushi(bets) {
        let count = 0;
        let size = bets.length;
        count = this.getCombin(size, 2);
        return count;
      },
      //二星-跨度
      erkuadu(bets) {
        let betCount = [10, 18, 16, 14, 12, 10, 8, 6, 4, 2];
        let count = 0;
        for(let i = 0; i < bets.length; i++) {
          count += betCount[bets[i]];
        }
        return count;
      },
      //二星-直选和值
      erzhixuanhezhi(bets) {
        let betCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
        let count = 0;
        for(let i = 0; i < bets.length; i++) {
          count += betCount[bets[i]];
        }
        return count;
      },
      //二星-组选和值
      erzuxuanhezhi(bets) {
        let betCount = [1, 1, 2, 2, 3, 3, 4, 4, 5, 4, 4, 3, 3, 2, 2, 1, 1];
        let count = 0;
        for(let i = 0; i < bets.length; i++) {
          count += betCount[(Number(bets[i]) - 1)];
        }
        return count;
      },
      //排列组合
      groupSplit(arr, size) {
        let maxSize = arr.length,
          groupArr = [];
        if(size >= 1 && size <= maxSize) {
          getArr(arr, 0, []);
        }

        function each(arr, index, fn) {
          for(let i = index; i < maxSize; i++) {
            fn(arr[i], i, arr);
          }
        }

        function getArr(arr, _size, _arr, index) {
          if(_size === size) {
            return;
          }
          let len = _size + 1;
          each(arr, index || 0, function(val, i, arr) {
            _arr.splice(_size, 1, val);
            if(_size === size - 1) {
              groupArr.push(_arr.slice());
            }
            getArr(arr, len, _arr, i + 1);
          });
        }
        return groupArr;
      },
      //清空
      iscreat() {
        this.zhu = '';
        this.money = 1;
        this.con ='';
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
        this.an = '';
        this.bn = '';
        this.cn = '';
        this.dn = '';
        this.en = '';
        this.fn = '';
        this.gn = '';
        this.hn = '';
        this.in = '';
        this.jn = '';
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
      //玩法树
      getPlayTree() {
        this.$http.get(this.$store.state.url + 'api/lottery/getPlayTree', {params: {lotteryId: this.lotteryId}}).then((res) => {
          this.playBonus = res.data.data.playBonus;
          this.playGroups = res.data.data.playGroups;
          for (let i = 0; i < this.playGroups.length; i++) {
            this.splayGroups.push(this.playGroups[i])
          }
          for (let j = 0; j < this.splayGroups.length; j++) {
             this.sgroups.push(this.splayGroups[j].groups)
          }
          for (let k = 0; k < this.sgroups.length; k++) {
            for (let j = 0; j < this.sgroups[k].length; j++) {
              this.sgroups2.push(this.sgroups[k][j])
            }
          }
          for (let i = 0; i < this.sgroups2.length; i++) {
            this.splayers.push(this.sgroups2[i].players)
          }
          for (let h = 0; h < this.splayers.length; h++) {
            for (let i = 0; i < this.splayers[h].length; i++) {
              this.snumView.push(this.splayers[h][i].numView)
            }
          }
        }).catch((error) => {
          console.log("玩法树No");
        })
      },
      //投注
      betGo() {
        let config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'},withCredentials: true};
        let formData = new FormData();
        formData.append('order[0].content', this.con);
        formData.append('order[0].betCount', this.zhu);
        formData.append('order[0].price', this.money);
        formData.append('order[0].unit', 1);
        formData.append('order[0].playId', this.playBonusId);
        formData.append('count', this.zhu);
        formData.append('traceOrders[0].price', this.money);
        formData.append('traceOrders[0].seasonId', this.seasonId2);
        formData.append('bounsType', 0);
        formData.append('traceWinStop', 0);
        formData.append('isTrace', 0);
        formData.append('lotteryId', this.$route.query.id);
        formData.append('amount', this.money * this.zhu);
        this.$axios.post(this.$store.state.url + 'api/lottery/bet', formData, config).then((res) => {
          if (res.data.message === "success") {
            setTimeout(() => {
              this.showpop = !this.showpop;
              this.content = "投注成功!";
              this.betGoshow = !this.betGoshow;
              this.iscreat();
              setTimeout(() => {
                this.showpop = !this.showpop;
                this.betsuccess = !this.betsuccess;
              }, 1000);
            }, 400);
          }
        }).catch((error) => {
          console.log("No");
        })
      },
      betsucc() {
        this.betsuccess = !this.betsuccess;
        this.iscreat();
      },
      //右上获取彩种
      getLotteryList() {
        this.$http.get(this.$store.state.url + 'api/lottery/getLotteryList').then((res) => {
          this.LotteryList = res.data.data.ssc;
          for (let i = 0; i < this.LotteryList.length; i++) {
            if(this.LotteryList[i].id === this.$route.query.id){
              this.listname = this.LotteryList[i].name.substring(0, 2);
            }
          }
        }).catch((error) => {
          console.log("右上彩种No")
        })
      },
      //头部右->菜单点击
      listnames(e, index, into) {
        this.listname = into.name.substring(0, 2);
        this.lotteryId = into.id
        this.showan = index;
        this.showa = !this.showa;
        this.$router.push({query:{id:into.id}})
        this.getPastOpen();//获取过去开奖号码10个
        this.getPastOp();//获取过去开奖号码1个
        this.geteServerTime();//获取彩種當前獎期時間
        this.getPlayTree();//玩法术
        this.iscreat();//清空
      },
      //头部菜单项
      k3Tab(e, indexa, indexb, items, group, into, index) {
        this.titles = into.title + ' ' + items.groupName + ' ' + items.title;
        this.intotitle = into.title;
        this.itemstitle = items.title;
        this.navlist = index;
        this.navlistb = indexa;
        this.navlistf = indexb;
        this.playBonusId = items.id;
        this.show = !this.show;
        this.iscreat();
        this.displayBonus = items.displayBonus;
        if(isNaN(this.displayBonus)){
          let ar = [];
          ar = this.displayBonus.split('-');
          this.displayBonus1 = Number(ar[0]);
          this.displayBonus2 = Number(ar[1]);
          this.displayBonus3 = this.displayBonus1+'-'+this.displayBonus2;
          console.log(this.displayBonus1,this.displayBonus2,this.displayBonus3)
        }
      },
      //获取过去开奖号码10个
      getPastOpen() {
        this.getLotteryList();
        this.$http.get(this.$store.state.url + 'api/lottery/getPastOpen', { params: {lotteryId: this.$route.query.id,count: 10}}).then((res) => {
          this.getPastOpens = res.data.data;
        }).catch((error) => {
          console.log("获取过去开奖号码No")
        })
      },
      //获取过去开奖号码1个
      getPastOp() {
        this.getLotteryList();
        this.$http.get(this.$store.state.url + 'api/lottery/getPastOpen', {params: {lotteryId: this.$route.query.id,count: 1}}).then((res) => {
          this.getPastO = res.data.data;
        }).catch((error) => {
          console.log("获取过去开奖号码No")
        })
      },
      //获取彩種當前獎期時間
      geteServerTime() {
        clearInterval(this.timer);
        this.$http.get(this.$store.state.url + 'api/lottery/getCurrentSaleTime', {params: {lotteryId: this.$route.query.id}}).then((res) => {
          if(res.data.code === 1) {
            this.seasonId2 = res.data.data.seasonId
            this.seasonId = this.seasonId2.substring(4).split("-").join("");
            this.today = res.data.data.restSeconds;
            this.initSetTimeout();
          }
        }).catch((error) => {
          console.log("获取彩種當前獎期時間No");
        })
      },
      //倒计时
      initSetTimeout(today) {
        this.timer = setInterval(() => {
          this.today = this.today - 1;
          var hours = Math.floor((this.today % (1 * 60 * 60 * 24)) / (1 * 60 * 60));
          var minutes = Math.floor((this.today % (1 * 60 * 60)) / (1 * 60));
          var seconds = Math.floor((this.today % (1 * 60)) / 1);
          if(hours < 10) {
            hours = "0" + hours
          }
          if(minutes < 10) {
            minutes = "0" + minutes
          }
          if(seconds < 10) {
            seconds = "0" + seconds
          }
          this.countDown = hours + ":" + minutes + ":" + seconds;
          if(this.today < 1) {
            clearInterval(this.timer);
            this.timesUp();
            this.getPastOp();
          }
        }, 1000);
      },
      //時間到彈窗
      timesUp() {
        this.showTimesUp = !this.showTimesUp;
        this.geteServerTime();
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
    },
    //focus
    directives: {
      focus: {
        inserted: function(el) {
          el.focus()
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
  }
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/lotter-list/lotterbet/betssc.scss';
  @import "../../../assets/scss/popcorn.scss";
</style>