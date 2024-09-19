"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2774],{8015:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>y});var r=n(757);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),i=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=i(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),u=i(n),m=o,y=u["".concat(s,".").concat(m)]||u[m]||d[m]||a;return n?r.createElement(y,l(l({ref:t},c),{},{components:n})):r.createElement(y,l({ref:t},c))}));function y(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,l=new Array(a);l[0]=m;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p[u]="string"==typeof e?e:o,l[1]=p;for(var i=2;i<a;i++)l[i]=n[i];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6766:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>d,frontMatter:()=>a,metadata:()=>p,toc:()=>i});var r=n(1227),o=(n(757),n(8015));const a={},l=void 0,p={unversionedId:"tutorial/node/\u5173\u4e8epackage.json\u4e2dtype\u5c5e\u6027\u7684\u542b\u4e49",id:"tutorial/node/\u5173\u4e8epackage.json\u4e2dtype\u5c5e\u6027\u7684\u542b\u4e49",title:"\u5173\u4e8epackage.json\u4e2dtype\u5c5e\u6027\u7684\u542b\u4e49",description:"Javascript\u7684\u6a21\u5757\u5316\u5305\u62ec\u6709CMD\u3001AMD\u3001UMD\u3001CommonJS\u3001ES Module\u7b49\u89c4\u8303\u3002\u800cNodeJS\u7684\u6a21\u5757\u5316\u65b9\u6848\u6b63\u662f\u91c7\u7528CommonJS\u89c4\u8303\u3002",source:"@site/docs/tutorial/node/\u5173\u4e8epackage.json\u4e2dtype\u5c5e\u6027\u7684\u542b\u4e49.md",sourceDirName:"tutorial/node",slug:"/tutorial/node/\u5173\u4e8epackage.json\u4e2dtype\u5c5e\u6027\u7684\u542b\u4e49",permalink:"/blogs/docs/tutorial/node/\u5173\u4e8epackage.json\u4e2dtype\u5c5e\u6027\u7684\u542b\u4e49",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/tutorial/node/\u5173\u4e8epackage.json\u4e2dtype\u5c5e\u6027\u7684\u542b\u4e49.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorial",previous:{title:"\u5173\u4e8eawait\u662f\u5426\u4f1a\u963b\u585enodejs\u4e3b\u7ebf\u7a0b",permalink:"/blogs/docs/tutorial/node/\u5173\u4e8eawait\u662f\u5426\u4f1a\u963b\u585enodejs\u4e3b\u7ebf\u7a0b"},next:{title:"\u540c\u6b65\u548c\u5f02\u6b65\u7684\u6982\u5ff5",permalink:"/blogs/docs/tutorial/node/\u540c\u6b65\u548c\u5f02\u6b65\u7684\u6982\u5ff5"}},s={},i=[{value:"NodeJS\u652f\u6301ES6\u6a21\u5757\u5316",id:"nodejs\u652f\u6301es6\u6a21\u5757\u5316",level:3},{value:"\u603b\u7ed3\u8bf4\u660e",id:"\u603b\u7ed3\u8bf4\u660e",level:3}],c={toc:i},u="wrapper";function d(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Javascript\u7684\u6a21\u5757\u5316\u5305\u62ec\u6709CMD\u3001AMD\u3001UMD\u3001CommonJS\u3001ES Module\u7b49\u89c4\u8303\u3002\u800cNodeJS\u7684\u6a21\u5757\u5316\u65b9\u6848\u6b63\u662f\u91c7\u7528CommonJS\u89c4\u8303\u3002"),(0,o.kt)("p",null,"\u6211\u4eec\u8fd9\u91cc\u4e0d\u5c55\u5f00\u5bf9\u4ee5\u4e0a\u51e0\u79cd\u6a21\u5757\u5316\u65b9\u6848\u7684\u7ec6\u8282\u8ba8\u8bba\uff0c\u6211\u4eec\u5173\u5fc3\u7684\u662fpackage.json\u4e2d\u7684type\u5c5e\u6027\u5b9a\u4e49\u3002"),(0,o.kt)("h3",{id:"nodejs\u652f\u6301es6\u6a21\u5757\u5316"},"NodeJS\u652f\u6301ES6\u6a21\u5757\u5316"),(0,o.kt)("p",null,"\u5728\u65e9\u671f\u7684nodejs\u7248\u672c\u4e2d\uff0cnode\u4ec5\u652f\u6301Commonjs\u6a21\u5757\u5316\u65b9\u6848\uff0c\u4e0d\u8fc7\u5728nodejs\u7248\u672c",(0,o.kt)("strong",{parentName:"p"},"13.2.0"),"\u4e2d\uff0cnode\u6b63\u5f0f\u652f\u6301ES Modules\u6a21\u5757\u5316\uff0c\u5728package.json\u4e2d\u7684type\u5b57\u6bb5\u58f0\u660e"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'{\n  "type": "module",\n  "scripts": {\n    "start": "node index.js",\n    "test": "echo \\"Error: no test specified\\" && exit 1"\n  }\n}\n')),(0,o.kt)("h3",{id:"\u603b\u7ed3\u8bf4\u660e"},"\u603b\u7ed3\u8bf4\u660e"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"type\u5b57\u6bb5\u7528\u4e8e\u5b9a\u4e49package.json\u6587\u4ef6\u548c\u8be5\u6587\u4ef6\u6240\u5728\u76ee\u5f55\u6839\u76ee\u5f55\u4e2d ",(0,o.kt)("strong",{parentName:"li"},".js"),"\u6587\u4ef6\u548c",(0,o.kt)("strong",{parentName:"li"},"\u65e0\u6269\u5c55\u540d"),"\u6587\u4ef6\u7684\u6a21\u5757\u5316\u5904\u7406\u89c4\u8303\uff0c\u9ed8\u8ba4\u503c\u4e3a'commonjs'\u3002"),(0,o.kt)("li",{parentName:"ol"},"type\u5b57\u6bb5\u7701\u7565\u5219\u9ed8\u8ba4\u91c7\u7528commonjs\u89c4\u8303"),(0,o.kt)("li",{parentName:"ol"},"\u5f53type\u5b57\u6bb5\u6307\u5b9a\u503c\u4e3a",(0,o.kt)("strong",{parentName:"li"},"module"),"\u5219\u91c7\u7528ESModule\u89c4\u8303"),(0,o.kt)("li",{parentName:"ol"},"node\u5b98\u65b9\u5efa\u8bae\u5305\u7684\u5f00\u53d1\u8005\u660e\u786e\u6307\u5b9apackage.json\u4e2d\u7684type\u5b57\u6bb5\u503c"),(0,o.kt)("li",{parentName:"ol"},"\u4e0d\u8bbapackage.json\u4e2d\u7684type\u5b57\u6bb5\u4e3a\u4f55\u503c\uff0c",(0,o.kt)("strong",{parentName:"li"},".mjs"),"\u7684\u6587\u4ef6\u90fd\u6309\u7167es\u6a21\u5757\u6765\u5904\u7406\uff0c",(0,o.kt)("strong",{parentName:"li"},".cjs"),"\u7684\u6587\u4ef6\u90fd\u6309\u7167commonjs\u6a21\u5757\u6765\u5904\u7406")))}d.isMDXComponent=!0}}]);