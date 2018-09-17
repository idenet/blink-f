# 一些考虑点

## css

将文字行高设置的和字体大小一样，消除文字上下间距

```
line-height: 24px;
font-size: 24px;
```

## 使用 audiomanager

1.  必须填 title

## 回调和 Promise 的区别

### 回调

1. 产生回调地狱，如果是链式调用的话
2. 没发 return
3. 多次的回调会让源码难以阅读
4. 两个调用要同时产生

### Promise

1. Promise 必然会产生一个结果
2. 可以 return
3. 链式调用可以通过 then 中 return 一个 promise 解决
4. all 和 rece 方法增加了使用场景

### async/await

1. 主要是 promise 的语法糖。
2. 让 promise 的使用方法变成了同步
3. 链式调用其实就是在等待返回

### 组件外部样式

1. externalClasses
