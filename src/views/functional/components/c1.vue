<script>
import c3 from "./c3";

const aa = {
  render(h) {
    return h(
      "div",
      { class: ["aaaa", "bbbb"], slot: "default" },
      "我是内部的default com"
    );
  }
};
const bb = {
  render(h) {
    return h(
      "div",
      { class: ["ccccc", "ddddd"], slot: "foo" },
      "我是内部的foo com"
    );
  }
};

export default {
  functional: true,
  render: function(h, content) {
    const $slots = content.slots();
    const slots = Object.keys($slots).reduce(
      (arr, key) => arr.concat($slots[key]),
      []
    );
    return h(
      c3,
      { class: "aaaa", ref: "fnRef", scopedSlots: content.scopedSlots },
      slots
    );
  }
  //   render: function(h, content) {
  //     const slots = Object.keys(this.$slots).reduce(
  //       (arr, key) => arr.concat(this.$slots[key]),
  //       []
  //     );
  //     //   .map(i => {i.content = this._self;return i;});
  //     return h(
  //       c3,
  //       { class: "aaaa", ref: "renderRef", scopedSlots: this.$scopedSlots },
  //       slots
  //     );
  //   }
};
</script>
<style lang="scss" scoped></style>
