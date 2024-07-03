---
title: 利用 SSH 连接 Termux
description: 使用 OpenSSH 连接 Termux 指南。
icon: pen-ruler
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

## 下载 Termux

- [Github](https://github.com/termux/termux-app/releases/latest "Release · termux/termux-app")
- [F-Droid](https://f-droid.org/en/packages/com.termux/ "Termux | F-Droid")

:::tip
可以前往 [Termux](https://termux.dev/ "Termux | The main termux site and help pages.") 官网了解更多信息及帮助。
:::

## 更新软件包

```sh
pkg update && pkg upgrade -y
```

:::warning

若安装途中出现以下提示：

```console
Configuration file '/data/data/con.termux/files/path_to_file'
==> File on system created by you or by a script.
==> File also in package provided by package maintainer.
  What would you like to do about it ? Your options are:
   Y or I  : install the package maintainer's version
   N or O  : keep your current-installed version
     D     : show the difference between the versions
     Z     : start a shell to examine the situation
The default action is to keep your current version.
*** filename (Y/I/N/O/D/Z) [Default=N] ?
```

输入 <kbd>Y</kbd> 并 <kbd>↲ Enter</kbd> 即可。

:::

### 连接 Termux-可选

:::warning
本步骤将会使 Termux 与其他设备相连，方便在终端输入并执行命令。若没有这种需求，可跳过此步。
:::

#### 获取 IP

#### 查看网络连接

```sh
ifconfig
```

#### 复制 IP

1. 找到 `wlan0`。
2. 复制 `192.168.*.*`（类似如 `192.168.1.1`）。

:::warning
不是 `192.168.*.255`，255 结尾的为广播地址。
:::

### 获取用户名

```sh
whoami
```

复制用户名 `u0_a***` （类似 `u0_a123`）

### 安装并启用 OpenSSH

1. 安装 `openssh`

   ```sh
   pkg install openssh -y
   ```

2. 启动 `openssh`

   ```sh
   sshd
   ```

### 生成密钥对、使用公钥并获取私钥

#### 生成密钥对

```sh
ssh-keygen -t rsa
```

:::warning

在生成密钥对过程中，会询问用户生成密钥路径及密钥密码，此时可以直接 <kbd>↲ Enter</kbd> 使用默认设置。如下所示：

```console
Enter file in which to save the key (/root/.ssh/id_rsa): <Enter>
Enter passphrase (empty for no passphrase): <Enter>
Enter same passphrase again: <Enter>
```

:::

#### 使用公钥

```sh
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
```

#### 获取私钥

1. 查看私钥

   ```sh
   cat ~/.ssh/id_rsa
   ```

2. 复制私钥

   将查看私钥时获得的私钥内容复制并传输给其他设备。私钥内容大致如下：

   ```console
   -----BEGIN OPENSSH PRIVATE KEY-----
   b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABlwAAAAdzc2gtcn
   ...
   3+HQPm8DBI/CXND5jNxlcwAEnCR4AxKiEjq2TBVkmqjIdWYSWmJjZti9dJDwCW+4KLnoq1
   2biWRmaEIVqT1TAAAACHJvb3RAV2ViAQI=
   -----END OPENSSH PRIVATE KEY-----
   ```

### 使用私钥（在其他设备上）

#### 粘贴密钥

- Linux 端

  ```sh
  mkdir ~/.ssh && chmod 700 ~/.ssh
  vi ~/.ssh/id_rsa
  ```

  此时将上一步获取到的私钥粘贴至此处而后键入 `:` 进入命令模式再使用 `wq` 命令保存并退出文件。再运行以下命令更改 `id_rsa` 文件权限。

  ```sh
  chmod 600 ~/.ssh/id_rsa
  ```

- Windows 端

  :::warning
  以下演示皆在 PowerShell 中运行，若使用其它软件请以其它软件教程为准。
  :::

  :::warning
  请在命令行输入 `ssh` 确保你的 Windows 安装了 OpenSSH。若没有安装，请前往“设置 > 应用 > 可选功能”添加可选功能 OpenSSH 客户端，或使用管理员权限打开 PowerShell 并输入 `DISM.exe /Online /Add-Capability /CapabilityName:OpenSSH.Client` 安装。
  :::

  运行以下命令生成 `id_rsa` 文件（具体可以看生成密钥对）：

  ```sh
  ssh-keygen -t rsa
  ```

  使用文本编辑器打开 `id_rsa` （默认路径为 `%HomePath%/.ssh/id_rsa`）并将上一步获取的私钥粘贴至此处。

  :::tip
  这一步生成的 `id_rsa.pub` 文件可以删除。
  :::

  :::warning
  若手动在 `%HomePath%` 下创建 `.ssh/id_rsa` 文件，请务必注意相关的文件权限问题。若出现权限问题，请右击 `.ssh` 文件夹，选择“属性”，进入“安全”选项卡，点击“高级”，确保“所有者”为“当前用户”（即你登录时使用的用户），以及“权限条目”为“SYSTEM”、“Administrators”及“当前用户”且其“访问”权限为“完全控制”（双击条目可进入修改），并“启用继承”，`id_rsa` 文件权限也大致与 `.ssh` 文件夹相同，但它的“权限条目”中的“当前用户”的“访问”权限为“修改”、“读取和执行”、“读取”和“写入”四项，且“禁用继承”。
  :::

#### 保存连接

- Linux 端

  ```sh
  vi ~/.ssh/config
  ```

  在文件后添加如下内容：

  ```ssh-config
  Host termux
    HostName 192.168.*.*
    Port 8022
    User u0_a***
    IdentityFile ~/.ssh/id_rsa
  ```

  :::warning
  `HostName` 为之前获取的 IP（看[这里](#获取-ip)），`User` 为之前获取的用户名（在[这里](#获取用户名)）。
  :::

#### 使用连接

```sh
ssh termux
```

:::warning
当出现 `Are you sure you want to continue connecting (yes/no/[fingerprint])?` 时输入 `yes` 并 <kbd>↲ Enter</kbd> 即可。
:::

如果连上了的话，那么恭喜你成功了！此后的操作皆可在其他设备上执行。

## 进入 Linux

### 安装 Proot Distro

```sh
pkg install proot-distro -y
```

### 安装 Ubuntu

:::warning
此处以 Ubuntu 为例，按理来说其它系统大同小异。
:::

```sh
proot-distro install ubuntu
```

### 登录 Ubuntu

```sh
proot-distro login ubuntu
```

:::warning
以后进入 Linux 都需执行此命令。
:::

## 安装系统组件

```sh
apt update && apt upgrade -y
apt install sudo vim -y
```

## 切换用户-可选

:::warning
添加用户是为了安全，当然你也可以跳过。
:::

### 设置 Root 用户密码

```sh
passwd
```

而后输入密码 <kbd>↲ Enter</kbd> 再重复输入密码 <kbd>↲ Enter</kbd> 即可。

### 新建用户

```sh
adduser username
```

之后出现 `New password` 输入密码即可（与[设置 Root 用户密码](#设置-root-用户密码)类似）。

再之后就会让你输入用户信息，如下参考输入：

```console
Enter the new value, or press ENTER for the default
        Full Name []: First Last
        Room Number []: X
        Work Phone []: X
        Home Phone []: X
        Other []: X
Is the information correct? [Y/n] Y
```

### 赋予超级用户权限

```sh
usermod shuery -aG sudo
vim /etc/sudoers
```

此时输入 `/` 进入字符串搜索模式，输入 `User privilege specification` 并 <kbd>↲ Enter</kbd> 以跳转到用户权限设置处，找到 `root ALL=(ALL:ALL) ALL`，并在下一行输入 `username ALL=(ALL:ALL) ALL`。

### 更换用户

```sh
su username
```

### 安装必要软件

```sh
sudo apt install curl wget git -y
```
