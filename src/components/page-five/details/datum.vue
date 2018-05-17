<template>
  <div class="datum">
    <ul class="datum-top">
      <li @click="show = !show">
        <p>头像</p>
        <div>
          <img :src='"../../../assets/img/five/"+image+".jpg"' alt="" />
          <i class="el-icon-arrow-right"></i>
        </div>
      </li>
      <li>
        <p>昵称</p>
        <div>
          <el-input 
            placeholder="请设置昵称" 
            v-model="nickname" 
            :value="nickname" 
            clearable 
            ref="isnickname" 
            @blur="nickNameFocus"
            v-show="isnicknameto"
          >
          <!-- v-show="nickname === '' ? true : false" -->
          </el-input>
          <p>{{nickname}}</p>
          <i v-show="!nickname" class="el-icon-arrow-right"></i>
        </div>
      </li>
      <li>
        <p>账号</p>
        <div>
          <p>{{$store.state.Globalusername}}</p>
        </div>
      </li>
    </ul>
    <van-actionsheet v-model="show" title="修改头像">
		  <div class="datum-img">
		  	<p>预览</p>
		  	<img :src="imgUrl ? imgUrl : imgsrc"/>
		  	<p>{{imgName ? imgName : '小姐姐'}}</p>
		  </div>
		  <div class="datum-img-box">
		  	<div class="datum-hide">
		  		<ul class="datum-imgs">
				  	<li v-for="(img,index) in imgs" :key="index"><img :src="img.paths" @click="tonickname(img,$event,index)"/></li>
				  </ul>
		  	</div>
		  </div>
		  <div class="datum-but">
		  	<button @click="saveImg">保存头像</button><button @click="show = !show">取消</button>
		  </div>
		</van-actionsheet>
    <ul class="datum-btn">
      <li>
        <p>手机</p>
        <div>
          <router-link v-if="mobile === null" to="setmobile">{{ mobile === null ? '未设置' : 'mobile' }}</router-link>
          <span>{{mobile}}</span>
          <i v-show=" !mobile" class="el-icon-arrow-right"></i>
        </div>
      </li>
      <li>
        <p>邮箱</p>
        <div>
          <router-link v-if="email === null" to="setemail">{{ email === null ? '未设置' : email }}</router-link>
          <span>{{email}}</span>
          <i v-show=" !email" class="el-icon-arrow-right"></i>
        </div>
      </li>
      <li>
        <p>性别</p>
        <div>
          <select v-model="sex"  @change="selecteds($event)">
            <option v-for="(sexs,index) in sexlist" :key="index" :value="index">{{sexs}}</option>
          </select>
          <i class="el-icon-arrow-right"></i>
        </div>
      </li>
      <li>
        <p>生日</p>
        <div>
          <p>
            <el-date-picker v-model="birthday" type="date" value-format="yyyy/MM/dd" @change="(value) => toBirthday(value)" format="yyyy/MM/dd" :editable="false" placeholder="选择日期"></el-date-picker>
          </p>
          <i class="el-icon-arrow-right"></i>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { setStore, getStore,removeStore } from '../../../config/mutil'
  export default {
    data() {
      return {
        isnicknameto:false,
        input: false,
        show:false,
        imgName:'',
        userImg:"",
        imgUrl:"",
        imgindex:0,//头像ID
        image:0,//用户头像ID
        nickname:'',//昵称
        sex:0,//性别ID
        mobile:null,//手机号码
        email:null,//邮箱
        birthday:'1988/11/11',//生日
        nicknameShow1:true,
        nicknameShow2:false,
        imgsrc:require('../../../assets/img/five/0.jpg'),
        sexlist:['保密','男','女'],
        imgs:[
        	{name:'小姐姐',paths: require('../../../assets/img/five/0.jpg')},
        	{name:'杰森斯坦森',paths: require('../../../assets/img/five/1.jpg')},
        	{name:'金莎',paths:  require('../../../assets/img/five/2.jpg')},
        	{name:'高圆圆',paths: require('../../../assets/img/five/3.jpg')},
        	{name:'迪丽热巴',paths: require('../../../assets/img/five/4.jpg')},
        	{name:'黄宗泽',paths: require('../../../assets/img/five/5.jpg')},
        	{name:'肌肉男',paths: require('../../../assets/img/five/6.jpg')},
        	{name:'刘德华',paths: require('../../../assets/img/five/7.jpg')},
        	{name:'李冰冰',paths: require('../../../assets/img/five/8.jpg')},
        	{name:'苏有朋',paths: require('../../../assets/img/five/9.jpg')},
        ]
      }
    },
    mounted(){
      this.getUserData();
    },
    methods:{
      //生日选择
      toBirthday(value){
        this.birthday = value;
        this.$store.state.birthday = this.birthday;
        setStore('birthday',this.$store.state.birthday)
        this.saveUserData();
      },
      //性别选择
      selecteds(e){
        this.sex = e.target.value;
        console.log(
          this.sex
        )
        this.$store.state.sex = this.sex;
        setStore('sex',this.$store.state.sex)
        this.saveUserData();
      },
      //昵称
      nickNameFocus(){
        this.nickname = this.$refs.isnickname.value;
        this.$store.state.nickname = this.nickname;
        setStore('nickname',this.$store.state.nickname);
      },
      //提交个人信息
      saveUserData(){
        let config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'},withCredentials:true};
          let formData = new FormData();
          formData.append('image', this.image);
          formData.append('nickName', this.nickname);
          formData.append('sex', this.sex);
          formData.append('birthday', this.birthday);
          this.$axios.post(this.$store.state.url+'api/userCenter/saveUserData', formData, config).then((res) => {
          }).catch((error) => {
          		console.log("用户信息保存失败")
          })
      },
      //获取个人信息
			getUserData(){
				this.$http.get(this.$store.state.url+'api/userCenter/getUserData').then((res) => {
          this.image = res.data.data.image;
          this.nickname = res.data.data.nickName;
          if(!res.data.data.nickName){
            this.isnicknameto = true;
          }
          this.mobile = res.data.data.mobile;
          this.email = res.data.data.email;
          if(res.data.data.sex !== null){
            this.sex = res.data.data.sex;
          }
          if(res.data.data.sex !== null){
            this.birthday = res.data.data.birthday;
          }
				}).catch((error) => {
					console.log("获取个人信息No");
				})
      },
      //头像选择与编辑
    	tonickname(img,event,index){
    		this.imgName = img.name;
        this.imgUrl = img.paths;
        this.imgindex = index;
        this.image = this.imgindex;
        setStore('image',this.$store.state.image);
        this.saveUserData();
      },
      //头像选择与提交
    	saveImg(){
    		this.userImg = this.imgUrl;
        this.show = !this.show;
    	}
    },
    directives: {
			focus: {
				inserted: function(el) {
				el.focus()
				}
			}
		}
  }
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/page-five/details/datum.scss';
</style>