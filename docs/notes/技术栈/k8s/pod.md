## pod和container的区别

`pod` 可以管理多个 `container`

所以自然 `pod` 可以管理多个 `container`

启动pod

```bash
# nginx.yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
    - name: nginx-container
      image: nginx
```

`kubectl apply -f nginx.yaml` 启动

`kubectl get pods` 来查看 pod 是否正常启动

`kubectl port-forward nginx-pod 4000:80` 命令将 `nginx` 默认的 `80` 端口映射到本机的 `4000` 端

`kubectl exec -it nginx-pod /bin/bash` 可以用来进入 Pod 内容器的 Shell

## 编写hello go服务

```bash
package main

import (
	"io"
	"net/http"
)

func hello(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "[v1] Hello, Kubernetes!")
}

func main() {
	http.HandleFunc("/", hello)
	http.ListenAndServe(":3000", nil)
}
```

```bash
# Dockerfile
FROM golang:1.16-buster AS builder
RUN mkdir /src
ADD . /src
WORKDIR /src

RUN go env -w GO111MODULE=auto
RUN go build -o main .

FROM gcr.io/distroless/base-debian10

WORKDIR /

COPY --from=builder /src/main /main
EXPOSE 3000
ENTRYPOINT ["/main"]
```

buid image by `docker build . -t guangzhengli/hellok8s:v1`

start by container `docker run -p 3000:3000 --name hellok8s -d guangzhengli/hellok8s:v1`

运行成功后，可以通过浏览器或者 `curl` 来访问 `http://127.0.0.1:3000` , 查看是否成功返回字符串 `[v1] Hello, Kubernetes!`。