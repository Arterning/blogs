"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8520],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>f});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),u=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},s=function(e){var t=u(e.components);return r.createElement(c.Provider,{value:t},e.children)},i="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),i=u(n),d=o,f=i["".concat(c,".").concat(d)]||i[d]||m[d]||a;return n?r.createElement(f,p(p({ref:t},s),{},{components:n})):r.createElement(f,p({ref:t},s))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,p=new Array(a);p[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[i]="string"==typeof e?e:o,p[1]=l;for(var u=2;u<a;u++)p[u]=n[u];return r.createElement.apply(null,p)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8544:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>p,default:()=>m,frontMatter:()=>a,metadata:()=>l,toc:()=>u});var r=n(7462),o=(n(7294),n(3905));const a={},p="\u7ec4\u4ef6\u4f18\u5316",l={unversionedId:"notes/react/pure-component",id:"notes/react/pure-component",title:"\u7ec4\u4ef6\u4f18\u5316",description:"Component\u76842\u4e2a\u95ee\u9898",source:"@site/docs/notes/react/pure-component.md",sourceDirName:"notes/react",slug:"/notes/react/pure-component",permalink:"/blogs/docs/notes/react/pure-component",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/react/pure-component.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"eslint basic",permalink:"/blogs/docs/notes/react/eslint/eslint-basic"},next:{title:"react base",permalink:"/blogs/docs/notes/react/react-base"}},c={},u=[{value:"Component\u76842\u4e2a\u95ee\u9898",id:"component\u76842\u4e2a\u95ee\u9898",level:2},{value:"\u6548\u7387\u9ad8\u7684\u505a\u6cd5",id:"\u6548\u7387\u9ad8\u7684\u505a\u6cd5",level:2},{value:"\u539f\u56e0",id:"\u539f\u56e0",level:2},{value:"\u89e3\u51b3",id:"\u89e3\u51b3",level:2},{value:"\u51fd\u6570\u7ec4\u4ef6\u5982\u4f55\u5b9e\u73b0",id:"\u51fd\u6570\u7ec4\u4ef6\u5982\u4f55\u5b9e\u73b0",level:2}],s={toc:u},i="wrapper";function m(e){let{components:t,...n}=e;return(0,o.kt)(i,(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"\u7ec4\u4ef6\u4f18\u5316"},"\u7ec4\u4ef6\u4f18\u5316"),(0,o.kt)("h2",{id:"component\u76842\u4e2a\u95ee\u9898"},"Component\u76842\u4e2a\u95ee\u9898"),(0,o.kt)("blockquote",null,(0,o.kt)("ol",{parentName:"blockquote"},(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"\u53ea\u8981\u6267\u884csetState(),\u5373\u4f7f\u4e0d\u6539\u53d8\u72b6\u6001\u6570\u636e(\u65e7\u7684state\u53ef\u80fd\u548c\u65b0\u7684state\u4e00\u6837), \u7ec4\u4ef6\u4e5f\u4f1a\u91cd\u65b0render()")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"\u53ea\u5f53\u524d\u7ec4\u4ef6\u91cd\u65b0render(), \u5c31\u4f1a\u81ea\u52a8\u91cd\u65b0render\u5b50\u7ec4\u4ef6 ==> \u6548\u7387\u4f4e")))),(0,o.kt)("h2",{id:"\u6548\u7387\u9ad8\u7684\u505a\u6cd5"},"\u6548\u7387\u9ad8\u7684\u505a\u6cd5"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"}," \u53ea\u6709\u5f53\u7ec4\u4ef6\u7684state\u6216props\u6570\u636e\u53d1\u751f\u6539\u53d8\u65f6\u624d\u91cd\u65b0render()")),(0,o.kt)("h2",{id:"\u539f\u56e0"},"\u539f\u56e0"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"}," Component\u4e2d\u7684shouldComponentUpdate()\u603b\u662f\u8fd4\u56detrue")),(0,o.kt)("h2",{id:"\u89e3\u51b3"},"\u89e3\u51b3"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"    \u529e\u6cd51: \n        \u91cd\u5199shouldComponentUpdate()\u65b9\u6cd5\n        \u6bd4\u8f83\u65b0\u65e7state\u6216props\u6570\u636e, \u5982\u679c\u6709\u53d8\u5316\u624d\u8fd4\u56detrue, \u5982\u679c\u6ca1\u6709\u8fd4\u56defalse\n    \u529e\u6cd52:  \n        \u4f7f\u7528PureComponent\n        PureComponent\u91cd\u5199\u4e86shouldComponentUpdate(), \u53ea\u6709state\u6216props\u6570\u636e\u6709\u53d8\u5316\u624d\u8fd4\u56detrue\n        \u6ce8\u610f: \n            \u53ea\u662f\u8fdb\u884cstate\u548cprops\u6570\u636e\u7684\u6d45\u6bd4\u8f83, \u5982\u679c\u53ea\u662f\u6570\u636e\u5bf9\u8c61\u5185\u90e8\u6570\u636e\u53d8\u4e86, \u8fd4\u56defalse  \n            \u4e0d\u8981\u76f4\u63a5\u4fee\u6539state\u6570\u636e, \u800c\u662f\u8981\u4ea7\u751f\u65b0\u6570\u636e\n    \u9879\u76ee\u4e2d\u4e00\u822c\u4f7f\u7528PureComponent\u6765\u4f18\u5316\n")),(0,o.kt)("h2",{id:"\u51fd\u6570\u7ec4\u4ef6\u5982\u4f55\u5b9e\u73b0"},"\u51fd\u6570\u7ec4\u4ef6\u5982\u4f55\u5b9e\u73b0"),(0,o.kt)("p",null,"\u51fd\u6570\u7ec4\u4ef6\u5982\u4f55\u5b9e\u73b0\u7c7b\u4f3cPureComponent\u7684\u6548\u679c\uff1f"),(0,o.kt)("p",null,"\u5728\u51fd\u6570\u5f0f\u7ec4\u4ef6\u4e2d\uff0c\u65e0\u6cd5\u50cf\u7c7b\u7ec4\u4ef6\u4e00\u6837\u7ee7\u627fPureComponent\u3002\u56e0\u4e3a\u51fd\u6570\u5f0f\u7ec4\u4ef6\u6ca1\u6709\u5b9e\u4f8b\uff0c\u65e0\u6cd5\u5728\u7ec4\u4ef6\u5185\u90e8\u7ef4\u62a4shouldComponentUpdate\u751f\u547d\u5468\u671f\u51fd\u6570\uff0c\u4e5f\u5c31\u65e0\u6cd5\u50cf\u7c7b\u7ec4\u4ef6\u4e00\u6837\u81ea\u52a8\u8fdb\u884c\u6d45\u6bd4\u8f83\u6765\u51b3\u5b9a\u662f\u5426\u66f4\u65b0\u7ec4\u4ef6\u3002"),(0,o.kt)("p",null,"\u4f46\u662f\u53ef\u4ee5\u901a\u8fc7React.memo()\u65b9\u6cd5\u6765\u5b9e\u73b0PureComponent\u7c7b\u4f3c\u7684\u4f18\u5316\u3002React.memo()\u662f\u4e00\u4e2a\u9ad8\u9636\u7ec4\u4ef6\uff0c\u53ef\u4ee5\u5c06\u51fd\u6570\u5f0f\u7ec4\u4ef6\u5305\u88c5\u8d77\u6765\uff0c\u8fd4\u56de\u4e00\u4e2a\u65b0\u7684\u7ec4\u4ef6\u3002React.memo()\u901a\u8fc7\u6bd4\u8f83\u524d\u540e\u4e24\u6b21\u7ec4\u4ef6\u63a5\u6536\u5230\u7684props\u662f\u5426\u6709\u53d8\u5316\u6765\u5224\u65ad\u662f\u5426\u9700\u8981\u91cd\u65b0\u6e32\u67d3\u7ec4\u4ef6\u3002"),(0,o.kt)("p",null,"\u4f8b\u5982\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import React from 'react';\n\nfunction MyComponent(props) {\n  // ...\n}\n\nexport default React.memo(MyComponent);\n\n")),(0,o.kt)("p",null,"\u8fd9\u6837\uff0c\u5f53\u7236\u7ec4\u4ef6\u91cd\u65b0\u6e32\u67d3\u5e76\u4f20\u9012\u7ed9MyComponent\u7684props\u6ca1\u6709\u53d8\u5316\u65f6\uff0cMyComponent\u5c31\u4e0d\u4f1a\u91cd\u65b0\u6e32\u67d3\uff0c\u4ece\u800c\u8fbe\u5230\u7c7b\u4f3cPureComponent\u7684\u6548\u679c\u3002"))}m.isMDXComponent=!0}}]);