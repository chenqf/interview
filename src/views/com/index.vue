<template>
  <div>
    <c1 :obj="obj"></c1>
    <br />
    <button @click="changeObj">change obj</button>
    <p>当前obj:{{ obj }}</p>
  </div>
</template>
<script>
import c1 from "./components/c1";
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
    c1
  }
};
</script>
<style lang="scss" scoped></style>
