import axios from 'axios';
import VueCookie from "vue-cookie";
import md5 from 'js-md5';
export default {
  login(state) {
  	
  },
  getCaptchaCode(state) {
    this.axios({
      method: 'GET',
      url: state.url + 'checkCode?code=df&account=adfsdf&_=' + state.newDate,
    }).then((response) => {
      state.captchaCodeImg = response.data.content
      console.log(state.captchaCodeImg)
    })
  }
}