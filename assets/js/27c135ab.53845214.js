"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3962],{8015:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>h});var n=r(757);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=l(r),m=a,h=d["".concat(c,".").concat(m)]||d[m]||u[m]||o;return r?n.createElement(h,s(s({ref:t},p),{},{components:r})):n.createElement(h,s({ref:t},p))}));function h(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,s=new Array(o);s[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[d]="string"==typeof e?e:a,s[1]=i;for(var l=2;l<o;l++)s[l]=r[l];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},9782:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>l});var n=r(1227),a=(r(757),r(8015));const o={},s=void 0,i={unversionedId:"notes/\u5176\u4ed6/URL Encode Decode",id:"notes/\u5176\u4ed6/URL Encode Decode",title:"URL Encode Decode",description:"URL encoding, also known as percent-encoding, is a mechanism used to represent characters in a URL that may have special meanings or reserved purposes. In a URL, certain characters are reserved for special use, such as:",source:"@site/docs/notes/\u5176\u4ed6/URL Encode Decode.md",sourceDirName:"notes/\u5176\u4ed6",slug:"/notes/\u5176\u4ed6/URL Encode Decode",permalink:"/blogs/docs/notes/\u5176\u4ed6/URL Encode Decode",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/\u5176\u4ed6/URL Encode Decode.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"Recursive Queries with MySQL",permalink:"/blogs/docs/notes/\u5176\u4ed6/Recursive Queries with MySQL"},next:{title:"Undefined and null",permalink:"/blogs/docs/notes/\u5176\u4ed6/Undefined and null"}},c={},l=[{value:"Why URL Encode?",id:"why-url-encode",level:3}],p={toc:l},d="wrapper";function u(e){let{components:t,...r}=e;return(0,a.kt)(d,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"URL encoding, also known as percent-encoding, is a mechanism used to represent characters in a URL that may have special meanings or reserved purposes. In a URL, certain characters are reserved for special use, such as:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Reserved Characters:")," Characters like ?, &, =, /, and others have special meanings in URLs. Using them inappropriately might lead to misinterpretation.")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Unsafe Characters:")," Some characters are considered unsafe because they may be misinterpreted by certain browsers or servers. These include characters like spaces, quotes, and others."))),(0,a.kt)("p",null,'URL encoding replaces these reserved or unsafe characters with a "%" followed by two hexadecimal digits representing the ASCII code of the character. For example, a space character is replaced with "%20", and the "@" symbol is replaced with "%40".'),(0,a.kt)("h3",{id:"why-url-encode"},"Why URL Encode?"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Special Characters Handling:")," URL encoding ensures that special characters are properly represented in a URL, preventing confusion or errors in interpretation.")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Compatibility:")," Different systems and browsers may interpret characters differently. URL encoding provides a standardized way to represent characters universally.")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Data Transmission:")," When data is sent via URLs, it needs to be properly encoded to ensure that the data is transmitted accurately without any issues.")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Security:")," URL encoding helps prevent security issues such as injection attacks, where malicious characters might be injected into a URL to exploit vulnerabilities."))),(0,a.kt)("p",null,"In summary, URL encoding is essential for ensuring proper representation and transmission of characters within URLs, maintaining compatibility across different systems, and enhancing security in web applications."),(0,a.kt)("p",null,'The explanation I provided earlier about "URL encoding" can be translated into Chinese as follows:'),(0,a.kt)("p",null,"URL \u7f16\u7801\uff0c\u4e5f\u79f0\u4e3a\u767e\u5206\u53f7\u7f16\u7801\uff0c\u662f\u4e00\u79cd\u7528\u4e8e\u8868\u793a\u5728 URL \u4e2d\u53ef\u80fd\u5177\u6709\u7279\u6b8a\u542b\u4e49\u6216\u4fdd\u7559\u76ee\u7684\u7684\u5b57\u7b26\u7684\u673a\u5236\u3002\u5728 URL \u4e2d\uff0c\u67d0\u4e9b\u5b57\u7b26\u88ab\u4fdd\u7559\u7528\u4e8e\u7279\u6b8a\u7528\u9014\uff0c\u5982\u95ee\u53f7\uff08?\uff09\u3001\u548c\u53f7\uff08&\uff09\u3001\u7b49\u53f7\uff08=\uff09\u3001\u659c\u6760\uff08/\uff09\u7b49\u3002"),(0,a.kt)("p",null,'\u5df2\u4fdd\u7559\u5b57\u7b26\u548c\u4e0d\u5b89\u5168\u5b57\u7b26\u5c06\u88ab\u66ff\u6362\u4e3a"%"\u540e\u8ddf\u4e24\u4e2a\u8868\u793a\u5b57\u7b26 ASCII \u7801\u7684\u5341\u516d\u8fdb\u5236\u6570\u5b57\u3002\u4f8b\u5982\uff0c\u7a7a\u683c\u5b57\u7b26\u5c06\u88ab\u66ff\u6362\u4e3a"%20"\uff0c"@" \u7b26\u53f7\u5c06\u88ab\u66ff\u6362\u4e3a"%40"\u3002'),(0,a.kt)("p",null,"\u4e3a\u4ec0\u4e48\u9700\u8981 URL \u7f16\u7801\uff1a"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u7279\u6b8a\u5b57\u7b26\u5904\u7406\uff1aURL \u7f16\u7801\u786e\u4fdd\u7279\u6b8a\u5b57\u7b26\u5728 URL \u4e2d\u5f97\u5230\u6b63\u786e\u8868\u793a\uff0c\u9632\u6b62\u89e3\u91ca\u9519\u8bef\u6216\u6df7\u6dc6\u3002")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u517c\u5bb9\u6027\uff1a\u4e0d\u540c\u7684\u7cfb\u7edf\u548c\u6d4f\u89c8\u5668\u53ef\u80fd\u4ee5\u4e0d\u540c\u7684\u65b9\u5f0f\u89e3\u91ca\u5b57\u7b26\u3002URL \u7f16\u7801\u63d0\u4f9b\u4e86\u4e00\u79cd\u5728\u5404\u79cd\u7cfb\u7edf\u4e2d\u901a\u7528\u8868\u793a\u5b57\u7b26\u7684\u6807\u51c6\u65b9\u6cd5\u3002")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u6570\u636e\u4f20\u8f93\uff1a\u5f53\u901a\u8fc7 URL \u4f20\u8f93\u6570\u636e\u65f6\uff0c\u9700\u8981\u6b63\u786e\u7f16\u7801\u4ee5\u786e\u4fdd\u6570\u636e\u51c6\u786e\u4f20\u8f93\uff0c\u800c\u4e0d\u4f1a\u51fa\u73b0\u4efb\u4f55\u95ee\u9898\u3002")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u5b89\u5168\u6027\uff1aURL \u7f16\u7801\u6709\u52a9\u4e8e\u9632\u6b62\u5b89\u5168\u95ee\u9898\uff0c\u5982\u6ce8\u5165\u653b\u51fb\uff0c\u5176\u4e2d\u53ef\u80fd\u5728 URL \u4e2d\u6ce8\u5165\u6076\u610f\u5b57\u7b26\u4ee5\u5229\u7528\u6f0f\u6d1e\u3002"))),(0,a.kt)("p",null,"\u603b\u4f53\u800c\u8a00\uff0cURL \u7f16\u7801\u5bf9\u4e8e\u786e\u4fdd\u5728 URL \u4e2d\u6b63\u786e\u8868\u793a\u548c\u4f20\u8f93\u5b57\u7b26\u3001\u5728\u4e0d\u540c\u7cfb\u7edf\u4e4b\u95f4\u4fdd\u6301\u517c\u5bb9\u6027\u4ee5\u53ca\u5728 Web \u5e94\u7528\u7a0b\u5e8f\u4e2d\u589e\u5f3a\u5b89\u5168\u6027\u662f\u81f3\u5173\u91cd\u8981\u7684\u3002"))}u.isMDXComponent=!0}}]);