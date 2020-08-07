# 总结

## 对比

`vue & react`掩盖底层的DOM操作，用声明式的方式来描述目的，使代码更易维护。

从`性能`上说，没有任何框架可以比手动优化的DOM操作更快，因为框架的DOM操作需要应对任意可能产生的情况，它的实现必须是普适的，`虚拟DOM`也并不比原生操作DOM更快。

**框架提供的是，在不需要手动优化的情况下，依然可以提供过得去性能。**

### VS JQuery

命令式的代码书写方式，手动操作DOM，告诉浏览器开发者要做什么。

从`MVVM`开始，对于视图的操作变成了更简单方便的声明式操作，基于数据驱动，视图根据数据来渲染，开发者无需关心底层实现，而更多的关注上层业务。

### VS MVVM

观察数据变化并保留对实际DOM的引用，当有数据变化时进行对应的操作。

+ 脏检查
  + 任何小变动所有监听都会触发，重新进行检查是否需要更新
+ 依赖收集
  + 初始化和数据变化的时候都需要重新收集依赖

`渲染列表`的时候，由于每一行都有自己的数据作用域，都有自己的实例，当数据变更时，无法重用之前的实例和DOM节点，需要销毁之前所有的实例，重新创建每行新的实例，最后在渲染。

而`虚拟DOM`的变动检查是基于DOM结构层面的，即使是全新的数据，只要渲染结构不变，那么就不需要做无用功。

### VS React

`React`的基本思想是每次有变动就重新渲染整个应用，为了避免直接使用innerHtml进行重置，所以使用`虚拟DOM`。

## 构建版本

+ 完整版
+ 运行时版本

`完整版`: 同时包含编译器和运行时的版本
`编译器`: 用来将模板字符串编译成为 JavaScript 的 render 函数代码。
`运行时`: 创建实例，渲染，虚拟DOM等(除编译器以外的一切)

若需要在`客户端编译模板`，需要使用`完整版`，在代码执行阶段进行编译。

若使用`vue-loader`的时候，在构建阶段将模板预编译为`JavasScript`，只使用`运行时版本`即可。

若使用`webpack`时即使用vue-loader也需要在运行时编译模板，则需要在打包工具中对`完整版`配置`别名`，或者使用时引用完整版的路径。

```javascript
module。exports = {
  // ...
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue。esm。js'
    }
  }
}

// OR

import Vue$ from "vue/dist/vue.esm";
```

## 生命周期

**不要使用`箭头函数`，使用`箭头函数`会导致`this`异常**

### beforeCreate



## 实例属性

+ vm.$data
+ vm.$el

## 实例方法

+ vm.$watch

## 指令

### v-once

一次性插值，数据改变时，内容不会被更新

```html
<span v-once>这个将不会改变: {{ msg }}</span>
```

### v-html

插入html代码

```html
<span v-html="rawHtml"></span>
```

动态渲染HTML可能会很危险，可能会导致`XSS`攻击，只对可信任的内容使用HTML插值。

## 计算属性

对于任何复杂逻辑，都应当使用`计算属性`。

`计算属性`的求值是`惰性`的，只有需要用到该属性时，getter函数才会触发。

`计算属性`是根据依赖进行`缓存`的，当`getter`触发且获取结果后，依赖无变更的情况下，再次使用不会调用`getter`，而是直接使用`缓存`的结果。

`计算属性`不仅有`getter`，也提供了`setter`。

```javascript
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

## 侦听属性

虽然`计算属性`已经能够满足大多数的应用情况，但`侦听属性`依然有存在的价值。

当需要在`数据变化`时执行`异步`或`开销较大`的操作时，`侦听属性`比较适用。

比如在`即时搜索`的需求中，当用户输入变化时，触发`侦听器`的回调，在回调中设定中间状态，并指定`防抖`后的触发函数。

## 条件渲染

+ v-if
  + `惰性渲染`，若初始条件为假，什么也不做，不会渲染。
  + 确保切换过程中块内的`事件`和`子组件`适当的`销毁`和`重建`。
+ v-else
  + `v-else` 元素必须紧跟在带 `v-if` 或者 `v-else-if` 的元素的后面，否则它将不会被识别。
+ v-else-if
  + `v-else-if` 也必须紧跟在带 `v-if` 或者 `v-else-if` 的元素之后。
+ v-show
  + 不管初始条件是什么，都会渲染，只是简单的切换元素css属性中的`display`。
  + 不支持template标签，在template标签内无效

### Vue会尽可能的复用现有DOM元素进行渲染

使用`v-if`时出现不同分支，在不同分支内层级相同的元素，在分支切换时会`原地复用`dom节点，若想避免此类情况的发生，需要在元素上绑定`key`，用来标识二者完全独立。

直观的例子就是：不同分支同级别的`input`元素，当用户输入后，分支切换，输入值依然存在。

实现原理是`虚拟DOM`中`Diff算法`在`没有key`的同级`VNode`进行`patch`的时候，会尽可能的`原地复用`旧DOM节点。

### v-if 和 v-for 一起使用

**不推荐**同时使用 `v-if` 和 `v-for`。

Vue处理指令时，`v-for`的优先级高于`v-if`，所以每次重新渲染的时候都要遍历整个列表。

一般情况下，`v-if`和`v-for`可能同时出现的情况如下，以及解决方式：

+ 判断整个列表是否需要渲染
  + 将`v-if`放到`v-for`的上层
+ 过滤列表中需要渲染的
  + 通过`计算属性`，提前将数据进行过滤



## 数组变更检测

对数组的变更方法进行了包裹，监听通过方法变更数组内容。

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

## v-model

可以用 `v-model` 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。

单着本质上只是`语法糖`而已。

```html
<input v-model="searchText">
<!-- 等价于 -->
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
```

`v-model` 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：

- text 和 textarea 元素使用 `value` property 和 `input` 事件；
- checkbox 和 radio 使用 `checked` property 和 `change` 事件；
- select 字段将 `value` 作为 prop 并将 `change` 作为事件。

修饰符

+ .lazy
  + 将input时间转换为change事件
+ .number
  + 将输入值转换为number
  + 首个字符不是.不是空格，不会进行转化
  + 字符无法转换成数字，从左至右寻找能转换的结果
+ .trim
  + 去掉首尾空格
+ 以上修饰符可以连用

## 组件

在浏览器中的html对于`tagName`和`attributeName`无法区分大小写。

+ 组件名，统一使用字母全小写，至少2个单词，且单词使用连字符连接。
+ 属性名/事件名，全使用小写字母，多个单词时，使用连字符连接。

### 全局注册

```js
Vue.component('component-a', { /* ... */ })
```

### Props

单项数据流，不应在子组件内部改变外部传入的`Prop`。

两种常见试图变更`Prop`的情况：

将prop当做本地数据来使用；更好的做法是定义本地data，并将prop作为初始值。

```js
props:['propValue'],
data(){
  return {
    localValue: this.propValue
  }
}
```

需要对prop进行转换；更好的做法是使用`计算属性`。

```js
props:['propValue'],
computed:{
  value(){
    return this.propValue.trim().toLowerCase();
  }
}
```

非`Prop`的`Attribute`被设定到组件上，会被添加到组件的根元素上，若原有根元素存在同名`Attribute`，则会被覆盖。

已注册的`Prop`的`Attribute`是不会被设定到组件上。

对于`class`和`style`会有特殊处理，会有合并的操作。

使用`inheritAttrs: false`禁用根元素继承非`Prop`的`Attribute`,但并不会影响`class`和`style`的根元素继承。

```js
Vue.component('my-component', {
  inheritAttrs: false,
  // ...
})
```

可以使用`$attrs`获取非`props`的`Attribute`，其并不受`inhertAttrs`影响。

`$attrs`中不会存在被注册为`Prop`的`Attribute`，也不会存在`class`和`style`。

### 绑定原生事件

可以使用.native修饰符，直接在组件的根元素上监听一个原生事件。

```html
<com @click.native="nativeEvent"></com>
```

也可以使用`$lisenters`获取绑定在组件上的所有监听器。

需要注意的是，使用`.native`修饰符后的事件，不会出现在`$listeners`中。

### 双向绑定

很多情况下，我们需要对一个prop进行双向绑定，我们可以使用`.sync`操作符来模拟。

```html
<com :title.sync="currentTitle"></com>
<!-- 等价于 -->
<com :title="currentTitle" @upddate:title="currentTitle = $event"></com>
```

实际上也是相当于语法糖，还是要在子组件内，手动的去调用对应的更新事件。

### v-model

在组件内也可以使用`v-model`指令

```html
<com v-model="searchText"></com>
<!-- 等价于 -->
<com
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></com>
```
所以为了让它正常工作，需要在组件内，接收`value`属性，并找到时机触发`input`事件

```js
{
  props: ["value"],
  methods: {
    xxxxEvent() {
      this.$emit("input", this.value + 1);
    }
  }
}
```

也可以使用`model`选项，来设定`v-model`所使用的`prop`和`eventName`。

```js
model: {
  prop: 'otherValue',
  event: 'otherEventName'
},
```

需要注意的是，通过`model`选项重新设置的`v-model`所使用的`prop`，依然需要在`props`中进行注册。









### 插槽

TODO

### 动态和异步组件

TODO

### 循环引用

TODO

## TODO

diff的就地更新，只适用于





