<template>
  <div class="m20 p20 bg-green">
    <p>我是第一级</p>
    <c2
      v-bind="$attrs"
      @demo-test3="c1Demo"
      v-on="$listeners"
      d="4"
      a="11"
    ></c2>
  </div>
</template>
<script>
import C2 from "./c2";
export default {
  data() {
    return {};
  },
  created() {},

  methods: {
    c1Demo() {
      console.log("c1 demo");
    }
  },
  components: {
    C2
  },
  watch: {}
};
</script>
<style lang="scss" scoped></style>
