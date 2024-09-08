"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2032],{224:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var r=n(2374);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=l(n),d=a,f=p["".concat(c,".").concat(d)]||p[d]||m[d]||o;return n?r.createElement(f,i(i({ref:t},u),{},{components:n})):r.createElement(f,i({ref:t},u))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[p]="string"==typeof e?e:a,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1723:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var r=n(9963),a=(n(2374),n(224));const o={},i=void 0,s={unversionedId:"tutorial/css/css \u8fc7\u6e21\u548c\u52a8\u753b",id:"tutorial/css/css \u8fc7\u6e21\u548c\u52a8\u753b",title:"css \u8fc7\u6e21\u548c\u52a8\u753b",description:"transition \u7528\u6cd5",source:"@site/docs/tutorial/css/css \u8fc7\u6e21\u548c\u52a8\u753b.md",sourceDirName:"tutorial/css",slug:"/tutorial/css/css \u8fc7\u6e21\u548c\u52a8\u753b",permalink:"/blogs/docs/tutorial/css/css \u8fc7\u6e21\u548c\u52a8\u753b",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/tutorial/css/css \u8fc7\u6e21\u548c\u52a8\u753b.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorial",previous:{title:"css \u81ea\u5b9a\u4e49\u5c5e\u6027",permalink:"/blogs/docs/tutorial/css/css \u81ea\u5b9a\u4e49\u5c5e\u6027"},next:{title:"flex",permalink:"/blogs/docs/tutorial/css/flex"}},c={},l=[{value:"transition \u7528\u6cd5",id:"transition-\u7528\u6cd5",level:2},{value:"transition\u7684\u5c40\u9650",id:"transition\u7684\u5c40\u9650",level:3},{value:"CSS Animation \u7528\u6cd5",id:"css-animation-\u7528\u6cd5",level:2}],u={toc:l},p="wrapper";function m(e){let{components:t,...n}=e;return(0,a.kt)(p,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"transition-\u7528\u6cd5"},"transition \u7528\u6cd5"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-css"},"img {\n    height:15px;\n    width:15px;\n}\n\nimg:hover{\n    height: 450px;\n    width: 450px;\n}\n\n\nimg{\n    transition: 1sv ease;\n}\n")),(0,a.kt)("p",null,"\u9664\u4e86ease\u4ee5\u5916\uff0c\u5176\u4ed6\u6a21\u5f0f\u8fd8\u5305\u62ec"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\uff081\uff09linear\uff1a\u5300\u901f"),(0,a.kt)("p",{parentName:"blockquote"},"\uff082\uff09ease-in\uff1a\u52a0\u901f"),(0,a.kt)("p",{parentName:"blockquote"},"\uff083\uff09ease-out\uff1a\u51cf\u901f"),(0,a.kt)("p",{parentName:"blockquote"},"\uff084\uff09cubic-bezier\u51fd\u6570\uff1a\u81ea\u5b9a\u4e49\u901f\u5ea6\u6a21\u5f0f")),(0,a.kt)("h3",{id:"transition\u7684\u5c40\u9650"},"transition\u7684\u5c40\u9650"),(0,a.kt)("p",null,"transition\u7684\u4f18\u70b9\u5728\u4e8e\u7b80\u5355\u6613\u7528\uff0c\u4f46\u662f\u5b83\u6709\u51e0\u4e2a\u5f88\u5927\u7684\u5c40\u9650\u3002"),(0,a.kt)("p",null,"\uff081\uff09transition\u9700\u8981\u4e8b\u4ef6\u89e6\u53d1\uff0c\u6240\u4ee5\u6ca1\u6cd5\u5728\u7f51\u9875\u52a0\u8f7d\u65f6\u81ea\u52a8\u53d1\u751f\u3002"),(0,a.kt)("p",null,"\uff082\uff09transition\u662f\u4e00\u6b21\u6027\u7684\uff0c\u4e0d\u80fd\u91cd\u590d\u53d1\u751f\uff0c\u9664\u975e\u4e00\u518d\u89e6\u53d1\u3002"),(0,a.kt)("p",null,"\uff083\uff09transition\u53ea\u80fd\u5b9a\u4e49\u5f00\u59cb\u72b6\u6001\u548c\u7ed3\u675f\u72b6\u6001\uff0c\u4e0d\u80fd\u5b9a\u4e49\u4e2d\u95f4\u72b6\u6001\uff0c\u4e5f\u5c31\u662f\u8bf4\u53ea\u6709\u4e24\u4e2a\u72b6\u6001\u3002"),(0,a.kt)("p",null,"\uff084\uff09\u4e00\u6761transition\u89c4\u5219\uff0c\u53ea\u80fd\u5b9a\u4e49\u4e00\u4e2a\u5c5e\u6027\u7684\u53d8\u5316\uff0c\u4e0d\u80fd\u6d89\u53ca\u591a\u4e2a\u5c5e\u6027\u3002"),(0,a.kt)("p",null,"CSS Animation\u5c31\u662f\u4e3a\u4e86\u89e3\u51b3\u8fd9\u4e9b\u95ee\u9898\u800c\u63d0\u51fa\u7684"),(0,a.kt)("h2",{id:"css-animation-\u7528\u6cd5"},"CSS Animation \u7528\u6cd5"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-css"},"div:hover {\n// \u52a8\u753b\u65f6\u95f4 \u52a8\u753b\u5bf9\u5e94\u7684\u5173\u952e\u5e27 \u52a8\u753b\u65e0\u7ebf\u5faa\u73af\u5c55\u793a\n  animation: 1s rainbow infinite;\n}\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-css"},"@keyframes rainbow {\n  0% { background: #c00; }\n  50% { background: orange; }\n  100% { background: yellowgreen; }\n}\n")))}m.isMDXComponent=!0}}]);