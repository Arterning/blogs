使用原始node

```bash
const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('Hello World\\n');
});

server.listen(port, () => {
  console.log(`Server running at <http://$>{hostname}:${port}/`);
});

```

## express 的参数

- `req.body`：客户端请求体的数据，可能是表单或 JSON 数据
- `req.params`：请求 URI 中的路径参数
- `req.query`：请求 URI 中的查询参数
- `req.cookies`：客户端的 cookies

```bash
// 发送一串 HTML 代码
res.send('HTML String');

// 发送一个文件
res.sendFile('file.zip');

// 渲染一个模板引擎并发送
res.render('index');

// 设置状态码为 404，并返回 Page Not Found 字符串
res.status(404).send('Page Not Found');
```

### nodemon 加速开发

[Nodemon](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fnodemon) 是一款颇受欢迎的开发服务器，能够检测工作区代码的变化，并自动重启。通过以下命令安装 nodemon：

```

npm install nodemon --save-dev
```

## 开始

```jsx
//引入构造函数
const express = require('express');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server running at <http://$>{hostname}:${port}/`);
});

```

中间件

```jsx
const app = express();

function loggingMiddleware(req, res, next) {
  const time = new Date();
  console.log(`[${time.toLocaleString()}] ${req.method} ${req.url}`);
  next();
}

app.use(loggingMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World');
});

```

```jsx
// 指定模板存放目录
app.set('views', '/path/to/templates');

// 指定模板引擎为 Handlebars
app.set('view engine', 'hbs');

//在使用模板时，只需在路由函数中调用 res.render 方法即可：
// 渲染名称为 hello.hbs 的模板
res.render('hello');
```

通常网站需要提供静态文件服务，例如图片、CSS 文件、JS 文件等等，而 Express 已经自带了静态文件服务中间件 `express.static`，使用起来非常方便。

例如，我们添加静态文件中间件如下，并指定静态资源根目录为 `public`：

```jsx
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});
```

## 返回json数据

```jsx
app.get('/api', (req, res) => {
  res.json({ name: '图雀社区', website: '<https://tuture.co>' });
});
```

## **使用子路由拆分逻辑**

```jsx
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ name: '图雀社区', website: '<https://tuture.co>' });
});

router.post('/new', (req, res) => {
  res.status(201).json({ msg: '新的篇章，即将开始' });
});

module.exports = router;

```

```jsx

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

app.use('/', indexRouter);
app.use('/api', apiRouter);
```