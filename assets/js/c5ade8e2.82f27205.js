"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7389],{8015:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>v});var r=t(757);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=r.createContext({}),l=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},u=function(e){var n=l(e.components);return r.createElement(s.Provider,{value:n},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),c=l(t),m=a,v=c["".concat(s,".").concat(m)]||c[m]||d[m]||o;return t?r.createElement(v,i(i({ref:n},u),{},{components:t})):r.createElement(v,i({ref:n},u))}));function v(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=m;var p={};for(var s in n)hasOwnProperty.call(n,s)&&(p[s]=n[s]);p.originalType=e,p[c]="string"==typeof e?e:a,i[1]=p;for(var l=2;l<o;l++)i[l]=t[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},3497:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>p,toc:()=>l});var r=t(1227),a=(t(757),t(8015));const o={},i=void 0,p={unversionedId:"notes/\u6280\u672f\u6808/springboot/spring boot \u914d\u7f6e\u6587\u4ef6",id:"notes/\u6280\u672f\u6808/springboot/spring boot \u914d\u7f6e\u6587\u4ef6",title:"spring boot \u914d\u7f6e\u6587\u4ef6",description:"SpringBoot \u5982\u4f55\u8bfb\u53d6\u914d\u7f6e\u6587\u4ef6",source:"@site/docs/notes/\u6280\u672f\u6808/springboot/spring boot \u914d\u7f6e\u6587\u4ef6.md",sourceDirName:"notes/\u6280\u672f\u6808/springboot",slug:"/notes/\u6280\u672f\u6808/springboot/spring boot \u914d\u7f6e\u6587\u4ef6",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/springboot/spring boot \u914d\u7f6e\u6587\u4ef6",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/\u6280\u672f\u6808/springboot/spring boot \u914d\u7f6e\u6587\u4ef6.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"spring boot \u57fa\u672c\u4f7f\u7528",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/springboot/spring boot \u57fa\u672c\u4f7f\u7528"},next:{title:"Junit",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/springboot/spring test"}},s={},l=[{value:"\u4f7f\u7528@Value",id:"\u4f7f\u7528value",level:2},{value:"\u4f7f\u7528Environment",id:"\u4f7f\u7528environment",level:2},{value:"\u4f7f\u7528@ConfigurationProperties",id:"\u4f7f\u7528configurationproperties",level:2},{value:"\u7b2c\u4e00\u6b65\uff1a\u5148\u8bc6\u522b\u4e00\u4e9b\u81ea\u5df1\u7684\u914d\u7f6e\u6587\u4ef6\u4e2d\u662f\u5426\u662f\u4e00\u7ec4\u76f8\u5173\u7684\u5c5e\u6027\u914d\u7f6e\u3002",id:"\u7b2c\u4e00\u6b65\u5148\u8bc6\u522b\u4e00\u4e9b\u81ea\u5df1\u7684\u914d\u7f6e\u6587\u4ef6\u4e2d\u662f\u5426\u662f\u4e00\u7ec4\u76f8\u5173\u7684\u5c5e\u6027\u914d\u7f6e",level:3},{value:"\u7b2c\u4e8c\u6b65\uff1a\u6309\u7167\u914d\u7f6e\u6587\u4ef6\u7684\u7ed3\u6784\u548c\u547d\u540d\u6784\u5efaJava\u7c7b",id:"\u7b2c\u4e8c\u6b65\u6309\u7167\u914d\u7f6e\u6587\u4ef6\u7684\u7ed3\u6784\u548c\u547d\u540d\u6784\u5efajava\u7c7b",level:3},{value:"\u7b2c\u4e09\u6b65\uff1a\u4f7f\u7528@ConfigurationProperties(prefix=&quot;database&quot;)\u6ce8\u89e3\u6807\u8bb0",id:"\u7b2c\u4e09\u6b65\u4f7f\u7528configurationpropertiesprefixdatabase\u6ce8\u89e3\u6807\u8bb0",level:2},{value:"\u7b2c\u56db\u6b65\uff1a\u8ba9Spring\u611f\u77e5\u5230\u4f60\u8fd9\u4e2a\u7c7b\u7684\u5b58\u5728",id:"\u7b2c\u56db\u6b65\u8ba9spring\u611f\u77e5\u5230\u4f60\u8fd9\u4e2a\u7c7b\u7684\u5b58\u5728",level:2}],u={toc:l},c="wrapper";function d(e){let{components:n,...t}=e;return(0,a.kt)(c,(0,r.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"SpringBoot \u5982\u4f55\u8bfb\u53d6\u914d\u7f6e\u6587\u4ef6"),(0,a.kt)("h1",{id:"\u914d\u7f6e\u6587\u4ef6\u7c7b\u578b"},"\u914d\u7f6e\u6587\u4ef6\u7c7b\u578b"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Property\u6587\u4ef6")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"database.username=ss007\ndatabase.password=wb123\ndatabase.server.ip=192.168.1.1\ndatabase.server.port=8000\n\n")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Yml\u6587\u4ef6")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"database:\n  username: ss007\n  password: wb123\n  server:\n    ip: 192.168.1.1\n    port:8000\n\n")),(0,a.kt)("h1",{id:"\u8bfb\u53d6\u914d\u7f6e\u6587\u4ef6\u7684\u4e09\u79cd\u65b9\u5f0f"},"\u8bfb\u53d6\u914d\u7f6e\u6587\u4ef6\u7684\u4e09\u79cd\u65b9\u5f0f"),(0,a.kt)("p",null,"\u5f53\u65b0\u5efa\u4e00\u4e2aSpringBoot maven\u9879\u76ee\uff0c\u9ed8\u8ba4\u4f1a\u5728",(0,a.kt)("inlineCode",{parentName:"p"},"src/main/resources"),"\u8def\u5f84\u4e0b\u751f\u6210\u4e00\u4e2aapplication.properties\u914d\u7f6e\u6587\u4ef6\u3002 \u7cfb\u7edf\u9ed8\u8ba4\u5c31\u80fd\u627e\u5230\u8fd9\u4e2a\u6587\u4ef6\uff0c\u795e\u5947\u5427\uff1f\u5c31\u662f\u56e0\u4e3aspringboot\u4f7f\u7528\u4e86\u7ea6\u5b9a\u5927\u4e8e\u914d\u7f6e\u7684\u601d\u60f3\uff0c\u518d\u52a0\u4e0aSpring\u4ee5\u53caSpringBoot\u81ea\u5df1\u7684\u5404\u79cd\u6ce8\u89e3 \u4f7f\u9879\u76ee\u53d8\u6210\u4e86\u4e00\u4e2a\u9ed1\u76d2\u3002"),(0,a.kt)("h2",{id:"\u4f7f\u7528value"},"\u4f7f\u7528@Value"),(0,a.kt)("p",null,"\u5c06",(0,a.kt)("inlineCode",{parentName:"p"},'@Value("${\u914d\u7f6e\u6587\u4ef6\u4e2d\u67d0\u4e2a\u952e\u503c\u5bf9\u7684key}")'),"\u6ce8\u89e3\u6dfb\u52a0\u5230\u4f60\u8981\u63a5\u6536\u503c\u7684\u5b57\u6bb5\u4e0a\u5373\u53ef\uff0c\u5982\u4e0b\u6240\u793a\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'@Repository\npublic class UserModel {\n    @Value("${database.username}")\n    private String userName;\n\n    //\u4e0d\u9700\u8981setter\n}\n\n')),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"@Repository")," \u662f\u4e00\u79cd",(0,a.kt)("inlineCode",{parentName:"p"},"@Component"),"\uff0c\u5f53\u9700\u8981\u7684\u65f6\u5019Spring\u5c31\u53ef\u4ee5\u5e2e\u6211\u6ce8\u5165UserModel\u7684\u5b9e\u4f8b\u4e86"),(0,a.kt)("h2",{id:"\u4f7f\u7528environment"},"\u4f7f\u7528Environment"),(0,a.kt)("p",null,"\u7b2c\u4e8c\u79cd\u65b9\u6cd5\u662f\u4f7f\u7528",(0,a.kt)("inlineCode",{parentName:"p"},"Environment"),"\u5bf9\u8c61\uff0c\u8fd9\u4e2a\u5bf9\u8c61\u91cc\u9762\u6709\u5f88\u591a\u83b7\u53d6\u503c\u7684\u65b9\u6cd5\uff0c\u8fd9\u79cd\u65b9\u6cd5\u7528\u7684\u8f83\u5c11\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'@Repository\npublic class UserModel {\n\n       //\u4f7f\u7528setter\u7684\u65b9\u5f0f\u6ce8\u5165Enviroment\u5bf9\u8c61\n       private Environment environment;\n       @Autowired\n       public void setEnvironment(Environment environment) {\n           this.environment = environment;\n       }\n\n      //\u901a\u8fc7environment\u5bf9\u8c61\u83b7\u53d6\u503c\n      public String getUserNameByEnv(){\n          return environment.getProperty("database.username");\n      }\n}\n\n')),(0,a.kt)("h2",{id:"\u4f7f\u7528configurationproperties"},"\u4f7f\u7528@ConfigurationProperties"),(0,a.kt)("p",null,"\u91cd\u70b9\u662f\u8fd9\u79cd\u65b9\u6cd5\uff0c\u65e2\u7075\u6d3b\u53c8\u8ff7\u60d1\u3002\u5176\u601d\u60f3\u662f\u5c06\u914d\u7f6e\u6587\u4ef6\u4e2d",(0,a.kt)("strong",{parentName:"p"},"\u76f8\u5173"),"\u7684\u4e00\u7ec4\u914d\u7f6e\u6620\u5c04\u4e3a\u4e00\u4e2aPOJO(plain old java object),\u66f4\u51c6\u786e\u7684\u8bf4\u662f\u6620\u5c04\u4e3a\u4e00\u4e2aJavaBean\u3002 \u7136\u540e\u6211\u4eec\u5c31\u53ef\u4ee5\u901a\u8fc7\u8fd9\u4e2aJavaBean\u6765\u4f7f\u7528\u914d\u7f6e\u6587\u4ef6\u91cc\u7684\u503c\u4e86\u3002"),(0,a.kt)("p",null,"\u4e0d\u540c\u7248\u672c\u8fd9\u4e2a\u6ce8\u89e3\u7684\u4f7f\u7528\u65b9\u5f0f\u6709\u4e00\u4e9b\u4e0d\u540c\uff0c\u6211\u4f7f\u7528\u7684\u662fSpringBoot2.4.5\u3002"),(0,a.kt)("h3",{id:"\u7b2c\u4e00\u6b65\u5148\u8bc6\u522b\u4e00\u4e9b\u81ea\u5df1\u7684\u914d\u7f6e\u6587\u4ef6\u4e2d\u662f\u5426\u662f\u4e00\u7ec4\u76f8\u5173\u7684\u5c5e\u6027\u914d\u7f6e"},"\u7b2c\u4e00\u6b65\uff1a\u5148\u8bc6\u522b\u4e00\u4e9b\u81ea\u5df1\u7684\u914d\u7f6e\u6587\u4ef6\u4e2d\u662f\u5426\u662f\u4e00\u7ec4\u76f8\u5173\u7684\u5c5e\u6027\u914d\u7f6e\u3002"),(0,a.kt)("p",null,"\u4f8b\u5982\u6211\u4eec\u6b64\u5904\u662f\u4e00\u7ec4database\u76f8\u5173\u7684\u914d\u7f6e\uff0c\u5176\u4e0b\u9762\u8fd8\u6709\u4e00\u4e2a\u5b50\u7ec4server\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"database.username=ss007\ndatabase.password=wb123\ndatabase.server.ip=192.168.1.1\ndatabase.server.port=8000\n\n")),(0,a.kt)("h3",{id:"\u7b2c\u4e8c\u6b65\u6309\u7167\u914d\u7f6e\u6587\u4ef6\u7684\u7ed3\u6784\u548c\u547d\u540d\u6784\u5efajava\u7c7b"},"\u7b2c\u4e8c\u6b65\uff1a\u6309\u7167\u914d\u7f6e\u6587\u4ef6\u7684\u7ed3\u6784\u548c\u547d\u540d\u6784\u5efaJava\u7c7b"),(0,a.kt)("p",null,"\u8fd9\u91cc\u6709\u51e0\u4e2a\u6ce8\u610f\u70b9"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u5b57\u6bb5\u7684\u547d\u540d")),(0,a.kt)("p",null,"\u5b57\u6bb5\u547d\u540d\u4e0d\u9700\u8981\u5b8c\u5168\u4e00\u6837\uff0c\u4f46\u662f\u4e5f\u4e0d\u662f\u968f\u610f\u547d\u540d\u7684\uff0c\u8981\u7b26\u5408\u4e00\u5b9a\u7684\u89c4\u5219 \u4f8b\u5982\u914d\u7f6e\u6587\u4ef6\u4e2d\u4e3ausername, Java\u7c7b\u4e2d\u53ef\u4ee5\u4e3a\uff1aUserName,user-name,userName\u7b49\u7b49\uff0c\u4f46\u662f\u5728Java\u4e2d\u4e00\u822c\u4e3a\u5c0f\u9a7c\u5cf0\uff0cuserName\u3002"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u5185\u90e8\u5d4c\u5957\u7c7b")),(0,a.kt)("p",null,"\u5f53\u914d\u7f6e\u6587\u4ef6\u4e2d\u7684\u5c5e\u6027\u7ed3\u6784\u5b58\u5728\u5c42\u7ea7\u65f6\uff0c\u5c31\u9700\u8981\u4f7f\u7528\u5d4c\u5957\u7c7b\u3002\u4f8b\u5982\u6b64\u5904\u7684server\u3002"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Setter\u5343\u4e07\u4e0d\u53ef\u7701\u7565")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"public class DatabaseConfig {\n    /**\n     * \u6570\u636e\u5e93\u7528\u6237\u540d\n     */\n    private String userName;\n    /**\n     * \u6570\u636e\u5e93\u5bc6\u7801\n     */\n    private String passWord;\n    /**\n     * \u6570\u636e\u5e93\u670d\u52a1\u5668\n     */\n    private Server server;\n\n    public void setUserName(String userName) {\n        this.userName = userName;\n    }\n\n    public void setPassWord(String passWord) {\n        this.passWord = passWord;\n    }\n\n    public void setServer(Server server) {\n        this.server = server;\n    }\n    ...\u7701\u7565\u4e86getter\n\n    public static class Server{\n        /**\n         * \u670d\u52a1\u5668IP\n         */\n        private String ip;\n        /**\n         * \u670d\u52a1\u5668\u7aef\u53e3\u53f7\n         */\n        private int port;\n\n        public void setIp(String ip) {\n            this.ip = ip;\n        }\n\n        public void setPort(int port) {\n            this.port = port;\n        }\n        ...\u7701\u7565\u4e86getter\n    }\n}\n\n")),(0,a.kt)("h2",{id:"\u7b2c\u4e09\u6b65\u4f7f\u7528configurationpropertiesprefixdatabase\u6ce8\u89e3\u6807\u8bb0"},'\u7b2c\u4e09\u6b65\uff1a\u4f7f\u7528@ConfigurationProperties(prefix="database")\u6ce8\u89e3\u6807\u8bb0'),(0,a.kt)("p",null,"\u5176\u4e2dprefix\u4e3a\u5c5e\u6027\u914d\u7f6e\u6587\u4ef6\u4e2d\u90a3\u7ec4\u914d\u7f6e\u7684\u6700\u5916\u5c42\uff0c\u6b64\u5904\u4e3adatabase\u3002"),(0,a.kt)("h2",{id:"\u7b2c\u56db\u6b65\u8ba9spring\u611f\u77e5\u5230\u4f60\u8fd9\u4e2a\u7c7b\u7684\u5b58\u5728"},"\u7b2c\u56db\u6b65\uff1a\u8ba9Spring\u611f\u77e5\u5230\u4f60\u8fd9\u4e2a\u7c7b\u7684\u5b58\u5728"),(0,a.kt)("p",null,"\u5b8c\u6210\u4ee5\u4e0a\u4e09\u6b65\u540e\uff0c\u6211\u4eec\u9700\u8981\u8ba9Spring\u611f\u77e5\u5230\u8fd9\u4e2a\u7c7b\uff0c\u90a3\u6837\u5f53\u6211\u4eec\u4f7f\u7528\u7684\u65f6\u5019\uff0c\u5b83\u624d\u80fd\u5e2e\u6211\u4eec\u6ce8\u5165\u5b9e\u4f8b\u3002"),(0,a.kt)("p",null,"\u7b2c\u4e00\u79cd\u65b9\u5f0f\uff1a\u4f7f\u7528",(0,a.kt)("inlineCode",{parentName:"p"},"@Configuration"),"\u6ce8\u89e3\u6807\u8bb0\u4f60\u7684\u914d\u7f6e\u7c7b\uff0c\u6b64\u5904\u4e3a",(0,a.kt)("inlineCode",{parentName:"p"},"UserConfig")),(0,a.kt)("p",null,"\u7b2c\u4e8c\u79cd\u65b9\u5f0f\uff1a\u4f7f\u7528",(0,a.kt)("inlineCode",{parentName:"p"},"@ConfigurationPropertiesScan()"),"\u6ce8\u89e3\u6807\u8bb0\u4f60\u7684\u7a0b\u5e8f\u542f\u52a8\u7c7bxxxApplication,\u6b64\u5904\u4e3aSpringLearnApplication"),(0,a.kt)("p",null,"\u7b2c\u4e09\u79cd\u65b9\u5f0f\uff1a\u4f7f\u7528",(0,a.kt)("inlineCode",{parentName:"p"},"@EnableConfigurationProperties({\u4f60\u7684\u914d\u7f6e\u7c7b.class})")," \u6ce8\u89e3\u6807\u8bb0\u4f60\u7684\u7a0b\u5e8f\u542f\u52a8\u7c7bxxxApplication,\u6b64\u5904\u4e3aSpringLearnApplication"),(0,a.kt)("p",null,"\u4e09\u79cd\u65b9\u5f0f\u4f7f\u7528\u4efb\u4f55\u4e00\u79cd\u90fd\u53ef\uff0c\u5176\u4e2d\u7b2c\u4e8c\u79cd\u65b9\u5f0f\u6700\u4e3a\u4fbf\u6377\uff0c\u76f8\u5f53\u4e8eSpringBoot\u81ea\u52a8\u626b\u63cf\u90a3\u4e9b\u4f7f\u7528",(0,a.kt)("inlineCode",{parentName:"p"},"@ConfigurationProperties"),"\u6807\u8bb0\u7684\u7c7b\u3002"),(0,a.kt)("p",null,"\u6700\u540e\u7684\u6837\u5b50\u4e3a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'@Configuration //\u5f53\u4f7f\u7528`@ConfigurationPropertiesScan()`\u6216`@EnableConfigurationProperties({\u4f60\u7684\u914d\u7f6e\u7c7b.class})` \u65f6\uff0c\u6b64\u6ce8\u89e3\u53ef\u7701\u7565\n@ConfigurationProperties(prefix="database")\npublic class DatabaseConfig {\n    ...\n}\n\n')))}d.isMDXComponent=!0}}]);