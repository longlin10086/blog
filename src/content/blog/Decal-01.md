---
author: longlin
pubDatetime: 2024-07-08T15:00:00Z
modDatetime: 2024-07-08T15:00:00Z
title: Decal 笔记（1）：包管理器
slug: decal-01
featured: true
draft: false
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

deb 包本身有三部分组成：数据包，包含实际安装的程序数据，文件名为 data.tar.xz；安装信息及控制脚本包，包含 deb 的安装说明，标识，脚本等，文件名为 control.tar.xz；最后一个是 deb 文件的一些二进制数据，包括文件头等信息。

我们先来看看控制文件：

```bash
$ dpkg -e QQ_3.2.9_240617_arm64_01.deb ./control  # 解包控制内容

$ tree control
.
├── control
├── md5sums
├── postinst
└── postrm

$ cat control
Package: linuxqq      # 软件包名称
Version: 3.2.9-24815  # 软件包版本
License: unknown
Vendor: Tencent <QQ-Team@tencent.com>
Architecture: arm64   # 支持的处理器架构
Maintainer: Tencent <QQ-Team@tencent.com>
Installed-Size: 533061
Depends: libgtk-3-0, libnotify4, libnss3, libxss1, libxtst6, xdg-utils, libatspi2.0-0, libuuid1, libsecret-1-0  # 依赖列表
Recommends: libappindicator3-1
Section: default
Priority: optional  # 优先级，包含 required (系统正常运行必需的软件包),
                    # important (其他能使系统正常运行或可以正常使用的软件包),
                    # standard (任何 Linux 系统的标准组成部分，如 OpenSSH),
                    # optional (没有特殊系统需求的软件包)
Homepage: https://im.qq.com
Description:
  QQ
```

除了 `control` 文件，其它几个文件分别是安装和卸载脚本。具体说明如下：

> 什么是 Debian preinst、postinst、prerm，和 postrm 脚本？
>
> 这些文件是在软件包安装或卸载前后自动执行的可执行脚本。这些文件和名为 control 的文件都属于 Debian 档案文件的“控制”部分。

> - preinst **preinstallion**
>
> 该脚本在所属的软件包从它的 Debian 档案文件（“.deb”）中被解压之前执行。许多“preinst”脚本会停止和正在升级的软件包有关的服务，直至安装或升级完成（即在“postinst”脚本成功执行之后）。
>
> - postinst **postinstallion**
>
> 该脚本在软件包从它的 Debian 档案文件解压后执行，通常用于完成软件包所必需的配置。这包含了软件在进行正常目录文件拷贝到系统后，所需要执行的配置工作。许多“postinst”脚本会在新软件包的安装或升级完成之后执行必要的命令，以启动或重新启动服务。
>
> ```bash
> $ cat postinst
> #!/bin/bash
>
> # Link to the binary
> ln -sf '/opt/QQ/qq' '/usr/bin/qq'
>
> # SUID chrome-sandbox for Electron 5+
> chmod 4755 '/opt/QQ/chrome-sandbox' || true
>
> update-mime-database /usr/share/mime || true
> update-desktop-database /usr/share/applications || true
> ```
>
> - prerm **preremove**
>
> 该脚本通常停止与软件包有关联的服务。它在删除与软件包相关的文件之前执行。
>
> - postrm **postremove**
>
> 该脚本通常修改与软件包相关的链接或其他文件，并删除该软件包创建的文件。
>
> ```bash
> $ cat postrm
> #!/bin/bash
>
> # Delete the link to the binary
> rm -f '/usr/bin/qq'
> ```

下面来看看数据包中的内容：

```bash
$ dpkg -X QQ_3.2.9_240617_arm64_01.deb ./qq   # 解包安装内容
$ tree -L 3 ./qq
.
├── opt
│   └── QQ
│       ├── LICENSE.electron.txt
│       ├── LICENSES.chromium.html
│       ├── chrome-sandbox
│       ├── chrome_100_percent.pak
│       ├── chrome_200_percent.pak
│       ├── chrome_crashpad_handler
│       ├── icudtl.dat
│       ├── libEGL.so
│       ├── libGLESv2.so
│       ├── libffmpeg.so
│       ├── libunwind.so.1
│       ├── libvk_swiftshader.so
│       ├── libvulkan.so.1
│       ├── libz.so.1
│       ├── locales
│       ├── qq
│       ├── resources
│       ├── resources.pak
│       ├── snapshot_blob.bin
│       ├── v8_context_snapshot.bin
│       └── vk_swiftshader_icd.json
└── usr
    └── share
        ├── applications
        ├── doc
        └── icons
```

### `.deb` 打包过程

首先采用规范命名：`<软件包名字>_<版本号>-<Debian 修订版本号>_<Debian 架构>.deb`

然后在把二进制文件复制进文件夹内：

```bash
$ mkdir helloworld_1.0_arm64
$ mkdir helloworld_1.0_arm64/usr
$ mkdir helloworld_1.0_arm64/usr/local
$ mkdir helloworld_1.0_arm64/usr/local/bin
$ cp "~/Projects/Hello World/helloworld" helloworld_1.0_arm64/usr/local/bin
```

接着按照上述 控制文件 的规范要求填写配置文件和脚本文件：

```bash
$ mkdir helloworld_1.0_arm64/DEBIAN
$ nano helloworld_1.0_arm64/DEBIAN/control
$ nano helloworld_1.0_arm64/DEBIAN/postinst
$ nano helloworld_1.0_arm64/DEBIAN/postrm
```

最后将其打包成一个 `.deb` 文件：

```bash
$ dpkg-deb --build helloworld_1.0_arm64
```

好了，现在你就能分发由自己制作的 `deb` 包了！
