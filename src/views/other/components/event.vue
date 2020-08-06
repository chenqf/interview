<template>
  <div class="container">
    <p class="title">验证事件的捕获和冒泡</p>
    <div ref="c1" id="c1" class="m20">
      I'm c1;
      <div ref="c2" id="c2" class="m20 c2">
        I'm c2;
        <div ref="c3" id="c3" class="m20 c3">
          I'm c3;
          <button ref="b1" id="b1">绝对定位的按钮</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {},
  mounted() {
    this.$refs.c1.addEventListener(
      "click",
      event => {
        console.log("c1");
      },
      { capture: true }
    );
    this.$refs.c2.addEventListener(
      "click",
      () => {
        console.log("c2");
      },
      { capture: true }
    );
    this.$refs.c3.addEventListener(
      "click",
      () => {
        console.log("c3");
      },
      { capture: true }
    );
    this.$refs.b1.addEventListener(
      "click",
      () => {
        console.log("b1");
      },
      { capture: true }
    );
  }
};
</script>
<style lang="scss" scoped>
div[id] {
  padding: 20px;
  position: relative;
}
#c1 {
  background: grey;
}
#c2 {
  background: pink;
}
#c3 {
  background: yellowgreen;
}
#b1 {
  position: fixed;
  z-index: 100;
  left: 0px;
  top: 0;
}
</style>
