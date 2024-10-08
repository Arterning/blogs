ssh-keygen -t rsa  -C "ning.huang.ridson@gmail.com"

sudo apt install python3-pip


```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```


```
curl -o- https://gitee.com/RubyMetric/nvm-cn/raw/main/install.sh | bash
```


```
pnpm config set registry https://registry.npmmirror.com
```

```
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
pdm config pypi.url https://pypi.tuna.tsinghua.edu.cn/simple
```

pip install

升级 pip 到最新的版本 (>=10.0.0) 后进行配置：

```
python -m pip install --upgrade pip
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```



```
  WARNING: The scripts pip, pip3 and pip3.10 are installed in '/home/win10/.local/bin' which is not on PATH.
  Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location
```


```python
export PATH=$PATH:/home/$USER/.local/bin
```


```
pip install pdm
pip install pipx
```

```
pdm install

pdm run fastapi dev main.py --host 0.0.0.0

```



```bash
sudo apt install redis-server -y

sudo apt install mysql-server
sudo systemctl start mysql.service

```


```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
```

```
ALTER USER 'root'@'localhost' IDENTIFIED WITH auth_socket;
```


```
# 生成迁移文件
pdm run alembic revision --autogenerate

# 执行迁移
pdm run alembic upgrade head

pdm run fastapi dev main.py --host 0.0.0.0
```


## gunicorn 启动

```
gunicorn backend.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000 --reload
```


后台运行

```
gunicorn backend.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000 --reload &
```