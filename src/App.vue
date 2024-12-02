<template>
  <div>
    <ul>
      <li><RouterLink to="/">Main</RouterLink></li>
      <li><RouterLink to="/login">Login</RouterLink></li>
      <li><RouterLink to="/direct">Direct</RouterLink></li>
    </ul>
  </div>
  <RouterView />
</template>

<script>
export default {
  name: "App",
};
</script>
