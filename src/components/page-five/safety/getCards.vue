<template>
  <div class="agent">
    <div class="agent-top">
      <router-link to="/safety" tag="i" class="el-icon-arrow-left"></router-link>
      <p>银行卡管理</p>
    </div>
    
    <div class="agent-content">
      <div class="agent-content-top">
        <van-actionsheet class="mIcode-go" v-model="show" :actions="actions" cancel-text="取消">
        </van-actionsheet>
      </div>
      <ul style="padding:0">
        <li class="row2" v-for="(item,index) in bankUserList" :key="index" @click="select(item,$event)">
          <div class="title4">
            <p>{{item.bankNameId}} --  {{item.card | lastFive}}</p>
          </div>
          <div class="title">
            <p>修改</p>
          </div>
        </li>         
      </ul>
        <div class="button1"><button @click="goCreate()">添加银行卡</button></div>
        <div class="warning"><p>{{content}}</p></div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
        content:'',
        securityCoe:'',
        loading:false,
        dateFlag:0,
        bankUserList:[],
        timeline:'今天',
        show:false,
        show2:false,
        usertype:2,
        selected:[],
        showFlag: true,
        actions: [
        {
          name: '今天',
          type:0,
          callback: this.onClick,
        },
        {
          name: '昨天',
          type:1,
          callback: this.onClick,
        },
        {
          name: '本月',
          type:2,
          callback: this.onClick,
          loading: false
        },
        {
          name: '上月',
          type:3,
          callback: this.onClick,
          loading: false
        }
        ],
        
        
    }
  },
  created(){
        this.getBankUserList();
  },
  mounted(){
  },
  methods: {
        //取安全中心状态
			getSecurityCenterStatus(){
				this.$axios.get(this.$store.state.url+'api/userCenter/getSecurityCenterStatus').then((res) => {
					this.securityCoe = res.data.data.securityCoe;
					if(this.securityCoe === 0){
                        console.log(popup安全密碼先確認唷)
					} 
				}).catch((error) => {
						console.log("取安全中心状态No")
				})
				
			},

    onClick(name){
      this.timeline = name.name;
      this.dateFlag = name.type;
      this.show = ! this.show;
    },
    goCreate(){
            this.$axios.get(this.$store.state.url+'api/userCenter/getSecurityCenterStatus').then((res) => {
					this.securityCoe = res.data.data.securityCoe;
					if(this.securityCoe === 0){
                        console.log(popup安全密碼先確認唷)
					} else {
                        this.$router.push({path:'/newCard'});
                    }
			}).catch((error) => {
					console.log("取安全中心状态No")
			})

    },
    getBankUserList() {
			this.$http.get(this.$store.state.url+'api/proxy/getBankUserList').then((res) => {
                    this.bankUserList = res.data.data;
                    console.log(this.bankUserList);
                if (res.data.data.length === 0) {
                    
                    this.content = '您尚未绑定银行卡，一共可以绑定 5 张银行卡。';
                } else {
                    this.content = '您已绑定 '+res.data.data.length+' 张银行卡，一共可以绑定5张银行卡。为了您的资金安全，成功提现的银行卡会自动锁定，无法删除和修改。';
                }
                
			}).catch((error) => {
					console.log("获取列表Error");
			});
		},
  },
  filters: {
      lastFive(value) {
        let end = value.slice(-5);
        return `************${end}`;
      },
    },
};
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/page-five/agency/agent.scss';
</style>