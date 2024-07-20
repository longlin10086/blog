---
author: longlin
pubDatetime: 2024-07-19T12:25:00Z
modDatetime: 2024-07-19T12:25:00Z
title: Decal 笔记（2）：浅析 service
slug: decal-02
featured: true
draft: true
tags:
  - Decal
  - Linux
description: 简单谈谈我理解的 service 服务
---

## 什么是 Service ？

根据 PPT 的表述，「service（服务）」 是一个被称为 **守护进程（Daemon）** 的特殊进程，它是一个不能互动的后台进程。这种进程通常以「d」作名称结尾，如：sshd，httpd等，也有些不一样的比如：nginx。它们通常由「init system」所控制，而我们熟悉的「systemd」正是其中之一，被广泛用于各个 Linux 发行版。

「systemd」给用户提供了管理服务的工具：「systemctl」和「journalctl」，前者主要用于启动、停止服务或查看当前服务的状态，后者则提供了「systemd」的日志查看。
