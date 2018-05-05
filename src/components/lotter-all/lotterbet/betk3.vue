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
	            	<li v-for="(into,index) in playBonus" :key="index" :class="{'active': index === navlist}" @click="k3Tab($event,index,into)">
	            		<div class="title">
	            			{{into.title}}
	            		</div>
	            		<!-- <div class="xq">{{into.rates}}</div> -->
	            		<div class="xq"></div>
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
	      		<li v-for="(listk3,index) in LotteryList" :key="index" @click="listnames($event,index,listk3)"><a>{{listk3.name}}</a></li>
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
	    			<p>{{'0'+(seasonId*1)}}期投注截止</p>
	    			<div>
	    				<p>{{countDown}}</p>
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
			<div class="betk3-content-foot">
				<p v-for="(item,index) in playBonus" :key="index" v-show="index === navlist">{{item.remark}}
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
							<!-- <li v-for="(k3item,index) in ertonghao" :key="index">
								<span :class="item.selected ? 'active' : ''" v-for="(item,indexaa) in k3item.a" :key="item.id" @click="ertonghaooption($event,indexaa,item,index,k3item)">
									<a></a>
									<a></a>
									<a></a>
								</span>
								<p :class="isclick.selected ? 'active' : ''" v-for="(isclick,indexbb) in k3item.a1" :key="indexbb" @click="ertonghaoalloption($event,indexbb,isclick,index,k3item)" ref="isclicka">
									<a></a>
									<a></a>
								</p>
							</li> -->
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
					<li :class="k3item.selected ? 'active' : ''" v-for="(k3item,index) in k3options" :key="index" @click="k3option($event,index,k3item)">
						<h2>{{k3item.title}}</h2>
						<span>{{k3item.rates}}</span>
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
  				<p>每注金额</p><input type="text" v-model="money"/>
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
				<p><span>{{listname}}快3 ：</span>{{seasonId}}期</p>
				<p><span>投注金额：</span><b>{{money*zhu}}元</b></p>
				<p><span>投注内容：</span>{{con}}</p>
			</li>
			<li><button @click="bet = ! bet">取消</button><button @click="betGo">确定</button></li>
		</ul>
		<ul class="bete"  v-show="betsuccess">
			<li>温馨提示！</li>
			<li>
				<p><b>投注成功,</b><span>您可以在我的账户查看注单详情</span></p>
			</li>
			<li><router-link to="/five" tag='button'>查看注单</router-link><button @click="betsucc">继续投注</button></li>
		</ul>
	</van-popup>
  </div>
</template>
<script>
	export default{
		data(){
			return{
				issantonghao:false,
				show:false,//头部中间
				showa:false,//头部右
				showan:0,//头部右数字
				money:1,//投注金额
				amount:0,//总金额
				rates:0,
				bet:false,//投注弹窗
				zhu:0,
				navs:0,
				navlist:0,
				timer:'',
				titles:'单挑一骰',
				listname:'江苏',
				lotteryId:'jsk3',
				playId:'k3_star1',//玩法术
				n1:1,
				n2:1,
				n3:1,
				getPastOpens:'',//获取过去开奖号码10个
				getPastO:'',//获取过去开奖号码1个
				LotteryList:'',
				seasonId:'',//截取后的期号
				seasonId2:'',//当前期号
				betsuccess:false,
				betGoshow:true,
				betk3ContentTopPop:false,
				today:'',
				countDown:'',
				// c:[],//选中的号码的下标
				d:[],//选中的号码的下标
				dd:[],//选中的号码的下标
				hezhiitem:[],//和值时选中的号码的下标
				con:'',
				cons:'',
				playBonus:'',//玩法树
				// 单挑一骰
				yishai:[
					{title:'1',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'2',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'3',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'4',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'5',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'6',rates:'赔率63.72',rate:'63.72',selected:false}
				],
				// 二同号
				ertonghao:[
					{title:'112',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'221',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'331',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'113',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'223',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'332',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'114',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'224',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'334',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'115',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'225',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'335',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'116',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'226',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'336',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'11',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'22',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'33',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'441',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'551',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'661',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'442',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'552',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'662',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'443',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'553',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'663',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'445',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'554',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'664',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'446',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'556',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'665',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'44',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'55',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'66',rates:'赔率63.72',rate:'63.72',selected:false},
				],
				// 二同号
				ertonghaos:[
					{
						a:[
							{title:'112',rates:'赔率63.72',rate:'63.72',selected:false},
							{title:'113',rates:'赔率63.72',rate:'63.72',selected:false},
							{title:'114',rates:'赔率63.72',rate:'63.72',selected:false},
							{title:'115',rates:'赔率63.72',rate:'63.72',selected:false},
							{title:'116',rates:'赔率63.72',rate:'63.72',selected:false},
						],
						a1:[
							{title:'11',rates:'赔率63.72',rate:'63.72',selected:false},
						]
					},
					{
						a:[
							{title:'221',rates:'赔率63.72',rate:'63.72',selected:false},
							{title:'223',rates:'赔率63.72',rate:'63.72',selected:false},
							{title:'224',rates:'赔率63.72',rate:'63.72',selected:false},
							{title:'225',rates:'赔率63.72',rate:'63.72',selected:false},
							{title:'226',rates:'赔率63.72',rate:'63.72',selected:false},
						],
						a1:[
							{title:'22',rates:'赔率63.72',rate:'63.72',selected:false},
						]
					},
					{
						a:[
							{title:'331',rates:'赔率63.72',rate:'63.72',selected:false},
							{title:'332',rates:'赔率63.72',rate:'63.72',selected:false},
							{title:'334',rates:'赔率63.72',rate:'63.72',selected:false},
							{title:'335',rates:'赔率63.72',rate:'63.72',selected:false},
							{title:'336',rates:'赔率63.72',rate:'63.72',selected:false},
						],
						a1:[
							{title:'33',rates:'赔率63.72',rate:'63.72',selected:false},
						]
					},
					{
						a:[
							{title:'441',rates:'赔率63.72',rate:'63.72',selected:false},
							{title:'442',rates:'赔率63.72',rate:'63.72',selected:false},
							{title:'443',rates:'赔率63.72',rate:'63.72',selected:false},
							{title:'445',rates:'赔率63.72',rate:'63.72',selected:false},
							{title:'446',rates:'赔率63.72',rate:'63.72',selected:false},
						],
						a1:[
							{title:'44',rates:'赔率63.72',rate:'63.72',selected:false},
						]
					},
					{
						a:[
							{title:'551',rates:'赔率63.72',rate:'63.72',selected:false},
							{title:'552',rates:'赔率63.72',rate:'63.72',selected:false},
							{title:'553',rates:'赔率63.72',rate:'63.72',selected:false},
							{title:'554',rates:'赔率63.72',rate:'63.72',selected:false},
							{title:'556',rates:'赔率63.72',rate:'63.72',selected:false},
						],
						a1:[
							{title:'55',rates:'赔率63.72',rate:'63.72',selected:false},
						]
					},
					{
						a:[
							{title:'661',rates:'赔率63.72',rate:'63.72',selected:false},
							{title:'662',rates:'赔率63.72',rate:'63.72',selected:false},
							{title:'663',rates:'赔率63.72',rate:'63.72',selected:false},
							{title:'664',rates:'赔率63.72',rate:'63.72',selected:false},
							{title:'665',rates:'赔率63.72',rate:'63.72',selected:false},
						],
						a1:[
							{title:'66',rates:'赔率63.72',rate:'63.72',selected:false},
						]
					},
				],
				// 二不同
				erbutong:[
					{title:'1',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'2',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'3',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'4',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'5',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'6',rates:'赔率63.72',rate:'63.72',selected:false}
				],
				// 和值
				k3options:[
					{title:'大',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'小',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'单',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'双',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'04',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'05',rates:'赔率31.86',rate:'31.86',selected:false},
					{title:'06',rates:'赔率19.11',rate:'19.11',selected:false},
					{title:'07',rates:'赔率12.74',rate:'12.74',selected:false},
					{title:'08',rates:'赔率9.10',rate:'9.10',selected:false},
					{title:'09',rates:'赔率7.64',rate:'7.64',selected:false},
					{title:'10',rates:'赔率7.08',rate:'7.08',selected:false},
					{title:'11',rates:'赔率7.08',rate:'7.08',selected:false},
					{title:'12',rates:'赔率7.64',rate:'7.64',selected:false},
					{title:'13',rates:'赔率9.10',rate:'9.10',selected:false},
					{title:'14',rates:'赔率12.74',rate:'12.74',selected:false},
					{title:'15',rates:'赔率19.11',rate:'19.11',selected:false},
					{title:'16',rates:'赔率31.86',rate:'31.86',selected:false},
					{title:'17',rates:'赔率63.72',rate:'63.72',selected:false},
				],
				// 大小单双
				daxiaodanshuang:[
					{title:'大',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'小',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'单',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'双',rates:'赔率63.72',rate:'63.72',selected:false},
				],
				// 三连号
				sanlianhao:[
					{title:'123',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'234',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'345',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'456',rates:'赔率63.72',rate:'63.72',selected:false}
				],
				// 三同号
				santonghao:[
					{title:'111',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'222',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'333',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'444',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'555',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'666',rates:'赔率63.72',rate:'63.72',selected:false}
				],
				// 三不同
				sanbutong:[
					{title:'1',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'2',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'3',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'4',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'5',rates:'赔率63.72',rate:'63.72',selected:false},
					{title:'6',rates:'赔率63.72',rate:'63.72',selected:false}
				],
			}
		},
		mounted(){
			this.getPastOpen();
			this.getPastOp();
			this.getLotteryList();//右上获取彩种
			this.getPlayTree();//玩法树
		},
		created(){
			
			this.geteServerTime();//input显示当前时间
		},
		methods:{
			//获取彩種當前獎期時間
			geteServerTime(){
				this.$http.get(this.$store.state.url+'api/lottery/getCurrentSaleTime',{params:{lotteryId:this.lotteryId}}).then((res) => {
					if (res.data.code === 1) {
						clearInterval(this.timer);
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
			initSetTimeout(){
				this.timer = setInterval(() =>{
				this.today = this.today-1;
				var hours = Math.floor((this.today % (1 * 60 * 60 * 24)) / (1 * 60 * 60));
						var minutes = Math.floor((this.today % (1 * 60 * 60)) / (1 * 60));
				var seconds = Math.floor((this.today % (1 * 60)) / 1);
				if(hours < 10){
					hours = "0"+hours
				}
				if(minutes < 10){
					minutes = "0"+minutes
				}
				if(seconds < 10){
					seconds = "0"+seconds
				}
				this.countDown = hours + ":" + minutes + ":" + seconds;
				if (this.today <1 ) {
						this.geteServerTime();
						clearInterval(this.timer);
					}
				},1000);
			},

			//获取过去开奖号码10个
			getPastOpen(){
				this.getLotteryList();
				this.$http.get(this.$store.state.url+'api/lottery/getPastOpen',{params:{lotteryId:this.lotteryId,count:10}}).then((res) => {
					this.getPastOpens = res.data.data;
				}).catch((error) => {
					console.log("获取过去开奖号码No")
				})
			},
			//获取过去开奖号码1个
			getPastOp(){
				this.$http.get(this.$store.state.url+'api/lottery/getPastOpen',{params:{lotteryId:this.lotteryId,count:1}}).then((res) => {
					this.getPastO = res.data.data;
				}).catch((error) => {
					console.log("获取过去开奖号码No")
				})
			},
			//右上获取彩种
			getLotteryList(){
				this.$http.get(this.$store.state.url+'api/lottery/getLotteryList').then((res) => {
					this.LotteryList = res.data.data.k3;
				}).catch((error) => {
					console.log("右上彩种No")
				})
			},
			//头部菜单项
			k3Tab(e,index,into){
				this.iscreat();
				this.titles = into.title;
				this.navlist = index;
				this.show = !this.show;
				this.playId = this.playBonus[index].id
			},
			//头部右->菜单点击
			listnames(e,index,into){
				this.listname = into.name.substring(0,2);
				this.lotteryId = into.id
				this.showan = index;
				this.showa = !this.showa;
				this.getPastOpen();
				this.getPastOp();
				this.geteServerTime();
				this.iscreat();
			},
			//三同号全/反选
			tosantonghao(){
				this.issantonghao = !this.issantonghao;
				for(let i=0;i<this.santonghao.length;i++){
					if(this.issantonghao === true){
						this.santonghao[i].selected = true;
						this.zhu ++;
						this.con ='111,222,333,444,555,666';
					}else if(this.issantonghao === false){
						this.santonghao[i].selected = false;
						this.iscreat();
					}
				}
			},
			//二同号
			ertonghaoto(e,index,k3item){
				k3item.selected = !k3item.selected;
				//取余==0
				if(k3item.selected === true){
					this.rates = k3item.rate;
					this.d[index] = k3item.title
					this.dd = this.d.filter(function(n) { return n; });
					this.con = this.dd.join(',');
					this.zhu ++;

					if(index === 15 && k3item.selected === true){
						k3item.selected === false;
						for(let i=0;i<this.ertonghao.length;i++){
							if(i % 3 === 0 && i<15){	
								this.ertonghao[i].selected = !this.ertonghao[i].selected;
								this.d[i] = this.ertonghao[i].title;
								this.dd = this.d.filter(function(n) { return n; });
								this.zhu ++;
							}
						}	
						if(index === 15 && k3item.selected === false){
							for(let i=0;i<this.ertonghao.length;i++){
								if(i % 3 === 0 && i<15){	
									this.con = '';
									this.zhu = 0;
								}
							}
						}
						this.con = this.dd.join(',');
					}
					//取余==1
					if(index === 16 && k3item.selected === true){
						for(let i=0;i<this.ertonghao.length;i++){
							if(i % 3 === 1 && i< 16){	
								this.ertonghao[i].selected = !this.ertonghao[i].selected;
								this.d[i] = this.ertonghao[i].title;
								this.dd = this.d.filter(function(n) { return n; });
								this.zhu ++;
							}
						}	
						if(index === 16 && k3item.selected === false){
							for(let i=0;i<this.ertonghao.length;i++){
								if(i % 3 === 1 && i< 16){	
									this.con = '';
									this.zhu = 0;
								}
							}
						}
						this.con = this.dd.join(',');
					}
					//取余==2
					if(index === 17 && k3item.selected === true){
						for(let i=0;i<this.ertonghao.length;i++){
							if(i % 3 === 2 && i< 17){	
								this.ertonghao[i].selected = !this.ertonghao[i].selected;
								this.d[i] = this.ertonghao[i].title;
								this.dd = this.d.filter(function(n) { return n; });
								this.zhu ++;
							}
						}	
						if(index === 17 && k3item.selected === false){
							for(let i=0;i<this.ertonghao.length;i++){
								if(i % 3 === 2 && i< 17){	
									this.con = '';
									this.zhu = 0;
								}
							}
						}
						this.con = this.dd.join(',');
					}
					//取余==0
					if(index === 33 && k3item.selected === true){
						for(let j=0;j<this.ertonghao.length;j++){
							if(j % 3 === 0 && j > 17 && j< 33){	
								this.ertonghao[j].selected = !this.ertonghao[j].selected;
								this.d[j] = this.ertonghao[j].title;
								this.dd = this.d.filter(function(n) { return n; });
								this.zhu ++;
							}
						}	
						if(index === 33 && k3item.selected === false){
							for(let j = 0;j < this.ertonghao.length;j++){
								if(j % 3 === 0 && j > 17 && j< 33){	
									this.con = '';
									this.zhu = 0;
								}
							}
						}
						this.con = this.dd.join(',');
					}
					//取余==1
					if(index === 34 && k3item.selected === true){
						for(let j=0;j<this.ertonghao.length;j++){
							if(j % 3 === 1 && j > 17 && j< 34){	
								this.ertonghao[j].selected = !this.ertonghao[j].selected;
								this.d[j] = this.ertonghao[j].title;
								this.dd = this.d.filter(function(n) { return n; });
								this.zhu ++;
							}
						}	
						if(index === 34 && k3item.selected === false){
							for(let j = 0;j < this.ertonghao.length;j++){
								if(j % 3 === 1 && j > 17 && j< 34){	
									this.con = '';
									this.zhu = 0;
								}
							}
						}
						this.con = this.dd.join(',');
					}
					//取余==2
					if(index === 35 && k3item.selected === true){
						for(let j=0;j<this.ertonghao.length;j++){
							if(j % 3 === 2 && j > 17 && j< 35){	
								this.ertonghao[j].selected = !this.ertonghao[j].selected;
								this.d[j] = this.ertonghao[j].title;
								this.dd = this.d.filter(function(n) { return n; });
								this.zhu ++;
							}
						}	
						if(index === 35 && k3item.selected === false){
							for(let j = 0;j < this.ertonghao.length;j++){
								if(j % 3 === 2 && j > 17 && j< 35){	
									this.con = '';
									this.zhu = 0;
								}
							}
						}
						this.con = this.dd.join(',');
					}
				}else if(k3item.selected === false){
					this.rates = 0;
					this.d.splice(index,1,"");
					this.dd = this.d.filter(function(n) { return n; });
					this.con = this.dd.join(',');
					this.zhu --;
				}

				// this.con = this.dd.join(',');
				if(this.zhu === 0){
					this.zhu = 0;
				}
				console.log(this.con)
			},
			//和值
			hezhi(e,index,k3item){
				k3item.selected = !k3item.selected;
				let rets = [3,6,10,15, 21, 25, 27, 27, 25, 21, 15, 10, 6,3];
					let selected = ['04','05','06','07', '08', '09', '10', '11', '12', '13', '14', '15', '16','17'];
					let j=0;
				if(k3item.selected === true){
					this.rates = k3item.rate;
					this.d[index] = k3item.title
					this.dd = this.d.filter(function(n) { return n; });
					this.con = this.dd.join(',');
					
					for (var i = 0; i < selected.length; i++) {
						for (var k = 0; k < this.d.length; k++) {
							if (selected[i] == this.d[k]) {
								this.hezhiitem[i] = rets[i]
								j += this.hezhiitem[i];
							}
						}
					}
					this.zhu = j;
					console.log(this.hezhiitem,'-----',this.hezhiitem[index])
				}else if(k3item.selected === false){
					this.rates = 0;
					this.d.splice(index,1,"");
					this.hezhiitem.splice(index,1,"");
					this.dd = this.d.filter(function(n) { return n; });
					this.con = this.dd.join(',');
					// this.zhu =this.zhu - hezhiitem[index];
					console.log(this.hezhiitem[index],'abc')
				}
				// console.log(this.hezhiitem,'abc')
				// console.log(this.zhu,hezhiitem,'----',this.zhu - hezhiitem[index]);
			},
			//玩法树
			getPlayTree(){
				this.$http.get(this.$store.state.url+'api/lottery/getPlayTree',{params:{lotteryId:this.lotteryId}}).then((res) => {
					this.playBonus = res.data.data.playBonus;
					console.log(res.data.data.playBonus,"玩法树");
				}).catch((error) => {
					console.log("玩法树No");
					// this.$store.state.loginStatus =false;
					// this.$router.push('/login');
				})
			},
			//中间->投注选号
			k3option(e,index,k3item){
				k3item.selected = !k3item.selected;
				if(k3item.selected === true){
					this.rates = k3item.rate;
					this.d[index] = k3item.title
					this.dd = this.d.filter(function(n) { return n; });
					this.con = this.dd.join(',');
					this.zhu ++;
					//二不同时
					if(this.playId === 'k3_star2_same_not'){
						let ret = this.groupSplit(this.dd,2);
						let arr=[];
						let abc='';
						for (var k = 0;k<ret.length;k++) {
							var cc = ret[k].join('');
							arr.push(cc);
						}
						abc = arr.join(',')
						this.con = abc;
						this.zhu = arr.length;
					}
					//三不同时
					if(this.playId === 'k3_star3_same_not'){
						let ret = this.groupSplit(this.dd,3);
						let arr=[];
						let abc='';
						for (var k = 0;k<ret.length;k++) {
							var cc = ret[k].join('');
							arr.push(cc);
						}
						abc = arr.join(',')
						this.con = abc;
						this.zhu = arr.length;
					}
					// console.log(this.d,'---',this.con,'---',this.con.length,'------')
				}else if(k3item.selected === false){
					this.rates = 0;
					this.d.splice(index,1,"");
					this.dd = this.d.filter(function(n) { return n; });
					this.con = this.dd.join(',');
					this.zhu --;
				}
			},
			//清空
			iscreat(){
				// 单挑一骰
				for(let i=0;i<this.yishai.length;i++){
					this.yishai[i].selected = false;
					this.d = [];
					this.con = '';
					this.zhu =0;
					this.money = 1;
				}
				// 二同号
				for(let i=0;i<this.ertonghao.length;i++){
					this.ertonghao[i].selected = false;
					this.d = [];
					this.con = '';
					this.zhu =0;
					this.money = 1;
				}
				// 二不同
				for(let i=0;i<this.erbutong.length;i++){
						this.erbutong[i].selected = false;
						this.d = [];
						this.con = '';
						this.zhu =0;
						this.money = 1;
				}
				// 和值
				for(let i=0;i<this.k3options.length;i++){
					this.k3options[i].selected = false;
					this.d = [];
					this.con = '';
					this.zhu =0;
					this.money = 1;
				}
				// 大小单双
				for(let i=0;i<this.daxiaodanshuang.length;i++){
					this.daxiaodanshuang[i].selected = false;
					this.d = [];
					this.con = '';
					this.zhu =0;
					this.money = 1;
				}
				// 三连号
				for(let i=0;i<this.sanlianhao.length;i++){
					this.sanlianhao[i].selected = false;
					this.d = [];
					this.con = '';
					this.zhu =0;
					this.money = 1;
				}
				// 三同号
				for(let i=0;i<this.santonghao.length;i++){
					this.santonghao[i].selected = false;
					this.d = [];
					this.con = '';
					this.zhu =0;
					this.money = 1;
				}
				// 三不同
				for(let i=0;i<this.sanbutong.length;i++){
					this.sanbutong[i].selected = false;
					this.d = [];
					this.con = '';
					this.zhu =0;
					this.money = 1;
				}
			},
			betC(){
				this.bet = !this.bet;
			},
			//投注
			betGo(){
				let config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'},withCredentials:true};
				let formData = new FormData();
					formData.append('order[0].content',this.con);
					formData.append('order[0].betCount',this.zhu);
					formData.append('order[0].price', this.money);
					formData.append('order[0].unit',1);
					formData.append('order[0].playId',this.playId);
					formData.append('count',this.zhu);
					formData.append('traceOrders[0].price', this.money);
					formData.append('traceOrders[0].seasonId', this.seasonId2);
					formData.append('bounsType', 0);
					formData.append('traceWinStop', 0);
					formData.append('isTrace', 0);
					formData.append('lotteryId', this.lotteryId);
					formData.append('amount', this.money * this.zhu);
				this.$axios.post(this.$store.state.url+'api/lottery/bet',formData,config).then((res) => {
					if(res.data.message === 'success'){
						this.betGoshow = !this.betGoshow;
						this.betsuccess = !this.betsuccess;
					}
					console.log(this.playId)
				}).catch((error) => {
					console.log("No");
				})
			},
			betsucc(){
				this.betsuccess = !this.betsuccess;
				this.$router.push({path:'/one'})
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
