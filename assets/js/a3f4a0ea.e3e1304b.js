"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9422],{8015:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>f});var n=r(757);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=c(r),m=o,f=p["".concat(l,".").concat(m)]||p[m]||d[m]||a;return r?n.createElement(f,s(s({ref:t},u),{},{components:r})):n.createElement(f,s({ref:t},u))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,s=new Array(a);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[p]="string"==typeof e?e:o,s[1]=i;for(var c=2;c<a;c++)s[c]=r[c];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},8174:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var n=r(1227),o=(r(757),r(8015));const a={},s=void 0,i={unversionedId:"notes/\u6280\u672f\u6808/Laravel/Homestead",id:"notes/\u6280\u672f\u6808/Laravel/Homestead",title:"Homestead",description:"\u91cd\u65b0\u6784\u5efa\u4ee5\u751f\u6548",source:"@site/docs/notes/\u6280\u672f\u6808/Laravel/Homestead.md",sourceDirName:"notes/\u6280\u672f\u6808/Laravel",slug:"/notes/\u6280\u672f\u6808/Laravel/Homestead",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/Laravel/Homestead",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/\u6280\u672f\u6808/Laravel/Homestead.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"Create Post resource CRUD via Laravel",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/Laravel/Create Post resource CRUD via Laravel"},next:{title:"Model",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/Laravel/Model"}},l={},c=[],u={toc:c},p="wrapper";function d(e){let{components:t,...r}=e;return(0,o.kt)(p,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"\u91cd\u65b0\u6784\u5efa\u4ee5\u751f\u6548"),(0,o.kt)("p",null,"If you change the sites property after provisioning the Homestead virtual machine, you should execute the vagrant reload --provision command in your terminal to update the Nginx configuration on the virtual machine."),(0,o.kt)("p",null,"Homestead scripts are built to be as idempotent as possible. However, if you are experiencing issues while provisioning you should destroy and rebuild the machine by executing the vagrant destroy && vagrant up command."),(0,o.kt)("p",null,"\u5982\u679c\u5728\u914d\u7f6e Homestead \u865a\u62df\u673a\u540e\u66f4\u6539\u7ad9\u70b9\u5c5e\u6027\uff0c\u5219\u5e94\u5728\u7ec8\u7aef\u4e2d\u6267\u884c vagrant reload --provision \u547d\u4ee4\u6765\u66f4\u65b0\u865a\u62df\u673a\u4e0a\u7684 Nginx \u914d\u7f6e\u3002 Homestead \u811a\u672c\u88ab\u6784\u5efa\u4e3a\u5c3d\u53ef\u80fd\u5e42\u7b49\u3002"),(0,o.kt)("p",null,"\u4f46\u662f\uff0c\u5982\u679c\u60a8\u5728\u914d\u7f6e\u65f6\u9047\u5230\u95ee\u9898\uff0c\u60a8\u5e94\u8be5\u901a\u8fc7\u6267\u884c vagrant destroy && vagrant up \u547d\u4ee4\u6765\u9500\u6bc1\u5e76\u91cd\u5efa\u673a\u5668\u3002"))}d.isMDXComponent=!0}}]);