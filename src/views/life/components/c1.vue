<template>
  <div>I am C1.</div>
</template>
<script>
export default {
  props: ["num", "list"],
  beforeDestroy() {
    console.group("child beforeDestroy", this);
  },
  destroyed() {
    console.group("child destroyed", this);
  }
};
</script>
<style lang="scss" scoped></style>
