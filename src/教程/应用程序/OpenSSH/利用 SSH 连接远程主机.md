---
title: 利用 SSH 连接远程主机即服务器
shortTitle: 利用 SSH 连接远程主机
icon: devicon:ssh-wordmark
description: 使用 OpenSSH 连接服务器及重要配置修改。
date: 2020-05-07 10:58:46
category:
  - 教程
  - 应用程序
  - OpenSSH
tag:
  - 教程
  - Linux
  - SSH
  - 服务器
---

## 首先设置一下你想要的配置

::::warning
若为 **WSL**，`SSH_Port` 一定要修改且**不能为 `22` 端口**！
:::info
22 端口为 OpenSSH 默认端口，Windows 上的 22 端口已被其上 OpenSSH 占用，WSL 就需选用其他端口如 `2222`。
:::
::::

:::code-tabs#shell

@tab Bash/PowerShell

```sh
HostName=remote-hostname
ServerAddress=server.address
SSH_Port=22
UserName=username
```

:::

## 本地主机及远程主机安装 OpenSSH

:::tip
大多数 VPS 的系统都已经安装好 OpenSSH。
:::

:::warning
WSL 系统默认并不会安装 OpenSSH，因此需要手动安装。
:::

:::code-tabs#shell

@tab Debian/Ubuntu#Bash

```sh
sudo apt install openssh-server
```

@tab RHEL/CentOS#Bash

```sh
sudo yum install openssh-server
```

@tab Arch#Bash

```sh
sudo pacman -S openssh
```

@tab Windows PowerShell#PowerShell

```ps1
# 安装 OpenSSH 客户端
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0

# 安装 OpenSSH 服务器
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```

:::

## 修改远程主机 SSH 端口

:::tip
若远程主机是服务器可以等之后 [修改远程主机 SSH 配置](#配置远程主机-ssh)时再修改。
!!我为什么要把这步放在这里(⊙o⊙)？那当然是因为 WSL 一定要现在就修改 SSH 端口啦(￣ y▽,￣)╭。!!
:::

找到 `/etc/ssh/sshd_config` 中以下项并将其配置为以下值：

```ssh-config
Port ${SSH_Port}
```

:::code-tabs#shell

@tab Bash

```sh
sed -i '/^#Port/s/#//' /etc/ssh/sshd_config
sed -i "/^Port[[:space:]]*22\$/s/22/${SSH_Port}/" /etc/ssh/sshd_config
```

@tab PowerShell

```ps1
Start-Process Notepad C:\Programdata\ssh\sshd_config
```

:::

:::note
!!你要问为什么 `sed` 命令一个是单引号 `'`，一个是双引号 `"`(・∀・(・∀・(・∀・\*)？那当然是因为：!!
在 Bash 命令行中双引号 `"` 中的 Shell 变量 `${}` 会解析出来，而单引号 `'` 却不会。下面的 `echo` 命令同理。
!!有用的知识又增加了 ╰(\*°▽°\*)╯！!!
:::

## 启用远程主机 OpenSSH 服务

:::tip
大多数 VPS 主机默认启用。
:::

:::warning
WSL 要手动启用。
:::

:::code-tabs#shell

@tab Bash

```sh
sudo systemctl enable sshd
sudo systemctl start sshd
```

@tab PowerShell

```ps1
Set-Service -Name sshd -StartupType 'Automatic'
Start-Service sshd
```

:::

## 本地主机生成密钥对

:::code-tabs#shell

@tab Bash/PowerShell

```sh
ssh-keygen -t rsa
```

:::

## 本地主机添加 SSH 配置

:::code-tabs#shell

@tab Bash

```sh
touch ~/.ssh/config
```

@tab PowerShell

```ps1
New-Item ~/.ssh/config
```

:::

填入以下配置：

```ssh-config
Host ${HostName}
  HostName ${ServerAddress}
  Port ${SSH_Port}
  User ${UserName}
  IdentityFile ~/.ssh/id_rsa
```

:::code-tabs#shell

@tab Bash/PowerShell

```sh
echo "Host ${HostName}
  HostName ${ServerAddress}
  Port ${SSH_Port}
  User ${UserName}
  IdentityFile ~/.ssh/id_rsa" >> ~/.ssh/config
```

:::

## 本地主机上传公钥至远程主机

:::code-tabs#shell

@tab Bash/PowerShell

```sh
scp ~/.ssh/id_rsa.pub ${HostName}:~
```

:::

此时应该会要求输入远程主机密码。

## 本地主机连接远程主机

:::code-tabs#shell

@tab Bash/PowerShell

```sh
ssh ${HostName}
```

:::

此时同样要输入远程主机密码。

## 远程主机添加公钥

:::code-tabs#shell

@tab Bash/PowerShell

```sh
cat ~/id_rsa.pub >> ~/.ssh/authorized_keys
```

:::

::::tip

公钥添加完毕后可从**远程主机**删除。

:::code-tabs#shell

@tab Bash

```sh
rm -rf ~/id_rsa.pub
```

@tab PowerShell

```ps1
Remove-Item ~/id_rsa.pub
```

:::

::::

::::warning

若提示无此文件，请手动创建并赋予正确权限。

:::code-tabs#shell

@tab Bash

```sh
mkdir ~/.ssh && \
chmod 700 ~/.ssh && \
touch ~/.ssh/authorized_keys && \
chmod 600 ~/.ssh/authorized_keys
```

::::

## 测试是否能够正确连接

:::tip
一般在本地进行。
:::

:::code-tabs#shell

@tab Bash/PowerShell

```sh
ssh ${HostName}
```

:::

若连接时无需输入密码则成功。

## 配置远程主机 SSH

打开 `/etc/ssh/sshd_config` 找到并更改如下项的配置：

```ssh-config
PermitRootLogin no
PasswordAuthentication no
```

:::code-tabs#shell

@tab Bash

```sh
sed -i '/^#PermitRootLogin/s/#//' /etc/ssh/sshd_config
sed -i '/^PermitRootLogin[[:space:]]*yes$/s/yes/no/' /etc/ssh/sshd_config
sed -i '/^#PasswordAuthentication/s/#//' /etc/ssh/sshd_config
sed -i '/^PasswordAuthentication[[:space:]]*yes$/s/yes/no/' /etc/ssh/sshd_config
```

@tab PowerShell

```ps1
Start-Process Notepad C:\Programdata\ssh\sshd_config
```

:::

:::tip
若需要修改 SSH 端口却没有修改不要忘记现在[修改远程主机 SSH 端口](#修改远程主机-ssh-端口)！
:::

## 重启远程主机 SSH

:::code-tabs#shell

@tab Bash

```sh
sudo systemctl restart sshd
```

@tab PowerShell

```ps1
Restart-Service sshd
```

:::
