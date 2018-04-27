<template>
  <div class="mInvite">
      <div class="mInvite-top" @change="typechange">
          <input v-model="usertype" type="radio" value="2" id="member" class="magic-radio">
          <label for="member">會員邀請碼</label>
          <input v-model="usertype" type="radio" value="1" id="member2" class="magic-radio">
          <label for="member2">代理邀請碼</label>
      </div>
      <div class="mInvite-content">
            <ul v-show="showFlag">
                <li v-for="(item,index) in invitelist" :key="index" @click="select(item,$event)">
                    <div class="mInvite-left">
                        <p><span>{{item.id}} 邀請碼</span><br>
                        {{item.code}}<br>
                        <span>產生日期</span>{{item.date}}
                        </p>
                    </div>
                    <div class="mInvite-right">
                        
                        <p>
                        <span>註冊數</span><br>
                        <span>({{item.count}})</span>
                        </p>
                        
                    </div>
                    <i class="el-icon-arrow-down"></i>
                    <van-popup v-model="show" position="bottom" >
	                    <div class="mInvite-go">
                            <p>{{item.id}}
                        <span>邀請碼<br>{{item.code}}</span><br>
                        <span>產生日期{{item.date}}</span>
                        </p>
                        <span>註冊</span>
                        <span>{{item.count}}</span>
                        <button @click="delInviteCode()">刪除</button>
                        </div>
	                </van-popup>
                </li>
            </ul>
           
    </div>
</div>
</template>
<script>
import { setStore, getStore,removeStore } from '../../../../config/mutil'
export default {
  data(){
    return {
        show:false,
        usertype:2,
        highbet:0,
        rebateratio:0,
        betlist:[],
        validtime:0,
        extaddress:'',
        invitelist:'',
        selected: '',
        showFlag: true
        
    }
  },
  mounted(){
      this.getInviteList();
  },
  filters: {
      keepTwoNum(value) {
        value = Number(value);
        return value.toFixed(2);
      }
    },
  methods: {
    print(item){
        console.log(item);
    },
    select(a) {
        this.show = !this.show;
            console.log(a.id);
        this.selected = a.id;
      },
    typechange() {
        console.log(this.usertype);
        this.getInviteList();
        },
    getInviteList(){
        this.$http.get('api/agent/inviteCode',{params:{type:this.usertype}}).then((res) => {
                this.invitelist = res.data.data;
                console.log(this.invitelist);
			}).catch((error) => {
					console.log("获取邀請碼列表Err");
		});
    },
    setrebet(b){
        this.rebateratio = b.target.value;
        console.log(this.rebateratio)
    },
    delInviteCode(){
            let config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'},withCredentials:true};
            let formData = new FormData();
            formData.append('id',this.selected);
            this.$axios.post('api/agent/deleteInviteCode', formData,config).then((res) => {
            this.getInviteList();
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