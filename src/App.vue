<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  #app{
    height: 100%;
  }
  .container-z{
    padding: 0 0.12rem;
    .title-box{
      font-weight: 500;
      color: #333333;
      font-size: 0.3rem;
      margin-bottom: 0.2rem;
    .title-symbol{
        display: inline-block;
        width: 0.2rem;
        height: 0.08rem;
        background: -webkit-linear-gradient(to left,#ec698e, #ff8565);
        background: linear-gradient(to left,#ec698e, #ff8565);
        box-shadow: 0px 0px 5px 1px #ffd0d0;
      border-radius: 0.08rem;
        margin-bottom: 0.06rem;
        margin-right: 2px;
      }
    }
    .mb-30{
      margin-bottom: 0.3rem;
    }
    .mb-0{
      margin-bottom: 0;
    }
    .dot-round{
      display: inline-block;
      width: 0.06rem;
      height: 0.06rem;
      border-radius: 50%;
    }
  }
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .module-wall{
    width: 100%;
    height: 0.1rem;
    background: #f1f1f1;
  }
</style>
