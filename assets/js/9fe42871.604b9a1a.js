"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3532],{8015:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>y});var r=n(757);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=r.createContext({}),l=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(i.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=l(n),f=o,y=u["".concat(i,".").concat(f)]||u[f]||d[f]||a;return n?r.createElement(y,c(c({ref:t},p),{},{components:n})):r.createElement(y,c({ref:t},p))}));function y(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,c=new Array(a);c[0]=f;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[u]="string"==typeof e?e:o,c[1]=s;for(var l=2;l<a;l++)c[l]=n[l];return r.createElement.apply(null,c)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},386:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>c,default:()=>d,frontMatter:()=>a,metadata:()=>s,toc:()=>l});var r=n(1227),o=(n(757),n(8015));const a={},c=void 0,s={unversionedId:"notes/\u6280\u672f\u6808/\u524d\u7aef/React/react styled jsx",id:"notes/\u6280\u672f\u6808/\u524d\u7aef/React/react styled jsx",title:"react styled jsx",description:"style \u8868\u793a\u540e\u9762\u662f\u6837\u5f0f \u82b1\u62ec\u53f7\u8868\u793aJSX\u8868\u8fbe\u5f0f \u53cd\u5f15\u53f7\u662f\u6a21\u677f\u5b57\u7b26\u4e32",source:"@site/docs/notes/\u6280\u672f\u6808/\u524d\u7aef/React/react styled jsx.md",sourceDirName:"notes/\u6280\u672f\u6808/\u524d\u7aef/React",slug:"/notes/\u6280\u672f\u6808/\u524d\u7aef/React/react styled jsx",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/\u524d\u7aef/React/react styled jsx",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/\u6280\u672f\u6808/\u524d\u7aef/React/react styled jsx.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"react styled component",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/\u524d\u7aef/React/react styled component"},next:{title:"useRef",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/\u524d\u7aef/React/react useRef"}},i={},l=[],p={toc:l},u="wrapper";function d(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-css"},"<style jsx>{`\n          .flip-card {\n            width: 100%;\n            height: 100%;\n            display: inline-block;\n            position: relative;\n            transform-style: preserve-3d;\n            transition: transform 0.2s;\n          }\n          \n          .flip-card-front,\n          .flip-card-back {\n            position: absolute;\n            width: 100%;\n            height: 100%;\n            backface-visibility: hidden;\n          }\n          \n          .flip-card-front {\n            z-index: 2;\n            transform: rotateY(0);\n          }\n          \n          .flip-card-back {\n            transform: rotateY(180deg);\n          }\n          \n          .flip-card.flipped {\n            transform: rotateY(180deg);\n          }\n        `}</style>\n")),(0,o.kt)("p",null,"style \u8868\u793a\u540e\u9762\u662f\u6837\u5f0f \u82b1\u62ec\u53f7\u8868\u793aJSX\u8868\u8fbe\u5f0f \u53cd\u5f15\u53f7\u662f\u6a21\u677f\u5b57\u7b26\u4e32"))}d.isMDXComponent=!0}}]);