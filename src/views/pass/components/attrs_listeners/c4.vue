<template>
  <div class="m20 p20 bg-grey">
    <p v-bind="$attrs">我是第四级</p>
  </div>
</template>
<script>
import C4 from "./c4";
export default {
  data() {
    return {};
  },
  created() {
    console.log(this.$attrs);
    console.log(this.$listeners);
    this.$emit("demo-test1", "test1");
    this.$emit("demo-test2", "test2");
    this.$emit("demo-test3", "test3");
  },

  methods: {},
  components: {},
  watch: {}
};
</script>
<style lang="scss" scoped></style>
