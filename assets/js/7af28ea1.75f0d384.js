"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2527],{8015:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>g});var r=n(757);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=l(n),m=o,g=u["".concat(s,".").concat(m)]||u[m]||f[m]||a;return n?r.createElement(g,p(p({ref:t},c),{},{components:n})):r.createElement(g,p({ref:t},c))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,p=new Array(a);p[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[u]="string"==typeof e?e:o,p[1]=i;for(var l=2;l<a;l++)p[l]=n[l];return r.createElement.apply(null,p)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9661:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>p,default:()=>f,frontMatter:()=>a,metadata:()=>i,toc:()=>l});var r=n(1227),o=(n(757),n(8015));const a={},p=void 0,i={unversionedId:"notes/\u5176\u4ed6/\u4ee3\u7406\u8bbe\u7f6e",id:"notes/\u5176\u4ed6/\u4ee3\u7406\u8bbe\u7f6e",title:"\u4ee3\u7406\u8bbe\u7f6e",description:"Linux",source:"@site/docs/notes/\u5176\u4ed6/\u4ee3\u7406\u8bbe\u7f6e.md",sourceDirName:"notes/\u5176\u4ed6",slug:"/notes/\u5176\u4ed6/\u4ee3\u7406\u8bbe\u7f6e",permalink:"/blogs/docs/notes/\u5176\u4ed6/\u4ee3\u7406\u8bbe\u7f6e",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/\u5176\u4ed6/\u4ee3\u7406\u8bbe\u7f6e.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"DNS \u8bb0\u5f55\u7c7b\u578b",permalink:"/blogs/docs/notes/\u5176\u4ed6/DNS\u7684\u8bb0\u5f55\u7c7b\u578b"},next:{title:"\u540c\u6b65\u548c\u5f02\u6b65\u7684\u6982\u5ff5",permalink:"/blogs/docs/notes/\u5176\u4ed6/\u540c\u6b65\u548c\u5f02\u6b65\u7684\u6982\u5ff5"}},s={},l=[{value:"Linux",id:"linux",level:2},{value:"Windows Terminal",id:"windows-terminal",level:2},{value:"NPM",id:"npm",level:2},{value:"git\u914d\u7f6e",id:"git\u914d\u7f6e",level:2}],c={toc:l},u="wrapper";function f(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"linux"},"Linux"),(0,o.kt)("p",null,"note dont' use ",(0,o.kt)("inlineCode",{parentName:"p"},"cat > ~/.bash_pofile")," , that is to override"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'\ncat >> ~/.bash_profile << EOF\nfunction proxy_on() {\n    export http_proxy=http://127.0.0.1:7890\n    export https_proxy=http://127.0.0.1:7890\n    echo -e "\u7ec8\u7aef\u4ee3\u7406\u5df2\u5f00\u542f\u3002"\n}\n\nfunction proxy_off(){\n    unset http_proxy https_proxy\n    echo -e "\u7ec8\u7aef\u4ee3\u7406\u5df2\u5173\u95ed\u3002"\n}\nEOF\n\nsource ~/.bash_profile\n\nproxy_on\nproxy_off\n')),(0,o.kt)("h2",{id:"windows-terminal"},"Windows Terminal"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"set http_proxy=http://127.0.0.1:7890\nset https_proxy=http://127.0.0.1:7890\n\nset http_proxy=  \nset https_proxy=\n")),(0,o.kt)("h2",{id:"npm"},"NPM"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"# \u8bbe\u7f6e\n\nnpm config set proxy http://127.0.0.1:7890\nnpm config set https-proxy http://127.0.0.1:7890\n\n# \u6062\u590d\nnpm config delete proxy\nnpm config delete https-proxy\n\n\n")),(0,o.kt)("h2",{id:"git\u914d\u7f6e"},"git\u914d\u7f6e"),(0,o.kt)("p",null,"\u53ef\u4ee5\u5c06git\u7684\u914d\u7f6e\u4fe1\u606f\u4fdd\u5b58\u5728.gitconfig\u914d\u7f6e\u6587\u4ef6\u4e2d"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"[user]\n    name = Arterning\n    email = china_ningning@outlook.com\n[http]\n    proxy = http://127.0.0.1:10809\n[https]\n    proxy = http://127.0.0.1:10809\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"# \u8bbe\u7f6e\ngit config --global http.proxy 'socks5://127.0.0.1:7890' \ngit config --global https.proxy 'socks5://127.0.0.1:7890'\n\n# \u6062\u590d\ngit config --global --unset http.proxy\ngit config --global --unset https.proxy\n\n\ngit config --list\n\n# test\nssh -T git@github.com\n")))}f.isMDXComponent=!0}}]);