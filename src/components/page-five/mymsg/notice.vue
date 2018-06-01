<template>
  <div class="listStyle">
    <!-- <div class="listStyle-top">
      <router-link to="/five" tag="i" class="el-icon-arrow-left"></router-link>
      <i class="el-icon-arrow-left" @click="banckto"></i>
      <p>私信</p>
    </div> -->
    <div class="listStyle-content">


      <div>
        <ul v-show="showFlag" class="listStyle-IV">
                <li v-for="(item,index) in letterlist" :key="index"  @click="select(item,$event)" >
                    <div class="mInvite-left">
                       <p><a> <span>[ {{item.id}} ]</span> <br>发送时间 {{item.createTime}} </a> <br>
                        <!-- {{item.id}}<br> -->
                        {{item.title}}</p>
                        
                    </div>
                    <div class="mInvite-right">
                        <p>
                        <span></span>
                        </p>
                    </div>
                </li>
        </ul>
      </div>
        <van-actionsheet class="" v-model="show2">
	        <ul class="listStyle-V">
            <li>
              <span>{{selected.title}}</span>
            </li>
           <div style="padding:20px 30px 0; max-height: 420px; overflow-y: scroll;" v-html="notice"></div> 
            <li><div class="button"><button class="button1" @click="show2 =! show2">确定</button></div></li>
          </ul>
	      </van-actionsheet>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      letterlist:[],
	  showFlag:true,
	  show2:false,
	  notice:'',
	  selected:'',
	  content:'',
    }
  },

  mounted(){
      this.getUserNoticeList();
  },
  methods: {
    select(a) {
		this.selected = a;
		this.getNoticeInfor(a.id);
		this.show2 = !this.show2;
      },
    onClick(item){
      this.timeline = item.name;
      this.betweenType = item.Type;
      this.show = ! this.show;
      this.getTradeList();
    },
    print(index,title){
      this.status = this.pagelist[index].Type;
      this.getTradeList();
    },
    getUserNoticeList(){
        this.$http.get(this.$store.state.url+'api/proxy/getUserNoticeList',{params:{type:1}}).then((res) => {
        // this.userNoticeList = res;
        console.log(res);
        this.letterlist = res.data.data;
			}).catch((error) => {
        console.log(error);
        console.log("获取彩種ratio ERROR");
		});
	},
	getNoticeInfor(x){
        this.$http.get(this.$store.state.url+'/api/proxy/getNoticeInfor',{params:{id:x}}).then((res) => {
        // this.userNoticeList = res;
		console.log(res,99995);
		this.notice = res.data.data.content;
			}).catch((error) => {
        console.log(error);
        console.log("获取CCCCONTENT ERROR");
		});
    },
  },
};
</script>

<style lang="scss" scoped>
 @import '../../../assets/scss/listStyle.scss';
</style>