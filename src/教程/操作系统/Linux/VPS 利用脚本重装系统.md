---
title: VPS 利用脚本重装系统
icon: hugeicons:re
description: 使用 AutoReinstall.sh 或 VPS2Arch.sh 脚本重装 VPS 系统。
date: 2020-05-26 16:24:32
category:
  - 教程
  - 操作系统
  - Linux
tag:
  - 教程
  - Linux
---

:::warning
腾讯云需使用 Ubuntu 18.04 或 Debian 系统。
:::

## 重装为 Debian/Ubuntu/CentOS

```sh
wget --no-check-certificate -O AutoReinstall.sh https://git.io/AutoReinstall.sh && \
sudo bash AutoReinstall.sh
```

:::warning

默认用户及密码：

用户名：`root`

密码：`Pwd@Linux`

:::

## 重装为 Arch

```sh
wget https://felixc.at/vps2arch && \
chmod +x vps2arch && \
sudo ./vps2arch
```

:::warning

默认 Root 用户及密码：

用户名：`root`

密码：此前的密码

:::
