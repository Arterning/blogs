# docker file example

## mysql

```yml
version: '3'

services:
  mysql:
    image: mysql:8
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: xxx
    ports:
      - "3306:3306"
    volumes:
      - ./mysql-data:/var/lib/mysql

  redis:
    image: redis
    command: redis-server --requirepass xxx
    ports:
    - "6379:6379"
```

## redis

```yml
version: "3"

services:
  redis:
    image: redis:latest
    restart: always
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - redis_network

volumes:
  redis_data:

networks:
  redis_network:
```

