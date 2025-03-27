---
author: longlin
pubDatetime: 2025-03-24T16:32:00
title: 浅析 CSS 动画
slug: css-animations
featured: true
draft: false
tags:
  - css
  - animation
description: 一篇关于 CSS 动画的简单博客
---

一个好看的网站总是绕不开 CSS 动画，但我自己之前对这块的了解并不多，也谈不上深入，恰好面试的时候被问到了，所以就简单写一篇博客，记录一下自己的理解。

## Transition, Transform 和 Animation

我们提到动画，主要会考虑那么几个属性：动画名称、动画时长、动画延迟。

### Transition

`transition` 一般的使用场景更多的会用在 hover 等伪类上，例如：

```css
button {
  background-color: #000;
  /* property name | duration | timing function | delay */
  transition: background-color 0.3s ease-in-out 0s;
}
button:hover {
  background-color: #f00;
}
```

当然，`transition` 也可以同时应用在多个属性上，例如：

```css
button {
  background-color: #000;
  color: #fff;
  /* property name | duration | timing function | delay */
  transition:
    background-color 0.3s ease-in-out 0s,
    color 0.3s ease-in-out 0s;
}
button:hover {
  background-color: #f00;
  color: #000;
}
```

我们也可以通过将 property name 设置成 `all` 来将动画应用在所有发生了变化的属性上。

`transition` 最常见的应用场景主要还是针对颜色、背景色、边框等属性的变化。

### Transform

`transform` 本身其实不算「动画」，通过设置它的属性可以对元素进行拉伸、压缩、旋转、缩放、移动等操作，例如：

```css
button {
  transform: skew(30deg, 20deg);
  transform: translateX(2em);
  transform: rotate(10deg);
  transform: scale(1.5);
}
```

我们还可以指定 `transform` 的变换原点，例如：

```css
button {
  transform-origin: center;
  transform-origin: top left;
  transform-origin: 50px 50px;
}
```

默认的原点是元素的中心。

当然，通过 `transform` 和 `transition` 进行搭配可以实现更多有趣的过渡动画。

但是，我们可能会有这种疑问：

- `translate` 这种 `transform` 属性实现的功能能不能直接用 `margin` 或 `left`、`top` 等属性来实现呢？

答案是可以的，但是 `transform` 系具有更好的性能，因为它是一个硬件加速的属性，而 `margin` 或 `left`、`top` 等属性是一个软件加速的属性。

表面上看起来，用 `transform` 和使用 `margin` 或 `left`、`top` 等属性的样式效果是一样的，但是，打开浏览器开发者工具里的性能面板，可以发现，使用 `transform` 实现的动画并没有在移动过程中触发重绘重排，GPU 加速可以大幅提升动画的性能。

除了 `transform`，`opacity` 也是一个硬件加速的属性，所以，使用这两种属性可以实现更好的动画性能。

然而，在 GPU 和 CPU 之间切换是有一定的开销的，可能会导致动画出现卡顿，或是部分内容存在跳变，这时候，我们可以使用 `will-change` 属性来告诉浏览器，我们即将使用的属性将会发生变化，从而让浏览器提前准备好对应的资源，例如：

```css
button {
  will-change: transform;
}
```

这意味着浏览器会一直让 GPU 处理这个元素。不会再有 CPU 和 GPU 之间的切换，也不会再有明显的「弹跳回位」现象。

GPU 硬件加速还有另外一个好处，因为它可以使用亚像素渲染，所以，我们可以实现更平滑的动画效果，这是 `margin` 等属性无法实现的，利用这点我们的动画可以更加流畅。

### Animation

`animation` 是 CSS3 中新增的属性，它可以让我们创建自定义的动画。
`animation` 的使用场景主要是在需要频繁切换的场景下，例如：

```css
@keyframes example {
  0% {
    background-color: red;
  }
  50% {
    background-color: yellow;
  }
  100% {
    background-color: red;
  }
}
button {
  /* @keyframes duration | easing-function | delay | name */
  animation: 3s linear 1s example;

  /* @keyframes duration | easing-function | delay |
  iteration-count | direction | fill-mode | play-state | name */
  animation: 3s ease-in 1s 2 reverse both paused example;
}
```

我们可以在 `keyframes` 的关键帧中定义多个 CSS class 状态，也可以定义多个关键帧，这会比单纯的 `transition` 更加灵活。
