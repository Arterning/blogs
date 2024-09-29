"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6656],{8015:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>g});var a=n(757);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),p=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=p(e.components);return a.createElement(i.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=p(n),d=r,g=c["".concat(i,".").concat(d)]||c[d]||m[d]||o;return n?a.createElement(g,s(s({ref:t},u),{},{components:n})):a.createElement(g,s({ref:t},u))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=d;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l[c]="string"==typeof e?e:r,s[1]=l;for(var p=2;p<o;p++)s[p]=n[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6345:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var a=n(1227),r=(n(757),n(8015));const o={},s=void 0,l={unversionedId:"notes/\u64cd\u4f5c\u7cfb\u7edf/\u865a\u62df\u673a/HomeStead settings",id:"notes/\u64cd\u4f5c\u7cfb\u7edf/\u865a\u62df\u673a/HomeStead settings",title:"HomeStead settings",description:"Install vbox",source:"@site/docs/notes/\u64cd\u4f5c\u7cfb\u7edf/\u865a\u62df\u673a/HomeStead settings.md",sourceDirName:"notes/\u64cd\u4f5c\u7cfb\u7edf/\u865a\u62df\u673a",slug:"/notes/\u64cd\u4f5c\u7cfb\u7edf/\u865a\u62df\u673a/HomeStead settings",permalink:"/blogs/docs/notes/\u64cd\u4f5c\u7cfb\u7edf/\u865a\u62df\u673a/HomeStead settings",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/\u64cd\u4f5c\u7cfb\u7edf/\u865a\u62df\u673a/HomeStead settings.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"\u7aef\u53e3\u5360\u7528",permalink:"/blogs/docs/notes/\u64cd\u4f5c\u7cfb\u7edf/windows/\u7aef\u53e3\u5360\u7528"},next:{title:"Homestead yaml config",permalink:"/blogs/docs/notes/\u64cd\u4f5c\u7cfb\u7edf/\u865a\u62df\u673a/Homestead yaml config"}},i={},p=[{value:"Port mapping",id:"port-mapping",level:2},{value:"SSH key",id:"ssh-key",level:2}],u={toc:p},c="wrapper";function m(e){let{components:t,...n}=e;return(0,r.kt)(c,(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Install vbox"),(0,r.kt)("p",null,"Homestead \u811a\u672c\u4f7f\u7528 Ruby \u548c Shell \u811a\u672c\u7f16\u5199\u800c\u6210\u3002\u539f\u7406\u662f\u5bf9 Vagrantfile \u6587\u4ef6\u505a\u5b9a\u5236\u3002\u5c06\u4ece ~/Homestead/Homestead.yaml \u8bfb\u53d6\u7684\u914d\u7f6e\u4fe1\u606f\uff0c\u5728 provision \u65f6\uff0c\u89e3\u6790\u4e3a Vagrant \u547d\u4ee4\u5e76\u8fdb\u884c\u5bf9\u865a\u62df\u673a\u7684\u914d\u7f6e\u3002Homestead \u811a\u672c\u7684\u4f5c\u7528\u5728\u4e8e\uff0c\u63d0\u4f9b\u4e86\u6781\u5176\u7b80\u5355\u6613\u7528\u7684\u63a5\u53e3\uff0c\u4f7f\u6211\u4eec\u53ea\u9700\u8981\u901a\u8fc7\u50bb\u74dc\u5316\u914d\u7f6e\uff0c\u5373\u53ef\u5b8c\u6210\u590d\u6742\u7684\u4efb\u52a1\u3002\u4ee5\u4e0b\u662f\u51e0\u4e2a\u5e38\u7528\u7684\u4efb\u52a1\uff1a"),(0,r.kt)("p",null,"IP \u914d\u7f6e\uff0c\u7aef\u53e3\u6620\u5c04\uff1b\nNginx Site \u521b\u5efa\uff1b\n\u6570\u636e\u5e93\u521b\u5efa\uff1b\n\u4e3b\u673a\u6587\u4ef6\u5939\u6302\u8f7d\u5230\u865a\u62df\u673a\u7b49\u4efb\u52a1\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"git clone https://git.coding.net/summerblue/homestead.git Homestead\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"bash init.sh\n")),(0,r.kt)("p",null,"\u8fd0\u884c\u4ee5\u4e0a\u547d\u4ee4\u540e\uff0c\u4f1a\u5728 ~/Homestead \u76ee\u5f55\u4e0b\u751f\u6210\u4ee5\u4e0b\u4e09\u4e2a\u6587\u4ef6\uff1a"),(0,r.kt)("p",null,"Homestead.yaml - \u4e3b\u8981\u914d\u7f6e\u4fe1\u606f\u6587\u4ef6\uff0c\u6211\u4eec\u53ef\u4ee5\u5728\u6b64\u6587\u4ef6\u4e2d\u914d\u7f6e Homestead \u7684\u7ad9\u70b9\u548c\u6570\u636e\u5e93\u7b49\u4fe1\u606f\uff1b\nafter.sh - \u6bcf\u4e00\u6b21 Homestead \u76d2\u5b50\u91cd\u7f6e\u540e\uff08provision\uff09\u4f1a\u8c03\u7528\u7684 shell \u811a\u672c\u6587\u4ef6\uff1b\naliases - \u6bcf\u4e00\u6b21 Homestead \u76d2\u5b50\u91cd\u7f6e\u540e\uff08provision\uff09\uff0c\u4f1a\u88ab\u66ff\u6362\u81f3\u865a\u62df\u673a\u7684 ~/.bash_aliases \u6587\u4ef6\u4e2d\uff0caliases \u91cc\u53ef\u4ee5\u653e\u4e00\u4e9b\u5feb\u6377\u547d\u4ee4\u7684\u5b9a\u4e49\u3002"),(0,r.kt)("p",null,"Homestead.yaml \u6587\u4ef6\u5728 ~/Homestead \u6587\u4ef6\u5939\u91cc\uff0c\u5728 Git-Bash \u91cc\uff0c\u4f60\u53ef\u4ee5\u4f7f\u7528\u4ee5\u4e0b\u547d\u4ee4\u4f7f\u7528\u6587\u4ef6\u5939\u6253\u5f00\u5f53\u524d\u547d\u4ee4\u884c\u6240\u5728\u76ee\u5f55\uff1a"),(0,r.kt)("p",null,"Homestead.yaml \u91cc\u7684\u914d\u7f6e\u5927\u81f4\u53ef\u4ee5\u5206\u4e3a\u4ee5\u4e0b\u51e0\u79cd\uff1a"),(0,r.kt)("p",null,"\u865a\u62df\u673a\u8bbe\u7f6e\uff1b\nSSH \u79d8\u94a5\u767b\u5f55\u914d\u7f6e\uff1b\n\u5171\u4eab\u6587\u4ef6\u5939\u914d\u7f6e\uff1b\n\u7ad9\u70b9\u914d\u7f6e\uff1b\n\u6570\u636e\u5e93\u914d\u7f6e\uff1b\n\u81ea\u5b9a\u4e49\u53d8\u91cf\uff1b"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"cd ~/Homestead && vagrant up\n")),(0,r.kt)("p",null,"If you vagrant up failure, try close the proxy settings in the terminal"),(0,r.kt)("p",null,"Commands"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"vagrant init    \u521d\u59cb\u5316 vagrant\nvagrant up  \u542f\u52a8 vagrant\nvagrant halt    \u5173\u95ed vagrant\nvagrant ssh \u901a\u8fc7 SSH \u767b\u5f55 vagrant\uff08\u9700\u8981\u5148\u542f\u52a8 vagrant\uff09\nvagrant provision   \u91cd\u65b0\u5e94\u7528\u66f4\u6539 vagrant \u914d\u7f6e\nvagrant reload --provision\nvagrant destroy \u5220\u9664 vagrant\n")),(0,r.kt)("p",null,"If you can not ping the vbox host, try run this in the vbox "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"sudo install net-tools\n")),(0,r.kt)("h2",{id:"port-mapping"},"Port mapping"),(0,r.kt)("p",null,"We can see the default port mapping in the log"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"    homestead: 80 (guest) => 8000 (host) (adapter 1)\n    homestead: 443 (guest) => 44300 (host) (adapter 1)\n    homestead: 22 (guest) => 2222 (host) (adapter 1)\n")),(0,r.kt)("p",null,"So we need to visit ",(0,r.kt)("a",{parentName:"p",href:"http://127.0.0.1:8000/"},"http://127.0.0.1:8000/")," in the outside to visit the website"),(0,r.kt)("p",null,"![","[Pasted image 20240201171329.png]","]\nHomeStead\u7684\u7aef\u53e3\u8f6c\u53d1\u5b9e\u9645\u4e0a\u57fa\u4e8e\u8fd9\u4e2avirtualbox\n\u53ef\u4ee5\u53d1\u73b0\uff0cDocker\u548c\u865a\u62df\u673a\u90fd\u652f\u6301\u7c7b\u4f3c\u7684\u529f\u80fd \u6587\u4ef6\u6302\u8f7d \u7aef\u53e3\u6620\u5c04"),(0,r.kt)("h2",{id:"ssh-key"},"SSH key"),(0,r.kt)("p",null,"SSH \u79d8\u94a5\u767b\u5f55\u914d\u7f6e\nauthorize \u9009\u9879\u662f\u6307\u6d3e\u767b\u5f55\u865a\u62df\u673a\u6388\u6743\u8fde\u63a5\u7684\u516c\u94a5\u6587\u4ef6\uff0c\u6b64\u6587\u4ef6\u586b\u5199\u7684\u662f\u4e3b\u673a\u4e0a\u7684\u516c\u94a5\u6587\u4ef6\u5730\u5740\uff0c\u865a\u62df\u673a\u521d\u59cb\u5316\u65f6\uff0c\u6b64\u6587\u4ef6\u91cc\u7684\u5185\u5bb9\u4f1a\u88ab\u590d\u5236\u5b58\u50a8\u5230\u865a\u62df\u673a\u7684 /home/vagrant/.ssh/authorized_keys \u6587\u4ef6\u4e2d\uff0c\u4ece\u800c\u5b9e\u73b0 SSH \u514d\u5bc6\u7801\u767b\u5f55\u3002\u5728\u8fd9\u91cc\u6211\u4eec\u9ed8\u8ba4\u586b\u5199\u5373\u53ef\u3002"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"authorize: ~/.ssh/id_rsa.pub")),(0,r.kt)("p",null,"keys \u662f\u6570\u7ec4\u9009\u9879\uff0c\u586b\u5199\u7684\u662f\u672c\u673a\u7684 SSH \u79c1\u94a5\u6587\u4ef6\u5730\u5740\u3002\u865a\u62df\u673a\u521d\u59cb\u5316\u65f6\uff0c\u4f1a\u5c06\u6b64\u5904\u586b\u5199\u7684\u6240\u6709 SSH \u79c1\u94a5\u6587\u4ef6\u590d\u5236\u5230\u865a\u62df\u673a\u7684 /home/vagrant/.ssh/ \u6587\u4ef6\u5939\u4e2d\uff0c\u4ece\u800c\u4f7f\u865a\u62df\u673a\u80fd\u5171\u4eab\u4e3b\u673a\u4e0a\u7684 SSH \u79c1\u94a5\u6587\u4ef6\uff0c\u4f7f\u865a\u62df\u673a\u5177\u5907\u7b49\u540c\u4e8e\u4e3b\u673a\u7684\u8eab\u4efd\u8ba4\u8bc1\u3002\u6b64\u529f\u80fd\u4e3a SSH \u6388\u6743\u63d0\u4f9b\u4e86\u4fbf\u5229\uff0c\u4f8b\u5982\u5728\u540e\u9762\u7ae0\u8282\u4e2d\uff0c\u6211\u4eec\u53ea\u9700\u8981\u5728 GitHub \u4e0a\u914d\u7f6e\u4e00\u4e2a SSH \u516c\u94a5\uff0c\u5373\u53ef\u5b9e\u73b0 GitHub \u5bf9\u865a\u62df\u673a\u548c\u4e3b\u673a\u5171\u540c\u8ba4\u8bc1\u3002"),(0,r.kt)("p",null,"\u6b64\u5904\u6211\u4eec\u5c06\u516c\u94a5\u548c\u79c1\u94a5\u4e00\u8d77\u540c\u6b65\u5230\u865a\u62df\u673a\u4e2d\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"keys:\n    - ~/.ssh/id_rsa\n    - ~/.ssh/id_rsa.pub\n")))}m.isMDXComponent=!0}}]);