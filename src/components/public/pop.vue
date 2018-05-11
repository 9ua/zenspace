<template>
  <div class="pop" v-show="show">
      <div>
        <ul>
          <li class="title">{{title}}</li>
          <li class="cont">
            <div class="contBox">
              <ul>
                <li v-show="betshow">
                  {{content}}
                </li>
                <!-- <li v-show="zhu > 0">
                  <div class="betk3-footer-top" v-show="zhu > 0">
                    <div class="betk3-footer-tops">
                      <p>当前选号</p><span>{{con}}</span>
                    </div>
                    <div class="betk3-footer-buttoms">
                      <p>每注金额</p><input type="text" v-model="money"/>
                      <span v-if="money === '' ">请输入要投注的金额</span>
                      <span v-else>单注最高可中<p>{{navlist === 3 ? rates * money : rates * money  | keepTwoNum}}</p>元</span>
                    </div>
                  </div>
                </li> -->
              </ul>
            </div>
          </li>
          <li class="but"><button>确定</button><button @click="show = !show">取消</button></li>
        </ul>
      </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      show:true,
      title:'温馨提示！',
      // content:'投注成功！',
      nums:1,
    }
  },
  props: {
    pop: {
     type:String
    }
  },
}
</script>

<style lang="scss" scoped>
.pop{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  & div{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    & ul{
      width: 76%;
      border-radius: 4px;
      background: #fff;
      & li{
        display: flex;
        justify-content: center;
        flex-direction:column;
        align-items: center;
        width: 100%;
      }
      & .title{
        border-radius: 4px 4px 0 0;
        height: 30px;
        background:linear-gradient(to right, #f75f5b, #fead50);
        color:#fff;
        font-size: 14px;
      }
      & .cont{
        & .contBox{
          width: 90%;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          min-height: 30px;
          & ul{
            width: 100%;
            & li{
              height: 36px;
            }
          }
        }
        
      }
      & .but{
        display: flex;
        flex-direction: row;
        & button{
          height: 30px;
          width: 50%;
          border:none;
          background: #fff;
          border-top:1px solid #eee;
          font-size: 14px;
        }
        & button:nth-child(1){
          color:#dc3b40;
        }
      }
    }
  }
  
}
</style>

