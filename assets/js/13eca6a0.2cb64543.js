"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4948],{8015:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>d});var n=r(757);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var i=n.createContext({}),l=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(i.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),p=l(r),f=o,d=p["".concat(i,".").concat(f)]||p[f]||m[f]||a;return r?n.createElement(d,s(s({ref:t},u),{},{components:r})):n.createElement(d,s({ref:t},u))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,s=new Array(a);s[0]=f;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c[p]="string"==typeof e?e:o,s[1]=c;for(var l=2;l<a;l++)s[l]=r[l];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},4786:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>m,frontMatter:()=>a,metadata:()=>c,toc:()=>l});var n=r(1227),o=(r(757),r(8015));const a={},s=void 0,c={unversionedId:"notes/\u6280\u672f\u6808/k8s/\u57fa\u672c\u6982\u5ff5",id:"notes/\u6280\u672f\u6808/k8s/\u57fa\u672c\u6982\u5ff5",title:"\u57fa\u672c\u6982\u5ff5",description:"Pod\u3001Service\u3001Volume \u548c Namespace \u662f Kubernetes \u96c6\u7fa4\u4e2d\u56db\u5927\u57fa\u672c\u5bf9\u8c61\uff0c\u5b83\u4eec\u80fd\u591f\u8868\u793a\u7cfb\u7edf\u4e2d\u90e8\u7f72\u7684\u5e94\u7528\u3001\u5de5\u4f5c\u8d1f\u8f7d\u3001\u7f51\u7edc\u548c\u78c1\u76d8\u8d44\u6e90\uff0c\u5171\u540c\u5b9a\u4e49\u4e86\u96c6\u7fa4\u7684\u72b6\u6001\u3002Kubernetes \u4e2d\u5f88\u591a\u5176\u4ed6\u7684\u8d44\u6e90\u5176\u5b9e\u53ea\u5bf9\u8fd9\u4e9b\u57fa\u672c\u7684\u5bf9\u8c61\u8fdb\u884c\u4e86\u7ec4\u5408\u3002",source:"@site/docs/notes/\u6280\u672f\u6808/k8s/\u57fa\u672c\u6982\u5ff5.md",sourceDirName:"notes/\u6280\u672f\u6808/k8s",slug:"/notes/\u6280\u672f\u6808/k8s/\u57fa\u672c\u6982\u5ff5",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/k8s/\u57fa\u672c\u6982\u5ff5",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/\u6280\u672f\u6808/k8s/\u57fa\u672c\u6982\u5ff5.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"service",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/k8s/service"},next:{title:"\u5b58\u6d3b\u63a2\u9488",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/k8s/\u5b58\u6d3b\u63a2\u9488"}},i={},l=[],u={toc:l},p="wrapper";function m(e){let{components:t,...r}=e;return(0,o.kt)(p,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Pod\u3001Service\u3001Volume \u548c Namespace \u662f Kubernetes \u96c6\u7fa4\u4e2d\u56db\u5927\u57fa\u672c\u5bf9\u8c61\uff0c\u5b83\u4eec\u80fd\u591f\u8868\u793a\u7cfb\u7edf\u4e2d\u90e8\u7f72\u7684\u5e94\u7528\u3001\u5de5\u4f5c\u8d1f\u8f7d\u3001\u7f51\u7edc\u548c\u78c1\u76d8\u8d44\u6e90\uff0c\u5171\u540c\u5b9a\u4e49\u4e86\u96c6\u7fa4\u7684\u72b6\u6001\u3002Kubernetes \u4e2d\u5f88\u591a\u5176\u4ed6\u7684\u8d44\u6e90\u5176\u5b9e\u53ea\u5bf9\u8fd9\u4e9b\u57fa\u672c\u7684\u5bf9\u8c61\u8fdb\u884c\u4e86\u7ec4\u5408\u3002"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Pod -> \u96c6\u7fa4\u4e2d\u7684\u57fa\u672c\u5355\u5143"),(0,o.kt)("li",{parentName:"ul"},"Service -> \u89e3\u51b3\u5982\u4f55\u8bbf\u95ee Pod \u91cc\u9762\u670d\u52a1\u7684\u95ee\u9898"),(0,o.kt)("li",{parentName:"ul"},"Volume -> \u96c6\u7fa4\u4e2d\u7684\u5b58\u50a8\u5377"),(0,o.kt)("li",{parentName:"ul"},"Namespace -> \u547d\u540d\u7a7a\u95f4\u4e3a\u96c6\u7fa4\u63d0\u4f9b\u865a\u62df\u7684\u9694\u79bb\u4f5c\u7528")),(0,o.kt)("p",null,"\u6211\u4eec\u90fd\u77e5\u9053\u4f20\u7edf\u7684 SVC \u53ea\u652f\u6301\u56db\u5c42\u4e0a\u9762\u7684\u4ee3\u7801\uff0c\u800c\u5bf9\u4e8e\u4e03\u5c42\u4e0a\u7684\u4ee3\u7801\u800c\u65e0\u80fd\u4e3a\u529b\u3002\u6bd4\u5982\uff1a\u6211\u4eec\u4f7f\u7528 K8S \u96c6\u7fa4\u5bf9\u5916\u63d0\u4f9b HTTPS \u7684\u670d\u52a1\uff0c\u4e3a\u4e86\u65b9\u4fbf\u548c\u4fbf\u6377\uff0c\u6211\u4eec\u9700\u8981\u5728\u5bf9\u5916\u7684 Nginx \u670d\u52a1\u4e0a\u9762\u914d\u7f6e SSL \u52a0\u5bc6\uff0c\u4f46\u662f\u5c06\u8bf7\u6c42\u53d1\u9001\u7ed9\u540e\u7aef\u670d\u52a1\u7684\u65f6\u5019\uff0c\u8fdb\u884c\u8bc1\u4e66\u5378\u8f7d\u7684\u64cd\u4f5c\uff0c\u540e\u7eed\u90fd\u662f\u7528 HTTP \u7684\u534f\u8bae\u8fdb\u884c\u5904\u7406\u3002\u800c\u9762\u5bf9\u6b64\u95ee\u9898\uff0cK8S \u4e2d\u7ed9\u51fa\u4e86\u4f7f\u7528 Ingress (K8S\u57281.11\u7248\u672c\u4e2d\u63a8\u51fa\u4e86)\u6765\u8fdb\u884c\u5904\u7406\u3002"))}m.isMDXComponent=!0}}]);