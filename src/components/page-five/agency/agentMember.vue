<template>
  <div class="agent">
    <div class="agent-top">
      <router-link to="/agency" tag="i" class="el-icon-arrow-left"></router-link>
      <p>会员管理</p>
    </div>
    <div class="agent-content">
      <div class="row">
        <div class="title">账号</div>
        <div class="title">类型</div>
        <div class="title">登录时间</div>
        <div class="title">下级人数</div>
      </div>
      
      <ul style="padding:0">
        <li class="row2" v-for="(item,index) in underUserList" :key="index" @click="select(item,$event)">
          <div class="title">
            <p>{{item.account}}</p>
          </div>
          <div class="title2">
            <p>{{item.userTypeName}}</p>
          </div>
          <div class="title3">
            <p>{{item.loginTime}}</p>
          </div>
          <div class="title2">
            <p>{{item.childCount}}</p>
          </div>
        </li>         
      </ul>
    </div>

    <van-actionsheet class="" v-model="show2">
	      <ul class="member-top">
            <li>
              <span>{{selected.account}}</span>
            </li>
            <li>
              <p>返點率 {{selected.rebateRatio}}</p>
            </li>
            <li><div class="button1"><button @click="show2 =! show2">确定</button></div></li>
        </ul>
	  </van-actionsheet>




  </div>
</template>
<script>
export default {
  data(){
    return {
        dateFlag:0,
        underUserList:[],
        timeline:'今日',
        show:false,
        show2:false,
        usertype:2,
        highbet:0,
        rebateratio:0,
        betlist:[],
        validtime:0,
        extaddress:'',
        invitelist:'',
        selected:[],
        showFlag: true,
        
    }
  },
  mounted(){
      this.getUnderUserList();
  },
  methods: {
      select(a) {
        this.show2 = !this.show2;
        this.selected = a;
      },
    getUnderUserList() {
			this.$http.get(this.$store.state.url+'api/proxy/getUnderUserList',{params:{account:this.$store.state.Globalusername}}).then((res) => {
        this.underUserList = res.data.data;
			}).catch((error) => {
					console.log("获取列表Error");
			});
		},
  },
};
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/page-five/agency/agent.scss';
</style>