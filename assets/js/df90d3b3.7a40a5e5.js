"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6045],{8015:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var r=n(757);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(n),f=a,m=p["".concat(l,".").concat(f)]||p[f]||d[f]||i;return n?r.createElement(m,o(o({ref:t},u),{},{components:n})):r.createElement(m,o({ref:t},u))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=f;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[p]="string"==typeof e?e:a,o[1]=s;for(var c=2;c<i;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},9974:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var r=n(1227),a=(n(757),n(8015));const i={},o=void 0,s={unversionedId:"notes/\u5176\u4ed6/Recursive Queries with MySQL",id:"notes/\u5176\u4ed6/Recursive Queries with MySQL",title:"Recursive Queries with MySQL",description:"Discovered something neat with the new version of MySQL and thought it warranted a mention. Storing tree structures in a relational database is a common use case across many different areas of tech. The problem comes when you need to construct a query based on a subset of that tree.",source:"@site/docs/notes/\u5176\u4ed6/Recursive Queries with MySQL.md",sourceDirName:"notes/\u5176\u4ed6",slug:"/notes/\u5176\u4ed6/Recursive Queries with MySQL",permalink:"/blogs/docs/notes/\u5176\u4ed6/Recursive Queries with MySQL",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/\u5176\u4ed6/Recursive Queries with MySQL.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"QPS \u7b49\u6982\u5ff5\u548c\u6307\u6807",permalink:"/blogs/docs/notes/\u5176\u4ed6/QPS \u7b49\u6982\u5ff5\u548c\u6307\u6807"},next:{title:"URL Encode Decode",permalink:"/blogs/docs/notes/\u5176\u4ed6/URL Encode Decode"}},l={},c=[],u={toc:c},p="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(p,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Discovered something neat with the new version of MySQL and thought it warranted a mention. Storing tree structures in a relational database is a common use case across many different areas of tech. The problem comes when you need to construct a query based on a subset of that tree."),(0,a.kt)("p",null,"But MySQL 8 has some nice new features that makes doing this a breeze."),(0,a.kt)("p",null,"For example, let\u2019s assume you have a set of tables that look like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"CREATE TABLE `files` (\n  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,\n  `name` varchar(255) NOT NULL,\n  `parent_id` bigint(20) NOT NULL,\n  `kind` enum('file','folder') NOT NULL,\n  PRIMARY KEY (`id`),\n  KEY `parent_id` (`parent_id`)\n);\n\nCREATE TABLE `tags` (\n  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,\n  `name` varchar(255) NOT NULL,\n  PRIMARY KEY (`id`)\n);\n\nCREATE TABLE `tag_file` (\n  `tag_id` bigint(20) NOT NULL,\n  `file_id` bigint(20) NOT NULL,\n  PRIMARY KEY (`tag_id`,`file_id`)\n);\n")),(0,a.kt)("p",null,"This is a pretty standard setup for storing a tree setup in a relational table, with the\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"parent_id"),"\xa0key referencing\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"id"),"\xa0of the parent. And this all works well \u2026 right up until you need to query a parent and all of it\u2019s children. So let\u2019s say you want to find all children that have a tag of \u2018Important\u2019."),(0,a.kt)("p",null,"MySQL 8 includes support for\xa0",(0,a.kt)("a",{parentName:"p",href:"https://dev.mysql.com/doc/refman/8.0/en/with.html"},"recursive common table expressions"),". Using this, this becomes a pretty easy query. You can create a CTE query and recursively call it! You could so something like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"with recursive cte (id, parent_id) as (\n    select id, parent_id from files where parent_id = ? and kind = 'folder'\n    union all\n    select p.id, p.parent_id from files p inner join cte on p.parent_id = cte.id where kind = 'folder'\n)\nselect * from cte;\n\nselect * from files inner join tag_file on (tag_file.file_id = file.id)\ninner join tags on (tags.id = tag_file.tag_id) where kind = 'file'\nand tag = 'Important' and parent_id in (select id from cte);\n\n")),(0,a.kt)("p",null,"(That is a prepared statement, replace the\xa0",(0,a.kt)("inlineCode",{parentName:"p"},"?"),"\xa0with the ID of the parent.)"),(0,a.kt)("p",null,"What surprised me was how\xa0",(0,a.kt)("em",{parentName:"p"},"fast"),"\xa0that query is with the right keys. On a table that has nearly 600,000 items in it, that query completes in about 0.3 seconds. Slow, but considering the number of rows in the table quite fast."),(0,a.kt)("p",null,"Thanks to\xa0",(0,a.kt)("a",{parentName:"p",href:"https://stackoverflow.com/a/33737203/9348119"},"this post"),"\xa0on Stack Overflow for the heads up."))}d.isMDXComponent=!0}}]);