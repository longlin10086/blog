---
author: longlin
pubDatetime: 2024-07-19T12:25:00Z
modDatetime: 2024-07-19T12:25:00Z
title: Decal 笔记（2）：浅析 service
slug: decal-02
featured: true
draft: false
tags:
  - Decal
  - Linux
description: 简单谈谈我理解的 service 服务
---

## 什么是 Service ？

根据 PPT 的表述，「service（服务）」 是一个被称为 **守护进程（Daemon）** 的特殊进程，它是一个不能互动的后台进程。这种进程通常以「d」作名称结尾，如：sshd，httpd等，也有些不一样的比如：nginx。它们通常由「init system」所控制，而我们熟悉的「systemd」正是其中之一，被广泛用于各个 Linux 发行版。

「systemd」给用户提供了管理服务的工具：「systemctl」和「journalctl」，前者主要用于启动、停止服务或查看当前服务的状态，后者则提供了「systemd」的日志查看。

## `systemctl` 命令的使用

大部分时候程序都是在前台运行，像`ssh`一样，终端窗口退出后程序便终止执行。但针对某些特定程序，我们希望它们开机自启动，或是一直运行在后台，这时`systemctl`便可帮助我们达到目的。

`systemctl`命令非常简单明了：

```bash
systemctl status [unit]  # 显示单元状态
systemctl start|stop|restart|reload [unit]  # 启动｜停止｜重启｜重新加载 单元
systemctl enable|disable [unit]  # 设置开机自启｜取消开机自启 单元
```

此处单元（unit）通常包括但不限于：服务（.service）、挂载点（.mount）、设备（.device）和套接字（.socket）。

## `service`脚本

启动`service`前，我们需要一个脚本来指定参数，这个脚本一般放在 `/usr/lib/systemd` 下：

- **`/usr/lib/systemd/system/`**，系统服务，开机不需要用户登录即可运行的服务
- **`/usr/lib/system/user/`**，用户服务，需要用户登录后才能运行的服务

以`alist`的脚本为例：

```ini
[Unit]
Description=alist
After=network.target              # 表示本服务需要在 network.service 启动之后启动（同理还有 Before）

[Service]
Type=simple                       # 服务的启动类型
WorkingDirectory=path_alist       # 服务工作路径
ExecStart=path_alist/alist server # 服务启动命令
Restart=on-failure                # 服务进程退出后systemd的重启方式

[Install]
WantedBy=multi-user.target        # 对 enable/disable 操作有效
```

其它不必多说，`[service]`区块中有几部分需要详细说明一下（不止有示例给出的这几种）：

- Environment：后面接多个不同的shell变量
- User：运行服务的用户
- Group：运行服务的用户组
- Restart：服务退出后`systemd`的重启方式（对于守护进程，推荐设为`on-failure`）
- Exec\*：各种与执行相关的命令

|    Exec\*     |         描述         |
| :-----------: | :------------------: |
|   ExecStart   | 启动服务时执行的命令 |
|   ExecStop    | 停止服务时执行的命令 |
| ExecStartPre  | 启动服务前执行的命令 |
| ExecStartPost | 启动服务后执行的命令 |
| ExecStopPost  | 停止服务后执行的命令 |
|  ExecReload   | 重启服务时执行的命令 |

最后是`Type`类型：

- simple（默认值）：ExecStart字段启动的进程为主进程，即直接启动服务进程
- forking：ExecStart字段将以fork()方式启动，此时父进程将会退出，子进程将成为主进程（例如用shell脚本启动服务进程）

还有其它`Type`类型，这里不过多叙述。我们只要了解，当一个程序若正常启动是在前台运行，则`Type`设为`simple`；当该程序正常启动时为后台运行，则需将`Type`设为`forking`。（回想一下，当我通过运行一个`shell`脚本时，会`fork`出一个包含当前环境变量的子`shell`运行该脚本）

## 参考文章

- [systemd系列文章](https://systemd-book.junmajinlong.com/service_1.html)
- [编写systemd服务脚本](https://qgrain.github.io/2020/05/12/%E7%BC%96%E5%86%99systemd%E6%9C%8D%E5%8A%A1%E8%84%9A%E6%9C%AC/)
- [ArchWiki-Systemd](https://wiki.archlinuxcn.org/wiki/Systemd)
