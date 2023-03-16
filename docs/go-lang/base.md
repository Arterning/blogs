# go base

## go run main.go
当你使用 go run main.go 命令执行 Go 程序时，Go 语言的编译器将会把代码编译成可执行的机器码，然后在内存中执行这个程序。在这种情况下，没有生成任何可执行文件，也不会在磁盘上生成任何文件。

如果你想生成可执行文件，可以使用 go build 命令，该命令会生成一个名为 main 的可执行文件，并将其存储在当前目录下。

例如：

go build main.go

这样，你就可以在当前目录下找到一个可执行文件 main，可以使用该文件执行你的程序。


## go get
go get 是 Go 语言的命令行工具，用于下载、编译、安装和管理 Go 语言的依赖包。它的主要功能是：

下载指定的 Go 语言包并将其存储在 $GOPATH/src 目录中。编译该包及其依赖包。

安装该包及其依赖包的可执行文件到 $GOPATH/bin 目录中。

使用方法很简单，只需在命令行中输入以下命令：

``` go
go get <package-name>
go get github.com/golang/example
```
这样，Go 就会下载、编译、安装 github.com/golang/example 包。你也可以使用 -u 参数来更新已经安装的包：


## go install 

用于编译并安装 Go 程序。它的作用是：

编译指定的包，并生成相应的二进制文件。

将编译好的二进制文件安装到 Go 的工作环境中。

这个有点类似于maven install

当执行 go install 命令时，默认情况下，它会编译和安装当前项目中的代码，并将二进制文件安装到 $GOPATH/bin 目录中。如果要编译指定的包，可以在命令行中指定该包的路径。

例如：

```go
go install github.com/myusername/mypackage
```

这样，Go 就会编译 mypackage 包，并将二进制文件安装到 $GOPATH/bin 目录中。安装完成后，您就可以在命令行中运行该程序了。

## go mod
Go 语言提供了许多 go mod 命令来管理 Go 的模块（包）依赖关系。下面是一些常见的 go mod 命令：

go mod init：初始化当前目录为 Go 模块，并生成一个名为 go.mod 的文件，该文件记录了该模块所依赖的其他模块的版本信息。

go mod tidy：整理当前模块的依赖关系，仅保留已经使用的模块。

go mod download：下载当前模块所依赖的所有模块。

go mod edit：打开 go.mod 文件并允许用户编辑。

go mod graph：显示当前模块的依赖图。

go mod vendor：将当前模块的所有依赖模块复制到 vendor 目录中。

go mod verify：验证当前模块所依赖的模块是否可用。

这些命令只是 Go 的 go mod 命令的一小部分，更多命令可以通过在命令行中键入 go help mod 获得帮助。

## go install 和 go mod install
go install 命令后面需要跟上对应的包名 
go mod install 则是读取 go.mod 文件依赖信息， 相当于 maven install，所以go mod install 用的更多