<template>
  <cc-block title="验证v-once" v-once>
    本组件的数据(初始为{{ num }}),现在为{{ num }}<br />
    <button @click="addNum">addNum</button>
    传入的数据:{{ parentNum }}
  </cc-block>
</template>
<script>
export default {
  props: ["parentNum"],
  data() {
    return {
      num: 0
    };
  },
  methods: {
    addNum() {
      this.num++;
    }
  }
};
</script>
<style lang="scss" scoped></style>
