<template>
  <div class="past">
    <header>
      <i class="el-icon-arrow-left" @click="past"></i>
      <p class="pastTitle">
        <span>{{this.$route.query.name}}</span>开奖记录</p>
      <span @click="checkListBtn">彩种</span>
    </header>
    <div class="pastBox">
      <ul>
        <li :class="{'active': index === nums}" v-for="(num,index) in datas" :key="index" @click="pastBox($event,index)">{{num}}</li>
      </ul>
    </div>
    <div class="pastList">
      <ul>
        <li v-for="(getopen,index) in getPastOpens" :key="index">
          <div class="pastListTitle">
            <p>
              <i>{{getopen.seasonId}}</i>期</p>
            <p v-if="$route.query.group === 'k3'">
              <span>和值</span>
              <span>大/小</span>
              <span>单/双</span>
            </p>
            <p :class="'pastListTitle'+$route.query.group" v-if="$route.query.group === 'ssc'">
              <span></span>
              <span></span>
              <span></span>
            </p>
            <p v-if="$route.query.group === 'pk10'">
              <span>冠亚和值</span>
              <span>大/小</span>
              <span>单/双</span>
            </p>
          </div>
          <div class="pastListCenter" :class="$route.query.group">
            <div :class="$route.query.group" v-if="$route.query.group === 'k3'">
              <span>{{getopen.n1}}</span>
              <span>{{getopen.n2}}</span>
              <span>{{getopen.n3}}</span>
            </div>
            <div :class="$route.query.group" v-if="$route.query.group === 'ssc'">
              <span>{{getopen.n1}}</span>
              <span>{{getopen.n2}}</span>
              <span>{{getopen.n3}}</span>
              <span>{{getopen.n4}}</span>
              <span>{{getopen.n5}}</span>
            </div>
            <div :class="$route.query.group" v-if="$route.query.group === 'pk10'">
              <span>{{getopen.n1}}</span>
              <span>{{getopen.n2}}</span>
              <span>{{getopen.n3}}</span>
              <span>{{getopen.n4}}</span>
              <span>{{getopen.n5}}</span>
              <span>{{getopen.n6}}</span>
              <span>{{getopen.n7}}</span>
              <span>{{getopen.n8}}</span>
              <span>{{getopen.n9}}</span>
              <span>{{getopen.n10}}</span>
            </div>
            <div v-if="$route.query.group === 'k3'">
              <span>{{getopen.n1+getopen.n2+getopen.n3}}</span>
              <span>
                <i :class="(getopen.n1+getopen.n2+getopen.n3) < 11 ? 'goodidea' : 'goodluck'">{{(getopen.n1+getopen.n2+getopen.n3)
                  < 11 ? '小' : '大'}}</i>
              </span>
              <span>
                <i :class="(getopen.n1+getopen.n2+getopen.n3) % 2 === 0 ? 'goodidea' : 'goodluck'">{{(getopen.n1+getopen.n2+getopen.n3) %2 === 0 ? '双' : '单'}}</i>
              </span>
            </div>
            <div v-if="$route.query.group === 'ssc'" v-show="false">
              <span>{{getopen.n1+getopen.n2+getopen.n3+getopen.n4+getopen.n5}}</span>
              <span>
                <i :class="(getopen.n1+getopen.n2+getopen.n3+getopen.n4+getopen.n5) < 11 ? 'goodidea' : 'goodluck'">{{(getopen.n1+getopen.n2+getopen.n3+getopen.n4+getopen.n5)
                  < 11 ? '小' : '大'}}</i>
              </span>
              <span>
                <i :class="(getopen.n1+getopen.n2+getopen.n3+getopen.n4+getopen.n5) % 2 === 0 ? 'goodidea' : 'goodluck'">{{(getopen.n1+getopen.n2+getopen.n3+getopen.n4+getopen.n5) %2 === 0 ? '双' : '单'}}</i>
              </span>
            </div>
            <div v-if="$route.query.group === 'pk10'">
              <span>{{getopen.n1+getopen.n2}}</span>
              <span>
                <i :class="(getopen.n1+getopen.n2) < 12 ? 'goodidea' : 'goodluck'">{{(getopen.n1+getopen.n2)
                  < 12 ? '小' : '大'}}</i>
              </span>
              <span>
                <i :class="(getopen.n1+getopen.n2) % 2 === 0 ? 'goodidea' : 'goodluck'">{{(getopen.n1+getopen.n2) %2 === 0 ? '双' : '单'}}</i>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="checkList" v-show="isCheckList">
      <p class="checkLisTitle">游戏筛选</p>
      <ul>
        <li :class="{'active': indexx === allName}" v-for="(all,indexx) in lotteryAll" :key="indexx" @click="checkList($event,indexx,all)">{{all.name}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nums: 0,
      allName: 0,
      count: 30,
      getPastOpens: 0,
      max: 14,
      datas: ["近30期", "近50期", "今日数据"],
      lotteryAll: null,
      isCheckList: false,
      checkListId: null,
      arrAll:[],
    };
  },
  watch: {
    //监听路由变化后
    $route(to, from, next) {
      // console.log(to.fullPath,"-----------");
      // console.log("to:",to);
      // console.log("2222222222222",this.$route.name)
    }
  },
  mounted() {
    this.getLotteryList();
    this.getPastOp();
  },
  methods: {
    past() {
      if(this.$route.path === "/second/past"){
        this.$router.push("/second");
      }
      // this.$router.go(-1);
    },
    //期数选择
    pastBox(e, index) {
      this.nums = index;
      if (index === 0) {
        this.count = 30;
      } else if (index === 1) {
        this.count = 50;
      } else if (index === 2) {
        this.count = -1;
      }
      this.getPastOp();
    },
    //点击筛选按钮时
    checkListBtn() {
      this.isCheckList = !this.isCheckList;
    },
    //游戏筛选
    checkList($event, index, all) {
      this.allName = index;
      this.checkListId = all.id;
      this.$router.push({
        query: { id: all.id, name: all.name, group: all.groupId }
      });
      this.getPastOp();
      this.isCheckList = !this.isCheckList;
      if (this.$route.query.id === all.id) {
        // console.log(index);
      }
    },
    checkOk() {},
    // 获取全部彩种
    getLotteryList() {
      this.$http
        .get(this.$store.state.url + "api/lottery/getLotteryList")
        .then(res => {
          this.lotteryAll = res.data.data.all;
        })
        .catch(error => {
          console.log("获取所有彩种No");
        });
    },
    getPastOp() {
      this.$http
        .get(this.$store.state.url + "api/lottery/getPastOpen", {
          params: { lotteryId: this.$route.query.id, count: this.count }
        })
        .then(res => {
          this.getPastOpens = res.data.data;
        })
        .catch(error => {});
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/second.scss";
</style>
