---
title: 利用 SSH 连接 Linux
icon: devicon:ssh-wordmark
description: 使用 OpenSSH 连接 Linux。
date: 2020-05-07 10:58:46
category:
  - 教程
  - 操作系统
  - Linux
tag:
  - 教程
  - Linux
  - SSH
---

## 安装 OpenSSH

- Debian/Ubuntu

  ```sh
  sudo apt install openssh-server
  ```

- RHEL/CentOS

  ```sh
  sudo yum install openssh-server
  ```

- Arch

  ```sh
  sudo pacman -S openssh
  ```

## 修改 SSH 端口

:::warning
若为 WSL，此项一定要修改。
:::

```sh
sudo vim /etc/ssh/sshd_config
```

找到以下项并将其配置为以下值：

```ssh-config
Port 2222
```

## 启用 OpenSSH 服务

```sh
sudo systemctl enable sshd && \
sudo systemctl start sshd
```

## 生成密钥对

:::tip
一般在本地进行。
:::

```sh
ssh-keygen -t rsa
```

## 添加 SSH 配置

:::tip
一般在本地进行。
:::

```sh
touch ~/.ssh/config
```

- \*Unix

  ```sh
  vim ~/.ssh/config
  ```

- Windows

  ```sh
  notepad ~/.ssh/config
  ```

  :::tip
  在 Windows 上使用带有 `~` 的路径时请在输入完后使用 <kbd>Tab</kbd> 建进行自动补全。
  :::

  填入以下配置

  ```ssh-config
  HostName <HostName>
    Host <server.address>
    Port 22
    User <username>
    IdentifyFile ~/.ssh/id_rsa
  ```

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
