---
title: Linux 新建用户
icon: pen-ruler
description: Linux 系统新建用户。
date: 2020-05-06 11:54:47
category:
  - 教程
  - 操作系统
  - Linux
tag:
  - 教程
  - Linux
---

## 建立用户

- 利用 `useradd`

```sh
useradd -m /home/username -s /bin/bash username
```

- 利用 `adduser`

```sh
adduser username
```

## 设置为超级用户组

- Debian

```sh
usermod -aG groupname username
```

- Arch

```sh
usermod -aG wheel username
```

```sh
vim /etc/sudoers
```

使用 <kbd>/</kbd> 找到 `wheel` 行，取消此行注释。
