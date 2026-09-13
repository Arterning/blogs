
## Windows 配置代理

```bash

set https_proxy=http://127.0.0.1:7897

```

## Linux 配置代理

```bash

export http_proxy="http://127.0.0.1:7897"


# proxy
proxy () {
  export http_proxy="http://127.0.0.1:7897"
  export https_proxy=$http_proxy
  echo "HTTP Proxy on"
}

# noproxy
noproxy () {
  unset http_proxy
  unset https_proxy
  echo "HTTP Proxy off"
}

proxy
```