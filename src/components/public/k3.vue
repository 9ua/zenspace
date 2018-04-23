<template>
  <div class="betk3-footer">
    <div class="betk3-footer-top">
      <div class="betk3-footer-tops">
        <p>当前选号</p>
        <span>{{con}}</span>
      </div>
      <div class="betk3-footer-buttoms">
        <p>每注金额</p>
        <input type="text" v-model="money" v-focus/>
        <span v-if="money === '' ">请输入要投注的金额</span>
        <span v-else>最高可中
          <p>{{money*191.16 | keepTwoNum}}</p>元</span>
      </div>
    </div>
    <div class="betk3-footer-buttom">
      <div class="betk3-footer-buttom-left">
        <button>清空</button>
        <p>共
          <span>{{zhu}}</span>注</p>
      </div>
      <div class="betk3-footer-buttom-right">马上投注</div>
    </div>
  </div>
</template>
<script>
	export default{
		data(){
			return{
				money:'',//投注金额
			}
		},
		props:{
			con:{type:Object},
			zhu:{type:Number}
		},
		methods:{
			
		},
		directives: {
      focus: {
        inserted: function(el) {
          el.focus()
        }
      }
    },
    // 保留二个小数
    filters: {
      keepTwoNum(value) {
        value = Number(value);
        return value.toFixed(2);
      }
    }
	}
</script>
<style lang="scss" scoped>
.betk3-footer{
    background: #000;
    color: #ffaf36;
    & .betk3-footer-top{
        background: #22563f;
        height: 60px;
        padding: 0px 16px;
        display: flex;
        flex-direction: column;
        color: #caebda;
        font-size: 16px;
        & .betk3-footer-tops{
            display: flex;
            align-items: center;
            height: 50%;
            & span{
                color: #ffaf36;
                width: 78%;
                overflow: hidden;
                height: 20px;
                padding-left:2% ;
            }
            & p{
                width: 20%;
            }
        }
        & .betk3-footer-buttoms{
            height: 50%;
            display: flex;
            align-items: center;
            width: 100%;
            & input{
                width: 20%;
                margin-left: 10px;
                padding:0px 4px;
                text-align: center;
                border: none;
                border-radius: 2px;
            }
            & span{
                width: 55%;
                display: flex;
                flex-direction: row;
                font-size: 12px;
                margin-left: 6px;
                align-items: center;
                & p{
                    text-align: center;
                    color:#ffaf36;
                    width: auto;
                }
            }
            & p{
                width: 20%;
            }
        }
    }
    & .betk3-footer-buttom{
        background: #000;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 16px;
        & .betk3-footer-buttom-left{
            display: flex;
            align-items: center;
            & button{
                background: none;
                border: none;
                color: #ffaf36;
                font-size: 22px;
                margin-right: 12px;
            }
            & p{
                color: #fff;
                font-size: 16px;
            }
        }
        & .betk3-footer-buttom-right{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            height: 30px;
            width: 100px;
            color: #000;
            border-radius: 4px;
            background: -webkit-linear-gradient(bottom,#ffdb01,#e07a06);
            background: linear-gradient(bottom,#ffdb01,#e07a06);
        }
    }
}
</style>