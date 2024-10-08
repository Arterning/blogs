
### **v-on:click 等于 @click**

```
<div v-on:click=...>

```

等同于

```
<div @click=...>

```

### **v-bind:xx 等于 :xx**

```
<option v-bind:value="1">...

```

等于

```
<option :value="1">...
```

循环

```
<tr v-for="blog in blogs">
  <td >{{blog.title }}</td>
</tr>
```

判断

```
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

## **v-if 与 v-for 的优先级**

当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级。



## vue中v-bind和v-model的区别？

1. `v-bind`用来绑定数据和属性以及表达式，缩写为'`：`'
2. `v-mode`使用在表单中，实现双向数据绑定的，在表单元素外使用不起作用

Vue中有2种数据绑定的方式： 1.单向绑定(v-bind)：数据只能从data流向页面。 2.双向绑定(v-model)：数据不仅能从data流向页面，还可以从页面流向data。 备注： 1.双向绑定一般都应用在表单类元素上（如：input、select等） 2.v-model:value 可以简写为 v-model，因为v-model默认收集的就是value值。