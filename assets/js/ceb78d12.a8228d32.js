"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9643],{224:(e,r,t)=>{t.d(r,{Zo:()=>l,kt:()=>m});var n=t(2374);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function c(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function s(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var u=n.createContext({}),i=function(e){var r=n.useContext(u),t=r;return e&&(t="function"==typeof e?e(r):c(c({},r),e)),t},l=function(e){var r=i(e.components);return n.createElement(u.Provider,{value:r},e.children)},p="mdxType",f={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},d=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,a=e.originalType,u=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),p=i(t),d=o,m=p["".concat(u,".").concat(d)]||p[d]||f[d]||a;return t?n.createElement(m,c(c({ref:r},l),{},{components:t})):n.createElement(m,c({ref:r},l))}));function m(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=t.length,c=new Array(a);c[0]=d;var s={};for(var u in r)hasOwnProperty.call(r,u)&&(s[u]=r[u]);s.originalType=e,s[p]="string"==typeof e?e:o,c[1]=s;for(var i=2;i<a;i++)c[i]=t[i];return n.createElement.apply(null,c)}return n.createElement.apply(null,t)}d.displayName="MDXCreateElement"},8920:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>u,contentTitle:()=>c,default:()=>f,frontMatter:()=>a,metadata:()=>s,toc:()=>i});var n=t(9963),o=(t(2374),t(224));const a={},c=void 0,s={unversionedId:"notes/\u6280\u672f\u6808/\u524d\u7aef/React/react router",id:"notes/\u6280\u672f\u6808/\u524d\u7aef/React/react router",title:"react router",description:"HashRouter\u548cBrowserRouter\u7684\u533a\u522b",source:"@site/docs/notes/\u6280\u672f\u6808/\u524d\u7aef/React/react router.md",sourceDirName:"notes/\u6280\u672f\u6808/\u524d\u7aef/React",slug:"/notes/\u6280\u672f\u6808/\u524d\u7aef/React/react router",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/\u524d\u7aef/React/react router",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/\u6280\u672f\u6808/\u524d\u7aef/React/react router.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"react render props",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/\u524d\u7aef/React/react render props"},next:{title:"react styled component",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/\u524d\u7aef/React/react styled component"}},u={},i=[{value:"HashRouter\u548cBrowserRouter\u7684\u533a\u522b",id:"hashrouter\u548cbrowserrouter\u7684\u533a\u522b",level:2}],l={toc:i},p="wrapper";function f(e){let{components:r,...t}=e;return(0,o.kt)(p,(0,n.Z)({},l,t,{components:r,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"hashrouter\u548cbrowserrouter\u7684\u533a\u522b"},"HashRouter\u548cBrowserRouter\u7684\u533a\u522b"),(0,o.kt)("p",null,"HashRouter \u53ea\u4f1a\u4fee\u6539URL\u4e2d\u7684\u54c8\u5e0c\u503c\u90e8\u5206\uff1b\u800c BrowserRouter \u4fee\u6539\u7684\u662fURL\u672c\u8eab\nHashRouter \u662f\u7eaf\u524d\u7aef\u8def\u7531\uff0c\u53ef\u4ee5\u901a\u8fc7\u8f93\u5165URL\u76f4\u63a5\u8bbf\u95ee\uff1b\u4f7f\u7528\u65f6 BrowserRouter \u76f4\u63a5\u8f93\u5165URL\u4f1a\u663e\u793a404\uff0c\u9664\u975e\u914d\u7f6eNginx\u5c06\u8bf7\u6c42\u6307\u5411\u5bf9\u5e94\u7684HTML\u6587\u4ef6\u3002\u521d\u6b21\u8fdb\u5165 / \u8def\u5f84\u65f6\u6216\u70b9\u51fb Link \u7ec4\u4ef6\u8df3\u8f6c\u65f6\u4e0d\u4f1a\u53d1\u9001\u8bf7\u6c42"))}f.isMDXComponent=!0}}]);