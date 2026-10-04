要创建一个使用 Python 3.12 的项目：

```bash
uv init --python 3.12 my-project
```

这个命令会在创建项目时同时生成 `.python-version` 文件，记录指定的版本。

### 指定 Python 版本的几种方式

**方式一：`uv init` 时直接指定**

```bash
uv init --python 3.11.6 my-project
```

`--python` 接受多种版本请求格式，包括精确版本号（如 `3.12.3`）、版本范围（如 `>=3.11,<3.13`）以及具体的实现（如 `cpython` 或 `pypy`）。

**方式二：先创建项目，再用 `uv python pin` 固定**

如果你已经有一个项目目录，或者想更精细地控制版本，可以进入项目目录后执行：

```bash
cd my-project
uv python pin 3.11.6
```

这会在当前目录创建 `.python-version` 文件，锁定项目使用的 Python 版本。`.python-version` 文件的好处是可以随项目一起提交到版本控制，确保团队其他成员 `uv sync` 时自动使用相同的 Python 版本。

**一个常见的坑**：如果你的 `uv` 是通过 `pip install uv` 安装的，它可能会依赖你系统当前的 Python 版本。当 `uv init --python` 请求的版本与安装 `uv` 的 Python 版本不一致时，可能会遇到解析冲突。推荐使用官方安装脚本（curl 或 PowerShell）全局安装 `uv`，而不是通过 pip。

### uv 常用命令梳理

uv 的命令按功能可以分为几个大类。

**项目管理**（围绕 `pyproject.toml` 和锁文件）：

| 命令 | 作用 |
|---|---|
| `uv init` | 创建新项目，生成 `pyproject.toml`、`.python-version` 等 |
| `uv add` | 添加依赖（自动更新 `pyproject.toml` 和 `uv.lock`） |
| `uv remove` | 移除依赖 |
| `uv sync` | 根据锁文件同步虚拟环境 |
| `uv lock` | 更新锁文件 `uv.lock` |
| `uv run` | 在项目环境中运行命令或脚本 |
| `uv tree` | 查看依赖树 |
| `uv build` | 构建源码分发包或 wheel |
| `uv publish` | 发布包到索引 |

**Python 版本管理**：

| 命令 | 作用 |
|---|---|
| `uv python install` | 安装指定 Python 版本（uv 托管安装） |
| `uv python list` | 列出可用和已安装的 Python 版本 |
| `uv python find` | 查找匹配的 Python 解释器路径 |
| `uv python pin` | 为当前项目固定 Python 版本 |
| `uv python uninstall` | 卸载 uv 托管的 Python 版本 |

**工具运行**（类似 `pipx`）：

| 命令 | 作用 |
|---|---|
| `uvx` / `uv tool run` | 在临时隔离环境中运行工具（如 `uvx ruff`） |
| `uv tool install` | 全局安装工具 |
| `uv tool list` | 列出已安装的工具 |

**pip 兼容接口**（用于遗留工作流或需要精细控制的场景）：

| 命令 | 作用 |
|---|---|
| `uv venv` | 创建虚拟环境（替代 `python -m venv`） |
| `uv pip install` | 安装包（替代 `pip install`） |
| `uv pip compile` | 编译 requirements 文件（替代 `pip-compile`） |
| `uv pip sync` | 按锁文件同步环境（替代 `pip-sync`） |
| `uv pip list` / `uv pip freeze` | 列出已安装的包 |

**实用工具**：

| 命令 | 作用 |
|---|---|
| `uv cache clean` | 清理缓存 |
| `uv cache dir` | 显示缓存目录路径 |
| `uv self update` | 更新 uv 自身 |