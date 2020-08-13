<template>
  <div>
    <cc-block title="验证函数式组件">
      <c1 ref="c1Ref" :a="a" @c1-click="click">
        <template #default="slotProps">
          <div><br />我是随便写的1--</div>
          <c2></c2>
          <div><br />我是随便写的2--</div>
          <div><br />我是随便写的3--</div>
          {{ slotProps.obj.name }}
          <div><br />我是随便写的4--</div>
        </template>

        <template #foo="slotProps">
          ##### foo #######<br />
          {{ slotProps.obj.name }}<br />
          ##### foo #######
        </template>
        <template #pool="slotProps">
          ##### pool #######<br />
          {{ slotProps.obj.name }}<br />
          ##### pool #######
        </template>
      </c1>
      <button ref="btn" @click="click">change data</button>
    </cc-block>
  </div>
</template>
<script>
import c1 from "./components/c1";
import c2 from "./components/c2";
export default {
  data() {
    return {
      a: 1,
      b: 1
    };
  },
  methods: {
    click() {
      console.log("c1Ref", this.$refs.c1Ref);
      console.log("fnRef", this.$refs.fnRef);
      console.log("renderRef", this.$refs.renderRef);
    }
  },
  components: {
    c1,
    c2
  }
};
</script>
<style lang="scss" scoped></style>
