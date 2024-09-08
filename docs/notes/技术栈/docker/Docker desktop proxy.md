## Upload to dockerhub  
首先，您需要登录到 Docker Hub，使用 docker login 命令。输入您的 Docker Hub 用户名和密码，以进行身份验证。  
  
`docker login`  
  
然后，您需要在本地给镜像打上标签，以指定其要上传到 Docker Hub 上的仓库和标签。例如，假设您要将本地的 myimage 镜像上传到 Docker Hub 上的 myusername/myimage 仓库，并打上 v1.0 标签，可以使用以下命令：  
  
  
`docker tag myimage myusername/myimage:v1.0`  
  
这会将本地的 myimage 镜像打上 myusername/myimage:v1.0 的标签。  
  
然后，您可以使用 docker push 命令将镜像上传到 Docker Hub 上的仓库。  
  
`docker push myusername/myimage:v1.0`  
  
这会将 myusername/myimage:v1.0 标签的镜像上传到 Docker Hub 上的 myusername/myimage 仓库中。  
  
注意：在上传镜像之前，请确保您已经在 Docker Hub 上创建了相应的仓库，并拥有该仓库的写入权限。如果没有，您可以登录到 Docker Hub 上的 Web 界面，手动创建一个新的仓库，并添加相应的权限。


## Docker commands


```
docker compose up -d
```


```bash
uname -r

yum install docker

sudo vim /etc/docker/daemon.json
{
 "registry-mirrors": ["https://registry.docker-cn.com"]
}
sudo service docker restart


systemctl start docker
systemctl enable docker
systemctl stop docker

#检索
docker search tomcat
docker search redis

#tag可选 tag就是镜像的版本
docker pull tomcat:tag

#查看本地镜像
docker images

#启动
# -d：后台运行
# -p: 将主机的端口映射到容器的一个端口，主机端口:容器内部的端口
# --name:给容器起的名字
# -v 宿主机目录:容器目录
docker run -p 8888:8080 --name mytomcat -d tomcat:latest
docker run -p 8888:8080 --name mytomcat -d tomcat:latest -v /root/docker/tomcat/webapps:/usr/local/tomcat/webapps


#查看运行中的容器
docker ps
docker ps -a

#停止指定的容器
docker stop  容器的id

#删除
docker rm 容器id
```