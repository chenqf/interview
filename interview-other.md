# 零散问题

## 事件传播

点击触发后

+ 捕获阶段,从`document`开始向下传递
+ `EventTarget`
+ 冒泡阶段,从`EventTarget`开始向上传递

`addEventListener`,第一个参数,指定事件的类型.

`addEventListener`,第二个参数,指定触发的事件.

+ event.preventDefault() 用于组织默认事件.
+ event.stopPropagation() 用于`冒泡`或`捕获`时阻止传播

第三个参数指定是在`冒泡阶段`还是在`捕获阶段`触发事件,默认为false,`冒泡阶段触`发事件.

脱离文档流的元素,在事件触发时,依然受限于元素的真实位置.

第三个参数在最新版本,可提供一个options:

```js
{
    capture:false,//冒泡 | 捕获
    once:false, // 是否只执行一次
    passive:false, // 是否永远不会调用 preventDefault(),主要用于改善滚屏性能
}
```