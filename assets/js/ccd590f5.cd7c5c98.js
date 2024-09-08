"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4181],{224:(e,n,t)=>{t.d(n,{Zo:()=>l,kt:()=>f});var r=t(2374);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function p(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var i=r.createContext({}),c=function(e){var n=r.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):p(p({},n),e)),t},l=function(e){var n=c(e.components);return r.createElement(i.Provider,{value:n},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=c(t),d=o,f=u["".concat(i,".").concat(d)]||u[d]||m[d]||a;return t?r.createElement(f,p(p({ref:n},l),{},{components:t})):r.createElement(f,p({ref:n},l))}));function f(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,p=new Array(a);p[0]=d;var s={};for(var i in n)hasOwnProperty.call(n,i)&&(s[i]=n[i]);s.originalType=e,s[u]="string"==typeof e?e:o,p[1]=s;for(var c=2;c<a;c++)p[c]=t[c];return r.createElement.apply(null,p)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},6026:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>i,contentTitle:()=>p,default:()=>m,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var r=t(9963),o=(t(2374),t(224));const a={},p=void 0,s={unversionedId:"notes/\u6280\u672f\u6808/nginx/nginx \u591a\u4e2awebapp",id:"notes/\u6280\u672f\u6808/nginx/nginx \u591a\u4e2awebapp",title:"nginx \u591a\u4e2awebapp",description:"\u6309\u7167\u4e0d\u540c\u7684\u8bf7\u6c42\u8def\u5f84 \u4ee3\u7406\u5230\u4e0d\u540c\u7684\u7aef\u53e3",source:"@site/docs/notes/\u6280\u672f\u6808/nginx/nginx \u591a\u4e2awebapp.md",sourceDirName:"notes/\u6280\u672f\u6808/nginx",slug:"/notes/\u6280\u672f\u6808/nginx/nginx \u591a\u4e2awebapp",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/nginx/nginx \u591a\u4e2awebapp",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/\u6280\u672f\u6808/nginx/nginx \u591a\u4e2awebapp.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"VPS \u4f7f\u7528\u7684\u914d\u7f6e",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/nginx/VPS \u4f7f\u7528\u7684\u914d\u7f6e"},next:{title:"nginx\u548chttps",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/nginx/nginx \u81ea\u7b7e\u540dhttps\u670d\u52a1\u90e8\u7f72"}},i={},c=[],l={toc:c},u="wrapper";function m(e){let{components:n,...t}=e;return(0,o.kt)(u,(0,r.Z)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"\u6309\u7167\u4e0d\u540c\u7684\u8bf7\u6c42\u8def\u5f84 \u4ee3\u7406\u5230\u4e0d\u540c\u7684\u7aef\u53e3"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"http {\n    #\u6b64\u5904\u7701\u7565\u4e00\u4e9b\u57fa\u672c\u914d\u7f6e\n\n    upstream product_server{\n        server www.helloworld.com:8081;\n    }\n\n    upstream admin_server{\n        server www.helloworld.com:8082;\n    }\n\n    upstream finance_server{\n        server www.helloworld.com:8083;\n    }\n\n    server {\n        #\u6b64\u5904\u7701\u7565\u4e00\u4e9b\u57fa\u672c\u914d\u7f6e\n        #\u9ed8\u8ba4\u6307\u5411product\u7684server\n        location / {\n            proxy_pass http://product_server;\n        }\n\n        location /product/{\n            proxy_pass http://product_server;\n        }\n\n        location /admin/ {\n            proxy_pass http://admin_server;\n        }\n\n        location /finance/ {\n            proxy_pass http://finance_server;\n        }\n    }\n}\n")))}m.isMDXComponent=!0}}]);