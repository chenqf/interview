<template>
  <cc-block title="检查$listeners属性">
    {{ keys }}
  </cc-block>
</template>
<script>
export default {
  data() {
    return {
      keys: Object.keys(this.$listeners)
    };
  }
};
</script>
<style lang="scss" scoped></style>
