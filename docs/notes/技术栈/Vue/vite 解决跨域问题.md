正常来说， javascript在浏览器中是无法发送跨域请求的，所以我们需要在vuejs的＂开发服务器＂上做 个转发配置．

修改： `config/index.js`文件，增加下列内容：

```
module.exports = {
  dev: {
    proxyTable: {
      '/api': {        // 1. 对于所有以  "/api"　开头的url 做处理．
        target: '<http://siwei.me>',   // 3. 转发到 siwei.me 上．
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''  // 2. 把url中的　"/api" 去掉．
        }
      }
    },
}

```

上面的代码做了三件事：

1. 对于所有以 "/api"　开头的url 做处理．
2. 把url中的　"/api" 去掉．
3. 把新的url 请求打到　[siwei.me](http://siwei.me) 上．

例如：

- 原请求：　[http://localhost:8080/api/interface/blogs/all](http://localhost:8080/api/interface/blogs/all)
- 新请求：　[http://siwei.me/interface/blogs/all](http://siwei.me/interface/blogs/all)

注意：　以上的代理服务器内容，只能在＂开发模式＂下才能使用．在生产模式下，只能靠服务器的nginx的 特性来解决js跨域问题．

我们发现，在export代码段中，有两个部分：

```
<script>
export default {
  data () { },
  mounted() { }
}
</script>

```

实际上，上面代码中，

- `data`方法，是用于＂声明页面会出现的变量＂，并且赋予初识值.(非常重要，切记这一点)
- `mounted` 表示页面被vue渲染好之后的钩子方法，会立刻执行．

```
 mounted() {
    this.$http.get('api/interface/blogs/all').then((response) => {
       this.blogs = response.body.blogs
    }, (response) => {
       console.error(response)
    });
  }

```

上面代码中：

- `this.$http` 中的
- `this` 表示当前的vue组件（也即 BookList.vue)
- `$http` 所有以 `$`开头的变量，都是vue的特殊变量，往往是vue框架自带． 这里的$http就是可以发起http 请求的对象.
- `$http.get` 是一个方法，可以发起get 请求．　只有一个参数就是目标url,
- `then()` 方法，来自于promise, 可以把异步的请求写成普通的非异步形式． 第1个参数是成功后的callback, 第2个参数是失败后的callback．
- `this.blogs = response.body.blogs` 中，是把远程返回的结果（json ），赋予到本地．　由于javascript 的语言特性，能直接支持json ，所以才可以这样写．