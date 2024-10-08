由于使用 Java 提供的 Synchronized 或者 ReentrantLock 只能锁住当前机器的线程，在一瞬间的两个请求进来，分发到不同的服务器上，存在某些业务只能执行一次，或者需要按顺序执行，保证数据正确性，所以引出了分布式锁的概念

线程锁，其实就是线程之间的通信

分布式锁本质上是进程锁，本质的本质是进程之间的通信

无论什么样的设计方案，一般的做法就是使用一个独立的第三方进程设立一个flag 谁先设置好了这个flag就表示锁创建成功

实现方式

DB: 一般使用都是乐观锁，悲观锁不考虑 Memcached: 使用 add 命令。此命令是原子性操作，只有在 key 不存在的情况下，才能 add 成功，也就意味着线程得到了锁 Redis: 使用 Redis 的 setnx 命令。此命令同样是原子性操作，只有在 key 不存在的情况下，才能 set 成功 Zookeeper: 使用顺序临时节点，来实现分布式锁和等待队列。Zookeeper 设计的初衷，就是为了实现分布式锁服务的 Chubby: Google 公司实现的粗粒度分布式锁服务，底层利用了 Paxos 一致性算法

## **Redis**

原生实现和 Redisson 框架

### **原生实现**

需要使用 setnx 命令，key 是锁的唯一标识，按业务来决定命名，还得设置过期时间防止死锁，但是 setnx 指令本身是不支持传入超时时间的，而 setnx 和 expire 两个操作合并是非原子性的，怎么解决呢

- 可以使用 lua 脚本，两个命令组合在一起就是原子的
- Redis 从 2.6.12 版本开始 set 指令增加了可选参数：set(key, value, "NX", "PX", 1000 * 60)

业务执行完成的时候，del 导致误删其他线程的锁，value 需要设置为当前线程的唯一值，del 的时候判断是不是当前线程的锁，是的话才进行删除，这样又是两个操作组合不是原子性了，怎么解决呢，这里只能依赖 lua 脚本解决

```java
-- 获取锁
-- NX 是指如果 key 不存在就成功，key 存在返回 false，PX 可以指定过期时间
SET anyLock unique_value NX PX 30000

-- 释放锁：通过执行一段 lua 脚本
-- 释放锁涉及到两条指令，这两条指令不是原子性的
-- 需要用到 redis 的 lua 脚本支持特性，redis 执行 lua 脚本是原子性的
if redis.call("get", KEYS[1]) == ARGV[1] then
    return redis.call("del", KEYS[1])
else
    return 0
end
```