"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8370],{8015:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>k});var a=n(757);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},m=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),u=p(n),d=r,k=u["".concat(s,".").concat(d)]||u[d]||c[d]||l;return n?a.createElement(k,o(o({ref:t},m),{},{components:n})):a.createElement(k,o({ref:t},m))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[u]="string"==typeof e?e:r,o[1]=i;for(var p=2;p<l;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8786:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>c,frontMatter:()=>l,metadata:()=>i,toc:()=>p});var a=n(1227),r=(n(757),n(8015));const l={},o=void 0,i={unversionedId:"notes/\u6280\u672f\u6808/go/go full text search",id:"notes/\u6280\u672f\u6808/go/go full text search",title:"go full text search",description:"\u8ba9\u6211\u4eec\u6784\u5efa\u4e00\u4e2a\u5168\u6587\u641c\u7d22\u5f15\u64ce",source:"@site/docs/notes/\u6280\u672f\u6808/go/go full text search.md",sourceDirName:"notes/\u6280\u672f\u6808/go",slug:"/notes/\u6280\u672f\u6808/go/go full text search",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/go/go full text search",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/\u6280\u672f\u6808/go/go full text search.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"Go Path and Go ROOT",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/go/Go Path and Go ROOT"},next:{title:"JDK\u4e2d\u95f4\u7248\u672c\u4e3b\u8981\u66f4\u65b0\u7279\u6027",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/jdk/JDK\u4e2d\u95f4\u7248\u672c\u4e3b\u8981\u66f4\u65b0\u7279\u6027"}},s={},p=[{value:"\u8ba9\u6211\u4eec\u6784\u5efa\u4e00\u4e2a\u5168\u6587\u641c\u7d22\u5f15\u64ce",id:"\u8ba9\u6211\u4eec\u6784\u5efa\u4e00\u4e2a\u5168\u6587\u641c\u7d22\u5f15\u64ce",level:2},{value:"\u4e3a\u4ec0\u4e48\u9009\u62e9FTS",id:"\u4e3a\u4ec0\u4e48\u9009\u62e9fts",level:3},{value:"\u8bed\u6599\u5e93",id:"\u8bed\u6599\u5e93",level:3},{value:"\u52a0\u8f7d\u6587\u6863",id:"\u52a0\u8f7d\u6587\u6863",level:3},{value:"\u9996\u6b21\u5c1d\u8bd5",id:"\u9996\u6b21\u5c1d\u8bd5",level:3},{value:"\u641c\u7d22\u5185\u5bb9",id:"\u641c\u7d22\u5185\u5bb9",level:3},{value:"\u4f7f\u7528\u6b63\u5219\u8868\u8fbe\u5f0f\u641c\u7d22",id:"\u4f7f\u7528\u6b63\u5219\u8868\u8fbe\u5f0f\u641c\u7d22",level:3},{value:"\u5012\u6392\u7d22\u5f15#",id:"\u5012\u6392\u7d22\u5f15",level:3},{value:"\u6587\u672c\u5206\u6790",id:"\u6587\u672c\u5206\u6790",level:3},{value:"\u6807\u8bb0\u5668",id:"\u6807\u8bb0\u5668",level:3},{value:"\u8fc7\u6ee4\u5668#",id:"\u8fc7\u6ee4\u5668",level:3},{value:"\u5c0f\u5199#",id:"\u5c0f\u5199",level:3},{value:"\u5220\u9664\u5e38\u7528\u8bcd",id:"\u5220\u9664\u5e38\u7528\u8bcd",level:3},{value:"Stemming #",id:"stemming-",level:3},{value:"Putting the analyzer together #",id:"putting-the-analyzer-together-",level:3},{value:"Building the index #",id:"building-the-index-",level:3},{value:"Querying #",id:"querying-",level:3},{value:"Boolean queries #",id:"boolean-queries-",level:3},{value:"\u7ed3\u8bba",id:"\u7ed3\u8bba",level:3}],m={toc:p},u="wrapper";function c(e){let{components:t,...n}=e;return(0,r.kt)(u,(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"\u8ba9\u6211\u4eec\u6784\u5efa\u4e00\u4e2a\u5168\u6587\u641c\u7d22\u5f15\u64ce"},"\u8ba9\u6211\u4eec\u6784\u5efa\u4e00\u4e2a\u5168\u6587\u641c\u7d22\u5f15\u64ce"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"2020 \u5e74 7 \u6708 28 \u65e5"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://artem.krylysov.com/tag/dev/"},"\u5f00\u53d1")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://artem.krylysov.com/tag/search/"},"\u641c\u7d22")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://artem.krylysov.com/tag/fts/"},"\u91d1\u878d\u65f6\u62a5")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://artem.krylysov.com/tag/go/"},"\u53bb")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://artem.krylysov.com/tag/golang/"},"golang"))),(0,r.kt)("p",null,"\u5168\u6587\u641c\u7d22\u662f\u4eba\u4eec\u6bcf\u5929\u90fd\u5728\u4f7f\u7528\u5374\u6ca1\u6709\u610f\u8bc6\u5230\u7684\u5de5\u5177\u4e4b\u4e00\u3002\u5982\u679c\u4f60\u66fe\u7ecf\u5728 Google \u4e0a\u641c\u7d22\u8fc7\u201cgolang \u8986\u76d6\u7387\u62a5\u544a\u201d\u6216\u5728\u7535\u5b50\u5546\u52a1\u7f51\u7ad9\u4e0a\u641c\u7d22\u8fc7\u201c\u5ba4\u5185\u65e0\u7ebf\u6444\u50cf\u5934\u201d\uff0c\u90a3\u4e48\u4f60\u5c31\u4f7f\u7528\u4e86\u67d0\u79cd\u5168\u6587\u641c\u7d22\u3002"),(0,r.kt)("p",null,"\u5168\u6587\u641c\u7d22 (FTS) \u662f\u4e00\u79cd\u5728\u6587\u6863\u96c6\u5408\u4e2d\u641c\u7d22\u6587\u672c\u7684\u6280\u672f\u3002\u6587\u6863\u53ef\u4ee5\u6307\u7f51\u9875\u3001\u62a5\u7eb8\u6587\u7ae0\u3001\u7535\u5b50\u90ae\u4ef6\u6216\u4efb\u4f55\u7ed3\u6784\u5316\u6587\u672c\u3002"),(0,r.kt)("p",null,"\u4eca\u5929\u6211\u4eec\u8981\u6784\u5efa\u81ea\u5df1\u7684 FTS \u5f15\u64ce\u3002\u5728\u8fd9\u7bc7\u6587\u7ae0\u7ed3\u675f\u65f6\uff0c\u6211\u4eec\u5c06\u80fd\u591f\u5728\u4e0d\u5230\u4e00\u6beb\u79d2\u7684\u65f6\u95f4\u5185\u641c\u7d22\u6570\u767e\u4e07\u4e2a\u6587\u6863\u3002\u6211\u4eec\u5c06\u4ece\u7b80\u5355\u7684\u641c\u7d22\u67e5\u8be2\u5f00\u59cb\uff0c\u4f8b\u5982\u201c\u7ed9\u6211\u5305\u542b\u5355\u8bcd",(0,r.kt)("em",{parentName:"p"},"cat"),"\u7684\u6240\u6709\u6587\u6863\u201d\uff0c\u7136\u540e\u6211\u4eec\u5c06\u6269\u5c55\u5f15\u64ce\u4ee5\u652f\u6301\u66f4\u590d\u6742\u7684\u5e03\u5c14\u67e5\u8be2\u3002"),(0,r.kt)("p",null,"\u7b14\u8bb0"),(0,r.kt)("p",null,"\u6700\u8457\u540d\u7684 FTS \u5f15\u64ce\u662f",(0,r.kt)("a",{parentName:"p",href:"https://lucene.apache.org/"},"Lucene"),"\uff08\u4ee5\u53ca\u5efa\u7acb\u5728\u5176\u4e4b\u4e0a\u7684",(0,r.kt)("a",{parentName:"p",href:"https://github.com/elastic/elasticsearch"},"Elasticsearch\u548c Solr\uff09\u3002")),(0,r.kt)("h3",{id:"\u4e3a\u4ec0\u4e48\u9009\u62e9fts"},"\u4e3a\u4ec0\u4e48\u9009\u62e9",(0,r.kt)("a",{parentName:"h3",href:"https://artem.krylysov.com/blog/2020/07/28/lets-build-a-full-text-search-engine/#why-fts"},"FTS")),(0,r.kt)("p",null,"\u5728\u5f00\u59cb\u7f16\u5199\u4ee3\u7801\u4e4b\u524d\uff0c\u60a8\u53ef\u80fd\u4f1a\u95ee\u201c\u6211\u4eec\u4e0d\u80fd\u53ea\u4f7f\u7528",(0,r.kt)("em",{parentName:"p"},"grep"),"\u6216\u5faa\u73af\u68c0\u67e5\u6bcf\u4e2a\u6587\u6863\u662f\u5426\u5305\u542b\u6211\u8981\u67e5\u627e\u7684\u5355\u8bcd\u5417\uff1f\u201d\u3002\u662f\u7684\uff0c\u6211\u4eec\u53ef\u4ee5\u3002\u4f46\u662f\uff0c\u8fd9\u5e76\u4e0d\u603b\u662f\u6700\u597d\u7684\u4e3b\u610f\u3002"),(0,r.kt)("h3",{id:"\u8bed\u6599\u5e93"},"\u8bed\u6599\u5e93",(0,r.kt)("a",{parentName:"h3",href:"https://artem.krylysov.com/blog/2020/07/28/lets-build-a-full-text-search-engine/#corpus"})),(0,r.kt)("p",null,"\u6211\u4eec\u5c06\u641c\u7d22\u82f1\u6587\u7ef4\u57fa\u767e\u79d1\u6458\u8981\u7684\u4e00\u90e8\u5206\u3002\u6700\u65b0\u7684\u8f6c\u50a8\u53ef\u5728",(0,r.kt)("a",{parentName:"p",href:"https://dumps.wikimedia.org/enwiki/latest/enwiki-latest-abstract1.xml.gz"},"dumps.wikimedia.org"),"\u4e0a\u627e\u5230\u3002\u622a\u81f3\u4eca\u5929\uff0c\u89e3\u538b\u540e\u7684\u6587\u4ef6\u5927\u5c0f\u4e3a 913 MB\u3002XML \u6587\u4ef6\u5305\u542b\u8d85\u8fc7 600K \u4e2a\u6587\u6863\u3002"),(0,r.kt)("p",null,"\u6587\u6863\u793a\u4f8b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"<title>Wikipedia: Kit-Cat Klock</title>\n<url>https://en.wikipedia.org/wiki/Kit-Cat_Klock</url>\n<abstract>The Kit-Cat Klock is an art deco novelty wall clock shaped like a grinning cat with cartoon eyes that swivel in time with its pendulum tail.</abstract>\n")),(0,r.kt)("h3",{id:"\u52a0\u8f7d\u6587\u6863"},"\u52a0\u8f7d",(0,r.kt)("a",{parentName:"h3",href:"https://artem.krylysov.com/blog/2020/07/28/lets-build-a-full-text-search-engine/#loading-documents"},"\u6587\u6863")),(0,r.kt)("p",null,"\u9996\u5148\uff0c\u6211\u4eec\u9700\u8981\u4ece\u8f6c\u50a8\u4e2d\u52a0\u8f7d\u6240\u6709\u6587\u6863\u3002\u5185\u7f6e\u7684encoding/xml\u5305\u975e\u5e38\u65b9\u4fbf\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'import (\n    "encoding/xml"\n    "os"\n)\ntype document struct {\n    Title string `xml:"title"`\n    URL   string `xml:"url"`\n    Text  string `xml:"abstract"`\n    ID    int\n}\nfunc loadDocuments(path string) ([]document, error) {\n    f, err := os.Open(path)\n    if err != nil {\n        return nil, err\n    }\n    defer f.Close()\n    dec := xml.NewDecoder(f)\n    dump := struct {\n        Documents []document `xml:"doc"`\n    }{}\n    if err := dec.Decode(&dump); err != nil {\n        return nil, err\n    }\n    docs := dump.Documents\n    for i := range docs {\n        docs[i].ID = i\n    }\n    return docs, nil\n}\n')),(0,r.kt)("p",null,"\u6bcf\u4e2a\u52a0\u8f7d\u7684\u6587\u6863\u90fd\u4f1a\u88ab\u5206\u914d\u4e00\u4e2a\u552f\u4e00\u7684\u6807\u8bc6\u7b26\u3002\u4e3a\u7b80\u5355\u8d77\u89c1\uff0c\u7b2c\u4e00\u4e2a\u52a0\u8f7d\u7684\u6587\u6863\u88ab\u5206\u914d ID=0\uff0c\u7b2c\u4e8c\u4e2a\u88ab\u5206\u914d ID=1\uff0c\u4f9d\u6b64\u7c7b\u63a8\u3002"),(0,r.kt)("h3",{id:"\u9996\u6b21\u5c1d\u8bd5"},"\u9996\u6b21",(0,r.kt)("a",{parentName:"h3",href:"https://artem.krylysov.com/blog/2020/07/28/lets-build-a-full-text-search-engine/#first-attempt"},"\u5c1d\u8bd5")),(0,r.kt)("h3",{id:"\u641c\u7d22\u5185\u5bb9"},(0,r.kt)("a",{parentName:"h3",href:"https://artem.krylysov.com/blog/2020/07/28/lets-build-a-full-text-search-engine/#searching-the-content"},"\u641c\u7d22"),"\u5185\u5bb9"),(0,r.kt)("p",null,"\u73b0\u5728\u6211\u4eec\u5df2\u5c06\u6240\u6709\u6587\u6863\u52a0\u8f7d\u5230\u5185\u5b58\u4e2d\uff0c\u6211\u4eec\u53ef\u4ee5\u5c1d\u8bd5\u67e5\u627e\u6709\u5173\u732b\u7684\u6587\u6863\u3002\u9996\u5148\uff0c\u8ba9\u6211\u4eec\u5faa\u73af\u904d\u5386\u6240\u6709\u6587\u6863\u5e76\u68c0\u67e5\u5b83\u4eec\u662f\u5426\u5305\u542b\u5b50\u5b57\u7b26\u4e32",(0,r.kt)("em",{parentName:"p"},"cat"),"\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},"func search(docs []document, term string) []document {\n    var r []document\n    for _, doc := range docs {\n        if strings.Contains(doc.Text, term) {\n            r = append(r, doc)\n        }\n    }\n    return r\n}\n")),(0,r.kt)("p",null,"\u5728\u6211\u7684\u7b14\u8bb0\u672c\u7535\u8111\u4e0a\uff0c\u641c\u7d22\u9636\u6bb5\u8017\u65f6 103 \u6beb\u79d2 - \u8fd8\u4e0d\u9519\u3002\u5982\u679c\u60a8\u4ece\u8f93\u51fa\u4e2d\u62bd\u67e5\u4e00\u4e9b\u6587\u6863\uff0c\u60a8\u53ef\u80fd\u4f1a\u6ce8\u610f\u5230\u8be5\u51fd\u6570\u5339\u914d",(0,r.kt)("em",{parentName:"p"},"caterpillar"),"\u548c",(0,r.kt)("em",{parentName:"p"},"category"),"\uff0c\u4f46\u6ca1\u6709\u5339\u914d\u5927\u5199",(0,r.kt)("em",{parentName:"p"},"C \u7684__Cat"),"\u3002\u8fd9\u4e0d\u662f\u6211\u60f3\u8981\u7684\u3002"),(0,r.kt)("p",null,"\u5728\u7ee7\u7eed\u524d\u8fdb\u4e4b\u524d\uff0c\u6211\u4eec\u9700\u8981\u89e3\u51b3\u4e24\u4e2a\u95ee\u9898\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u4f7f\u641c\u7d22\u4e0d\u533a\u5206\u5927\u5c0f\u5199\uff08\u56e0\u6b64",(0,r.kt)("em",{parentName:"li"},"Cat"),"\u4e5f\u5339\u914d\uff09\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u5728\u5355\u8bcd\u8fb9\u754c\u4e0a\u5339\u914d\u800c\u4e0d\u662f\u5728\u5b50\u5b57\u7b26\u4e32\u4e0a\u5339\u914d\uff08\u56e0\u6b64",(0,r.kt)("em",{parentName:"li"},"caterpillar"),"\u548c",(0,r.kt)("em",{parentName:"li"},"communication"),"\u4e0d\u5339\u914d\uff09\u3002")),(0,r.kt)("h3",{id:"\u4f7f\u7528\u6b63\u5219\u8868\u8fbe\u5f0f\u641c\u7d22"},(0,r.kt)("a",{parentName:"h3",href:"https://artem.krylysov.com/blog/2020/07/28/lets-build-a-full-text-search-engine/#searching-with-regular-expressions"},"\u4f7f\u7528\u6b63\u5219\u8868\u8fbe\u5f0f"),"\u641c\u7d22"),(0,r.kt)("p",null,"\u6211\u5f88\u5feb\u60f3\u5230\u7684\u4e00\u4e2a\u53ef\u4ee5\u5b9e\u73b0\u8fd9\u4e24\u4e2a\u8981\u6c42\u7684\u89e3\u51b3\u65b9\u6848\u5c31\u662f",(0,r.kt)("em",{parentName:"p"},"\u6b63\u5219\u8868\u8fbe\u5f0f"),"\u3002"),(0,r.kt)("p",null,"\u8fd9\u91cc\u662f - (?i)\\bcat\\b\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\uff08\uff1fi\uff09\u4f7f\u6b63\u5219\u8868\u8fbe\u5f0f\u4e0d\u533a\u5206\u5927\u5c0f\u5199"),(0,r.kt)("li",{parentName:"ul"},"\\b\u5339\u914d\u5355\u8bcd\u8fb9\u754c\uff08\u4e00\u4fa7\u662f\u5355\u8bcd\u5b57\u7b26\u800c\u53e6\u4e00\u4fa7\u4e0d\u662f\u5355\u8bcd\u5b57\u7b26\u7684\u4f4d\u7f6e\uff09\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},"func search(docs []document, term string) []document {\n    re := regexp.MustCompile(`(?i)\\b` + term + `\\b`) // Don't do this in production, it's a security risk. term needs to be sanitized.\n    var r []document\n    for _, doc := range docs {\n    if re.MatchString(doc.Text) {\n    r = append(r, doc)\n    }\n    }\n    return r\n    }\n")),(0,r.kt)("p",null,"\u641c\u7d22\u82b1\u4e86 2 \u79d2\u591a\u7684\u65f6\u95f4\u3002\u5982\u60a8\u6240\u89c1\uff0c\u5373\u4f7f\u6709 600K \u4efd\u6587\u6863\uff0c\u901f\u5ea6\u4e5f\u5f00\u59cb\u53d8\u6162\u3002\u867d\u7136\u8fd9\u79cd\u65b9\u6cd5\u5f88\u5bb9\u6613\u5b9e\u73b0\uff0c\u4f46\u6269\u5c55\u6027\u4e0d\u597d\u3002\u968f\u7740\u6570\u636e\u96c6\u8d8a\u6765\u8d8a\u5927\uff0c\u6211\u4eec\u9700\u8981\u626b\u63cf\u8d8a\u6765\u8d8a\u591a\u7684\u6587\u6863\u3002\u8be5\u7b97\u6cd5\u7684\u65f6\u95f4\u590d\u6742\u5ea6\u662f\u7ebf\u6027\u7684 - \u9700\u8981\u626b\u63cf\u7684\u6587\u6863\u6570\u91cf\u7b49\u4e8e\u6587\u6863\u603b\u6570\u3002\u5982\u679c\u6211\u4eec\u6709 6M \u4efd\u6587\u6863\u800c\u4e0d\u662f 600K \u4efd\uff0c\u641c\u7d22\u5c06\u82b1\u8d39 20 \u79d2\u3002\u6211\u4eec\u9700\u8981\u505a\u5f97\u66f4\u597d\u3002"),(0,r.kt)("h3",{id:"\u5012\u6392\u7d22\u5f15"},"\u5012\u6392\u7d22\u5f15",(0,r.kt)("a",{parentName:"h3",href:"https://artem.krylysov.com/blog/2020/07/28/lets-build-a-full-text-search-engine/#inverted-index"},"#")),(0,r.kt)("p",null,"\u4e3a\u4e86\u52a0\u5feb\u641c\u7d22\u67e5\u8be2\u901f\u5ea6\uff0c\u6211\u4eec\u5c06\u5bf9\u6587\u672c\u8fdb\u884c\u9884\u5904\u7406\u5e76\u63d0\u524d\u5efa\u7acb\u7d22\u5f15\u3002"),(0,r.kt)("p",null,"FTS \u7684\u6838\u5fc3\u662f\u4e00\u79cd\u53eb\u505a",(0,r.kt)("em",{parentName:"p"},"\u5012\u6392\u7d22\u5f15"),"\u7684\u6570\u636e\u7ed3\u6784\u3002\u5012\u6392\u7d22\u5f15\u5c06\u6587\u6863\u4e2d\u7684\u6bcf\u4e2a\u5355\u8bcd\u4e0e\u5305\u542b\u8be5\u5355\u8bcd\u7684\u6587\u6863\u5173\u8054\u8d77\u6765\u3002"),(0,r.kt)("p",null,"\u4f8b\u5b50\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'documents = {\n    1: "a donut on a glass plate",\n    2: "only the donut",\n    3: "listen to the drum machine",\n}\nindex = {\n    "a": [1],\n    "donut": [1, 2],\n    "on": [1],\n    "glass": [1],\n    "plate": [1],\n    "only": [2],\n    "the": [2, 3],\n    "listen": [3],\n    "to": [3],\n    "drum": [3],\n    "machine": [3],\n}\n')),(0,r.kt)("p",null,"\u4ee5\u4e0b\u662f\u5012\u6392\u7d22\u5f15\u7684\u771f\u5b9e\u793a\u4f8b\u3002\u4e66\u4e2d\u7684\u7d22\u5f15\u4e2d\uff0c\u672f\u8bed\u5f15\u7528\u9875\u7801\uff1a"),(0,r.kt)("p",null,(0,r.kt)("img",{parentName:"p",src:"https://artem.krylysov.com/images/2020-fts/book-index.png",alt:null})),(0,r.kt)("h3",{id:"\u6587\u672c\u5206\u6790"},"\u6587\u672c",(0,r.kt)("a",{parentName:"h3",href:"https://artem.krylysov.com/blog/2020/07/28/lets-build-a-full-text-search-engine/#text-analysis"},"\u5206\u6790")),(0,r.kt)("p",null,"\u5728\u5f00\u59cb\u6784\u5efa\u7d22\u5f15\u4e4b\u524d\uff0c\u6211\u4eec\u9700\u8981\u5c06\u539f\u59cb\u6587\u672c\u5206\u89e3\u4e3a\u9002\u5408\u7d22\u5f15\u548c\u641c\u7d22\u7684\u5355\u8bcd\u5217\u8868\uff08\u6807\u8bb0\uff09\u3002"),(0,r.kt)("p",null,"\u6587\u672c\u5206\u6790\u5668\u7531\u4e00\u4e2a\u6807\u8bb0\u5668\u548c\u591a\u4e2a\u8fc7\u6ee4\u5668\u7ec4\u6210\u3002"),(0,r.kt)("p",null,(0,r.kt)("img",{parentName:"p",src:"https://artem.krylysov.com/images/2020-fts/text-analysis.png",alt:null})),(0,r.kt)("h3",{id:"\u6807\u8bb0\u5668"},"\u6807\u8bb0",(0,r.kt)("a",{parentName:"h3",href:"https://artem.krylysov.com/blog/2020/07/28/lets-build-a-full-text-search-engine/#tokenizer"},"\u5668")),(0,r.kt)("p",null,"\u6807\u8bb0\u5668\u662f\u6587\u672c\u5206\u6790\u7684\u7b2c\u4e00\u6b65\u3002\u5b83\u7684\u4f5c\u7528\u662f\u5c06\u6587\u672c\u8f6c\u6362\u4e3a\u6807\u8bb0\u5217\u8868\u3002\u6211\u4eec\u7684\u5b9e\u73b0\u5728\u5355\u8bcd\u8fb9\u754c\u4e0a\u62c6\u5206\u6587\u672c\u5e76\u5220\u9664\u6807\u70b9\u7b26\u53f7\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'func tokenize(text string) []string {\n    return strings.FieldsFunc(text, func(r rune) bool {\n        // Split on any character that is not a letter or a number.\n        return !unicode.IsLetter(r) && !unicode.IsNumber(r)\n    })\n}\n\n> tokenize("A donut on a glass plate. Only the donuts.")\n["A", "donut", "on", "a", "glass", "plate", "Only", "the", "donuts"]\n')),(0,r.kt)("h3",{id:"\u8fc7\u6ee4\u5668"},"\u8fc7\u6ee4\u5668",(0,r.kt)("a",{parentName:"h3",href:"https://artem.krylysov.com/blog/2020/07/28/lets-build-a-full-text-search-engine/#filters"},"#")),(0,r.kt)("p",null,"\u5728\u5927\u591a\u6570\u60c5\u51b5\u4e0b\uff0c\u4ec5\u5c06\u6587\u672c\u8f6c\u6362\u4e3a\u6807\u8bb0\u5217\u8868\u662f\u4e0d\u591f\u7684\u3002\u4e3a\u4e86\u4f7f\u6587\u672c\u66f4\u6613\u4e8e\u7d22\u5f15\u548c\u641c\u7d22\uff0c\u6211\u4eec\u9700\u8981\u8fdb\u884c\u989d\u5916\u7684\u89c4\u8303\u5316\u3002"),(0,r.kt)("h3",{id:"\u5c0f\u5199"},"\u5c0f\u5199",(0,r.kt)("a",{parentName:"h3",href:"https://artem.krylysov.com/blog/2020/07/28/lets-build-a-full-text-search-engine/#lowercase"},"#")),(0,r.kt)("p",null,"\u4e3a\u4e86\u4f7f\u641c\u7d22\u4e0d\u533a\u5206\u5927\u5c0f\u5199\uff0c\u5c0f\u5199\u8fc7\u6ee4\u5668\u5c06\u6807\u8bb0\u8f6c\u6362\u4e3a\u5c0f\u5199\u3002",(0,r.kt)("em",{parentName:"p"},"cAt"),"\u3001",(0,r.kt)("em",{parentName:"p"},"Cat",(0,r.kt)("em",{parentName:"em"},"\u548c_caT"),"\u88ab\u89c4\u8303\u5316\u4e3a_cat"),"\u3002\u7a0d\u540e\uff0c\u5f53\u6211\u4eec\u67e5\u8be2\u7d22\u5f15\u65f6\uff0c\u6211\u4eec\u4e5f\u4f1a\u5c06\u641c\u7d22\u8bcd\u8f6c\u6362\u4e3a\u5c0f\u5199\u3002\u8fd9\u5c06\u4f7f\u641c\u7d22\u8bcd",(0,r.kt)("em",{parentName:"p"},"cAt"),"\u4e0e\u6587\u672c",(0,r.kt)("em",{parentName:"p"},"Cat"),"\u5339\u914d\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'func lowercaseFilter(tokens []string) []string {\n    r := make([]string, len(tokens))\n    for i, token := range tokens {\n        r[i] = strings.ToLower(token)\n    }\n    return r\n}\n\n> lowercaseFilter([]string{"A", "donut", "on", "a", "glass", "plate", "Only", "the", "donuts"})\n["a", "donut", "on", "a", "glass", "plate", "only", "the", "donuts"]\n')),(0,r.kt)("h3",{id:"\u5220\u9664\u5e38\u7528\u8bcd"},"\u5220\u9664\u5e38\u7528",(0,r.kt)("a",{parentName:"h3",href:"https://artem.krylysov.com/blog/2020/07/28/lets-build-a-full-text-search-engine/#dropping-common-words"},"\u8bcd")),(0,r.kt)("p",null,"\u51e0\u4e4e\u6240\u6709\u7684\u82f1\u6587\u6587\u672c\u90fd\u5305\u542b\u5e38\u7528\u7684\u5355\u8bcd\uff0c\u4f8b\u5982",(0,r.kt)("em",{parentName:"p"},"a"),"\u3001",(0,r.kt)("em",{parentName:"p"},"I"),"\u3001",(0,r.kt)("em",{parentName:"p"},"the_\u6216_be"),"\u3002\u8fd9\u4e9b\u8bcd\u88ab\u79f0\u4e3a",(0,r.kt)("em",{parentName:"p"},"\u505c\u7528\u8bcd"),"\u3002\u6211\u4eec\u5c06\u5220\u9664\u5b83\u4eec\uff0c\u56e0\u4e3a\u51e0\u4e4e\u6240\u6709\u6587\u6863\u90fd\u4f1a\u5339\u914d\u505c\u7528\u8bcd\u3002"),(0,r.kt)("p",null,"\u6ca1\u6709\u201c\u5b98\u65b9\u201d\u7684\u505c\u7528\u8bcd\u5217\u8868\u3002\u8ba9\u6211\u4eec\u6839\u636e",(0,r.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Most_common_words_in_English"},"OEC \u6392\u540d"),"\u6392\u9664\u524d 10 \u4e2a\u3002\u8bf7\u968f\u610f\u6dfb\u52a0\u66f4\u591a\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'var stopwords = map[string]struct{}{ // I wish Go had built-in sets.\n    "a": {}, "and": {}, "be": {}, "have": {}, "i": {},\n    "in": {}, "of": {}, "that": {}, "the": {}, "to": {},\n}\nfunc stopwordFilter(tokens []string) []string {\n    r := make([]string, 0, len(tokens))\n    for _, token := range tokens {\n        if _, ok := stopwords[token]; !ok {\n            r = append(r, token)\n        }\n    }\n    return r\n}\n\n> stopwordFilter([]string{"a", "donut", "on", "a", "glass", "plate", "only", "the", "donuts"})\n["donut", "on", "glass", "plate", "only", "donuts"]\n')),(0,r.kt)("h3",{id:"stemming-"},"Stemming ",(0,r.kt)("a",{parentName:"h3",href:"https://artem.krylysov.com/blog/2020/07/28/lets-build-a-full-text-search-engine/#stemming"},"#")),(0,r.kt)("p",null,"Because of the grammar rules, documents may include different forms of the same word. Stemming reduces words into their base form. For example, ",(0,r.kt)("em",{parentName:"p"},"fishing"),", ",(0,r.kt)("em",{parentName:"p"},"fished")," and ",(0,r.kt)("em",{parentName:"p"},"fisher")," may be reduced to the base form (stem) ",(0,r.kt)("em",{parentName:"p"},"fish"),"."),(0,r.kt)("p",null,"Implementing a stemmer is a non-trivial task, it's not covered in this post. We'll take one of the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/kljensen/snowball"},"existing")," modules:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'import snowballeng "github.com/kljensen/snowball/english"\nfunc stemmerFilter(tokens []string) []string {\n    r := make([]string, len(tokens))\n    for i, token := range tokens {\n        r[i] = snowballeng.Stem(token, false)\n    }\n    return r\n}\n\n> stemmerFilter([]string{"donut", "on", "glass", "plate", "only", "donuts"})\n["donut", "on", "glass", "plate", "only", "donut"]\n')),(0,r.kt)("p",null,"Note"),(0,r.kt)("p",null,"A stem is not always a valid word. For example, some stemmers may reduce ",(0,r.kt)("em",{parentName:"p"},"airline")," to ",(0,r.kt)("em",{parentName:"p"},"airlin"),"."),(0,r.kt)("h3",{id:"putting-the-analyzer-together-"},"Putting the analyzer together ",(0,r.kt)("a",{parentName:"h3",href:"https://artem.krylysov.com/blog/2020/07/28/lets-build-a-full-text-search-engine/#putting-the-analyzer-together"},"#")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},"func analyze(text string) []string {\n    tokens := tokenize(text)\n    tokens = lowercaseFilter(tokens)\n    tokens = stopwordFilter(tokens)\n    tokens = stemmerFilter(tokens)\n    return tokens\n}\n")),(0,r.kt)("p",null,"The tokenizer and filters convert sentences into a list of tokens:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'> analyze("A donut on a glass plate. Only the donuts.")\n["donut", "on", "glass", "plate", "only", "donut"]\n')),(0,r.kt)("p",null,"The tokens are ready for indexing."),(0,r.kt)("h3",{id:"building-the-index-"},"Building the index ",(0,r.kt)("a",{parentName:"h3",href:"https://artem.krylysov.com/blog/2020/07/28/lets-build-a-full-text-search-engine/#building-the-index"},"#")),(0,r.kt)("p",null,"Back to the inverted index. It maps every word in documents to document IDs. The built-in map is a good candidate for storing the mapping. The key in the map is a token (string) and the value is a list of document IDs:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},"type index map[string][]int\n")),(0,r.kt)("p",null,"Building the index consists of analyzing the documents and adding their IDs to the map:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'func (idx index) add(docs []document) {\n    for _, doc := range docs {\n        for _, token := range analyze(doc.Text) {\n            ids := idx[token]\n            if ids != nil && ids[len(ids)-1] == doc.ID {\n                // Don\'t add same ID twice.\n                continue\n            }\n            idx[token] = append(ids, doc.ID)\n        }\n    }\n}\nfunc main() {\n    idx := make(index)\n    idx.add([]document{{ID: 1, Text: "A donut on a glass plate. Only the donuts."}})\n    idx.add([]document{{ID: 2, Text: "donut is a donut"}})\n    fmt.Println(idx)\n}\n')),(0,r.kt)("p",null,"It works! Each token in the map refers to IDs of the documents that contain the token:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"map[donut:[1 2] glass:[1] is:[2] on:[1] only:[1] plate:[1]]\n")),(0,r.kt)("h3",{id:"querying-"},"Querying ",(0,r.kt)("a",{parentName:"h3",href:"https://artem.krylysov.com/blog/2020/07/28/lets-build-a-full-text-search-engine/#querying"},"#")),(0,r.kt)("p",null,"To query the index, we are going to apply the same tokenizer and filters we used for indexing:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'func (idx index) search(text string) [][]int {\n    var r [][]int\n    for _, token := range analyze(text) {\n        if ids, ok := idx[token]; ok {\n            r = append(r, ids)\n        }\n    }\n    return r\n}\n\n> idx.search("Small wild cat")\n[[24, 173, 303, ...], [98, 173, 765, ...], [[24, 51, 173, ...]]\n')),(0,r.kt)("p",null,"And finally, we can find all documents that mention cats. Searching 600K documents took less than a millisecond (18\xb5s)!"),(0,r.kt)("p",null,"With the inverted index, the time complexity of the search query is linear to the number of search tokens. In the example query above, other than analyzing the input text, search had to perform only three map lookups."),(0,r.kt)("h3",{id:"boolean-queries-"},"Boolean queries ",(0,r.kt)("a",{parentName:"h3",href:"https://artem.krylysov.com/blog/2020/07/28/lets-build-a-full-text-search-engine/#boolean-queries"},"#")),(0,r.kt)("p",null,"The query from the previous section returned a disjoined list of documents for each token. What we normally expect to find when we type ",(0,r.kt)("em",{parentName:"p"},"small wild cat")," in a search box is a list of results that contain ",(0,r.kt)("em",{parentName:"p"},"small"),", ",(0,r.kt)("em",{parentName:"p"},"wild")," and ",(0,r.kt)("em",{parentName:"p"},"cat")," at the same time. The next step is to compute the set intersection between the lists. This way we'll get a list of documents matching all tokens."),(0,r.kt)("p",null,"!",(0,r.kt)("a",{parentName:"p",href:"https://artem.krylysov.com/images/2020-fts/venn.png"},"https://artem.krylysov.com/images/2020-fts/venn.png")),(0,r.kt)("p",null,"Luckily, IDs in our inverted index are inserted in ascending order. Since the IDs are sorted, it's possible to compute the intersection between two lists in linear time. The intersection function iterates two lists simultaneously and collects IDs that exist in both:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"func intersection(a []int, b []int) []int {\n    maxLen := len(a)\n    if len(b) > maxLen {\n        maxLen = len(b)\n    }\n    r := make([]int, 0, maxLen)\n    var i, j int\n    for i < len(a) && j < len(b) {\n        if a[i] < b[j] {\n            i++\n        } else if a[i] > b[j] {\n            j++\n        } else {\n            r = append(r, a[i])\n            i++\n            j++\n        }\n    }\n    return r\n}\n")),(0,r.kt)("p",null,"Updated search analyzes the given query text, lookups tokens and computes the set intersection between lists of IDs:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"func (idx index) search(text string) []int {\n    var r []int\n    for _, token := range analyze(text) {\n        if ids, ok := idx[token]; ok {\n            if r == nil {\n                r = ids\n            } else {\n                r = intersection(r, ids)\n            }\n        } else {\n            // Token doesn't exist.\n            return nil\n        }\n    }\n    return r\n}\n")),(0,r.kt)("p",null,"The Wikipedia dump contains only two documents that match ",(0,r.kt)("em",{parentName:"p"},"small"),", ",(0,r.kt)("em",{parentName:"p"},"wild")," and ",(0,r.kt)("em",{parentName:"p"},"cat")," at the same time:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'> idx.search("Small wild cat")\n130764  The wildcat is a species complex comprising two small wild cat species, the European wildcat (Felis silvestris) and the African wildcat (F. lybica).\n131692  Catopuma is a genus containing two Asian small wild cat species, the Asian golden cat (C. temminckii) and the bay cat.\n')),(0,r.kt)("p",null,"The search is working as expected!"),(0,r.kt)("p",null,"\u987a\u4fbf\u8bf4\u4e00\u53e5\uff0c\u8fd9\u662f\u6211\u7b2c\u4e00\u6b21\u542c\u8bf4",(0,r.kt)("em",{parentName:"p"},"catopuma"),"\uff0c\u5176\u4e2d\u4e4b\u4e00\u5982\u4e0b\uff1a"),(0,r.kt)("p",null,"!",(0,r.kt)("a",{parentName:"p",href:"https://artem.krylysov.com/images/2020-fts/asian-golden-cat-s.jpg"},"https://artem.krylysov.com/images/2020-fts/asian-golden-cat-s.jpg")),(0,r.kt)("h3",{id:"\u7ed3\u8bba"},"\u7ed3\u8bba",(0,r.kt)("a",{parentName:"h3",href:"https://artem.krylysov.com/blog/2020/07/28/lets-build-a-full-text-search-engine/#conclusions"})),(0,r.kt)("p",null,"\u6211\u4eec\u521a\u521a\u6784\u5efa\u4e86\u4e00\u4e2a\u5168\u6587\u641c\u7d22\u5f15\u64ce\u3002\u5c3d\u7ba1\u5b83\u5f88\u7b80\u5355\uff0c\u4f46\u5b83\u53ef\u4ee5\u4e3a\u66f4\u9ad8\u7ea7\u7684\u9879\u76ee\u5960\u5b9a\u575a\u5b9e\u7684\u57fa\u7840\u3002"),(0,r.kt)("p",null,"\u6211\u6ca1\u6709\u6d89\u53ca\u5f88\u591a\u53ef\u4ee5\u663e\u8457\u63d0\u9ad8\u6027\u80fd\u5e76\u4f7f\u5f15\u64ce\u66f4\u52a0\u7528\u6237\u53cb\u597d\u7684\u4e8b\u60c5\u3002\u4ee5\u4e0b\u662f\u4e00\u4e9b\u8fdb\u4e00\u6b65\u6539\u8fdb\u7684\u60f3\u6cd5\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u6269\u5c55\u5e03\u5c14\u67e5\u8be2\u4ee5\u652f\u6301",(0,r.kt)("em",{parentName:"li"},"OR"),"\u548c",(0,r.kt)("em",{parentName:"li"},"NOT"),"\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u5c06\u7d22\u5f15\u5b58\u50a8\u5728\u78c1\u76d8\u4e0a\uff1a",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"\u6bcf\u6b21\u91cd\u65b0\u542f\u52a8\u5e94\u7528\u7a0b\u5e8f\u65f6\u91cd\u5efa\u7d22\u5f15\u53ef\u80fd\u9700\u8981\u4e00\u6bb5\u65f6\u95f4\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u5927\u578b\u7d22\u5f15\u53ef\u80fd\u4e0d\u9002\u5408\u5185\u5b58\u3002"))),(0,r.kt)("li",{parentName:"ul"},"\u5c1d\u8bd5\u4f7f\u7528\u5185\u5b58\u548c CPU \u9ad8\u6548\u7684\u6570\u636e\u683c\u5f0f\u6765\u5b58\u50a8\u6587\u6863 ID \u96c6\u3002\u67e5\u770b",(0,r.kt)("a",{parentName:"li",href:"https://roaringbitmap.org/"},"Roaring Bitmaps"),"\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u652f\u6301\u7d22\u5f15\u591a\u4e2a\u6587\u6863\u5b57\u6bb5\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u6309\u76f8\u5173\u6027\u5bf9\u7ed3\u679c\u8fdb\u884c\u6392\u5e8f\u3002")),(0,r.kt)("p",null,"\u5b8c\u6574\u7684\u6e90\u4ee3\u7801\u53ef\u4ee5\u5728",(0,r.kt)("a",{parentName:"p",href:"https://github.com/akrylysov/simplefts"},"GitHub"),"\u4e0a\u627e\u5230\u3002"))}c.isMDXComponent=!0}}]);