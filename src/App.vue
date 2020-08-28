<template>
  <div id="app">
    <div id="nav">
      <router-link class="m10" to="/conditionalRendering">条件渲染</router-link>
      <router-link class="m10" to="/com">组件</router-link>
      <router-link class="m10" to="/vModel">v-model</router-link>
      <router-link class="m10" to="/forceUpdate">forceUpdate</router-link>
      <router-link class="m10" to="/life">声明周期</router-link>
      <router-link class="m10" to="/pass">组件传值</router-link>
      <router-link class="m10" to="/functional">functional</router-link>
      <router-link class="m10" to="/watcher">watcher</router-link>
      <router-link class="m10" to="/element">element</router-link>
      <router-link class="m10" to="/other">其他</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.container {
  border: 1px solid grey;
  border-radius: 5px;
  padding: 20px;
  margin: 20px auto;
  width: 80%;
  text-align: center;
}
.title {
  font-size: 18px;
  font-weight: 800;
  color: red;
}
.tl {
  text-align: left;
}
.tr {
  text-align: right;
}
.flex {
  display: flex;
}
.flex1 {
  flex: 1;
}
.p20 {
  padding: 20px;
}
.m10 {
  margin: 10px;
}
.m20 {
  margin: 20px;
}
.mt20 {
  margin-top: 20px;
}
button {
  margin: 0 20px;
}
.bg-grey {
  background: grey;
}
.bg-blue {
  background: #7c7cce;
}
.bg-red {
  background: #cc4a4af2;
}
.bg-green {
  background: #00805891;
}
</style>
