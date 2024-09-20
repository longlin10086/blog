---
author: longlin
pubDatetime: 2024-09-21T00:33:00+08:00
modDatetime: 2024-09-21T00:33:47+08:00
title: ROS + VSCode 编程环境快速搭建
slug: digital-image
featured: true
draft: false
tags:
  - ros
description: 在自己的电脑上开发数图实验
---

## 起因

在经历第一次数图实验课的灾难后，我便想要在自己电脑上搭建实验环境了。抛开 **难看的UI、惨目忍睹的自动补全、全线飘红的报错** 不谈，在自己电脑上舒适的开发难道不酷吗？我觉得这太酷了，科技并带着趣味。

## Ubuntu 20.04 虚拟机安装

首先，想用 ROS 至少得先准备一个 Ubuntu 的环境，并且实验指定环境是 20.04 版本。这个简单，到开源镜像站上下载就行了。这里提供两个网址，一个校内一个校外：

- [校内源](https://mirrors.osa.moe/) （校内只有 amd64 版本，如果你使用 Mac 或 Arm 笔记本请到清华源下载）
- [清华源](https://mirrors.tuna.tsinghua.edu.cn/) （全系列都有，下载速度可能不如校内）

下好 ISO 后就可以制作虚拟机了（由于 20.04 版本过老，现在只有 Server 版，但我们会在后续过程中安装桌面）。我这里使用的是 UTM ，其他虚拟机平台如 virtualbox, VMware 流程应该相似，操作位置不同。

根据这个[教程](https://medium.com/@shubhjain10102003/install-linux-ubuntu-20-04-on-m1-m2-mac-silicon-de1992d5fa26)一步步安装即可。需要注意两个点：

1. 当提示 `Installation Completed` 选择 `reboot` 后重启会黑屏，这时不要慌，关闭虚拟机然后推出 CD 介质即可（图正下方）
2. 为了方便后续 `ssh` 连接，请在安装过程中勾选安装 `OpenSSH Server`，并在安装完成后（确保能正常进入 CLI 模式）将虚拟机网络改为桥接模式（UTM 改桥接位置在图右上角）

![](@assets/images/digital-image/utm.png)

## 虚拟机的简单配置

现在你的虚拟机仍然只有黑乎乎的命令行窗口，接下来我们将为其安装桌面和开发工具。但为了接下来操作方便，最好先把 ssh 配好。

在虚拟机命令行里输入命令 `ip a` 查看虚拟机局域网内 ip 地址。

![](@assets/images/digital-image/ip.png)

接着在宿主机命令行里用 `ssh username@ip` 连接就好了。（注意要为桥接模式，否则虚拟机在虚拟 NAT 下是无法与宿主机建立连接的）

![](@assets/images/digital-image/ssh.png)

好，现在我们就可以在宿主机里操纵虚拟机了，命令/文本也能复制黏贴进去执行。

接下来该换源了，加快我们下载软件的速度：

1. 用编辑器（`nano / vi`）打开 `/etc/apt/source.list` 文件
2. 将里面文本内容改成[清华镜像源](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/)所提供的内容（ Arm 用户换[这个](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu-ports/)）
3. 退出编辑器，执行 `sudo apt update && sudo apt upgrade`

换好源后，安装桌面便简单了：

```sh
$ sudo apt install ubuntu-desktop
```

重启后就能看到桌面啦！

![](@assets/images/digital-image/desktop.png)

VSCode 安装就更简单了，到官网下载对应 `.deb` 包然后手动安装就行。

```sh
$ sudo apt install ./xxxx-vscode.deb
```

## ROS 环境配置

和 apt 换源一样，ROS 源也得换，可以直接照[清华源](https://mirrors.tuna.tsinghua.edu.cn/help/ros/)提供流程走。

换完源后，按照[官方教程](http://wiki.ros.org/noetic/Installation/Ubuntu)进行安装。（注意流程中 1.2 和 1.3 我们在上一步已经做过了，现在就不需要再做了哦）

还要注意一点，`catkin` 工具是需要单独安装的，可以在[此页面](https://catkin-tools.readthedocs.io/en/latest/installing.html)找到安装流程。

按理说现在环境已经配好了，把模板代码传上去检验一下吧（推荐使用 `scp` ）

![](@assets/images/digital-image/scp.png)

`unzip` 解包到目标位置，用 VSCode 打开吧！

模板代码里只有一个 `src`，我们需要 `cd` 进 `dip_ws` 工作目录下然后使用 `catkin init` 进行初始化。

![](@assets/images/digital-image/init.png)

`build` 一下看看：

![](@assets/images/digital-image/build.png)

这步报错的可能是忘记 `source /opt/ros/noetic/setup.bash` 了。

## VSCode 自动补全

以上都没问题的话，就可以开始着手配置自动补全了。

先打开 VSCode 安装好 ROS、C/C++、CMake、Clangd 插件。

CMake 插件第一次启动会让你选择一个 CMakeList.txt 文件，你可以选择 `exp1` 中的看看编译通不通过，不通过的话可能是你少装了什么包。（最后结果是 CMakeList 不飘红不报错）

![](@assets/images/digital-image/cmake.png)

接着便可以着手安装 clang 了。

```sh
$ sudo apt install clang
```

接着打开 `.vscode/c_cpp_properties.json`，添加/修改如下两行：

![](@assets/images/digital-image/json.png)

关闭 VSCode，在工作目录（`dip_ws`）下执行：

```sh
$ catkin build -DCMAKE_EXPORT_COMPILE_COMMANDS=1
```

生成 `compile_commands.json` 文件。（这步有问题的话可以查看 [issue](https://github.com/catkin/catkin_tools/issues/551) ）

![](@assets/images/digital-image/compile.png)

重新启动 VSCode，这时你的自动补全应该已经生效了，恭喜！

![](@assets/images/digital-image/fin.png)

最后的最后，推荐你使用 VSCode 远程 ssh 连接到虚拟机编写代码，这样就可以轻松进行复制粘贴了。

![](@assets/images/digital-image/remote.png)
