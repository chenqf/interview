<template>
  <div a="1" b="2" c="3" class="d e" style="color:blue">
    <cc-block title="验证子组件对于attribute的接收 inheritAttrs:true">
      当前$attrs:{{ $attrs }}
    </cc-block>
  </div>
</template>
<script>
export default {
  inheritAttrs: true,
  props: ["a", "b"]
};
</script>
<style lang="scss" scoped></style>
