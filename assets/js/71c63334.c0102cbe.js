"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6168],{3905:(e,n,r)=>{r.d(n,{Zo:()=>p,kt:()=>f});var t=r(7294);function o(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function a(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function s(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?a(Object(r),!0).forEach((function(n){o(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function i(e,n){if(null==e)return{};var r,t,o=function(e,n){if(null==e)return{};var r,t,o={},a=Object.keys(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||(o[r]=e[r]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=t.createContext({}),u=function(e){var n=t.useContext(l),r=n;return e&&(r="function"==typeof e?e(n):s(s({},n),e)),r},p=function(e){var n=u(e.components);return t.createElement(l.Provider,{value:n},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},m=t.forwardRef((function(e,n){var r=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),c=u(r),m=o,f=c["".concat(l,".").concat(m)]||c[m]||d[m]||a;return r?t.createElement(f,s(s({ref:n},p),{},{components:r})):t.createElement(f,s({ref:n},p))}));function f(e,n){var r=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=r.length,s=new Array(a);s[0]=m;var i={};for(var l in n)hasOwnProperty.call(n,l)&&(i[l]=n[l]);i.originalType=e,i[c]="string"==typeof e?e:o,s[1]=i;for(var u=2;u<a;u++)s[u]=r[u];return t.createElement.apply(null,s)}return t.createElement.apply(null,r)}m.displayName="MDXCreateElement"},6450:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>a,metadata:()=>i,toc:()=>u});var t=r(7462),o=(r(7294),r(3905));const a={},s="Vue \u524d\u7aef\u6743\u9650\u63a7\u5236",i={unversionedId:"FrontEnd/vue/Vue \u524d\u7aef\u6743\u9650\u63a7\u5236",id:"FrontEnd/vue/Vue \u524d\u7aef\u6743\u9650\u63a7\u5236",title:"Vue \u524d\u7aef\u6743\u9650\u63a7\u5236",description:"\u6211\u4eec\u53ef\u4ee5\u6ce8\u518cVue\u63d2\u4ef6",source:"@site/docs/FrontEnd/vue/Vue \u524d\u7aef\u6743\u9650\u63a7\u5236.md",sourceDirName:"FrontEnd/vue",slug:"/FrontEnd/vue/Vue \u524d\u7aef\u6743\u9650\u63a7\u5236",permalink:"/blogs/docs/FrontEnd/vue/Vue \u524d\u7aef\u6743\u9650\u63a7\u5236",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/FrontEnd/vue/Vue \u524d\u7aef\u6743\u9650\u63a7\u5236.md",tags:[],version:"current",frontMatter:{},sidebar:"FrontEnd",previous:{title:"Layout \u7684\u6982\u5ff5",permalink:"/blogs/docs/FrontEnd/vue/Vue Layout\u4f5c\u7528"}},l={},u=[],p={toc:u},c="wrapper";function d(e){let{components:n,...r}=e;return(0,o.kt)(c,(0,t.Z)({},p,r,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"vue-\u524d\u7aef\u6743\u9650\u63a7\u5236"},"Vue \u524d\u7aef\u6743\u9650\u63a7\u5236"),(0,o.kt)("p",null,"\u6211\u4eec\u53ef\u4ee5\u6ce8\u518cVue\u63d2\u4ef6"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"export default {\n  install(Vue) {\n    Vue.prototype.checkPer = (value) => {\n      if (value && value instanceof Array && value.length > 0) {\n        const roles = store.getters && store.getters.roles\n        const permissionRoles = value\n        return roles.some(role => {\n          return permissionRoles.includes(role)\n        })\n      } else {\n        console.error(`need roles! Like v-permission=\"['admin','editor']\"`)\n        return false\n      }\n    }\n  }\n}\n")),(0,o.kt)("p",null,"\u4f7f\u5176\u751f\u6548"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"Vue.use(checkPer)\n")),(0,o.kt)("p",null,"\u4f7f\u7528"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"<el-table-column v-if=\"checkPer(['admin','dept:edit','dept:del'])\">\n")),(0,o.kt)("p",null,"\u6b64\u5916\u8fd8\u53ef\u4ee5\u81ea\u5b9a\u4e49Vue\u6307\u4ee4 ",(0,o.kt)("inlineCode",{parentName:"p"},"v-permissions")," \u9996\u5148\u5b9a\u4e49Permission.js"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import store from '@/store'\n\nexport default {\n  inserted(el, binding) {\n    const { value } = binding\n    const roles = store.getters && store.getters.roles\n    if (value && value instanceof Array) {\n      if (value.length > 0) {\n        const permissionRoles = value\n        const hasPermission = roles.some(role => {\n          return permissionRoles.includes(role)\n        })\n        if (!hasPermission) {\n          el.parentNode && el.parentNode.removeChild(el)\n        }\n      }\n    } else {\n      throw new Error(`\u4f7f\u7528\u65b9\u5f0f\uff1a v-permission=\"['admin','editor']\"`)\n    }\n  }\n}\n\n")),(0,o.kt)("p",null,"\u63a5\u7740\u4f7f\u7528",(0,o.kt)("inlineCode",{parentName:"p"},"Vue.directive")," \u4f7f\u5176\u751f\u6548"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import permission from './permission'\n\nconst install = function(Vue) {\n  Vue.directive('permission', permission)\n}\n\nif (window.Vue) {\n  window['permission'] = permission\n  Vue.use(install); // eslint-disable-line\n}\n\npermission.install = install\nexport default permission\n\n")),(0,o.kt)("p",null,"\u4f7f\u7528"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"permission: {\n        add: ['admin', 'dict:add'],\n        edit: ['admin', 'dict:edit'],\n        del: ['admin', 'dict:del']\n}\n\n...\n\n<el-button v-permission=\"permission.add\"/>\n")))}d.isMDXComponent=!0}}]);