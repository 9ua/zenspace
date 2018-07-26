<template lang="jade">
.listStyle
  .listStyle-top
    van-icon(name='arrow-left',@click='listStyleToGetCards')
    p 绑定银行卡
    span
  .listStyle-content
    ul.listStyle-III
      li
        p 选择银行
        div(@click='show1 = ! show1')
          | {{selectBank}}
          i.iconfont.icon-xia
      li
        p 开户地址
        div
          input(placeholder='请输入开户地址', v-model='address', value='address', clearable='')
      li
        p 开户人姓名
        div
          input(placeholder='请输入银行卡的姓名', v-model='niceName', value='niceName', clearable='')
      li
        p 银行卡号
        div
          input(placeholder='请输入银行卡号', v-model='card', value='card', clearable='')
      li
        p 确认卡号
        div
          input(placeholder='请确认银行卡号', v-model='card2', value='card2', clearable='')
      li
        p 安全密码
        div
          input(placeholder='请输入安全密码', v-model='securityCode', value='securityCode', clearable='' type="password")
      li
        .button
          button.button1(@click='sendReq()') 确定
  van-popup.pop2(v-model='show2', :close-on-click-overlay='false')
    div
      ul
        .title
          p 温馨提示！
        .cont
          p {{content}}
        .but
          button.nodel(@click='show2 = ! show2') 确定
  van-popup.pop2(v-model='show3', :close-on-click-overlay='false')
    div
      ul
        .title
          p 温馨提示！
        .cont
          p {{content}}
        .but
          button.nodel(@click='goBack()') 确定
  van-popup(v-model='show1', position='bottom', :overlay='true')
    van-picker(show-toolbar='', title='请选择银行', :columns='payway2', @cancel='onCancel', @confirm='onConfirm')
</template>
<script>
import md5 from "js-md5";
import { setStore, getStore, removeStore } from "../../../config/mutil";
export default {
  data() {
    return {
      bankNameId: "",
      card: "",
      card2: "",
      address: "",
      niceName: "",
      securityCode: "",
      show1: false,
      show2: false,
      show3: false,
      selectBank: "请选择银行",
      bankList: [],
      payway: [],
      payway2: [],
      content: ""
    };
  },
  mounted() {
    this.getBankNameList();
  },
  methods: {
    listStyleToGetCards(){
      this.$router.push('/getCards')
    },
    getBankNameList() {
      this.$axios
        .get(this.$store.state.url + "api/proxy/getBankNameList")
        .then(res => {
          this.bankList = res.data.data;
          for (let i = 0; i < res.data.data.length; i++) {
            this.payway.push({
              name: res.data.data[i].title,
              id: res.data.data[i].id
            });
            this.payway2.push(res.data.data[i].title);
          }
        })
        .catch(error => {
          console.log("获取列表Error");
        });
    },
    goBack() {
      this.$router.push({ path: "/five" });
    },
    onClick(item) {
      this.selectBank = item.name;
      this.bankNameId = item.id;
      this.show1 = !this.show1;
    },
    onConfirm(item, index) {
      this.bankNameId = this.payway[index].id;
      this.selectBank = this.payway[index].name;
      this.show1 = !this.show1;
    },
    onCancel() {
      this.show1 = !this.show1;
    },
    sendReq() {
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true
      };
      let formData = new FormData();
      formData.append("id", "");
      formData.append("bankNameId", this.bankNameId);
      formData.append("card", this.card);
      formData.append("card2", this.card2);
      formData.append("address", this.address);
      formData.append("niceName", this.niceName);
      formData.append("securityCode", md5(this.securityCode));
      this.$axios
        .post(this.$store.state.url + "api/proxy/setBankUser", formData, config)
        .then(res => {
          if (res.data.code === 1) {
            this.content = res.data.data.message;
            this.show3 = true;
          } else {
            this.content = res.data.data.message;
            this.show2 = true;
          }
        })
        .catch(error => {
          console.log("setBankUserNo");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/listStyle.scss";
@import "../../../assets/scss/popcorn.scss";
</style>