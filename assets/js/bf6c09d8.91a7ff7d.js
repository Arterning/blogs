"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7712],{224:(e,t,n)=>{n.d(t,{Zo:()=>h,kt:()=>m});var s=n(2374);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,s)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,s,o=function(e,t){if(null==e)return{};var n,s,o={},i=Object.keys(e);for(s=0;s<i.length;s++)n=i[s],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(s=0;s<i.length;s++)n=i[s],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=s.createContext({}),u=function(e){var t=s.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},h=function(e){var t=u(e.components);return s.createElement(l.Provider,{value:t},e.children)},c="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return s.createElement(s.Fragment,{},t)}},d=s.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,h=a(e,["components","mdxType","originalType","parentName"]),c=u(n),d=o,m=c["".concat(l,".").concat(d)]||c[d]||p[d]||i;return n?s.createElement(m,r(r({ref:t},h),{},{components:n})):s.createElement(m,r({ref:t},h))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,r=new Array(i);r[0]=d;var a={};for(var l in t)hasOwnProperty.call(t,l)&&(a[l]=t[l]);a.originalType=e,a[c]="string"==typeof e?e:o,r[1]=a;for(var u=2;u<i;u++)r[u]=n[u];return s.createElement.apply(null,r)}return s.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4152:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>p,frontMatter:()=>i,metadata:()=>a,toc:()=>u});var s=n(9963),o=(n(2374),n(224));const i={},r=void 0,a={unversionedId:"notes/\u64cd\u4f5c\u7cfb\u7edf/linux/Linxu \u73af\u5883\u53d8\u91cf\u6587\u4ef6\u7684\u533a\u522b",id:"notes/\u64cd\u4f5c\u7cfb\u7edf/linux/Linxu \u73af\u5883\u53d8\u91cf\u6587\u4ef6\u7684\u533a\u522b",title:"Linxu \u73af\u5883\u53d8\u91cf\u6587\u4ef6\u7684\u533a\u522b",description:"Overview",source:"@site/docs/notes/\u64cd\u4f5c\u7cfb\u7edf/linux/Linxu \u73af\u5883\u53d8\u91cf\u6587\u4ef6\u7684\u533a\u522b.md",sourceDirName:"notes/\u64cd\u4f5c\u7cfb\u7edf/linux",slug:"/notes/\u64cd\u4f5c\u7cfb\u7edf/linux/Linxu \u73af\u5883\u53d8\u91cf\u6587\u4ef6\u7684\u533a\u522b",permalink:"/blogs/docs/notes/\u64cd\u4f5c\u7cfb\u7edf/linux/Linxu \u73af\u5883\u53d8\u91cf\u6587\u4ef6\u7684\u533a\u522b",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/\u64cd\u4f5c\u7cfb\u7edf/linux/Linxu \u73af\u5883\u53d8\u91cf\u6587\u4ef6\u7684\u533a\u522b.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"Linux \u7f51\u7edc\u547d\u4ee4",permalink:"/blogs/docs/notes/\u64cd\u4f5c\u7cfb\u7edf/linux/Linux \u7f51\u7edc\u547d\u4ee4"},next:{title:"SSH \u5e38\u7528\u547d\u4ee4",permalink:"/blogs/docs/notes/\u64cd\u4f5c\u7cfb\u7edf/linux/SSH \u5e38\u7528\u547d\u4ee4"}},l={},u=[{value:"Overview",id:"overview",level:2},{value:"Bashrc",id:"bashrc",level:2},{value:".bash_profile",id:"bash_profile",level:2},{value:"Profile",id:"profile",level:2},{value:"Conclusion",id:"conclusion",level:2}],h={toc:u},c="wrapper";function p(e){let{components:t,...n}=e;return(0,o.kt)(c,(0,s.Z)({},h,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"overview"},"Overview"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"vim ~/.bashrc\nvim ~/.bash_profile\nvim /etc/bashrc\n\nexport PATH=$PATH:/usr/local/go/bin\n")),(0,o.kt)("h2",{id:"bashrc"},"Bashrc"),(0,o.kt)("p",null,"The .bashrc file is a configuration file that is used to set up and customize the Bash shell, which is the default shell on most Linux and Unix-based operating systems. This file is typically located in the user's home directory and is executed every time a new terminal window is opened or a new Bash shell is started."),(0,o.kt)("p",null,"This file is used to set up various environment variables, such as the PATH variable, which determines the directories where the shell looks for executable files, and the PS1 variable, which controls the appearance of the shell prompt. Additionally, it can be used to set up aliases, which are short forms of commonly used commands, and to configure other settings, such as the shell's history settings."),(0,o.kt)("p",null,'For example, you can use the .bashrc file to set up an alias for the "ls" command, so that when you type "ll" in the terminal, it will execute the "ls -l" command, which displays the files in a directory in a long format.'),(0,o.kt)("p",null,"The .bashrc file is also commonly used to set up custom functions and scripts that can be used to automate certain tasks or to customize the shell's behavior."),(0,o.kt)("p",null,"It's worth noting that some systems use the .bash_profile file instead of .bashrc, but the content and purpose of both files are the same, and you can use either one of them according to your system's preferences."),(0,o.kt)("h2",{id:"bash_profile"},".bash_profile"),(0,o.kt)("p",null,"The .bash_profile file is a configuration file that is used to set up and customize the Bash shell when a user logs in to the system. This file is typically located in the user's home directory and is executed only once when the user logs in to the system."),(0,o.kt)("p",null,"This file is used to set up various environment variables, such as the PATH variable, which determines the directories where the shell looks for executable files, and the PS1 variable, which controls the appearance of the shell prompt. Additionally, it can be used to set up aliases, which are short forms of commonly used commands, and to configure other settings, such as the shell's history settings."),(0,o.kt)("p",null,'For example, you can use the .bash_profile file to set up an environment variable that defines the default editor for the system, so that when you type "nano" in the terminal, it will execute the "vi" editor by default.'),(0,o.kt)("p",null,"The .bash_profile file is also commonly used to set up custom functions and scripts that can be used to automate certain tasks or to customize the shell's behavior."),(0,o.kt)("p",null,"It's worth noting that some systems use the .bashrc file instead of .bash_profile, but the content and purpose of both files are the same, and you can use either one of them according to your system's preferences."),(0,o.kt)("h2",{id:"profile"},"Profile"),(0,o.kt)("p",null,"The .profile file is a configuration file that is used to set up and customize the shell environment when a user logs in to the system. This file is typically located in the user's home directory and is executed only once when the user logs in to the system."),(0,o.kt)("p",null,"This file is used to set up various environment variables, such as the PATH variable, which determines the directories where the shell looks for executable files, and the PS1 variable, which controls the appearance of the shell prompt. Additionally, it can be used to set up aliases, which are short forms of commonly used commands, and to configure other settings, such as the shell's history settings."),(0,o.kt)("p",null,'For example, you can use the .profile file to set up an environment variable that defines the default language for the system, so that when you type "locale" in the terminal, it will show the default language you set up in the .profile file.'),(0,o.kt)("p",null,"The .profile file is also commonly used to set up custom functions and scripts that can be used to automate certain tasks or to customize the shell's behavior."),(0,o.kt)("p",null,"It's worth noting that some systems use the .bash_profile or .bashrc files instead of .profile, but the content and purpose of all three files are the same, and you can use any one of them according to your system's preferences."),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"File"),(0,o.kt)("th",{parentName:"tr",align:null},"Purpose"),(0,o.kt)("th",{parentName:"tr",align:null},"Execution Time"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},".bashrc"),(0,o.kt)("td",{parentName:"tr",align:null},"Used to set up and configure the Bash shell"),(0,o.kt)("td",{parentName:"tr",align:null},"Executed every time a new terminal window is opened or a new Bash shell is started")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},".bash_profile"),(0,o.kt)("td",{parentName:"tr",align:null},"Used to set up environment and configurations when logging in to the system"),(0,o.kt)("td",{parentName:"tr",align:null},"Executed only when the user logs in to the system")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},".profile"),(0,o.kt)("td",{parentName:"tr",align:null},"Used to set up environment and configurations when logging in to the system"),(0,o.kt)("td",{parentName:"tr",align:null},"Executed only when the user logs in to the system")))),(0,o.kt)("h2",{id:"conclusion"},"Conclusion"),(0,o.kt)("p",null,"In conclusion, the .bashrc, .bash_profile, and .profile files are all used to customize your shell environment and set up different settings and configurations depending on your needs. The .bashrc file is executed every time you open a new terminal window or start a new Bash shell, the .bash_profile file is executed when you log in to your system, and the .profile file is also executed when you log in to your system. Understanding the differences between these files and how they can be used to customize your shell environment is essential for working effectively with the command line on a Unix or Linux operating system."))}p.isMDXComponent=!0}}]);