<template>
  <div class="baipin">baipin</div>
</template>
<script>
export default {
  created(){
    this.time();
  },
  methods: {
    time(){
      setTimeout(() =>{
        this.$router.push("/one")
      },3000);
    }
  }
};
</script>

