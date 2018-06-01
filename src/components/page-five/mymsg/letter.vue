<template>
  <div class="listStyle">

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
        this.letterlist = res.data.data;
			}).catch((error) => {
        console.log("获取彩種ratio ERROR");
		});
    },
  },
};
</script>

<style lang="scss" scoped>
 @import '../../../assets/scss/listStyle.scss';
</style>