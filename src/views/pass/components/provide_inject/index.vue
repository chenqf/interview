<template>
  <div>
    <cc-block title="验证provide-inject">
      <button @click="parentNum++">update parentNum</button>
      <c1></c1>
      <c2></c2>
    </cc-block>
  </div>
</template>
<script>
import c1 from "./c1";
import c2 from "./c2";
export default {
  data() {
    return {
      parentNum: 1
    };
  },
  provide() {
    return {
      num: this.$data
    };
  },
  components: {
    c1,
    c2
  }
};
</script>
<style lang="scss" scoped></style>
