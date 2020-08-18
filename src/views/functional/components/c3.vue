<template>
  <div>
    <div class="mt20 bg-blue">
      <slot :obj="{ name: 'default' }">default 备用</slot><br />
    </div>
    <div class="mt20 bg-red">
      <slot name="foo" :obj="{ name: 'foo' }">foo 备用</slot><br />
    </div>
    <div class="mt20 bg-green">
      <slot name="pool" :obj="{ name: 'pool' }">pool 备用</slot><br />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "c3-value"
    };
  },
  name: "c3",
  methods: {
    testEvent() {
      console.log("c3 fn");
    }
  }
};
</script>
<style lang="scss" scoped></style>
