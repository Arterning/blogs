"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7916],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>f});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},u="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,s=e.originalType,c=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=l(r),m=o,f=u["".concat(c,".").concat(m)]||u[m]||g[m]||s;return r?n.createElement(f,a(a({ref:t},p),{},{components:r})):n.createElement(f,a({ref:t},p))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=r.length,a=new Array(s);a[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[u]="string"==typeof e?e:o,a[1]=i;for(var l=2;l<s;l++)a[l]=r[l];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},8519:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>g,frontMatter:()=>s,metadata:()=>i,toc:()=>l});var n=r(7462),o=(r(7294),r(3905));const s={},a="git ssh \u64cd\u4f5c",i={unversionedId:"notes/git/git ssh\u64cd\u4f5c",id:"notes/git/git ssh\u64cd\u4f5c",title:"git ssh \u64cd\u4f5c",description:"\u5bc6\u94a5\u914d\u7f6e",source:"@site/docs/notes/git/git ssh\u64cd\u4f5c.md",sourceDirName:"notes/git",slug:"/notes/git/git ssh\u64cd\u4f5c",permalink:"/blogs/docs/notes/git/git ssh\u64cd\u4f5c",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/git/git ssh\u64cd\u4f5c.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"docker file example",permalink:"/blogs/docs/notes/docker/example-file"},next:{title:"git \u5408\u5e76\u591a\u4e2a\u4ed3\u5e93",permalink:"/blogs/docs/notes/git/git-merge-repo"}},c={},l=[{value:"\u5bc6\u94a5\u914d\u7f6e",id:"\u5bc6\u94a5\u914d\u7f6e",level:2}],p={toc:l},u="wrapper";function g(e){let{components:t,...r}=e;return(0,o.kt)(u,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"git-ssh-\u64cd\u4f5c"},"git ssh \u64cd\u4f5c"),(0,o.kt)("h2",{id:"\u5bc6\u94a5\u914d\u7f6e"},"\u5bc6\u94a5\u914d\u7f6e"),(0,o.kt)("p",null,"\u9996\u5148\u751f\u6210\u5bc6\u94a5"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'ssh-keygen -t rsa -b 4096 -C "your_email@example.com"\n')),(0,o.kt)("p",null,"\u63a5\u7740\u5728\u4f60\u7684\u670d\u52a1\u5668\u6216\u8005git server \u6dfb\u52a0\u4f60\u7684\u516c\u94a5\uff0c\u79c1\u94a5\u5728\u4f60\u672c\u5730\u4fdd\u5b58"),(0,o.kt)("p",null,"\u914d\u7f6e\u6587\u4ef6",(0,o.kt)("inlineCode",{parentName:"p"},"{user_home}/.ssh/config")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"Host github.com\n       HostName github.com\n       User git\n       IdentityFile {private_key}\n")))}g.isMDXComponent=!0}}]);