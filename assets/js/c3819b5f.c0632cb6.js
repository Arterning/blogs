"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4979],{8015:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>m});var n=r(757);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),p=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},u=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},l="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),l=p(r),f=o,m=l["".concat(s,".").concat(f)]||l[f]||g[f]||i;return r?n.createElement(m,c(c({ref:t},u),{},{components:r})):n.createElement(m,c({ref:t},u))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,c=new Array(i);c[0]=f;var a={};for(var s in t)hasOwnProperty.call(t,s)&&(a[s]=t[s]);a.originalType=e,a[l]="string"==typeof e?e:o,c[1]=a;for(var p=2;p<i;p++)c[p]=r[p];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},6407:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>c,default:()=>g,frontMatter:()=>i,metadata:()=>a,toc:()=>p});var n=r(1227),o=(r(757),r(8015));const i={},c=void 0,a={unversionedId:"notes/\u6280\u672f\u6808/git/git script",id:"notes/\u6280\u672f\u6808/git/git script",title:"git script",description:"\u5199\u4e00\u4e2agit\u811a\u672c \u63a5\u53d72\u4e2a\u53c2\u6570source \u548c target \u5148\u66f4\u65b0source\uff0c\u7136\u540e\u628atarget\u5408\u5e76\u5230source\uff0c\u6700\u540epush source",source:"@site/docs/notes/\u6280\u672f\u6808/git/git script.md",sourceDirName:"notes/\u6280\u672f\u6808/git",slug:"/notes/\u6280\u672f\u6808/git/git script",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/git/git script",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/\u6280\u672f\u6808/git/git script.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"\u57fa\u672c\u4f7f\u7528",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/gastby/\u57fa\u672c\u4f7f\u7528"},next:{title:"git \u4ed3\u5e93\u7626\u8eab",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/git/git \u4ed3\u5e93\u7626\u8eab"}},s={},p=[],u={toc:p},l="wrapper";function g(e){let{components:t,...r}=e;return(0,o.kt)(l,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"\u5199\u4e00\u4e2agit\u811a\u672c \u63a5\u53d72\u4e2a\u53c2\u6570source \u548c target \u5148\u66f4\u65b0source\uff0c\u7136\u540e\u628atarget\u5408\u5e76\u5230source\uff0c\u6700\u540epush source"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'#!/bin/bash\n\n# \u83b7\u53d6\u53c2\u6570\nsource_branch="$1"\ntarget_branch="$2"\n\n\ngit fetch -p\n\n# \u66f4\u65b0source\u5206\u652f\ngit checkout "$source_branch"\ngit pull\n\n# \u5408\u5e76target\u5206\u652f\u5230source\u5206\u652f\ngit merge "$target_branch"\n\n# \u63a8\u9001source\u5206\u652f\ngit push origin "$source_branch"\n')),(0,o.kt)("p",null,"\u5728",(0,o.kt)("inlineCode",{parentName:"p"},"git fetch"),"\u547d\u4ee4\u4e2d\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},"-p"),"\u9009\u9879\u8868\u793a",(0,o.kt)("inlineCode",{parentName:"p"},"--prune"),"\uff0c\u5b83\u7684\u4f5c\u7528\u662f\u5728\u4ece\u8fdc\u7a0b\u4ed3\u5e93\u83b7\u53d6\u5206\u652f\u66f4\u65b0\u65f6\uff0c\u540c\u65f6\u5220\u9664\u672c\u5730\u4ed3\u5e93\u4e2d\u5df2\u7ecf\u4e0d\u5b58\u5728\u4e8e\u8fdc\u7a0b\u4ed3\u5e93\u7684\u5206\u652f\u3002"),(0,o.kt)("p",null,"\u5177\u4f53\u6765\u8bf4\uff0c\u5f53\u4f60\u8fd0\u884c",(0,o.kt)("inlineCode",{parentName:"p"},"git fetch -p"),"\u65f6\uff0cGit\u4f1a\u4ece\u8fdc\u7a0b\u4ed3\u5e93\u83b7\u53d6\u6700\u65b0\u7684\u5206\u652f\u4fe1\u606f\uff0c\u5e76\u5c06\u8fd9\u4e9b\u66f4\u65b0\u540c\u6b65\u5230\u672c\u5730\u4ed3\u5e93\u3002\u5982\u679c\u5728\u672c\u5730\u4ed3\u5e93\u4e2d\u5b58\u5728\u4e00\u4e9b\u5206\u652f\uff0c\u4f46\u5728\u8fdc\u7a0b\u4ed3\u5e93\u4e2d\u5df2\u7ecf\u88ab\u5220\u9664\u4e86\uff0c\u90a3\u4e48\u4f7f\u7528",(0,o.kt)("inlineCode",{parentName:"p"},"-p"),"\u9009\u9879\u4f1a\u81ea\u52a8\u5220\u9664\u8fd9\u4e9b\u672c\u5730\u5206\u652f\uff0c\u4ee5\u4fdd\u6301\u672c\u5730\u4ed3\u5e93\u4e0e\u8fdc\u7a0b\u4ed3\u5e93\u7684\u4e00\u81f4\u6027\u3002"),(0,o.kt)("p",null,"\u8fd9\u4e2a\u9009\u9879\u5728\u6e05\u7406\u672c\u5730\u4ed3\u5e93\u4e2d\u5df2\u7ecf\u88ab\u5220\u9664\u7684\u5206\u652f\u65f6\u975e\u5e38\u6709\u7528\uff0c\u4ee5\u786e\u4fdd\u4f60\u7684\u672c\u5730\u4ed3\u5e93\u4e0e\u8fdc\u7a0b\u4ed3\u5e93\u4fdd\u6301\u540c\u6b65\u3002"))}g.isMDXComponent=!0}}]);