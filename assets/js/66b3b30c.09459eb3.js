"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8029],{224:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>f});var n=r(2374);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var i=n.createContext({}),l=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=l(e.components);return n.createElement(i.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,s=e.originalType,i=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),u=l(r),d=a,f=u["".concat(i,".").concat(d)]||u[d]||m[d]||s;return r?n.createElement(f,o(o({ref:t},c),{},{components:r})):n.createElement(f,o({ref:t},c))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=r.length,o=new Array(s);o[0]=d;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p[u]="string"==typeof e?e:a,o[1]=p;for(var l=2;l<s;l++)o[l]=r[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},7435:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>o,default:()=>m,frontMatter:()=>s,metadata:()=>p,toc:()=>l});var n=r(9963),a=(r(2374),r(224));const s={},o=void 0,p={unversionedId:"notes/\u6280\u672f\u6808/express/create express project",id:"notes/\u6280\u672f\u6808/express/create express project",title:"create express project",description:"\u5728\u5f00\u59cb\u7528 Express \u6539\u5199\u4e0a\u9762\u7684\u670d\u52a1\u5668\u4e4b\u524d\uff0c\u6211\u4eec\u5148\u4ecb\u7ecd\u4e00\u4e0b\u4e0a\u9762\u63d0\u5230\u7684\u4e24\u5927\u5c01\u88c5\u4e0e\u6539\u8fdb\u3002",source:"@site/docs/notes/\u6280\u672f\u6808/express/create express project.md",sourceDirName:"notes/\u6280\u672f\u6808/express",slug:"/notes/\u6280\u672f\u6808/express/create express project",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/express/create express project",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/\u6280\u672f\u6808/express/create express project.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"Template engine",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/express/Template engine"},next:{title:"master express",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/express/master express"}},i={},l=[{value:"\u66f4\u5f3a\u5927\u7684 Request \u548c Response \u5bf9\u8c61",id:"\u66f4\u5f3a\u5927\u7684-request-\u548c-response-\u5bf9\u8c61",level:3}],c={toc:l},u="wrapper";function m(e){let{components:t,...r}=e;return(0,a.kt)(u,(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"pnpm init\npnpm install express\n")),(0,a.kt)("p",null,"\u5728\u5f00\u59cb\u7528 Express \u6539\u5199\u4e0a\u9762\u7684\u670d\u52a1\u5668\u4e4b\u524d\uff0c\u6211\u4eec\u5148\u4ecb\u7ecd\u4e00\u4e0b\u4e0a\u9762\u63d0\u5230\u7684",(0,a.kt)("strong",{parentName:"p"},"\u4e24\u5927\u5c01\u88c5\u4e0e\u6539\u8fdb"),"\u3002"),(0,a.kt)("h3",{id:"\u66f4\u5f3a\u5927\u7684-request-\u548c-response-\u5bf9\u8c61"},"\u66f4\u5f3a\u5927\u7684 Request \u548c Response \u5bf9\u8c61"),(0,a.kt)("p",null,"\u9996\u5148\u662f Request \u8bf7\u6c42\u5bf9\u8c61\uff0c\u901a\u5e38\u6211\u4eec\u4e60\u60ef\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"req")," \u53d8\u91cf\u6765\u8868\u793a\u3002\u4e0b\u9762\u5217\u4e3e\u4e00\u4e9b ",(0,a.kt)("inlineCode",{parentName:"p"},"req")," \u4e0a\u6bd4\u8f83\u91cd\u8981\u7684\u6210\u5458\uff08\u5982\u679c\u4e0d\u77e5\u9053\u662f\u4ec0\u4e48\u4e5f\u6ca1\u5173\u7cfb\u54e6\uff09\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"req.body"),"\uff1a\u5ba2\u6237\u7aef\u8bf7\u6c42\u4f53\u7684\u6570\u636e\uff0c\u53ef\u80fd\u662f\u8868\u5355\u6216 JSON \u6570\u636e"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"req.params"),"\uff1a\u8bf7\u6c42 URI \u4e2d\u7684\u8def\u5f84\u53c2\u6570"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"req.query"),"\uff1a\u8bf7\u6c42 URI \u4e2d\u7684\u67e5\u8be2\u53c2\u6570"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"req.cookies"),"\uff1a\u5ba2\u6237\u7aef\u7684 cookies")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"http://expressjs.com/en/api.html#req.params"},(0,a.kt)("inlineCode",{parentName:"a"},"req.params")),"\xa0contains route parameters (in the path portion of the URL), and\xa0",(0,a.kt)("a",{parentName:"p",href:"http://expressjs.com/en/api.html#req.query"},(0,a.kt)("inlineCode",{parentName:"a"},"req.query")),"\xa0contains the URL query parameters (after the\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"?"),"\xa0in the URL)."),(0,a.kt)("p",null,"\u7136\u540e\u662f Response \u54cd\u5e94\u5bf9\u8c61\uff0c\u901a\u5e38\u7528\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"res"),"\xa0\u53d8\u91cf\u6765\u8868\u793a\uff0c\u53ef\u4ee5\u6267\u884c\u4e00\u7cfb\u5217\u54cd\u5e94\u64cd\u4f5c\uff0c\u4f8b\u5982\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"// \u53d1\u9001\u4e00\u4e32 HTML \u4ee3\u7801\nres.send('HTML String');\n\n// \u53d1\u9001\u4e00\u4e2a\u6587\u4ef6\nres.sendFile('file.zip');\n\n// \u6e32\u67d3\u4e00\u4e2a\u6a21\u677f\u5f15\u64ce\u5e76\u53d1\u9001\nres.render('index');\n")),(0,a.kt)("p",null,"chain invoke response"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"// \u8bbe\u7f6e\u72b6\u6001\u7801\u4e3a 404\uff0c\u5e76\u8fd4\u56de Page Not Found \u5b57\u7b26\u4e32\nres.status(404).send('Page Not Found');\n")))}m.isMDXComponent=!0}}]);