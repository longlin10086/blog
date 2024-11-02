---
author: longlin
pubDatetime: 2024-11-03T01:46:00+08:00
modDatetime: 2024-11-03T01:46:47+08:00
title: 手搓一个简历模板吧！React 实践踩坑记录
slug: resume-develop
featured: true
draft: false
tags:
  - OpenSource
  - React
description: resume-web 开发过程踩坑
---

项目网址：https://cv.longlin.tech

仓库地址：https://github.com/longlin10086/resume-web

![light](@assets/images/resume-web/light.png)
![dark](@assets/images/resume-web/dark.png)

最近打算找实习（事实上已经面了两个大厂但都挂了），用 Typst 写简历的时候发现有些样式碍于模板无法满足我的要求，而且这玩意似乎完全可以用纯前端实现，如此一来不就能自定义一些好看的 CSS 样式了吗？加上近期在看前端相关，于是就干脆拿这个 idea 练练手，顺带熟悉一下前端开发。

起初我是想用 Vanilla JS 开发的，但随后发现没有脚手架开发起来确实非常难受，组件逻辑还得靠 `querySelector` ，组件关系使用 `innerHTML`，加样式还得自定义一堆 class，于是果断放弃了。

![old](@assets/images/resume-web/old.png)

既然都开始写前端了为什么不使用一个现代框架呢？正好之前还没正经接触过 React 开发，于是这个项目架构就换成了 `React + Vite + TailwindCSS`。

## 😅坑点一：React Icons 设置样式

svg 一个个导入的话太麻烦，于是我使用了现成的组件库 `React-icons`。但是，它并没有在官网把如何使用库的文档补全，只在首页最底下留了一个很小的 More info 链接，导致我第一次使用的时候甚至不知道要如何更改组件大小。当时也是头疼了一会，最后在它仓库 Readme 里找到这样的示例：

```jsx
import { IconContext } from "react-icons";

<IconContext.Provider value={{ color: "blue", className: "global-class-name" }}>
  <div>
    <FaFolder />
  </div>
</IconContext.Provider>;
```

好嘛，原来要用一个 Context 才能传值进去，确实很反直觉了。然而，这还没完，我在后面设置 暗/亮色 主题的时候又被它摆了一道————暗色主题图标颜色需要白色，但当我按照官方示例设置的时候却傻眼了，无论我怎么传 color 的值，图标颜色一点反应都没有。最后找了半天才从这个 [issue](https://github.com/react-icons/react-icons/issues/67) 里找到解决方法（甚至还不是最前面的首选回答）。

```jsx
<div className="hidden dark:block">
  <IoIosMail style={{ fill: "white" }} />
</div>
```

不能传 color 得传 style 不说，style 内部属性居然写的还是 fill，我释怀地似了。

## 😅坑点二：TailwindCSS 伪类

有人肯定会说，多好的 `after:content-[]` 啊，使我心智负担—-。可是，问题也是出在这，如果它渲染出问题的时候，你完全不知道发生了什么。

需求其实很简单，我需要在 content 里传入一段外部字符串，用 js 表示就是：

```jsx
let param = "2022 - 2024"
<div className=`after:content-[${param}]` >
```

然而，实际上手发现，这样完全无法成功渲染。起初我以为是字符串内含空格的问题，找了半天在[角落](https://tailwindcss.com/docs/adding-custom-styles#handling-whitespace)里发现 `TailwindCSS` 里空格要用 `_` 表示，我直接震惊。

但是，这也不行啊，去掉空格后这样式也太丑了。最后在疯狂搜索后终于发现了解决方法：

```jsx
<h2
    before={tr}
    className={`text-md font-bold text-pretty ${
    is_git ? "" : `after:content-[attr(before)] after:ml-2`
    } sm:after:content-none`}
>
```

你需要先在前面定义一个属性，并把待传值传入，然后调用 `attr()` 方法获取。直接在 `TailwindCSS` 里搜索 `attr` 是搜不到的，得搜 `content` 才有，这确实是只有碰到过相关问题才知道。

## 😅坑点三：样式与 HTML 语义

虽然这个功能已经被砍了，但还是有必要提一嘴：

![x](@assets/images/resume-web/x.png)

## 😊坑点之外

除了以上一些坑点外，开发过程中也遇到过一些小坑，不过既然不太记得了就证明这些坑大概率是我自己写出 bug 来了，解决起来也比较快。

总的来说，花了一个多星期开发出一款勉强能看的 Web 端简历我个人还是比较自豪的（工科生审美确实很土，别骂了）。在这过程中也算是入门了现代前端开发，不得不说 `React` 的 Hook 功能确实好用，`TailwindCSS` 也可以让样式所见即所得，不用来回切文件了，用起来还挺舒服的。

唯一的遗憾可能是项目并不大，还有些特性没能体验，下次有机会可能会试着重构下博客（？
