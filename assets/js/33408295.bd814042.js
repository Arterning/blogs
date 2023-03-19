"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8055],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>f});var r=n(7294);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,s=function(e,t){if(null==e)return{};var n,r,s={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,s=e.mdxType,i=e.originalType,l=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),u=c(n),d=s,f=u["".concat(l,".").concat(d)]||u[d]||m[d]||i;return n?r.createElement(f,o(o({ref:t},p),{},{components:n})):r.createElement(f,o({ref:t},p))}));function f(e,t){var n=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var i=n.length,o=new Array(i);o[0]=d;var a={};for(var l in t)hasOwnProperty.call(t,l)&&(a[l]=t[l]);a.originalType=e,a[u]="string"==typeof e?e:s,o[1]=a;for(var c=2;c<i;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},2469:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>a,toc:()=>c});var r=n(7462),s=(n(7294),n(3905));const i={},o="eslint basic",a={unversionedId:"notes/eslint/eslint-basic",id:"notes/eslint/eslint-basic",title:"eslint basic",description:"* eslint\u548c\u63d2\u4ef6",source:"@site/docs/notes/eslint/01-eslint-basic.md",sourceDirName:"notes/eslint",slug:"/notes/eslint/eslint-basic",permalink:"/blogs/docs/notes/eslint/eslint-basic",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/eslint/01-eslint-basic.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{},sidebar:"notes",previous:{title:"docker file example",permalink:"/blogs/docs/notes/docker/example-file"},next:{title:"git ssh \u64cd\u4f5c",permalink:"/blogs/docs/notes/git/git ssh\u64cd\u4f5c"}},l={},c=[],p={toc:c},u="wrapper";function m(e){let{components:t,...n}=e;return(0,s.kt)(u,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"eslint-basic"},"eslint basic"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},"eslint\u548c\u63d2\u4ef6\neslint\u672c\u8eab\u662f\u4e00\u4e2a\u547d\u4ee4\u884c\u5de5\u5177\uff0c\u53ef\u4ee5\u901a\u8fc7eslint index.js \u68c0\u67e5\u6587\u4ef6\uff0c\u800c\u5b89\u88c5vscode\u63d2\u4ef6\u53ef\u4ee5\u5728vscode\u4e2d\u76f4\u63a5\u68c0\u67e5\u9519\u8bef\u3002")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},"\u914d\u7f6e\u6587\u4ef6"))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-javascript"},'{\n    "env": {\n        "browser": true,\n        "es2021": true\n    },\n    "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:react/jsx-runtime"],\n    "overrides": [\n    ],\n    "parserOptions": {\n        "ecmaVersion": "latest"\n    },\n    "rules": {\n        "prefer-destructuring": ["error", {\n            "array": false,\n            "object": true\n        }]\n    }\n}\n\n')))}m.isMDXComponent=!0}}]);