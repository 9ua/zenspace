<template>
<<<<<<< HEAD
  <transition name="actionsheet-float" v-show='value'>
    <div class="actionsheet" :class="{ 'actionsheet_title': title }" v-show='value'>
      <div class="actionsheet-header" v-if="title">
        <div v-text="title" />
        <i class="iconfont icon-cuo" @click.stop="$emit('hide', false)" />
      </div>
      <ul v-if="!title" class="actionsheet-list">

      </ul>
      <div v-if="cancelText" v-text="cancelText" class="actionsheet-item actionsheet-cancel" @click.stop="$emit('hide', false)" />
      <div v-else class="actionsheet-content">
        <slot />
=======
  <div class="modal" @click="$emit('hide', $event)" v-show='value'>
    <transition name="actionsheet-float"  v-show='value'>
      <div class="actionsheet" :class="{ 'actionsheet_title': title }"  v-show='value'>
        <div class="actionsheet-header" v-if="title">
          <div v-text="title" />
          <i class="iconfont icon-close" @click.stop="$emit('hide', false)" />
        </div>
        <ul v-if="!title" class="actionsheet-list">

        </ul>
        <div v-if="cancelText" v-text="cancelText" class="actionsheet-item actionsheet-cancel" @click.stop="$emit('hide', false)"></div>
        <div v-else class="actionsheet-content">
          <slot />
        </div>
>>>>>>> 47e945371506f86e4d8719ab47a1f518f7251d48
      </div>
    </div>
  </transition>
</template>
<script>
import Modal from "./Modal";
import Vue from "vue";
export default {
  name: "actionsheet",
  props: {
    value: Boolean,
    title: String,
    cancelText: String,
    actions: {
      type: Array,
      default: () => []
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value(val) {
      this.update();
    }
  },
  beforeDestroy(){
    document.body.removeChild(document.querySelector(".modal"));
  },
  methods: {
    update() {
      if (!document.querySelector(".modal")) {
          let modal = new (Vue.extend(Modal))({
          el: document.createElement("div")
        });
        modal.$on("click", this.onClick);
        document.body.appendChild(modal.$el);
      }
      document.querySelector(".modal").style.display=this.value ? "block" : "none";
    },
    onClick() {
      this.$emit("hide",false);           
    }
  }
};
</script>
<style lang="scss" scoped>
.actionsheet {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  color: #333;
  background-color: #fff;
  z-index: 20001;
  transition: 0.2s ease-out;
  &-float-enter,
  &-float-leave-active {
    transform: translateY(100%);
  }

  &-header {
    line-height: 44px;
    text-align: center;
    position: relative;
    & .iconfont {
      top: 0;
      right: 0;
      padding: 0 0.4rem;
      font-size: 0.48rem;
      color: #999;
      position: absolute;
      line-height: inherit;
    }
  }
}
</style>
