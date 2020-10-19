# 总结

## 对比

`vue & react`掩盖底层的DOM操作，用声明式的方式来描述目的，使代码更易维护。

从`性能`上说，没有任何框架可以比手动优化的DOM操作更快，因为框架的DOM操作需要应对任意可能产生的情况，它的实现必须是普适的，`虚拟DOM`也并不比原生操作DOM更快。

> **框架提供的是，在不需要手动优化的情况下，依然可以提供过得去性能。**

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
      'vue$': 'vue/dist/vue.esm。js'
    }
  }
}

// OR

import Vue$ from "vue/dist/vue.esm";
```

## 生命周期

**不要使用`箭头函数`，使用`箭头函数`会导致`this`异常**。

### beforeCreate

实例被创建前调用，有this，但是数据相关和事件相关均未配置完成。

### created

实例创建完成后调用，数据相关和事件相关均以配置完成。

computed相关内容也以注册完成，何时调用，取决于使用情况。

> `beforeCreate`和`create`主要是和实例相关，并未涉及到`template`相关

### created <---> beforeMount

编译模板 --  生成  -- render函数

### beforeMount

组件挂载到dom之前，$el不可用。

本钩子之后，执行render函数，生成VNode，将VNode转换为dom挂载至$el。

**ssr不可用**

## mounted

组件已经挂载到dom中，$el可用。

**ssr不可用**

> 并不保证所有的子组件都被挂载完成
>
> 如果希望等到整个视图渲染完毕，需要在`mounted`内部使用 `vm.$nextTick`

### beforeUpdate

`data`和`props`已经更新，`dom`还未更新，`diff`还未发生。

**ssr不可用**

### updated

dom更新已经完成，需要避免在此钩子内更新状态。

**ssr不可用**

> 并不保证所有的子组件也一起重绘完成
>
> 如果希望等到整个视图都重绘完成，需要在`updated`内部使用 `vm.$nextTick`

### activated

keep-alive组件被激活时调用

### deactivated

 keep-alive组件停用时被调用

### beforeDestroy

实例销毁之前调用，在此钩子内，实例完全依然可用。

dom节点被移除，但vm.$el扔保留在内存中。

### destroyed

实例销毁后调用。钩子调用后，所有指令事件子实例，均被销毁解绑。



> beforeDestroy  vs  destroyed 二者区别于关系，存疑问

### 兄弟组件间切换

原组件：A    |    新组件：B

+ B ----> beforeCreate ---> created ---> beforeMount
+ A ----> beforeDestroy ---> destroyed
+ B ----> mounted

### 父子组件创建

父组件：P    |    子组件：C

+ P ---->  beforeCreate ---> created --->  beforeMount
+ C ---->  beforeCreate ---> created --->  beforeMount --->  `mounted`
+ P ---->  `mounted`

> 官方文档中提示：并不保证子组件的`mounted`在父组件`mounted`之前

### 父子组件更新

父组件：P    |    子组件：C

+ 仅父组件需要更新
  + P ----> beforeUpdate ---> updated
+ 仅子组件需要更新
  + 数据来源于自身的data
    + C ----> beforeUpdate ---> updated
  + 数据来源于自身的props
    + P ----> beforeUpdate
    + C ----> beforeUpdate ---> updated
    + P ----> updated
+ 父子组件均需要更新
  + P ----> beforeUpdate
  + C ----> beforeUpdate ---> updated
  + P ----> updated

>  官方文档中提示：并不保证子组件的`updated`在父组件`updated`之前

### 父子组件销毁

父组件：P    |    子组件：C

+ 仅销毁子组件
  + P ----> beforeUpdate
  + C ----> beforeDestroy ---> destroyed
  + P ----> updated
+ 父子组件均销毁
  + P ----> beforeDestroy
  + C ----> beforeDestroy ---> destroyed
  + P ----> destroyed

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

- 动态渲染HTML可能会很危险，可能会导致`XSS`攻击，只对可信任的内容使用HTML插值。
- 引入的内容不受scoped-style的影响。
- 可能引入css污染全局样式。

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

### 循环引用

#### 递归组件

在组件自身调用自身，只能通过设置的`name`来实现，并且必须是条件性的（得到false的v-if分支）。

#### 组件之间

使用Vue.component全局注册时，不会出现问题。

当使用第三方工具（webpack）时，会出现问题，解决方案如下：

在其中一个组件中注册另一组件时，使用异步组件的方案：

```js
components: {
  OtherCom: () => import('./other.vue')
}
```

### 控制更新

#### 强制更新

大多数情况下用不到。

```js
vm.$forceUpdate();
```

主要针对于数据变更时，未能触发监听及重渲染的情况，如：

+ 直接操作数组索引
+ 直接给对象添加属性及属性值
+ 等等....

#### 静态组件

只在第一次通过模板及数据渲染，之后不再更新。`（尽量不要使用）`

```htlm
<div v-once>
	<!-- any -->
</div>
```

无论是传入的`props`还是自身的`data`变更，都不会再更新。

### 跳过渲染

使用v-pre指令，跳过这个元素和它的子元素的编译过程。

```html
<span v-pre>{{ this will not be compiled }}</span>
```

## 边界情况

+ $root	根组件

+ $parent  父组件

+ $el   根DOM元素

+ $children   直接子组件`（不保证顺序）`

+ $refs    所有注册过ref的DOM或组件实例

  + 组件：返回组件实例

  + DOM：返回DOM元素

  + 唯一，v-for下返回的是数组

  + 仅在渲染完毕后可用（`mounted`）

  + render：render生成的组件，依然适用上述规则

  + functional：需要在functional内部指定 ref 

    + 若functional根元素为组件，ref指向该组件
    + 若functional跟元素为DOM，ref指向该DOM

    

+ hook:beforeDestroy

  + 通常在`beforeDestroy`钩子内解除绑定的事件
  + 但导致注册和销毁分为两部分，不直观
  + 可以是用 `vm.$once('hook:beforeDestroy',fn)` 的方式进行销毁

## 组件间传值

### Event Bus

适用范围：小项目、简单项目，兄弟组件间通信

需要注意的是，当监听后，需要寻找时机解绑，防止监听事件不销毁。

如果只是传一次值，在绑定监听的时候，使用`$once`

如果需要多次实时传递值，需要在组件的beforeDestroy钩子中解绑`$off`

### props & $emit

适用范围：简单父子组件，嵌套层级不深

推荐使用`.sync`操作符，简化操作

### $attrs & $listeners

**传递属性：**

```html
<com v-bind="$attrs"></com>
```

通过此种方式，将当前组件`未注册的props`(class和style除外)，但上级传递过来的属性传递给下级组件。

> 若在使用下级组件时，传入了与$attrs中`同名属性`，则传递的$attrs中的内容会被`覆盖`。

**传递事件：**

```html
<com v-on="$listeners"></com>
```

通过此种方式，将当前组件所接受到的事件，传递给子组件。无法传递父组件通过`.native`修饰符传递的事件。

>  需要注意的是：若同时传递了同名事件，子组件会一起接收，作为`数组处理`！！

### provide & inject

项目中不建议使用，增加耦合，重构困难。

适用于开发高阶插件、组件库的情况。

provide 传递的值，若是原始值，则必然不是可响应的。但若传递的值是可响应的对象，则依然是可响应的。

**案例：**

两个组件 `form` 和 `input`，在`form`组件上指定整个表单的大小，`input`组件中也会用到。但由于各种需求，可能出现`form`和`input`之间还有其他中间组件，导致`form`和`input`的亲子关系很远，此时可以使用`provide & inject` 在`form`中向下注入当前的基本信息。

### vuex

**State**：store的唯一数据源

**mapState**：获取多个状态，用于computed中

**Getter**：store的计算属性

**mapGetters**：用于映射成多个局部计算属性，用于computed中

**Mutation**：`同步`更改状态，使用 `store.commit(type , payload)`

**Action**：

- 异步调用，其内调用Mutation，通过 store.dispatch 触发
- mapActions 用于在组件中使用action

**Module**：分割模块

## 强制要求

- 组件名：多个单词
- prop：尽量详细，类型，校验等
- 组件样式：设置作用于（scoped 或 css module）



## mixin

用于分发可复用的功能。

`Vue.mixin`：全局混入，影响之后创建的每一个Vue实例。插件使用，不建议应用代码中使用。

对业务代码进行包装，开发者无感知。

不应扩展更多其他内容，造成逻辑不清。

`mixins`：对已有组件的扩展，接收数组。

破坏代码可读性，扩展性变差，当出现公用mixin时，修改成本过高。

合并规则：

+ 钩子函数 --> 合并为数组 ---> 混入的钩子函数先调用
+ 数据对象 --> 递归合并 ---> 冲突时以组件数据优先
+ 其他：合并为一个对象 ---> 冲突时以组件数据优先

## extend

在功能完备的组件上添加新的功能，从而形成新的组件。

从属性上扩展，并不是像HOC那样从逻辑上进行扩展。

合并规则：

+ 钩子函数 --> 合并为数组 ---> 混入的钩子函数先调用
+ 数据对象 --> 递归合并 ---> 冲突时以组件数据优先
+ 其他：合并为一个对象 ---> 冲突时以组件数据优先

## 自定义指令

- 千分位
- 首字母大写
- 权限
- 只能输入数字
- loading
- ....

## 异步更新队列

Vue在更新DOM时，是异步执行的。

当数据变更时，开启异步队列，将数据变更的watcher存入队列中，在当前的同步事件中，触发的其他watcher都会存入相同的队列中，并且对于相同的watcher，只会存入一次。

好处：

- 避免频繁操作DOM，导致性能问题
- 数据可能多次变更，watcher可能多次触发，导致性能问题
- 

## Vue3使用proxy的好处坏处

- 数据中的key不用先定义了
- 数组可以操作索引和length
- 可以监听map和set
- 兼容会有问题

## 观察者 VS 发布订阅

- 观察者：
  - 二个角色
    - 观察者
    - 被观察者
  - 多用于单个应用内部
  - 松耦合
  - Vue使用的模式
- 发布订阅
  - 三个角色
    - 发布者
    - 订阅者
    - 管理者
  - 完全不耦合
  - 多用于跨应用的系统
    - 消息中间件

## keep-alive

函数式组件无效，因为函数式组件中没有实例。

本质上是在内存中保存了组件的实例，切换时直接通过实例进行挂载。

生命周期：

- **activated**

  - 启用时触发
  - 首次进入就会触发
  - 子孙组件也会触发

- **deactivated**

  - 停用时触发

  - 子孙组件也会触发

    

以下：还是看一下思维导图，vue基础知识

## watcher

分为三种

+ 组件（对应一个watcher）
+ computed （用到才会更新）
+ watch

### 优先级：

watch > computed > render

### 实现方式

对数据进行劫持

getter阶段，每个属性都会记录谁依赖了自己，保存在自身的私有属性上，保存的内容就是watcher

setter阶段，每个属性找到依赖自身的watcher，并开启异步队列，将watcher加入其中（只加入一次）。

下一次事件循环中，执行异步队列。

- 组件在执行render前，删除组件watcher有关的依赖，在render时，重新收集依赖。
- computed：惰性的，只有使用的时候，才会进行计算，并且会缓存。

## nextTick

nextTick 调用时，在当前同步代码执行后，判断是否出现异步队列，若有异步队列，将回调函数加入异步队列尾部；若没有异步队列，直接下一此时间循环执行回调函数。

以上内容：最新版测试结果，没看代码。

## JSX

### Render函数

+ 返回VNode
+ 所有VNode必须是唯一的
+ 没有对应的v-model
+ render函数若存在，优先级最高
+ 第一个参数若是组件
  + 第二参数中需指定 scopedSlots （this.$scopedSlots、content.scopedSlots）
  + 否则插槽不好用

### 函数式组件

- 组件自身时没有状态的，也就是没有data，所有数据均需要由父组件传递
- 组件自身没有实例，也就是没有this
- 没有生命周期相关钩子
- 无法使用keep-alive
- 只是函数，渲染开销很低
- 父组件中指向函数式组件的ref
  - 若无特殊处理，在this.$refs中并不能取到内容
  - functional内可通过content.data.ref获取传入的ref值
  - 在render中，通过第二个参数指定ref，会隐式的绑定到调用者的$refs中
  - 若h函数第一个参数为组件，则ref指向组件，若为dom，则ref指向dom
- vue-Devtools
  - 若render第一个参数是组件，vue-Devtools不显示functional
  - 若render第一个参数是元素，vue-Devtools显示functional

为什么使用函数式组件：

+ 渲染开销很低
+ 作为包装组件，选择性的渲染某个组件
+ 可以作为高阶组件使用

## 组件设计原则

### 什么是组件化开发

前端组件化开发，就是将页面的某一部分独立出来，将这一部分的 数据层（M）、视图层（V）和 控制层（C）全部封装到一个组件内，暴露出一些开箱即用的函数和属性供外部组件调用，对外部使用者来说，组件时一个完全的黑盒。

### 优点

+ 降低耦合性
+ 提高组件内部的聚合性
+ 降低开发复杂度，提高开发效率
+ 有利于单元测试和自测，对重构友好
+ 对新人友好，初始工作可以从组件的开发测试开始，避免一开接就要熟悉整个项目。

### 设计思想

+ 单一职责，保持组件纯粹
+ 尽可能甚至不合业务耦合

## 如何实现

- 一个组件，一个目录

  - 本组件的资源放置在本目录内
  - 资源就近维护。

- 相同逻辑功能，仅仅是UI的不同

  - 将UI不同的逻辑通过props消化在组件内部
  - 无需因为UI的问题拆分组件

- 对于传入的数据Props进行校验

  - 类型校验
  - 非空校验

- 无环依赖

  - 避免相互引用
  - 使用共同依赖的通用组件作为中间人，解决必须需要依赖的情况

- 避免冗余state

  - 若某项数据可以通过state推导得到，那该数据不要放在state中
  - 若某些数据是固定的，一定不会变化的，将其作为常量，不要放在state中
  - 若兄弟组件拥有同样的state，将state放到父级，将其作为props传入

- 依赖关系合理

  - 保证父组件不依赖于子组件
  - 删除子组件，不会导致功能异常

- 良好的接口设计

  - 组件内部可以完成的内容尽量做到极致
  - 若需要为某个需求编写大量特定代码，可以考虑通过扩展的方式构建一个新组件

  ### 组件分类

  + 基础组件
    + antd、element-ui等组件库
  + 容器组件
    + 作为业务模块的入口
    + 子组件具有业务和数据的关联性
    + 数据获取、数据更新
    + 不关心UI的展现
  + 展示组件（木偶组件）
    + 描述如何展示（骨架、样式）
    + 数据来源 props
    + 数据修改--调用父组件注册的或者组附件传入的event
    + 只是呈现传入的props
  + 业务组件
    + 根据最小业务状态抽象而出
    + 一般情况并不具有复用性
  + UI组件
    + 界面扩展类，复用性强（弹窗）

### 注意点

+ 组件设计之初，就应该拥有不耦合业务的名字
+ 组件UI永远千变万化，但行为逻辑是固定的
+ 将控制权更多的交给开发者
+ 关于Bug
  + 数据问题，从外向里排查
  + 样式问题，从内向外排查
+ 它太友好了，导致门槛太低，大家用的很随意

## 性能优化

目前来看，很多情况下，并不需要关注性能的问题，目前的主流框架，已经把性能方面做得很好了。

+ 区分v-if和v-show
  + v-if：适用于不会重复变更的情况下，因为它每次都会销毁重建
  + v-show：适用于重复变更的情况下，因为它只是显示隐藏
+ 能用computed就不要用watch
  + computed 本身是惰性的，并且具有缓存
+ 避免同时使用v-for和v-if
  + v-for的优先级高于v-if
+ 路由懒加载
  + 提高首屏渲染速度
+ 销毁自定义的事件
  + 要在beforeDestroy中销毁事件
+ 降低watcher
  + 减少data中的属性数量
  + 使用Object.freeze 冻结对象
+ 列表中一定使用key
  + 实际项目中列表都很复杂
  + 避免原地复用，快速找到对比的dom节点
+ 展示组件使用函数式组件
  + 本身没有data，不存在data相关的watcher
  + 本身是函数，不存在实例
+ 使用keep-alive
  + 将经常切换显示的组件缓存
  + 避免多次销毁创建的性能损失

## 单元测试

最好有单元测试，但受限于国内互联网环境，大多要求是快速迭代，敏捷开发，很难做到覆盖单元测试。

改善代码质量不一定只能从测试入手，良好的代码规范，强制性的lint，强化代码审查，将不健壮的代码挡在review阶段也是比较靠谱的。

### 什么不是测试

+ 需要访问数据库的
+ 需要访问网络的
+ 需要访问文件系统的

### 好处

+ 代码修改，通过原有的单元测试，可以得知之前的功能依然如常
+ 反向影响写的代码，是易于测试的，也就是设计优良的代码，强迫我们的代码是松耦合的。
+ 具有解释性，其他人通过查看测试用例，可以快速了解你的代码都做了什么

### 思路

不是为了编写出大覆盖率全部通过的测试代码，而是从调用者出发，尝试函数逻辑的各种可能性，进而辅助性的增强代码质量。

测试的目的不也是为了证明代码正确，而是为了发现代码的问题。

不可以忽略任何测试失败的用例，一旦开头，单元测试的意义就崩塌了。

bugfix 和 feature addition 必须要有对应的单元测试用例，才能发布。

业务代码，并不推荐写单元测试。

### 用例设计

- 正常输入
- 边界输入
  - 空值
  - 零值
  - 最大值
- 非法输入
  - 入参类型非法
  - 内存溢出
- 保证幂等
  - 相同输入，保证输出结果永远一致

先从黑盒用例来写（对外暴露的API层面），在功能追加过程中，逐步增加测试用例，达到80%以上的覆盖率。

### [Vue Test Utils](https://vue-test-utils.vuejs.org/zh/)

## 微前端

### 工具

UI测试：enzyme

## Element-ui

PopupManager：全局遮罩才需要

## Vue.use

## Vue.nextTick

## Diff

## Vue.i18n 国际化

## Vue 事件旅行

## 高阶组件

## 双向绑定原理

看看书

## 骨架屏

## 单点登录 SSO

https://zhuanlan.zhihu.com/p/50541175

https://www.jianshu.com/p/7c852e294a76

https://blog.csdn.net/clh604/article/details/20365967



