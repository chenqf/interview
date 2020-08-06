<template>
  <div class="container">
    <p class="title">验证v-show在template和v-else和v-else-if中的处理</p>
    <div class="m20">
      <template v-show="show">
        <p>template 中的内容,当前v-show的值:{{ show }}</p>
      </template>
      <button @click="changeShow">changeShow</button>
    </div>
    <div class="m20">
      <p v-show="show" v-if="value === 1">v-if,当前value的值:{{ value }}</p>
      <p v-show="show" v-else-if="value === 2">
        v-elef-if,当前value的值:{{ value }}
      </p>
      <p v-show="show" v-else>v-else,当前value的值:{{ value }}</p>
      <button @click="changeValue">changeValue</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true, // 验证 template
      value: 1 // 验证 v-else v-else-if
    };
  },
  methods: {
    changeShow() {
      this.show = !this.show;
    },
    changeValue() {
      this.value = this.value === 3 ? 1 : this.value + 1;
    }
  }
};
</script>
