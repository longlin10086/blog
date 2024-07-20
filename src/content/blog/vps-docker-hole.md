---
author: longlin
pubDatetime: 2024-07-19T11:00:00Z
modDatetime: 2024-07-19T11:00:00Z
title: 国内VPS装Docker踩坑寄录
slug: vps-docker-hole
featured: true
draft: false
tags:
  - Docker
  - VPS
description: 我真要吐血🥲
---

事情起因是这样的，为了满足我和家人日益增长的影音需求，我决定采用 Alist 挂载云盘的方式存放影音文件，并通过绑定域名的方式方便访问。由于我本人持有存储量最大的云盘是夸克网盘，且夸克网盘支持磁力链接转存，非常符合我的需求，因此下一步便只需要找一台带宽比较大的服务器就行（Alist挂夸克网盘不支持重定向，只支持本地代理）。

![quark](@assets/images/vps-docker-hole/quark.png)

在朋友推荐下我买了一台 中山 200M带宽 500G流量 带v6出入口 搭载 Ubt22.04 的VPS，哼哧哼哧的连上去。此时的我还不知道，我宝贵的一晚上都将浪费在此。

首先是 apt 官方源访问不是很好，下东西慢。这个简单，到 `/etc/apt/source.list` 换源嘛，我直接换成清华源。

`nginx`很快就下好了，现在到了最核心的问题：`Docker`该怎么下？由于某些原因国内前不久刚把`Docker`墙了，这导致官网给出的安装步骤会卡在这一步：

```bash
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
```

好，既然 `source.list` 能换源，这里难道就不能换吗？很快啊，上咕噜咕噜一搜，相似的问题果然有很多，最后在 `linux.do` 论坛上找到了一个非常简单的解决方案。具体详情可见 [这篇博客的末尾](https://www.wxy97.com/archives/77) ，属于是前人栽树后人乘凉了。

~~`Docker` 装上了，剩下的就是些收尾工作了。~~ 当我运行 `alist` `Docker`安装脚本的时候发现事情有些不对劲了：

```bash
docker run -d --restart=unless-stopped -v /etc/alist:/opt/alist/data -p 5244:5244 -e PUID=0 -e PGID=0 -e UMASK=022 --name="alist" xhofe/alist:latest
```

被墙了怎么拉镜像？？这真是卡大家脖子的关键技术👍

我想了两种解决方法：

1. 直接在VPS上挂代理翻
2. 本地下载好`image`后打包然后`scp`上去

先来看第一种方法，由于我这是VPS，所以需要使用支持Web访问的代理客户端，这里我找了`daed`和`mihomo`两款软件。又因为VPS无法访问 `GitHub` ，所以我还得把相关 Release 包手动下下来后`scp`上去，非常麻烦。

这里就说结果：

1. `daed` 装的很快，但由于我的机场订阅链接被墙所以无法下载相关配置，寄 ~~（要用魔法来打败魔法）~~
2. 没看懂 `mihomo` 要怎样安装怎样运行怎样开Web端，寄

那么方法只剩本地打包镜像上传了，这里我又踩了个小坑。

```bash
docker export [container-id] > ubuntu.tar
---
cat ubuntu.tar | docker import - test/ubuntu:v1.0
```

或

```bash
docker save -o alist_image.tar xhofe/alist:latest
---
docker load -i ./alist_image.tar
```

由于我使用的是 Mac ，打包镜像上传后发现运行不了，看报错才发现是因为架构不同。

```bash
docker run -d --restart=unless-stopped -v /etc/alist:/opt/alist/data -p 5244:5244 -e PUID=0 -e PGID=0 -e UMASK=022 --name="alist" xhofe/alist:latest
WARNING: The requested image's platform (linux/arm64) does not match the detected host platform (linux/amd64/v4) and no specific platform was requested
```

好嘛，这下只能开虚拟机或是从我 hk 的VPS上打包镜像上传了，但我已经不想再折腾了。。。

等等，`alist`可以手动安装吧，并不是一定要用`Docker`，我只要把`tar.gz`上传后手动解包就行了。。。

后面的事就比较简单了，按照官方步骤解包安装，配`systemd`，写好`nginx.conf`，打开反代，到`cloudflare`上配好DNS，收工！

**所以我到底该怎么在国内VPS上装`Docker`镜像呢？**
