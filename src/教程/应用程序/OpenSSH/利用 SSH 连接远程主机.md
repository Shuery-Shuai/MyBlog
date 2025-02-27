---
title: 利用 SSH 连接远程主机
icon: devicon:ssh-wordmark
description: 使用 OpenSSH 连接远程主机。
date: 2020-05-07 10:58:46
category:
  - 教程
  - 应用程序
  - OpenSSH
tag:
  - 教程
  - Linux
  - SSH
---

## 安装 OpenSSH

:::code-tabs#os

@tab Debian/Ubuntu#Debian

```sh
sudo apt install openssh-server
```

@tab RHEL/CentOS#RHEL

```sh
sudo yum install openssh-server
```

@tab Arch#Arch

```sh
sudo pacman -S openssh
```

:::

## 修改 SSH 端口

:::warning
若为 WSL，此项一定要修改。
:::

```sh
SSH_Port=2222
```

找到 `/etc/ssh/sshd_config` 中以下项并将其配置为以下值：

```ssh-config
Port 2222
```

:::code-tabs#os

@tab POSIX

```sh
sed -i '/^#Port[[:space:]]*22$/s/#/' /etc/ssh/sshd_config
sed -i '/^Port[[:space:]]*22$/s/22/SSH_Port/' /etc/ssh/sshd_config
```

:::

## 启用 OpenSSH 服务

:::code-tabs#os

@tab Linux

```sh
sudo systemctl enable sshd
sudo systemctl start sshd
```

:::

## 生成密钥对

:::tip
一般在本地进行。
:::

:::code-tabs#os

@tab POSIX/Windows

```sh
ssh-keygen -t rsa
```

:::

## 添加 SSH 配置

:::tip
一般在本地进行。
:::

:::code-tabs#os

@tab POSIX

```sh
touch ~/.ssh/config
```

@tab Windows

```ps1
New-Item ~/.ssh/config
```

:::

:::code-tabs#os

@tab POSIX

```sh
vim ~/.ssh/config
```

@tab Windows

```ps1
notepad ~/.ssh/config
```

:::

填入以下配置：

```ssh-config
Host ${HostName}
  HostName ${ServerAddress}
  Port 22
  User ${UserName}
  IdentityFile ~/.ssh/id_rsa
```

:::code-tabs#os

@tab POSIX/Windows

```sh
echo 'Host ${HostName}
  HostName ${ServerAddress}
  Port 22
  User ${UserName}
  IdentityFile ~/.ssh/id_rsa' >> ~/.ssh/config
```

:::

## 上传私钥

```sh
scp ~/.ssh/id_rsa.pub <HostName>:~
```

此时应该会要求输入服务端密码。

## 添加公钥

```sh
cat ~/id_rsa.pub >> ~/.ssh/authorized_keys
```

:::tip

公钥添加完毕后可删除。

```sh
rm -rf ~/id_rsa.pub
```

:::

:::warning

若提示无此文件，请手动创建并赋予正确权限。

```sh
mkdir ~/.ssh && \
chmod 700 ~/.ssh && \
touch ~/.ssh/authorized_keys && \
chmod 600 ~/.ssh/authorized_keys
```

:::

## 测试是否能够正确连接

:::tip
一般在本地进行。
:::

```sh
ssh <HostName>
```

若连接时无需输入密码则成功。

## 配置 SSH

:::tip
一般在服务端执行。
:::

```sh
sudo vim /etc/ssh/sshd_config
```

找到并更改如下项的配置:

```ssh-config
PermitRootLogin no
PasswordAuthentication no
```

## 重启 SSH

```sh
sudo systemctl restart sshd
```
