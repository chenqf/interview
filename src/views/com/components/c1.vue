<template>
  <cc-block title="验证子组件对于object prop的计算属性">
    <p>传入的obj:{{ obj }}</p>
    <p>计算合计后,objCount:{{ objCount }}</p>
  </cc-block>
</template>
<script>
export default {
  props: ["obj"],
  computed: {
    objCount() {
      return this.obj.reduce((init, cur) => init + cur, 0);
    }
  }
};
</script>
<style lang="scss" scoped></style>
