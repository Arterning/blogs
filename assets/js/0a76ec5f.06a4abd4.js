"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5998],{3905:(e,o,n)=>{n.d(o,{Zo:()=>d,kt:()=>m});var t=n(7294);function l(e,o,n){return o in e?Object.defineProperty(e,o,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[o]=n,e}function r(e,o){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);o&&(t=t.filter((function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable}))),n.push.apply(n,t)}return n}function a(e){for(var o=1;o<arguments.length;o++){var n=null!=arguments[o]?arguments[o]:{};o%2?r(Object(n),!0).forEach((function(o){l(e,o,n[o])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(n,o))}))}return e}function g(e,o){if(null==e)return{};var n,t,l=function(e,o){if(null==e)return{};var n,t,l={},r=Object.keys(e);for(t=0;t<r.length;t++)n=r[t],o.indexOf(n)>=0||(l[n]=e[n]);return l}(e,o);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(t=0;t<r.length;t++)n=r[t],o.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var i=t.createContext({}),u=function(e){var o=t.useContext(i),n=o;return e&&(n="function"==typeof e?e(o):a(a({},o),e)),n},d=function(e){var o=u(e.components);return t.createElement(i.Provider,{value:o},e.children)},p="mdxType",c={inlineCode:"code",wrapper:function(e){var o=e.children;return t.createElement(t.Fragment,{},o)}},s=t.forwardRef((function(e,o){var n=e.components,l=e.mdxType,r=e.originalType,i=e.parentName,d=g(e,["components","mdxType","originalType","parentName"]),p=u(n),s=l,m=p["".concat(i,".").concat(s)]||p[s]||c[s]||r;return n?t.createElement(m,a(a({ref:o},d),{},{components:n})):t.createElement(m,a({ref:o},d))}));function m(e,o){var n=arguments,l=o&&o.mdxType;if("string"==typeof e||l){var r=n.length,a=new Array(r);a[0]=s;var g={};for(var i in o)hasOwnProperty.call(o,i)&&(g[i]=o[i]);g.originalType=e,g[p]="string"==typeof e?e:l,a[1]=g;for(var u=2;u<r;u++)a[u]=n[u];return t.createElement.apply(null,a)}return t.createElement.apply(null,n)}s.displayName="MDXCreateElement"},8785:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>i,contentTitle:()=>a,default:()=>c,frontMatter:()=>r,metadata:()=>g,toc:()=>u});var t=n(7462),l=(n(7294),n(3905));const r={},a="go \u6a21\u5757\u5316\u57fa\u7840",g={unversionedId:"BackEnd/go-lang/base",id:"BackEnd/go-lang/base",title:"go \u6a21\u5757\u5316\u57fa\u7840",description:"go run main.go",source:"@site/docs/BackEnd/go-lang/base.md",sourceDirName:"BackEnd/go-lang",slug:"/BackEnd/go-lang/base",permalink:"/blogs/docs/BackEnd/go-lang/base",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/BackEnd/go-lang/base.md",tags:[],version:"current",frontMatter:{},sidebar:"BackEnd",previous:{title:"Upload to dockerhub",permalink:"/blogs/docs/BackEnd/deploy/uploadDockerHub"},next:{title:"mysql \u5b57\u6bb5\u7c7b\u578b",permalink:"/blogs/docs/BackEnd/mysql/mysql \u5b57\u6bb5\u7c7b\u578b"}},i={},u=[{value:"go run main.go",id:"go-run-maingo",level:2},{value:"go get",id:"go-get",level:2},{value:"go install",id:"go-install",level:2},{value:"go mod",id:"go-mod",level:2},{value:"go install \u548c go mod install",id:"go-install-\u548c-go-mod-install",level:2},{value:"go vendor",id:"go-vendor",level:2}],d={toc:u},p="wrapper";function c(e){let{components:o,...n}=e;return(0,l.kt)(p,(0,t.Z)({},d,n,{components:o,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"go-\u6a21\u5757\u5316\u57fa\u7840"},"go \u6a21\u5757\u5316\u57fa\u7840"),(0,l.kt)("h2",{id:"go-run-maingo"},"go run main.go"),(0,l.kt)("p",null,"\u5f53\u4f60\u4f7f\u7528 go run main.go \u547d\u4ee4\u6267\u884c Go \u7a0b\u5e8f\u65f6\uff0cGo \u8bed\u8a00\u7684\u7f16\u8bd1\u5668\u5c06\u4f1a\u628a\u4ee3\u7801\u7f16\u8bd1\u6210\u53ef\u6267\u884c\u7684\u673a\u5668\u7801\uff0c\u7136\u540e\u5728\u5185\u5b58\u4e2d\u6267\u884c\u8fd9\u4e2a\u7a0b\u5e8f\u3002\u5728\u8fd9\u79cd\u60c5\u51b5\u4e0b\uff0c\u6ca1\u6709\u751f\u6210\u4efb\u4f55\u53ef\u6267\u884c\u6587\u4ef6\uff0c\u4e5f\u4e0d\u4f1a\u5728\u78c1\u76d8\u4e0a\u751f\u6210\u4efb\u4f55\u6587\u4ef6\u3002"),(0,l.kt)("p",null,"\u5982\u679c\u4f60\u60f3\u751f\u6210\u53ef\u6267\u884c\u6587\u4ef6\uff0c\u53ef\u4ee5\u4f7f\u7528 go build \u547d\u4ee4\uff0c\u8be5\u547d\u4ee4\u4f1a\u751f\u6210\u4e00\u4e2a\u540d\u4e3a main \u7684\u53ef\u6267\u884c\u6587\u4ef6\uff0c\u5e76\u5c06\u5176\u5b58\u50a8\u5728\u5f53\u524d\u76ee\u5f55\u4e0b\u3002"),(0,l.kt)("p",null,"\u4f8b\u5982\uff1a"),(0,l.kt)("p",null,"go build main.go"),(0,l.kt)("p",null,"\u8fd9\u6837\uff0c\u4f60\u5c31\u53ef\u4ee5\u5728\u5f53\u524d\u76ee\u5f55\u4e0b\u627e\u5230\u4e00\u4e2a\u53ef\u6267\u884c\u6587\u4ef6 main\uff0c\u53ef\u4ee5\u4f7f\u7528\u8be5\u6587\u4ef6\u6267\u884c\u4f60\u7684\u7a0b\u5e8f\u3002"),(0,l.kt)("h2",{id:"go-get"},"go get"),(0,l.kt)("p",null,"go get \u662f Go \u8bed\u8a00\u7684\u547d\u4ee4\u884c\u5de5\u5177\uff0c\u7528\u4e8e\u4e0b\u8f7d\u3001\u7f16\u8bd1\u3001\u5b89\u88c5\u548c\u7ba1\u7406 Go \u8bed\u8a00\u7684\u4f9d\u8d56\u5305\u3002\u5b83\u7684\u4e3b\u8981\u529f\u80fd\u662f\uff1a"),(0,l.kt)("p",null,"\u4e0b\u8f7d\u6307\u5b9a\u7684 Go \u8bed\u8a00\u5305\u5e76\u5c06\u5176\u5b58\u50a8\u5728 $GOPATH/src \u76ee\u5f55\u4e2d\u3002\u7f16\u8bd1\u8be5\u5305\u53ca\u5176\u4f9d\u8d56\u5305\u3002"),(0,l.kt)("p",null,"\u5b89\u88c5\u8be5\u5305\u53ca\u5176\u4f9d\u8d56\u5305\u7684\u53ef\u6267\u884c\u6587\u4ef6\u5230 $GOPATH/bin \u76ee\u5f55\u4e2d\u3002"),(0,l.kt)("p",null,"\u4f7f\u7528\u65b9\u6cd5\u5f88\u7b80\u5355\uff0c\u53ea\u9700\u5728\u547d\u4ee4\u884c\u4e2d\u8f93\u5165\u4ee5\u4e0b\u547d\u4ee4\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-go"},"go get <package-name>\ngo get github.com/golang/example\n")),(0,l.kt)("p",null,"\u8fd9\u6837\uff0cGo \u5c31\u4f1a\u4e0b\u8f7d\u3001\u7f16\u8bd1\u3001\u5b89\u88c5 github.com/golang/example \u5305\u3002\u4f60\u4e5f\u53ef\u4ee5\u4f7f\u7528 -u \u53c2\u6570\u6765\u66f4\u65b0\u5df2\u7ecf\u5b89\u88c5\u7684\u5305\uff1a"),(0,l.kt)("h2",{id:"go-install"},"go install"),(0,l.kt)("p",null,"\u7528\u4e8e\u7f16\u8bd1\u5e76\u5b89\u88c5 Go \u7a0b\u5e8f\u3002\u5b83\u7684\u4f5c\u7528\u662f\uff1a"),(0,l.kt)("p",null,"\u7f16\u8bd1\u6307\u5b9a\u7684\u5305\uff0c\u5e76\u751f\u6210\u76f8\u5e94\u7684\u4e8c\u8fdb\u5236\u6587\u4ef6\u3002"),(0,l.kt)("p",null,"\u5c06\u7f16\u8bd1\u597d\u7684\u4e8c\u8fdb\u5236\u6587\u4ef6\u5b89\u88c5\u5230 Go \u7684\u5de5\u4f5c\u73af\u5883\u4e2d\u3002"),(0,l.kt)("p",null,"\u8fd9\u4e2a\u6709\u70b9\u7c7b\u4f3c\u4e8emaven install"),(0,l.kt)("p",null,"\u5f53\u6267\u884c go install \u547d\u4ee4\u65f6\uff0c\u9ed8\u8ba4\u60c5\u51b5\u4e0b\uff0c\u5b83\u4f1a\u7f16\u8bd1\u548c\u5b89\u88c5\u5f53\u524d\u9879\u76ee\u4e2d\u7684\u4ee3\u7801\uff0c\u5e76\u5c06\u4e8c\u8fdb\u5236\u6587\u4ef6\u5b89\u88c5\u5230 $GOPATH/bin \u76ee\u5f55\u4e2d\u3002\u5982\u679c\u8981\u7f16\u8bd1\u6307\u5b9a\u7684\u5305\uff0c\u53ef\u4ee5\u5728\u547d\u4ee4\u884c\u4e2d\u6307\u5b9a\u8be5\u5305\u7684\u8def\u5f84\u3002"),(0,l.kt)("p",null,"\u4f8b\u5982\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-go"},"go install github.com/myusername/mypackage\n")),(0,l.kt)("p",null,"\u8fd9\u6837\uff0cGo \u5c31\u4f1a\u7f16\u8bd1 mypackage \u5305\uff0c\u5e76\u5c06\u4e8c\u8fdb\u5236\u6587\u4ef6\u5b89\u88c5\u5230 $GOPATH/bin \u76ee\u5f55\u4e2d\u3002\u5b89\u88c5\u5b8c\u6210\u540e\uff0c\u60a8\u5c31\u53ef\u4ee5\u5728\u547d\u4ee4\u884c\u4e2d\u8fd0\u884c\u8be5\u7a0b\u5e8f\u4e86\u3002"),(0,l.kt)("h2",{id:"go-mod"},"go mod"),(0,l.kt)("p",null,"Go \u8bed\u8a00\u63d0\u4f9b\u4e86\u8bb8\u591a go mod \u547d\u4ee4\u6765\u7ba1\u7406 Go \u7684\u6a21\u5757\uff08\u5305\uff09\u4f9d\u8d56\u5173\u7cfb\u3002\u4e0b\u9762\u662f\u4e00\u4e9b\u5e38\u89c1\u7684 go mod \u547d\u4ee4\uff1a"),(0,l.kt)("p",null,"go mod init\uff1a\u521d\u59cb\u5316\u5f53\u524d\u76ee\u5f55\u4e3a Go \u6a21\u5757\uff0c\u5e76\u751f\u6210\u4e00\u4e2a\u540d\u4e3a go.mod \u7684\u6587\u4ef6\uff0c\u8be5\u6587\u4ef6\u8bb0\u5f55\u4e86\u8be5\u6a21\u5757\u6240\u4f9d\u8d56\u7684\u5176\u4ed6\u6a21\u5757\u7684\u7248\u672c\u4fe1\u606f\u3002"),(0,l.kt)("p",null,"go mod tidy\uff1a\u6574\u7406\u5f53\u524d\u6a21\u5757\u7684\u4f9d\u8d56\u5173\u7cfb\uff0c\u4ec5\u4fdd\u7559\u5df2\u7ecf\u4f7f\u7528\u7684\u6a21\u5757\u3002"),(0,l.kt)("p",null,"go mod download\uff1a\u4e0b\u8f7d\u5f53\u524d\u6a21\u5757\u6240\u4f9d\u8d56\u7684\u6240\u6709\u6a21\u5757\u3002"),(0,l.kt)("p",null,"go mod edit\uff1a\u6253\u5f00 go.mod \u6587\u4ef6\u5e76\u5141\u8bb8\u7528\u6237\u7f16\u8f91\u3002"),(0,l.kt)("p",null,"go mod graph\uff1a\u663e\u793a\u5f53\u524d\u6a21\u5757\u7684\u4f9d\u8d56\u56fe\u3002"),(0,l.kt)("p",null,"go mod vendor\uff1a\u5c06\u5f53\u524d\u6a21\u5757\u7684\u6240\u6709\u4f9d\u8d56\u6a21\u5757\u590d\u5236\u5230 vendor \u76ee\u5f55\u4e2d\u3002"),(0,l.kt)("p",null,"go mod verify\uff1a\u9a8c\u8bc1\u5f53\u524d\u6a21\u5757\u6240\u4f9d\u8d56\u7684\u6a21\u5757\u662f\u5426\u53ef\u7528\u3002"),(0,l.kt)("p",null,"\u8fd9\u4e9b\u547d\u4ee4\u53ea\u662f Go \u7684 go mod \u547d\u4ee4\u7684\u4e00\u5c0f\u90e8\u5206\uff0c\u66f4\u591a\u547d\u4ee4\u53ef\u4ee5\u901a\u8fc7\u5728\u547d\u4ee4\u884c\u4e2d\u952e\u5165 go help mod \u83b7\u5f97\u5e2e\u52a9\u3002"),(0,l.kt)("h2",{id:"go-install-\u548c-go-mod-install"},"go install \u548c go mod install"),(0,l.kt)("p",null,"go install \u547d\u4ee4\u540e\u9762\u9700\u8981\u8ddf\u4e0a\u5bf9\u5e94\u7684\u5305\u540d\ngo mod install \u5219\u662f\u8bfb\u53d6 go.mod \u6587\u4ef6\u4f9d\u8d56\u4fe1\u606f\uff0c \u76f8\u5f53\u4e8e maven install\uff0c\u6240\u4ee5go mod install \u7528\u7684\u66f4\u591a"),(0,l.kt)("h2",{id:"go-vendor"},"go vendor"),(0,l.kt)("p",null,"\u5728 Go \u4e2d\uff0cVendor \u76ee\u5f55\u662f\u4e00\u79cd\u7279\u6b8a\u7684\u76ee\u5f55\u7ed3\u6784\uff0c\u5b83\u7528\u4e8e\u5b58\u653e\u9879\u76ee\u4f9d\u8d56\u7684\u6e90\u4ee3\u7801\u3002Vendor \u76ee\u5f55\u4e2d\u7684\u4ee3\u7801\u901a\u5e38\u662f\u7b2c\u4e09\u65b9\u5e93\u7684\u6e90\u4ee3\u7801\uff0c\u800c\u4e0d\u662f\u4e8c\u8fdb\u5236\u6587\u4ef6\u6216\u8005 Go \u6e90\u4ee3\u7801\u7684\u7f16\u8bd1\u540e\u7ed3\u679c\u3002"),(0,l.kt)("p",null,"\u4f7f\u7528 Vendor \u76ee\u5f55\u7684\u4e3b\u8981\u539f\u56e0\u662f\u4e3a\u4e86\u89e3\u51b3\u9879\u76ee\u4f9d\u8d56\u7684\u7ba1\u7406\u95ee\u9898\u3002\u5f53\u4e00\u4e2a Go \u9879\u76ee\u4f9d\u8d56\u4e8e\u5176\u4ed6\u7684\u7b2c\u4e09\u65b9\u5e93\u65f6\uff0c\u8fd9\u4e9b\u4f9d\u8d56\u53ef\u80fd\u4f1a\u5728\u4e0d\u540c\u7684\u65f6\u95f4\u3001\u4e0d\u540c\u7684\u7248\u672c\u548c\u4e0d\u540c\u7684\u5730\u65b9\u88ab\u5b89\u88c5\u548c\u66f4\u65b0\u3002\u8fd9\u6837\uff0c\u9879\u76ee\u4ee3\u7801\u4e2d\u7684\u4f9d\u8d56\u5173\u7cfb\u5c31\u4f1a\u53d8\u5f97\u975e\u5e38\u590d\u6742\uff0c\u5f88\u96be\u7ba1\u7406\u3002"),(0,l.kt)("p",null,"\u4e3a\u4e86\u89e3\u51b3\u8fd9\u4e2a\u95ee\u9898\uff0cGo 1.5 \u5f15\u5165\u4e86 Vendor \u76ee\u5f55\u3002\u5728\u4f7f\u7528 Vendor \u76ee\u5f55\u4e4b\u540e\uff0c\u9879\u76ee\u4f9d\u8d56\u7684\u6e90\u4ee3\u7801\u4f1a\u88ab\u5b58\u653e\u5728 Vendor \u76ee\u5f55\u4e2d\uff0c\u800c\u4e0d\u662f\u50cf\u4ee5\u524d\u4e00\u6837\u88ab\u5b58\u653e\u5728 GOPATH \u76ee\u5f55\u4e0b\u7684 pkg \u76ee\u5f55\u4e2d\u3002\u8fd9\u6837\uff0c\u9879\u76ee\u4ee3\u7801\u4e2d\u7684\u4f9d\u8d56\u5173\u7cfb\u5c31\u53ef\u4ee5\u88ab\u660e\u786e\u5730\u7ba1\u7406\u548c\u63a7\u5236\u4e86\u3002"),(0,l.kt)("p",null,"\u5728\u4f7f\u7528 Vendor \u76ee\u5f55\u65f6\uff0c\u5982\u679c\u5b58\u5728 Vendor \u76ee\u5f55\u4e2d\u7684\u4f9d\u8d56\u4e0e GOPATH \u76ee\u5f55\u4e2d\u7684\u4f9d\u8d56\u5b58\u5728\u7248\u672c\u51b2\u7a81\uff0c\u90a3\u4e48 Vendor \u76ee\u5f55\u4e2d\u7684\u4f9d\u8d56\u4f1a\u88ab\u4f18\u5148\u4f7f\u7528\u3002\u8fd9\u6837\uff0c\u5c31\u53ef\u4ee5\u907f\u514d\u7248\u672c\u51b2\u7a81\u95ee\u9898\u5e26\u6765\u7684\u4e0d\u786e\u5b9a\u6027\u548c\u4e0d\u7a33\u5b9a\u6027\u3002"),(0,l.kt)("p",null,"\u9700\u8981\u6ce8\u610f\u7684\u662f\uff0cVendor \u76ee\u5f55\u4e2d\u7684\u4f9d\u8d56\u901a\u5e38\u662f\u4e0e\u9879\u76ee\u4ee3\u7801\u4e00\u8d77\u7ba1\u7406\u7684\u3002\u56e0\u6b64\uff0c\u5982\u679c\u60a8\u8981\u5c06\u9879\u76ee\u4ee3\u7801\u4e0a\u4f20\u5230 Git \u6216\u5176\u4ed6\u4ee3\u7801\u6258\u7ba1\u5e73\u53f0\u4e0a\uff0c\u5efa\u8bae\u4e00\u8d77\u4e0a\u4f20 Vendor \u76ee\u5f55\u3002\u8fd9\u6837\uff0c\u5176\u4ed6\u5f00\u53d1\u8005\u5c31\u53ef\u4ee5\u76f4\u63a5\u4f7f\u7528\u60a8\u7684\u4ee3\u7801\uff0c\u800c\u4e0d\u9700\u8981\u518d\u6b21\u5b89\u88c5\u4f9d\u8d56\u3002"),(0,l.kt)("p",null,"\u5728 Go 1.11 \u7248\u672c\u4e4b\u524d\uff0cGo \u9879\u76ee\u7684\u4f9d\u8d56\u901a\u5e38\u662f\u901a\u8fc7\u8bbe\u7f6e GOPATH \u73af\u5883\u53d8\u91cf\uff0c\u5e76\u5c06\u4f9d\u8d56\u5b89\u88c5\u5728 $GOPATH/src \u76ee\u5f55\u4e0b\u6765\u7ba1\u7406\u7684\u3002\u8fd9\u79cd\u65b9\u5f0f\u7684\u4f18\u70b9\u662f\u6240\u6709\u7684\u4f9d\u8d56\u90fd\u53ef\u4ee5\u88ab\u5168\u5c40\u8bbf\u95ee\uff0c\u4f46\u662f\u7f3a\u70b9\u662f\u5728\u591a\u4e2a\u9879\u76ee\u4e2d\u4f7f\u7528\u76f8\u540c\u7684\u4f9d\u8d56\u65f6\u5bb9\u6613\u53d1\u751f\u51b2\u7a81\u3002"),(0,l.kt)("p",null,"\u4ece Go 1.11 \u7248\u672c\u5f00\u59cb\uff0cGo \u5f15\u5165\u4e86\u6a21\u5757\u5316\u7ba1\u7406\u7684\u673a\u5236\uff0c\u53ef\u4ee5\u901a\u8fc7 go mod \u547d\u4ee4\u6765\u7ba1\u7406\u4f9d\u8d56\u3002\u4f7f\u7528\u6a21\u5757\u5316\u7ba1\u7406\u7684\u65b9\u5f0f\u53ef\u4ee5\u907f\u514d\u5168\u5c40\u5b89\u88c5\u4f9d\u8d56\u7684\u51b2\u7a81\u95ee\u9898\uff0c\u5e76\u4e14\u53ef\u4ee5\u66f4\u52a0\u65b9\u4fbf\u5730\u7ba1\u7406\u4f9d\u8d56\u7684\u7248\u672c\u3002"),(0,l.kt)("p",null,"Vendor \u76ee\u5f55\u662f\u4e00\u79cd\u7279\u6b8a\u7684\u76ee\u5f55\u7ed3\u6784\uff0c\u7528\u4e8e\u5b58\u653e\u9879\u76ee\u4f9d\u8d56\u7684\u6e90\u4ee3\u7801\u3002\u4f7f\u7528 Vendor \u76ee\u5f55\u7684\u65b9\u5f0f\u53ef\u4ee5\u8ba9\u6bcf\u4e2a\u9879\u76ee\u90fd\u6709\u81ea\u5df1\u72ec\u7acb\u7684\u4f9d\u8d56\u7ba1\u7406\u65b9\u5f0f\uff0c\u4e0d\u4f1a\u53d7\u5230\u5168\u5c40\u4f9d\u8d56\u7684\u5e72\u6270\u3002\u5728\u9879\u76ee\u4e2d\u4f7f\u7528 Vendor \u76ee\u5f55\u53ef\u4ee5\u8ba9\u4f9d\u8d56\u7684\u7ba1\u7406\u66f4\u52a0\u7b80\u5355\u548c\u6e05\u6670\uff0c\u540c\u65f6\u53ef\u4ee5\u907f\u514d\u4f9d\u8d56\u51b2\u7a81\u7684\u95ee\u9898\u3002"),(0,l.kt)("p",null,"\u56e0\u6b64\uff0c\u63a8\u8350\u5728 Go 1.11 \u53ca\u4ee5\u4e0a\u7248\u672c\u4e2d\u4f7f\u7528\u6a21\u5757\u5316\u7ba1\u7406\u6765\u7ba1\u7406\u4f9d\u8d56\u3002\u5982\u679c\u9879\u76ee\u4e2d\u9700\u8981\u4f7f\u7528 Vendor \u76ee\u5f55\uff0c\u53ef\u4ee5\u4f7f\u7528 go mod vendor \u547d\u4ee4\u6765\u751f\u6210 Vendor \u76ee\u5f55\uff0c\u5e76\u5c06\u5176\u4e0e\u9879\u76ee\u4ee3\u7801\u4e00\u8d77\u63d0\u4ea4\u5230\u4ee3\u7801\u4ed3\u5e93\u4e2d\u3002\u8fd9\u6837\u53ef\u4ee5\u786e\u4fdd\u9879\u76ee\u4e2d\u7684\u4f9d\u8d56\u7ba1\u7406\u66f4\u52a0\u6e05\u6670\u548c\u53ef\u63a7\u3002"))}c.isMDXComponent=!0}}]);