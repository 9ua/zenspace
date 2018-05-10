<template>
  <div class="agent">
    <div class="agent-top">
      <router-link to="/five" tag="i" class="el-icon-arrow-left"></router-link>
      <p>投注记录</p>
      <div class="dim" @click="show = ! show">{{timeline}} <span class="el-icon-arrow-down"></span></div>
    </div>
    
    <div class="agent-content recharge">
      <div class="agent-content-top">
        <van-actionsheet class="mIcode-go" v-model="show" :actions="actions" cancel-text="取消">
        </van-actionsheet>
      </div>
	  <van-tabs v-model="accountChangeType" @click="print">
  		<van-tab class="typeo" v-for="(item,index) in pagelist" :key="index" :title="item.name">
   			 <!-- 内容 {{ item.name }} -->
  		</van-tab>
	  </van-tabs>

        <ul v-show="showFlag">
                <li v-for="(item,index) in tradelist" :key="index" @click="select(item,$event)">
                    <div class="mInvite-left">
                        <p><span>{{item.lotteryName}} - ￥{{item.amount}}</span><br>
                        <span></span>{{item.createTime}}
                        </p>
                    </div>
                    <div class="mInvite-right">
                        <p>
                        <span>{{item.statusName}}</span><br>
                        <span></span>
                        </p>
                    </div>
                    <i class="el-icon-arrow-down"></i>
                </li>
        </ul>
        <van-actionsheet class="" v-model="show2">
	            <ul class="recharge-top">
            <li>
              <span>{{selected.lotteryName}}</span>
            </li>
            <li><p>第{{selected.seasonId}}期</p> <p>{{selected.statusName}}</p></li>
            <li>
              <p>投注時間</p><span>{{selected.createTime}}</span>
            </li>
            <li>
              <p>投注单号</p><span>{{selected.id}}</span>
            </li>
            <li>
              <p>投注金额</p><span>￥ {{selected.amount}}</span>
            </li>
            <li>
              <p>派送奖金</p><span>￥ {{selected.win}}</span>
            </li>
            <li>
              <p>开奖号码</p><span>{{selected.openNum}}</span>
            </li>
            <li>
              <p>我的投注</p>{{selected.content}}<p>玩法</p>{{selected.playName}}
            </li>
            <li><div class="button1"><button @click="show2 =! show2">确定</button></div></li>
          </ul>
	      </van-actionsheet>

    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
		    active: 1,
        timeline:'今天',
        show:false,
        show2:false,
        accountChangeType:100,
        betweenType:1,
        status:100,
        changeAmount:'',
        changeTime:'',
        tradelist:[],


        usertype:2,
        highbet:0,
        rebateratio:0,
        betlist:[],
        validtime:0,
        extaddress:'',
        invitelist:'',
        selected:[],
		showFlag: true,
          pagelist:[
          {
            name:'全部',
            Type:100,
            callback: this.print,
          },
          {
            name:'已中獎',
            Type:1,
            callback: this.print,
          },
          {
            name:'未中獎',
            Type:2,
            callback: this.print,
          },
          {
            name:'等待开奖',
            Type:6,
            callback: this.print,
          }
        ],
        actions: [
        {
          name: '今天',
          Type:1,
          callback: this.onClick,
        },
        {
          name: '昨天',
          Type:2,
          callback: this.onClick,
        //   subname: '描述信息'
        },
        {
          name: '七天',
          Type:3,
          callback: this.onClick,
          loading: false
        },
        ],
        
        
    }
  },
  mounted(){
      this.getTradeList();
  },
  methods: {
    select(a) {
        this.show2 = !this.show2;
            console.log(a);
        this.selected = a;
      },
    onClick(item){
      this.timeline = item.name;
      this.betweenType = item.Type;
      this.show = ! this.show;
      console.log(this.betweenType);
      this.getTradeList();
    },
    print(index,title){
      this.status = this.pagelist[index].Type;
      console.log(this.pagelist[index].Type);
      this.getTradeList();
    },
    getTradeList(){
        this.$http.get(this.$store.state.url+'api/proxy/getbetOrderList',{params:{account:this.$store.state.Globalusername,include:0,status:this.status,betweenType:this.betweenType,}}).then((res) => {
        this.tradelist = res.data.data.list;
        console.log(this.tradelist);
			}).catch((error) => {
        console.log(error);
        console.log("获取彩種ratio ERROR");
		});
    },
  },
};
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/page-five/agency/agent.scss';
</style>