<template>
  <div class="listStyle">
    <div class="listStyle-top">
      <router-link to="/five" tag="i" class="el-icon-arrow-left"></router-link>
      <p>交易记录</p>
      <div class="dim" @click="show = ! show">{{timeline}} <span class="el-icon-arrow-down"></span></div>
    </div>
    
    <div class="listStyle-content">
      <div class="listStyle-content-top">
        <van-actionsheet v-model="show" :actions="actions" cancel-text="取消">
        </van-actionsheet>
      </div>
	  <van-tabs v-model="accountChangeType" @click="print">
  		<van-tab class="typeo" v-for="(item,index) in pagelist" :key="index" :title="item.name">
   			 <!-- 内容 {{ item.name }} -->
  		</van-tab>
	  </van-tabs>

        <ul v-show="showFlag" class="listStyle-I">
                <li v-for="(item,index) in tradelist" :key="index">
                    <div class="mInvite-left">
                        <p><span>{{item.accountChangeTypeName}}</span><br>
                        <span></span>{{item.changeTime}}
                        </p>
                    </div>
                    <div class="mInvite-right">
                        <p>
                        <span>金额</span><br>
                        <span>{{item.changeAmount}}</span>
                        </p>
                    </div>
                </li>
        </ul>
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
        accountChangeTypeName:'',
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
            name:'所有类型',
            Type:100,
            callback: this.print,
          },
          {
            name:'提现记录',
            Type:1,
            callback: this.print,
          },
          {
            name:'充值记录',
            Type:2,
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
        this.selected = a;
      },
    onClick(item){
      this.timeline = item.name;
      this.betweenType = item.Type;
      this.show = ! this.show;
      this.getTradeList();
    },
    print(index,title){
      this.accountChangeType = this.pagelist[index].Type;
      this.getTradeList();
    },
    getTradeList(){
        this.$http.get(this.$store.state.url+'api/proxy/getTradeList',{params:{account:this.$store.state.Globalusername,include:0,accountChangeType:this.accountChangeType,betweenType:this.betweenType,}}).then((res) => {
            this.tradelist = res.data.data.list;
			}).catch((error) => {
                console.log(error);
                    console.log("获取彩種ratio ERROR");
		});
    },
  },
};
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/listStyle.scss';
</style>