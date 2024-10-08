因为只有一台服务器，所以增加一个应用的时候，比如dbadmin占用的端口是1.12.67.61:8080

首先定义location

```bash
        location /dbadmin {
            proxy_pass http://db_admin_server;
        }
```

然后定义upstream即可

```bash
		upstream db_admin_server{
			server 1.12.67.61:8080;
		}
```

```jsx
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    autoindex on;# 显示目录
    autoindex_exact_size on;# 显示文件大小
    autoindex_localtime on;# 显示文件时间

		upstream db_admin_server{
			server 1.12.67.61:8080;
		}

    server {
        listen 80;
        server_name 1.12.67.61;
        return 301 https://$server_name$request_uri;
        root         /usr/share/nginx/html/666;
    }

    server {
        listen 443 ssl;
        server_name 1.12.67.61;

        ssl_certificate /etc/nginx/ssl/mycert.pem;
        ssl_certificate_key /etc/nginx/ssl/mykey.pem;

        location / {
            root /usr/share/nginx/html;
            index index.html;
        }

        location /dbadmin {
            proxy_pass http://db_admin_server;
        }
    }
}
```