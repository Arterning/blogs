"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[821],{8015:(e,n,t)=>{t.d(n,{Zo:()=>l,kt:()=>d});var r=t(757);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=r.createContext({}),p=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},l=function(e){var n=p(e.components);return r.createElement(c.Provider,{value:n},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},g=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,s=e.originalType,c=e.parentName,l=a(e,["components","mdxType","originalType","parentName"]),u=p(t),g=o,d=u["".concat(c,".").concat(g)]||u[g]||m[g]||s;return t?r.createElement(d,i(i({ref:n},l),{},{components:t})):r.createElement(d,i({ref:n},l))}));function d(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var s=t.length,i=new Array(s);i[0]=g;var a={};for(var c in n)hasOwnProperty.call(n,c)&&(a[c]=n[c]);a.originalType=e,a[u]="string"==typeof e?e:o,i[1]=a;for(var p=2;p<s;p++)i[p]=t[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}g.displayName="MDXCreateElement"},8618:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>s,metadata:()=>a,toc:()=>p});var r=t(1227),o=(t(757),t(8015));const s={authors:"endi",tags:["nginx"],title:"nginx\u548chttps"},i="\u751f\u6210\u81ea\u7b7e\u540d\u8bc1\u4e66",a={unversionedId:"notes/\u6280\u672f\u6808/nginx/nginx \u81ea\u7b7e\u540dhttps\u670d\u52a1\u90e8\u7f72",id:"notes/\u6280\u672f\u6808/nginx/nginx \u81ea\u7b7e\u540dhttps\u670d\u52a1\u90e8\u7f72",title:"nginx\u548chttps",description:"\u4f7f\u7528 OpenSSL \u5de5\u5177\u751f\u6210\u81ea\u7b7e\u540d\u8bc1\u4e66\u3002\u6309\u7167\u4ee5\u4e0b\u6b65\u9aa4\u64cd\u4f5c\uff1a",source:"@site/docs/notes/\u6280\u672f\u6808/nginx/nginx \u81ea\u7b7e\u540dhttps\u670d\u52a1\u90e8\u7f72.md",sourceDirName:"notes/\u6280\u672f\u6808/nginx",slug:"/notes/\u6280\u672f\u6808/nginx/nginx \u81ea\u7b7e\u540dhttps\u670d\u52a1\u90e8\u7f72",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/nginx/nginx \u81ea\u7b7e\u540dhttps\u670d\u52a1\u90e8\u7f72",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/\u6280\u672f\u6808/nginx/nginx \u81ea\u7b7e\u540dhttps\u670d\u52a1\u90e8\u7f72.md",tags:[{label:"nginx",permalink:"/blogs/docs/tags/nginx"}],version:"current",frontMatter:{authors:"endi",tags:["nginx"],title:"nginx\u548chttps"},sidebar:"notes",previous:{title:"nginx \u591a\u4e2awebapp",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/nginx/nginx \u591a\u4e2awebapp"},next:{title:"\u89e3\u51b3\u8de8\u57df\u95ee\u9898",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/nginx/\u89e3\u51b3\u8de8\u57df\u95ee\u9898"}},c={},p=[],l={toc:p},u="wrapper";function m(e){let{components:n,...t}=e;return(0,o.kt)(u,(0,r.Z)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"\u751f\u6210\u81ea\u7b7e\u540d\u8bc1\u4e66"},"\u751f\u6210\u81ea\u7b7e\u540d\u8bc1\u4e66"),(0,o.kt)("p",null,"\u4f7f\u7528 OpenSSL \u5de5\u5177\u751f\u6210\u81ea\u7b7e\u540d\u8bc1\u4e66\u3002\u6309\u7167\u4ee5\u4e0b\u6b65\u9aa4\u64cd\u4f5c\uff1a  "),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"\u5b89\u88c5 OpenSSL \u5de5\u5177\uff1a\u5982\u679c\u60a8\u4f7f\u7528\u7684\u662f Linux \u64cd\u4f5c\u7cfb\u7edf\uff0c\u53ef\u4ee5\u4f7f\u7528\u60a8\u7684\u5305\u7ba1\u7406\u5668\u5b89\u88c5 OpenSSL \u5de5\u5177\u3002\u5982\u679c\u60a8\u4f7f\u7528\u7684\u662f Windows \u64cd\u4f5c\u7cfb\u7edf\uff0c\u5219\u53ef\u4ee5\u4ece OpenSSL \u7f51\u7ad9\u4e0b\u8f7d\u9884\u7f16\u8bd1\u7684\u4e8c\u8fdb\u5236\u6587\u4ef6\u5e76\u5b89\u88c5\u3002",(0,o.kt)("br",{parentName:"li"}),"2.  \u751f\u6210\u79c1\u94a5\uff1a\u4f7f\u7528\u4ee5\u4e0b\u547d\u4ee4\u751f\u6210\u79c1\u94a5\u6587\u4ef6\uff1a  ")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"openssl genrsa -out mykey.pem 2048```  \n  \n\u8fd9\u5c06\u751f\u6210\u4e00\u4e2a 2048 \u4f4d\u7684 RSA \u79c1\u94a5\uff0c\u5e76\u5c06\u5176\u4fdd\u5b58\u5728\u540d\u4e3a\u201cmykey.pem\u201d\u7684\u6587\u4ef6\u4e2d\u3002  \n  \n3.  \u751f\u6210\u8bc1\u4e66\u7b7e\u540d\u8bf7\u6c42\uff1a\u4f7f\u7528\u4ee5\u4e0b\u547d\u4ee4\u751f\u6210\u8bc1\u4e66\u7b7e\u540d\u8bf7\u6c42\uff08CSR\uff09\uff1a  \n  \n```bash  \nopenssl req -new -key mykey.pem -out mycsr.csr```  \n  \n\u5728\u751f\u6210\u8fc7\u7a0b\u4e2d\uff0c\u60a8\u9700\u8981\u8f93\u5165\u4e00\u4e9b\u8bc1\u4e66\u8be6\u7ec6\u4fe1\u606f\uff0c\u4f8b\u5982\u56fd\u5bb6/\u5730\u533a\u540d\u79f0\u3001\u5dde/\u7701\u4efd\u3001\u57ce\u5e02\u3001\u7ec4\u7ec7\u540d\u79f0\u3001\u7ec4\u7ec7\u5355\u4f4d\u540d\u79f0\u7b49\u3002  \n  \n4.  \u751f\u6210\u81ea\u7b7e\u540d\u8bc1\u4e66\uff1a\u4f7f\u7528\u4ee5\u4e0b\u547d\u4ee4\u751f\u6210\u81ea\u7b7e\u540d\u8bc1\u4e66\uff1a  \n  \ncsharp  \n  \n```bash  \nopenssl x509 -req -days 365 -in mycsr.csr -signkey mykey.pem -out mycert.pem```  \n  \n  \n# nginx \u914d\u7f6e\u6587\u4ef6  \n```bash  \nworker_processes  1;  \nevents {    worker_connections  1024;}  \n  \nhttp {    include       mime.types;    default_type  application/octet-stream;  \n    sendfile        on;    keepalive_timeout  65;  \n    server {        listen 80;        server_name your_ip; #\u5982\u679c\u60a8\u6ca1\u6709\u57df\u540d\uff0c\u53ef\u4ee5\u6307\u5b9a\u60a8\u670d\u52a1\u5668\u7684 IP \u5730\u5740\u3002  \n  \n        return 301 https://$server_name$request_uri; # 80\u91cd\u5b9a\u5411\u5230403  \n    }  \n    server {        listen 443 ssl;        server_name your_ip;  \n        ssl_certificate /etc/nginx/ssl/mycert.pem; # \u8bc1\u4e66\u6587\u4ef6  \n        ssl_certificate_key /etc/nginx/ssl/mykey.pem; # \u79c1\u94a5\u6587\u4ef6  \n  \n        location / {            root /usr/share/nginx/html;            index index.html;        }    }}  \n  \n")),(0,o.kt)("h1",{id:"\u51c6\u5907-docker-compose-file"},"\u51c6\u5907 Docker compose file"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-docker-compose"},'services:  \n  nginx:    image: nginx    ports:      - "80:80"      - "443:443"    volumes:      - ./nginx-data/nginx.conf:/etc/nginx/nginx.conf      - ./nginx-data/conf.d:/etc/nginx/conf.d      - ./nginx-data/ssl:/etc/nginx/ssl```  \n\u6302\u8f7d\u7684\u6587\u4ef6\u5fc5\u987b\u8981\u5148\u51c6\u5907\u597d \u4e5f\u5c31\u662fnginx.conf\u3002  \n\u6302\u8f7d\u7684\u76ee\u5f55\u53ef\u4ee5\u4e0d\u7528\u521b\u5efa\uff0cdocker\u4f1a\u81ea\u52a8\u5e2e\u6211\u4eec\u521b\u5efa\u3002\n')))}m.isMDXComponent=!0}}]);