"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5866],{224:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>d});var n=r(2374);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=n.createContext({}),i=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=i(e.components);return n.createElement(u.Provider,{value:t},e.children)},s="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,u=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),s=i(r),y=a,d=s["".concat(u,".").concat(y)]||s[y]||m[y]||l;return r?n.createElement(d,o(o({ref:t},p),{},{components:r})):n.createElement(d,o({ref:t},p))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,o=new Array(l);o[0]=y;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c[s]="string"==typeof e?e:a,o[1]=c;for(var i=2;i<l;i++)o[i]=r[i];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}y.displayName="MDXCreateElement"},5036:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>o,default:()=>m,frontMatter:()=>l,metadata:()=>c,toc:()=>i});var n=r(9963),a=(r(2374),r(224));const l={},o=void 0,c={unversionedId:"tutorial/mysql/\u6570\u636e\u7c7b\u578b",id:"tutorial/mysql/\u6570\u636e\u7c7b\u578b",title:"\u6570\u636e\u7c7b\u578b",description:"\u6570\u503c\u7c7b\u578b",source:"@site/docs/tutorial/mysql/\u6570\u636e\u7c7b\u578b.md",sourceDirName:"tutorial/mysql",slug:"/tutorial/mysql/\u6570\u636e\u7c7b\u578b",permalink:"/blogs/docs/tutorial/mysql/\u6570\u636e\u7c7b\u578b",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/tutorial/mysql/\u6570\u636e\u7c7b\u578b.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorial",previous:{title:"\u5b57\u7b26\u96c6",permalink:"/blogs/docs/tutorial/mysql/\u5b57\u7b26\u96c6"},next:{title:"\u7d22\u5f15\u4ec0\u4e48\u60c5\u51b5\u4e0b\u4f1a\u5931\u6548",permalink:"/blogs/docs/tutorial/mysql/\u7d22\u5f15\u4ec0\u4e48\u60c5\u51b5\u4e0b\u4f1a\u5931\u6548"}},u={},i=[{value:"\u6570\u503c\u7c7b\u578b",id:"\u6570\u503c\u7c7b\u578b",level:2},{value:"\u65e5\u671f\u548c\u65f6\u95f4\u7c7b\u578b",id:"\u65e5\u671f\u548c\u65f6\u95f4\u7c7b\u578b",level:2},{value:"\u5b57\u7b26\u7c7b\u578b",id:"\u5b57\u7b26\u7c7b\u578b",level:2},{value:"char\u548cvarchar",id:"char\u548cvarchar",level:2}],p={toc:i},s="wrapper";function m(e){let{components:t,...r}=e;return(0,a.kt)(s,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"\u6570\u503c\u7c7b\u578b"},"\u6570\u503c\u7c7b\u578b"),(0,a.kt)("p",null,"\u8fd9\u4e9b\u7c7b\u578b\u5305\u62ec\u4e25\u683c\u6570\u503c\u6570\u636e\u7c7b\u578b(INTEGER\u3001SMALLINT\u3001DECIMAL \u548c NUMERIC)\uff0c\u4ee5\u53ca\u8fd1\u4f3c\u6570\u503c\u6570\u636e\u7c7b\u578b(FLOAT\u3001REAL \u548c DOUBLE PRECISION)\u3002"),(0,a.kt)("p",null,"\u5173\u952e\u5b57INT\u662fINTEGER\u7684\u540c\u4e49\u8bcd\uff0c\u5173\u952e\u5b57DEC\u662fDECIMAL\u7684\u540c\u4e49\u8bcd\u3002"),(0,a.kt)("h2",{id:"\u65e5\u671f\u548c\u65f6\u95f4\u7c7b\u578b"},"\u65e5\u671f\u548c\u65f6\u95f4\u7c7b\u578b"),(0,a.kt)("p",null,"\u8868\u793a\u65f6\u95f4\u503c\u7684\u65e5\u671f\u548c\u65f6\u95f4\u7c7b\u578b\u4e3aDATETIME\u3001DATE\u3001TIMESTAMP\u3001TIME\u548cYEAR\u3002"),(0,a.kt)("h2",{id:"\u5b57\u7b26\u7c7b\u578b"},"\u5b57\u7b26\u7c7b\u578b"),(0,a.kt)("p",null,"\u5b57\u7b26\u4e32\u7c7b\u578b\u6307CHAR\u3001VARCHAR\u3001BINARY\u3001VARBINARY\u3001BLOB\u3001TEXT\u3001ENUM\u548cSET"),(0,a.kt)("h2",{id:"char\u548cvarchar"},"char\u548cvarchar"),(0,a.kt)("p",null,"\u5728\u8bbe\u8ba1\u6570\u636e\u5e93\u7684\u65f6\u5019\u7ecf\u5e38\u5b9a\u4e49varchar\u5b57\u6bb5 ,\u4f46\u662f\u8be6\u7ec6\u7684\u533a\u522b\u8fd8\u771f\u4e0d\u662f\u7279\u522b\u6e05\u695a"),(0,a.kt)("p",null,"char\u7684\u957f\u5ea6\u662f\u4e0d\u53ef\u53d8\u7684\uff0c\u800cvarchar\u7684\u957f\u5ea6\u662f\u53ef\u53d8\u7684\u3002"),(0,a.kt)("p",null,"\u5b9a\u4e49\u4e00\u4e2achar","[10]","\u548cvarchar","[10]","\u3002"),(0,a.kt)("p",null,"\u5982\u679c\u5b58\u8fdb\u53bb\u7684\u662f\u2018tao\u2019,\u90a3\u4e48char\u6240\u5360\u7684\u957f\u5ea6\u4f9d\u7136\u4e3a3\uff0c\u9664\u4e86\u5b57\u7b26\u2018tao\u2019\u5916\uff0c\u540e\u9762\u8ddf7\u4e2a\u7a7a\u683c\uff0cvarchar\u5c31\u7acb\u9a6c\u628a\u957f\u5ea6\u53d8\u4e3a3\u4e86\uff0c\u53d6\u6570\u636e\u7684\u65f6\u5019\uff0cchar\u7c7b\u578b\u7684\u8981\u7528trim()\u53bb\u6389\u591a\u4f59\u7684\u7a7a\u683c\uff0c\u800cvarchar\u662f\u4e0d\u9700\u8981\u7684\u3002"),(0,a.kt)("p",null,"char\u7684\u5b58\u53d6\u901f\u5ea6\u8fd8\u662f\u8981\u6bd4varchar\u8981\u5feb\u5f97\u591a\uff0c\u56e0\u4e3a\u5176\u957f\u5ea6\u56fa\u5b9a\uff0c\u65b9\u4fbf\u7a0b\u5e8f\u7684\u5b58\u50a8\u4e0e\u67e5\u627e\u3002"),(0,a.kt)("p",null,"char\u4e5f\u4e3a\u6b64\u4ed8\u51fa\u7684\u662f\u7a7a\u95f4\u7684\u4ee3\u4ef7\uff0c\u56e0\u4e3a\u5176\u957f\u5ea6\u56fa\u5b9a\uff0c\u6240\u4ee5\u96be\u514d\u4f1a\u6709\u591a\u4f59\u7684\u7a7a\u683c\u5360\u4f4d\u7b26\u5360\u636e\u7a7a\u95f4\uff0c\u53ef\u8c13\u662f\u4ee5\u7a7a\u95f4\u6362\u53d6\u65f6\u95f4\u6548\u7387\u3002"),(0,a.kt)("p",null,"varchar\u662f\u4ee5\u7a7a\u95f4\u6548\u7387\u4e3a\u9996\u4f4d\u3002"),(0,a.kt)("p",null,"char\u7684\u5b58\u50a8\u65b9\u5f0f\u662f\uff1a\u5bf9\u82f1\u6587\u5b57\u7b26\uff08ASCII\uff09\u5360\u75281\u4e2a\u5b57\u8282\uff0c\u5bf9\u4e00\u4e2a\u6c49\u5b57\u5360\u7528\u4e24\u4e2a\u5b57\u8282\u3002\nvarchar\u7684\u5b58\u50a8\u65b9\u5f0f\u662f\uff1a\u5bf9\u6bcf\u4e2a\u82f1\u6587\u5b57\u7b26\u5360\u75282\u4e2a\u5b57\u8282\uff0c\u6c49\u5b57\u4e5f\u5360\u75282\u4e2a\u5b57\u8282\u3002"),(0,a.kt)("p",null,"\u4e24\u8005\u7684\u5b58\u50a8\u6570\u636e\u90fd\u975eunicode\u7684\u5b57\u7b26\u6570\u636e\u3002"),(0,a.kt)("p",null,"nchar\u548cnvarchar\u662f\u5b58\u50a8\u7684unicode\u5b57\u7b26\u4e32\u6570\u636e"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://www.runoob.com/mysql/mysql-data-types.html"},"https://www.runoob.com/mysql/mysql-data-types.html")))}m.isMDXComponent=!0}}]);