"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[379],{8015:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>k});var r=t(757);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var p=r.createContext({}),i=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},c=function(e){var n=i(e.components);return r.createElement(p.Provider,{value:n},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,l=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=i(t),m=o,k=u["".concat(p,".").concat(m)]||u[m]||d[m]||l;return t?r.createElement(k,a(a({ref:n},c),{},{components:t})):r.createElement(k,a({ref:n},c))}));function k(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var l=t.length,a=new Array(l);a[0]=m;var s={};for(var p in n)hasOwnProperty.call(n,p)&&(s[p]=n[p]);s.originalType=e,s[u]="string"==typeof e?e:o,a[1]=s;for(var i=2;i<l;i++)a[i]=t[i];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},6684:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>a,default:()=>d,frontMatter:()=>l,metadata:()=>s,toc:()=>i});var r=t(1227),o=(t(757),t(8015));const l={},a=void 0,s={unversionedId:"notes/\u6280\u672f\u6808/k8s/service",id:"notes/\u6280\u672f\u6808/k8s/service",title:"service",description:"\u7ecf\u8fc7\u524d\u9762\u51e0\u8282\u7684\u7ec3\u4e60\uff0c\u53ef\u80fd\u4f60\u4f1a\u6709\u4e00\u4e9b\u7591\u60d1\uff1a",source:"@site/docs/notes/\u6280\u672f\u6808/k8s/service.md",sourceDirName:"notes/\u6280\u672f\u6808/k8s",slug:"/notes/\u6280\u672f\u6808/k8s/service",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/k8s/service",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/\u6280\u672f\u6808/k8s/service.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"pod",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/k8s/pod"},next:{title:"\u57fa\u672c\u6982\u5ff5",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/k8s/\u57fa\u672c\u6982\u5ff5"}},p={},i=[],c={toc:i},u="wrapper";function d(e){let{components:n,...t}=e;return(0,o.kt)(u,(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"\u7ecf\u8fc7\u524d\u9762\u51e0\u8282\u7684\u7ec3\u4e60\uff0c\u53ef\u80fd\u4f60\u4f1a\u6709\u4e00\u4e9b\u7591\u60d1\uff1a"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"\u4e3a\u4ec0\u4e48 pod \u4e0d\u5c31\u7eea (Ready) \u7684\u8bdd\uff0c",(0,o.kt)("inlineCode",{parentName:"li"},"kubernetes"),"\xa0\u4e0d\u4f1a\u5c06\u6d41\u91cf\u91cd\u5b9a\u5411\u5230\u8be5 pod\uff0c\u8fd9\u662f\u600e\u4e48\u505a\u5230\u7684\uff1f"),(0,o.kt)("li",{parentName:"ul"},"\u524d\u9762\u8bbf\u95ee\u670d\u52a1\u7684\u65b9\u5f0f\u662f\u901a\u8fc7\xa0",(0,o.kt)("inlineCode",{parentName:"li"},"port-forword"),"\xa0\u5c06 pod \u7684\u7aef\u53e3\u66b4\u9732\u5230\u672c\u5730\uff0c\u4e0d\u4ec5\u9700\u8981\u5199\u5bf9 pod \u7684\u540d\u5b57\uff0c\u4e00\u65e6 deployment \u91cd\u65b0\u521b\u5efa\u65b0\u7684 pod\uff0cpod \u540d\u5b57\u548c IP \u5730\u5740\u4e5f\u4f1a\u968f\u4e4b\u53d8\u5316\uff0c\u5982\u4f55\u4fdd\u8bc1\u7a33\u5b9a\u7684\u8bbf\u95ee\u5730\u5740\u5462\uff1f\u3002"),(0,o.kt)("li",{parentName:"ul"},"\u5982\u679c\u4f7f\u7528 deployment \u90e8\u7f72\u4e86\u591a\u4e2a Pod \u526f\u672c\uff0c\u5982\u4f55\u505a\u8d1f\u8f7d\u5747\u8861\u5462\uff1f")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"kubernetes"),"\xa0\u63d0\u4f9b\u4e86\u4e00\u79cd\u540d\u53eb\xa0",(0,o.kt)("inlineCode",{parentName:"p"},"Service"),"\xa0\u7684\u8d44\u6e90\u5e2e\u52a9\u89e3\u51b3\u8fd9\u4e9b\u95ee\u9898\uff0c\u5b83\u4e3a pod \u63d0\u4f9b\u4e00\u4e2a\u7a33\u5b9a\u7684 Endpoint\u3002Service \u4f4d\u4e8e pod \u7684\u524d\u9762\uff0c\u8d1f\u8d23\u63a5\u6536\u8bf7\u6c42\u5e76\u5c06\u5b83\u4eec\u4f20\u9012\u7ed9\u5b83\u540e\u9762\u7684\u6240\u6709pod\u3002\u4e00\u65e6\u670d\u52a1\u4e2d\u7684 Pod \u96c6\u5408\u53d1\u751f\u66f4\u6539\uff0cEndpoints \u5c31\u4f1a\u88ab\u66f4\u65b0\uff0c\u8bf7\u6c42\u7684\u91cd\u5b9a\u5411\u81ea\u7136\u4e5f\u4f1a\u5bfc\u5411\u6700\u65b0\u7684 pod\u3002"),(0,o.kt)("p",null,"\u5b9a\u4e49deployment"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: hellok8s-deployment\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: hellok8s\n  template:\n    metadata:\n      labels:\n        app: hellok8s\n    spec:\n      containers:\n        - image: guangzhengli/hellok8s:v3\n          name: hellok8s-container\n")),(0,o.kt)("p",null,"\u5b9a\u4e49service"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"apiVersion: v1\nkind: Service\nmetadata:\n  name: service-hellok8s-clusterip\nspec:\n  type: ClusterIP\n  selector:\n    app: hellok8s\n  ports:\n  - port: 3000\n    targetPort: 3000\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"kubectl apply -f service-hellok8s-clusterip.yaml\n\nkubectl get endpoints\n# NAME                         ENDPOINTS                                          AGE\n# service-hellok8s-clusterip   172.17.0.10:3000,172.17.0.2:3000,172.17.0.3:3000   10s\n\nkubectl get pod -o wide\n# NAME                                   READY   STATUS    RESTARTS   AGE    IP           NODE \n# hellok8s-deployment-5d5545b69c-24lw5   1/1     Running   0          112s   172.17.0.7   minikube \n# hellok8s-deployment-5d5545b69c-9g94t   1/1     Running   0          112s   172.17.0.3   minikube\n# hellok8s-deployment-5d5545b69c-9gm8r   1/1     Running   0          112s   172.17.0.2   minikube\n# nginx                                  1/1     Running   0          112s   172.17.0.9   minikube\n\nkubectl get service\n# NAME                         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE\n# service-hellok8s-clusterip   ClusterIP   10.104.96.153   <none>        3000/TCP   10s\n")),(0,o.kt)("p",null,"\u53ef\u89c1 cluster-ip \u5c31\u662f",(0,o.kt)("inlineCode",{parentName:"p"},"10.104.96.153")),(0,o.kt)("p",null,"\u63a5\u7740\u6211\u4eec\u53ef\u4ee5\u901a\u8fc7\u5728\u96c6\u7fa4\u5176\u5b83\u5e94\u7528\u4e2d\u8bbf\u95ee\xa0",(0,o.kt)("inlineCode",{parentName:"p"},"service-hellok8s-clusterip"),"\xa0\u7684 IP \u5730\u5740\xa0",(0,o.kt)("inlineCode",{parentName:"p"},"10.104.96.153"),"\xa0\u6765\u8bbf\u95ee\xa0",(0,o.kt)("inlineCode",{parentName:"p"},"hellok8s:v3"),"\xa0\u670d\u52a1\u3002"))}d.isMDXComponent=!0}}]);