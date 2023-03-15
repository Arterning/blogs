# react base

## 创建虚拟DOM

使用原生JS创建虚拟DOM
```javascript
<script type="text/javascript" > 
    //1.创建虚拟DOM
    const VDOM = React.createElement('h1',{id:'title'},React.createElement('span',{},'Hello,React'))
    //2.渲染虚拟DOM到页面
    ReactDOM.render(VDOM,document.getElementById('test'))
</script>
```


使用JSX语法创建虚拟DOM
```javascript
	<script type="text/babel" > /* 此处一定要写babel */
		//1.创建虚拟DOM
		const VDOM = (  /* 此处一定不要写引号，因为不是字符串 */
			<h1 id="title">
				<span>Hello,React</span>
			</h1>
		)
		//2.渲染虚拟DOM到页面
		ReactDOM.render(VDOM,document.getElementById('test'))
	</script>
```


# 虚拟DOM的本质
1. 本质是Object类型的对象（一般对象）
2. 虚拟DOM比较“轻”，真实DOM比较“重”，因为虚拟DOM是React内部在用，无需真实DOM上那么多的属性。
3. 虚拟DOM最终会被React转化为真实DOM，呈现在页面上。

## JSX的语法规则
1. 定义虚拟DOM时，不要写引号。
2. 标签中混入JS表达式时要用{}。
3. 样式的类名指定不要用class，要用className。
4. 内联样式，要用style={{key:value}}的形式去写。
5. 只有一个根标签
6. 标签必须闭合
7. 标签首字母
(1).若小写字母开头，则将该标签转为html中同名元素，若html中无该标签对应的同名元素，则报错。
(2).若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错。

```javascript
const VDOM = (
			<div>
				<h2 className="title" id={myId.toLowerCase()}>
					<span style={{color:'white',fontSize:'29px'}}>{myData.toLowerCase()}</span>
				</h2>
				<h2 className="title" id={myId.toUpperCase()}>
					<span style={{color:'white',fontSize:'29px'}}>{myData.toLowerCase()}</span>
				</h2>
				<input type="text"/>
			</div>
		)
```


```javascript
const data = ['Angular','React','Vue']
//1.创建虚拟DOM
const VDOM = (
    <div>
        <h1>前端js框架列表</h1>
        <ul>
            {
                data.map((item,index)=>{
                    return <li key={index}>{item}</li>
                })
            }
        </ul>
    </div>
)
//2.渲染虚拟DOM到页面
ReactDOM.render(VDOM,document.getElementById('test'))
```

## 组件的State

状态(state)不可直接更改，必须通过调用setState更改
```javascript
class Weather extends React.Component{
			
        constructor(props){
            console.log('constructor');
            super(props)

            //初始化状态
            this.state = {isHot:false,wind:'微风'}
            this.changeWeather = this.changeWeather.bind(this)
        }

        render(){
            const {isHot,wind} = this.state
            return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
        }

		changeWeather() {
            console.log('changeWeather');
            const isHot = this.state.isHot
            this.setState({isHot:!isHot})
            console.log(this);
		}
}
```

state的简写方式

```javascript
class Weather extends React.Component{

    state = {isHot:false,wind:'微风'}

    render(){
        const {isHot,wind} = this.state
        return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
    }

    changeWeather = () => {
        const isHot = this.state.isHot
        this.setState({isHot:!isHot})
    }

}
```
在 React 中，箭头函数与普通函数的最大区别在于它们不绑定自己的 this 值，而是继承自其所在的作用域。因此，在 React 中，使用箭头函数定义的方法可以很方便地获取组件实例的 this 值，而无需手动绑定。

在传统的 JavaScript 中，this 的值是在函数被调用时确定的。如果函数被作为对象的方法调用，那么 this 就是该对象；如果函数不是作为对象的方法调用，那么 this 就是全局对象。为了确保 this 始终指向正确的对象，传统的 JavaScript 代码通常需要使用 bind()、call() 或 apply() 等方法手动绑定 this。

而在 React 中，组件方法的 this 值通常需要指向组件实例本身，以便在方法内部可以访问组件的状态和属性。使用箭头函数定义组件方法，可以避免手动绑定 this 的问题，从而使代码更加简洁易懂。

## props

``` javascript
class Person extends React.Component {

    //构造器是否接收props，取决于：是否希望在构造器中通过this访问props
    constructor(props){    
        super(props)
        console.log('constructor',this.props);
	}

    render(){
        const {name,age,sex} = this.props
        return (
            <ul>
                <li>姓名：{name}</li>
                <li>性别：{sex}</li>
                <li>年龄：{age+1}</li>
            </ul>
        )
    }
}

// set prop types
Person.propTypes = {
    name:PropTypes.string.isRequired,
    sex:PropTypes.string,
    age:PropTypes.number,
    speak:PropTypes.func,
}

// set default props
Person.defaultProps = {
    sex:'男',
    age:18
}
```

函数组件使用props

```javascript
function Person (props){
    const {name,age,sex} = props
    return (
        <ul>
            <li>姓名：{name}</li>
            <li>性别：{sex}</li>
            <li>年龄：{age}</li>
        </ul>
    )
}
```


## refs

```javascript
class Demo extends React.Component{
    //展示左侧输入框的数据
    showData = ()=>{
        const {input1} = this.refs
        alert(input1.value)
    }
    //展示右侧输入框的数据
    showData2 = ()=>{
        const {input2} = this.refs
        alert(input2.value)
    }
    render(){
        return(
            <div>
                <input ref="input1" type="text" placeholder="点击按钮提示数据"/>&nbsp;
                <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
                <input ref="input2" onBlur={this.showData2} type="text" placeholder="失去焦点提示数据"/>
            </div>
        )
    }
}
```

# 事件处理

```javascript
class Demo extends React.Component{
    
    //创建ref容器
    myRef = React.createRef()

    //展示左侧输入框的数据
    showData = (event)=>{
        console.log(event.target);
        alert(this.myRef.current.value);
    }

    //展示右侧输入框的数据
    showData2 = (event)=>{
        alert(event.target.value);
    }

    render(){
        return(
            <div>
                <input ref={this.myRef} type="text" placeholder="点击按钮提示数据"/>&nbsp;
                <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
                <input onBlur={this.showData2} type="text" placeholder="失去焦点提示数据"/>&nbsp;
            </div>
        )
    }
}
```

1. 通过onXxx属性指定事件处理函数(注意大小写)
* React使用的是自定义(合成)事件, 而不是使用的原生DOM事件, 为了更好的兼容性
* React中的事件是通过事件委托方式处理的(委托给组件最外层的元素), 为了的高效
2. 通过event.target得到发生事件的DOM元素对象, 不要过度使用ref
        

# 受控组件和非受控组件


受控组件，表单的内容存放在state中

```javascript
class Login extends React.Component{
    //初始化状态
    state = {
        username:'', //用户名
        password:'' //密码
    }

    saveUsername = (event)=>{
        this.setState({username:event.target.value})
    }

    savePassword = (event)=>{
        this.setState({password:event.target.value})
    }

    handleSubmit = (event)=>{
        event.preventDefault() //阻止表单提交
        const {username,password} = this.state
        alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                用户名：<input onChange={this.saveUsername} type="text" name="username"/>
                密码：<input onChange={this.savePassword} type="password" name="password"/>
                <button>登录</button>
            </form>
        )
    }
}
```


非受控组件

表单的内容并没有存放在state中

```javascript
class Login extends React.Component{
    handleSubmit = (event)=>{
        event.preventDefault() //阻止表单提交
        const {username,password} = this
        alert(`你输入的用户名是：${username.value},你输入的密码是：${password.value}`)
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                用户名：<input ref={c => this.username = c} type="text" name="username"/>
                密码：<input ref={c => this.password = c} type="password" name="password"/>
                <button>登录</button>
            </form>
        )
    }
}
```

