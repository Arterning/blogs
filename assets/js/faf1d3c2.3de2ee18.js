"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9486],{8015:(e,n,t)=>{t.d(n,{Zo:()=>l,kt:()=>f});var r=t(757);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=r.createContext({}),p=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},l=function(e){var n=p(e.components);return r.createElement(c.Provider,{value:n},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),u=p(t),d=o,f=u["".concat(c,".").concat(d)]||u[d]||m[d]||a;return t?r.createElement(f,s(s({ref:n},l),{},{components:t})):r.createElement(f,s({ref:n},l))}));function f(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,s=new Array(a);s[0]=d;var i={};for(var c in n)hasOwnProperty.call(n,c)&&(i[c]=n[c]);i.originalType=e,i[u]="string"==typeof e?e:o,s[1]=i;for(var p=2;p<a;p++)s[p]=t[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},2096:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>m,frontMatter:()=>a,metadata:()=>i,toc:()=>p});var r=t(1227),o=(t(757),t(8015));const a={},s=void 0,i={unversionedId:"notes/\u6280\u672f\u6808/nginx/\u8d1f\u8f7d\u5747\u8861",id:"notes/\u6280\u672f\u6808/nginx/\u8d1f\u8f7d\u5747\u8861",title:"\u8d1f\u8f7d\u5747\u8861",description:"1. \u5b9a\u4e49upstream",source:"@site/docs/notes/\u6280\u672f\u6808/nginx/\u8d1f\u8f7d\u5747\u8861.md",sourceDirName:"notes/\u6280\u672f\u6808/nginx",slug:"/notes/\u6280\u672f\u6808/nginx/\u8d1f\u8f7d\u5747\u8861",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/nginx/\u8d1f\u8f7d\u5747\u8861",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/\u6280\u672f\u6808/nginx/\u8d1f\u8f7d\u5747\u8861.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"\u89e3\u51b3\u8de8\u57df\u95ee\u9898",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/nginx/\u89e3\u51b3\u8de8\u57df\u95ee\u9898"},next:{title:"ES6 \u6a21\u5757\u4e0e CommonJS \u6a21\u5757\u7684\u5dee\u5f02",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/node/ES6 \u6a21\u5757\u4e0e CommonJS \u6a21\u5757\u7684\u5dee\u5f02"}},c={},p=[],l={toc:p},u="wrapper";function m(e){let{components:n,...t}=e;return(0,o.kt)(u,(0,r.Z)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"\u5b9a\u4e49upstream"),(0,o.kt)("li",{parentName:"ol"},"\u5728server\u4e2d\u7528proxy_pass\u6307\u5b9aupstream")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"http {\n     #\u8bbe\u5b9amime\u7c7b\u578b,\u7c7b\u578b\u7531mime.type\u6587\u4ef6\u5b9a\u4e49\n    include       /etc/nginx/mime.types;\n    default_type  application/octet-stream;\n    #\u8bbe\u5b9a\u65e5\u5fd7\u683c\u5f0f\n    access_log    /var/log/nginx/access.log;\n\n    #\u8bbe\u5b9a\u8d1f\u8f7d\u5747\u8861\u7684\u670d\u52a1\u5668\u5217\u8868\n    upstream load_balance_server {\n        #weigth\u53c2\u6570\u8868\u793a\u6743\u503c\uff0c\u6743\u503c\u8d8a\u9ad8\u88ab\u5206\u914d\u5230\u7684\u51e0\u7387\u8d8a\u5927\n        server 192.168.1.11:80   weight=5;\n        server 192.168.1.12:80   weight=1;\n        server 192.168.1.13:80   weight=6;\n    }\n\n   #HTTP\u670d\u52a1\u5668\n   server {\n        #\u4fa6\u542c80\u7aef\u53e3\n        listen       80;\n\n        #\u5b9a\u4e49\u4f7f\u7528www.xx.com\u8bbf\u95ee\n        server_name  www.helloworld.com;\n\n        #\u5bf9\u6240\u6709\u8bf7\u6c42\u8fdb\u884c\u8d1f\u8f7d\u5747\u8861\u8bf7\u6c42\n        location / {\n            root        /root;                 #\u5b9a\u4e49\u670d\u52a1\u5668\u7684\u9ed8\u8ba4\u7f51\u7ad9\u6839\u76ee\u5f55\u4f4d\u7f6e\n            index       index.html index.htm;  #\u5b9a\u4e49\u9996\u9875\u7d22\u5f15\u6587\u4ef6\u7684\u540d\u79f0\n            proxy_pass  http://load_balance_server ;#\u8bf7\u6c42\u8f6c\u5411load_balance_server \u5b9a\u4e49\u7684\u670d\u52a1\u5668\u5217\u8868\n\n            #\u4ee5\u4e0b\u662f\u4e00\u4e9b\u53cd\u5411\u4ee3\u7406\u7684\u914d\u7f6e(\u53ef\u9009\u62e9\u6027\u914d\u7f6e)\n            #proxy_redirect off;\n            proxy_set_header Host $host;\n            proxy_set_header X-Real-IP $remote_addr;\n            #\u540e\u7aef\u7684Web\u670d\u52a1\u5668\u53ef\u4ee5\u901a\u8fc7X-Forwarded-For\u83b7\u53d6\u7528\u6237\u771f\u5b9eIP\n            proxy_set_header X-Forwarded-For $remote_addr;\n            proxy_connect_timeout 90;          #nginx\u8ddf\u540e\u7aef\u670d\u52a1\u5668\u8fde\u63a5\u8d85\u65f6\u65f6\u95f4(\u4ee3\u7406\u8fde\u63a5\u8d85\u65f6)\n            proxy_send_timeout 90;             #\u540e\u7aef\u670d\u52a1\u5668\u6570\u636e\u56de\u4f20\u65f6\u95f4(\u4ee3\u7406\u53d1\u9001\u8d85\u65f6)\n            proxy_read_timeout 90;             #\u8fde\u63a5\u6210\u529f\u540e\uff0c\u540e\u7aef\u670d\u52a1\u5668\u54cd\u5e94\u65f6\u95f4(\u4ee3\u7406\u63a5\u6536\u8d85\u65f6)\n            proxy_buffer_size 4k;              #\u8bbe\u7f6e\u4ee3\u7406\u670d\u52a1\u5668\uff08nginx\uff09\u4fdd\u5b58\u7528\u6237\u5934\u4fe1\u606f\u7684\u7f13\u51b2\u533a\u5927\u5c0f\n            proxy_buffers 4 32k;               #proxy_buffers\u7f13\u51b2\u533a\uff0c\u7f51\u9875\u5e73\u5747\u572832k\u4ee5\u4e0b\u7684\u8bdd\uff0c\u8fd9\u6837\u8bbe\u7f6e\n            proxy_busy_buffers_size 64k;       #\u9ad8\u8d1f\u8377\u4e0b\u7f13\u51b2\u5927\u5c0f\uff08proxy_buffers*2\uff09\n            proxy_temp_file_write_size 64k;    #\u8bbe\u5b9a\u7f13\u5b58\u6587\u4ef6\u5939\u5927\u5c0f\uff0c\u5927\u4e8e\u8fd9\u4e2a\u503c\uff0c\u5c06\u4eceupstream\u670d\u52a1\u5668\u4f20\n\n            client_max_body_size 10m;          #\u5141\u8bb8\u5ba2\u6237\u7aef\u8bf7\u6c42\u7684\u6700\u5927\u5355\u6587\u4ef6\u5b57\u8282\u6570\n            client_body_buffer_size 128k;      #\u7f13\u51b2\u533a\u4ee3\u7406\u7f13\u51b2\u7528\u6237\u7aef\u8bf7\u6c42\u7684\u6700\u5927\u5b57\u8282\u6570\n        }\n    }\n}\n")),(0,o.kt)("p",null,"upstream \u8868\u793a\u4e0a\u6e38"))}m.isMDXComponent=!0}}]);