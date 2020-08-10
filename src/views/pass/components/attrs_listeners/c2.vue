<template>
  <div class="m20 p20 bg-red">
    <p>我是第二级</p>
    <c3 v-bind="$attrs" v-on="$listeners" @demo-test3="c2Demo" e="5"></c3>
  </div>
</template>
<script>
import C3 from "./c3";
export default {
  props: ["b"],
  data() {
    return {};
  },
  created() {},

  methods: {
    c2Demo() {
      console.log("c2 demo");
    }
  },
  components: {
    C3
  },
  watch: {}
};
</script>
<style lang="scss" scoped></style>
