<template>
  <div class="parent-container">
    <el-row class="row" :gutter="200">
      <el-col :span="8" :push="2" :offset="2">1</el-col>
      <el-col :span="12">2</el-col>
    </el-row>
    <com-block></com-block>
    <el-container>
      <el-header>1</el-header>
      <el-footer>2</el-footer>
    </el-container>
    <input ref="input" type="text" @input="inputEvent" />
    <button @click="reset">reset</button><br />
    time:{{ size === 4 ? end - start : null }}
  </div>
</template>
<script>
export default {
  data() {
    window.vm = this;
    return {
      start: 0,
      size: 0,
      end: 0
    };
  },
  methods: {
    reset() {
      this.start = 0;
      this.size = 0;
      this.end = 0;
      this.$refs.input.value = "";
    },
    inputEvent() {
      if (this.size === 4) {
        console.log("over");
        return;
      }
      let now = Date.now();
      this.size++;
      if (this.size === 1) {
        this.start = now;
      } else if (this.size == 4) {
        this.end = now;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.parent-container {
  background: #8080805c;
  height: 200px;
}
.row {
  background: #0000ff8f;
}
</style>
