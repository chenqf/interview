## 缓存策略

+ html文件
  + http中只用对比缓存
  + 使用 service worker 进行缓存---CacheStorage
+ js、css文件
  + http中强制缓存和对比缓存都开启
  + 使用service worker 进行缓存---CacheStorage
+ get请求
  + 接口优先，先请求接口，成功存入---CacheStorage
  + 请求失败，使用 CacheStorage 中的数据

pwa 渐进增强，不支持的设备，也可以正常访问

service worder 独立线程，不影响主线程，对页面没有影响

部署时必须是https

每次发版，都修改CacheStorage中的缓存名

## hooks

+ 赋予了函数式组件状态以及生命周期
+ 可以替换HOC 和 render props 这两种组件复用的方式
+ 轮子
  + 监听页面大小，断网提示
  + 发送请求

## CDN

+ 本质就是缓存，将内容缓存到多个节点上
+ 域名解析时朝招最优节点
+ CDN劫持 ---- 全链路Https

## 安全

XSS

+ 攻击发生在自身网站
+ 不能信任任何用户的输入，都需要做转义
+ 页面传参、用户留言
+ 避免 innerHTML，输入内容长度控制，cookie使用httpOnly

CSRF

+ 攻击发生在第三方网站

+ 冒充用户提交请求

+ token发送放到header中

+ 验证请求来源，通过后台来做

  

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

## 响应式布局

移动端响应式

+ 以前都是用rem来进行缩放，后来开始使用vh，vw
+ 1rem = html中font-size的大小
+ js通过dpr计算出html中font-size的大小
+ 使用webpack的loader px2rem px2vw

PC/移动端

+ 对性能要求高、业务相关性强的网站，非常不适合用响应式
+ 响应式的结果就是大量的兼容代码，维护起来很困难
+ 适用于一些简单网站，交互很低，仅仅展示信息的网站
+ 主要使用媒体查询来做

## 浏览器渲染原理

解析html生成DOM树，解析css并结合DOM树，生成render树，布局，绘制

遇见script中断html解析，遇见css，中断render树的生成过程（仅在初始时有效）

## Redux

唯一改变state的办法就是action，action用于描述发生了什么

reducer 纯函数，用于描述如何修改state

dispatch 用于发起更改，入参是action

异步调用，需要特殊处理，实在觉得太麻烦了

## Vuex

单一状态树

唯一更改状态的办法：Mutation，通过store.commit

Mutation必须是同步函数

action中进行异步操作，提交Mutation，action通过store.dispatch触发

mutation执行后必定得到一个新的状态，这样就会有一个快照，vue可以拿到store的变更过程，如果里头有异步，就不知道这个过程了



## Flex

可以设置行内flex

分为主轴和交叉轴

flex-direction 设置主轴方向

Flex-wrap 控制如何换行，默认不换行

justify-content 主轴对齐方式

align-items 交叉轴对齐方式  拉伸对齐  文字基线对齐

项目

order 定义排列顺序

还可以放大缩小 flex-grow 放大 flex-shrink 缩小 都默认为1



## grunt gulp webpack

grunt 配置很麻烦

gulp配置比较简单，就是配置task任务的感觉，webpack就是大一统的感觉，目前支持也更好

## 自我介绍



我叫陈其丰，2012年毕业于沈阳工业大学计算机科学与技术专业。2012年毕业之后，就职于大连华信云服务业务部，在部门内带领一个6人团队负责部门内所有的前端项目，当时用到的技术，主要用requireJs做模块加载器，JQuery做dom操作，和一个机遇jquery的MVVM框架KendoUI。在2014年加入到我现在的公司大商天狗，组件了一个8人的前端团队，主要负责的就是大商天狗网web端，这个项目也一直迭代开发到现在。在这期间，推动了前端团队内的几次技术更新，引入Node作为前后端接口交互的中间件，将requireJs、jquery替换成vue1，又将vue1替换陈过了vue2，构建工具逐渐升级，grunt--gulp--webpack。然后目前，我主要负责前端架构方面的工作，和产品经理后端团队针对业务需求进行沟通确定落地的技术方案，也会带一些新人，做一些技术培训。

## 管理

先做的事

代码版本控制规则、代码审核规则、代码风格规范

如何带领一个团队

+ 以身作则，自己都做不到，怎么要求其他人
+ 沟通，更多的沟通，平等的对话
+ 专业技能一定不能丢，可以其他人比自己强，但至少要懂
+ 功劳别人的，问题自己的

督查

+ 功能排期，要预留
+ 1/3-1/4的工期后，就要过问一下，询问一下有没有什么问题了
+ 如果有问题，及时对应，工期预估的少了，协调一下其他人帮忙
+ 最终思想就是，尽可能的在预估的工期内完成，不改变工期
+ 工期的预估，交给实际应对者来估算，自己估算的，自己干完
+ 估算的特别少，或者特别多，都有问题

凝聚力---共同的奋斗目标，勾勒一个团队未来会怎样发展的方向，确定当前的小目标

制度

留人，靠的是希望，让对方觉得留下会更好，会有进步，再就是感情

突破底线的行为，绝不姑息

+ 本来能完成的工作，因为自己的原因完不成，推诿扯皮
+ 无故旷工多次
+ 在外人面前诋毁公司

犯错不可怕，一直犯同样的错误，必须得批评了，不批评他还会再犯

下属遇到问题，指引他找到答案，比如某个技术不会，如果他没研究，那去指点方向，不能直接帮忙

决策问题的时候，多问问其他人，集思广益，激发他人热情





## TODO

webpack5

单点登录实现

微前端

typescript



300+ 300+ 200+

mallCategoryHandler



基本相当于重构，于是愉快的用 TS，redux用上新模板，用上dev tools，就这么release了。

后面搞了一些事情，比如

1.ESLint, Prettier, TSI (ts sort import)，三个format/lint工具最佳实践，上CI。

2.Arkit, Gource，两个可视化工具看文件依赖和文件结构，提交历史，同样上CI。

3.Issue/PR 统一的模板给所有前端工程，用JIRA + github project + Issue 管 task。

4.统一extensions, 统一对应configs。

5.Figma搞设计，Storybook搞组件开发，里面用markdown in js，doc-gen写文档。

6.dependencies bot管依赖。

7.用路由微服务起了现在的应用，(然而没相关需求，为了用而用，并没有什么卵用)

加上原来就有的

1.google-analysis搞监控

[2.AWS](https://link.zhihu.com/?target=http%3A//2.aws/) codepipeline搞CD

3.gRPC + airflow 起的中后台

基本就成了现在的样子。

往后打算做的

1.定制CLI

2.按需搞extensions

3.在考虑toB项目怎么结合设计稿定义data-flow，完善edge case的设计

