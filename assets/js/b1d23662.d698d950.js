"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7076],{224:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var n=r(2374);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},u="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,s=e.originalType,c=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=l(r),d=o,m=u["".concat(c,".").concat(d)]||u[d]||f[d]||s;return r?n.createElement(m,a(a({ref:t},p),{},{components:r})):n.createElement(m,a({ref:t},p))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=r.length,a=new Array(s);a[0]=d;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[u]="string"==typeof e?e:o,a[1]=i;for(var l=2;l<s;l++)a[l]=r[l];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},3486:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>f,frontMatter:()=>s,metadata:()=>i,toc:()=>l});var n=r(9963),o=(r(2374),r(224));const s={},a=void 0,i={unversionedId:"notes/\u6280\u672f\u6808/\u540e\u7aef/redis/AOF\u548cRDB",id:"notes/\u6280\u672f\u6808/\u540e\u7aef/redis/AOF\u548cRDB",title:"AOF\u548cRDB",description:"RDB\u662f\u5b9a\u671f\u751f\u6210\u5feb\u7167\u5b58\u5165\u78c1\u76d8\u4e2d\uff0cAOF\u662f\u5c06\u5199\u64cd\u4f5c\u5b58\u5165\u78c1\u76d8\u4e2d\u3002 \u4e8c\u8005\u5404\u6709\u4f18\u52a3\uff0cRDB \u662f\u5b58\u653e\u6570\u636e\u5e93\u4e2d\u6570\u636e\uff0c\u9002\u5408\u505a\u6570\u636e\u5907\u4efd\uff0c\u4f46\u662f\u6570\u636e\u53ef\u80fd\u4e0d\u5168\uff0c\u6700\u8fd1\u51e0\u5206\u949f\u7684\u6570\u636e\u53ef\u80fd\u6ca1\u6709\u3002 AOF\u662f\u6bcf\u79d2\u949f\u6267\u884c\u4e00\u6b21\uff0c\u5982\u679c\u6709\u5199\u64cd\u4f5c\u7684\u547d\u4ee4\u5c31\u5b58\u50a8\u8d77\u6765\uff0c\u6700\u591a\u53ea\u4f1a\u4e22\u59311\u79d2\u949f\u7684\u6570\u636e\uff0c\u9002\u5408\u505a\u6570\u636e\u6062\u590d\u3002",source:"@site/docs/notes/\u6280\u672f\u6808/\u540e\u7aef/redis/AOF\u548cRDB.md",sourceDirName:"notes/\u6280\u672f\u6808/\u540e\u7aef/redis",slug:"/notes/\u6280\u672f\u6808/\u540e\u7aef/redis/AOF\u548cRDB",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/\u540e\u7aef/redis/AOF\u548cRDB",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/\u6280\u672f\u6808/\u540e\u7aef/redis/AOF\u548cRDB.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"program files x86 vs program files",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/\u540e\u7aef/program files x86 vs program files"},next:{title:"Redis \u603b\u7ed3",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/\u540e\u7aef/redis/Redis \u603b\u7ed3"}},c={},l=[],p={toc:l},u="wrapper";function f(e){let{components:t,...r}=e;return(0,o.kt)(u,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"RDB\u662f\u5b9a\u671f\u751f\u6210\u5feb\u7167\u5b58\u5165\u78c1\u76d8\u4e2d\uff0cAOF\u662f\u5c06\u5199\u64cd\u4f5c\u5b58\u5165\u78c1\u76d8\u4e2d"),"\u3002 \u4e8c\u8005\u5404\u6709\u4f18\u52a3\uff0cRDB \u662f\u5b58\u653e\u6570\u636e\u5e93\u4e2d\u6570\u636e\uff0c\u9002\u5408\u505a\u6570\u636e\u5907\u4efd\uff0c\u4f46\u662f\u6570\u636e\u53ef\u80fd\u4e0d\u5168\uff0c\u6700\u8fd1\u51e0\u5206\u949f\u7684\u6570\u636e\u53ef\u80fd\u6ca1\u6709\u3002 AOF\u662f\u6bcf\u79d2\u949f\u6267\u884c\u4e00\u6b21\uff0c\u5982\u679c\u6709\u5199\u64cd\u4f5c\u7684\u547d\u4ee4\u5c31\u5b58\u50a8\u8d77\u6765\uff0c\u6700\u591a\u53ea\u4f1a\u4e22\u59311\u79d2\u949f\u7684\u6570\u636e\uff0c\u9002\u5408\u505a\u6570\u636e\u6062\u590d\u3002"))}f.isMDXComponent=!0}}]);