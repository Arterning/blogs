"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8222],{224:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>k});var n=r(2374);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),c=p(r),m=o,k=c["".concat(l,".").concat(m)]||c[m]||d[m]||a;return r?n.createElement(k,i(i({ref:t},u),{},{components:r})):n.createElement(k,i({ref:t},u))}));function k(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[c]="string"==typeof e?e:o,i[1]=s;for(var p=2;p<a;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},1053:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>s,toc:()=>p});var n=r(9963),o=(r(2374),r(224));const a={},i=void 0,s={unversionedId:"notes/\u6280\u672f\u6808/\u540e\u7aef/redis/redis \u961f\u5217",id:"notes/\u6280\u672f\u6808/\u540e\u7aef/redis/redis \u961f\u5217",title:"redis \u961f\u5217",description:"LPUSH\u3001RPOP \u5b58\u5728\u4e00\u4e2a\u6027\u80fd\u98ce\u9669\uff0c\u751f\u4ea7\u8005\u5411\u961f\u5217\u63d2\u5165\u6570\u636e\u7684\u65f6\u5019\uff0cList \u5e76\u4e0d\u4f1a\u4e3b\u52a8\u901a\u77e5\u6d88\u8d39\u8005\u53ca\u65f6\u6d88\u8d39\u3002\u6211\u4eec\u9700\u8981\u5199\u4e00\u4e2a while(true) \u4e0d\u505c\u5730\u8c03\u7528 RPOP \u6307\u4ee4\uff0c\u5f53\u6709\u65b0\u6d88\u606f\u5c31\u4f1a\u8fd4\u56de\u6d88\u606f\uff0c\u5426\u5219\u8fd4\u56de\u7a7a\u3002",source:"@site/docs/notes/\u6280\u672f\u6808/\u540e\u7aef/redis/redis \u961f\u5217.md",sourceDirName:"notes/\u6280\u672f\u6808/\u540e\u7aef/redis",slug:"/notes/\u6280\u672f\u6808/\u540e\u7aef/redis/redis \u961f\u5217",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/\u540e\u7aef/redis/redis \u961f\u5217",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/\u6280\u672f\u6808/\u540e\u7aef/redis/redis \u961f\u5217.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"redis \u53d1\u5e03\u8ba2\u9605\u6a21\u578b",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/\u540e\u7aef/redis/redis \u53d1\u5e03\u8ba2\u9605\u6a21\u578b"},next:{title:"\u4ec0\u4e48\u662fIO\u5bc6\u96c6\u578b\u548cCPU\u5bc6\u96c6\u578b",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/\u540e\u7aef/\u4ec0\u4e48\u662fIO\u5bc6\u96c6\u578b\u548cCPU\u5bc6\u96c6\u578b"}},l={},p=[{value:"\u91cd\u590d\u6d88\u8d39\u7684\u95ee\u9898",id:"\u91cd\u590d\u6d88\u8d39\u7684\u95ee\u9898",level:2},{value:"<strong>\u6d88\u606f\u53ef\u9760\u6027</strong>",id:"\u6d88\u606f\u53ef\u9760\u6027",level:2}],u={toc:p},c="wrapper";function d(e){let{components:t,...r}=e;return(0,o.kt)(c,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-css"},'> LPUSH queue Java \u7801\u54e5\u5b57\u8282 Go\n(integer) 3\n\n> RPOP queue\n"Java"\n> RPOP queue\n"\u7801\u54e5\u5b57\u8282"\n> RPOP queue\n"Go"\n')),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"LPUSH\u3001RPOP")," \u5b58\u5728\u4e00\u4e2a\u6027\u80fd\u98ce\u9669\uff0c\u751f\u4ea7\u8005\u5411\u961f\u5217\u63d2\u5165\u6570\u636e\u7684\u65f6\u5019\uff0cList \u5e76\u4e0d\u4f1a\u4e3b\u52a8\u901a\u77e5\u6d88\u8d39\u8005\u53ca\u65f6\u6d88\u8d39\u3002\u6211\u4eec\u9700\u8981\u5199\u4e00\u4e2a ",(0,o.kt)("inlineCode",{parentName:"p"},"while(true)")," \u4e0d\u505c\u5730\u8c03\u7528 ",(0,o.kt)("inlineCode",{parentName:"p"},"RPOP")," \u6307\u4ee4\uff0c\u5f53\u6709\u65b0\u6d88\u606f\u5c31\u4f1a\u8fd4\u56de\u6d88\u606f\uff0c\u5426\u5219\u8fd4\u56de\u7a7a\u3002"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u8981\u5982\u4f55\u907f\u514d\u5faa\u73af\u8c03\u7528\u5bfc\u81f4\u7684 CPU \u6027\u80fd\u635f\u8017\u5462\uff1f")),(0,o.kt)("p",null,"Redis \u63d0\u4f9b\u4e86 ",(0,o.kt)("inlineCode",{parentName:"p"},"BLPOP\u3001BRPOP")," \u963b\u585e\u8bfb\u53d6\u7684\u547d\u4ee4\uff0c",(0,o.kt)("strong",{parentName:"p"},"\u6d88\u8d39\u8005\u5728\u5728\u8bfb\u53d6\u961f\u5217\u6ca1\u6709\u6570\u636e\u7684\u65f6\u5019\u81ea\u52a8\u963b\u585e\uff0c\u76f4\u5230\u6709\u65b0\u7684\u6d88\u606f\u5199\u5165\u961f\u5217\uff0c\u624d\u4f1a\u7ee7\u7eed\u8bfb\u53d6\u65b0\u6d88\u606f\u6267\u884c\u4e1a\u52a1\u903b\u8f91\u3002")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"BRPOP queue 0")),(0,o.kt)("p",null,"\u53c2\u6570 0 \u8868\u793a\u963b\u585e\u7b49\u5f85\u65f6\u95f4\u65e0\u65e0\u9650\u5236"),(0,o.kt)("p",null,"\u6ce8\u610f queue\u53ea\u662f\u4e00\u4e2a\u540d\u5b57 \uff0c\u6211\u4eec\u53ef\u4ee5\u6539\u6210\u5176\u4ed6"),(0,o.kt)("p",null,"\u6709\u4e2a\u60f3\u6cd5\uff0c\u7528\u4e24\u4e2a\u670d\u52a1\u5668\uff0cnode\u5904\u7406\u8bf7\u6c42\uff0c\u628a\u6570\u636e\u5168\u90e8push\u5230 redis\u7f13\u5b58\u961f\u5217\u4e2d\uff0c\u53e6\u4e00\u4e2aphp\u670d\u52a1\u5668\u4e0d\u65ad\u7684pop\u8fd9\u4e2a\u961f\u5217\u91cc\u7684\u6570\u636e\u7136\u540e\u4e0emysql\u4ea4\u4e92\u505a\u6301\u4e45\u5316\u3002\u5927\u5bb6\u89c9\u5f97\u8fd9\u4e48\u505a\u600e\u4e48\u6837\uff1f"),(0,o.kt)("h2",{id:"\u91cd\u590d\u6d88\u8d39\u7684\u95ee\u9898"},"\u91cd\u590d\u6d88\u8d39\u7684\u95ee\u9898"),(0,o.kt)("p",null,"\u91cd\u590d\u6d88\u8d39 \u6d88\u606f\u961f\u5217\u4e3a\u6bcf\u4e00\u6761\u6d88\u606f\u751f\u6210\u4e00\u4e2a\u300c\u5168\u5c40 ID\u300d\uff1b \u751f\u4ea7\u8005\u4e3a\u6bcf\u4e00\u6761\u6d88\u606f\u521b\u5efa\u4e00\u6761\u300c\u5168\u5c40 ID\u300d\uff0c\u6d88\u8d39\u8005\u628a\u4e00\u4ef6\u5904\u7406\u8fc7\u7684\u6d88\u606f ID \u8bb0\u5f55\u4e0b\u6765\u5224\u65ad\u662f\u5426\u91cd\u590d\u3002"),(0,o.kt)("h2",{id:"\u6d88\u606f\u53ef\u9760\u6027"},(0,o.kt)("strong",{parentName:"h2"},"\u6d88\u606f\u53ef\u9760\u6027")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u6d88\u8d39\u8005\u4ece List \u4e2d\u8bfb\u53d6\u4e00\u6761\u5728\u6d88\u606f\u5904\u7406\u8fc7\u7a0b\u4e2d\u5b95\u673a\u4e86\u5c31\u4f1a\u5bfc\u81f4\u6d88\u606f\u6ca1\u6709\u5904\u7406\u5b8c\u6210\uff0c\u53ef\u662f\u6570\u636e\u5df2\u7ecf\u6ca1\u6709\u4fdd\u5b58\u5728 List \u4e2d\u4e86\u548b\u529e\uff1f")),(0,o.kt)("p",null,"\u672c\u8d28\u5c31\u662f\u6d88\u8d39\u8005\u5728\u5904\u7406\u6d88\u606f\u7684\u65f6\u5019\u5d29\u6e83\u4e86\uff0c\u5c31\u65e0\u6cd5\u518d\u8fd8\u539f\u6d88\u606f\uff0c\u7f3a\u4e4f\u4e00\u4e2a\u6d88\u606f\u786e\u8ba4\u673a\u5236\u3002"),(0,o.kt)("p",null,"Redis \u63d0\u4f9b\u4e86 ",(0,o.kt)("inlineCode",{parentName:"p"},"RPOPLPUSH\u3001BRPOPLPUSH(\u963b\u585e)"),"\u4e24\u4e2a\u6307\u4ee4\uff0c\u542b\u4e49\u662f\u4ece List \u4ece\u8bfb\u53d6\u6d88\u606f\u7684\u540c\u65f6\u628a\u8fd9\u6761\u6d88\u606f\u590d\u5236\u5230\u53e6\u4e00\u4e2a List \u4e2d\uff08\u5907\u4efd\uff09\uff0c\u5e76\u4e14\u662f\u539f\u5b50\u64cd\u4f5c\u3002"),(0,o.kt)("p",null,"\u6211\u4eec\u5c31\u53ef\u4ee5\u5728\u4e1a\u52a1\u6d41\u7a0b\u6b63\u786e\u5904\u7406\u5b8c\u6210\u540e\u518d\u5220\u9664\u961f\u5217\u6d88\u606f\u5b9e\u73b0\u6d88\u606f\u786e\u8ba4\u673a\u5236\u3002\u5982\u679c\u5728\u5904\u7406\u6d88\u606f\u7684\u65f6\u5019\u5b95\u673a\u4e86\uff0c\u91cd\u542f\u540e\u518d\u4ece\u5907\u4efd List \u4e2d\u8bfb\u53d6\u6d88\u606f\u5904\u7406\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"LPUSH redisMQ key value\nBRPOPLPUSH redisMQ redisMQBackup #\u4eceredisMQ\u4e2d\u8bfb\u53d6\u6570\u636e\u5e76\u4e14\u540c\u65f6\u5907\u4efd\u5230redisMQBackup \n")),(0,o.kt)("p",null,"\u5982\u679c\u6d88\u8d39\u6210\u529f\u5219\u628a\u300credisMQBackup \u300d\u7684\u6d88\u606f\u5220\u9664\u5373\u53ef\uff0c\u5f02\u5e38\u7684\u8bdd\u53ef\u4ee5\u7ee7\u7eed\u4ece \u300credisMQBackup \u300d\u518d\u6b21\u8bfb\u53d6\u6d88\u606f\u5904\u7406\u3002"))}d.isMDXComponent=!0}}]);