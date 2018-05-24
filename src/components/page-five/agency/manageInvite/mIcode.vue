<template>
  <div class="mInvite">
      <div class="mInvite-top" @change="typechange">
          <input v-model="usertype" type="radio" value="2" id="member" class="magic-radio">
          <label for="member">会员邀请码</label>
          <input v-model="usertype" type="radio" value="1" id="member2" class="magic-radio">
          <label for="member2">代理邀请码</label>
      </div>
      <div class="mInvite-content">
            <ul v-show="showFlag">
                <li v-for="(item,index) in invitelist" :key="index" @click="select(item,$event)">
                    <div class="mInvite-left">
                        <p><span>{{item.id}} 邀请码</span><br>
                        {{item.code}}<br>
                        <span>产生日期</span>{{item.date}}
                        </p>
                    </div>
                    <div class="mInvite-right">
                        <p>
                        <span>注册数</span><br>
                        <span>({{item.count}})</span>
                        </p>
                    </div>
                    <i class="el-icon-arrow-down"></i>
                </li>
            </ul>
    </div>
            <van-actionsheet v-model="show">
	            <div class="listStyle-II">
                    <li><span>{{this.selected.id}}</span></li>
                    <li><span>{{this.selected.code}}</span></li>
                    <li><p>产生日期</p><span>{{this.selected.date}}</span></li>
                    <li><p>注册数</p><span>({{this.selected.count}})个帐户</span></li>
                    <li><div class="button"><button class="button2" @click="select2()">删除此邀请码</button><button class="button3" @click="show = !show">取消</button></div></li>
                </div>
	        </van-actionsheet>
            <van-popup v-model="show2" position="bottom">
	            <div class="listStyle-II">
                    <li><p>确定要删除此邀请码?</p></li>
                    <li><div class="button"><button class="button2" @click="delInviteCode()">删除</button><button class="button3" @click="select2()">取消</button></div></li>
                    
                </div>
	        </van-popup>
</div>
</template>
<script>
import { setStore, getStore,removeStore } from '../../../../config/mutil'
export default {
  data(){
    return {
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
            console.log(a);
        this.selected = a;
      },
    select2() {
        this.show2 = !this.show2;
      },
    typechange() {
        console.log(this.usertype);
        this.getInviteList();
        },
    getInviteList(){
        this.$http.get(this.$store.state.url+'api/agent/inviteCode',{params:{type:this.usertype}}).then((res) => {
                this.invitelist = res.data.data;
                console.log(this.invitelist);
			}).catch((error) => {
					console.log("获取邀请码列表Err");
		});
    },
    setrebet(b){
        this.rebateratio = b.target.value;
        console.log(this.rebateratio)
    },
    delInviteCode(){
            let config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'},withCredentials:true};
            let formData = new FormData();
            formData.append('id',this.selected.id);
            this.$axios.post(this.$store.state.url+'api/agent/deleteInviteCode', formData,config).then((res) => {
            this.getInviteList();
            this.show = !this.show;
            this.show2 = !this.show2;
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