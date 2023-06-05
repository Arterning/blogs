"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7139],{3905:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>f});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},l=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,c=e.originalType,s=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),u=p(n),d=o,f=u["".concat(s,".").concat(d)]||u[d]||m[d]||c;return n?r.createElement(f,a(a({ref:t},l),{},{components:n})):r.createElement(f,a({ref:t},l))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var c=n.length,a=new Array(c);a[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[u]="string"==typeof e?e:o,a[1]=i;for(var p=2;p<c;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},3295:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>m,frontMatter:()=>c,metadata:()=>i,toc:()=>p});var r=n(7462),o=(n(7294),n(3905));const c={},a="\u7ec4\u4ef6\u901a\u4fe1\u65b9\u5f0f\u603b\u7ed3",i={unversionedId:"notes/react/component-communicate",id:"notes/react/component-communicate",title:"\u7ec4\u4ef6\u901a\u4fe1\u65b9\u5f0f\u603b\u7ed3",description:"\u65b9\u5f0f",source:"@site/docs/notes/react/component-communicate.md",sourceDirName:"notes/react",slug:"/notes/react/component-communicate",permalink:"/blogs/docs/notes/react/component-communicate",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/react/component-communicate.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"nginx\u548chttps",permalink:"/blogs/docs/notes/nginx/nginx \u81ea\u7b7e\u540dhttps\u670d\u52a1\u90e8\u7f72"},next:{title:"eslint basic",permalink:"/blogs/docs/notes/react/eslint/eslint-basic"}},s={},p=[{value:"\u65b9\u5f0f",id:"\u65b9\u5f0f",level:2},{value:"\u7ec4\u4ef6\u95f4\u7684\u5173\u7cfb",id:"\u7ec4\u4ef6\u95f4\u7684\u5173\u7cfb",level:2}],l={toc:p},u="wrapper";function m(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"\u7ec4\u4ef6\u901a\u4fe1\u65b9\u5f0f\u603b\u7ed3"},"\u7ec4\u4ef6\u901a\u4fe1\u65b9\u5f0f\u603b\u7ed3"),(0,o.kt)("h2",{id:"\u65b9\u5f0f"},"\u65b9\u5f0f"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"    props\uff1a\n        (1).children props\n        (2).render props\n    \u6d88\u606f\u8ba2\u9605-\u53d1\u5e03\uff1a\n        pubs-sub\u3001event\u7b49\u7b49\n    \u96c6\u4e2d\u5f0f\u7ba1\u7406\uff1a\n        redux\u3001dva\u7b49\u7b49\n    conText:\n        \u751f\u4ea7\u8005-\u6d88\u8d39\u8005\u6a21\u5f0f\n")),(0,o.kt)("h2",{id:"\u7ec4\u4ef6\u95f4\u7684\u5173\u7cfb"},"\u7ec4\u4ef6\u95f4\u7684\u5173\u7cfb"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"    \u7236\u5b50\u7ec4\u4ef6\uff1aprops\n    \u5144\u5f1f\u7ec4\u4ef6(\u975e\u5d4c\u5957\u7ec4\u4ef6)\uff1a\u6d88\u606f\u8ba2\u9605-\u53d1\u5e03\u3001\u96c6\u4e2d\u5f0f\u7ba1\u7406\n    \u7956\u5b59\u7ec4\u4ef6(\u8de8\u7ea7\u7ec4\u4ef6)\uff1a\u6d88\u606f\u8ba2\u9605-\u53d1\u5e03\u3001\u96c6\u4e2d\u5f0f\u7ba1\u7406\u3001conText(\u7528\u7684\u5c11)\n")))}m.isMDXComponent=!0}}]);