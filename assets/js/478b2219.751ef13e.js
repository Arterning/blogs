"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1365],{8015:(e,t,n)=>{n.d(t,{Zo:()=>i,kt:()=>m});var r=n(757);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),l=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},i=function(e){var t=l(e.components);return r.createElement(p.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,s=e.originalType,p=e.parentName,i=c(e,["components","mdxType","originalType","parentName"]),u=l(n),f=o,m=u["".concat(p,".").concat(f)]||u[f]||d[f]||s;return n?r.createElement(m,a(a({ref:t},i),{},{components:n})):r.createElement(m,a({ref:t},i))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=n.length,a=new Array(s);a[0]=f;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c[u]="string"==typeof e?e:o,a[1]=c;for(var l=2;l<s;l++)a[l]=n[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},4652:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>a,default:()=>d,frontMatter:()=>s,metadata:()=>c,toc:()=>l});var r=n(1227),o=(n(757),n(8015));const s={},a=void 0,c={unversionedId:"notes/\u6280\u672f\u6808/node/Node js \u505a\u670d\u52a1\u7aef\u4f18\u7f3a\u70b9",id:"notes/\u6280\u672f\u6808/node/Node js \u505a\u670d\u52a1\u7aef\u4f18\u7f3a\u70b9",title:"Node js \u505a\u670d\u52a1\u7aef\u4f18\u7f3a\u70b9",description:"\u5206\u6790\u4e00\u6ce2nodejs\u5728\u540e\u7aef\u4e2d\u7684\u4f18\u7f3a\u70b9 \u7f3a\u70b9\uff1a 1.nodejs\u5355\u7ebf\u7a0b\uff0c\u4e0d\u80fd\u505acpu\u5bc6\u96c6\u578b\u64cd\u4f5c\uff0c\u5bfc\u81f4\u65f6\u95f4\u7247\u4e0d\u80fd\u91ca\u653e\uff0c\u963b\u585e\u540e\u9762\u7684\u4efb\u52a1\u3002 2.nodejs\u53ef\u9760\u6027\u6bd4\u8f83\u4f4e\uff0c\u4e00\u4e2a\u5730\u65b9\u62a5\u9519\u4f1a\u5bfc\u81f4\u6574\u4e2a\u7a0b\u5e8f\u5d29\u6e83\uff0c\u9700\u8981\u5b88\u62a4\u8fdb\u7a0b\u6216\u8005docker\u91cd\u542f\u6765\u89e3\u51b3\u3002 3.\u50cf\u4f7f\u7528\u591a\u6838\u6027\u80fd\u7684\u65f6\u5019\u9700\u8981\u4f7f\u7528cluster\u6216\u8005\u90e8\u7f72\u591a\u4e2a\u5b9e\u4f8b\uff0c\u6bd4\u8f83\u9ebb\u70e6\u3002 4.\u5185\u5b58\u9ed8\u8ba40.7G\u548c1.4G\uff0c\u8bbe\u7f6e\u5927\u4e86\u4e4b\u540e\u5783\u573e\u56de\u6536\u4f1a\u53d8\u6162\uff0c\u53ef\u80fd\u9700\u8981\u591a\u90e8\u7f72\u51e0\u4e2a\u5b9e\u4f8b\u3002 5.nodejs\u7c7b\u578b\u7684\u540e\u7aef\u6bd4\u8f83\u96be\u62db\uff0c\u9700\u8981\u524d\u7aef\u8f6c\u540e\u7aef\u6216\u8005\u540e\u7aef\u8f6cnodejs\u3002",source:"@site/docs/notes/\u6280\u672f\u6808/node/Node js \u505a\u670d\u52a1\u7aef\u4f18\u7f3a\u70b9.md",sourceDirName:"notes/\u6280\u672f\u6808/node",slug:"/notes/\u6280\u672f\u6808/node/Node js \u505a\u670d\u52a1\u7aef\u4f18\u7f3a\u70b9",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/node/Node js \u505a\u670d\u52a1\u7aef\u4f18\u7f3a\u70b9",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/\u6280\u672f\u6808/node/Node js \u505a\u670d\u52a1\u7aef\u4f18\u7f3a\u70b9.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"Node JS \u4e8b\u4ef6\u5faa\u73af",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/node/Node JS \u4e8b\u4ef6\u5faa\u73af"},next:{title:"express usage",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/node/express usage"}},p={},l=[],i={toc:l},u="wrapper";function d(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},i,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"\u5206\u6790\u4e00\u6ce2nodejs\u5728\u540e\u7aef\u4e2d\u7684\u4f18\u7f3a\u70b9 \u7f3a\u70b9\uff1a 1.nodejs\u5355\u7ebf\u7a0b\uff0c\u4e0d\u80fd\u505acpu\u5bc6\u96c6\u578b\u64cd\u4f5c\uff0c\u5bfc\u81f4\u65f6\u95f4\u7247\u4e0d\u80fd\u91ca\u653e\uff0c\u963b\u585e\u540e\u9762\u7684\u4efb\u52a1\u3002 2.nodejs\u53ef\u9760\u6027\u6bd4\u8f83\u4f4e\uff0c\u4e00\u4e2a\u5730\u65b9\u62a5\u9519\u4f1a\u5bfc\u81f4\u6574\u4e2a\u7a0b\u5e8f\u5d29\u6e83\uff0c\u9700\u8981\u5b88\u62a4\u8fdb\u7a0b\u6216\u8005docker\u91cd\u542f\u6765\u89e3\u51b3\u3002 3.\u50cf\u4f7f\u7528\u591a\u6838\u6027\u80fd\u7684\u65f6\u5019\u9700\u8981\u4f7f\u7528cluster\u6216\u8005\u90e8\u7f72\u591a\u4e2a\u5b9e\u4f8b\uff0c\u6bd4\u8f83\u9ebb\u70e6\u3002 4.\u5185\u5b58\u9ed8\u8ba40.7G\u548c1.4G\uff0c\u8bbe\u7f6e\u5927\u4e86\u4e4b\u540e\u5783\u573e\u56de\u6536\u4f1a\u53d8\u6162\uff0c\u53ef\u80fd\u9700\u8981\u591a\u90e8\u7f72\u51e0\u4e2a\u5b9e\u4f8b\u3002 5.nodejs\u7c7b\u578b\u7684\u540e\u7aef\u6bd4\u8f83\u96be\u62db\uff0c\u9700\u8981\u524d\u7aef\u8f6c\u540e\u7aef\u6216\u8005\u540e\u7aef\u8f6cnodejs\u3002"),(0,o.kt)("p",null,"\u4f18\u70b9\uff1a 1.nodejs\u5e95\u5c42\u5f02\u6b65io\uff0c\u6027\u80fd\u6bd4\u8f83\u597d\u3002 2.\u7f16\u5199\u8d77\u6765\u4e0d\u7528\u62c5\u5fc3\u7ebf\u7a0b\u7684\u95ee\u9898\u3002 3.\u5f00\u53d1\u901f\u5ea6\u9ad8\uff0c\u5f31\u7c7b\u578b\u8bed\u8a00\u6bd4\u8f83\u7075\u6d3b\uff0c\u4e0d\u50cf\u5f3a\u7c7b\u578b\u4e00\u6837\u9700\u8981\u5404\u79cd\u8f6c\u6362\uff0c\u4ee3\u7801\u91cf\u5c11\u3002 4.\u5355\u9875\u5e94\u7528ssr\u6bd4\u8f83\u65b9\u4fbf\uff0c\u4e0a\u4e0b\u6587\u6bd4\u8f83\u76f8\u540c\u3002 5.\u524d\u7aef\u8f6cnodejs\u76f8\u5bf9\u6765\u8bf4\u5bf9\u8bed\u6cd5\u5929\u7136\u719f\u7ec3\u3002"),(0,o.kt)("p",null,"\u5982\u679c\u5f00\u53d1web\u7684\u8bdd\uff0c\u4e3b\u8981\u5f02\u6b65io\uff0c\u53ef\u4ee5\u4f7f\u7528nodejs\uff0c\u6027\u80fd\u975e\u5e38\u597d\uff0c\u4e0d\u8fc7\u6700\u597d\u4e5f\u8981\u770b\u4e0b\u76ee\u6807\u57ce\u5e02\u7684nodejs\u6240\u4f7f\u7528\u7684\u516c\u53f8\u662f\u5426\u6bd4\u8f83\u591a\uff0c\u5728cpu\u5bc6\u96c6\u578b\u7684\u65f6\u5019\u7528cc++\uff0cgo\u505a\u4e2a\u670d\u52a1\uff0c\u6216\u8005cc++\u505a\u4e2anodejs\u6a21\u5757\uff1f"),(0,o.kt)("p",null,"\u4f9d\u8d56\u7ba1\u7406\u95ee\u9898\n\u628a\u4f9d\u8d56\u90fd\u653e\u9879\u76ee\u672c\u5730\u662f\u7edd\u5bf9",(0,o.kt)("strong",{parentName:"p"},"\u552f\u4e00"),"\u6b63\u786e\u7684\u505a\u6cd5\uff0c",(0,o.kt)("strong",{parentName:"p"},"\u4e00\u5207"),"\u5168\u5c40\u4f9d\u8d56\u5728\u903b\u8f91\u4e0a\u5c31\u662f\u4e0d\u5408\u7406\u7684\uff0c\u5b9e\u9645\u4f7f\u7528\u7684\u65f6\u5019\u57fa\u672c\u90fd\u662f\u5404\u79cd\u65e0\u89e3\u7684\u95ee\u9898\u3002\u8fd9\u4e0d\u5206\u8bed\u8a00\u3001\u9879\u76ee\u7c7b\u578b\u7b49\u7b49\uff0c\u8fd9\u91cc\u6700\u4e25\u91cd\u7684\u5c31\u662fC\u3001C++\u8fd9\u79cd\u53e4\u8001\u8bed\u8a00\u3002\uff08\u5373\u4f7f\u662fC++\u4e5f\u5728\u52aa\u529b\u6539\u8fdb\u8fd9\u65b9\u9762\u7684\u95ee\u9898\uff09NPM\u4e4b\u6240\u4ee5\u90a3\u4e48\u505a\uff0c\u662f\u56e0\u4e3a\uff1a\u78c1\u76d8\u7a7a\u95f4\u662f\u670d\u52a1\u5668\u4e0a\u6700\u4e0d\u503c\u94b1\u7684\u8d44\u6e90\uff08\u5f00\u53d1\u673a\u5668\u5c31\u66f4\u522b\u63d0\u4e86\uff09\uff0c\u5982\u679c\u591a\u7528\u51e0\u767eGB\u786c\u76d8\u5c31\u53ef\u4ee5\u51cf\u5c11\u4e00\u4e2a\u8be1\u5f02\u7684bug\uff0c\u90a3\u7edd\u5bf9\u662f\u7a33\u8d5a\u4e0d\u8d54\u7684\u3002"),(0,o.kt)("p",null,"\u78c1\u76d8\u7a7a\u95f4\u4e0d\u503c\u94b1\u8fd9\u4e2a\u6bd4\u8f83\u8d5e\u540c\uff0c\u4f46\u662f\u5e76\u6ca1\u6709\u89e3\u91ca\u4e3a\u4ec0\u4e48\u5168\u5c40\u4f9d\u8d56\u5728\u903b\u8f91\u4e0a\u4e0d\u5408\u7406\u8fd9\u4e2a\u95ee\u9898\uff1fmaven\u4e0d\u662f\u5f88\u5408\u7406\u7684\u5417\uff1f\u4e5f\u5f88\u7a33\u5b9a\uff0c\u5f88\u5c11\u542c\u5230java\u7a0b\u5e8f\u5458\u5410\u69fdmaven\u7684\u4f9d\u8d56\u8bbe\u8ba1\u4e0d\u5408\u7406"))}d.isMDXComponent=!0}}]);