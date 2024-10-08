js的浅拷贝非常简单

```jsx
let source = { a:1, b:2}
let target = {...source}
//上面这种写法等价于
let source = { a:1, b:2}
let target = Object.assign({}, source)
```

实际上就是java中用的非常多的 BeanUtil.copyProperties(source,target)

对象的扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷
贝到当前对象之中。

数组的扩展运算符可以将一个数组转为用逗号分隔的参数序列

函数参数的解构赋值

```jsx
function greet({ name, age }) {
  console.log(`Hello, ${name}! You are ${age} years old.`);
}

const person = { name: 'Alice', age: 25 };

greet(person);
// 输出：Hello, Alice! You are 25 years old.
```


浅拷贝

```jsx
// 浅拷贝函数封装
    function shallowCopy(obj1, obj2) {
      for(var key in obj1) {
        obj2[key] = obj1[key]
      }
    }
```

```jsx
let shallowCopy = function (obj) {
      // 只拷贝对象
      if (typeof obj !== 'object') return;
      // 根据obj的类型判断是新建一个数组还是对象
      let newObj = obj instanceof Array ? [] : {};
      // 遍历obj，并且判断是obj的属性才拷贝
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = obj[key];
        }
      }
      return newObj;
    }

```

如果对象内还有对象，则只能复制嵌套对象的地址，无法进行深层次的拷贝

深拷贝

```jsx
// 深拷贝函数封装
function deepCopy(obj) {
  // 根据obj的类型判断是新建一个数组还是对象
  let newObj = Array.isArray(obj)? [] : {};
  // 判断传入的obj存在，且类型为对象
  if (obj && typeof obj === 'object') {
    for(key in obj) {
      // 如果obj的子元素是对象，则进行递归操作
      if(obj[key] && typeof obj[key] ==='object') {
        newObj[key] = deepCopy(obj[key])
      } else {
      // // 如果obj的子元素不是对象，则直接赋值
        newObj[key] = obj[key]
      }
    }
  }
  return newObj // 返回新对象
}
```

```jsx
let deepCopy = function (obj) {
      // 只拷贝对象
      if (typeof obj !== 'object') return;
      // 根据obj的类型判断是新建一个数组还是对象
      let newObj = obj instanceof Array ? [] : {};
      // 遍历obj，并且判断是obj的属性才拷贝
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          // 如果obj的子属性是对象，则进行递归操作,否则直接赋值
          newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
      }
      return newObj;
    }

```

## **数组的浅拷贝** concat 和 slice

```jsx
let arr = ['one', 'two', 'three'];
let newArr = arr.concat();
newArr.push('four')

console.log(arr)    // ["one", "two", "three"]
console.log(newArr) // ["one", "two", "three", "four"]

```

## JSON.parse(JSON.stringify(arr)) 实现深拷贝

```jsx
//对象可以成功复制
let arr = {
      a: 'one', 
      b: 'two', 
      c: {
        name: 'Demi'
      }
    };

let newArr = JSON.parse( JSON.stringify(arr) );
newArr.c.name = 'dingFY'
console.log(arr);    // {a: "one", b: "two", c: {name: 'Demi'}}
console.log(newArr); // {a: "one", b: "two", c: {name: 'dingFY'}}

// 测试函数能否复制
let arr = {
  a: 'one', 
  b: ()=>{
    console.log('test')
  }
};

let newArr = JSON.parse( JSON.stringify(arr) );
console.log(arr);    // {a: "one", b: ()=>{console.log('test')}}
console.log(newArr); // {a: "one"} // 函数没有复制成功

```

## Object.assign()

Object.assign()方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。但是 Object.assign() 进行的是浅拷贝

```jsx
let arr = {
      a: 'one', 
      b: 'two', 
      c: 'three'
  };

let newArr = Object.assign({}, arr)
newArr.d = 'four'
console.log(arr);    // {a: "one", b: "two", c: "three"}
console.log(newArr); // {a: "one", b: "two", c: "three", d: "four"}

```
