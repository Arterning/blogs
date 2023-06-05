"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1274],{3905:(e,n,t)=>{t.d(n,{Zo:()=>i,kt:()=>b});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=r.createContext({}),p=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},i=function(e){var n=p(e.components);return r.createElement(c.Provider,{value:n},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,l=e.originalType,c=e.parentName,i=s(e,["components","mdxType","originalType","parentName"]),u=p(t),m=a,b=u["".concat(c,".").concat(m)]||u[m]||d[m]||l;return t?r.createElement(b,o(o({ref:n},i),{},{components:t})):r.createElement(b,o({ref:n},i))}));function b(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var l=t.length,o=new Array(l);o[0]=m;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s[u]="string"==typeof e?e:a,o[1]=s;for(var p=2;p<l;p++)o[p]=t[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},3717:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>l,metadata:()=>s,toc:()=>p});var r=t(7462),a=(t(7294),t(3905));const l={},o="webpack basic",s={unversionedId:"notes/react/webpack/webpack-base",id:"notes/react/webpack/webpack-base",title:"webpack basic",description:"\u524d\u8a00",source:"@site/docs/notes/react/webpack/01-webpack-base.md",sourceDirName:"notes/react/webpack",slug:"/notes/react/webpack/webpack-base",permalink:"/blogs/docs/notes/react/webpack/webpack-base",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/react/webpack/01-webpack-base.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{},sidebar:"notes",previous:{title:"react render props",permalink:"/blogs/docs/notes/react/render-props"},next:{title:"Layout \u7684\u6982\u5ff5",permalink:"/blogs/docs/notes/vue/Vue Layout\u4f5c\u7528"}},c={},p=[{value:"\u524d\u8a00",id:"\u524d\u8a00",level:2}],i={toc:p},u="wrapper";function d(e){let{components:n,...t}=e;return(0,a.kt)(u,(0,r.Z)({},i,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"webpack-basic"},"webpack basic"),(0,a.kt)("h2",{id:"\u524d\u8a00"},"\u524d\u8a00"),(0,a.kt)("p",null,"\u5728webpack\u4e2d\uff0c\u4efb\u4f55\u6587\u4ef6\u90fd\u53ef\u4ee5\u901a\u8fc7import\u5bfc\u5165\uff0c\u524d\u63d0\u662f\u8bbe\u7f6e\u4e86\u5bf9\u5e94\u7684Loader\n\u4f8b\u5982\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},'import { getBlogPosts } from "./data";\nimport "./style.css";\nimport HeroImage from "./assets/images/hero.jpeg";\nimport "./test/date/printDate";\n\n')),(0,a.kt)("p",null,"\u5728\u6253\u5305\u8fc7\u7a0b\u4e2d\uff0c\u53ef\u4ee5\u901a\u8fc7\u63d2\u4ef6\u5e72\u9884\u6253\u5305\u8fc7\u7a0b"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},'  plugins: [\n    new HtmlWebpackPlugin({\n      title: "\u535a\u5ba2\u5217\u8868",\n    }),\n    new BundleAnalyzerPlugin(),\n  ]\n')),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u5b89\u88c5\u4f9d\u8d56")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add webpack webpack-cli --dev\n\n# or\nyarn install\n")),(0,a.kt)("p",null,"\u56e0\u4e3a\u53ea\u9700\u8981\u5728\u5f00\u53d1\u7684\u65f6\u5019\u7528\u5230webpack\uff0c\u6240\u4ee5\u5b89\u88c5\u5230Devdependencies\u5373\u53ef"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u5b89\u88c5loader")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add css-loader style-loader\n")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u6267\u884c\u6253\u5305")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npx webpack\n")),(0,a.kt)("h1",{id:"\u793a\u4f8b\u914d\u7f6e\u6587\u4ef6"},"\u793a\u4f8b\u914d\u7f6e\u6587\u4ef6"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},'const path = require("path");\nconst HtmlWebpackPlugin = require("html-webpack-plugin");\nconst TerserPlugin = require("terser-webpack-plugin");\nconst BundleAnalyzerPlugin =\n  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;\n\nmodule.exports = {\n  mode: "development",\n  devtool: "inline-source-map",\n  entry: "./src/index.js", //entry file name\n  output: {\n    filename: "[name].[content-hash].js", //output file name\n    path: path.resolve(__dirname, "dist"), //output file directory\n  },\n  resolve: {\n    alias: {\n      utils: path.resolve(__dirname, "src/utils"),//\u6307\u5b9a\u8def\u5f84\u522b\u540d\n    },\n  },\n  optimization: {\n    minimize: true,\n    minimizer: [new TerserPlugin()],\n  },\n  devServer: {\n    static: "./dist",\n  },\n  plugins: [\n    //HtmlWebpackPlugin will auto generate index html file\n    new HtmlWebpackPlugin({\n      title: "\u535a\u5ba2\u5217\u8868",\n    }),\n    new BundleAnalyzerPlugin(),\n  ],\n  module: {\n    rules: [\n      {\n        test: /\\.css$/i,\n        use: ["style-loader", "css-loader"], //use css-loader to support import css file\n      },\n      {\n        test: /\\.(png|svg|jpg|jpeg|gif)$/i, //webpack native support import picture file, so don\'t need to config loader\n        type: "asset/resource",\n      },\n      {\n        test: /\\.js$/,\n        exclude: /node_modules/,\n        use: {\n          loader: "babel-loader",//use babel-loader to convert js file\n          options: {\n            presets: ["@babel/preset-env"],\n          },\n        },\n      },\n    ],\n  },\n};\n\n')))}d.isMDXComponent=!0}}]);