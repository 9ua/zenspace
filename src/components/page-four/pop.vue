<template>
  <div class="pop" v-show="isshow.showPage">
    <div class="one-top">
      <div class="pop-top">
        <i class="el-icon-arrow-left" @click="hide"></i>
        <p>玩家信息</p>
      </div>
    </div>
    <div class="pop-center">
      <div class="pop-center-top">
        <img src="http://imagess-google.com/system/common/other/playerHomeBg.jpg" /> 
      </div>
      <div class="pop-center-middle">
        <div class="pop-center-box">
          <div class="pop-center-position">
            <img :src="pop.paths" />
          </div>
          <h3>{{pop.name}}</h3>
          <ul>
            <li>账号：{{$store.state.Globalusername | capitalize}}</li>
            <li>性别：保密</li>
            <li>
              <!-- <p>头衔：农民</p> -->
              <p>累计中奖：{{pop.money | keepTwoNum}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="pop-center-bottom">
        <h3>Ta喜欢的彩票</h3>
        <ul>
          <li class="active" v-for="(item,index) in imgs" :key="index">
            <img :src='item.paths' v-show="item.selected"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        imgs:[
          {paths: require('../../assets/img/five/1.jpg'),selected:false},
          {paths: require('../../assets/img/five/2.jpg'),selected:false},
          {paths: require('../../assets/img/five/3.jpg'),selected:false},
          {paths: require('../../assets/img/five/4.jpg'),selected:false},
          {paths: require('../../assets/img/five/5.jpg'),selected:false},
          {paths: require('../../assets/img/five/6.jpg'),selected:false},
          {paths: require('../../assets/img/five/7.jpg'),selected:false},
          {paths: require('../../assets/img/five/8.jpg'),selected:false},
        ],
        isshow: {
          showPage: false
        }
      }
    },
    props: {
      pop: {
        type: Object
      }
    },
    mounted(){
      this.imgshow();
    },
    methods: {
      imgshow(){
        let arrA = [6,2,4,3,5,1,0,7];
        let arrB = this.shuffle(arrA).slice(0,3);
        for (let i = 0; i < this.imgs.length; i++) {
          for (let j = 0; j < arrB.length; j++) {
            if( i === arrB[j]){
              this.imgs[i].selected =!this.imgs[i].selected;
            }
          }
        }
      },
      //随机打乱数组
      shuffle(a) {
        let len = a.length;
        for(let i=0;i<len;i++){
          let end = len - 1 ;
          let index = (Math.random()*(end + 1)) >> 0;
          let t = a[end];
          a[end] = a[index];
          a[index] = t;
        }
       return a;
      },
      show() {
        this.isshow.showPage = true;
      },
      hide() {
        this.imgshow();
        this.isshow.showPage = false;
        this.$emit('sonclick', this.isshow);
      }
    },
    filters: {
      capitalize(value) {
        let start = value.slice(0, 1);
        let end = value.slice(-1);
        return `${start}***${end}`;
      },
      keepTwoNum(value) {
        value = Number(value);
        return value.toFixed(2);
      },
    },
  }
</script>
<style lang="scss">
  @import '../../assets/scss/page-four/pop.scss';
</style>