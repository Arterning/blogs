"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1561],{8015:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var r=n(757);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},c="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),c=u(n),f=a,m=c["".concat(l,".").concat(f)]||c[f]||h[f]||o;return n?r.createElement(m,i(i({ref:t},p),{},{components:n})):r.createElement(m,i({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=f;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[c]="string"==typeof e?e:a,i[1]=s;for(var u=2;u<o;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},8774:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>u});var r=n(1227),a=(n(757),n(8015));const o={},i=void 0,s={unversionedId:"tutorial/es6/\u7bad\u5934\u51fd\u6570\u7684this",id:"tutorial/es6/\u7bad\u5934\u51fd\u6570\u7684this",title:"\u7bad\u5934\u51fd\u6570\u7684this",description:"\u666e\u901a\u51fd\u6570\u7684this",source:"@site/docs/tutorial/es6/\u7bad\u5934\u51fd\u6570\u7684this.md",sourceDirName:"tutorial/es6",slug:"/tutorial/es6/\u7bad\u5934\u51fd\u6570\u7684this",permalink:"/blogs/docs/tutorial/es6/\u7bad\u5934\u51fd\u6570\u7684this",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/tutorial/es6/\u7bad\u5934\u51fd\u6570\u7684this.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorial",previous:{title:"\u5e38\u7528api",permalink:"/blogs/docs/tutorial/es6/\u5e38\u7528api"},next:{title:"go \u6a21\u5757\u5316\u57fa\u7840",permalink:"/blogs/docs/tutorial/go/Go CLI"}},l={},u=[{value:"\u666e\u901a\u51fd\u6570\u7684this",id:"\u666e\u901a\u51fd\u6570\u7684this",level:2},{value:"\u7bad\u5934\u51fd\u6570\u7684this",id:"\u7bad\u5934\u51fd\u6570\u7684this",level:2}],p={toc:u},c="wrapper";function h(e){let{components:t,...n}=e;return(0,a.kt)(c,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"\u666e\u901a\u51fd\u6570\u7684this"},"\u666e\u901a\u51fd\u6570\u7684this"),(0,a.kt)("p",null,"\u666e\u901a\u51fd\u6570\u7684this \u548cjava\u4e2d\u7684this\u662f\u4e00\u6837\u7684\uff0c\u5c31\u662f\u51fd\u6570\u7684\u8c03\u7528\u8005"),(0,a.kt)("p",null,"\u5728\u7bad\u5934\u51fd\u6570\u51fa\u73b0\u4e4b\u524d\uff0c\u6bcf\u4e00\u4e2a\u65b0\u51fd\u6570\u6839\u636e\u5b83\u662f\u88ab\u5982\u4f55\u8c03\u7528\u7684\u6765\u5b9a\u4e49\u8fd9\u4e2a\u51fd\u6570\u7684 this \u503c\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u5982\u679c\u8be5\u51fd\u6570\u662f\u4e00\u4e2a\u6784\u9020\u51fd\u6570\uff0cthis \u6307\u9488\u6307\u5411\u4e00\u4e2a\u65b0\u7684\u5bf9\u8c61"),(0,a.kt)("li",{parentName:"ul"},"\u5728\u4e25\u683c\u6a21\u5f0f\u4e0b\u7684\u51fd\u6570\u8c03\u7528\u4e0b\uff0cthis \u6307\u5411undefined"),(0,a.kt)("li",{parentName:"ul"},"\u5982\u679c\u8be5\u51fd\u6570\u662f\u4e00\u4e2a\u5bf9\u8c61\u7684\u65b9\u6cd5\uff0c\u5219\u5b83\u7684 this \u6307\u9488\u6307\u5411\u8fd9\u4e2a\u5bf9\u8c61")),(0,a.kt)("p",null,"This\u88ab\u8bc1\u660e\u662f\u4ee4\u4eba\u538c\u70e6\u7684\u9762\u5411\u5bf9\u8c61\u98ce\u683c\u7684\u7f16\u7a0b\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"function Person() {\n  // Person() \u6784\u9020\u51fd\u6570\u5b9a\u4e49 `this`\u4f5c\u4e3a\u5b83\u81ea\u5df1\u7684\u5b9e\u4f8b\u3002\n  this.age = 0;\n\n  setInterval(function growUp() {\n    // \u5728\u975e\u4e25\u683c\u6a21\u5f0f\uff0cgrowUp() \u51fd\u6570\u5b9a\u4e49 `this`\u4f5c\u4e3a\u5168\u5c40\u5bf9\u8c61\uff0c\n    // \u4e0e\u5728 Person() \u6784\u9020\u51fd\u6570\u4e2d\u5b9a\u4e49\u7684 `this`\u5e76\u4e0d\u76f8\u540c\u3002\n    this.age++;\n  }, 1000);\n}\n\nvar p = new Person();\n")),(0,a.kt)("p",null,"\u5728\u4e0a\u9762\u8fd9\u4e2a\u4f8b\u5b50\u4e2d\uff0cthis.age \u5e76\u4e0d\u6307\u5411Person\u4e2d\u7684age\n\u56e0\u4e3agroupUp\u56de\u8c03\u51fd\u6570\u5e76\u4e0d\u662f\u901a\u8fc7Person\u5bf9\u8c61\u8c03\u7528\u7684"),(0,a.kt)("h2",{id:"\u7bad\u5934\u51fd\u6570\u7684this"},"\u7bad\u5934\u51fd\u6570\u7684this"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"\u7bad\u5934\u51fd\u6570\u6ca1\u6709\u81ea\u5df1\u7684this\u6307\u5411"),"\uff0c\u5b83\u7684this\u6307\u5411\u4e0a\u4e00\u7ea7\u4f5c\u7528\u57df\u7684this"),(0,a.kt)("p",null,"\u4e0b\u9762\u8fd9\u4e2a\u4f8b\u5b50setInterval\u4e2d\u7684\u7bad\u5934\u51fd\u6570\u7684\u4e0a\u4e00\u5c42\u662fPerson\uff0c\u56e0\u4e3a\u4ed6\u4e0a\u4e00\u5c42\u6709\u4e00\u4e2a\u51fd\u6570Person,\u6240\u4ee5\u8fd9\u4e2a\u5916\u5c42\uff0c\u6307\u7684\u662f\u51fd\u6570\u3002"),(0,a.kt)("p",null,"\u7bad\u5934\u51fd\u6570\u4f1a\u7ee7\u627f\u5916\u5c42\u51fd\u6570\u7684this\u503c"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"function Person(){\n    this.age = 0;\n\n    setInterval(() => {\n        this.age++; // |this| \u6b63\u786e\u5730\u6307\u5411 p \u5b9e\u4f8b\n    }, 1000);\n}\n\nvar p = new Person();\n")),(0,a.kt)("p",null,"\u5982\u679c\u7bad\u5934\u51fd\u6570\u5916\u9762\u6ca1\u6709\u5305\u88f9\u51fd\u6570\uff0c\u90a3\u4e48\u5b83\u5c31\u662f\u6307\u5411this"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"const obj = {\n    a: () => {\n        console.log(this);\n    }\n}\nobj.a();\n")))}h.isMDXComponent=!0}}]);