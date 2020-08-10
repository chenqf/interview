<template>
  <div>
    <cc-block title="验证$attrs-$listeners">
      <div class="p10">
        <p>我是root</p>
        <c1
          a="1"
          b="2"
          c="3"
          @demo-test1="demo1"
          @demo-test2="demo2"
          @demo-test3="demo3"
        ></c1>
      </div>
    </cc-block>
  </div>
</template>
<script>
import C1 from "./c1";
export default {
  data() {
    return {};
  },
  components: {
    C1
  },
  methods: {
    demo1() {
      console.log("demo1");
    },
    demo2() {
      console.log("demo2");
    },
    demo3() {
      console.log("demo3");
    }
  }
};
</script>
<style lang="scss" scoped></style>
