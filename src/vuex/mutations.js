import axios from 'axios';
import VueCookie from "vue-cookie";
import md5 from 'js-md5';
export default {
  //increment(state) {
  //  state.count = state.count + 1
  //},
  login(state) {
  	const pwd = md5(state.Globalpassword);
  	console.log(pwd);
    axios({
      method: 'POST',
      url:'/api/user/login',
      headers: state.headers,
        data: { account: state.Globalusername, password: pwd }
//    data: {'account': 'jasontest', 'password': '25f9e794323b453885f5181f1b624d0b'}
    }).then((response) => {
      VueCookie.set('username', state.Globalusername, 1);
      VueCookie.set('password', pwd, 1);
      console.log(response.data)
    }).catch((error) =>{
    	console.log(error);
    })
  },
  getCaptchaCode(state){
  	this.axios({
      method: 'GET',
			url: state.url+'checkCode?code=df&account=adfsdf&_='+state.newDate,
    }).then((response) => {
    	state.captchaCodeImg = response.data.content
    	
      console.log(state.captchaCodeImg)
    })
  }
}