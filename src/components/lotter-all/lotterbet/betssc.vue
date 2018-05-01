<template>
  <div class="betssc">
    <ul class="betssc-top">
      <li><router-link to="/one" tag="i" class="el-icon-arrow-left"></router-link></li>
      <li>
      	<p class="wangfa">玩<br/>法</p>
        <div class="menu" @click="show = !show">{{titles}}
          <i :class="show ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
        </div>
        <div class="menu-list">
	        <van-popup v-model="show" position="top" >
				<div class="popscroll">
					<ul class="menu-list-top">
						<li v-for="(into,index) in playGroups" :key="index">
							<div class="title">{{into.title}}</div>
							<div class="menu-list-list-box">
								<div class="menu-list-list" v-for="(item,indexa) in into.groups" :key="indexa">
									<!-- <span :class="{'active': indexs === navlist}" v-for="(items,indexs) in item.players" :key="indexs" @click="k3Tab($event,indexs,items,into)"> -->
									<span v-for="(items,indexb) in item.players" :key="indexb" @click="k3Tab($event,indexa,indexb,items,into,index)">
										<!-- <a>{{index}}</a> -->
										<!-- <a>{{indexa}}</a> -->
										<!-- <a>{{indexb}}</a> -->
										<a>{{items.title}}</a>
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
      	<van-popup v-model=" showa" position="top" >
	        <ul>
	      		<li v-for="(listssc,index) in LotteryList" :key="index" @click="listnames($event,index,listssc)"><a>{{listssc.name}}</a></li>
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
	    			<p>{{'0'+(seasonId*1)}}期投注截止</p>
	    			<div>
	    				<p>{{countDown}}</p>
	    			</div>
	    		</div>
	    	</div>
			<div class="betk3-content-top-pop" v-show="betsscContentTopPop">
				<ul>
					<li><p>期号</p><p>开奖号码</p><p>开奖时间</p></li>
					<li v-for="(item,index) in getPastOpens" :key="index">
						<p>{{item.seasonId.substring(4).split("-").join("")}}<i class="el-icon-minus"></i></p>
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
						<span v-for="(player,indexe) in group.players" :key="indexe" v-show="indexe === navlistf">{{player.remark}}<b>。奖金 <i>{{player.bonus}}</i> 元</b><br/></span>
						<ul class="fushi" v-show="playBonusId === 'ssc_star5'">
							<!-- <li v-for="(item,index) in layout" :key="index">
								<p>
									<b>{{item.title}}</b>
									<span v-for="(b,bs) in item.balls" :key="bs" :class="b.choose ? 'active' : '' " @click.stop="curBall(b,item,bs)">{{b.ball}}</span>
								</p>
							</li> -->
							<li v-for="(player,indexf) in group.players" :key="indexf">
								<p v-for="(numViews,indexff) in player.numView" :key="indexff">
									<b>{{numViews.title}}</b>
									<span v-for="(num,indexg) in numViews.nums" :key="indexg" :class=" indexg ? 'active' : '' " @click="curBalls(indexg,num,numViews)">{{num}}</span>
								</p>
							</li>
						</ul>
						<ul class="fushi" v-show="playBonusId === 'ssc_star5_group5'">
							<li v-for="(item,index) in zuxuan" :key="index">
								<p>
									<b>{{item.title}}</b>
									<span v-for="(b,bs) in item.balls" :key="bs" :class="b.choose ? 'active' : '' " @click.stop="curBall(b,item,bs)">{{b.ball}}</span>
								</p>
							</li>
						</ul>
						<ul class="fushi" v-show="playBonusId === 'ssc_star5_group10'">
							<li v-for="(item,index) in chonghao" :key="index">
								<p>
									<b>{{item.title}}</b>
									<span v-for="(b,bs) in item.balls" :key="bs" :class="b.choose ? 'active' : '' " @click.stop="curBall(b,item,bs)">{{b.ball}}</span>
								</p>
							</li>
						</ul>
						<ul class="fushi" v-show="playBonusId === 'ssc_star5_group20'">
							<li v-for="(item,index) in zuxuan" :key="index">
								<p>
									<b>{{item.title}}</b>
									<span v-for="(b,bs) in item.balls" :key="bs" :class="b.choose ? 'active' : '' " @click.stop="curBall(b,item,bs)">{{b.ball}}</span>
								</p>
							</li>
						</ul>
						<ul class="fushi" v-show="playBonusId === 'ssc_star5_group30'">
							<li v-for="(item,index) in zuxuan" :key="index">
								<p>
									<b>{{item.title}}</b>
									<span v-for="(b,bs) in item.balls" :key="bs" :class="b.choose ? 'active' : '' " @click.stop="curBall(b,item,bs)">{{b.ball}}</span>
								</p>
							</li>
						</ul>
						<ul class="fushi" v-show="playBonusId === 'ssc_star5_group60'">
							<li v-for="(item,index) in zuxuan" :key="index">
								<p>
									<b>{{item.title}}</b>
									<span v-for="(b,bs) in item.balls" :key="bs" :class="b.choose ? 'active' : '' " @click.stop="curBall(b,item,bs)">{{b.ball}}</span>
								</p>
							</li>
						</ul>
						<ul class="fushi" v-show="playBonusId === 'ssc_star5_group120'">
							<li>
								<p>
									<b></b>
									<span v-for="(item,index) in zuxuan120" :key="index" :class="item.choose ? 'active' : '' " @click.stop="curBall(item,index)">{{item.ball}}</span>
								</p>
							</li>
						</ul>
						<ul class="fushi" v-show="playBonusId === 'ssc_star5_other1'">
							<li>
								<p>
									<b></b>
									<span v-for="(item,index) in zuxuan120" :key="index" :class="item.choose ? 'active' : '' " @click.stop="curBall(item,index)">{{item.ball}}</span>
								</p>
							</li>
						</ul>
						<ul class="fushi" v-show="playBonusId === 'ssc_star5_other2'">
							<li>
								<p>
									<b></b>
									<span v-for="(item,index) in zuxuan120" :key="index" :class="item.choose ? 'active' : '' " @click.stop="curBall(item,index)">{{item.ball}}</span>
								</p>
							</li>
						</ul>
						<ul class="fushi" v-show="playBonusId === 'ssc_star5_other3'">
							<li>
								<p>
									<b></b>
									<span v-for="(item,index) in zuxuan120" :key="index" :class="item.choose ? 'active' : '' " @click.stop="curBall(item,index)">{{item.ball}}</span>
								</p>
							</li>
						</ul>
						<ul class="fushi" v-show="playBonusId === 'ssc_star5_other4'">
							<li>
								<p>
									<b></b>
									<span v-for="(item,index) in zuxuan120" :key="index" :class="item.choose ? 'active' : '' " @click.stop="curBall(item,index)">{{item.ball}}</span>
								</p>
							</li>
						</ul>
						<ul class="fushi" v-show="playBonusId === 'ssc_star5_none1'">
							<li>
								<p>
									<b></b>
									<span v-for="(item,index) in zuxuan120" :key="index" :class="item.choose ? 'active' : '' " @click.stop="curBall(item,index)">{{item.ball}}</span>
								</p>
							</li>
						</ul>
						<ul class="fushi" v-show="playBonusId === 'ssc_star5_none2'">
							<li>
								<p>
									<b></b>
									<span v-for="(item,index) in zuxuan120" :key="index" :class="item.choose ? 'active' : '' " @click.stop="curBall(item,index)">{{item.ball}}</span>
								</p>
							</li>
						</ul>
						<ul class="fushi" v-show="playBonusId === 'ssc_star5_none3'">
							<li>
								<p>
									<b></b>
									<span v-for="(item,index) in zuxuan120" :key="index" :class="item.choose ? 'active' : '' " @click.stop="curBall(item,index)">{{item.ball}}</span>
								</p>
							</li>
						</ul>
						<div class="danshi">
							<textarea  cols="30" rows="10" v-model="con" v-show="playBonusId === 'ssc_star5_single'" placeholder="每一个号码之间无需用符号隔开"></textarea>
						</div>
					</div>
				</div>
			</div>
	    </div>
    </div>
    
    <div class="betssc-footer">
    	<div class="betssc-footer-top" v-show="zhu > 0">
  			<div class="betssc-footer-tops">
  				<p>当前选号</p><span>{{con}}</span>
  			</div>
  			<div class="betssc-footer-buttoms">
  				<p>每注金额</p><input type="text" v-model="money"/>
  				<span v-if="money === '' ">请输入要投注的金额</span>
  				<span v-else>最高可中<p>{{rates}}</p>元</span>
  			</div>
  		</div>
  		<div class="betssc-footer-buttom">
  			<div class="betssc-footer-buttom-left">
  				<button @click="iscreat">清空</button>
  				<p><span v-if="zhu >0">共{{zhu}}注,</span><span v-if="this.money !== '' ">共{{zhu*money}}元</span></p>
  			</div>
  			<div class="betssc-footer-buttom-right" @click="betC">马上投注</div>
  		</div>
    </div>
    <van-popup class="sscpop" v-model="showpop">{{content}}</van-popup>
  </div>
</template>
<script>
	export default{
		data(){
			return{
				showpop:false,//弹窗
        		content:'提示内容!',//弹窗内容
				show:false,//头部中间
				showa:false,//头部右
				showan:0,//头部右数字
				titles:'五星 复式',
				listname:'重庆',
				lotteryId:'cqssc',
				LotteryList:'',
				money:1,//投注金额
				con:'',//已选号码
				zhu:0,//注数
				rates:0,//最高可中
				playBonus:'',//玩法树
				playBonusId:'ssc_star5',//点击选中后获取此玩法ID
				playGroups:'',
				navlist:0,
				navlistb:0,
				navlistf:0,
				betsscContentTopPop:false,
				getPastOpens:'',//获取过去开奖号码10个
				getPastO:'',//获取过去开奖号码1个
				seasonId:'',//截取后的期号
				seasonId2:'',//当前期号
				countDown:'',
				players:'',
				intotitle:'',
				itemstitle:'复式',
				d:[],//选中的号码的下标
				layout: [
					{"title": "万位","balls": [{"ball": 0,"choose": false},{"ball": 1,"choose": false},{"ball": 2,"choose": false},{"ball": 3,"choose": false},{"ball": 4,"choose": false},{"ball": 5,"choose": false},{"ball": 6,"choose": false},{"ball": 7,"choose": false},{"ball": 8,"choose": false},{"ball": 9,"choose": false}]}, 
					{"title": "千位","balls": [{"ball": 0,"choose": false},{"ball": 1,"choose": false},{"ball": 2,"choose": false},{"ball": 3,"choose": false},{"ball": 4,"choose": false},{"ball": 5,"choose": false},{"ball": 6,"choose": false},{"ball": 7,"choose": false},{"ball": 8,"choose": false},{"ball": 9,"choose": false}]}, 
					{"title": "百位","balls": [{"ball": 0,"choose": false},{"ball": 1,"choose": false},{"ball": 2,"choose": false},{"ball": 3,"choose": false},{"ball": 4,"choose": false},{"ball": 5,"choose": false},{"ball": 6,"choose": false},{"ball": 7,"choose": false},{"ball": 8,"choose": false},{"ball": 9,"choose": false}]}, 
					{"title": "十位","balls": [{"ball": 0,"choose": false},{"ball": 1,"choose": false},{"ball": 2,"choose": false},{"ball": 3,"choose": false},{"ball": 4,"choose": false},{"ball": 5,"choose": false},{"ball": 6,"choose": false},{"ball": 7,"choose": false},{"ball": 8,"choose": false},{"ball": 9,"choose": false}]}, 
					{"title": "个位","balls": [{"ball": 0,"choose": false},{"ball": 1,"choose": false},{"ball": 2,"choose": false},{"ball": 3,"choose": false},{"ball": 4,"choose": false},{"ball": 5,"choose": false},{"ball": 6,"choose": false},{"ball": 7,"choose": false},{"ball": 8,"choose": false},{"ball": 9,"choose": false}]}, 
				],
				zuxuan: [
					{"title": "重号","balls": [{"ball": 0,"choose": false},{"ball": 1,"choose": false},{"ball": 2,"choose": false},{"ball": 3,"choose": false},{"ball": 4,"choose": false},{"ball": 5,"choose": false},{"ball": 6,"choose": false},{"ball": 7,"choose": false},{"ball": 8,"choose": false},{"ball": 9,"choose": false}]}, 
					{"title": "单号","balls": [{"ball": 0,"choose": false},{"ball": 1,"choose": false},{"ball": 2,"choose": false},{"ball": 3,"choose": false},{"ball": 4,"choose": false},{"ball": 5,"choose": false},{"ball": 6,"choose": false},{"ball": 7,"choose": false},{"ball": 8,"choose": false},{"ball": 9,"choose": false}]}, 
				],
				chonghao: [
					{"title": "三重号","balls": [{"ball": 0,"choose": false},{"ball": 1,"choose": false},{"ball": 2,"choose": false},{"ball": 3,"choose": false},{"ball": 4,"choose": false},{"ball": 5,"choose": false},{"ball": 6,"choose": false},{"ball": 7,"choose": false},{"ball": 8,"choose": false},{"ball": 9,"choose": false}]}, 
					{"title": "二重号","balls": [{"ball": 0,"choose": false},{"ball": 1,"choose": false},{"ball": 2,"choose": false},{"ball": 3,"choose": false},{"ball": 4,"choose": false},{"ball": 5,"choose": false},{"ball": 6,"choose": false},{"ball": 7,"choose": false},{"ball": 8,"choose": false},{"ball": 9,"choose": false}]}, 
				],
				zuxuan120: [
					{"ball": 0,"choose": false},{"ball": 1,"choose": false},{"ball": 2,"choose": false},{"ball": 3,"choose": false},{"ball": 4,"choose": false},{"ball": 5,"choose": false},{"ball": 6,"choose": false},{"ball": 7,"choose": false},{"ball": 8,"choose": false},{"ball": 9,"choose": false}, 
				],
			}
		},
		mounted(){
			this.getPastOpen();//获取过去开奖号码10个
			this.getPastOp();//获取过去开奖号码1个
			this.geteServerTime();//获取彩種當前獎期時間
			this.getLotteryList();//右上获取彩种
			this.getPlayTree();//玩法树
		},
		created() {
　　		this.geteServerTime(this.today),//input显示当前时间
　　		this.initSetTimeout(this.today)//调用每隔1秒刷新数据,
		},
		methods:{	
			curBalls(indexg,num,numViews){
				
			},
			// 如果只能选择一个球
			curBall(b,item,index){
				if(item.choose) {
					item.balls.map((b) => {
						b.choose = false
					})
				}
				b.choose = !b.choose
				if(b.choose === true){
					this.d.push(b.ball);
					
					this.d.sort((a,b) => {
						return a-b;
					})
					this.con = this.d.join(',');
					this.zhu ++;
				}else if(b.choose === false){
					this.d.splice(1,"");
					this.con = this.d.join(',');
					this.zhu --;
				}
			},		
			//玩法树
			getPlayTree(){
				this.$http.get(this.$store.state.url+'api/lottery/getPlayTree',{params:{lotteryId:this.lotteryId}}).then((res) => {
					this.playBonus = res.data.data.playBonus;
					this.playGroups = res.data.data.playGroups;
					// console.log(this.playGroups,"玩法树");
				}).catch((error) => {
					console.log("玩法树No");
				})
			},
			//右上获取彩种
			getLotteryList(){
				this.$http.get(this.$store.state.url+'api/lottery/getLotteryList').then((res) => {
					this.LotteryList = res.data.data.ssc;
				}).catch((error) => {
					console.log("右上彩种No")
				})
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
			},
			//头部菜单项
			k3Tab(e,indexa,indexb,items,into,index){
				this.titles = into.title+ ' ' +items.title;
				this.intotitle = into.title;
				this.itemstitle = items.title;
				this.navlist = index;
				this.navlistb = indexa;
				this.navlistf = indexb;
				this.playBonusId = items.id;
				this.show = !this.show;
				console.log('--index',index)
				console.log('--this.navlistf',this.navlistf)
				console.log('--this.navlist',this.navlist)
				console.log('--this.intotitle',this.intotitle)
				console.log('--this.itemstitle',this.itemstitle)
				console.log('--this.titles',this.titles)
				console.log('--this.playBonusId',this.playBonusId)
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
			//获取彩種當前獎期時間
			geteServerTime(){
				this.$http.get(this.$store.state.url+'api/lottery/getCurrentSaleTime',{params:{lotteryId:this.lotteryId}}).then((res) => {
					this.seasonId2 = res.data.data.seasonId
					this.seasonId = this.seasonId2.substring(4).split("-").join("");
					this.today = res.data.data.restSeconds;
				}).catch((error) => {
					console.log("获取彩種當前獎期時間No");
				})
			},
			//倒计时
			initSetTimeout(today){
				setInterval(() =>{
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
					if (this.today < 1) {
   				    	this.geteServerTime();
  					}
				},1000);
			},
			betC(){
				this.bet = !this.bet;
			},
			//清空
			iscreat(){
				for(let i=0;i<this.layout.length;i++){
					for(let j=0;j<this.layout[i].balls.length;j++){
						this.layout[i].balls[j].choose = false;
						this.d = [];
						this.con = '';
						this.zhu =0;
						this.money = '1';
					}
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
		}
	}
</script>
<style lang="scss" scoped>
@import '../../../assets/scss/lotter-list/lotterbet/betssc.scss'
</style>