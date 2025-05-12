---
author: longlin
pubDatetime: 2025-02-16T08:05:00+08:00
modDatetime: 2025-02-16T20:51:00+08:00
title: React Hooks 最佳实践
slug: react-hooks-in-optimization
featured: true
draft: true
tags:
  - react
  - optimization
description: 常见 Hooks 写法帮助解决页面重渲染问题
---

最近写 Taro 小程序时遇到了很头疼的页面 Re-render（重渲染）问题，查了一些相关资料发现自己过去写的 React 代码实际上都没怎么考虑性能上的优化，React 自己已经封装好了很多 Hooks，所以优化起来也并不复杂，平时写代码时应该多留意下。

推荐阅读：[React re-renders guide: everything, all at once](https://www.developerway.com/posts/react-re-renders-guide)，本文大部分代码案例也来源于此。

## 将 `useState` 组件单独拆分出来
