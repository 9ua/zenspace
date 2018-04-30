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
	            <ul class="menu-list-top">
	            	<li v-for="(into,index) in playBonus" :key="index" :class="{'active': index === navlist}" @click="k3Tab($event,index,into)">
	            		<div class="title">
	            			{{into.title}}
	            		</div>
	            	</li>
	            </ul>
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
    <div class="betssc-content">重庆时时彩</div>
    
    <div class="betssc-footer">
    	<div class="betssc-footer-top" v-show="zhu > 0">
  			<div class="betssc-footer-tops">
  				<p>当前选号</p><span>{{con}}</span>
  			</div>
  			<div class="betssc-footer-buttoms">
  				<p>每注金额</p><input type="text" v-model="money" v-focus/>
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
				titles:'单挑一骰',
				listname:'重庆',
				lotteryId:'cqssc',
				LotteryList:'',
				money:1,//投注金额
				con:'3,4',
				zhu:1,
				rates:0,//最高可中
				playBonus:'',//玩法树
				navlist:0,
			}
		},
		mounted(){
			this.getLotteryList();//右上获取彩种
			this.getPlayTree();//玩法树
		},
		methods:{
//			
//			this.showpop = !this.showpop;
//    this.content = res.data.data.message
//    setTimeout(() => {
//      if(this.content === '验证成功！'){
//        this.$router.push({path: '/changeSafePwd'});
//      }
//    }, 2000);
//			
			//玩法树
			getPlayTree(){
				this.$http.get(this.$store.state.url+'api/lottery/getPlayTree',{params:{lotteryId:this.lotteryId}}).then((res) => {
					this.playBonus = res.data.data.playBonus;
					console.log(res.data.data.playBonus,"玩法树");
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
			},
			//头部菜单项
			k3Tab(e,index,into){
				this.titles = into.title;
				this.navlist = index;
				this.show = !this.show;
			},
			betC(){
				this.bet = !this.bet;
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
@import '../../../assets/scss/lotter-list/lotterbet/betssc.scss'
</style>