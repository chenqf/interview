<template>
  <div>
    I am C1.{{ num }}<br />
    <button @click="changeData">child change data</button>{{ ownerData }}
    <br />
    -----------------------
    <c2></c2>
  </div>
</template>
<script>
import c2 from "./c2";
export default {
  data() {
    return {
      ownerData: 1
    };
  },
  components: {
    c2
  },
  props: ["num"],
  methods: {
    changeData() {
      this.ownerData++;
    }
  },
  activated() {
    console.group("Child activated");
  },
  deactivated() {
    console.group("Child deactivated");
  },
  beforeCreate() {
    console.group("Child beforeCreate");
  },
  created() {
    console.group("Child created");
  },
  beforeMount() {
    console.group("Child beforeMount");
  },
  mounted() {
    console.group("Child mounted");
  },
  beforeUpdate() {
    console.group("Child beforeUpdate");
  },
  updated() {
    console.group("Child updated");
  },
  beforeDestroy() {
    console.group("Child beforeDestroy");
  },
  destroyed() {
    console.group("Child destroyed");
  }
};
</script>
<style lang="scss" scoped></style>
