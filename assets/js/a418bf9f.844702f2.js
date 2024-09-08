"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7916],{224:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>f});var n=r(2374);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),p=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},s=function(e){var t=p(e.components);return n.createElement(c.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},k=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,l=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),u=p(r),k=o,f=u["".concat(c,".").concat(k)]||u[k]||m[k]||l;return r?n.createElement(f,a(a({ref:t},s),{},{components:r})):n.createElement(f,a({ref:t},s))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=r.length,a=new Array(l);a[0]=k;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[u]="string"==typeof e?e:o,a[1]=i;for(var p=2;p<l;p++)a[p]=r[p];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}k.displayName="MDXCreateElement"},4478:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>m,frontMatter:()=>l,metadata:()=>i,toc:()=>p});var n=r(9963),o=(r(2374),r(224));const l={},a=void 0,i={unversionedId:"tutorial/css/flex\u76d2\u5b50\u548cblock\u76d2\u5b50\u6709\u4ec0\u4e48\u533a\u522b\uff1f",id:"tutorial/css/flex\u76d2\u5b50\u548cblock\u76d2\u5b50\u6709\u4ec0\u4e48\u533a\u522b\uff1f",title:"flex\u76d2\u5b50\u548cblock\u76d2\u5b50\u6709\u4ec0\u4e48\u533a\u522b\uff1f",description:"Flexbox\uff08\u5f39\u6027\u76d2\u5b50\uff09\u548cBlock\uff08\u5757\u7ea7\u76d2\u5b50\uff09\u662f\u4e24\u79cd\u4e0d\u540c\u7684CSS\u5e03\u5c40\u6a21\u578b\uff0c\u5b83\u4eec\u5206\u522b\u7528\u4e8e\u4e0d\u540c\u7684\u5e03\u5c40\u9700\u6c42\u3002",source:"@site/docs/tutorial/css/flex\u76d2\u5b50\u548cblock\u76d2\u5b50\u6709\u4ec0\u4e48\u533a\u522b\uff1f.md",sourceDirName:"tutorial/css",slug:"/tutorial/css/flex\u76d2\u5b50\u548cblock\u76d2\u5b50\u6709\u4ec0\u4e48\u533a\u522b\uff1f",permalink:"/blogs/docs/tutorial/css/flex\u76d2\u5b50\u548cblock\u76d2\u5b50\u6709\u4ec0\u4e48\u533a\u522b\uff1f",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/tutorial/css/flex\u76d2\u5b50\u548cblock\u76d2\u5b50\u6709\u4ec0\u4e48\u533a\u522b\uff1f.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorial",previous:{title:"flex\u76d2\u5b50\u4e5f\u53ef\u4ee5\u8bbe\u7f6eposition\u4e3aabsolute\u6216\u8005relative\u5417",permalink:"/blogs/docs/tutorial/css/flex\u76d2\u5b50\u4e5f\u53ef\u4ee5\u8bbe\u7f6eposition\u4e3aabsolute\u6216\u8005relative\u5417"},next:{title:"inline block\u4e5f\u53ef\u4ee5\u6a2a\u5411\u6392\u5217",permalink:"/blogs/docs/tutorial/css/inline block\u4e5f\u53ef\u4ee5\u6a2a\u5411\u6392\u5217"}},c={},p=[{value:"Flexbox\uff08\u5f39\u6027\u76d2\u5b50\uff09:",id:"flexbox\u5f39\u6027\u76d2\u5b50",level:3},{value:"Block\uff08\u5757\u7ea7\u76d2\u5b50\uff09:",id:"block\u5757\u7ea7\u76d2\u5b50",level:3}],s={toc:p},u="wrapper";function m(e){let{components:t,...r}=e;return(0,o.kt)(u,(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Flexbox\uff08\u5f39\u6027\u76d2\u5b50\uff09\u548cBlock\uff08\u5757\u7ea7\u76d2\u5b50\uff09\u662f\u4e24\u79cd\u4e0d\u540c\u7684CSS\u5e03\u5c40\u6a21\u578b\uff0c\u5b83\u4eec\u5206\u522b\u7528\u4e8e\u4e0d\u540c\u7684\u5e03\u5c40\u9700\u6c42\u3002"),(0,o.kt)("h3",{id:"flexbox\u5f39\u6027\u76d2\u5b50"},"Flexbox\uff08\u5f39\u6027\u76d2\u5b50\uff09:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"\u65b9\u5411\u6027\u5e03\u5c40\uff1a")," Flexbox \u662f\u4e00\u79cd\u4e00\u7ef4\u5e03\u5c40\u6a21\u578b\uff0c\u4e3b\u8981\u7528\u4e8e\u5728\u884c\u6216\u5217\u65b9\u5411\u4e0a\u5bf9\u9879\u76ee\u8fdb\u884c\u5e03\u5c40\u3002")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"\u5f39\u6027\u5e03\u5c40\uff1a")," Flexbox \u5141\u8bb8\u5bb9\u5668\u4e2d\u7684\u9879\u76ee\u5728\u4e3b\u8f74\uff08main axis\uff09\u548c\u4ea4\u53c9\u8f74\uff08cross axis\uff09\u4e0a\u6709\u5f39\u6027\u7a7a\u95f4\uff0c\u53ef\u4ee5\u6309\u7167\u4e00\u5b9a\u7684\u6bd4\u4f8b\u5206\u914d\u7a7a\u95f4\u3002")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"\u987a\u5e8f\u63a7\u5236\uff1a")," Flexbox \u5141\u8bb8\u901a\u8fc7 ",(0,o.kt)("inlineCode",{parentName:"p"},"order")," \u5c5e\u6027\u6765\u63a7\u5236\u9879\u76ee\u7684\u663e\u793a\u987a\u5e8f\uff0c\u8fd9\u4f7f\u5f97\u5728 HTML \u7ed3\u6784\u4e2d\u4e0d\u540c\u7684\u9879\u76ee\u53ef\u4ee5\u4ee5\u4e0d\u540c\u7684\u987a\u5e8f\u5448\u73b0\u3002")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"\u5bf9\u9f50\u548c\u5206\u5e03\uff1a")," Flexbox \u63d0\u4f9b\u4e86\u7075\u6d3b\u7684\u5bf9\u9f50\u548c\u5206\u5e03\u9009\u9879\uff0c\u53ef\u4ee5\u901a\u8fc7 ",(0,o.kt)("inlineCode",{parentName:"p"},"justify-content")," \u548c ",(0,o.kt)("inlineCode",{parentName:"p"},"align-items")," \u7b49\u5c5e\u6027\u6765\u8c03\u6574\u9879\u76ee\u5728\u5bb9\u5668\u4e2d\u7684\u4f4d\u7f6e\u3002"))),(0,o.kt)("h3",{id:"block\u5757\u7ea7\u76d2\u5b50"},"Block\uff08\u5757\u7ea7\u76d2\u5b50\uff09:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"\u65b9\u5411\u6027\u5e03\u5c40\uff1a")," Block \u5e03\u5c40\u662f\u4e00\u79cd\u4e8c\u7ef4\u5e03\u5c40\u6a21\u578b\uff0c\u4e3b\u8981\u7528\u4e8e\u5728\u9875\u9762\u4e0a\u6309\u7167\u5757\uff08block\uff09\u7684\u5f62\u5f0f\u6392\u5217\u5143\u7d20\u3002")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"\u6b63\u5e38\u6d41\uff1a")," \u5728 Block \u5e03\u5c40\u4e2d\uff0c\u5143\u7d20\u6309\u7167\u6b63\u5e38\u6d41\uff08normal flow\uff09\u6392\u5217\uff0c\u4e00\u4e2a\u5757\u7ea7\u5143\u7d20\u4f1a\u72ec\u5360\u4e00\u884c\uff0c\u5e76\u5728\u524d\u540e\u6709\u6362\u884c\u3002")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"\u5bbd\u5ea6\u81ea\u52a8\u6269\u5c55\uff1a")," \u5757\u7ea7\u5143\u7d20\u7684\u5bbd\u5ea6\u9ed8\u8ba4\u4f1a\u81ea\u52a8\u6269\u5c55\u4ee5\u5360\u636e\u7236\u5143\u7d20\u7684\u6574\u4e2a\u5bbd\u5ea6\u3002")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"\u9002\u5408\u9875\u9762\u6574\u4f53\u7ed3\u6784\uff1a")," Block \u5e03\u5c40\u9002\u7528\u4e8e\u6574\u4f53\u9875\u9762\u7ed3\u6784\u7684\u5e03\u5c40\uff0c\u4f8b\u5982\u7f51\u9875\u7684\u4e3b\u4f53\u5185\u5bb9\u533a\u57df\u3002"))),(0,o.kt)("p",null,"\u7efc\u5408\u6765\u8bf4\uff0cFlexbox \u66f4\u9002\u7528\u4e8e\u9700\u8981\u5728\u4e00\u7ef4\u7a7a\u95f4\u5185\u5bf9\u9879\u76ee\u8fdb\u884c\u7075\u6d3b\u6392\u5217\u548c\u5206\u5e03\u7684\u573a\u666f\uff0c\u800c Block \u5e03\u5c40\u66f4\u9002\u7528\u4e8e\u6574\u4f53\u9875\u9762\u7684\u7ed3\u6784\u5e03\u5c40\u3002\u5728\u5b9e\u9645\u9879\u76ee\u4e2d\uff0c\u8fd9\u4e24\u79cd\u5e03\u5c40\u6a21\u578b\u5e38\u5e38\u4f1a\u7ed3\u5408\u4f7f\u7528\uff0c\u4ee5\u6ee1\u8db3\u4e0d\u540c\u90e8\u5206\u7684\u5e03\u5c40\u9700\u6c42\u3002"))}m.isMDXComponent=!0}}]);