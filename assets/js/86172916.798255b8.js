"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4145],{8015:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>k});var a=n(757);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),c=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},m=function(e){var t=c(e.components);return a.createElement(p.Provider,{value:t},e.children)},u="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),u=c(n),d=r,k=u["".concat(p,".").concat(d)]||u[d]||s[d]||o;return n?a.createElement(k,l(l({ref:t},m),{},{components:n})):a.createElement(k,l({ref:t},m))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=d;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[u]="string"==typeof e?e:r,l[1]=i;for(var c=2;c<o;c++)l[c]=n[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6362:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>s,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var a=n(1227),r=(n(757),n(8015));const o={},l=void 0,i={unversionedId:"notes/\u6280\u672f\u6808/React/\u4e8b\u4ef6\u7c7b\u578b",id:"notes/\u6280\u672f\u6808/React/\u4e8b\u4ef6\u7c7b\u578b",title:"\u4e8b\u4ef6\u7c7b\u578b",description:"\u9f20\u6807\u4e8b\u4ef6",source:"@site/docs/notes/\u6280\u672f\u6808/React/\u4e8b\u4ef6\u7c7b\u578b.md",sourceDirName:"notes/\u6280\u672f\u6808/React",slug:"/notes/\u6280\u672f\u6808/React/\u4e8b\u4ef6\u7c7b\u578b",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/React/\u4e8b\u4ef6\u7c7b\u578b",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/\u6280\u672f\u6808/React/\u4e8b\u4ef6\u7c7b\u578b.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"react query and SWR",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/React/state management/ReactQuery/react query and SWR"},next:{title:"\u7531\u96f6\u5f00\u59cb\u4f7f\u7528 Webpack \u6765\u642d\u5efa React \u9879\u76ee",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/React/\u624b\u52a8\u642d\u5efa\u811a\u624b\u67b6"}},p={},c=[{value:"\u9f20\u6807\u4e8b\u4ef6",id:"\u9f20\u6807\u4e8b\u4ef6",level:2},{value:"onChange \u4e8b\u4ef6",id:"onchange-\u4e8b\u4ef6",level:2}],m={toc:c},u="wrapper";function s(e){let{components:t,...n}=e;return(0,r.kt)(u,(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"\u9f20\u6807\u4e8b\u4ef6"},"\u9f20\u6807\u4e8b\u4ef6"),(0,r.kt)("p",null,"\u5728React\u4e2d\u4f7f\u7528TypeScript\u65f6\uff0c\u4e8b\u4ef6\uff08Event\uff09\u7684\u7c7b\u578b\u901a\u5e38\u662f",(0,r.kt)("inlineCode",{parentName:"p"},"React.MouseEvent"),"\uff08\u9f20\u6807\u4e8b\u4ef6\uff09\u6216",(0,r.kt)("inlineCode",{parentName:"p"},"React.FormEvent"),"\uff08\u8868\u5355\u4e8b\u4ef6\uff09\u7b49\uff0c\u5177\u4f53\u53d6\u51b3\u4e8e\u4f60\u8981\u5904\u7406\u7684\u4e8b\u4ef6\u7c7b\u578b\u3002\u8fd9\u4e9b\u7c7b\u578b\u662f\u6cdb\u578b\u7c7b\u578b\uff0c\u5141\u8bb8\u4f60\u6307\u5b9a\u4e8b\u4ef6\u76ee\u6807\u7684\u7c7b\u578b\u3002\u4ee5\u4e0b\u662f\u4e00\u4e9b\u5e38\u89c1\u7684React\u4e8b\u4ef6\u7c7b\u578b\uff1a"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"\u9f20\u6807\u4e8b\u4ef6\uff08Mouse Events\uff09\uff1a")),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"React.MouseEvent<HTMLButtonElement>"),"\uff1a\u8868\u793a\u4e00\u4e2a\u6309\u94ae\u5143\u7d20\u7684\u9f20\u6807\u4e8b\u4ef6\u3002"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"React.MouseEvent<HTMLDivElement>"),"\uff1a\u8868\u793a\u4e00\u4e2a",(0,r.kt)("inlineCode",{parentName:"li"},"<div>"),"\u5143\u7d20\u7684\u9f20\u6807\u4e8b\u4ef6\u3002"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"React.MouseEvent<HTMLAnchorElement>"),"\uff1a\u8868\u793a\u4e00\u4e2a\u951a\u5143\u7d20\uff08",(0,r.kt)("inlineCode",{parentName:"li"},"<a>"),"\uff09\u7684\u9f20\u6807\u4e8b\u4ef6\u3002")),(0,r.kt)("p",{parentName:"li"},"\u4f60\u53ef\u4ee5\u6839\u636e\u5b9e\u9645\u60c5\u51b5\uff0c\u5c06",(0,r.kt)("inlineCode",{parentName:"p"},"HTMLButtonElement"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"HTMLDivElement"),"\u6216\u5176\u4ed6HTML\u5143\u7d20\u7c7b\u578b\u7528\u4f5c\u6cdb\u578b\u53c2\u6570\uff0c\u4ee5\u5339\u914d\u4f60\u7684\u4e8b\u4ef6\u76ee\u6807\u3002")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"\u8868\u5355\u4e8b\u4ef6\uff08Form Events\uff09\uff1a")),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"React.FormEvent<HTMLInputElement>"),"\uff1a\u8868\u793a\u4e00\u4e2a",(0,r.kt)("inlineCode",{parentName:"li"},"<input>"),"\u5143\u7d20\u7684\u8868\u5355\u4e8b\u4ef6\u3002"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"React.FormEvent<HTMLFormElement>"),"\uff1a\u8868\u793a\u4e00\u4e2a\u8868\u5355\u5143\u7d20\u7684\u8868\u5355\u4e8b\u4ef6\u3002")),(0,r.kt)("p",{parentName:"li"},"\u7c7b\u4f3c\u4e8e\u9f20\u6807\u4e8b\u4ef6\uff0c\u4f60\u53ef\u4ee5\u6839\u636e\u5b9e\u9645\u60c5\u51b5\uff0c\u5c06",(0,r.kt)("inlineCode",{parentName:"p"},"HTMLInputElement"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"HTMLFormElement"),"\u6216\u5176\u4ed6HTML\u5143\u7d20\u7c7b\u578b\u7528\u4f5c\u6cdb\u578b\u53c2\u6570\u3002")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"\u81ea\u5b9a\u4e49\u4e8b\u4ef6\uff08Custom Events\uff09\uff1a")),(0,r.kt)("p",{parentName:"li"},"\u4f60\u8fd8\u53ef\u4ee5\u5b9a\u4e49\u81ea\u5df1\u7684\u81ea\u5b9a\u4e49\u4e8b\u4ef6\u7c7b\u578b\u3002\u4f8b\u5982\uff0c\u5982\u679c\u4f60\u5728\u7ec4\u4ef6\u4e2d\u4f7f\u7528\u4e86\u81ea\u5b9a\u4e49\u4e8b\u4ef6\uff0c\u53ef\u4ee5\u521b\u5efa\u4e00\u4e2a\u4e0e\u4e8b\u4ef6\u7ed3\u6784\u5339\u914d\u7684\u7c7b\u578b\u3002"))),(0,r.kt)("p",null,"\u4ee5\u4e0b\u662f\u4e00\u4e2a\u793a\u4f8b\uff0c\u5c55\u793a\u4e86\u5982\u4f55\u5728React\u4e2d\u5904\u7406\u70b9\u51fb\u4e8b\u4ef6\u7684\u7c7b\u578b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"import React from 'react';\n\nfunction handleClick(event: React.MouseEvent<HTMLButtonElement>) {\n  // \u5904\u7406\u70b9\u51fb\u4e8b\u4ef6\n}\n\nfunction MyButton() {\n  return <button onClick={handleClick}>Click me</button>;\n}\n\nexport default MyButton;\n")),(0,r.kt)("p",null,"\u5728\u4e0a\u9762\u7684\u793a\u4f8b\u4e2d\uff0c",(0,r.kt)("inlineCode",{parentName:"p"},"handleClick"),"\u51fd\u6570\u63a5\u6536\u7684\u4e8b\u4ef6\u7c7b\u578b\u662f",(0,r.kt)("inlineCode",{parentName:"p"},"React.MouseEvent<HTMLButtonElement>"),"\uff0c\u56e0\u4e3a\u5b83\u662f\u4e00\u4e2a\u4e0e\u6309\u94ae\u5143\u7d20\u76f8\u5173\u7684\u9f20\u6807\u4e8b\u4ef6\u5904\u7406\u7a0b\u5e8f\u3002\u6839\u636e\u4e8b\u4ef6\u7684\u76ee\u6807\u5143\u7d20\u548c\u4e8b\u4ef6\u7c7b\u578b\uff0c\u4f60\u53ef\u4ee5\u9009\u62e9\u9002\u5f53\u7684React\u4e8b\u4ef6\u7c7b\u578b\u548c\u6cdb\u578b\u53c2\u6570\u3002"),(0,r.kt)("h2",{id:"onchange-\u4e8b\u4ef6"},"onChange \u4e8b\u4ef6"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"onChange"),"\u4e8b\u4ef6\u901a\u5e38\u4e0e\u8868\u5355\u5143\u7d20\u4e00\u8d77\u4f7f\u7528\uff0c\u4ee5\u4fa6\u542c\u8f93\u5165\u6846\u3001\u9009\u62e9\u6846\u3001\u5355\u9009\u6309\u94ae\u7b49\u8868\u5355\u5143\u7d20\u7684\u503c\u53d8\u5316\u3002\u5728React\u4e2d\uff0c",(0,r.kt)("inlineCode",{parentName:"p"},"onChange"),"\u4e8b\u4ef6\u7684\u7c7b\u578b\u53d6\u51b3\u4e8e\u88ab\u76d1\u542c\u7684\u8868\u5355\u5143\u7d20\u7c7b\u578b\uff0c\u901a\u5e38\u662f",(0,r.kt)("inlineCode",{parentName:"p"},"React.ChangeEvent"),"\u7684\u4e00\u4e2a\u5b50\u7c7b\u578b\uff0c\u4ee5\u5339\u914d\u7279\u5b9a\u7684\u8868\u5355\u5143\u7d20\u3002"),(0,r.kt)("p",null,"\u4ee5\u4e0b\u662f\u4e00\u4e9b\u5e38\u89c1\u7684",(0,r.kt)("inlineCode",{parentName:"p"},"onChange"),"\u4e8b\u4ef6\u7c7b\u578b\uff1a"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"\u6587\u672c\u8f93\u5165\u6846\uff08Text Input\uff09\uff1a")),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"React.ChangeEvent<HTMLInputElement>"),"\uff1a\u7528\u4e8e\u6587\u672c\u8f93\u5165\u6846\uff08",(0,r.kt)("inlineCode",{parentName:"li"},'<input type="text">'),"\uff09\u7684",(0,r.kt)("inlineCode",{parentName:"li"},"onChange"),"\u4e8b\u4ef6\u3002")),(0,r.kt)("p",{parentName:"li"},"\u793a\u4f8b\uff1a"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"import React, { useState } from 'react';\n\nfunction MyTextInput() {\n  const [text, setText] = useState('');\n\n  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {\n    setText(event.target.value);\n  };\n\n  return (\n    <input\n      type=\"text\"\n      value={text}\n      onChange={handleChange}\n    />\n  );\n}\n"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"\u9009\u62e9\u6846\uff08Select\uff09\uff1a")),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"React.ChangeEvent<HTMLSelectElement>"),"\uff1a\u7528\u4e8e\u9009\u62e9\u6846\uff08",(0,r.kt)("inlineCode",{parentName:"li"},"<select>"),"\uff09\u7684",(0,r.kt)("inlineCode",{parentName:"li"},"onChange"),"\u4e8b\u4ef6\u3002")),(0,r.kt)("p",{parentName:"li"},"\u793a\u4f8b\uff1a"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},'import React, { useState } from \'react\';\n\nfunction MySelect() {\n  const [selectedOption, setSelectedOption] = useState(\'\');\n\n  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {\n    setSelectedOption(event.target.value);\n  };\n\n  return (\n    <select value={selectedOption} onChange={handleChange}>\n      <option value="option1">Option 1</option>\n      <option value="option2">Option 2</option>\n      <option value="option3">Option 3</option>\n    </select>\n  );\n}\n'))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"\u5355\u9009\u6309\u94ae\uff08Radio Buttons\uff09\uff1a")),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"React.ChangeEvent<HTMLInputElement>"),"\uff1a\u7528\u4e8e\u5355\u9009\u6309\u94ae\uff08",(0,r.kt)("inlineCode",{parentName:"li"},'<input type="radio">'),"\uff09\u7684",(0,r.kt)("inlineCode",{parentName:"li"},"onChange"),"\u4e8b\u4ef6\u3002")),(0,r.kt)("p",{parentName:"li"},"\u793a\u4f8b\uff1a"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},'import React, { useState } from \'react\';\n\nfunction MyRadioButtons() {\n  const [selectedOption, setSelectedOption] = useState(\'\');\n\n  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {\n    setSelectedOption(event.target.value);\n  };\n\n  return (\n    <div>\n      <input\n        type="radio"\n        id="option1"\n        value="option1"\n        checked={selectedOption === \'option1\'}\n        onChange={handleChange}\n      />\n      <label htmlFor="option1">Option 1</label>\n      <br />\n      <input\n        type="radio"\n        id="option2"\n        value="option2"\n        checked={selectedOption === \'option2\'}\n        onChange={handleChange}\n      />\n      <label htmlFor="option2">Option 2</label>\n    </div>\n  );\n}\n')))),(0,r.kt)("p",null,"\u5982\u4e0a\u6240\u793a\uff0c\u4f60\u53ef\u4ee5\u4f7f\u7528",(0,r.kt)("inlineCode",{parentName:"p"},"React.ChangeEvent"),"\u7684\u5b50\u7c7b\u578b\u6765\u5b9a\u4e49",(0,r.kt)("inlineCode",{parentName:"p"},"onChange"),"\u4e8b\u4ef6\u7684\u7c7b\u578b\uff0c\u5177\u4f53\u53d6\u51b3\u4e8e\u8868\u5355\u5143\u7d20\u7684\u7c7b\u578b\u3002\u8fd9\u4e9b\u4e8b\u4ef6\u5c06\u63d0\u4f9b\u6709\u5173\u503c\u7684\u53d8\u5316\u548c\u4e8b\u4ef6\u76ee\u6807\u7684\u4fe1\u606f\u3002"))}s.isMDXComponent=!0}}]);