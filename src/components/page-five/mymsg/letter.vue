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
                <li v-for="(item,index) in letterlist" :key="index">
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
        <!-- <van-actionsheet class="" v-model="show2">
	            <ul class="listStyle-II">
            <li>
              <span>{{selected.lotteryName}}</span>
            </li>
            <li><p>第{{selected.seasonId}}期</p> <p v-bind:class="{'class-a': selected.status===1, 'class-b': selected.status===2}">{{selected.statusName}}</p></li>
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
            <li><div class="button"><button class="button1" @click="show2 =! show2">确定</button></div></li>
          </ul>
	      </van-actionsheet> -->
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      letterlist:[],
      showFlag:true,
    }
  },

  mounted(){
      this.getUserNoticeList();
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
      this.status = this.pagelist[index].Type;
      this.getTradeList();
    },
    getUserNoticeList(){
        this.$http.get(this.$store.state.url+'api/proxy/getUserNoticeList',{params:{type:2}}).then((res) => {
        // this.userNoticeList = res;
        console.log(res);
        this.letterlist = res.data.data;
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