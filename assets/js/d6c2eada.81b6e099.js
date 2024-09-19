"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2565],{8015:(e,t,r)=>{r.d(t,{Zo:()=>i,kt:()=>m});var n=r(757);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),u=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},i=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,l=e.originalType,s=e.parentName,i=c(e,["components","mdxType","originalType","parentName"]),p=u(r),f=o,m=p["".concat(s,".").concat(f)]||p[f]||d[f]||l;return r?n.createElement(m,a(a({ref:t},i),{},{components:r})):n.createElement(m,a({ref:t},i))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=r.length,a=new Array(l);a[0]=f;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c[p]="string"==typeof e?e:o,a[1]=c;for(var u=2;u<l;u++)a[u]=r[u];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},5567:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>d,frontMatter:()=>l,metadata:()=>c,toc:()=>u});var n=r(1227),o=(r(757),r(8015));const l={},a=void 0,c={unversionedId:"tutorial/css/css \u81ea\u5b9a\u4e49\u5c5e\u6027",id:"tutorial/css/css \u81ea\u5b9a\u4e49\u5c5e\u6027",title:"css \u81ea\u5b9a\u4e49\u5c5e\u6027",description:"CSS \u81ea\u5b9a\u4e49\u5c5e\u6027",source:"@site/docs/tutorial/css/css \u81ea\u5b9a\u4e49\u5c5e\u6027.md",sourceDirName:"tutorial/css",slug:"/tutorial/css/css \u81ea\u5b9a\u4e49\u5c5e\u6027",permalink:"/blogs/docs/tutorial/css/css \u81ea\u5b9a\u4e49\u5c5e\u6027",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/tutorial/css/css \u81ea\u5b9a\u4e49\u5c5e\u6027.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorial",previous:{title:"css \u7f16\u5199\u601d\u8def",permalink:"/blogs/docs/tutorial/css/css \u7f16\u5199\u601d\u8def"},next:{title:"css \u8fc7\u6e21\u548c\u52a8\u753b",permalink:"/blogs/docs/tutorial/css/css \u8fc7\u6e21\u548c\u52a8\u753b"}},s={},u=[{value:"CSS \u81ea\u5b9a\u4e49\u5c5e\u6027",id:"css-\u81ea\u5b9a\u4e49\u5c5e\u6027",level:2},{value:"\u4f7f\u7528\u81ea\u5b9a\u4e49\u5c5e\u6027\u7684\u597d\u5904",id:"\u4f7f\u7528\u81ea\u5b9a\u4e49\u5c5e\u6027\u7684\u597d\u5904",level:2}],i={toc:u},p="wrapper";function d(e){let{components:t,...r}=e;return(0,o.kt)(p,(0,n.Z)({},i,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"css-\u81ea\u5b9a\u4e49\u5c5e\u6027"},"CSS \u81ea\u5b9a\u4e49\u5c5e\u6027"),(0,o.kt)("p",null,"var(--td-text-color-brand) \u8fd9\u79cd\u8bed\u6cd5\u662f CSS \u81ea\u5b9a\u4e49\u5c5e\u6027\uff08Custom Properties\uff09\u7684\u7528\u6cd5\u3002\u5b83\u8868\u793a\u5f15\u7528\u4e86\u4e00\u4e2a\u540d\u4e3a --td-text-color-brand \u7684\u81ea\u5b9a\u4e49\u5c5e\u6027\u7684\u503c\u3002\u81ea\u5b9a\u4e49\u5c5e\u6027\u5141\u8bb8\u5f00\u53d1\u4eba\u5458\u5b9a\u4e49\u4e00\u4e9b\u53ef\u4ee5\u5728\u6574\u4e2a\u6587\u6863\u4e2d\u91cd\u590d\u4f7f\u7528\u7684\u503c\u3002\u53ef\u4ee5\u5728\u4e0d\u540c\u7684\u9009\u62e9\u5668\u4e2d\u5b9a\u4e49\u8fd9\u4e9b\u81ea\u5b9a\u4e49\u5c5e\u6027\uff0c\u5e76\u4e14\u5728\u9700\u8981\u65f6\u5f15\u7528\u5b83\u4eec\u3002"),(0,o.kt)("p",null,"\u5728 CSS \u4e2d\uff0c\u81ea\u5b9a\u4e49\u5c5e\u6027\u5fc5\u987b\u4ee5 -- \u4e3a\u524d\u7f00\u547d\u540d\u3002\u8fd9\u662f\u4e3a\u4e86\u4e0e CSS \u9884\u5b9a\u4e49\u5c5e\u6027\u533a\u5206\u5f00\u6765\uff0c\u4ee5\u907f\u514d\u547d\u540d\u51b2\u7a81\u3002"),(0,o.kt)("p",null,"\u4f8b\u5982\uff0c\u5982\u679c\u6ca1\u6709\u524d\u7f00\uff0c\u81ea\u5b9a\u4e49\u5c5e\u6027 td-text-color-brand \u53ef\u80fd\u4f1a\u4e0e CSS \u9884\u5b9a\u4e49\u5c5e\u6027 color \u51b2\u7a81\u3002\u4e3a\u907f\u514d\u8fd9\u79cd\u60c5\u51b5\uff0c\u81ea\u5b9a\u4e49\u5c5e\u6027\u5fc5\u987b\u4ee5 -- \u4e3a\u524d\u7f00\uff0c\u8fd9\u6837\u5b83\u4eec\u5c31\u53ef\u4ee5\u5728 CSS \u4ee3\u7801\u4e2d\u5b89\u5168\u4f7f\u7528\u4e86\u3002"),(0,o.kt)("p",null,"\u81ea\u5b9a\u4e49\u5c5e\u6027\u901a\u5e38\u5728\u5168\u5c40 CSS \u6837\u5f0f\u6587\u4ef6\u6216\u8005\u5728\u67d0\u4e2a\u7279\u5b9a\u7684\u7ec4\u4ef6\u7684\u6837\u5f0f\u6587\u4ef6\u4e2d\u5b9a\u4e49\u3002\u5728 CSS \u4ee3\u7801\u4e2d\uff0c\u5b83\u4eec\u7684\u5b9a\u4e49\u901a\u5e38\u4f4d\u4e8e\u5143\u7d20\u7684\u6839\u9009\u62e9\u5668\u4e0a\uff0c\u4f8b\u5982\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-css"},":root {\n  --td-text-color-brand: #007bff;\n}\n\n")),(0,o.kt)("p",null,"\u4e5f\u53ef\u4ee5\u5728\u67d0\u4e2a\u7279\u5b9a\u7ec4\u4ef6\u7684\u9009\u62e9\u5668\u4e2d\u5b9a\u4e49\uff0c\u4f8b\u5982\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-css"},".header {\n  --header-background-color: #fff;\n}\n")),(0,o.kt)("p",null,"\u5728 CSS \u6587\u4ef6\u7684\u5f00\u5934\u6216\u7ed3\u5c3e\u5904\u5b9a\u4e49\u81ea\u5b9a\u4e49\u5c5e\u6027\u662f\u6700\u5e38\u89c1\u7684\u5b9e\u8df5\uff0c\u5e76\u4e14\u5b83\u4eec\u901a\u5e38\u662f\u5168\u5c40\u7684\uff0c\u56e0\u6b64\u53ef\u4ee5\u5728\u6574\u4e2a\u9879\u76ee\u4e2d\u968f\u5904\u4f7f\u7528\u3002"),(0,o.kt)("p",null,"root\u524d\u9762\u4e3a\u4ec0\u4e48\u8981\u52a0\u5192\u53f7\uff0c\u8fd9\u4ee3\u8868\u4ec0\u4e48\uff1f"),(0,o.kt)("p",null,":root \u662f\u4e00\u4e2a\u7279\u6b8a\u7684\u9009\u62e9\u5668\uff0c\u5b83\u4ee3\u8868\u4e86\u6587\u6863\u7684\u6839\u5143\u7d20\u3002\u5728 HTML \u6587\u6863\u4e2d\uff0c\u6839\u5143\u7d20\u901a\u5e38\u662f ",(0,o.kt)("inlineCode",{parentName:"p"},"<html>")," \u5143\u7d20\u3002"),(0,o.kt)("p",null,"\u5192\u53f7 (:) \u8868\u793a :root \u662f\u4e00\u4e2a\u4f2a\u7c7b\u9009\u62e9\u5668\u3002\u4f2a\u7c7b\u9009\u62e9\u5668\u7528\u4e8e\u9009\u62e9\u5143\u7d20\u7684\u7279\u5b9a\u72b6\u6001\u6216\u7c7b\u578b\u3002\u4e0e\u5176\u4ed6\u9009\u62e9\u5668\u4e0d\u540c\uff0c\u4f2a\u7c7b\u9009\u62e9\u5668\u4e0d\u4f1a\u5339\u914d\u4efb\u4f55\u7279\u5b9a\u7684\u5143\u7d20\uff0c\u800c\u662f\u63d0\u4f9b\u4e86\u4e00\u79cd\u64cd\u4f5c\u5143\u7d20\u72b6\u6001\u7684\u65b9\u5f0f\u3002"),(0,o.kt)("p",null,"\u56e0\u6b64\uff0c\u5728\u5b9a\u4e49\u81ea\u5b9a\u4e49\u5c5e\u6027\u65f6\u4f7f\u7528 :root \u9009\u62e9\u5668\u610f\u5473\u7740\u8be5\u81ea\u5b9a\u4e49\u5c5e\u6027\u5c06\u5728\u6574\u4e2a\u6587\u6863\u4e2d\u53ef\u7528\uff0c\u5e76\u4e14\u53ef\u4ee5\u5728\u4efb\u4f55\u5143\u7d20\u4e0a\u5f15\u7528\u5b83\u3002"),(0,o.kt)("h2",{id:"\u4f7f\u7528\u81ea\u5b9a\u4e49\u5c5e\u6027\u7684\u597d\u5904"},"\u4f7f\u7528\u81ea\u5b9a\u4e49\u5c5e\u6027\u7684\u597d\u5904"),(0,o.kt)("p",null,"\u4f7f\u7528\u81ea\u5b9a\u4e49\u5c5e\u6027\u7684\u4f18\u70b9\u6709\u4ee5\u4e0b\u51e0\u70b9\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"\u63d0\u9ad8\u4ee3\u7801\u53ef\u8bfb\u6027\uff1a\u81ea\u5b9a\u4e49\u5c5e\u6027\u53ef\u4ee5\u63d0\u4f9b\u66f4\u5177\u53ef\u8bfb\u6027\u7684\u6837\u5f0f\u5b9a\u4e49\uff0c\u5e76\u4e14\u53ef\u4ee5\u4f7f\u4ee3\u7801\u66f4\u6613\u4e8e\u7ef4\u62a4\u548c\u4fee\u6539\u3002\n\n\u589e\u52a0\u4ee3\u7801\u53ef\u7ef4\u62a4\u6027\uff1a\u4f7f\u7528\u81ea\u5b9a\u4e49\u5c5e\u6027\u53ef\u4ee5\u51cf\u5c11\u4ee3\u7801\u5197\u4f59\uff0c\u5e76\u4e14\u53ef\u4ee5\u4f7f\u4ee3\u7801\u66f4\u6613\u4e8e\u7ef4\u62a4\u3002\u5982\u679c\u9700\u8981\u66f4\u6539\u67d0\u4e2a\u6837\u5f0f\uff0c\u53ea\u9700\u8981\u66f4\u6539\u4e00\u4e2a\u5730\u65b9\u5373\u53ef\u3002\n\n\u589e\u52a0\u4ee3\u7801\u53ef\u91cd\u7528\u6027\uff1a\u81ea\u5b9a\u4e49\u5c5e\u6027\u53ef\u4ee5\u5728\u591a\u4e2a\u5143\u7d20\u6216\u7ec4\u4ef6\u4e0a\u4f7f\u7528\uff0c\u4ece\u800c\u63d0\u9ad8\u4ee3\u7801\u7684\u53ef\u91cd\u7528\u6027\u3002\n\n\u63d0\u9ad8\u4ee3\u7801\u7684\u53ef\u6269\u5c55\u6027\uff1a\u5982\u679c\u5728\u672a\u6765\u9700\u8981\u66f4\u6539\u5e94\u7528\u7a0b\u5e8f\u7684\u6837\u5f0f\uff0c\u81ea\u5b9a\u4e49\u5c5e\u6027\u53ef\u4ee5\u4f7f\u4ee3\u7801\u66f4\u6613\u4e8e\u6269\u5c55\u548c\u66f4\u6539\u3002\n\n\u589e\u52a0\u4ee3\u7801\u7684\u53ef\u63a7\u6027\uff1a\u4f7f\u7528\u81ea\u5b9a\u4e49\u5c5e\u6027\u53ef\u4ee5\u8ba9\u5f00\u53d1\u4eba\u5458\u5bf9\u6837\u5f0f\u5b9a\u4e49\u8fdb\u884c\u66f4\u597d\u7684\u63a7\u5236\uff0c\u5e76\u4e14\u53ef\u4ee5\u907f\u514d\u5168\u5c40\u6837\u5f0f\u7684\u4e0d\u826f\u5f71\u54cd\u3002\n")),(0,o.kt)("p",null,"\u603b\u7684\u6765\u8bf4\uff0c\u4f7f\u7528\u81ea\u5b9a\u4e49\u5c5e\u6027\u53ef\u4ee5\u4f7f CSS \u4ee3\u7801\u66f4\u52a0\u6e05\u6670\u3001\u53ef\u8bfb\u3001\u53ef\u7ef4\u62a4\u3001\u53ef\u91cd\u7528\u548c\u53ef\u6269\u5c55\uff0c\u4ece\u800c\u63d0\u9ad8\u4ee3\u7801\u7684\u53ef\u9760\u6027\u548c\u53ef\u7528\u6027\u3002"))}d.isMDXComponent=!0}}]);