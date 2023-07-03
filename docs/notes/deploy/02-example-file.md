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

## rabbitmq

```yml
version: "3.2"
services:
  rabbitmq:
    image: rabbitmq:3-management-alpine
    container_name: 'rabbitmq'
    ports:
        - 5672:5672
        - 15672:15672
    volumes:
        - ~/.docker-conf/rabbitmq/data/:/var/lib/rabbitmq/
        - ~/.docker-conf/rabbitmq/log/:/var/log/rabbitmq
    networks:
        - rabbitmq_go_net

networks:
  rabbitmq_go_net:
    driver: bridge
```
