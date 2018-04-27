<template>
  <div class="mInvite">
    <div class="mInvite-content2">
        <ul>
            <li>
            <span>用戶類型</span>
            <yd-radio-group v-model="usertype">
                <yd-radio val="0">會員</yd-radio>
                <yd-radio val="1">代理</yd-radio>
            </yd-radio-group>
            </li>
            <li>
            <span>設定返點</span>
            <select v-model="rebateratio"  @change="setrebet($event)">
                <option v-for="bet in betlist" :key="bet" :value="bet">{{bet}}</option>
            </select></li>
            <li>
            <span>推廣渠道</span>
            <input type="text" v-model="extaddress" onfocus="this.select()" placeholder="请输入推廣渠道" />
            </li>
            <!-- <li>
            <span>推廣QQ</span>
            <input type="password" v-model="password2" onfocus="this.select()" placeholder="请输入您要设置的推廣QQ" /> </li> -->
      </ul>
    </div>
    <div class="mInvite-go">
        <button @click="getInviteCode()">取得邀請碼</button>
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
      console.log(this.usertype);
      this.createbetlist(); 
  },
  methods: {
    createbetlist(){
        this.$http.get('api/agent/getExtQuota').then((res) => {
            console.log(res);
            this.highbet = res.data.data.rebateRatio;
            for(let i = res.data.data.rebateRatio*10; i >= 0 ; i = i - 1 ){this.betlist.push(i/10)};
                console.log(this.betlist)
                return this.betlist;
                    console.log(res.data.data.rebateRatio);
			}).catch((error) => {
                console.log(error);
                    console.log("获取彩種ratio ERROR");
                    this.highbet = 12.5;
            for(let i = this.highbet*10; i >= 0 ; i = i - 1 ){this.betlist.push(i/10)};
                console.log(this.betlist)
                return this.betlist;
		});
    },
    setrebet(b){
        this.rebateratio = b.target.value;
        console.log(this.rebateratio)
    },
    getInviteCode(){
        	let _this = this;
            let config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'},withCredentials:true};
            let formData = new FormData();
            formData.append('usertype',Number(this.usertype));
            formData.append('rebateratio',Number(this.rebateratio));
            formData.append('validtime',this.validtime);
            formData.append('extaddress','123');
                console.log(formData);
            this.$axios.post('api/agent/createInviteCode', formData,config).then((res) => {
                console.log(res.data.data.code);
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