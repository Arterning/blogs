"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8210],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>h});var a=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)t=s[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)t=s[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=a.createContext({}),i=function(e){var n=a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},c=function(e){var n=i(e.components);return a.createElement(p.Provider,{value:n},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},m=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,s=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=i(t),m=r,h=u["".concat(p,".").concat(m)]||u[m]||d[m]||s;return t?a.createElement(h,o(o({ref:n},c),{},{components:t})):a.createElement(h,o({ref:n},c))}));function h(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var s=t.length,o=new Array(s);o[0]=m;var l={};for(var p in n)hasOwnProperty.call(n,p)&&(l[p]=n[p]);l.originalType=e,l[u]="string"==typeof e?e:r,o[1]=l;for(var i=2;i<s;i++)o[i]=t[i];return a.createElement.apply(null,o)}return a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},4939:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>o,default:()=>d,frontMatter:()=>s,metadata:()=>l,toc:()=>i});var a=t(7462),r=(t(7294),t(3905));const s={},o="react base",l={unversionedId:"react/react-base",id:"react/react-base",title:"react base",description:"\u521b\u5efa\u865a\u62dfDOM",source:"@site/docs/react/react-base.md",sourceDirName:"react",slug:"/react/react-base",permalink:"/blogs/docs/react/react-base",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/react/react-base.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u7ec4\u4ef6\u4f18\u5316",permalink:"/blogs/docs/react/pure-component"},next:{title:"useEffect",permalink:"/blogs/docs/react/react-hook/useEffect"}},p={},i=[{value:"\u521b\u5efa\u865a\u62dfDOM",id:"\u521b\u5efa\u865a\u62dfdom",level:2},{value:"JSX\u7684\u8bed\u6cd5\u89c4\u5219",id:"jsx\u7684\u8bed\u6cd5\u89c4\u5219",level:2},{value:"\u7ec4\u4ef6\u7684State",id:"\u7ec4\u4ef6\u7684state",level:2},{value:"props",id:"props",level:2},{value:"refs",id:"refs",level:2},{value:"\u4e8b\u4ef6\u5904\u7406",id:"\u4e8b\u4ef6\u5904\u7406",level:2},{value:"\u53d7\u63a7\u7ec4\u4ef6\u548c\u975e\u53d7\u63a7\u7ec4\u4ef6",id:"\u53d7\u63a7\u7ec4\u4ef6\u548c\u975e\u53d7\u63a7\u7ec4\u4ef6",level:2},{value:"\u53d7\u63a7\u7ec4\u4ef6",id:"\u53d7\u63a7\u7ec4\u4ef6",level:3},{value:"\u975e\u53d7\u63a7\u7ec4\u4ef6",id:"\u975e\u53d7\u63a7\u7ec4\u4ef6",level:3},{value:"\u51fd\u6570\u67ef\u91cc\u5316\u6539\u5199",id:"\u51fd\u6570\u67ef\u91cc\u5316\u6539\u5199",level:3},{value:"\u7ec4\u4ef6\u751f\u547d\u5468\u671f",id:"\u7ec4\u4ef6\u751f\u547d\u5468\u671f",level:2},{value:"\u865a\u62dfDOM\u4e2dkey\u7684\u9009\u62e9",id:"\u865a\u62dfdom\u4e2dkey\u7684\u9009\u62e9",level:2}],c={toc:i},u="wrapper";function d(e){let{components:n,...t}=e;return(0,r.kt)(u,(0,a.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"react-base"},"react base"),(0,r.kt)("h2",{id:"\u521b\u5efa\u865a\u62dfdom"},"\u521b\u5efa\u865a\u62dfDOM"),(0,r.kt)("p",null,"\u4f7f\u7528\u539f\u751fJS\u521b\u5efa\u865a\u62dfDOM"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"<script type=\"text/javascript\" > \n    //1.\u521b\u5efa\u865a\u62dfDOM\n    const VDOM = React.createElement('h1',{id:'title'},React.createElement('span',{},'Hello,React'))\n    //2.\u6e32\u67d3\u865a\u62dfDOM\u5230\u9875\u9762\n    ReactDOM.render(VDOM,document.getElementById('test'))\n<\/script>\n")),(0,r.kt)("p",null,"\u4f7f\u7528JSX\u8bed\u6cd5\u521b\u5efa\u865a\u62dfDOM"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'    <script type="text/babel" > /* \u6b64\u5904\u4e00\u5b9a\u8981\u5199babel */\n        //1.\u521b\u5efa\u865a\u62dfDOM\n        const VDOM = (  /* \u6b64\u5904\u4e00\u5b9a\u4e0d\u8981\u5199\u5f15\u53f7\uff0c\u56e0\u4e3a\u4e0d\u662f\u5b57\u7b26\u4e32 */\n            <h1 id="title">\n                <span>Hello,React</span>\n            </h1>\n        )\n        //2.\u6e32\u67d3\u865a\u62dfDOM\u5230\u9875\u9762\n        ReactDOM.render(VDOM,document.getElementById(\'test\'))\n    <\/script>\n')),(0,r.kt)("h1",{id:"\u865a\u62dfdom\u7684\u672c\u8d28"},"\u865a\u62dfDOM\u7684\u672c\u8d28"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"\u672c\u8d28\u662fObject\u7c7b\u578b\u7684\u5bf9\u8c61\uff08\u4e00\u822c\u5bf9\u8c61\uff09"),(0,r.kt)("li",{parentName:"ol"},"\u865a\u62dfDOM\u6bd4\u8f83\u201c\u8f7b\u201d\uff0c\u771f\u5b9eDOM\u6bd4\u8f83\u201c\u91cd\u201d\uff0c\u56e0\u4e3a\u865a\u62dfDOM\u662fReact\u5185\u90e8\u5728\u7528\uff0c\u65e0\u9700\u771f\u5b9eDOM\u4e0a\u90a3\u4e48\u591a\u7684\u5c5e\u6027\u3002"),(0,r.kt)("li",{parentName:"ol"},"\u865a\u62dfDOM\u6700\u7ec8\u4f1a\u88abReact\u8f6c\u5316\u4e3a\u771f\u5b9eDOM\uff0c\u5448\u73b0\u5728\u9875\u9762\u4e0a\u3002")),(0,r.kt)("h2",{id:"jsx\u7684\u8bed\u6cd5\u89c4\u5219"},"JSX\u7684\u8bed\u6cd5\u89c4\u5219"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"\u5b9a\u4e49\u865a\u62dfDOM\u65f6\uff0c\u4e0d\u8981\u5199\u5f15\u53f7\u3002"),(0,r.kt)("li",{parentName:"ol"},"\u6807\u7b7e\u4e2d\u6df7\u5165JS\u8868\u8fbe\u5f0f\u65f6\u8981\u7528{}\u3002"),(0,r.kt)("li",{parentName:"ol"},"\u6837\u5f0f\u7684\u7c7b\u540d\u6307\u5b9a\u4e0d\u8981\u7528class\uff0c\u8981\u7528className\u3002"),(0,r.kt)("li",{parentName:"ol"},"\u5185\u8054\u6837\u5f0f\uff0c\u8981\u7528style={{key:value}}\u7684\u5f62\u5f0f\u53bb\u5199\u3002"),(0,r.kt)("li",{parentName:"ol"},"\u53ea\u6709\u4e00\u4e2a\u6839\u6807\u7b7e"),(0,r.kt)("li",{parentName:"ol"},"\u6807\u7b7e\u5fc5\u987b\u95ed\u5408"),(0,r.kt)("li",{parentName:"ol"},"\u6807\u7b7e\u9996\u5b57\u6bcd\n(1).\u82e5\u5c0f\u5199\u5b57\u6bcd\u5f00\u5934\uff0c\u5219\u5c06\u8be5\u6807\u7b7e\u8f6c\u4e3ahtml\u4e2d\u540c\u540d\u5143\u7d20\uff0c\u82e5html\u4e2d\u65e0\u8be5\u6807\u7b7e\u5bf9\u5e94\u7684\u540c\u540d\u5143\u7d20\uff0c\u5219\u62a5\u9519\u3002\n(2).\u82e5\u5927\u5199\u5b57\u6bcd\u5f00\u5934\uff0creact\u5c31\u53bb\u6e32\u67d3\u5bf9\u5e94\u7684\u7ec4\u4ef6\uff0c\u82e5\u7ec4\u4ef6\u6ca1\u6709\u5b9a\u4e49\uff0c\u5219\u62a5\u9519\u3002")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"const VDOM = (\n            <div>\n                <h2 className=\"title\" id={myId.toLowerCase()}>\n                    <span style={{color:'white',fontSize:'29px'}}>{myData.toLowerCase()}</span>\n                </h2>\n                <h2 className=\"title\" id={myId.toUpperCase()}>\n                    <span style={{color:'white',fontSize:'29px'}}>{myData.toLowerCase()}</span>\n                </h2>\n                <input type=\"text\"/>\n            </div>\n        )\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"const data = ['Angular','React','Vue']\n//1.\u521b\u5efa\u865a\u62dfDOM\nconst VDOM = (\n    <div>\n        <h1>\u524d\u7aefjs\u6846\u67b6\u5217\u8868</h1>\n        <ul>\n            {\n                data.map((item,index)=>{\n                    return <li key={index}>{item}</li>\n                })\n            }\n        </ul>\n    </div>\n)\n//2.\u6e32\u67d3\u865a\u62dfDOM\u5230\u9875\u9762\nReactDOM.render(VDOM,document.getElementById('test'))\n")),(0,r.kt)("h2",{id:"\u7ec4\u4ef6\u7684state"},"\u7ec4\u4ef6\u7684State"),(0,r.kt)("p",null,"\u72b6\u6001(state)\u4e0d\u53ef\u76f4\u63a5\u66f4\u6539\uff0c\u5fc5\u987b\u901a\u8fc7\u8c03\u7528setState\u66f4\u6539"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"class Weather extends React.Component{\n            \n        constructor(props){\n            console.log('constructor');\n            super(props)\n\n            //\u521d\u59cb\u5316\u72b6\u6001\n            this.state = {isHot:false,wind:'\u5fae\u98ce'}\n            this.changeWeather = this.changeWeather.bind(this)\n        }\n\n        render(){\n            const {isHot,wind} = this.state\n            return <h1 onClick={this.changeWeather}>\u4eca\u5929\u5929\u6c14\u5f88{isHot ? '\u708e\u70ed' : '\u51c9\u723d'}\uff0c{wind}</h1>\n        }\n\n        changeWeather() {\n            console.log('changeWeather');\n            const isHot = this.state.isHot\n            this.setState({isHot:!isHot})\n            console.log(this);\n        }\n}\n")),(0,r.kt)("p",null,"state\u7684\u7b80\u5199\u65b9\u5f0f"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"class Weather extends React.Component{\n\n    state = {isHot:false,wind:'\u5fae\u98ce'}\n\n    render(){\n        const {isHot,wind} = this.state\n        return <h1 onClick={this.changeWeather}>\u4eca\u5929\u5929\u6c14\u5f88{isHot ? '\u708e\u70ed' : '\u51c9\u723d'}\uff0c{wind}</h1>\n    }\n\n    changeWeather = () => {\n        const isHot = this.state.isHot\n        this.setState({isHot:!isHot})\n    }\n\n}\n")),(0,r.kt)("p",null,"\u5728 React \u4e2d\uff0c\u7bad\u5934\u51fd\u6570\u4e0e\u666e\u901a\u51fd\u6570\u7684\u6700\u5927\u533a\u522b\u5728\u4e8e\u5b83\u4eec\u4e0d\u7ed1\u5b9a\u81ea\u5df1\u7684 this \u503c\uff0c\u800c\u662f\u7ee7\u627f\u81ea\u5176\u6240\u5728\u7684\u4f5c\u7528\u57df\u3002\u56e0\u6b64\uff0c\u5728 React \u4e2d\uff0c\u4f7f\u7528\u7bad\u5934\u51fd\u6570\u5b9a\u4e49\u7684\u65b9\u6cd5\u53ef\u4ee5\u5f88\u65b9\u4fbf\u5730\u83b7\u53d6\u7ec4\u4ef6\u5b9e\u4f8b\u7684 this \u503c\uff0c\u800c\u65e0\u9700\u624b\u52a8\u7ed1\u5b9a\u3002"),(0,r.kt)("p",null,"\u5728\u4f20\u7edf\u7684 JavaScript \u4e2d\uff0cthis \u7684\u503c\u662f\u5728\u51fd\u6570\u88ab\u8c03\u7528\u65f6\u786e\u5b9a\u7684\u3002\u5982\u679c\u51fd\u6570\u88ab\u4f5c\u4e3a\u5bf9\u8c61\u7684\u65b9\u6cd5\u8c03\u7528\uff0c\u90a3\u4e48 this \u5c31\u662f\u8be5\u5bf9\u8c61\uff1b\u5982\u679c\u51fd\u6570\u4e0d\u662f\u4f5c\u4e3a\u5bf9\u8c61\u7684\u65b9\u6cd5\u8c03\u7528\uff0c\u90a3\u4e48 this \u5c31\u662f\u5168\u5c40\u5bf9\u8c61\u3002\u4e3a\u4e86\u786e\u4fdd this \u59cb\u7ec8\u6307\u5411\u6b63\u786e\u7684\u5bf9\u8c61\uff0c\u4f20\u7edf\u7684 JavaScript \u4ee3\u7801\u901a\u5e38\u9700\u8981\u4f7f\u7528 bind()\u3001call() \u6216 apply() \u7b49\u65b9\u6cd5\u624b\u52a8\u7ed1\u5b9a this\u3002"),(0,r.kt)("p",null,"\u800c\u5728 React \u4e2d\uff0c\u7ec4\u4ef6\u65b9\u6cd5\u7684 this \u503c\u901a\u5e38\u9700\u8981\u6307\u5411\u7ec4\u4ef6\u5b9e\u4f8b\u672c\u8eab\uff0c\u4ee5\u4fbf\u5728\u65b9\u6cd5\u5185\u90e8\u53ef\u4ee5\u8bbf\u95ee\u7ec4\u4ef6\u7684\u72b6\u6001\u548c\u5c5e\u6027\u3002\u4f7f\u7528\u7bad\u5934\u51fd\u6570\u5b9a\u4e49\u7ec4\u4ef6\u65b9\u6cd5\uff0c\u53ef\u4ee5\u907f\u514d\u624b\u52a8\u7ed1\u5b9a this \u7684\u95ee\u9898\uff0c\u4ece\u800c\u4f7f\u4ee3\u7801\u66f4\u52a0\u7b80\u6d01\u6613\u61c2\u3002"),(0,r.kt)("h2",{id:"props"},"props"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"class Person extends React.Component {\n\n    //\u6784\u9020\u5668\u662f\u5426\u63a5\u6536props\uff0c\u53d6\u51b3\u4e8e\uff1a\u662f\u5426\u5e0c\u671b\u5728\u6784\u9020\u5668\u4e2d\u901a\u8fc7this\u8bbf\u95eeprops\n    constructor(props){    \n        super(props)\n        console.log('constructor',this.props);\n    }\n\n    render(){\n        const {name,age,sex} = this.props\n        return (\n            <ul>\n                <li>\u59d3\u540d\uff1a{name}</li>\n                <li>\u6027\u522b\uff1a{sex}</li>\n                <li>\u5e74\u9f84\uff1a{age+1}</li>\n            </ul>\n        )\n    }\n}\n\n// set prop types\nPerson.propTypes = {\n    name:PropTypes.string.isRequired,\n    sex:PropTypes.string,\n    age:PropTypes.number,\n    speak:PropTypes.func,\n}\n\n// set default props\nPerson.defaultProps = {\n    sex:'\u7537',\n    age:18\n}\n")),(0,r.kt)("p",null,"\u51fd\u6570\u7ec4\u4ef6\u4f7f\u7528props"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"function Person (props){\n    const {name,age,sex} = props\n    return (\n        <ul>\n            <li>\u59d3\u540d\uff1a{name}</li>\n            <li>\u6027\u522b\uff1a{sex}</li>\n            <li>\u5e74\u9f84\uff1a{age}</li>\n        </ul>\n    )\n}\n")),(0,r.kt)("h2",{id:"refs"},"refs"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'class Demo extends React.Component{\n    //\u5c55\u793a\u5de6\u4fa7\u8f93\u5165\u6846\u7684\u6570\u636e\n    showData = ()=>{\n        const {input1} = this.refs\n        alert(input1.value)\n    }\n    //\u5c55\u793a\u53f3\u4fa7\u8f93\u5165\u6846\u7684\u6570\u636e\n    showData2 = ()=>{\n        const {input2} = this.refs\n        alert(input2.value)\n    }\n    render(){\n        return(\n            <div>\n                <input ref="input1" type="text" placeholder="\u70b9\u51fb\u6309\u94ae\u63d0\u793a\u6570\u636e"/>&nbsp;\n                <button onClick={this.showData}>\u70b9\u6211\u63d0\u793a\u5de6\u4fa7\u7684\u6570\u636e</button>&nbsp;\n                <input ref="input2" onBlur={this.showData2} type="text" placeholder="\u5931\u53bb\u7126\u70b9\u63d0\u793a\u6570\u636e"/>\n            </div>\n        )\n    }\n}\n')),(0,r.kt)("h2",{id:"\u4e8b\u4ef6\u5904\u7406"},"\u4e8b\u4ef6\u5904\u7406"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'class Demo extends React.Component{\n    \n    //\u521b\u5efaref\u5bb9\u5668\n    myRef = React.createRef()\n\n    //\u5c55\u793a\u5de6\u4fa7\u8f93\u5165\u6846\u7684\u6570\u636e\n    showData = (event)=>{\n        console.log(event.target);\n        alert(this.myRef.current.value);\n    }\n\n    //\u5c55\u793a\u53f3\u4fa7\u8f93\u5165\u6846\u7684\u6570\u636e\n    showData2 = (event)=>{\n        alert(event.target.value);\n    }\n\n    render(){\n        return(\n            <div>\n                <input ref={this.myRef} type="text" placeholder="\u70b9\u51fb\u6309\u94ae\u63d0\u793a\u6570\u636e"/>&nbsp;\n                <button onClick={this.showData}>\u70b9\u6211\u63d0\u793a\u5de6\u4fa7\u7684\u6570\u636e</button>&nbsp;\n                <input onBlur={this.showData2} type="text" placeholder="\u5931\u53bb\u7126\u70b9\u63d0\u793a\u6570\u636e"/>&nbsp;\n            </div>\n        )\n    }\n}\n')),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"\u901a\u8fc7onXxx\u5c5e\u6027\u6307\u5b9a\u4e8b\u4ef6\u5904\u7406\u51fd\u6570(\u6ce8\u610f\u5927\u5c0f\u5199)")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"React\u4f7f\u7528\u7684\u662f\u81ea\u5b9a\u4e49(\u5408\u6210)\u4e8b\u4ef6, \u800c\u4e0d\u662f\u4f7f\u7528\u7684\u539f\u751fDOM\u4e8b\u4ef6, \u4e3a\u4e86\u66f4\u597d\u7684\u517c\u5bb9\u6027"),(0,r.kt)("li",{parentName:"ul"},"React\u4e2d\u7684\u4e8b\u4ef6\u662f\u901a\u8fc7\u4e8b\u4ef6\u59d4\u6258\u65b9\u5f0f\u5904\u7406\u7684(\u59d4\u6258\u7ed9\u7ec4\u4ef6\u6700\u5916\u5c42\u7684\u5143\u7d20), \u4e3a\u4e86\u7684\u9ad8\u6548")),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},"\u901a\u8fc7event.target\u5f97\u5230\u53d1\u751f\u4e8b\u4ef6\u7684DOM\u5143\u7d20\u5bf9\u8c61, \u4e0d\u8981\u8fc7\u5ea6\u4f7f\u7528ref\n")),(0,r.kt)("h2",{id:"\u53d7\u63a7\u7ec4\u4ef6\u548c\u975e\u53d7\u63a7\u7ec4\u4ef6"},"\u53d7\u63a7\u7ec4\u4ef6\u548c\u975e\u53d7\u63a7\u7ec4\u4ef6"),(0,r.kt)("h3",{id:"\u53d7\u63a7\u7ec4\u4ef6"},"\u53d7\u63a7\u7ec4\u4ef6"),(0,r.kt)("p",null,"\u8868\u5355\u7684\u5185\u5bb9\u5b58\u653e\u5728state\u4e2d"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'class Login extends React.Component{\n    //\u521d\u59cb\u5316\u72b6\u6001\n    state = {\n        username:\'\', //\u7528\u6237\u540d\n        password:\'\' //\u5bc6\u7801\n    }\n\n    saveUsername = (event)=>{\n        this.setState({username:event.target.value})\n    }\n\n    savePassword = (event)=>{\n        this.setState({password:event.target.value})\n    }\n\n    handleSubmit = (event)=>{\n        event.preventDefault() //\u963b\u6b62\u8868\u5355\u63d0\u4ea4\n        const {username,password} = this.state\n        alert(`\u4f60\u8f93\u5165\u7684\u7528\u6237\u540d\u662f\uff1a${username},\u4f60\u8f93\u5165\u7684\u5bc6\u7801\u662f\uff1a${password}`)\n    }\n\n    render(){\n        return(\n            <form onSubmit={this.handleSubmit}>\n                \u7528\u6237\u540d\uff1a<input onChange={this.saveUsername} type="text" name="username"/>\n                \u5bc6\u7801\uff1a<input onChange={this.savePassword} type="password" name="password"/>\n                <button>\u767b\u5f55</button>\n            </form>\n        )\n    }\n}\n')),(0,r.kt)("h3",{id:"\u975e\u53d7\u63a7\u7ec4\u4ef6"},"\u975e\u53d7\u63a7\u7ec4\u4ef6"),(0,r.kt)("p",null,"\u8868\u5355\u7684\u5185\u5bb9\u5e76\u6ca1\u6709\u5b58\u653e\u5728state\u4e2d"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'class Login extends React.Component{\n    handleSubmit = (event)=>{\n        event.preventDefault() //\u963b\u6b62\u8868\u5355\u63d0\u4ea4\n        const {username,password} = this\n        alert(`\u4f60\u8f93\u5165\u7684\u7528\u6237\u540d\u662f\uff1a${username.value},\u4f60\u8f93\u5165\u7684\u5bc6\u7801\u662f\uff1a${password.value}`)\n    }\n    render(){\n        return(\n            <form onSubmit={this.handleSubmit}>\n                \u7528\u6237\u540d\uff1a<input ref={c => this.username = c} type="text" name="username"/>\n                \u5bc6\u7801\uff1a<input ref={c => this.password = c} type="password" name="password"/>\n                <button>\u767b\u5f55</button>\n            </form>\n        )\n    }\n}\n')),(0,r.kt)("h3",{id:"\u51fd\u6570\u67ef\u91cc\u5316\u6539\u5199"},"\u51fd\u6570\u67ef\u91cc\u5316\u6539\u5199"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"class Login extends React.Component{\n\n    state = {\n        username:'', //\u7528\u6237\u540d\n        password:'' //\u5bc6\u7801\n    }\n\n    saveFormData = (dataType)=>{\n        return (event)=>{\n            this.setState({[dataType]:event.target.value})\n        }\n    }\n\n    //\u8868\u5355\u63d0\u4ea4\u7684\u56de\u8c03\n    handleSubmit = (event)=>{\n        event.preventDefault() //\u963b\u6b62\u8868\u5355\u63d0\u4ea4\n        const {username,password} = this.state\n        alert(`\u4f60\u8f93\u5165\u7684\u7528\u6237\u540d\u662f\uff1a${username},\u4f60\u8f93\u5165\u7684\u5bc6\u7801\u662f\uff1a${password}`)\n    }\n    render(){\n        return(\n            <form onSubmit={this.handleSubmit}>\n                \u7528\u6237\u540d\uff1a<input onChange={this.saveFormData('username')} type=\"text\" name=\"username\"/>\n                \u5bc6\u7801\uff1a<input onChange={this.saveFormData('password')} type=\"password\" name=\"password\"/>\n                <button>\u767b\u5f55</button>\n            </form>\n        )\n    }\n}\n")),(0,r.kt)("p",null,"\u9ad8\u9636\u51fd\u6570\uff1a\n\u5982\u679c\u4e00\u4e2a\u51fd\u6570\u7b26\u5408\u4e0b\u97622\u4e2a\u89c4\u8303\u4e2d\u7684\u4efb\u4f55\u4e00\u4e2a\uff0c\u90a3\u8be5\u51fd\u6570\u5c31\u662f\u9ad8\u9636\u51fd\u6570\u3002"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u82e5A\u51fd\u6570\uff0c\u63a5\u6536\u7684\u53c2\u6570\u662f\u4e00\u4e2a\u51fd\u6570\uff0c\u90a3\u4e48A\u5c31\u53ef\u4ee5\u79f0\u4e4b\u4e3a\u9ad8\u9636\u51fd\u6570\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u82e5A\u51fd\u6570\uff0c\u8c03\u7528\u7684\u8fd4\u56de\u503c\u4f9d\u7136\u662f\u4e00\u4e2a\u51fd\u6570\uff0c\u90a3\u4e48A\u5c31\u53ef\u4ee5\u79f0\u4e4b\u4e3a\u9ad8\u9636\u51fd\u6570\u3002")),(0,r.kt)("p",null,"\u5e38\u89c1\u7684\u9ad8\u9636\u51fd\u6570\u6709\uff1aPromise\u3001setTimeout\u3001arr.map()\u7b49\u7b49"),(0,r.kt)("p",null,"\u51fd\u6570\u7684\u67ef\u91cc\u5316\uff1a\u901a\u8fc7\u51fd\u6570\u8c03\u7528\u7ee7\u7eed\u8fd4\u56de\u51fd\u6570\u7684\u65b9\u5f0f\uff0c\u5b9e\u73b0\u591a\u6b21\u63a5\u6536\u53c2\u6570\u6700\u540e\u7edf\u4e00\u5904\u7406\u7684\u51fd\u6570\u7f16\u7801\u5f62\u5f0f"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"function sum(a){\n    return(b)=>{\n        return (c)=>{\n            return a+b+c\n        }\n    }\n}\n")),(0,r.kt)("h2",{id:"\u7ec4\u4ef6\u751f\u547d\u5468\u671f"},"\u7ec4\u4ef6\u751f\u547d\u5468\u671f"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"\u521d\u59cb\u5316\u9636\u6bb5: \u7531ReactDOM.render()\u89e6\u53d1---\u521d\u6b21\u6e32\u67d3",(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"1.  constructor()\n2.  getDerivedStateFromProps \n3.  render()\n4.  componentDidMount() \u4e00\u822c\u5728\u8fd9\u4e2a\u94a9\u5b50\u4e2d\u505a\u4e00\u4e9b\u521d\u59cb\u5316\u7684\u4e8b\uff0c\u4f8b\u5982\uff1a\u5f00\u542f\u5b9a\u65f6\u5668\u3001\u53d1\u9001\u7f51\u7edc\u8bf7\u6c42\u3001\u8ba2\u9605\u6d88\u606f\n"))),(0,r.kt)("li",{parentName:"ol"},"\u66f4\u65b0\u9636\u6bb5: \u7531\u7ec4\u4ef6\u5185\u90e8this.setSate()\u6216\u7236\u7ec4\u4ef6\u91cd\u65b0render\u89e6\u53d1",(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"1.  getDerivedStateFromProps\n2.  shouldComponentUpdate()\n3.  render()\n4.  getSnapshotBeforeUpdate\n5.  componentDidUpdate()\n"))),(0,r.kt)("li",{parentName:"ol"},"\u5378\u8f7d\u7ec4\u4ef6: \u7531ReactDOM.unmountComponentAtNode()\u89e6\u53d1",(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"1.  componentWillUnmount() \u4e00\u822c\u5728\u8fd9\u4e2a\u94a9\u5b50\u4e2d\u505a\u4e00\u4e9b\u6536\u5c3e\u7684\u4e8b\uff0c\u4f8b\u5982\uff1a\u5173\u95ed\u5b9a\u65f6\u5668\u3001\u53d6\u6d88\u8ba2\u9605\u6d88\u606f\n")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"class Count extends React.Component{\n    //\u6784\u9020\u5668\n    constructor(props){\n        console.log('Count---constructor');\n        super(props)\n        //\u521d\u59cb\u5316\u72b6\u6001\n        this.state = {count:0}\n    }\n\n    add = ()=>{\n        const {count} = this.state\n        this.setState({count:count+1})\n    }\n\n    //\u5378\u8f7d\u7ec4\u4ef6\u6309\u94ae\u7684\u56de\u8c03\n    death = ()=>{\n        ReactDOM.unmountComponentAtNode(document.getElementById('test'))\n    }\n\n    //\u5f3a\u5236\u66f4\u65b0\u6309\u94ae\u7684\u56de\u8c03\n    force = ()=>{\n        this.forceUpdate()\n    }\n    \n    //\u82e5state\u7684\u503c\u5728\u4efb\u4f55\u65f6\u5019\u90fd\u53d6\u51b3\u4e8eprops\uff0c\u90a3\u4e48\u53ef\u4ee5\u4f7f\u7528getDerivedStateFromProps\n    static getDerivedStateFromProps(props,state){\n        console.log('getDerivedStateFromProps',props,state);\n        return null\n    }\n\n    //\u5728\u66f4\u65b0\u4e4b\u524d\u83b7\u53d6\u5feb\u7167\n    getSnapshotBeforeUpdate(){\n        console.log('getSnapshotBeforeUpdate');\n        return 'getSnapshotBeforeUpdate'\n    }\n\n    //\u7ec4\u4ef6\u6302\u8f7d\u5b8c\u6bd5\u7684\u94a9\u5b50\n    componentDidMount(){\n        console.log('Count---componentDidMount');\n    }\n\n    //\u7ec4\u4ef6\u5c06\u8981\u5378\u8f7d\u7684\u94a9\u5b50\n    componentWillUnmount(){\n        console.log('Count---componentWillUnmount');\n    }\n\n    //\u63a7\u5236\u7ec4\u4ef6\u66f4\u65b0\u7684\u201c\u9600\u95e8\u201d\n    shouldComponentUpdate(){\n        console.log('Count---shouldComponentUpdate');\n        return true\n    }\n\n    //\u7ec4\u4ef6\u66f4\u65b0\u5b8c\u6bd5\u7684\u94a9\u5b50\n    componentDidUpdate(preProps,preState,snapshotValue){\n        console.log('Count---componentDidUpdate',preProps,preState,snapshotValue);\n    }\n    \n    render(){\n        console.log('Count---render');\n        const {count} = this.state\n        return(\n            <div>\n                <h2>\u5f53\u524d\u6c42\u548c\u4e3a\uff1a{count}</h2>\n                <button onClick={this.add}>\u70b9\u6211+1</button>\n                <button onClick={this.death}>\u5378\u8f7d\u7ec4\u4ef6</button>\n                <button onClick={this.force}>\u4e0d\u66f4\u6539\u4efb\u4f55\u72b6\u6001\u4e2d\u7684\u6570\u636e\uff0c\u5f3a\u5236\u66f4\u65b0\u4e00\u4e0b</button>\n            </div>\n        )\n    }\n}\n")),(0,r.kt)("h2",{id:"\u865a\u62dfdom\u4e2dkey\u7684\u9009\u62e9"},"\u865a\u62dfDOM\u4e2dkey\u7684\u9009\u62e9"),(0,r.kt)("p",null,"react/vue\u4e2d\u7684key\u6709\u4ec0\u4e48\u4f5c\u7528\uff1fkey\u7684\u5185\u90e8\u539f\u7406\u662f\u4ec0\u4e48\uff1f\u4e3a\u4ec0\u4e48\u904d\u5386\u5217\u8868\u65f6\uff0ckey\u6700\u597d\u4e0d\u8981\u7528index?"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"\u865a\u62dfDOM\u4e2dkey\u7684\u4f5c\u7528\uff1a"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"  1. key\u662f\u865a\u62dfDOM\u5bf9\u8c61\u7684\u6807\u8bc6, \u5728\u66f4\u65b0\u663e\u793a\u65f6key\u8d77\u7740\u6781\u5176\u91cd\u8981\u7684\u4f5c\u7528\u3002\n\n  2. \u5f53\u72b6\u6001\u4e2d\u7684\u6570\u636e\u53d1\u751f\u53d8\u5316\u65f6\uff0creact\u4f1a\u6839\u636e\u3010\u65b0\u6570\u636e\u3011\u751f\u6210\u3010\u65b0\u7684\u865a\u62dfDOM\u3011\n\n  3. \u968f\u540eReact\u8fdb\u884c\u3010\u65b0\u865a\u62dfDOM\u3011\u4e0e\u3010\u65e7\u865a\u62dfDOM\u3011\u7684diff\u6bd4\u8f83\uff0c\u6bd4\u8f83\u89c4\u5219\u5982\u4e0b\uff1a\n\n  a. \u65e7\u865a\u62dfDOM\u4e2d\u627e\u5230\u4e86\u4e0e\u65b0\u865a\u62dfDOM\u76f8\u540c\u7684key\uff1a\n              (1).\u82e5\u865a\u62dfDOM\u4e2d\u5185\u5bb9\u6ca1\u53d8, \u76f4\u63a5\u4f7f\u7528\u4e4b\u524d\u7684\u771f\u5b9eDOM\n              (2).\u82e5\u865a\u62dfDOM\u4e2d\u5185\u5bb9\u53d8\u4e86, \u5219\u751f\u6210\u65b0\u7684\u771f\u5b9eDOM\uff0c\u968f\u540e\u66ff\u6362\u6389\u9875\u9762\u4e2d\u4e4b\u524d\u7684\u771f\u5b9eDOM\n\n  b. \u65e7\u865a\u62dfDOM\u4e2d\u672a\u627e\u5230\u4e0e\u65b0\u865a\u62dfDOM\u76f8\u540c\u7684key\n              \u6839\u636e\u6570\u636e\u521b\u5efa\u65b0\u7684\u771f\u5b9eDOM\uff0c\u968f\u540e\u6e32\u67d3\u5230\u5230\u9875\u9762\n                  \n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"\u7528index\u4f5c\u4e3akey\u53ef\u80fd\u4f1a\u5f15\u53d1\u7684\u95ee\u9898\uff1a"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"  1. \u82e5\u5bf9\u6570\u636e\u8fdb\u884c\uff1a\u9006\u5e8f\u6dfb\u52a0\u3001\u9006\u5e8f\u5220\u9664\u7b49\u7834\u574f\u987a\u5e8f\u64cd\u4f5c:\n                  \u4f1a\u4ea7\u751f\u6ca1\u6709\u5fc5\u8981\u7684\u771f\u5b9eDOM\u66f4\u65b0 ==> \u754c\u9762\u6548\u679c\u6ca1\u95ee\u9898, \u4f46\u6548\u7387\u4f4e\u3002\n\n  2. \u5982\u679c\u7ed3\u6784\u4e2d\u8fd8\u5305\u542b\u8f93\u5165\u7c7b\u7684DOM\uff1a\n                  \u4f1a\u4ea7\u751f\u9519\u8befDOM\u66f4\u65b0 ==> \u754c\u9762\u6709\u95ee\u9898\u3002\n                  \n  3. \u6ce8\u610f\uff01\u5982\u679c\u4e0d\u5b58\u5728\u5bf9\u6570\u636e\u7684\u9006\u5e8f\u6dfb\u52a0\u3001\u9006\u5e8f\u5220\u9664\u7b49\u7834\u574f\u987a\u5e8f\u64cd\u4f5c\uff0c\n      \u4ec5\u7528\u4e8e\u6e32\u67d3\u5217\u8868\u7528\u4e8e\u5c55\u793a\uff0c\u4f7f\u7528index\u4f5c\u4e3akey\u662f\u6ca1\u6709\u95ee\u9898\u7684\u3002\n  \n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"\u5f00\u53d1\u4e2d\u5982\u4f55\u9009\u62e9key:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"  1. \u6700\u597d\u4f7f\u7528\u6bcf\u6761\u6570\u636e\u7684\u552f\u4e00\u6807\u8bc6\u4f5c\u4e3akey, \u6bd4\u5982id\u3001\u624b\u673a\u53f7\u3001\u8eab\u4efd\u8bc1\u53f7\u3001\u5b66\u53f7\u7b49\u552f\u4e00\u503c\u3002\n  2. \u5982\u679c\u786e\u5b9a\u53ea\u662f\u7b80\u5355\u7684\u5c55\u793a\u6570\u636e\uff0c\u7528index\u4e5f\u662f\u53ef\u4ee5\u7684\u3002\n")))))}d.isMDXComponent=!0}}]);