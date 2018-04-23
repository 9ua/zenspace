<template>
  <div class="betk3">
    <ul class="betk3-top">
      <li><router-link to="/one" tag="i" class="el-icon-arrow-left"></router-link></li>
      <li>
      	<p class="wangfa">玩<br/>法</p>
        <div class="menu" @click="show = !show">{{titles}}
          <i :class="show ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
        </div>
        <div class="menu-list">
	        <van-popup v-model="show" position="top" >
	            <ul class="menu-list-top">
	            	<li v-for="(into,index) in k3" :key="index" :class="{'active': index === navlist}" @click="k3Tab($event,index,into)">
	            		<div class="title">
	            			{{into.title}}
	            		</div>
	            		<div class="xq">{{into.rates}}</div>
	            		<div class="img">
	            			<span class="img1"></span><span class="img2"></span><span class="img3"></span>
	            		</div>
	            	</li>
	            </ul>
	        </van-popup>
        </div>
      </li>
      <li class="betk3list">
      	<span @click="showa = !showa">{{listname}}</span>
      	<i :class="showa ? 'el-icon-caret-top' : 'el-icon-caret-bottom' " @click="showa = !showa"></i>
      	<van-popup v-model=" showa" position="top" >
	        <ul>
	      		<li v-for="(listk3,index) in k3list" :key="index" @click="listnames($event,index,listk3)"><a>{{listk3.name}}</a></li>
	      	</ul>
        </van-popup>
      </li>
    </ul>
    <div class="betk3-content">
    	<div v-show="!show">
    		<div class="betk3-content-top" @click=" betk3ContentTopPop = !betk3ContentTopPop">
	    		<div class="content-left" v-for="(item,index) in getPastO" :key="index">
	    			<p>{{item.seasonId.substring(4).split("-").join("")}}期开奖号码</p>
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
	    			<p>{{'0'+(seasonId*1+1)}}期投注截止</p>
	    			<div>
	    				<p>00:00:31</p>
	    			</div>
	    		</div>
	    	</div>
			<div class="betk3-content-top-pop" v-show="betk3ContentTopPop">
				<ul>
					<li><p>期号</p><p>开奖号码</p><p>和值</p><p>大小</p><p>单双 </p></li>
					<li v-for="(item,index) in getPastOpens" :key="index">
						<p>{{item.seasonId.substring(4).split("-").join("")}}<i class="el-icon-minus"></i></p>
						<p>
							<a>{{item.n1}}</a>
							<a>{{item.n2}}</a>
							<a>{{item.n3}}</a>
							<!-- <a><img src="../../../assets/img/one/diceK3.png" alt="" /></a>
							<a><img src="../../../assets/img/one/diceK3.png" alt="" /></a>
							<a><img src="../../../assets/img/one/diceK3.png" alt="" /></a> -->
						</p>
						<p>{{item.n1+item.n2+item.n3}}</p><p>{{item.n1+item.n2+item.n3 < 11 ? '小' : '大'}}</p><p>{{(item.n1+item.n2+item.n3)%2 === 0  ? '双' : '单'}}</p>
					</li>
				</ul>
			</div>
	    	<div class="betk3-contnet-foot">
	    		<p>猜3个开奖号相加的和，3-10为小，11-18为大</p>
	    		<ul>
	    			<li :class="k3item.selected ? 'active' : ''" v-for="(k3item,index) in k3options" :key="index" @click="k3option($event,index,k3item)">
	    				<h2>{{k3item.title}}</h2>
	    				<span>{{k3item.rates}}</span>
	    			</li>
	    		</ul>
	    	</div>
    	</div>
    </div>
  	<div class="betk3-footer">
  		<div class="betk3-footer-top" v-show="zhu > 0">
  			<div class="betk3-footer-tops">
  				<p>当前选号</p><span>{{con}}</span>
  			</div>
  			<div class="betk3-footer-buttoms">
  				<p>每注金额</p><input type="text" v-model="money" v-focus/>
  				<span v-if="money === '' ">请输入要投注的金额</span>
  				<span v-else>最高可中<p>{{rates}}</p>元</span>
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
  	<van-popup v-model="bet" class="betk3pop">
		<ul class="beta"  v-if="zhu < 1">
			<li>温馨提示！</li>
			<li>请至少选择一注号码投注</li>
			<li @click="bet = ! bet"><button>确定</button></li>
		</ul>
		<ul class="betb" v-else-if="money === ''">
			<li>温馨提示！</li>
			<li>请填写您要投注的金额</li>
			<li @click="bet = ! bet"><button>确定</button></li>
		</ul>
		<ul class="betc" v-show="betGoshow"  v-else>
			<li>投注确认</li>
			<li>
				<p><span>{{listname}}快3 ：</span>1111111期</p>
				<p><span>投注金额：</span><b>{{money*zhu}}元</b></p>
				<p><span>投注内容：</span>{{con}}</p>
			</li>
			<li><button @click="bet = ! bet">取消</button><button @click="betGo">确定</button></li>
		</ul>
		<ul class="bete"  v-show="betsuccess">
			<li>温馨提示！</li>
			<li>
				<p><span>投注成功</span>您可以在我的账户查看注单详情</p>
			</li>
			<li><router-link to="" tag='button'>查看注单</router-link><button @click="betsucc">继续投注</button></li>
		</ul>
		<!-- <ul class="betc"  v-else>
			<li>投注确认</li>
			<li>
				<p>111111期已截止</p>
				<p>当前期号<span>11111</span></p>
				<p>投注时请注意期号</p>
			</li>
			<li @click="bet = ! bet"><button>确定</button></li>
		</ul> -->
	</van-popup>
  </div>
</template>
<script>
	export default{
		data(){
			return{
				show:false,//头部中间
				showa:false,//头部右
				showan:0,//头部右数字
				money:'',//投注金额
				rates:0,
				bet:false,//投注弹窗
				zhu:0,
				navs:0,
				navlist:0,
				titles:'和值',
				listname:'江苏',
				lotteryId:'jsk3',
				n1:1,
				n2:1,
				n3:1,
				getPastOpens:'',
				getPastO:'',
				seasonId:'',
				seasonId2:'',
				betsuccess:false,
				betGoshow:true,
				betk3ContentTopPop:false,
				c:[],//选中的号码的下标
				d:[],//选中的号码的下标
				con:'',
				cons:'',
				k3:[
					{title:'和值',rates:'1.97-191.16倍',rate:'1.97-191.16',selected:false},
					{title:'三同号通选',rates:'赔率31.86倍',rate:'31.86',selected:false},
					{title:'三同号单选',rates:'赔率191.16倍',rate:'191.16',selected:false},
					{title:'三不同号',rates:'赔率31.86倍',rate:'31.86',selected:false},
					{title:'三连号通选',rates:'赔率7.96倍',rate:'7.96',selected:false},
					{title:'二同号复选',rates:'赔率12.74倍',rate:'12.74',selected:false},
					{title:'二同号单选',rates:'赔率63.72倍',rate:'63.72',selected:false},
					{title:'二不同号',rates:'赔率6.37倍',rate:'6.37',selected:false},
					{title:'单骰',rates:'赔率1倍',rate:'1',selected:false},
				],
				k3list:[
					{name:'江苏快3',val:1},
					{name:'安徽快3',val:2},
					{name:'广西快3',val:3},
					{name:'湖北快3',val:4},
					{name:'北京快3',val:5},
					{name:'大发快3',val:6},
					{name:'河北快3',val:7},
					{name:'甘肃快3',val:8},
					{name:'上海快3',val:9},
					{name:'贵州快3',val:10},
					{name:'吉林快3',val:11},
					{name:'UU快3',val:12},
				],
				k3options:[
					// {title:'大',rates:'赔率1.97',rate:'1.97',selected:false},
					// {title:'小',rates:'赔率1.97',rate:'1.97',selected:false},
					// {title:'单',rates:'赔率1.97',rate:'1.97',selected:false},
					// {title:'双',rates:'赔率1.97',rate:'1.97',selected:false},
					{title:'3',rates:'赔率191.16',rate:'191.16',selected:false},
					{title:'4',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'5',rates:'赔率31.86',rate:'31.86',selected:false},
					{title:'6',rates:'赔率19.11',rate:'19.11',selected:false},
					{title:'7',rates:'赔率12.74',rate:'12.74',selected:false},
					{title:'8',rates:'赔率9.10',rate:'9.10',selected:false},
					{title:'9',rates:'赔率7.64',rate:'7.64',selected:false},
					{title:'10',rates:'赔率7.08',rate:'7.08',selected:false},
					{title:'11',rates:'赔率7.08',rate:'7.08',selected:false},
					{title:'12',rates:'赔率7.64',rate:'7.64',selected:false},
					{title:'13',rates:'赔率9.10',rate:'9.10',selected:false},
					{title:'14',rates:'赔率12.74',rate:'12.74',selected:false},
					{title:'15',rates:'赔率19.11',rate:'19.11',selected:false},
					{title:'16',rates:'赔率31.86',rate:'31.86',selected:false},
					{title:'17',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'18',rates:'赔率191.16',rate:'191.16',selected:false},
				],
			}
		},
		mounted(){
			this.getPastOpen();
			this.getPastOp();
			this.geteServerTime();
		},
		methods:{
			//获取彩種當前獎期時間
			geteServerTime(){
				this.$http.get('api/lottery/getCurrentSaleTime',{params:{lotteryId:'jsk3'}}).then((res) => {
					this.seasonId = res.data.data.seasonId
					this.seasonId = this.seasonId.substring(4).split("-").join("");
					console.log(res.data.data)
				}).catch((error) => {
					console.log("获取彩種當前獎期時間No");
				})
			},
			//获取过去开奖号码10
			getPastOpen(){
				this.$http.get('api/lottery/getPastOpen',{params:{lotteryId:this.lotteryId,count:10}}).then((res) => {
					this.getPastOpens = res.data.data;
				}).catch((error) => {
						console.log("获取过去开奖号码No")
				})
			},
			//获取过去开奖号码1
			getPastOp(){
				this.$http.get('api/lottery/getPastOpen',{params:{lotteryId:this.lotteryId,count:1}}).then((res) => {
					this.getPastO = res.data.data;
				}).catch((error) => {
						console.log("获取过去开奖号码No")
				})
			},
			k3Tab(e,index,into){
				this.titles = into.title;
				this.navlist = index;
				this.show = !this.show;
			},
			listnames(e,index,into){
				this.listname = into.name.substring(0,2);
				this.showan = index;
				this.showa = !this.showa;
			},
			k3option(e,index,k3item){
				k3item.selected = !k3item.selected;
				if(k3item.selected === true){
					this.rates = k3item.rate;
					this.d[index] = k3item.title
					this.con = this.d.join(' ');
					this.zhu ++;
				}else if(k3item.selected === false){
					this.rates = 0;
					this.d.splice(index,1,"");
					this.con = this.d.join(' ');
					this.zhu --;
				}
				// console.log(this.con)
			},
			//清空
			iscreat(){
				for(let i=0;i<this.k3options.length;i++){
					this.k3options[i].selected = false;
					this.d = [];
					this.con = '';
					this.zhu =0;
					this.money = '';
				}
			},
			betC(){
				this.bet = !this.bet;
			},
			betGo(){
				let config = {
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},withCredentials:true};
				let formData = new FormData();
					formData.append('order[0].content','3,4');
					formData.append('order[0].betCount',this.zhu);
					formData.append('order[0].price',1);
					formData.append('order[0].unit',2);
					formData.append('order[0].playId','k3_star1');
					formData.append('count',this.zhu);
					formData.append('traceOrders[0].price', this.money);
					formData.append('traceOrders[0].seasonId', this.seasonId);
					formData.append('bounsType', 0);
					formData.append('traceWinStop', 0);
					formData.append('isTrace', 0);
					formData.append('lotteryId', this.lotteryId);
				this.$axios.post('api/lottery/bet',formData,config).then((res) => {
					if(res.data.message === 'success'){
						this.betGoshow = !this.betGoshow;
						this.betsuccess = !this.betsuccess;
					}
				}).catch((error) => {
						console.log("No");
				})
			},
			betsucc(){
				this.betsuccess = !this.betsuccess;
				// this.$router.push({path:'/one'})
			}
		},
		directives: {
      focus: {
        inserted: function(el) {
          el.focus()
        }
      }
    }
	}
</script>
<style lang="scss" scoped>
@import '../../../assets/scss/lotter-list/lotterbet/betk3.scss'
</style>
<style type="text/css">
  .van-modal {
    background-color: rgba(0, 0, 0, 0.1) !important;
  }
</style>