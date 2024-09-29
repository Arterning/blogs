
## npm 设置镜像

```bash
npm config set registry http://registry.npm.taobao.org
npm get registry 

##注意如果你换成淘宝镜像的话，会影响你发布模块，这时候需要换回npm官网的镜像
npm config set registry https://registry.npmjs.org
npm config delete proxy


yarn config set registry https://registry.npm.taobao.org -g
yarn config get registry
```


## set proxy 
建议最好不要这么干，设置国内镜像就足够了
```bash
yarn config set proxy  http://127.0.0.1:33210
yarn config set https-proxy http://127.0.0.1:33210
```



## **what is npm install packagename --save**

Some people use `--save` option when installing packages with `npm`. For example, it is common to see the following command:

```
npm install packagename --save

```

What does the `--save` option do? And why do some people never use it?

## **The Solution**

**npm** or **node package manager** is a package manager for node.

When you download a package using the `npm` command, it installs the packages in the `node_modules` folder **and** adds the installed module as a dependency in your `package.json` file.

Prior to [npm 5.0.0](https://blog.npmjs.org/post/161081169345/v500), npm installed the packages in `node_modules` but didn’t add them as a dependency by default.

If you wanted to save the module as a dependency in the `package.json` file, you had to do it using the `--save` or `-S` option.

As of npm 5.0.0, you no longer need to use this option. Now npm saves all installed packages as dependencies by default.

If you want to save a package as a development-only dependency, you can do so by using the `--save-dev` or `-D` flag.

A few other options are also available that allow you to control how a package is saved using `npm install`. You can read about them on the [official docs](https://docs.npmjs.com/cli/v8/commands/npm-install).


## 为什么你需要pnpm

在默认情况下，pnpm 会在全局保存每个包的单个副本，并通过符号链接来共享它们。这意味着，如果多个项目使用相同版本的 npm 包，pnpm 会尝试通过符号链接将这些包共享在一个位置，从而节省磁盘空间并提高效率。

这种方式与传统的 npm 和 yarn 不同，它们通常会在每个项目中分别保存每个包的副本，可能会占用更多的磁盘空间。

尽管 pnpm 的共享机制可以减少磁盘使用量，但需要注意以下几点：

1. **符号链接的限制：** 由于操作系统和文件系统的限制，符号链接不是在所有情况下都能正常工作。在某些情况下，特别是涉及一些构建工具或特殊的文件操作的软件包时，可能会遇到问题。

2. **潜在的兼容性问题：** 由于 pnpm 的共享机制与传统的包管理方式不同，一些依赖可能会有兼容性问题。尽管 pnpm 在处理大多数情况下都能正常工作，但偶尔可能会遇到一些特殊情况。

3. **工程设置：** pnpm 需要每个项目的配置文件来决定如何处理依赖。在某些情况下，这可能需要一些额外的配置工作。

总体而言，pnpm 的目标是在提供一种更加高效的依赖管理方式的同时，尽可能地减少磁盘使用。然而，使用 pnpm 时仍然需要谨慎，特别是在处理复杂的项目结构和依赖关系时，建议在小范围内进行测试以确保一切正常。

## npm 包安装失败“npm ERR！错误：EACCES：权限被拒绝

```bash
 pnpm config set unsafe-perm true
```

- https://github.com/microsoft/WSL/issues/14



## node的版本问题

如何解决 “0308010c:digital envelope routines::unsupported” 的错误
你至少有 3 种方法可以解决这个错误。我们将一个一个地看。任何一个都应该对你有用。

将 --openssl-legacy-provider 传递给 Webpack 或 CLI 工具
例如，在 React 应用程序中，你可以将 --openssl-legacy-provider 传递给启动脚本，如 "react-scripts --openssl-legacy-provider start"。

这应该就可以了。但是，如果这不能修复错误，那么就进行下一个修复。在许多情况下，它是有效的。

使用 Node JS  的 LTS 版本
考虑将你的 Node 版本降级到 16.16.0 或其他 LTS 版本。

目前，Node 的最新 LTS 版本是 18.12.1。你可以从 Node JS 官方网站下载它，或者使用 NVM 来安装它。


## 参考资料

- ****[微任务（Microtask）](https://zh.javascript.info/microtask-queue)****
- ****[事件循环：微任务和宏任务](https://zh.javascript.info/event-loop)****