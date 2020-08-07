<template>
  <div a="1" b="2" c="3" class="d e" style="color:grey">
    <cc-block title="验证子组件对于attribute的接收 inheritAttrs:false">
      当前$attrs:{{ $attrs }}
    </cc-block>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  props: ["a", "b"]
};
</script>
<style lang="scss" scoped></style>
