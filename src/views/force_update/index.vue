<template>
  <cc-block title="验证forceUpdate">
    <p>array:{{ array }}</p>
    <p>object:{{ object }}</p>
    <button @click="addArray">addArray</button>
    <button @click="addObject">addObject</button>
    <button @click="forceUpdate">forceUpdate</button>
  </cc-block>
</template>
<script>
export default {
  data() {
    return {
      array: [0],
      object: {}
    };
  },
  methods: {
    addArray() {
      this.array[this.array.length] = this.array[this.array.length - 1] + 1;
    },
    addObject() {
      this.object[Date.now()] = Math.random();
    },
    forceUpdate() {
      this.$forceUpdate();
    }
  }
};
</script>
<style lang="scss" scoped></style>
