"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9463],{8015:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>d});var n=r(757);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),s=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):p(p({},t),e)),r},c=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},g=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),m=s(r),g=a,d=m["".concat(l,".").concat(g)]||m[g]||u[g]||o;return r?n.createElement(d,p(p({ref:t},c),{},{components:r})):n.createElement(d,p({ref:t},c))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,p=new Array(o);p[0]=g;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[m]="string"==typeof e?e:a,p[1]=i;for(var s=2;s<o;s++)p[s]=r[s];return n.createElement.apply(null,p)}return n.createElement.apply(null,r)}g.displayName="MDXCreateElement"},5786:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>p,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>s});var n=r(1227),a=(r(757),r(8015));const o={},p=void 0,i={unversionedId:"tutorial/postgres/\u4f7f\u7528PostgreSQL\u63d2\u4ef6pgvector\u5b9e\u73b0\u9ad8\u7ef4\u5411\u91cf\u68c0\u7d22",id:"tutorial/postgres/\u4f7f\u7528PostgreSQL\u63d2\u4ef6pgvector\u5b9e\u73b0\u9ad8\u7ef4\u5411\u91cf\u68c0\u7d22",title:"\u4f7f\u7528PostgreSQL\u63d2\u4ef6pgvector\u5b9e\u73b0\u9ad8\u7ef4\u5411\u91cf\u68c0\u7d22",description:"\u63d2\u4ef6\u7ba1\u7406",source:"@site/docs/tutorial/postgres/\u4f7f\u7528PostgreSQL\u63d2\u4ef6pgvector\u5b9e\u73b0\u9ad8\u7ef4\u5411\u91cf\u68c0\u7d22.md",sourceDirName:"tutorial/postgres",slug:"/tutorial/postgres/\u4f7f\u7528PostgreSQL\u63d2\u4ef6pgvector\u5b9e\u73b0\u9ad8\u7ef4\u5411\u91cf\u68c0\u7d22",permalink:"/blogs/docs/tutorial/postgres/\u4f7f\u7528PostgreSQL\u63d2\u4ef6pgvector\u5b9e\u73b0\u9ad8\u7ef4\u5411\u91cf\u68c0\u7d22",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/tutorial/postgres/\u4f7f\u7528PostgreSQL\u63d2\u4ef6pgvector\u5b9e\u73b0\u9ad8\u7ef4\u5411\u91cf\u68c0\u7d22.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorial",previous:{title:"php\u6574\u5408apache",permalink:"/blogs/docs/tutorial/php/php\u6574\u5408apache"},next:{title:"\u5982\u4f55\u5728 PostgreSQL \u6570\u636e\u5e93\u4e0a\u6267\u884c\u5168\u6587\u641c\u7d22",permalink:"/blogs/docs/tutorial/postgres/\u5982\u4f55\u5728 PostgreSQL \u6570\u636e\u5e93\u4e0a\u6267\u884c\u5168\u6587\u641c\u7d22"}},l={},s=[{value:"<strong>\u63d2\u4ef6\u7ba1\u7406</strong>",id:"\u63d2\u4ef6\u7ba1\u7406",level:2},{value:"<strong>\u4f7f\u7528\u793a\u4f8b</strong>",id:"\u4f7f\u7528\u793a\u4f8b",level:2}],c={toc:s},m="wrapper";function u(e){let{components:t,...r}=e;return(0,a.kt)(m,(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"\u63d2\u4ef6\u7ba1\u7406"},(0,a.kt)("strong",{parentName:"h2"},"\u63d2\u4ef6\u7ba1\u7406")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u521b\u5efa\u63d2\u4ef6",(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"CREATE EXTENSION IF NOT EXISTS vector;\n"))),(0,a.kt)("li",{parentName:"ul"},"\u5220\u9664\u63d2\u4ef6",(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"DROP EXTENSION vector;\n"))),(0,a.kt)("li",{parentName:"ul"},"\u66f4\u65b0\u63d2\u4ef6",(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"ALTER EXTENSION vector UPDATE [ TO new_version ]\n")),"  ",(0,a.kt)("strong",{parentName:"li"},"\u8bf4\u660e"),"  ",(0,a.kt)("strong",{parentName:"li"},"new_version"),"\u914d\u7f6e\u4e3apgvector\u7684\u7248\u672c\uff0cpgvector\u7684\u6700\u65b0\u7248\u672c\u53f7\u53ca\u76f8\u5173\u7279\u6027\uff0c\u8bf7\u53c2\u89c1",(0,a.kt)("a",{parentName:"li",href:"https://pgxn.org/dist/vector/#query-options"},"pgvector\u5b98\u65b9\u6587\u6863"),"\u3002")),(0,a.kt)("h2",{id:"\u4f7f\u7528\u793a\u4f8b"},(0,a.kt)("strong",{parentName:"h2"},"\u4f7f\u7528\u793a\u4f8b")),(0,a.kt)("p",null,"\u5982\u4e0b\u4ec5\u662f\u5bf9pgvector\u7684\u7b80\u5355\u4f7f\u7528\u793a\u4f8b\uff0c\u66f4\u591a\u4f7f\u7528\u65b9\u6cd5\uff0c\u8bf7\u53c2\u89c1",(0,a.kt)("a",{parentName:"p",href:"https://pgxn.org/dist/vector/#query-options"},"pgvector\u5b98\u65b9\u6587\u6863"),"\u3002"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u521b\u5efa\u4e00\u4e2a\u5b58\u50a8vector\u7c7b\u578b\u7684\u8868\uff08items\uff09\uff0c\u7528\u4e8e\u5b58\u50a8embeddings\u3002"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"CREATE TABLE items (\n  id bigserial PRIMARY KEY, \n  item text, \n  embedding vector(2)\n);\n")),(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"\u8bf4\u660e")),(0,a.kt)("p",{parentName:"li"},"\u4e0a\u8ff0\u793a\u4f8b\u4e2d\uff0c\u4ee5\u4e8c\u7ef4\u4e3a\u4f8b\uff0cpgvector\u6700\u5927\u652f\u6301\u521b\u5efa16000\u7ef4\u5ea6\u7684\u5411\u91cf\u3002")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u5c06\u5411\u91cf\u6570\u636e\u63d2\u5165\u8868\u4e2d\u3002"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"INSERT INTO\n  items (item, embedding)\nVALUES\n  ('\u82f9\u679c', '[1, 1]'),\n  ('\u9999\u8549', '[1.2, 0.8]'),\n  ('\u732b', '[6, 0.4]');\n"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u4f7f\u7528\u4f59\u5f26\u76f8\u4f3c\u5ea6\u64cd\u4f5c\u7b26",(0,a.kt)("inlineCode",{parentName:"p"},"<=>"),"\u8ba1\u7b97\u9999\u8549\u4e0e\u82f9\u679c\u3001\u732b\u4e4b\u95f4\u7684\u76f8\u4f3c\u5ea6\u3002"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"SELECT\n  item,\n  1 - (embedding <=> '[1.2, 0.8]') AS cosine_similarity\nFROM\n  items\nORDER BY\n  cosine_similarity DESC;\n")),(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"\u8bf4\u660e")),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"\u5728\u4e0a\u8ff0\u793a\u4f8b\u4e2d\uff0c\u4f7f\u7528\u516c\u5f0f",(0,a.kt)("inlineCode",{parentName:"li"},"cosine_similarity = 1 - cosine_distance"),"\u8fdb\u884c\u8ba1\u7b97\uff0c\u8ddd\u79bb\u8d8a\u8fd1\uff0c\u76f8\u4f3c\u5ea6\u8d8a\u9ad8\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u60a8\u4e5f\u53ef\u4ee5\u4f7f\u7528\u6b27\u6c0f\u8ddd\u79bb\u64cd\u4f5c\u7b26",(0,a.kt)("inlineCode",{parentName:"li"},"<->"),"\u6216\u5185\u79ef\u8fd0\u7b97\u64cd\u4f5c\u7b26",(0,a.kt)("inlineCode",{parentName:"li"},"<#>"),"\u8ba1\u7b97\u76f8\u4f3c\u5ea6\u3002")),(0,a.kt)("p",{parentName:"li"},"\u7ed3\u679c\u793a\u4f8b\uff1a"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"item | cosine_similarity\n------+--------------------\n \u9999\u8549 |                  1\n \u82f9\u679c |  0.980580680748848\n \u732b   |  0.867105556566985\n")),(0,a.kt)("p",{parentName:"li"},"\u5728\u4e0a\u8ff0\u7ed3\u679c\u4e2d\uff1a"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"\u9999\u8549\u7ed3\u679c\u4e3a1\uff0c\u8868\u793a\u5b8c\u5168\u5339\u914d\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u82f9\u679c\u7684\u7ed3\u679c\u4e3a0.98\uff0c\u8868\u793a\u82f9\u679c\u4e0e\u9999\u8549\u9ad8\u5ea6\u76f8\u4f3c\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u732b\u7684\u7ed3\u679c\u4e3a0.86\uff0c\u8868\u793a\u732b\u4e0e\u9999\u8549\u76f8\u4f3c\u5ea6\u8f83\u4f4e\u3002")))))}u.isMDXComponent=!0}}]);