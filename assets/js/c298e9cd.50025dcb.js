"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2716],{224:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var r=n(2374);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,l=e.originalType,s=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),u=c(n),d=o,m=u["".concat(s,".").concat(d)]||u[d]||f[d]||l;return n?r.createElement(m,i(i({ref:t},p),{},{components:n})):r.createElement(m,i({ref:t},p))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=n.length,i=new Array(l);i[0]=d;var a={};for(var s in t)hasOwnProperty.call(t,s)&&(a[s]=t[s]);a.originalType=e,a[u]="string"==typeof e?e:o,i[1]=a;for(var c=2;c<l;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1574:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>f,frontMatter:()=>l,metadata:()=>a,toc:()=>c});var r=n(9963),o=(n(2374),n(224));const l={},i=void 0,a={unversionedId:"tutorial/css/flex\u76d2\u5b50\u4e5f\u53ef\u4ee5\u8bbe\u7f6eposition\u4e3aabsolute\u6216\u8005relative",id:"tutorial/css/flex\u76d2\u5b50\u4e5f\u53ef\u4ee5\u8bbe\u7f6eposition\u4e3aabsolute\u6216\u8005relative",title:"flex\u76d2\u5b50\u4e5f\u53ef\u4ee5\u8bbe\u7f6eposition\u4e3aabsolute\u6216\u8005relative",description:"\u662f\u7684\uff0cFlexbox \u5bb9\u5668\u4e2d\u7684\u9879\u76ee\uff08flex items\uff09\u540c\u6837\u53ef\u4ee5\u4f7f\u7528 position relative;\u3002Flexbox \u548c\u5b9a\u4f4d\u5c5e\u6027\u662f\u72ec\u7acb\u7684 CSS \u7279\u6027\uff0c\u53ef\u4ee5\u7ed3\u5408\u4f7f\u7528\u3002",source:"@site/docs/tutorial/css/flex\u76d2\u5b50\u4e5f\u53ef\u4ee5\u8bbe\u7f6eposition\u4e3aabsolute\u6216\u8005relative.md",sourceDirName:"tutorial/css",slug:"/tutorial/css/flex\u76d2\u5b50\u4e5f\u53ef\u4ee5\u8bbe\u7f6eposition\u4e3aabsolute\u6216\u8005relative",permalink:"/blogs/docs/tutorial/css/flex\u76d2\u5b50\u4e5f\u53ef\u4ee5\u8bbe\u7f6eposition\u4e3aabsolute\u6216\u8005relative",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/tutorial/css/flex\u76d2\u5b50\u4e5f\u53ef\u4ee5\u8bbe\u7f6eposition\u4e3aabsolute\u6216\u8005relative.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorial",previous:{title:"flex",permalink:"/blogs/docs/tutorial/css/flex"},next:{title:"flex\u76d2\u5b50\u548cblock\u76d2\u5b50\u6709\u4ec0\u4e48\u533a\u522b\uff1f",permalink:"/blogs/docs/tutorial/css/flex\u76d2\u5b50\u548cblock\u76d2\u5b50\u6709\u4ec0\u4e48\u533a\u522b\uff1f"}},s={},c=[],p={toc:c},u="wrapper";function f(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"\u662f\u7684\uff0cFlexbox \u5bb9\u5668\u4e2d\u7684\u9879\u76ee\uff08flex items\uff09\u540c\u6837\u53ef\u4ee5\u4f7f\u7528 ",(0,o.kt)("inlineCode",{parentName:"p"},"position: absolute;")," \u6216 ",(0,o.kt)("inlineCode",{parentName:"p"},"position: relative;"),"\u3002Flexbox \u548c\u5b9a\u4f4d\u5c5e\u6027\u662f\u72ec\u7acb\u7684 CSS \u7279\u6027\uff0c\u53ef\u4ee5\u7ed3\u5408\u4f7f\u7528\u3002"),(0,o.kt)("p",null,"\u5728\u4f7f\u7528 ",(0,o.kt)("inlineCode",{parentName:"p"},"position: absolute;")," \u6216 ",(0,o.kt)("inlineCode",{parentName:"p"},"position: relative;")," \u65f6\uff0c\u8fd9\u4e9b\u9879\u76ee\u5c06\u76f8\u5bf9\u4e8e\u5b83\u4eec\u6700\u8fd1\u7684\u5df2\u5b9a\u4f4d\uff08\u975e static\uff09\u7684\u7956\u5148\u5143\u7d20\u8fdb\u884c\u5b9a\u4f4d\u3002\u8fd9\u4e0d\u4f1a\u5f71\u54cd Flexbox \u5e03\u5c40\u672c\u8eab\uff0c\u4f46\u4f1a\u5f71\u54cd\u9879\u76ee\u5728 Flexbox \u5bb9\u5668\u5185\u7684\u5b9a\u4f4d\u3002"),(0,o.kt)("p",null,"\u4ee5\u4e0b\u662f\u4e00\u4e2a\u7b80\u5355\u7684\u4f8b\u5b50\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html"},'<div class="flex-container">\n  <div class="flex-item">1</div>\n  <div class="flex-item absolute">2</div>\n  <div class="flex-item">3</div>\n</div>\n')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-css"},".flex-container {\n  display: flex;\n}\n\n.flex-item {\n  flex: 1;\n  border: 1px solid #ccc;\n  padding: 10px;\n}\n\n.absolute {\n  position: absolute;\n  top: 0;\n  right: 0;\n}\n")),(0,o.kt)("p",null,"\u5728\u8fd9\u4e2a\u4f8b\u5b50\u4e2d\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},".flex-container")," \u662f\u4e00\u4e2a Flexbox \u5bb9\u5668\uff0c\u5305\u542b\u4e09\u4e2a\u5b50\u5143\u7d20",(0,o.kt)("inlineCode",{parentName:"p"},".flex-item"),"\u3002\u5176\u4e2d\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},".absolute")," \u7c7b\u88ab\u5e94\u7528\u4e8e\u7b2c\u4e8c\u4e2a\u5b50\u5143\u7d20\uff0c\u4f7f\u5176\u76f8\u5bf9\u4e8e ",(0,o.kt)("inlineCode",{parentName:"p"},".flex-container")," \u8fdb\u884c\u7edd\u5bf9\u5b9a\u4f4d\u3002\u5176\u4ed6\u5b50\u5143\u7d20\u4fdd\u6301\u5728 Flexbox \u5e03\u5c40\u4e2d\u3002"))}f.isMDXComponent=!0}}]);