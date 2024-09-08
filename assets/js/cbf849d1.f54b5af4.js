"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9924],{224:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var r=n(2374);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=s(n),f=o,m=u["".concat(l,".").concat(f)]||u[f]||d[f]||a;return n?r.createElement(m,i(i({ref:t},p),{},{components:n})):r.createElement(m,i({ref:t},p))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=f;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[u]="string"==typeof e?e:o,i[1]=c;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},2882:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>c,toc:()=>s});var r=n(9963),o=(n(2374),n(224));const a={},i=void 0,c={unversionedId:"tutorial/css/\u6d6e\u52a8\u548c\u6e05\u9664\u6d6e\u52a8",id:"tutorial/css/\u6d6e\u52a8\u548c\u6e05\u9664\u6d6e\u52a8",title:"\u6d6e\u52a8\u548c\u6e05\u9664\u6d6e\u52a8",description:"",source:"@site/docs/tutorial/css/\u6d6e\u52a8\u548c\u6e05\u9664\u6d6e\u52a8.md",sourceDirName:"tutorial/css",slug:"/tutorial/css/\u6d6e\u52a8\u548c\u6e05\u9664\u6d6e\u52a8",permalink:"/blogs/docs/tutorial/css/\u6d6e\u52a8\u548c\u6e05\u9664\u6d6e\u52a8",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/tutorial/css/\u6d6e\u52a8\u548c\u6e05\u9664\u6d6e\u52a8.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorial",previous:{title:"\u602a\u5f02\u76d2\u6a21\u578b",permalink:"/blogs/docs/tutorial/css/\u602a\u5f02\u76d2\u6a21\u578b"},next:{title:"js object and map",permalink:"/blogs/docs/tutorial/es6/js object set map"}},l={},s=[],p={toc:s},u="wrapper";function d(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-css"},'<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta http-equiv="X-UA-Compatible" content="ie=edge">\n    <title>\u4f2a\u5143\u7d20\u6e05\u9664\u6d6e\u52a8</title>\n    <style>\n        /**\n        \u4e3a\u4e86\u6d88\u9664\u6d6e\u52a8\u9020\u6210\u7684\u5f71\u54cd\uff0c\u5728clearfix\u540e\u9762\u63d2\u5165\u4e00\u4e2a\u5757\u7ea7\u5143\u7d20\uff0c\u4e0d\u663e\u793a\uff0c\u9ad8\u5ea6\u4e3a0\n        \u8fd9\u6837\u5728footer\u7684\u4e0a\u9762\u5c31\u6709\u4e86\u4e00\u4e2a\u9075\u5faa\u6587\u6863\u6d41\u7684div\u5143\u7d20\uff0c\u8fd9\u6837\u4e00\u6765footer\u5c31\u4e0d\u4f1a\u8df3\u5230\u4e0a\u9762\u53bb\u4e86\n        \u4e5f\u5c31\u4e0d\u4f1a\u88ab\u6d6e\u52a8\u5f71\u54cd\u539f\u672c\u7684\u6587\u6863\u6d41\u4f4d\u7f6e\u4e86\u3002\n        **/\n        .clearfix:after {\n            content: "";\n            display: block;\n            height: 0;\n            clear: both;\n            visibility: hidden;\n        }\n\n        .clearfix {\n            /* IE6\u30017 \u4e13\u6709 */\n            *zoom: 1;\n        }\n\n        .box {\n            width: 800px;\n            border: 1px solid blue;\n            margin: 0 auto;\n        }\n\n        .damao {\n            float: left;\n            width: 300px;\n            height: 200px;\n            background-color: purple;\n        }\n\n        .ermao {\n            float: left;\n            width: 200px;\n            height: 200px;\n            background-color: pink;\n        }\n\n        .footer {\n            height: 200px;\n            background-color: black;\n        }\n    </style>\n</head>\n\n<body>\n    <div class="box clearfix">\n        <div class="damao">\u5927\u6bdb</div>\n        <div class="ermao">\u4e8c\u6bdb</div>\n    </div>\n    <div class="footer"></div>\n\n</body>\n\n</html>\n')))}d.isMDXComponent=!0}}]);