"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8369],{8015:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>d});var n=r(757);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var u=n.createContext({}),i=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},p=function(e){var t=i(e.components);return n.createElement(u.Provider,{value:t},e.children)},l="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,u=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),l=i(r),f=o,d=l["".concat(u,".").concat(f)]||l[f]||m[f]||a;return r?n.createElement(d,s(s({ref:t},p),{},{components:r})):n.createElement(d,s({ref:t},p))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,s=new Array(a);s[0]=f;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c[l]="string"==typeof e?e:o,s[1]=c;for(var i=2;i<a;i++)s[i]=r[i];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},3566:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>s,default:()=>m,frontMatter:()=>a,metadata:()=>c,toc:()=>i});var n=r(1227),o=(r(757),r(8015));const a={},s=void 0,c={unversionedId:"notes/\u6280\u672f\u6808/rust/\u7528Rust \u5199\u4e00\u4e2a\u7aef\u53e3\u68c0\u6d4b\u5de5\u5177",id:"notes/\u6280\u672f\u6808/rust/\u7528Rust \u5199\u4e00\u4e2a\u7aef\u53e3\u68c0\u6d4b\u5de5\u5177",title:"\u7528Rust \u5199\u4e00\u4e2a\u7aef\u53e3\u68c0\u6d4b\u5de5\u5177",description:"",source:"@site/docs/notes/\u6280\u672f\u6808/rust/\u7528Rust \u5199\u4e00\u4e2a\u7aef\u53e3\u68c0\u6d4b\u5de5\u5177.md",sourceDirName:"notes/\u6280\u672f\u6808/rust",slug:"/notes/\u6280\u672f\u6808/rust/\u7528Rust \u5199\u4e00\u4e2a\u7aef\u53e3\u68c0\u6d4b\u5de5\u5177",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/rust/\u7528Rust \u5199\u4e00\u4e2a\u7aef\u53e3\u68c0\u6d4b\u5de5\u5177",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/\u6280\u672f\u6808/rust/\u7528Rust \u5199\u4e00\u4e2a\u7aef\u53e3\u68c0\u6d4b\u5de5\u5177.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"unwrap in rust",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/rust/unwrap in rust"},next:{title:"\u7f16\u8bd1\u5668\u7684\u6838\u5fc3\u9650\u5236",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/rust/\u7f16\u8bd1\u5668\u7684\u6838\u5fc3\u9650\u5236"}},u={},i=[],p={toc:i},l="wrapper";function m(e){let{components:t,...r}=e;return(0,o.kt)(l,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},'use std::net::TcpStream;\nuse clap::{Arg, App};\n\nfn main() {\n    let matches = App::new("Port Checker")\n        .version("1.0")\n        .author("Your Name")\n        .about("Check if a port is open or closed")\n        .arg(Arg::with_name("target")\n            .help("Sets the target host and port to check")\n            .required(true)\n            .index(1))\n        .get_matches();\n\n    let target = matches.value_of("target").unwrap();\n\n    match TcpStream::connect(target) {\n        Ok(_) => println!("Port is open"),\n        Err(_) => println!("Port is closed"),\n    }\n}\n')))}m.isMDXComponent=!0}}]);