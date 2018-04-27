<template>
  <div>
    <van-popup v-model="pops">内容</van-popup>
  </div>
</template>
<script>
export default {
  data(){
    return{
      show:true,
      content:'内容',
    }
  },
  props: {
    pops: {
      type: Boolean
    }
  },
}
</script>

<style lang="scss" scoped>
.van-popup{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  color:#fff;
  font-size: 14px;
  border-radius: 4px;
  background:linear-gradient(to right, #f75f5b, #fead50);
}
</style>

