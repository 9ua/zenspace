<template>
  <div class="x11x5pop">
    <div><span>该游戏</span>，正在更新维护中，敬请期待........</div>
    <div>
    <router-link to="/one" tag="button">--->其它游戏</router-link>
    </div>
</div>
</template>
<style lang="scss" scoped>
.x11x5pop{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 0;
    background: rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
    > div{
        color:#caebda;
        font-size: 16px;
        & span{
            color:#caebda;
        }
        & button{
            border: 1px solid #caebda;
            color: #caebda;
            background: none;
            padding: 6px 22px;
            border-radius: 4px;
            margin-top: 20px;
        }
    }
}
</style>

