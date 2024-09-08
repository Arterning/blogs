"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[213],{224:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>f});var r=n(2374);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},m=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),c=s(n),d=a,f=c["".concat(p,".").concat(d)]||c[d]||u[d]||i;return n?r.createElement(f,o(o({ref:t},m),{},{components:n})):r.createElement(f,o({ref:t},m))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[c]="string"==typeof e?e:a,o[1]=l;for(var s=2;s<i;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8736:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var r=n(9963),a=(n(2374),n(224));const i={},o=void 0,l={unversionedId:"tutorial/jdk/\u907f\u514dNPE",id:"tutorial/jdk/\u907f\u514dNPE",title:"\u907f\u514dNPE",description:"\u5728Java 8\u4e2d\uff0c\u4f60\u53ef\u4ee5\u901a\u8fc7\u4f7f\u7528\u6d41\uff08Stream\uff09\u548c forEach \u65b9\u6cd5\u6765\u907f\u514d\u5728\u96c6\u5408\u4e3a\u7a7a\u65f6\u5bfc\u81f4\u7a7a\u6307\u9488\u9519\u8bef\u3002\u6d41\u63d0\u4f9b\u4e86\u4e00\u79cd\u4f18\u96c5\u7684\u65b9\u5f0f\u6765\u5904\u7406\u96c6\u5408\uff0c\u53ef\u4ee5\u786e\u4fdd\u5728\u96c6\u5408\u4e3a\u7a7a\u65f6\u4e0d\u4f1a\u5f15\u53d1\u5f02\u5e38\u3002",source:"@site/docs/tutorial/jdk/\u907f\u514dNPE.md",sourceDirName:"tutorial/jdk",slug:"/tutorial/jdk/\u907f\u514dNPE",permalink:"/blogs/docs/tutorial/jdk/\u907f\u514dNPE",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/tutorial/jdk/\u907f\u514dNPE.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorial",previous:{title:"Mavn commands",permalink:"/blogs/docs/tutorial/jdk/Mavn commands"},next:{title:"mysql 2038 \u5343\u5e74\u866b\u95ee\u9898",permalink:"/blogs/docs/tutorial/mysql/mysql 2038 \u5343\u5e74\u866b\u95ee\u9898"}},p={},s=[],m={toc:s},c="wrapper";function u(e){let{components:t,...n}=e;return(0,a.kt)(c,(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"\u5728Java 8\u4e2d\uff0c\u4f60\u53ef\u4ee5\u901a\u8fc7\u4f7f\u7528\u6d41\uff08Stream\uff09\u548c ",(0,a.kt)("inlineCode",{parentName:"p"},"forEach")," \u65b9\u6cd5\u6765\u907f\u514d\u5728\u96c6\u5408\u4e3a\u7a7a\u65f6\u5bfc\u81f4\u7a7a\u6307\u9488\u9519\u8bef\u3002\u6d41\u63d0\u4f9b\u4e86\u4e00\u79cd\u4f18\u96c5\u7684\u65b9\u5f0f\u6765\u5904\u7406\u96c6\u5408\uff0c\u53ef\u4ee5\u786e\u4fdd\u5728\u96c6\u5408\u4e3a\u7a7a\u65f6\u4e0d\u4f1a\u5f15\u53d1\u5f02\u5e38\u3002"),(0,a.kt)("p",null,"\u4f8b\u5982\uff0c\u5982\u679c\u4f60\u8981\u904d\u5386\u4e00\u4e2a\u96c6\u5408\u5e76\u6267\u884c\u67d0\u4e9b\u64cd\u4f5c\uff0c\u53ef\u4ee5\u4f7f\u7528\u6d41\u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"forEach")," \u65b9\u6cd5\u3002\u4ee5\u4e0b\u662f\u4e00\u4e2a\u793a\u4f8b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},"List<String> myList = // \u4ece\u67d0\u4e2a\u5730\u65b9\u83b7\u53d6\u96c6\u5408\u6570\u636e\n\nmyList.stream()\n      .forEach(item -> {\n          // \u6267\u884c\u64cd\u4f5c\n          System.out.println(item);\n      });\n\n")),(0,a.kt)("p",null,"\u4f7f\u7528\u6d41\u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"forEach")," \u65b9\u6cd5\u53ef\u4ee5\u5b89\u5168\u5730\u5904\u7406\u7a7a\u96c6\u5408\uff0c\u4e0d\u4f1a\u5bfc\u81f4\u7a7a\u6307\u9488\u5f02\u5e38\u3002\u5982\u679c\u96c6\u5408\u4e3a\u7a7a\uff0c\u5b83\u5c06\u4e0d\u6267\u884c\u4efb\u4f55\u64cd\u4f5c\uff0c\u800c\u4e0d\u4f1a\u5f15\u53d1\u5f02\u5e38\u3002"),(0,a.kt)("p",null,"\u5982\u679c\u4f60\u8981\u5728\u96c6\u5408\u4e3a\u7a7a\u65f6\u91c7\u53d6\u7279\u5b9a\u7684\u64cd\u4f5c\uff0c\u4f60\u53ef\u4ee5\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"ifPresent")," \u65b9\u6cd5\uff0c\u5982\u4e0b\u6240\u793a\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},"List<String> myList = // \u4ece\u67d0\u4e2a\u5730\u65b9\u83b7\u53d6\u96c6\u5408\u6570\u636e\n\nmyList.stream()\n      .findFirst()\n      .ifPresent(item -> {\n          // \u96c6\u5408\u975e\u7a7a\u65f6\u6267\u884c\u64cd\u4f5c\n          System.out.println(item);\n      });\n\n")),(0,a.kt)("p",null,"\u5728\u4e0a\u8ff0\u793a\u4f8b\u4e2d\uff0c\u6211\u4eec\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"findFirst")," \u65b9\u6cd5\u83b7\u53d6\u96c6\u5408\u4e2d\u7684\u7b2c\u4e00\u4e2a\u5143\u7d20\uff0c\u7136\u540e\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"ifPresent")," \u65b9\u6cd5\u68c0\u67e5\u662f\u5426\u5b58\u5728\u5143\u7d20\uff0c\u5982\u679c\u5b58\u5728\uff0c\u5219\u6267\u884c\u64cd\u4f5c\u3002"),(0,a.kt)("p",null,"\u8fd9\u4e9b\u65b9\u6cd5\u53ef\u4ee5\u5e2e\u52a9\u4f60\u66f4\u52a0\u4f18\u96c5\u5730\u5904\u7406\u96c6\u5408\u4e3a\u7a7a\u7684\u60c5\u51b5\uff0c\u800c\u4e0d\u5fc5\u62c5\u5fc3\u7a7a\u6307\u9488\u5f02\u5e38\u3002"),(0,a.kt)("p",null,"\u4f60\u8bf4\u5f97\u5bf9\uff0c\u6211\u4e4b\u524d\u7684\u56de\u7b54\u6709\u8bef\u3002\u5982\u679c ",(0,a.kt)("inlineCode",{parentName:"p"},"myList")," \u4e3a\u7a7a\uff0c\u8c03\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"stream()")," \u65b9\u6cd5\u786e\u5b9e\u4f1a\u5f15\u53d1 ",(0,a.kt)("inlineCode",{parentName:"p"},"NullPointerException"),"\u3002\u6211\u4e3a\u4e4b\u524d\u7684\u9519\u8bef\u56de\u7b54\u8868\u793a\u6b49\u610f\u3002"),(0,a.kt)("p",null,"\u8981\u907f\u514d\u5728\u96c6\u5408\u4e3a\u7a7a\u65f6\u5f15\u53d1\u5f02\u5e38\uff0c\u4f60\u53ef\u4ee5\u5728\u8c03\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"stream()")," \u65b9\u6cd5\u4e4b\u524d\u8fdb\u884c\u7a7a\u68c0\u67e5\uff0c\u4f8b\u5982\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},"List<String> myList = // \u4ece\u67d0\u4e2a\u5730\u65b9\u83b7\u53d6\u96c6\u5408\u6570\u636e\n\nif (myList != null) {\n    myList.stream()\n          .forEach(item -> {\n              // \u6267\u884c\u64cd\u4f5c\n              System.out.println(item);\n          });\n}\n\n")),(0,a.kt)("p",null,"\u6216\u8005\uff0c\u5982\u679c\u4f60\u4f7f\u7528 Java 8+\uff0c\u4f60\u53ef\u4ee5\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," \u6765\u5904\u7406\u7a7a\u96c6\u5408\uff0c\u5982\u4e0b\u6240\u793a\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},"List<String> myList = // \u4ece\u67d0\u4e2a\u5730\u65b9\u83b7\u53d6\u96c6\u5408\u6570\u636e\n\nOptional.ofNullable(myList)\n        .orElse(Collections.emptyList())\n        .stream()\n        .forEach(item -> {\n            // \u6267\u884c\u64cd\u4f5c\n            System.out.println(item);\n        });\n\n")),(0,a.kt)("p",null,"\u5728\u4e0a\u8ff0\u793a\u4f8b\u4e2d\uff0c\u6211\u4eec\u9996\u5148\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional.ofNullable(myList)")," \u5c06 ",(0,a.kt)("inlineCode",{parentName:"p"},"myList")," \u8f6c\u6362\u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional"),"\uff0c\u7136\u540e\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"orElse(Collections.emptyList())")," \u6765\u63d0\u4f9b\u4e00\u4e2a\u9ed8\u8ba4\u7684\u7a7a\u96c6\u5408\uff0c\u8fd9\u6837\u5c31\u53ef\u4ee5\u786e\u4fdd\u5728 ",(0,a.kt)("inlineCode",{parentName:"p"},"myList")," \u4e3a\u7a7a\u65f6\u4e0d\u4f1a\u5f15\u53d1\u5f02\u5e38\u3002"),(0,a.kt)("p",null,"\u8fd9\u6837\u53ef\u4ee5\u5b89\u5168\u5730\u5904\u7406\u7a7a\u96c6\u5408\u7684\u60c5\u51b5\uff0c\u800c\u4e0d\u5fc5\u62c5\u5fc3\u7a7a\u6307\u9488\u5f02\u5e38\u3002"))}u.isMDXComponent=!0}}]);