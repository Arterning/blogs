"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8021],{8015:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>f});var n=r(757);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):p(p({},t),e)),r},s=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),u=c(r),d=o,f=u["".concat(l,".").concat(d)]||u[d]||m[d]||a;return r?n.createElement(f,p(p({ref:t},s),{},{components:r})):n.createElement(f,p({ref:t},s))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,p=new Array(a);p[0]=d;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[u]="string"==typeof e?e:o,p[1]=i;for(var c=2;c<a;c++)p[c]=r[c];return n.createElement.apply(null,p)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},8112:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>p,default:()=>m,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var n=r(1227),o=(r(757),r(8015));const a={},p=void 0,i={unversionedId:"tutorial/node/pm2 \u7684\u4f7f\u7528",id:"tutorial/node/pm2 \u7684\u4f7f\u7528",title:"pm2 \u7684\u4f7f\u7528",description:"pm2 start",source:"@site/docs/tutorial/node/pm2 \u7684\u4f7f\u7528.md",sourceDirName:"tutorial/node",slug:"/tutorial/node/pm2 \u7684\u4f7f\u7528",permalink:"/blogs/docs/tutorial/node/pm2 \u7684\u4f7f\u7528",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/tutorial/node/pm2 \u7684\u4f7f\u7528.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorial",previous:{title:"node \u5305\u7ba1\u7406",permalink:"/blogs/docs/tutorial/node/node \u5305\u7ba1\u7406"},next:{title:"ch04-require\u548cimport\u7684\u533a\u522b",permalink:"/blogs/docs/tutorial/node/require\u548cimport\u7684\u533a\u522b"}},l={},c=[{value:"pm2 \u5f00\u542f\u524d\u7aef\u670d\u52a1",id:"pm2-\u5f00\u542f\u524d\u7aef\u670d\u52a1",level:2}],s={toc:c},u="wrapper";function m(e){let{components:t,...r}=e;return(0,o.kt)(u,(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"\npm2 start app.js --name app\npm2 list\npm2 ls\npm2 delete app\npm2 stop app\npm2 restart app\npm2 info app\npm2 logs app\n\n# \u76d1\u63a7(monitor)-\u67e5\u770b\u8fdb\u7a0b\u7684\u8d44\u6e90\u6d88\u8017\u60c5\u51b5\npm2 monit\n\n")),(0,o.kt)("p",null,"pm2 start\n-i --instances\uff1a\u542f\u7528\u591a\u5c11\u4e2a\u5b9e\u4f8b\uff0c\u53ef\u7528\u4e8e\u8d1f\u8f7d\u5747\u8861\u3002\u5982\u679c-i 0\u6216\u8005-i max\uff0c\u5219\u6839\u636e\u5f53\u524d\u673a\u5668\u6838\u6570\u786e\u5b9a\u5b9e\u4f8b\u6570\u76ee\u3002"),(0,o.kt)("p",null,"PM2 can automatically restart your application when a file is modified in the current directory or its subdirectories:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"pm2 start app.js --watch\n")),(0,o.kt)("p",null,"Run npm script"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"pm2 start 'bun run start'\n")),(0,o.kt)("h2",{id:"pm2-\u5f00\u542f\u524d\u7aef\u670d\u52a1"},"pm2 \u5f00\u542f\u524d\u7aef\u670d\u52a1"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"pm2 start pnpm -- run dev --host 0.0.0.0\npm2 list\npm2 restart 0\n")))}m.isMDXComponent=!0}}]);