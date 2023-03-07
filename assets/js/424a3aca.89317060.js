"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5124],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>f});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var l=r.createContext({}),p=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},u=function(e){var n=p(e.components);return r.createElement(l.Provider,{value:n},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),c=p(t),d=o,f=c["".concat(l,".").concat(d)]||c[d]||m[d]||a;return t?r.createElement(f,s(s({ref:n},u),{},{components:t})):r.createElement(f,s({ref:n},u))}));function f(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,s=new Array(a);s[0]=d;var i={};for(var l in n)hasOwnProperty.call(n,l)&&(i[l]=n[l]);i.originalType=e,i[c]="string"==typeof e?e:o,s[1]=i;for(var p=2;p<a;p++)s[p]=t[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},7163:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>m,frontMatter:()=>a,metadata:()=>i,toc:()=>p});var r=t(7462),o=(t(7294),t(3905));const a={},s="Vue \u524d\u7aef\u6743\u9650\u63a7\u5236",i={permalink:"/blogs/blog/Vue \u524d\u7aef\u6743\u9650\u63a7\u5236",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/Vue \u524d\u7aef\u6743\u9650\u63a7\u5236.md",source:"@site/blog/Vue \u524d\u7aef\u6743\u9650\u63a7\u5236.md",title:"Vue \u524d\u7aef\u6743\u9650\u63a7\u5236",description:"\u6211\u4eec\u53ef\u4ee5\u6ce8\u518cVue\u63d2\u4ef6",date:"2023-03-03T03:19:14.000Z",formattedDate:"March 3, 2023",tags:[],readingTime:1.105,hasTruncateMarker:!1,authors:[],frontMatter:{},prevItem:{title:"Layout \u7684\u6982\u5ff5",permalink:"/blogs/blog/Vue Layout\u4f5c\u7528"},nextItem:{title:"DNS \u8bb0\u5f55\u7c7b\u578b",permalink:"/blogs/blog/DNS\u7684\u8bb0\u5f55\u7c7b\u578b"}},l={authorsImageUrls:[]},p=[],u={toc:p},c="wrapper";function m(e){let{components:n,...t}=e;return(0,o.kt)(c,(0,r.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"\u6211\u4eec\u53ef\u4ee5\u6ce8\u518cVue\u63d2\u4ef6"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"export default {\n  install(Vue) {\n    Vue.prototype.checkPer = (value) => {\n      if (value && value instanceof Array && value.length > 0) {\n        const roles = store.getters && store.getters.roles\n        const permissionRoles = value\n        return roles.some(role => {\n          return permissionRoles.includes(role)\n        })\n      } else {\n        console.error(`need roles! Like v-permission=\"['admin','editor']\"`)\n        return false\n      }\n    }\n  }\n}\n")),(0,o.kt)("p",null,"\u4f7f\u5176\u751f\u6548"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"Vue.use(checkPer)\n")),(0,o.kt)("p",null,"\u4f7f\u7528"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"<el-table-column v-if=\"checkPer(['admin','dept:edit','dept:del'])\">\n")),(0,o.kt)("p",null,"\u6b64\u5916\u8fd8\u53ef\u4ee5\u81ea\u5b9a\u4e49Vue\u6307\u4ee4 ",(0,o.kt)("inlineCode",{parentName:"p"},"v-permissions")," \u9996\u5148\u5b9a\u4e49Permission.js"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import store from '@/store'\n\nexport default {\n  inserted(el, binding) {\n    const { value } = binding\n    const roles = store.getters && store.getters.roles\n    if (value && value instanceof Array) {\n      if (value.length > 0) {\n        const permissionRoles = value\n        const hasPermission = roles.some(role => {\n          return permissionRoles.includes(role)\n        })\n        if (!hasPermission) {\n          el.parentNode && el.parentNode.removeChild(el)\n        }\n      }\n    } else {\n      throw new Error(`\u4f7f\u7528\u65b9\u5f0f\uff1a v-permission=\"['admin','editor']\"`)\n    }\n  }\n}\n\n")),(0,o.kt)("p",null,"\u63a5\u7740\u4f7f\u7528",(0,o.kt)("inlineCode",{parentName:"p"},"Vue.directive")," \u4f7f\u5176\u751f\u6548"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import permission from './permission'\n\nconst install = function(Vue) {\n  Vue.directive('permission', permission)\n}\n\nif (window.Vue) {\n  window['permission'] = permission\n  Vue.use(install); // eslint-disable-line\n}\n\npermission.install = install\nexport default permission\n\n")),(0,o.kt)("p",null,"\u4f7f\u7528"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"permission: {\n        add: ['admin', 'dict:add'],\n        edit: ['admin', 'dict:edit'],\n        del: ['admin', 'dict:del']\n}\n\n...\n\n<el-button v-permission=\"permission.add\"/>\n")))}m.isMDXComponent=!0}}]);