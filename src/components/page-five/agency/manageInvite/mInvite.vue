<template>
  <div class="mInvite">
    <div class="mInvite-content2">
        <ul>
            <li>
            <span>用户类型</span>
            <yd-radio-group v-model="usertype">
                <yd-radio val="0">会员</yd-radio>
                <yd-radio val="1">代理</yd-radio>
            </yd-radio-group>
            </li>
            <li>
            <span>设定返点</span>
            <select v-model="rebateratio"  @change="setrebet($event)">
                <option v-for="bet in betlist" :key="bet" :value="bet">{{bet}}</option>
            </select></li>
            <li>
            <span>推广渠道</span>
            <input type="text" v-model="extaddress" onfocus="this.select()" placeholder="请输入推廣渠道" />
            </li>
            <!-- <li>
            <span>推廣QQ</span>
            <input type="password" v-model="password2" onfocus="this.select()" placeholder="请输入您要设置的推廣QQ" /> </li> -->
      </ul>
    </div>
    <div class="mInvite-go">
        <button @click="getInviteCode()">取得邀请码</button>
    </div>
  </div>
</template>
<script>
import { setStore, getStore,removeStore } from '../../../../config/mutil'
export default {
  data(){
    return {
        usertype:0,
        highbet:0,
        rebateratio:0,
        betlist:[],
        validtime:0,
        extaddress:'',
    }
  },
  mounted(){
      this.createbetlist(); 
  },
  methods: {
    createbetlist(){
        this.$http.get(this.$store.state.url+'api/agent/getExtQuota').then((res) => {
            this.highbet = res.data.data.rebateRatio;
            for(let i = res.data.data.rebateRatio*10; i >= 0 ; i = i - 1 ){this.betlist.push(i/10)};
                return this.betlist;
			}).catch((error) => {
                console.log(error);
                    console.log("获取彩種ratio ERROR");
                    this.highbet = 0;
            for(let i = this.highbet*10; i >= 0 ; i = i - 1 ){this.betlist.push(i/10)};
                return this.betlist;
		});
    },
    setrebet(b){
        this.rebateratio = b.target.value;
    },
    getInviteCode(){
        	let _this = this;
            let config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'},withCredentials:true};
            let formData = new FormData();
            formData.append('usertype',Number(this.usertype));
            formData.append('rebateratio',Number(this.rebateratio));
            formData.append('validtime',this.validtime);
            formData.append('extaddress','123');
            this.$axios.post(this.$store.state.url+'api/agent/createInviteCode', formData,config).then((res) => {
            this.$router.push({path:'/manageInvite/mIcode'});
          }).catch((error) => {
          		console.log("No")
          });   
    },
  }
};
</script>
<style lang="scss" scoped>
    @import '../../../../assets/scss/page-five/agency/mInvite.scss';
</style>