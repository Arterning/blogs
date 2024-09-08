"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6216],{224:(t,e,n)=>{n.d(e,{Zo:()=>l,kt:()=>m});var o=n(2374);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function d(t,e){if(null==t)return{};var n,o,r=function(t,e){if(null==t)return{};var n,o,r={},a=Object.keys(t);for(o=0;o<a.length;o++)n=a[o],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(o=0;o<a.length;o++)n=a[o],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var c=o.createContext({}),i=function(t){var e=o.useContext(c),n=e;return t&&(n="function"==typeof t?t(e):s(s({},e),t)),n},l=function(t){var e=i(t.components);return o.createElement(c.Provider,{value:e},t.children)},u="mdxType",p={inlineCode:"code",wrapper:function(t){var e=t.children;return o.createElement(o.Fragment,{},e)}},f=o.forwardRef((function(t,e){var n=t.components,r=t.mdxType,a=t.originalType,c=t.parentName,l=d(t,["components","mdxType","originalType","parentName"]),u=i(n),f=r,m=u["".concat(c,".").concat(f)]||u[f]||p[f]||a;return n?o.createElement(m,s(s({ref:e},l),{},{components:n})):o.createElement(m,s({ref:e},l))}));function m(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var a=n.length,s=new Array(a);s[0]=f;var d={};for(var c in e)hasOwnProperty.call(e,c)&&(d[c]=e[c]);d.originalType=t,d[u]="string"==typeof t?t:r,s[1]=d;for(var i=2;i<a;i++)s[i]=n[i];return o.createElement.apply(null,s)}return o.createElement.apply(null,n)}f.displayName="MDXCreateElement"},9109:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>c,contentTitle:()=>s,default:()=>p,frontMatter:()=>a,metadata:()=>d,toc:()=>i});var o=n(9963),r=(n(2374),n(224));const a={},s=void 0,d={unversionedId:"notes/\u6280\u672f\u6808/\u524d\u7aef/React/react with zustand",id:"notes/\u6280\u672f\u6808/\u524d\u7aef/React/react with zustand",title:"react with zustand",description:"Create store",source:"@site/docs/notes/\u6280\u672f\u6808/\u524d\u7aef/React/react with zustand.md",sourceDirName:"notes/\u6280\u672f\u6808/\u524d\u7aef/React",slug:"/notes/\u6280\u672f\u6808/\u524d\u7aef/React/react with zustand",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/\u524d\u7aef/React/react with zustand",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/notes/\u6280\u672f\u6808/\u524d\u7aef/React/react with zustand.md",tags:[],version:"current",frontMatter:{},sidebar:"notes",previous:{title:"react with redux",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/\u524d\u7aef/React/react with redux"},next:{title:"react \u7bad\u5934\u51fd\u6570\u548c\u666e\u901a\u51fd\u6570",permalink:"/blogs/docs/notes/\u6280\u672f\u6808/\u524d\u7aef/React/react \u7bad\u5934\u51fd\u6570\u548c\u666e\u901a\u51fd\u6570"}},c={},i=[],l={toc:i},u="wrapper";function p(t){let{components:e,...n}=t;return(0,r.kt)(u,(0,o.Z)({},l,n,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Create store"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import create from 'zustand';\n\ninterface Todo {\n    id: number;\n    text: string;\n    done: boolean;\n}\n\ninterface TodoStore {\n    todos: Todo[];\n    addTodo: (text: string) => void;\n    toggleTodo: (id: number) => void;\n}\n\n/**\n * set \u51fd\u6570\u662f Zustand \u63d0\u4f9b\u7684\u7528\u4e8e\u66f4\u65b0\u72b6\u6001\u7684\u65b9\u6cd5\n * \u6709\u70b9\u7c7b\u4f3cReact\u4e2d\u7684setState(state => state + 1)\n * \u5b83\u63a5\u53d7\u4e00\u4e2a\u56de\u8c03\u51fd\u6570\uff0c\u8fd9\u4e2a\u56de\u8c03\u51fd\u6570\u8fd4\u56de\u4e00\u4e2a\u63cf\u8ff0\u72b6\u6001\u53d8\u5316\u7684\u5bf9\u8c61\u3002\u4f7f\u7528\u8fd9\u4e2a\u51fd\u6570\uff0c\u4f60\u53ef\u4ee5\u5b9e\u73b0\u72b6\u6001\u7684\u66f4\u65b0\u548c\u7ba1\u7406\u3002\n */\nexport const useTodoStore = create<TodoStore>((set) => ({\n    todos: [],\n    addTodo: (text) => set((state) => ({todos: [...state.todos, {id: Date.now(), text, done: false}]})),\n    toggleTodo: (id) => set((state) => ({\n        todos: state.todos.map(todo => todo.id === id ? {\n            ...todo,\n            done: !todo.done\n        } : todo)\n    })),\n}));\n\n")),(0,r.kt)("p",null,"Use the store"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import { useTodoStore } from './store';\n\nfunction TodoApp() {\n    const todos = useTodoStore(state => state.todos);\n    const addTodo = useTodoStore(state => state.addTodo);\n    const toggleTodo = useTodoStore(state => state.toggleTodo);\n\n    const handleAddTodo = () => {\n        const text = prompt('Enter a new todo:');\n        if (text) {\n            addTodo(text);\n        }\n    };\n\n    return (\n        <div>\n            <button onClick={handleAddTodo}>Add Todo</button>\n            <ul>\n                {todos.map(todo => (\n                    <li key={todo.id} onClick={() => toggleTodo(todo.id)} style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>\n                        {todo.text}\n                    </li>\n                ))}\n            </ul>\n        </div>\n    );\n}\n\nexport default TodoApp;\n\n")))}p.isMDXComponent=!0}}]);