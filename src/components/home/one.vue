<template>
  <div class="one">
    <headers></headers>
    <div class="one-center">
      <swipe :autoplay="2200" :show-indicators="false">
        <swipeItem v-if="isbanner"><img src="https://hf89.com//res/upload/98488f66967c44a0877728544b620a2f.jpg" /></swipeItem>
        <swipeItem v-else v-for="(item,index) in bannerList" :key="index"><img :src="$store.state.url+item.img" /></swipeItem>
      </swipe>
      <div v-show="!$store.state.loginStatus">
        <div class="notice-bar">
          <img src="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png" alt="">
          <marquee scrollamount="2" width='80%'>{{title}}</marquee>
          <i class="iconfont icon-you active"></i>
        </div>
      </div>
      <div v-show="$store.state.loginStatus">
        <div class="notice-bar">
          <img src="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png" alt="">
          <marquee scrollamount="2" width='80%'>{{title}}</marquee>
          <i class="iconfont icon-you active" @click="noticeClick"></i>
        </div>
      </div>
      <ul v-show="!$store.state.loginStatus">
        <router-link v-for="(item,index) in lottery" :key="index" tag="li" to="/login">
          <img :src="item.path" alt="images" />
          <h5>{{item.name}}</h5>
        </router-link>
        <router-link to="/lotterList" tag="li" class="lotter-list">
          <i class="iconfont icon-jia"></i>
          <h5>更多彩种</h5>
        </router-link>
      </ul>
      <ul v-show="$store.state.loginStatus">
        <router-link v-for="(item,index) in lotteryList" :key="index" tag="li" v-if="item.groupId" :to="{path:'/'+item.groupId,query:{id:item.id,name:item.name}}">
          <img :src='"@/assets/img/one/"+item.groupId+".png"' alt="images" />
          <h5>{{item.name}}</h5>
        </router-link>
        <!-- <router-link tag="li" :to="{path:'/x11x5?id=sj1fc&name=宏发时时彩'}">
        <img src='@/assets/img/one/x11x5.png' alt="images"/>
          <h5>广东11选5</h5>
        </router-link> -->
        <router-link to="/lotterList" tag="li" class="lotter-list">
          <i class="iconfont icon-jia"></i>
          <h5>更多彩种</h5>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
import headers from '../public/header'
import swipe from '../public/swipe'
import swipeItem from '../public/swipe-item'
export default {
  data() {
    return {
      isbanner: false,
      lotteryList: [],
      bannerList: [],
      getimgurl: '',
      titlelist: [],
      indexInfo: '',
      cacheTime: 1800000,
      title: '【欢迎光临】 欢迎来到宏發娛樂，您的支持是我们最大的源动力。',
      lottery: [
        { name: '宏發快3', path: require('@/assets/img/one/k3.png') },
        { name: '宏發时时彩', path: require('@/assets/img/one/ssc.png') },
        { name: '北京赛车', path: require('@/assets/img/one/pk10.png') },
        { name: '上海快3', path: require('@/assets/img/one/k3.png') },
        { name: '江苏快3', path: require('@/assets/img/one/k3.png') },
        { name: '广西快3', path: require('@/assets/img/one/k3.png') },
        { name: '河北快3', path: require('@/assets/img/one/k3.png') },
        { name: '湖北快3', path: require('@/assets/img/one/k3.png') },
        { name: '安徽快3', path: require('@/assets/img/one/k3.png') },
        { name: '甘肃快3', path: require('@/assets/img/one/k3.png') },
        { name: '北京快3', path: require('@/assets/img/one/k3.png') },
        { name: '重庆时时彩', path: require('@/assets/img/one/ssc.png') }
      ]
    }
  },
  mounted() {
    this.getLotterlist()
    this.showBanner()
  },
  methods: {
    showBanner() {
      if (
        location.hostname === 'localhost' ||
        location.hostname === 'm.edu0370.com'
      ) {
        this.isbanner = true
      }
    },
    noticeClick() {
      this.$router.push({
        path: '/mymsg/notice'
      })
    },
    a() {
      this.isbanner = true
    },
    getLotterlist() {
      var now = new Date().getTime()
      if (localStorage.getItem('indexInfo') !== null) {
        var setupTime = localStorage.getItem('date_indexInfo')
        if (null == setupTime || now - setupTime > this.cacheTime) {
          localStorage.removeItem('indexInfo')
          localStorage.removeItem('date_indexInfo')
          this.$axios
            .get(this.$store.state.url + 'api/index/getIndexInfo')
            .then(res => {
              localStorage.setItem('indexInfo', JSON.stringify(res.data.data))
              localStorage.setItem('date_indexInfo', now)
              this.title = ''
              this.lotteryList = res.data.data.hotLotterys
              this.bannerList = res.data.data.banners
              for (let i = 0; i < res.data.data.noticeList.length; i++) {
                this.title =
                  this.title + '   ' + res.data.data.noticeList[i].title
              }
            })
            .catch(error => {
              console.log('获取广告No')
            })
        } else {
          this.indexInfo = JSON.parse(localStorage.getItem('indexInfo'))
          this.title = ''
          this.lotteryList = this.indexInfo.hotLotterys
          this.bannerList = this.indexInfo.banners
          for (let i = 0; i < this.indexInfo.noticeList.length; i++) {
            this.title = this.title + '   ' + this.indexInfo.noticeList[i].title
          }
        }
      } else {
        this.$axios
          .get(this.$store.state.url + 'api/index/getIndexInfo')
          .then(res => {
            localStorage.setItem('indexInfo', JSON.stringify(res.data.data))
            localStorage.setItem('date_indexInfo', now)
            this.title = ''
            this.lotteryList = res.data.data.hotLotterys
            this.bannerList = res.data.data.banners
            for (let i = 0; i < res.data.data.noticeList.length; i++) {
              this.title =
                this.title + '   ' + res.data.data.noticeList[i].title
            }
          })
          .catch(error => {
            console.log('获取广告No')
          })
      }
    }
  },
  components: {
    headers,
    swipe,
    swipeItem
  }
}
</script>
<style lang="scss">
@import '../../assets/scss/one.scss';
</style>
