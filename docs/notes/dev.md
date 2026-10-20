# 环境初始化


## Install Env

```bash

set https_proxy=http://127.0.0.1:7897

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.8/install.sh | bash

nvm install --lts

curl -LsSf https://astral.sh/uv/install.sh | sh

```


## pip

```bash
python -m pip install --upgrade pip

pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```


## uv

```bash

export UV_INDEX_URL=https://mirrors.aliyun.com/pypi/simple/

set UV_INDEX_URL=https://mirrors.aliyun.com/pypi/simple/


uv init --python 3.11 my-project

uv sync



```



## nvm

```bash
curl -o- <https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh> | bash

curl -o- <https://gitee.com/RubyMetric/nvm-cn/raw/main/install.sh> | bash
```


## pnpm 

```bash

#设置国内源
pnpm config set registry https://registry.npmmirror.com

```


## ssh

```bash

# 把本地的 7897 端口转发到远程的 7897 端口
ssh -N -R 0.0.0.0:7897:127.0.0.1:7897 kemove@172.16.1.16

# 把远程的 80 端口转发到本地的 80 端口
ssh -L 0.0.0.0:80:172.16.1.17:80 aifuzz@172.16.1.17
```