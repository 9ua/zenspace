<template>
  <div class="agent">
    <div class="agent-top">
      <router-link to="/agency" tag="i" class="el-icon-arrow-left"></router-link>
      <p>下级报表</p>
      <div class="dim" @click="show = ! show">{{timeline}} <span class="el-icon-arrow-down"></span></div>
    </div>
    
    <div class="agent-content">
      <div class="agent-content-top">
        <van-actionsheet class="mIcode-go" v-model="show" :actions="actions" cancel-text="取消">
        </van-actionsheet>
      </div>
      <div class="row">
        <div class="title">账号</div>
        <div class="title">类型</div>
        <div class="title">报表人数</div>
        <div class="title">盈利</div>
      </div>
      
      <ul style="padding:0">
        <li class="row2" v-for="(item,index) in underLevelReport" :key="index" @click="select(item,$event)">
          <div class="title">
            <p>{{item.account}}</p>
          </div>
          <div class="title">
            <p>{{item.userTypeName}}</p>
          </div>
          <div class="title">
            <p>{{item.teamCount}}</p>
          </div>
          <div class="title">
            <p>{{item.count}}</p>
          </div>
        </li>         
      </ul>

    </div>

    <van-actionsheet class="" v-model="show2">
	      <ul class="member-top">
            <li>
              <span>{{selected.account}}</span>
            </li>
            <router-link :to="{path:'/agentReport',query: {id: this.selected.account}}" tag="li"><p>下级报表</p><i class="el-icon-arrow-right"></i></router-link>
            <li><div class="button1"><button @click="show2 =! show2">确定</button></div></li>
        </ul>
	  </van-actionsheet>

  </div>
</template>
<script>
export default {
  data(){
    return {
        a:'',
        dateFlag:0,
        underLevelReport:[],
        timeline:'今天',
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
  mounted(){
      this.getUnderLevelReport();
  },
  methods: {
    select(a) {
        this.show2 = !this.show2;
        this.selected = a;
      },
    onClick(name){
      this.timeline = name.name;
      this.dateFlag = name.type;
      this.show = ! this.show;
      this.getUnderLevelReport();
    },
    getUnderLevelReport() {
			this.$http.get(this.$store.state.url+'api/proxy/getUnderLevelReport',{params:{account:this.$store.state.Globalusername,dateFlag:this.dateFlag}}).then((res) => {
        this.underLevelReport = res.data.data;
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