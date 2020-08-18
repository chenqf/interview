<script>
import c3 from "./c3";

export default {
  //   name: "functional-c1",
  functional: true,
  render: function(h, content) {
    const ref = content.data.ref;
    const $slots = content.slots();
    const slots = Object.keys($slots).reduce(
      (arr, key) => arr.concat($slots[key]),
      []
    );
    return h(
      c3,
      { class: "aaaa", ref, scopedSlots: content.scopedSlots },
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
  //   },
  //   name: "render-c1",
  //   data() {
  //     return {
  //       value: "render test"
  //     };
  //   }
};
</script>
<style lang="scss" scoped></style>
