"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[288],{224:(e,t,n)=>{n.d(t,{Zo:()=>v,kt:()=>m});var r=n(2374);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),u=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},v=function(e){var t=u(e.components);return r.createElement(c.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},s=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,l=e.originalType,c=e.parentName,v=a(e,["components","mdxType","originalType","parentName"]),p=u(n),s=o,m=p["".concat(c,".").concat(s)]||p[s]||d[s]||l;return n?r.createElement(m,i(i({ref:t},v),{},{components:n})):r.createElement(m,i({ref:t},v))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=n.length,i=new Array(l);i[0]=s;var a={};for(var c in t)hasOwnProperty.call(t,c)&&(a[c]=t[c]);a.originalType=e,a[p]="string"==typeof e?e:o,i[1]=a;for(var u=2;u<l;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}s.displayName="MDXCreateElement"},1925:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>l,metadata:()=>a,toc:()=>u});var r=n(9963),o=(n(2374),n(224));const l={},i=void 0,a={unversionedId:"notes/\u6280\u672f\u6808/\u524d\u7aef/Vue/vue \u6307\u4ee4",id:"notes/\u6280\u672f\u6808/\u524d\u7aef/Vue/vue \u6307\u4ee4",title:"vue \u6307\u4ee4",description:"v-on:click \u7b49\u4e8e @click",source:"@site/docs/notes/\u6280\u672f\u6808/\u524d\u7aef/Vue/vue \u6307\u4ee4.md",sourceDirName:"notes/\u6280\u672f\u6808/\u524d\u7aef/Vue",slug:"/notes/\u6280\u672f\u6808/\u524d\u7aef/Vue/vue \u6307\u4ee4",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/\u524d\u7aef/Vue/vue \u6307\u4ee4",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/\u6280\u672f\u6808/\u524d\u7aef/Vue/vue \u6307\u4ee4.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"vite \u89e3\u51b3\u8de8\u57df\u95ee\u9898",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/\u524d\u7aef/Vue/vite \u89e3\u51b3\u8de8\u57df\u95ee\u9898"},next:{title:"\u6570\u636e\u4ee3\u7406",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/\u524d\u7aef/Vue/\u6570\u636e\u4ee3\u7406"}},c={},u=[{value:"<strong>v-on:click \u7b49\u4e8e @click</strong>",id:"v-onclick-\u7b49\u4e8e-click",level:3},{value:"<strong>v-bind:xx \u7b49\u4e8e :xx</strong>",id:"v-bindxx-\u7b49\u4e8e-xx",level:3},{value:"<strong>v-if \u4e0e v-for \u7684\u4f18\u5148\u7ea7</strong>",id:"v-if-\u4e0e-v-for-\u7684\u4f18\u5148\u7ea7",level:2},{value:"vue\u4e2dv-bind\u548cv-model\u7684\u533a\u522b\uff1f",id:"vue\u4e2dv-bind\u548cv-model\u7684\u533a\u522b",level:2}],v={toc:u},p="wrapper";function d(e){let{components:t,...n}=e;return(0,o.kt)(p,(0,r.Z)({},v,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h3",{id:"v-onclick-\u7b49\u4e8e-click"},(0,o.kt)("strong",{parentName:"h3"},"v-on:click \u7b49\u4e8e @click")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"<div v-on:click=...>\n\n")),(0,o.kt)("p",null,"\u7b49\u540c\u4e8e"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"<div @click=...>\n\n")),(0,o.kt)("h3",{id:"v-bindxx-\u7b49\u4e8e-xx"},(0,o.kt)("strong",{parentName:"h3"},"v-bind:xx \u7b49\u4e8e :xx")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'<option v-bind:value="1">...\n\n')),(0,o.kt)("p",null,"\u7b49\u4e8e"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'<option :value="1">...\n')),(0,o.kt)("p",null,"\u5faa\u73af"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'<tr v-for="blog in blogs">\n  <td >{{blog.title }}</td>\n</tr>\n')),(0,o.kt)("p",null,"\u5224\u65ad"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"<div v-if=\"type === 'A'\">\n  A\n</div>\n<div v-else-if=\"type === 'B'\">\n  B\n</div>\n<div v-else-if=\"type === 'C'\">\n  C\n</div>\n<div v-else>\n  Not A/B/C\n</div>\n")),(0,o.kt)("h2",{id:"v-if-\u4e0e-v-for-\u7684\u4f18\u5148\u7ea7"},(0,o.kt)("strong",{parentName:"h2"},"v-if \u4e0e v-for \u7684\u4f18\u5148\u7ea7")),(0,o.kt)("p",null,"\u5f53 v-if \u4e0e v-for \u4e00\u8d77\u4f7f\u7528\u65f6\uff0cv-for \u5177\u6709\u6bd4 v-if \u66f4\u9ad8\u7684\u4f18\u5148\u7ea7\u3002"),(0,o.kt)("h2",{id:"vue\u4e2dv-bind\u548cv-model\u7684\u533a\u522b"},"vue\u4e2dv-bind\u548cv-model\u7684\u533a\u522b\uff1f"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("inlineCode",{parentName:"li"},"v-bind"),"\u7528\u6765\u7ed1\u5b9a\u6570\u636e\u548c\u5c5e\u6027\u4ee5\u53ca\u8868\u8fbe\u5f0f\uff0c\u7f29\u5199\u4e3a'",(0,o.kt)("inlineCode",{parentName:"li"},"\uff1a"),"'"),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("inlineCode",{parentName:"li"},"v-mode"),"\u4f7f\u7528\u5728\u8868\u5355\u4e2d\uff0c\u5b9e\u73b0\u53cc\u5411\u6570\u636e\u7ed1\u5b9a\u7684\uff0c\u5728\u8868\u5355\u5143\u7d20\u5916\u4f7f\u7528\u4e0d\u8d77\u4f5c\u7528")),(0,o.kt)("p",null,"Vue\u4e2d\u67092\u79cd\u6570\u636e\u7ed1\u5b9a\u7684\u65b9\u5f0f\uff1a 1.\u5355\u5411\u7ed1\u5b9a(v-bind)\uff1a\u6570\u636e\u53ea\u80fd\u4ecedata\u6d41\u5411\u9875\u9762\u3002 2.\u53cc\u5411\u7ed1\u5b9a(v-model)\uff1a\u6570\u636e\u4e0d\u4ec5\u80fd\u4ecedata\u6d41\u5411\u9875\u9762\uff0c\u8fd8\u53ef\u4ee5\u4ece\u9875\u9762\u6d41\u5411data\u3002 \u5907\u6ce8\uff1a 1.\u53cc\u5411\u7ed1\u5b9a\u4e00\u822c\u90fd\u5e94\u7528\u5728\u8868\u5355\u7c7b\u5143\u7d20\u4e0a\uff08\u5982\uff1ainput\u3001select\u7b49\uff09 2.v-model:value \u53ef\u4ee5\u7b80\u5199\u4e3a v-model\uff0c\u56e0\u4e3av-model\u9ed8\u8ba4\u6536\u96c6\u7684\u5c31\u662fvalue\u503c\u3002"))}d.isMDXComponent=!0}}]);