<template>
  <cc-block title="验证.sync修饰符">
    <button @click="updateTitle">update:title</button>
  </cc-block>
</template>
<script>
export default {
  props: ["titleDemo"],
  methods: {
    updateTitle() {
      this.$emit("update:title-demo", this.titleDemo + 1);
    }
  }
};
</script>
<style lang="scss" scoped></style>
