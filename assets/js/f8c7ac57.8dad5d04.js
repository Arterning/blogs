"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6936],{224:(e,a,t)=>{t.d(a,{Zo:()=>p,kt:()=>g});var n=t(2374);function r(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function l(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function o(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?l(Object(t),!0).forEach((function(a){r(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function s(e,a){if(null==e)return{};var t,n,r=function(e,a){if(null==e)return{};var t,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)t=l[n],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,a);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)t=l[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var u=n.createContext({}),i=function(e){var a=n.useContext(u),t=a;return e&&(t="function"==typeof e?e(a):o(o({},a),e)),t},p=function(e){var a=i(e.components);return n.createElement(u.Provider,{value:a},e.children)},m="mdxType",c={inlineCode:"code",wrapper:function(e){var a=e.children;return n.createElement(n.Fragment,{},a)}},d=n.forwardRef((function(e,a){var t=e.components,r=e.mdxType,l=e.originalType,u=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),m=i(t),d=r,g=m["".concat(u,".").concat(d)]||m[d]||c[d]||l;return t?n.createElement(g,o(o({ref:a},p),{},{components:t})):n.createElement(g,o({ref:a},p))}));function g(e,a){var t=arguments,r=a&&a.mdxType;if("string"==typeof e||r){var l=t.length,o=new Array(l);o[0]=d;var s={};for(var u in a)hasOwnProperty.call(a,u)&&(s[u]=a[u]);s.originalType=e,s[m]="string"==typeof e?e:r,o[1]=s;for(var i=2;i<l;i++)o[i]=t[i];return n.createElement.apply(null,o)}return n.createElement.apply(null,t)}d.displayName="MDXCreateElement"},567:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>u,contentTitle:()=>o,default:()=>c,frontMatter:()=>l,metadata:()=>s,toc:()=>i});var n=t(9963),r=(t(2374),t(224));const l={},o=void 0,s={unversionedId:"tutorial/es6/js\u548cjava stream\u5bf9\u6bd4",id:"tutorial/es6/js\u548cjava stream\u5bf9\u6bd4",title:"js\u548cjava stream\u5bf9\u6bd4",description:"filter and collect",source:"@site/docs/tutorial/es6/js\u548cjava stream\u5bf9\u6bd4.md",sourceDirName:"tutorial/es6",slug:"/tutorial/es6/js\u548cjava stream\u5bf9\u6bd4",permalink:"/blogs/docs/tutorial/es6/js\u548cjava stream\u5bf9\u6bd4",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/tutorial/es6/js\u548cjava stream\u5bf9\u6bd4.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorial",previous:{title:"js \u95ed\u5305",permalink:"/blogs/docs/tutorial/es6/js \u95ed\u5305"},next:{title:"\u5e38\u7528api",permalink:"/blogs/docs/tutorial/es6/\u5e38\u7528api"}},u={},i=[{value:"filter and collect",id:"filter-and-collect",level:2},{value:"filter and foreach",id:"filter-and-foreach",level:2},{value:"map",id:"map",level:2},{value:"flatMap",id:"flatmap",level:2},{value:"\u622a\u65ad",id:"\u622a\u65ad",level:2},{value:"\u6392\u5e8f",id:"\u6392\u5e8f",level:2},{value:"\u53bb\u91cd",id:"\u53bb\u91cd",level:2},{value:"\u8df3\u8fc7",id:"\u8df3\u8fc7",level:2},{value:"group",id:"group",level:2},{value:"\u67e5\u627e",id:"\u67e5\u627e",level:2},{value:"\u53c2\u8003",id:"\u53c2\u8003",level:2}],p={toc:i},m="wrapper";function c(e){let{components:a,...t}=e;return(0,r.kt)(m,(0,n.Z)({},p,t,{components:a,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"filter-and-collect"},"filter and collect"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'// \u987a\u5e8f\u8fdb\u884c\nList<Apple> listStream = list.stream()\n        .filter((Apple a) -> a.getWeight() >20 || "green".equals(a.getColor()))\n        .collect(Collectors.toList());\n//\u5e76\u884c\u8fdb\u884c\nList<Apple> listStreamc = list.parallelStream()\n        .filter((Apple a) -> a.getWeight() >20 || "green".equals(a.getColor()))\n        .collect(Collectors.toList());\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'let colors = ["red", "blue", "grey"];\n\ncolors.forEach((item, index, arr) ==> {\n    if(item === "red") {\n        arr.splice(index, 1);\n    }\n});\n')),(0,r.kt)("h2",{id:"filter-and-foreach"},"filter and foreach"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"List<Integer> list  = Arrays.asList(12, 3, 4, 5, 4);\nlist.stream().filter( i -> i % 2 == 0)\n             .forEach(System.out::print);// 12 4 4\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'let users = [{ name: "\u6bcb\u610f", value: "202201" }, { name: "\u6bcb\u5fc5", value: "202202" }, \n             { name: "\u6bcb\u56fa", value: "202203" },{ name: "\u6bcb\u6211", value: "202204" }]\n\nusers.filter(o => o.value === 202201 ).forEach(o =>console.log(\'out :%s\',o))\n//out :{ name: \'\u6bcb\u610f\', value: \'202201\' }\n')),(0,r.kt)("h2",{id:"map"},"map"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"List<Integer> list  = Arrays.asList(12, 3, 4, 5, 4);\nlist.stream().map(o -> o+1 ).forEach(System.out::println);\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'let users = [{ name: "\u6bcb\u610f", value: "202201" }, { name: "\u6bcb\u5fc5", value: "202202" }, \n             { name: "\u6bcb\u56fa", value: "202203" },{ name: "\u6bcb\u6211", value: "202204" }]             \nusers.map( o => o.name ).forEach(o =>console.log(\'out :%s\',o))\n')),(0,r.kt)("h2",{id:"flatmap"},"flatMap"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'List<String> strings = Arrays.asList("Hello","World");\nstrings.stream().map(o -> o.split(""))\n        .flatMap(Arrays::stream)\n        .forEach(System.out::println);\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'let string = ["Hello","World"]\nstring.flatMap( o => o.split("")).forEach(o =>console.log(\'out :%s\',o))\n')),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"JS"),"\u63d0\u4f9b\u4e86",(0,r.kt)("inlineCode",{parentName:"p"},"flat"),"\u65b9\u6cd5\u53ef\u4ee5\u9ed8\u8ba4\u5c55\u5f00\u6570\u7ec4,flat() \u65b9\u6cd5\u4f1a\u6309\u7167\u4e00\u4e2a",(0,r.kt)("inlineCode",{parentName:"p"},"\u53ef\u6307\u5b9a\u7684\u6df1\u5ea6"),"\u9012\u5f52\u904d\u5386\u6570\u7ec4\uff0c\u5e76\u5c06\u6240\u6709\u5143\u7d20\u4e0e\u904d\u5386\u5230\u7684\u5b50\u6570\u7ec4\u4e2d\u7684\u5143\u7d20\u5408\u5e76\u4e3a\u4e00\u4e2a\u65b0\u6570\u7ec4\u8fd4\u56de\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"[1, 2, [3, [4, 5]]].flat()\n// [1, 2, 3, [4, 5]]\n\n[1, 2, [3, [4, 5]]].flat(2)\n// [1, 2, 3, 4, 5]\n")),(0,r.kt)("h2",{id:"\u622a\u65ad"},"\u622a\u65ad"),(0,r.kt)("p",null,"\u901a\u8fc7",(0,r.kt)("inlineCode",{parentName:"p"},"\u622a\u65ad\u6d41"),"\u6211\u4eec\u53ef\u4ee5\u770b\u5230",(0,r.kt)("inlineCode",{parentName:"p"},"Java\u7684JavaScript\u5728Stream\u4e0a\u672c\u8d28\u7684\u4e0d\u540c"),"\uff0cJava\u901a\u8fc7Stream \u5bf9\u8c61\u672c\u8eab",(0,r.kt)("inlineCode",{parentName:"p"},"OP_MASK"),"\u5c5e\u6027\u6765\u622a\u65ad,\u800cJS\u6ca1\u6709\u5b9e\u9645\u610f\u4e49\u4e0a\u7684Stream\u5bf9\u8c61\uff0c \u4f46\u662f\u53ef\u4ee5\u901a\u8fc7",(0,r.kt)("inlineCode",{parentName:"p"},"filter\u7ed3\u5408index"),"\u6765\u5b8c\u6210\uff0c\u6216\u8005\u4f7f\u7528",(0,r.kt)("inlineCode",{parentName:"p"},"slice")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"List<Integer> list  = Arrays.asList(12, 3, 4, 5, 4);\nlist.stream().limit(2).forEach(System.out::println);\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"let users = [{ name: \"\u6bcb\u610f\", value: \"202201\" }, { name: \"\u6bcb\u5fc5\", value: \"202202\" }, \n             { name: \"\u6bcb\u56fa\", value: \"202203\" },{ name: \"\u6bcb\u6211\", value: \"202204\" }]   \nusers.slice(2).forEach(o =>console.log('out :%s',o))\n\n//user.slice(2) \u8868\u793a\u53ea\u4fdd\u7559\u524d2\u4e2a\u5143\u7d20\n======================================\nout :{ name: '\u6bcb\u610f', value: '202201' }\nout :{ name: '\u6bcb\u5fc5', value: '202202' }\n\nusers.filter((_, i) => i < 2).forEach(o => console.log('out :%s', o))\n============\nout :{ name: '\u6bcb\u610f', value: '202201' }\nout :{ name: '\u6bcb\u5fc5', value: '202202' }\n")),(0,r.kt)("h2",{id:"\u6392\u5e8f"},"\u6392\u5e8f"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"List<Integer> list  = Arrays.asList(12, 3, 4, 5, 4);\nlist.stream()\n        .sorted( (o1,o2) -> o1 > o2 ? 1 : (o1 < o2 ? -1 : 0 ))\n        .forEach(System.out::println);\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'let users = [{ name: "\u6bcb\u610f", value: "202201" }, { name: "\u6bcb\u5fc5", value: "202202" }, \n             { name: "\u6bcb\u56fa", value: "202203" },{ name: "\u6bcb\u6211", value: "202204" }]  \nusers.map(o => { return { name: o.name, value: +o.value } })\n     .sort((o1, o2) => o1.value > o2.value ? -1 : (o1.value < o2.value ? 1 : 0))\n     .forEach(o => console.log(o))\n==================================\n{ name: \'\u6bcb\u6211\', value: 202204 }\n{ name: \'\u6bcb\u56fa\', value: 202203 }\n{ name: \'\u6bcb\u5fc5\', value: 202202 }\n{ name: \'\u6bcb\u610f\', value: 202201 }\n')),(0,r.kt)("h2",{id:"\u53bb\u91cd"},"\u53bb\u91cd"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"List<Integer> list  = Arrays.asList(12, 3, 4, 5, 4);\nlist.stream().distinct().forEach(System.out::println);\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"let numbers = [2,3,4,3,5,2]\nArray.from(new Set(numbers)).forEach(o => console.log(o))\n")),(0,r.kt)("h2",{id:"\u8df3\u8fc7"},"\u8df3\u8fc7"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"\u8df3\u8fc7\u5143\u7d20"),"\uff1a\u8fd4\u56de\u4e00\u4e2a\u6254\u6389\u4e86\u524dn\u4e2a\u5143\u7d20\u7684\u6d41\u3002\u5982\u679c\u6d41\u4e2d\u5143\u7d20\u4e0d\u8db3n\u4e2a\uff0c\u5219\u8fd4\u56de\u4e00\u4e2a\u7a7a\u6d41\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"List<Integer> list  = Arrays.asList(12, 3, 4, 5, 4);\nlist.stream().skip(2).forEach(System.out::println);\n==================\n4\n5\n4\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'let users = [{ name: "\u6bcb\u610f", value: "202201" }, { name: "\u6bcb\u5fc5", value: "202202" }, \n             { name: "\u6bcb\u56fa", value: "202203" },{ name: "\u6bcb\u6211", value: "202204" }] \nusers.slice(0, 2).forEach(o => console.log(o))             \n=========\n{ name: \'\u6bcb\u56fa\', value: \'202203\' }\n{ name: \'\u6bcb\u6211\', value: \'202204\' }\n')),(0,r.kt)("h2",{id:"group"},"group"),(0,r.kt)("p",null,"\u5206\u7ec4\u64cd\u4f5c\u7684\u7ed3\u679c\u662f\u4e00\u4e2a",(0,r.kt)("inlineCode",{parentName:"p"},"Map"),"\uff0c\u628a",(0,r.kt)("inlineCode",{parentName:"p"},"\u5206\u7ec4\u51fd\u6570\u8fd4\u56de\u7684\u503c\u4f5c\u4e3a\u6620\u5c04\u7684\u952e"),"\uff0c\u628a\u6d41\u4e2d\u6240\u6709\u5177\u6709\u8fd9\u4e2a\u5206\u7c7b\u503c\u7684\u9879\u76ee\u7684\u5217\u8868\u4f5c\u4e3a\u5bf9\u5e94\u7684",(0,r.kt)("inlineCode",{parentName:"p"},"\u6620\u5c04\u503c")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'List<String> lists  = Arrays.asList("123", "1234", "4564", "789");\nlists.stream().collect(Collectors.groupingBy( o -> o.length()))\n              .forEach((o1,o2) -> System.out.printf("%s:%s\\\\n",o1,o2));\n=========\n3:[123, 789]\n4:[1234, 4564]\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"const array = [1, 2, 3, 4, 5];\n\narray.group((num, index, array) => {\n  return num % 2 === 0 ? 'even': 'odd';\n});\n// { odd: [1, 3, 5], even: [2, 4] }\n")),(0,r.kt)("p",null,"groupToMap()\u7684\u4f5c\u7528\u548c\u7528\u6cd5\u4e0egroup()\u5b8c\u5168\u4e00\u81f4\uff0c\u552f\u4e00\u7684\u533a\u522b\u662f\u8fd4\u56de\u503c\u662f\u4e00\u4e2a",(0,r.kt)("inlineCode",{parentName:"p"},"Map \u7ed3\u6784"),"\uff0c\u800c\u4e0d\u662f",(0,r.kt)("inlineCode",{parentName:"p"},"\u5bf9\u8c61")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"const array = [1, 2, 3, 4, 5];\n\nconst odd  = { odd: true };\nconst even = { even: true };\narray.groupToMap((num, index, array) => {\n  return num % 2 === 0 ? even: odd;\n});\n//  Map { {odd: true}: [1, 3, 5], {even: true}: [2, 4] }\n")),(0,r.kt)("h2",{id:"\u67e5\u627e"},"\u67e5\u627e"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);\nSystem.out.println(numbers.stream().findAny().get()); //1\nSystem.out.println(numbers.stream().findFirst().get()); //1\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'let users = [{ name: "\u6bcb\u610f", value: "202201" }, { name: "\u6bcb\u5fc5", value: "202202" },\n{ name: "\u6bcb\u56fa", value: "202203" }, { name: "\u6bcb\u6211", value: "202204" }]\n\nlet user = users.find(o => o.name === "\u6bcb\u56fa")\nconsole.log(user) //{ name: \'\u6bcb\u56fa\', value: \'202203\' }\nlet useri = users.findIndex(o => o.name === "\u6bcb\u56fa")\nconsole.log(useri) //2\n')),(0,r.kt)("h2",{id:"\u53c2\u8003"},"\u53c2\u8003"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("a",{parentName:"strong",href:"https://bbs.huaweicloud.com/blogs/364943"},"\u5173\u4e8eJava&JavaScript\u4e2d(\u4f2a)Stream\u5f0fAPI\u5bf9\u6bd4\u7684\u4e00\u4e9b\u7b14\u8bb0"))))}c.isMDXComponent=!0}}]);