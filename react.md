



element-ui 组件看完

## state

构造函数是唯一可以给 `this.state` 赋值的地方：

出于性能考虑，React 可能会把多个 `setState()` 调用合并成一个调用。和Vue中异步更新的思路一致。

setState接收函数，上一个state作为第一个参数，新props作为第二个参数



## 控制反转

在父组件中定义底层组件

好处是，底层组件直接可获取顶层组件的数据，无需一直向下传递

缺点是，需要将底层组件一层层的传递，使高层组件变得复杂



## 代码分割

```js
import().then(()=>{

})
```

使用 React.lazy, 不支持ssr，主要用于router中

```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```

## 错误边界

做不到：

+ 事件处理
+ 异步代码 setTimeout 、ajax
+ ssr
+ 自身的错误

componentDidCatch 捕获错误

static getDerivedStateFromError  更新state 用于渲染错误信息

## context

创建，提供，注入，函数组件的用法

```js
const MyContext = React.createContext(defaultValue);
```

```html
<MyContext.Provider value={/* 某个值 */}>
```

```js
MyClass.contextType = MyContext;
//声明周期内
let theme = this.context; //获取注入内容
```

```js
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```

需要注意，如果provider 提供的值是对象，当组件重渲染时，会重新渲染 consumers，将对象放入 state 中，是一个好办法。

需要多个context时，就需要嵌套多层provider



## Refs 

```js
this.myRef = React.createRef();

return <div ref={this.myRef} />;

const node = this.myRef.current;
```

不能再函数式组件中使用

事件里，进行焦点处理，等等

ref也可以接收函数，参数是dom节点或组件实例

## Fragment

循环时需要key

vue2 中是没有的，需要库实现vue-fragments

vue3好像支持了



## HOC

不要在render中使用HOC

务必复制静态方法

refs不会被传递，需要使用 React.forwardRef 来实现

要指定包装名称



## JSX

仅仅只是 React.createElement 的语法糖

通过编译转换为函数调用

组件：大写字母

props 默认值为 true

props.children 获取子元素,可以是dom，可以是组件，可以是函数

`false`, `null`, `undefined`, and `true` 是合法的子元素。但它们并不会被渲染。



## 性能

知道在什么情况下不需要更新,覆盖shouldComponentUpdate(nextProps,nextState) 返回false，跳过整个渲染过程

函数组件使用 React.memo 这个HOC，仅对props进行浅比较，若想自定义比较，使用第二个参数

在触发数据更新之前被调用，可以使用 this.props  this.state

使用 React.PureComponent 代替手写 shouldComponentUpdate，内部通过浅比较判断是否需要更新

上层 shouldComponentUpdate 返回false，下层不在需要进行比较

使用不可变数据，避免直接修改对象和数组的内部引用

react 没办法明确的知道数据发生变化，所以需要不可变数据

vue 中每个数据都有watcher，数据改变，立刻知道，所以不需要不可变数据

## Portals

将子节点渲染至父组件之外

```js
ReactDOM.createPortal(child, container)
```

```js
render() {
  // React 并*没有*创建一个新的 div。它只是把子元素渲染到 `domNode` 中。
  // `domNode` 是一个可以在任何位置的有效 DOM 节点。
  return ReactDOM.createPortal(
    this.props.children,
    domNode
  );
}
```

对话框、悬浮卡、提示框

仍然存在于React树中，于DOM树位置无关，context 等功能依然不变，事件冒泡也是一样。



## Profiler

测量一个React应用多久渲染一次，一级渲染一次的代价。目的是识别出应用中较慢的部分。

```js
render(
  <App>
    <Profiler id="Navigation" onRender={callback}>
      <Navigation {...props} />
    </Profiler>
    <Main {...props} />
  </App>
);
```

在onRender函数中返回渲染开销



## Diff 策略

两个不同类型的，一定不相同，删除一个，新建一个

通过key保证那些子元素在对比时可以作为相同节点处理

 

## React中的事件处理 ？？？

事件池

不能再异步中访问event



## Hook

在函数式组件中使用 state 和 生命周期

复用状态逻辑，并非复用state

每个effect属于渲染的一部分，它的执行和渲染时异步的，不会阻塞渲染，若想同步，使用 useLayoutEffect。

effect的第二个参数，数组，设定限定只有这个字段发生变更，才会在更新后重新出发effect。









HOC 嵌套地狱

Render Props  回调地狱

## 对比Vue

HOC

不用写模板

函数式组件，我喜欢函数

Fragment

Vue 依然还残留了继承的思想，耦合性上升





