"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9015],{224:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>h});var r=n(2374);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),c=p(n),m=a,h=c["".concat(l,".").concat(m)]||c[m]||d[m]||i;return n?r.createElement(h,o(o({ref:t},u),{},{components:n})):r.createElement(h,o({ref:t},u))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[c]="string"==typeof e?e:a,o[1]=s;for(var p=2;p<i;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3357:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var r=n(9963),a=(n(2374),n(224));const i={},o=void 0,s={unversionedId:"tutorial/rust/unwrap in rust",id:"tutorial/rust/unwrap in rust",title:"unwrap in rust",description:"unwrap",source:"@site/docs/tutorial/rust/unwrap in rust.md",sourceDirName:"tutorial/rust",slug:"/tutorial/rust/unwrap in rust",permalink:"/blogs/docs/tutorial/rust/unwrap in rust",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/tutorial/rust/unwrap in rust.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorial",previous:{title:"windows \u5b89\u88c5 rust",permalink:"/blogs/docs/tutorial/rust/Rust basic know"},next:{title:"\u7528Rust \u5199\u4e00\u4e2a\u7aef\u53e3\u68c0\u6d4b\u5de5\u5177",permalink:"/blogs/docs/tutorial/rust/\u7528Rust \u5199\u4e00\u4e2a\u7aef\u53e3\u68c0\u6d4b\u5de5\u5177"}},l={},p=[{value:"unwrap",id:"unwrap",level:2},{value:"closure",id:"closure",level:2}],u={toc:p},c="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(c,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"unwrap"},"unwrap"),(0,a.kt)("p",null,"In Rust, the\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"unwrap"),"\xa0method is a convenient way to handle the\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"Result"),"\xa0type. The\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"Result"),"\xa0type is an enum that represents either success (",(0,a.kt)("inlineCode",{parentName:"p"},"Ok"),") with a value or failure (",(0,a.kt)("inlineCode",{parentName:"p"},"Err"),") with an error."),(0,a.kt)("p",null,"When you call\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"unwrap"),"\xa0on a\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"Result"),"\xa0instance, it will either return the value inside the\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"Ok"),"\xa0variant if the result is successful, or panic with the error message inside the\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"Err"),"\xa0variant if the result is a failure."),(0,a.kt)("p",null,"In the given code snippet:"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},'let listener = TcpListener::bind("127.0.0.1:8080").unwrap();')),(0,a.kt)("p",null,"The\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"unwrap"),"\xa0method is used to extract the value from the\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"Result"),"\xa0returned by\xa0",(0,a.kt)("inlineCode",{parentName:"p"},'TcpListener::bind("127.0.0.1:8080")'),". If the\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"bind"),"\xa0operation is successful,\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"unwrap"),"\xa0will return the\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"TcpListener"),"\xa0instance. If the\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"bind"),"\xa0operation encounters an error,\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"unwrap"),"\xa0will panic and the program will exit, displaying the error message."),(0,a.kt)("p",null,"It's important to use\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"unwrap"),"\xa0with caution, as panicking might not be the desired behavior in all cases. In production code, it's often better to use proper error handling techniques, such as pattern matching on the\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"Result"),"\xa0type and providing specific error messages or fallback behaviors in case of failure."),(0,a.kt)("h2",{id:"closure"},"closure"),(0,a.kt)("p",null,"In Rust,\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"||"),"\xa0is the syntax used to define a closure, which is an anonymous function that can capture its environment."),(0,a.kt)("p",null,"In the given code snippet:"),(0,a.kt)("p",null,"Copied! \u2705\ud83d\udcdd Copy Code"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"thread::spawn(|| handle_connection(stream));")),(0,a.kt)("p",null,"The\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"||"),"\xa0is used to define a closure that takes no arguments and captures the\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"stream"),"\xa0variable from its surrounding environment. The closure is then passed as an argument to the\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"thread::spawn"),"\xa0function, which creates a new thread and executes the closure in that thread."),(0,a.kt)("p",null,"The\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"||"),"\xa0syntax indicates the start of the closure, and any parameters would be listed within the pipes. In this case, since there are no parameters, the closure definition is simply\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"||"),". Inside the closure, the\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"handle_connection(stream)"),"\xa0function is called, using the captured\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"stream"),"\xa0variable."),(0,a.kt)("p",null,"Closures are a powerful feature in Rust that allow for flexible and concise code, especially when working with asynchronous operations, concurrency, and event handling."))}d.isMDXComponent=!0}}]);