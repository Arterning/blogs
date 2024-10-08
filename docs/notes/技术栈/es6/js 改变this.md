对于 `apply`、`call` 二者而言，作用完全一样，只是接受参数的方式不太一样。例如，有一个函数定义如下：

```
var func = function(arg1, arg2) {

};
```

就可以通过如下方式来调用：

```
func.call(this, arg1, arg2);
func.apply(this, [arg1, arg2])
```

```jsx
var a ={
        name : "Cherry",
        fn : function (a,b) {
            console.log( a + b)
        }
    }

var b = a.fn;
b.bind(a,1,2)()
```

bind()方法创建一个新的函数, 当被调用时，将其this关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。

所以我们可以看出，bind 是创建一个新的函数，我们必须要手动去调用：