<template>
  <cc-block title="验证各种watcher">
    <p id="demo1">a:{{ a }}</p>
    <p id="demo2">b:{{ b }}</p>
    <!-- <p>c:{{ c }}</p>
    <p>d:{{ d }}</p> -->
    <button @click="addA">addA</button>
    <button @click="addB">addB</button>
    <button @click="addC">addC</button>
    <button @click="addC">addD</button>
  </cc-block>
</template>
<script>
export default {
  data() {
    return {
      a: 1,
      b: 1,
      c: 1,
      d: 1
    };
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  // computed 和声明周期的关系
  methods: {
    addA() {
      //可以好好研究研究
      Promise.resolve().then(data => {
        let val = document.getElementById("demo1").innerHTML;
        console.log("promise", val);
      });
      this.$nextTick().then(data => {
        let val = document.getElementById("demo1").innerHTML;
        console.log("pre nextTick", val);
      });
      this.a++;
      this.$nextTick().then(data => {
        let val = document.getElementById("demo1").innerHTML;
        console.log("next nextTick", val);
      });
      //   this.b++;
    },
    addB() {
      this.b++;
    },
    addC() {
      this.c++;
    },
    addD() {
      this.d++;
    }
  },
  watch: {
    a(a, b) {
      //   debugger;
      this.b++;
    }
    // b() {}
  },
  computed: {}
};
</script>
<style lang="scss" scoped></style>
