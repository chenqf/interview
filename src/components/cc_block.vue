<template>
  <div class="container">
    <p class="title">{{ title }}</p>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ["title"]
};
</script>
<style lang="scss" scoped></style>
