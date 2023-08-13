"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8227],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>f});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},p=Object.keys(e);for(n=0;n<p.length;n++)r=p[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(n=0;n<p.length;n++)r=p[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),i=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},s=function(e){var t=i(e.components);return n.createElement(c.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,p=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=i(r),m=o,f=d["".concat(c,".").concat(m)]||d[m]||u[m]||p;return r?n.createElement(f,a(a({ref:t},s),{},{components:r})):n.createElement(f,a({ref:t},s))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var p=r.length,a=new Array(p);a[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[d]="string"==typeof e?e:o,a[1]=l;for(var i=2;i<p;i++)a[i]=r[i];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},5668:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>p,metadata:()=>l,toc:()=>i});var n=r(7462),o=(r(7294),r(3905));const p={},a="react render props",l={unversionedId:"FrontEnd/react/render-props",id:"FrontEnd/react/render-props",title:"react render props",description:"\u524d\u8a00",source:"@site/docs/FrontEnd/react/render-props.md",sourceDirName:"FrontEnd/react",slug:"/FrontEnd/react/render-props",permalink:"/blogs/docs/FrontEnd/react/render-props",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/FrontEnd/react/render-props.md",tags:[],version:"current",frontMatter:{},sidebar:"FrontEnd",previous:{title:"react-hook",permalink:"/blogs/docs/FrontEnd/react/react-hook"},next:{title:"webpack basic",permalink:"/blogs/docs/FrontEnd/react/webpack/webpack-base"}},c={},i=[{value:"\u524d\u8a00",id:"\u524d\u8a00",level:2},{value:"\u6982\u5ff5",id:"\u6982\u5ff5",level:2},{value:"\u4f8b\u5b50",id:"\u4f8b\u5b50",level:2}],s={toc:i},d="wrapper";function u(e){let{components:t,...r}=e;return(0,o.kt)(d,(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"react-render-props"},"react render props"),(0,o.kt)("h2",{id:"\u524d\u8a00"},"\u524d\u8a00"),(0,o.kt)("p",null,"\u4e3a\u4ec0\u4e48\u9700\u8981\u505arender props?"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"\u539f\u59cb\u7684\u505a\u6cd5\uff1a")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"<A>\n    <B>xxxx</B>\n</A>\n")),(0,o.kt)("p",null,"\u5b58\u5728\u7684\u95ee\u9898\u5728\u4e8e: \u5982\u679cB\u7ec4\u4ef6\u9700\u8981A\u7ec4\u4ef6\u5185\u7684\u6570\u636e\u662f\u505a\u4e0d\u5230\u7684"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"\u89e3\u51b3\u65b9\u5f0f\uff1a")),(0,o.kt)("p",null,"\u5411\u7ec4\u4ef6\u5185\u90e8\u52a8\u6001\u4f20\u5165\u5e26\u5185\u5bb9\u7684\u7ed3\u6784(\u6807\u7b7e)"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"Vue\u4e2d: \n    \u4f7f\u7528slot\u6280\u672f, \u4e5f\u5c31\u662f\u901a\u8fc7\u7ec4\u4ef6\u6807\u7b7e\u4f53\u4f20\u5165\u7ed3\u6784  <AA><BB/></AA>\nReact\u4e2d:\n    \u4f7f\u7528children props: \u901a\u8fc7\u7ec4\u4ef6\u6807\u7b7e\u4f53\u4f20\u5165\u7ed3\u6784\n    \u4f7f\u7528render props: \u901a\u8fc7\u7ec4\u4ef6\u6807\u7b7e\u5c5e\u6027\u4f20\u5165\u7ed3\u6784, \u4e00\u822c\u7528render\u51fd\u6570\u5c5e\u6027\n")),(0,o.kt)("h2",{id:"\u6982\u5ff5"},"\u6982\u5ff5"),(0,o.kt)("p",null,"Render props \u6a21\u5f0f\u662f\u4e00\u79cd React \u7ec4\u4ef6\u8bbe\u8ba1\u6a21\u5f0f\uff0c\u7528\u4e8e\u5c06\u7ec4\u4ef6\u4e4b\u95f4\u7684\u4ee3\u7801\u590d\u7528\u3002\u8be5\u6a21\u5f0f\u901a\u8fc7\u5c06\u4e00\u4e2a\u51fd\u6570\u4f5c\u4e3a\u7ec4\u4ef6\u7684 props\uff0c\u4f7f\u5f97\u8fd9\u4e2a\u51fd\u6570\u53ef\u4ee5\u88ab\u7ec4\u4ef6\u5185\u90e8\u8c03\u7528\uff0c\u5e76\u4e14\u5c06\u7ec4\u4ef6\u7684\u72b6\u6001\u548c\u903b\u8f91\u4f20\u9012\u7ed9\u8fd9\u4e2a\u51fd\u6570\u3002\u8fd9\u4e2a\u51fd\u6570\u5c31\u6210\u4e3a\u4e86\u4e00\u4e2a\u201c\u6e32\u67d3 prop\u201d\uff0c\u56e0\u4e3a\u5b83\u8d1f\u8d23\u6e32\u67d3\u7ec4\u4ef6\u7684\u4e00\u90e8\u5206\u5185\u5bb9\u3002"),(0,o.kt)("p",null,"\u5728 React \u4e2d\uff0c\u5e38\u89c1\u7684\u4f7f\u7528 render props \u6a21\u5f0f\u7684\u7ec4\u4ef6\u6709\u5f88\u591a\uff0c\u4f8b\u5982 React Router \u7684 Route \u7ec4\u4ef6\uff0cReact \u7684 Context \u7ec4\u4ef6\uff0c\u4ee5\u53ca\u50cf Formik \u8fd9\u6837\u7684\u8868\u5355\u5904\u7406\u5e93\u3002\u8fd9\u4e9b\u7ec4\u4ef6\u5728\u4f7f\u7528\u65f6\u90fd\u9700\u8981\u4f20\u9012\u4e00\u4e2a\u51fd\u6570\u4f5c\u4e3a props\uff0c\u8fd9\u4e2a\u51fd\u6570\u63a5\u6536\u7ec4\u4ef6\u7684\u72b6\u6001\u548c\u903b\u8f91\uff0c\u7136\u540e\u6e32\u67d3\u7ec4\u4ef6\u7684\u4e00\u90e8\u5206\u5185\u5bb9\u3002"),(0,o.kt)("p",null,"Render props \u6a21\u5f0f\u53ef\u4ee5\u4f7f\u7ec4\u4ef6\u7684\u4ee3\u7801\u66f4\u52a0\u53ef\u590d\u7528\u548c\u7075\u6d3b\uff0c\u4f7f\u5f97\u7ec4\u4ef6\u53ef\u4ee5\u66f4\u52a0\u4e13\u6ce8\u4e8e\u5904\u7406\u6570\u636e\u548c\u903b\u8f91\uff0c\u800c\u4e0d\u662f\u5173\u6ce8\u4e8e\u5982\u4f55\u6e32\u67d3\u3002\u540c\u65f6\uff0c\u8fd9\u79cd\u6a21\u5f0f\u4e5f\u53ef\u4ee5\u5e2e\u52a9\u7ec4\u4ef6\u907f\u514d\u7ee7\u627f\u548c mixin \u7b49\u6df7\u4e71\u7684\u4ee3\u7801\u590d\u7528\u65b9\u5f0f\uff0c\u4f7f\u5f97\u7ec4\u4ef6\u66f4\u52a0\u6e05\u6670\u548c\u6613\u4e8e\u7ef4\u62a4\u3002"),(0,o.kt)("h2",{id:"\u4f8b\u5b50"},"\u4f8b\u5b50"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import React, { Component } from 'react';\n\nclass Tooltip extends Component {\n  state = { text: '' };\n\n  showTooltip = text => {\n    this.setState({ text });\n  };\n\n  hideTooltip = () => {\n    this.setState({ text: '' });\n  };\n\n  render() {\n    const { text } = this.state;\n\n    return this.props.children({ showTooltip: this.showTooltip, hideTooltip: this.hideTooltip, text });\n  }\n}\n\nclass App extends Component {\n  render() {\n    return (\n      <div>\n        <Tooltip>\n          {({ showTooltip, hideTooltip, text }) => (\n            <div>\n              <button onMouseEnter={() => showTooltip('Hello World')} onMouseLeave={hideTooltip}>\n                Hover me\n              </button>\n              {text && <div>{text}</div>}\n            </div>\n          )}\n        </Tooltip>\n      </div>\n    );\n  }\n}\n\nexport default App;\n\n")))}u.isMDXComponent=!0}}]);