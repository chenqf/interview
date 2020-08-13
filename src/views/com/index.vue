<template>
  <div>
    <c2 ref="c2" a="11" b="22" c="33" class="f"></c2>
    <c3 ref="c3" a="11" b="22" c="33" class="f"></c3>
    <c4
      ref="c4"
      v-for="i in ['1', '2']"
      :key="i"
      @click.native="nativeEvent"
    ></c4>
    <c5 @demo-test="demo1" @demo-test1="demo2" @click.native="demo3"></c5>
    <c6 :title-demo.sync="title"></c6>
    当前title:{{ title }}
    <cc-block title="循环相互引用">
      <c7 :title="item.title" :list="item.list"></c7>
    </cc-block>
    <c9 :parentNum="num"></c9>
    <button @click="addNum">addNum</button>
    <c1 :obj="obj"></c1>
    <br />
    <button @click="changeObj">change obj</button>
    <p>当前obj:{{ obj }}</p>
    <span ref="span" v-for="i in ['3', '4']" :key="i"></span>
  </div>
</template>
<script>
import c1 from "./components/c1";
import c2 from "./components/c2";
import c3 from "./components/c3";
import c4 from "./components/c4";
import c5 from "./components/c5";
import c6 from "./components/c6";
import c7 from "./components/c7";
import c9 from "./components/c9";
export default {
  data() {
    return {
      obj: [],
      title: 0,
      item: {
        title: "1",
        list: [
          {
            title: 2,
            list: [
              {
                title: 3,
                list: [{ title: 4 }]
              }
            ]
          }
        ]
      },
      num: 0
    };
  },
  created() {
    console.log("create", this.$refs);
  },
  beforeMount() {
    console.log("beforeMount", this.$refs);
  },
  mounted() {
    console.log("mounted", this.$refs);
  },
  methods: {
    changeObj() {
      this.obj.push(1);
    },
    nativeEvent() {
      alert("native event");
    },
    addNum() {
      this.num++;
      console.log(this.num);
    },
    demo1() {},
    demo2() {},
    demo3() {
      console.log(3);
    }
  },
  components: {
    c1,
    c2,
    c3,
    c4,
    c5,
    c6,
    c7,
    c9
  }
};
</script>
<style lang="scss" scoped></style>
