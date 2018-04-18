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
	            	<!--<li>
	            		<div class="title">
	            			和值
	            		</div>
	            		<div class="xq">1.97-191.16倍</div>
	            		<div class="img">
	            			<span class="img1"></span>+ <span class="img2"></span>+ <span class="img3"></span>
	            		</div>
	            	</li>
	            	<li>
	            		<div class="title">
	            			三同号通选
	            		</div>
	            		<div class="xq">赔率31.86倍</div>
	            		<div class="img">
	            			<span class="img1"></span><span class="img2"></span><span class="img3"></span>
	            		</div>
	            	</li>
	            	<li>
	            		<div class="title">
	            			三同号单选
	            		</div>
	            		<div class="xq">赔率191.16倍</div>
	            		<div class="img">
	            			<span class="img1"></span><span class="img2"></span><span class="img3"></span>
	            		</div>
	            	</li>
	            	<li>
	            		<div class="title">
	            			三不同号
	            		</div>
	            		<div class="xq">赔率31.86倍</div>
	            		<div class="img">
	            			<span class="img1"></span><span class="img2"></span><span class="img3"></span>
	            		</div>
	            	</li>
	            	<li>
	            		<div class="title">
	            			三连号通选
	            		</div>
	            		<div class="xq">赔率7.96倍</div>
	            		<div class="img">
	            			<span class="img1"></span><span class="img2"></span><span class="img3"></span>
	            		</div>
	            	</li>
	            	<li>
	            		<div class="title">
	            			二同号复选
	            		</div>
	            		<div class="xq">赔率12.74倍</div>
	            		<div class="img">
	            			<span class="img1"></span><span class="img2"></span><span class="img3"></span>
	            		</div>
	            	</li>
	            	<li>
	            		<div class="title">
	            			二同号单选
	            		</div>
	            		<div class="xq">赔率63.72倍</div>
	            		<div class="img">
	            			<span class="img1"></span><span class="img2"></span><span class="img3"></span>
	            		</div>
	            	</li>
	            	<li>
	            		<div class="title">
	            			二不同号
	            		</div>
	            		<div class="xq">赔率6.37倍</div>
	            		<div class="img">
	            			<span class="img1"></span><span class="img2"></span><span class="img3"></span>
	            		</div>
	            	</li>
	            	<li>
	            		<div class="title">
	            			单骰
	            		</div>
	            		<div class="xq">赔率1倍</div>
	            		<div class="img">
	            			<span class="img1"></span>
	            		</div>
	            	</li>-->
	            </ul>
	        </van-popup>
        </div>
      </li>
      <li>
      	<span>大发</span>
      	<i class="el-icon-caret-bottom"></i>
      	<ul>
      		<li></li>
      	</ul>
      </li>
    </ul>
    <div class="betk3-content">快3</div>
  </div>
</template>
<script>
	export default{
		data(){
			return{
				show:false,
				navs:0,
				navlist:0,
				titles:'和值',
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
				]
			}
		},
		methods:{
			k3Tab(e,index,into){
				this.titles = into.title;
        this.navlist = index;
        this.show = !this.show;
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