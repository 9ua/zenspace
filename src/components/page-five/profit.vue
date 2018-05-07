<template>
  <div class="profit">
    <div class="profit-top">
      <router-link to="/five" tag="i" class="el-icon-arrow-left"></router-link>
      <p>今日盈亏</p>
    </div>
    <div class="profit-content">
      <div class="profit-content-top">
        <div>
          <p>盈利金额</p>
          <p>{{winAmount-betAmount+activityAndSend+juniorRebateAmount}}</p>
        </div>
      </div>
      <div class="profit-contents">
        <i class="el-icon-warning"></i>盈亏计算公式：中奖-投注+活动+返点 </div>
      <div class="profit-content-list">
        <ul>
          <li>
            <span>{{betAmount}}</span>
            <span>投注金额</span>
          </li>
          <li>
            <span>{{winAmount}}</span>
            <span>中奖金额</span>
          </li>
          <li>
            <span>{{activityAndSend}}</span>
            <span>活动礼金</span>
          </li>
          <li>
            <span>{{juniorRebateAmount}}</span>
            <span>返点金额</span>
          </li>
          <li>
            <span>{{rechargeAmount}}</span>
            <span>充值金额</span>
          </li>
          <li>
            <span>{{drawingAmount}}</span>
            <span>提现金额</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
	data() {
      return {
		  id:'',
		  betAmount:0,
		  winAmount:0,
		  activityAndSend:0,
		  juniorRebateAmount:0,
		  rechargeAmount:0,
		  drawingAmount:0,

	  }
	},
	mounted(){
		this.getGainLost();
    },
	methods :{
		getGainLost() {
			this.$http.get(this.$store.state.url+'api/proxy/getGainLost').then((res) => {
        console.log(res.data.data);
          this.betAmount = res.data.data.betAmount;
          this.winAmount = res.data.data.winAmount;
          this.activityAndSend = res.data.data.activityAndSend;
          this.juniorRebateAmount = res.data.data.juniorRebateAmount;
          this.rechargeAmount = res.data.data.rechargeAmount;
          this.drawingAmount = res.data.data.drawingAmount;
          
			}).catch((error) => {
					console.log("获取列表Error");
			});
		},
	}
}
</script>
<style lang="scss" scoped>
  @import '../../assets/scss/page-five/profit.scss';
</style>