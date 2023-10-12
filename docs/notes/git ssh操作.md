# git ssh 操作

## 密钥配置

首先生成密钥

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

接着在你的服务器或者git server 添加你的公钥，私钥在你本地保存

配置文件`{user_home}/.ssh/config`

```bash
Host github.com
       HostName github.com
       User git
       IdentityFile {private_key}
```

