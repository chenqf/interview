<template>
  <div>
    <c2 a="11" b="22" c="33" class="f"></c2>
    <c3 a="11" b="22" c="33" class="f"></c3>
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
export default {
  data() {
    return {
      obj: []
    };
  },
  methods: {
    changeObj() {
      this.obj.push(1);
    }
  },
  components: {
    c1,
    c2,
    c3
  }
};
</script>
<style lang="scss" scoped></style>
