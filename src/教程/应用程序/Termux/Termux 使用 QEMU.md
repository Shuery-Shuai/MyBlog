---
title: Termux 使用 QEMU
description: 在 Termux 上 的 QEMU 使用教程。
icon: simple-icons:qemu
isOriginal: false
date: 2022-09-21 10:02:33
category:
  - 教程
  - 应用程序
  - Termux
tag:
  - 教程
  - Termux
  - Android
  - Linux
---

## 安装 QEMU

```sh
pkg install qemu-utils qemu-common qemu-system-x86_64-headless
```

## 下载 Linux 镜像

```sh
mkdir alpine && cd $_
wget http://dl-cdn.alpinelinux.org/alpine/v3.16/releases/x86_64/alpine-virt-3.16.2-x86_64.iso
```

:::tip
Ubuntu 镜像：<https://releases.ubuntu.com/22.04.1/ubuntu-22.04.1-live-server-amd64.iso>
:::

## 创建磁盘

```sh
qemu-img create -f qcow2 alpine.img 16G
```

## 启动虚拟机

```sh
qemu-system-x86_64 -machine q35 -m 4G -smp cpus=8 -cpu qemu64 \
   -drive if=pflash,format=raw,read-only=on,file=$PREFIX/share/qemu/edk2-x86_64-code.fd \
   -netdev user,id=n1,hostfwd=tcp::2222-:22 -device virtio-net,netdev=n1 \
   -cdrom alpine-virt-3.16.2-x86_64.iso \
   -nographic alpine.img
```

## 登录虚拟机

使用 `root` 用户登录，此时无密码。

## 设置网络

```sh
setup-interfaces
```

:::tip
直接回车可使用默认设置。
:::

```console
Available interfaces are: eth0.
Enter '?' for help on bridges, bonding and vlans.
Which one do you want to initialize? (or '?' or 'done') [eth0]
Ip address for eth0? (or 'dhcp', 'none', '?') [dhcp]
Do you want to do any manual network configuration? [no]
ifup eth0
```

## 创建 AnswerFile

:::info
此举可加速虚拟机加速配置。
:::

```sh
wget https://gist.githubusercontent.com/oofnikj/e79aef095cd08756f7f26ed244355d62/raw/answerfile
```

## 修补 Setup-Disk

:::info
以下命令用以开启启动时控制台序列输出。
:::

```sh
sed -i -E 's/(local kernel_opts)=.*/\1="console=ttyS0"/' /sbin/setup-disk
```

## 运行安装命令

:::info
将会把虚拟机装入虚拟磁盘。
:::

```sh
setup-alpine -f answerfile
```

:::tip
此时可更改 Root 用户密码。
:::

```console
Changing password for root
New password:
Retype password:
passwd: password for root changed by root
Setup a user? (enter a lower-case loginname, or 'no') [no] <username>
Full name for user <username> [<username>] <firstname lastname>
Changing password for <username>
New password:
Retype password:
passwd: password for <username> changed by root
Enter ssh key or URL for <username> (or 'none') [none]
WARNING: The following disk(s) will be erased:
  sda   (4.3 GB ATA      QEMU HARDDISK   )
WARNING: Erase the above disk(s) and continue? (y/n) [n] y
```

## 重启虚拟机

一旦虚拟机安装完成，关闭虚拟机而后在不挂载虚拟 CD-ROM 的情况下重新启动虚拟机。

```sh
poweroff
```

```sh
qemu-system-x86_64 -machine q35 -m 4G -smp cpus=8 -cpu qemu64 \
   -drive if=pflash,format=raw,read-only=on,file=$PREFIX/share/qemu/edk2-x86_64-code.fd \
   -netdev user,id=n1,hostfwd=tcp::2222-:22 -device virtio-net,netdev=n1 \
   -nographic alpine.img
```

## 安装 Docker

```sh
apk update && apk add docker
service docker start
rc-update add docker
```

:::tip

好用的快捷键：

- <kbd>Ctrl</kbd> + <kbd>A</kbd> <kbd>X</kbd>：退出虚拟机
- <kbd>Ctrl</kbd> + <kbd>A</kbd> <kbd>H</kbd>：切换 QEMU 控制台

:::
