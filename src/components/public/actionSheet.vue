<template>
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
      </div>
    </transition>
  </div>
</template>
<script>
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
  methods: {
    onClickItem(item) {
      if (typeof item.callback === "function") {
        item.callback(item);
      }
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
    transform: translate3d(0, 100%, 0);
  }
  &-header {
    line-height: 44px;
    text-align: center;
    position: relative;
    & .icon-close {
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
@keyframes bottom-enter {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, 100%, 0);
  }
}

@keyframes bottom-leave {
  from {
    transform: translate3d(0, 100%, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
.modal {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: opacity 1.2s ease-out;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 2000;
}
</style>
