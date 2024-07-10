---
author: longlin
pubDatetime: 2024-07-08T15:00:00Z
modDatetime: 2024-07-08T15:00:00Z
title: Decal 笔记（1）：包管理器
slug: decal-01
featured: true
draft: true
tags:
  - Decal
  - Linux
description: 简单汇总一下包管理器的有关知识
---

最近在看 UCB 的 Sysadmin DeCal，大部分内容都是面向初学者的基础知识，但是在学习过程中我发现其中有不少内容是我之前并未留意的，故借此机会查漏补缺，并将笔记记录于此，方便后续回看。

## deb 包的打包过程

![package-procedure](@assets/images/Decal-01/procedure.png)

编译过程不必多说，该过程将源码编译为可执行的二进制文件，有一些需要手动编译的包需要在此步 `./configure` 然后 `make install` 。

重点看后面，如何自行打一个 `.deb` 包？

### `.deb` 包的具体内容

以 `linux-qq` 的 deb 包为例：

```bash
$ ar t QQ_3.2.9_240617_arm64_01.deb
debian-binary/
control.tar.xz/
data.tar.xz/
```
