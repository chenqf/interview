<template>
  <div>
    <c2 a="11" b="22" c="33" class="f"></c2>
    <c3 a="11" b="22" c="33" class="f"></c3>
    <c4 @click.native="nativeEvent"></c4>
    <c5 @demo-test="demo1" @demo-test1="demo2" @click.native="demo3"></c5>
    <c6 :title-demo.sync="title"></c6>
    当前title:{{ title }}
    <c1 :obj="obj"></c1>
    <br />
    <button @click="changeObj">change obj</button>
    <p>当前obj:{{ obj }}</p>
  </div>
</template>
<script>
import c1 from "./components/c1";
import c2 from "./components/c2";
import c3 from "./components/c3";
import c4 from "./components/c4";
import c5 from "./components/c5";
import c6 from "./components/c6";
export default {
  data() {
    return {
      obj: [],
      title: 0
    };
  },
  methods: {
    changeObj() {
      this.obj.push(1);
    },
    nativeEvent() {
      alert("native event");
    },
    demo1() {},
    demo2() {},
    demo3() {
      console.log(3);
    }
  },
  components: {
    c1,
    c2,
    c3,
    c4,
    c5,
    c6
  }
};
</script>
<style lang="scss" scoped></style>
