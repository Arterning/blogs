"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2990],{8015:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>f});var r=n(757);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=l(n),d=o,f=u["".concat(c,".").concat(d)]||u[d]||m[d]||a;return n?r.createElement(f,s(s({ref:t},p),{},{components:n})):r.createElement(f,s({ref:t},p))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,s=new Array(a);s[0]=d;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[u]="string"==typeof e?e:o,s[1]=i;for(var l=2;l<a;l++)s[l]=n[l];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7118:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>m,frontMatter:()=>a,metadata:()=>i,toc:()=>l});var r=n(1227),o=(n(757),n(8015));const a={},s=void 0,i={unversionedId:"notes/\u64cd\u4f5c\u7cfb\u7edf/\u865a\u62df\u673a/Homestead yaml config",id:"notes/\u64cd\u4f5c\u7cfb\u7edf/\u865a\u62df\u673a/Homestead yaml config",title:"Homestead yaml config",description:"",source:"@site/docs/notes/\u64cd\u4f5c\u7cfb\u7edf/\u865a\u62df\u673a/Homestead yaml config.md",sourceDirName:"notes/\u64cd\u4f5c\u7cfb\u7edf/\u865a\u62df\u673a",slug:"/notes/\u64cd\u4f5c\u7cfb\u7edf/\u865a\u62df\u673a/Homestead yaml config",permalink:"/blogs/docs/notes/\u64cd\u4f5c\u7cfb\u7edf/\u865a\u62df\u673a/Homestead yaml config",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/\u64cd\u4f5c\u7cfb\u7edf/\u865a\u62df\u673a/Homestead yaml config.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"HomeStead settings",permalink:"/blogs/docs/notes/\u64cd\u4f5c\u7cfb\u7edf/\u865a\u62df\u673a/HomeStead settings"},next:{title:"vagrant reload and vagrant provision",permalink:"/blogs/docs/notes/\u64cd\u4f5c\u7cfb\u7edf/\u865a\u62df\u673a/vagrant reload and vagrant provision"}},c={},l=[],p={toc:l},u="wrapper";function m(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},"authorize: ~/.ssh/id_rsa_homestead.pub\n\nkeys:\n    - ~/.ssh/github\n    - ~/.ssh/gitlab\n\nfolders:\n    - map: C:/Users/china/working/\n      to: /home/vagrant/working\n\nsites:\n    - map: homestead.test\n      to: /home/vagrant/code/public\n")))}m.isMDXComponent=!0}}]);