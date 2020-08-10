<template>
  <div>
    I am C1.{{ num }}<br />
    <button @click="changeData">child change data</button>{{ ownerData }}
    <br />
    -----------------------
  </div>
</template>
<script>
export default {
  data() {
    return {
      ownerData: 1
    };
  },
  props: ["num"],
  methods: {
    changeData() {
      this.ownerData++;
    }
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
