"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7183],{8015:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>g});var r=t(757);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var p=r.createContext({}),i=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},u=function(e){var n=i(e.components);return r.createElement(p.Provider,{value:n},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,s=e.originalType,p=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=i(t),m=o,g=c["".concat(p,".").concat(m)]||c[m]||d[m]||s;return t?r.createElement(g,a(a({ref:n},u),{},{components:t})):r.createElement(g,a({ref:n},u))}));function g(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var s=t.length,a=new Array(s);a[0]=m;var l={};for(var p in n)hasOwnProperty.call(n,p)&&(l[p]=n[p]);l.originalType=e,l[c]="string"==typeof e?e:o,a[1]=l;for(var i=2;i<s;i++)a[i]=t[i];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},717:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>a,default:()=>d,frontMatter:()=>s,metadata:()=>l,toc:()=>i});var r=t(1227),o=(t(757),t(8015));const s={},a=void 0,l={unversionedId:"tutorial/node/express usage",id:"tutorial/node/express usage",title:"express usage",description:"\u4f7f\u7528\u539f\u59cbnode",source:"@site/docs/tutorial/node/express usage.md",sourceDirName:"tutorial/node",slug:"/tutorial/node/express usage",permalink:"/blogs/docs/tutorial/node/express usage",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/tutorial/node/express usage.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorial",previous:{title:"Node js \u505a\u670d\u52a1\u7aef\u4f18\u7f3a\u70b9",permalink:"/blogs/docs/tutorial/node/Node js \u505a\u670d\u52a1\u7aef\u4f18\u7f3a\u70b9"},next:{title:"module\u548cmodule.exports",permalink:"/blogs/docs/tutorial/node/module\u548cmodule.exports"}},p={},i=[{value:"express \u7684\u53c2\u6570",id:"express-\u7684\u53c2\u6570",level:2},{value:"nodemon \u52a0\u901f\u5f00\u53d1",id:"nodemon-\u52a0\u901f\u5f00\u53d1",level:3},{value:"\u5f00\u59cb",id:"\u5f00\u59cb",level:2},{value:"\u8fd4\u56dejson\u6570\u636e",id:"\u8fd4\u56dejson\u6570\u636e",level:2},{value:"<strong>\u4f7f\u7528\u5b50\u8def\u7531\u62c6\u5206\u903b\u8f91</strong>",id:"\u4f7f\u7528\u5b50\u8def\u7531\u62c6\u5206\u903b\u8f91",level:2}],u={toc:i},c="wrapper";function d(e){let{components:n,...t}=e;return(0,o.kt)(c,(0,r.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"\u4f7f\u7528\u539f\u59cbnode"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"const http = require('http');\n\nconst hostname = 'localhost';\nconst port = 3000;\n\nconst server = http.createServer((req, res) => {\n  res.statusCode = 200;\n  res.setHeader('Content-Type', 'text/html');\n  res.end('Hello World\\\\n');\n});\n\nserver.listen(port, () => {\n  console.log(`Server running at <http://$>{hostname}:${port}/`);\n});\n\n")),(0,o.kt)("h2",{id:"express-\u7684\u53c2\u6570"},"express \u7684\u53c2\u6570"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"req.body"),"\uff1a\u5ba2\u6237\u7aef\u8bf7\u6c42\u4f53\u7684\u6570\u636e\uff0c\u53ef\u80fd\u662f\u8868\u5355\u6216 JSON \u6570\u636e"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"req.params"),"\uff1a\u8bf7\u6c42 URI \u4e2d\u7684\u8def\u5f84\u53c2\u6570"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"req.query"),"\uff1a\u8bf7\u6c42 URI \u4e2d\u7684\u67e5\u8be2\u53c2\u6570"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"req.cookies"),"\uff1a\u5ba2\u6237\u7aef\u7684 cookies")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"// \u53d1\u9001\u4e00\u4e32 HTML \u4ee3\u7801\nres.send('HTML String');\n\n// \u53d1\u9001\u4e00\u4e2a\u6587\u4ef6\nres.sendFile('file.zip');\n\n// \u6e32\u67d3\u4e00\u4e2a\u6a21\u677f\u5f15\u64ce\u5e76\u53d1\u9001\nres.render('index');\n\n// \u8bbe\u7f6e\u72b6\u6001\u7801\u4e3a 404\uff0c\u5e76\u8fd4\u56de Page Not Found \u5b57\u7b26\u4e32\nres.status(404).send('Page Not Found');\n")),(0,o.kt)("h3",{id:"nodemon-\u52a0\u901f\u5f00\u53d1"},"nodemon \u52a0\u901f\u5f00\u53d1"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fnodemon"},"Nodemon"),"\xa0\u662f\u4e00\u6b3e\u9887\u53d7\u6b22\u8fce\u7684\u5f00\u53d1\u670d\u52a1\u5668\uff0c\u80fd\u591f\u68c0\u6d4b\u5de5\u4f5c\u533a\u4ee3\u7801\u7684\u53d8\u5316\uff0c\u5e76\u81ea\u52a8\u91cd\u542f\u3002\u901a\u8fc7\u4ee5\u4e0b\u547d\u4ee4\u5b89\u88c5 nodemon\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"\nnpm install nodemon --save-dev\n")),(0,o.kt)("h2",{id:"\u5f00\u59cb"},"\u5f00\u59cb"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"//\u5f15\u5165\u6784\u9020\u51fd\u6570\nconst express = require('express');\n\nconst hostname = 'localhost';\nconst port = 3000;\n\nconst app = express();\napp.get('/', (req, res) => {\n  res.send('Hello World');\n});\n\napp.listen(port, () => {\n  console.log(`Server running at <http://$>{hostname}:${port}/`);\n});\n\n")),(0,o.kt)("p",null,"\u4e2d\u95f4\u4ef6"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"const app = express();\n\nfunction loggingMiddleware(req, res, next) {\n  const time = new Date();\n  console.log(`[${time.toLocaleString()}] ${req.method} ${req.url}`);\n  next();\n}\n\napp.use(loggingMiddleware);\n\napp.get('/', (req, res) => {\n  res.send('Hello World');\n});\n\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"// \u6307\u5b9a\u6a21\u677f\u5b58\u653e\u76ee\u5f55\napp.set('views', '/path/to/templates');\n\n// \u6307\u5b9a\u6a21\u677f\u5f15\u64ce\u4e3a Handlebars\napp.set('view engine', 'hbs');\n\n//\u5728\u4f7f\u7528\u6a21\u677f\u65f6\uff0c\u53ea\u9700\u5728\u8def\u7531\u51fd\u6570\u4e2d\u8c03\u7528 res.render \u65b9\u6cd5\u5373\u53ef\uff1a\n// \u6e32\u67d3\u540d\u79f0\u4e3a hello.hbs \u7684\u6a21\u677f\nres.render('hello');\n")),(0,o.kt)("p",null,"\u901a\u5e38\u7f51\u7ad9\u9700\u8981\u63d0\u4f9b\u9759\u6001\u6587\u4ef6\u670d\u52a1\uff0c\u4f8b\u5982\u56fe\u7247\u3001CSS \u6587\u4ef6\u3001JS \u6587\u4ef6\u7b49\u7b49\uff0c\u800c Express \u5df2\u7ecf\u81ea\u5e26\u4e86\u9759\u6001\u6587\u4ef6\u670d\u52a1\u4e2d\u95f4\u4ef6\xa0",(0,o.kt)("inlineCode",{parentName:"p"},"express.static"),"\uff0c\u4f7f\u7528\u8d77\u6765\u975e\u5e38\u65b9\u4fbf\u3002"),(0,o.kt)("p",null,"\u4f8b\u5982\uff0c\u6211\u4eec\u6dfb\u52a0\u9759\u6001\u6587\u4ef6\u4e2d\u95f4\u4ef6\u5982\u4e0b\uff0c\u5e76\u6307\u5b9a\u9759\u6001\u8d44\u6e90\u6839\u76ee\u5f55\u4e3a\xa0",(0,o.kt)("inlineCode",{parentName:"p"},"public"),"\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"app.use(express.static('public'));\n\napp.get('/', (req, res) => {\n  res.render('index');\n});\n")),(0,o.kt)("h2",{id:"\u8fd4\u56dejson\u6570\u636e"},"\u8fd4\u56dejson\u6570\u636e"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"app.get('/api', (req, res) => {\n  res.json({ name: '\u56fe\u96c0\u793e\u533a', website: '<https://tuture.co>' });\n});\n")),(0,o.kt)("h2",{id:"\u4f7f\u7528\u5b50\u8def\u7531\u62c6\u5206\u903b\u8f91"},(0,o.kt)("strong",{parentName:"h2"},"\u4f7f\u7528\u5b50\u8def\u7531\u62c6\u5206\u903b\u8f91")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"const express = require('express');\nconst router = express.Router();\n\nrouter.get('/', (req, res) => {\n  res.json({ name: '\u56fe\u96c0\u793e\u533a', website: '<https://tuture.co>' });\n});\n\nrouter.post('/new', (req, res) => {\n  res.status(201).json({ msg: '\u65b0\u7684\u7bc7\u7ae0\uff0c\u5373\u5c06\u5f00\u59cb' });\n});\n\nmodule.exports = router;\n\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"\nconst indexRouter = require('./routes/index');\nconst apiRouter = require('./routes/api');\n\napp.use('/', indexRouter);\napp.use('/api', apiRouter);\n")))}d.isMDXComponent=!0}}]);