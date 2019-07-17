<template>
    <div class="personal">
        <div class="personalWrap">
          <div class="personal-portrait">
            <i class="iconfont icon-personal"></i>
          </div>
          <div class="personal-signIn">
            <a href="javascript:;" class="register">注册</a>
            <span class="tip">|</span>
            <a href="javascript:;" class="signIn">登录</a>
          </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'PersonalSignin'
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .personal{
    width: 100%;
    height: 190px;
    background: $header-bgc-translucent;
    .personalWrap{
      display: flex;
      @include flex-center(column);
    }
    .personal-portrait{
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: #fff;
      margin-top: 20px;
      text-align: center;
      .iconfont{
        color: $header-bgc-translucent;
        font-size: 50px;
        line-height: 100px;
      }
    }
    .personal-signIn{
      margin-top: 20px;
      .register,
      .tip,
      .signIn{
        font-size: 20px;
        color: #fff;
      }
      .register,
      .signIn{
        font-weight: bold;
      }
      .tip{
        margin: 0 40px;
        width: 1px;
        height: 16px;
      }
    }
  }
</style>
