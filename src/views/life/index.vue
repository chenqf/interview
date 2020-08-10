<template>
  <cc-block title="验证生命周期">
    <c1 v-if="hasC1" :num="num" :list="list"></c1>
    <button @click="update">修改parent的数据</button>
    <p>验证计算属性的配置时间:{{ computeNum }}</p>
    <p>验证模板的执行时间{{ testFn() }}</p>
  </cc-block>
</template>
<script>
import C1 from "./components/c1";
export default {
  data() {
    return {
      hasC1: true,
      num: 1,
      list: [1, 2]
    };
  },
  computed: {
    computeNum() {
      //   console.group("Parent computed");
      return this.num + this.num;
    }
  },
  beforeCreate() {
    console.group("Parent beforeCreate");
  },
  created() {
    console.group("Parent created");
  },
  beforeMount() {
    console.group("Parent beforeMount");
  },
  mounted() {
    console.group("Parent mounted");
  },
  beforeUpdate() {
    console.group("Parent beforeUpdate");
  },
  updated() {
    console.group("Parent updated");
  },
  beforeDestroy() {
    console.log(this.$data);
    debugger;
  },
  destroyed() {
    console.log(this.$data);
    debugger;
  },
  methods: {
    update() {
      this.num++;
      this.list = this.list.reverse();
      this.hasC1 = !this.hasC1;
    },
    testFn() {
      //   console.log("开始执行模板");
      return "";
    }
  },
  components: {
    C1
  }
};
</script>
<style lang="scss" scoped></style>
