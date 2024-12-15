<template>
  <div class="login-header">
    <span class="login-header__title">Log in to Chatbox</span>
    <span class="login-header__text">Get chatting with friends and family today by signing up for our chat
      app!</span>
  </div>
</template>

<style lang="less" scoped>
.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    font-size: 18px;
    font-weight: 700;
  }

  &__text {
    font-size: 14px;
    margin-top: 17px;
    color: #797c7b;
  }
}
</style>
