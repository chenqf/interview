<template>
  <cc-block title="验证生命周期">
    <keep-alive>
      <c1 v-if="hasC1" :num="childData"></c1>
    </keep-alive>
    <button @click="updateParent">修改parent的数据</button>
    <button @click="updateChild">修改child的数据</button>
    <button @click="updateAll">修改parent & child的数据</button>
    <button @click="changeC1">是否有子组件</button>
    {{ parentData }}
  </cc-block>
</template>
<script>
import C1 from "./components/c1";
export default {
  data() {
    return {
      hasC1: true,
      parentData: 1,
      childData: 2
    };
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
    console.group("Parent beforeDestroy");
  },
  destroyed() {
    console.group("Parent destroyed");
  },
  methods: {
    changeC1() {
      this.hasC1 = !this.hasC1;
    },
    updateAll() {
      this.parentData++;
      this.childData++;
    },
    updateParent() {
      this.parentData++;
    },
    updateChild() {
      this.childData++;
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
