"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6893],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>d});var r=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var n=e.components,l=e.mdxType,a=e.originalType,p=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),c=s(n),y=l,d=c["".concat(p,".").concat(y)]||c[y]||m[y]||a;return n?r.createElement(d,i(i({ref:t},u),{},{components:n})):r.createElement(d,i({ref:t},u))}));function d(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var a=n.length,i=new Array(a);i[0]=y;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o[c]="string"==typeof e?e:l,i[1]=o;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}y.displayName="MDXCreateElement"},2104:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>m,frontMatter:()=>a,metadata:()=>o,toc:()=>s});var r=n(7462),l=(n(7294),n(3905));const a={},i=void 0,o={unversionedId:"notes/mysql/mysql \u5b57\u6bb5\u7c7b\u578b",id:"notes/mysql/mysql \u5b57\u6bb5\u7c7b\u578b",title:"mysql \u5b57\u6bb5\u7c7b\u578b",description:"\u57fa\u7840",source:"@site/docs/notes/mysql/mysql \u5b57\u6bb5\u7c7b\u578b.md",sourceDirName:"notes/mysql",slug:"/notes/mysql/mysql \u5b57\u6bb5\u7c7b\u578b",permalink:"/blogs/docs/notes/mysql/mysql \u5b57\u6bb5\u7c7b\u578b",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/mysql/mysql \u5b57\u6bb5\u7c7b\u578b.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"\u57fa\u672c\u6982\u5ff5",permalink:"/blogs/docs/notes/hyperledger-fabric/base-concept"},next:{title:"mysql \u5b57\u7b26\u96c6",permalink:"/blogs/docs/notes/mysql/mysql \u5b57\u7b26\u96c6"}},p={},s=[{value:"\u57fa\u7840",id:"\u57fa\u7840",level:2}],u={toc:s},c="wrapper";function m(e){let{components:t,...n}=e;return(0,l.kt)(c,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"\u57fa\u7840"},"\u57fa\u7840"),(0,l.kt)("p",null,"MySQL \u6709\u4ee5\u4e0b\u5e38\u89c1\u7684\u5b57\u6bb5\u7c7b\u578b\uff1a"),(0,l.kt)("p",null,"\u6570\u5b57\u7c7b\u578b\uff1a"),(0,l.kt)("p",null,"INT: \u6574\u6570\uff0c\u53d6\u503c\u8303\u56f4\u4e3a -2147483648 \u5230 2147483647\u3002\nBIGINT: \u5927\u6574\u6570\uff0c\u53d6\u503c\u8303\u56f4\u4e3a -9223372036854775808 \u5230 9223372036854775807\u3002\nSMALLINT: \u5c0f\u6574\u6570\uff0c\u53d6\u503c\u8303\u56f4\u4e3a -32768 \u5230 32767\u3002\nTINYINT: \u5fae\u5c0f\u6574\u6570\uff0c\u53d6\u503c\u8303\u56f4\u4e3a -128 \u5230 127\u3002\nDECIMAL: \u5341\u8fdb\u5236\u6570\uff0c\u7cbe\u786e\u5c0f\u6570\u3002\nFLOAT: \u5355\u7cbe\u5ea6\u6d6e\u70b9\u6570\u3002\nDOUBLE: \u53cc\u7cbe\u5ea6\u6d6e\u70b9\u6570\u3002\n\u5b57\u7b26\u4e32\u7c7b\u578b\uff1a"),(0,l.kt)("p",null,"CHAR: \u5b9a\u957f\u5b57\u7b26\u4e32\uff0c\u56fa\u5b9a\u957f\u5ea6\u4e3a 0 \u5230 255 \u4e2a\u5b57\u7b26\u3002\nVARCHAR: \u53d8\u957f\u5b57\u7b26\u4e32\uff0c\u957f\u5ea6\u4e3a 0 \u5230 65,535 \u4e2a\u5b57\u7b26\u3002\nTEXT: \u53ef\u5b58\u50a8\u5927\u91cf\u6587\u672c\uff0c\u957f\u5ea6\u4e3a 0 \u5230 2^32 - 1 \u4e2a\u5b57\u7b26\u3002\nBLOB: \u4e8c\u8fdb\u5236\u5927\u5bf9\u8c61\uff0c\u957f\u5ea6\u4e3a 0 \u5230 2^32 - 1 \u4e2a\u5b57\u7b26\u3002\n\u65e5\u671f\u548c\u65f6\u95f4\u7c7b\u578b\uff1a"),(0,l.kt)("p",null,"DATE: \u65e5\u671f\uff0c\u683c\u5f0f\u4e3a YYYY-MM-DD\u3002\nTIME: \u65f6\u95f4\uff0c\u683c\u5f0f\u4e3a HH:MM:SS\u3002\nDATETIME: \u65e5\u671f\u548c\u65f6\u95f4\uff0c\u683c\u5f0f\u4e3a YYYY-MM-DD HH:MM:SS\u3002\nYEAR: \u5e74\u4efd\uff0c\u683c\u5f0f\u4e3a YYYY\u3002\nTIMESTAMP: \u65f6\u95f4\u6233\uff0c\u683c\u5f0f\u4e3a YYYY-MM-DD HH:MM:SS\u3002\n\u5176\u4ed6\u7c7b\u578b\uff1a"),(0,l.kt)("p",null,"ENUM: \u679a\u4e3e\u7c7b\u578b\uff0c\u53ef\u4ee5\u5b58\u50a8\u56fa\u5b9a\u7684\u5b57\u7b26\u4e32\u5217\u8868\u3002\nSET: \u96c6\u5408\u7c7b\u578b\uff0c\u53ef\u4ee5\u5b58\u50a8\u591a\u4e2a"),(0,l.kt)("h1",{id:"\u5982\u679c\u662f\u4e3b\u952e-\u4f7f\u7528int\u8fd8\u662fbigint"},"\u5982\u679c\u662f\u4e3b\u952e \u4f7f\u7528int\u8fd8\u662fbigint"),(0,l.kt)("p",null,"\u4e00\u822c\u6765\u8bf4\uff0c\u5982\u679c\u662f\u4e3b\u952e\uff0c\u4f7f\u7528 bigint \u66f4\u597d\u3002"),(0,l.kt)("p",null,"\u56e0\u4e3a int \u7684\u53d6\u503c\u8303\u56f4\u662f -2147483648 \u5230 2147483647\uff0c\u800c bigint \u7684\u53d6\u503c\u8303\u56f4\u662f -9223372036854775808 \u5230 9223372036854775807\uff0c\u8fd9\u610f\u5473\u7740 bigint \u53ef\u4ee5\u5b58\u50a8\u66f4\u5927\u7684\u6574\u6570\uff0c\u5e76\u4e14\u4e0d\u4f1a\u51fa\u73b0\u6570\u636e\u6ea2\u51fa\u7684\u95ee\u9898\u3002"),(0,l.kt)("p",null,"\u6b64\u5916\uff0c\u5982\u679c\u4f60\u9884\u8ba1\u4f60\u7684\u6570\u636e\u8868\u4e2d\u53ef\u80fd\u4f1a\u5b58\u5728\u5927\u91cf\u6570\u636e\uff0c\u4f7f\u7528 bigint \u4f5c\u4e3a\u4e3b\u952e\u53ef\u4ee5\u786e\u4fdd\u4e3b\u952e\u503c\u6c38\u8fdc\u4e0d\u4f1a\u6ea2\u51fa\u3002"),(0,l.kt)("p",null,"\u56e0\u6b64\uff0c\u5982\u679c\u662f\u4e3b\u952e\uff0c\u5efa\u8bae\u4f7f\u7528 bigint\u3002"),(0,l.kt)("h1",{id:"datetime\u548ctimestamp\u533a\u522b"},"datetime\u548ctimestamp\u533a\u522b"),(0,l.kt)("p",null,"Datetime \u548c Timestamp \u5728 MySQL \u4e2d\u90fd\u662f\u7528\u6765\u5b58\u50a8\u65e5\u671f\u548c\u65f6\u95f4\u7684\u6570\u636e\u7c7b\u578b\uff0c\u4f46\u662f\u5b83\u4eec\u6709\u4e00\u4e9b\u91cd\u8981\u7684\u533a\u522b\uff1a"),(0,l.kt)("p",null,"\u5b58\u50a8\u8303\u56f4\uff1aDatetime \u7684\u53d6\u503c\u8303\u56f4\u662f '1000-01-01 00:00:00' \u5230 '9999-12-31 23:59:59'\uff0c\u800c Timestamp \u7684\u53d6\u503c\u8303\u56f4\u662f '1970-01-01 00:00:01' UTC \u5230 '2038-01-19 03:14:07' UTC\u3002"),(0,l.kt)("p",null,"\u7cbe\u5ea6\uff1aDatetime \u7cbe\u786e\u5230\u79d2\uff0c\u800c Timestamp \u7cbe\u786e\u5230\u5fae\u79d2\u3002"),(0,l.kt)("p",null,"\u6570\u636e\u81ea\u52a8\u66f4\u65b0\uff1a\u5982\u679c\u5c06\u4e00\u4e2a Timestamp \u5217\u5b9a\u4e49\u4e3a\u81ea\u52a8\u66f4\u65b0\uff0c\u5219\u6bcf\u6b21\u5bf9\u8be5\u5217\u7684\u66f4\u65b0\u64cd\u4f5c\u90fd\u4f1a\u66f4\u65b0\u5176\u503c\uff0c\u56e0\u6b64\u5b83\u53ef\u4ee5\u7528\u6765\u8bb0\u5f55\u6570\u636e\u7684\u66f4\u65b0\u65f6\u95f4\u3002\u800c Datetime \u5217\u5e76\u4e0d\u4f1a\u81ea\u52a8\u66f4\u65b0\u3002"),(0,l.kt)("p",null,"\u56e0\u6b64\uff0c\u5982\u679c\u4f60\u9700\u8981\u8bb0\u5f55\u4e00\u4e2a\u5177\u4f53\u7684\u65e5\u671f\u548c\u65f6\u95f4\uff0c\u5efa\u8bae\u4f7f\u7528 Datetime\uff1b\u5982\u679c\u9700\u8981\u8bb0\u5f55\u65f6\u95f4\u6233\uff08\u5373\u6570\u636e\u7684\u66f4\u65b0\u65f6\u95f4\uff09\uff0c\u5efa\u8bae\u4f7f\u7528 Timestamp\u3002"),(0,l.kt)("h1",{id:"char-\u548c-varchar\u7684\u533a\u522b"},"char \u548c varchar\u7684\u533a\u522b"),(0,l.kt)("p",null,"Char \u548c Varchar \u662f MySQL \u4e2d\u7528\u6765\u5b58\u50a8\u5b57\u7b26\u4e32\u6570\u636e\u7c7b\u578b\u7684\u4e24\u79cd\u6570\u636e\u7c7b\u578b\u3002\u4e0b\u9762\u662f\u5b83\u4eec\u7684\u4e3b\u8981\u533a\u522b\uff1a"),(0,l.kt)("p",null,"\u5b58\u50a8\u7a7a\u95f4\uff1aChar \u662f\u5b9a\u957f\u5b57\u7b26\u4e32\u6570\u636e\u7c7b\u578b\uff0c\u5373\u4e0d\u7ba1\u5b9e\u9645\u5b58\u50a8\u7684\u5b57\u7b26\u4e32\u957f\u5ea6\u591a\u5c11\uff0c\u90fd\u4f1a\u5360\u7528\u56fa\u5b9a\u7684\u7a7a\u95f4\uff1bVarchar \u662f\u53d8\u957f\u5b57\u7b26\u4e32\u6570\u636e\u7c7b\u578b\uff0c\u5373\u5b9e\u9645\u5360\u7528\u7684\u7a7a\u95f4\u4e0e\u5b58\u50a8\u7684\u5b57\u7b26\u4e32\u957f\u5ea6\u6210\u6b63\u6bd4\u3002"),(0,l.kt)("p",null,"\u6027\u80fd\uff1aVarchar \u7684\u5b58\u50a8\u6548\u7387\u66f4\u9ad8\uff0c\u56e0\u4e3a\u5b83\u53ea\u4f1a\u5360\u7528\u5b9e\u9645\u9700\u8981\u7684\u7a7a\u95f4\uff1bChar \u7684\u5b58\u50a8\u6548\u7387\u8f83\u4f4e\uff0c\u56e0\u4e3a\u5b83\u5360\u7528\u7684\u7a7a\u95f4\u53ef\u80fd\u8fdc\u5927\u4e8e\u5b9e\u9645\u9700\u8981\u7684\u7a7a\u95f4\u3002"),(0,l.kt)("p",null,"\u6392\u5e8f\u548c\u6bd4\u8f83\uff1a\u7531\u4e8e Char \u662f\u5b9a\u957f\u5b57\u7b26\u4e32\u6570\u636e\u7c7b\u578b\uff0c\u5728\u6392\u5e8f\u548c\u6bd4\u8f83\u5b57\u7b26\u4e32\u65f6\u901f\u5ea6\u66f4\u5feb\uff1b\u800c Varchar \u7531\u4e8e\u662f\u53d8\u957f\u5b57\u7b26\u4e32\u6570\u636e\u7c7b\u578b\uff0c\u5728\u6392\u5e8f\u548c\u6bd4\u8f83\u5b57\u7b26\u4e32\u65f6\u901f\u5ea6\u8f83\u6162\u3002"),(0,l.kt)("p",null,"\u56e0\u6b64\uff0c\u5982\u679c\u4f60\u9700\u8981\u5b58\u50a8\u56fa\u5b9a\u957f\u5ea6\u7684\u5b57\u7b26\u4e32\u6570\u636e\uff0c\u5efa\u8bae\u4f7f\u7528 Char\uff1b\u5982\u679c\u9700\u8981\u5b58\u50a8\u53ef\u53d8\u957f\u5ea6\u7684\u5b57\u7b26\u4e32\u6570\u636e\uff0c\u5efa\u8bae\u4f7f\u7528 Varchar\u3002"),(0,l.kt)("h1",{id:"datetime3-\u7684\u542b\u4e49"},"datetime(3) \u7684\u542b\u4e49"),(0,l.kt)("p",null,"DATETIME(3) \u8868\u793a\u7684\u662f MySQL \u4e2d\u7684\u4e00\u79cd DATETIME \u6570\u636e\u7c7b\u578b\uff0c\u5176\u4e2d\u7684 (3) \u4ee3\u8868\u7684\u662f\u7cbe\u5ea6\uff0c\u5373\u8be5\u6570\u636e\u7c7b\u578b\u80fd\u591f\u7cbe\u786e\u5230\u6beb\u79d2\u7ea7\u522b\u3002\u56e0\u6b64\uff0c\u4f7f\u7528 DATETIME(3) \u53ef\u4ee5\u5728\u5b58\u50a8\u65e5\u671f\u548c\u65f6\u95f4\u65f6\u540c\u65f6\u7cbe\u786e\u5230\u6beb\u79d2\u7ea7\u522b\u3002"),(0,l.kt)("h1",{id:"mysql-\u4e2d\u4e3b\u952e\u81ea\u589e\u7b56\u7565"},"MySQL \u4e2d\u4e3b\u952e\u81ea\u589e\u7b56\u7565"),(0,l.kt)("p",null,"MySQL \u4e2d\u4e3b\u952e\u81ea\u589e\u7b56\u7565\u6709\u4ee5\u4e0b\u51e0\u79cd\uff1a"),(0,l.kt)("p",null,"AUTO_INCREMENT\uff1aMySQL \u652f\u6301\u5728\u521b\u5efa\u8868\u65f6\u5b9a\u4e49\u67d0\u4e00\u5217\u4e3a\u81ea\u589e\u4e3b\u952e\uff0c\u5728\u63d2\u5165\u65b0\u6570\u636e\u65f6\uff0c\u8be5\u5217\u4f1a\u81ea\u52a8\u589e\u52a0\uff0c\u4e0d\u9700\u8981\u4eba\u5de5\u5e72\u9884\u3002\nUUID\uff1aUUID \u662f Universally Unique Identifier \u7684\u7f29\u5199\uff0c\u53ef\u4ee5\u7528\u6765\u751f\u6210\u552f\u4e00\u7684\u6807\u8bc6\u7b26\u3002MySQL \u4e5f\u652f\u6301\u4f7f\u7528 UUID \u4f5c\u4e3a\u4e3b\u952e\uff0c\u4ee5\u4fdd\u8bc1\u6570\u636e\u7684\u552f\u4e00\u6027\u3002\n\u81ea\u5b9a\u4e49\u81ea\u589e\uff1a\u5982\u679c\u4e0d\u4f7f\u7528 AUTO_INCREMENT\uff0c\u4e5f\u53ef\u4ee5\u901a\u8fc7\u4f7f\u7528\u5b58\u50a8\u8fc7\u7a0b\u6216\u89e6\u53d1\u5668\u6765\u81ea\u5b9a\u4e49\u81ea\u589e\u7b56\u7565\u3002\n\u4ee5\u4e0a\u662f MySQL \u4e2d\u5e38\u89c1\u7684\u4e3b\u952e\u81ea\u589e\u7b56\u7565\uff0c\u9009\u62e9\u90a3\u79cd\u7b56\u7565\u8981\u6839\u636e\u5b9e\u9645\u9700\u6c42\u8fdb\u884c\u51b3\u7b56\u3002"),(0,l.kt)("p",null,"\u5982\u679c\u4f60\u60f3\u4f7f\u7528 UUID \u4f5c\u4e3a\u4e3b\u952e\uff0c\u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0b\u6b65\u9aa4\u5b9a\u4e49\u8868\uff1a"),(0,l.kt)("p",null,"\u521b\u5efa\u4e00\u4e2a CHAR(36) \u7c7b\u578b\u7684\u5b57\u6bb5\u7528\u4e8e\u5b58\u50a8 UUID\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"}," CREATE TABLE table_name (\n    id CHAR(36) NOT NULL,\n    ...\n    PRIMARY KEY (id)\n);\n")),(0,l.kt)("p",null,"\u5728\u63d2\u5165\u6570\u636e\u65f6\u4f7f\u7528 UUID() \u51fd\u6570\u751f\u6210 UUID \u5e76\u4fdd\u5b58\u5230\u8be5\u5b57\u6bb5\u4e2d\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"INSERT INTO table_name (id, ...) VALUES (UUID(), ...);\n")),(0,l.kt)("p",null,"\u8bf7\u6ce8\u610f\uff0c\u5728\u4e0d\u540c\u7684 MySQL \u7248\u672c\u4e2d\uff0cUUID() \u51fd\u6570\u7684\u7528\u6cd5\u53ef\u80fd\u7565\u6709\u5dee\u522b\uff0c\u8bf7\u786e\u4fdd\u4f7f\u7528\u6b63\u786e\u7684\u7248\u672c\u3002"),(0,l.kt)("p",null,"\u4e00\u822c\u6765\u8bf4\uff0c\u4f7f\u7528 CHAR(36) \u5b58\u50a8 UUID \u662f\u56e0\u4e3a UUID \u901a\u5e38\u662f 36 \u4e2a\u5b57\u7b26\u957f\uff0c\u5305\u542b 8 \u4e2a - \u5206\u9694\u7b26\uff0c\u6240\u4ee5\u9700\u8981 36 \u4e2a\u5b57\u7b26\u7684\u5b58\u50a8\u7a7a\u95f4\u3002\u4f8b\u5982\uff0c\u4e00\u4e2a\u6807\u51c6\u7684 UUID \u7684\u683c\u5f0f\u53ef\u80fd\u662f\uff1aa1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6\u3002"),(0,l.kt)("p",null,"\u4f7f\u7528 CHAR(36) \u5b58\u50a8 UUID \u53ef\u4ee5\u65b9\u4fbf\u5730\u4fdd\u8bc1 UUID \u5728\u5b58\u50a8\u548c\u4f7f\u7528\u8fc7\u7a0b\u4e2d\u7684\u552f\u4e00\u6027\uff0c\u540c\u65f6\u53ef\u4ee5\u907f\u514d\u5728\u6bd4\u8f83 UUID \u65f6\u51fa\u73b0\u7c7b\u578b\u4e0d\u5339\u914d\u7684\u95ee\u9898\u3002\u5982\u679c\u4f7f\u7528\u5176\u4ed6\u7c7b\u578b\u5b58\u50a8 UUID\uff0c\u53ef\u80fd\u4f1a\u51fa\u73b0\u7cbe\u5ea6\u4e22\u5931\u7b49\u95ee\u9898\u3002"),(0,l.kt)("h1",{id:"uid\u76f8\u6bd4\u81ea\u589e\u6709\u4ec0\u4e48\u7279\u70b9\u548c\u4f18\u52bf\u5417\u5982\u679c\u81ea\u589e\u7b56\u7565\u6ea2\u51fa\u4f1a\u600e\u4e48\u6837uuid\u6709\u6ea2\u51fa\u7684\u53ef\u80fd\u5417"},"UID\u76f8\u6bd4\u81ea\u589e\u6709\u4ec0\u4e48\u7279\u70b9\u548c\u4f18\u52bf\u5417\uff1f\u5982\u679c\u81ea\u589e\u7b56\u7565\u6ea2\u51fa\u4f1a\u600e\u4e48\u6837\uff1fUUID\u6709\u6ea2\u51fa\u7684\u53ef\u80fd\u5417\uff1f"),(0,l.kt)("p",null,"UUID \u4e0e\u81ea\u589e\u4e3b\u952e\u76f8\u6bd4\u5177\u6709\u4ee5\u4e0b\u7279\u70b9\u548c\u4f18\u52bf\uff1a"),(0,l.kt)("p",null,"\u5168\u7403\u552f\u4e00\u6027\uff1aUUID \u662f\u57fa\u4e8e\u5168\u7403\u552f\u4e00\u7684\u7b97\u6cd5\u751f\u6210\u7684\uff0c\u56e0\u6b64\u53ef\u4ee5\u4fdd\u8bc1\u5168\u7403\u8303\u56f4\u5185\u7684\u552f\u4e00\u6027\u3002"),(0,l.kt)("p",null,"\u5206\u5e03\u5f0f\u6570\u636e\u5e93\uff1aUUID \u9002\u7528\u4e8e\u5206\u5e03\u5f0f\u6570\u636e\u5e93\u73af\u5883\uff0c\u56e0\u4e3a\u5b83\u53ef\u4ee5\u907f\u514d\u56e0\u4e3a\u540c\u6b65\u6570\u636e\u5e93\u5bfc\u81f4\u7684\u4e3b\u952e\u51b2\u7a81\u3002"),(0,l.kt)("p",null,"\u751f\u6210\u901f\u5ea6\uff1aUUID \u53ef\u4ee5\u5728\u5ba2\u6237\u7aef\u6216\u5e94\u7528\u7a0b\u5e8f\u751f\u6210\uff0c\u56e0\u6b64\u4e0d\u9700\u8981\u4e0e\u6570\u636e\u5e93\u8fdb\u884c\u901a\u4fe1\uff0c\u751f\u6210\u901f\u5ea6\u5feb\u3002"),(0,l.kt)("p",null,"\u7f16\u7801\u957f\u5ea6\uff1aUUID \u7f16\u7801\u957f\u5ea6\u662f\u56fa\u5b9a\u7684\uff0c\u5e76\u4e14\u4e0d\u5b58\u5728\u6ea2\u51fa\u7684\u60c5\u51b5\u3002"),(0,l.kt)("p",null,"\u81ea\u589e\u4e3b\u952e\u5982\u679c\u6ea2\u51fa\uff0c\u5c06\u5bfc\u81f4\u6570\u636e\u5e93\u51fa\u73b0\u9519\u8bef\uff0c\u6570\u636e\u5e93\u5c06\u65e0\u6cd5\u7ee7\u7eed\u8fd0\u884c\u3002\u6b64\u5916\uff0c\u7531\u4e8e\u81ea\u589e\u4e3b\u952e\u7684\u751f\u6210\u9700\u8981\u4e0e\u6570\u636e\u5e93\u901a\u4fe1\uff0c\u56e0\u6b64\u751f\u6210\u901f\u5ea6\u8f83\u6162\u3002"),(0,l.kt)("p",null,"UUID \u4e0d\u5b58\u5728\u6ea2\u51fa\u7684\u53ef\u80fd\uff0c\u56e0\u4e3a\u5b83\u662f\u901a\u8fc7\u7b97\u6cd5\u751f\u6210\u7684\uff0c\u4e0d\u53d7\u6570\u636e\u5e93\u9650\u5236\u3002"))}m.isMDXComponent=!0}}]);