<template>
  <div class="m20 p20 bg-blue">
    <p>我是第三级</p>
    <c4
      v-bind="$attrs"
      v-on="$listeners"
      @demo-test3="c3Demo"
      c="33"
      f="6"
    ></c4>
  </div>
</template>
<script>
import C4 from "./c4";
export default {
  props: ["d"],
  data() {
    return {};
  },
  created() {},

  methods: {
    c3Demo() {
      console.log("c3 demo");
    },
    c3Demo1() {}
  },
  components: {
    C4
  },
  watch: {}
};
</script>
<style lang="scss" scoped></style>
