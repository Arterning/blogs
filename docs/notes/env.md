
## UV指定国内源

```bash
export UV_INDEX_URL=https://mirrors.aliyun.com/pypi/simple/
uv sync


python -m pip install --upgrade pip

pip config set global.index-url <https://pypi.tuna.tsinghua.edu.cn/simple>

```



## 安装NVM

```bash
curl -o- <https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh> | bash

curl -o- <https://gitee.com/RubyMetric/nvm-cn/raw/main/install.sh> | bash
```


## pnpm 设置国内源

```bash
pnpm config set registry <https://registry.npmmirror.com>
```


