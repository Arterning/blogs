# PowerShell 常用速查

> 环境：Windows PowerShell 5.1（Win10/11 自带）。Cmdlet 命名规范：动名词（动词-名词），如 `Get-Item`。别名见各节。

## 帮助与命令发现

```powershell
Get-Help Get-Process        # 查看帮助（-Detailed 更详细）
Get-Help Get-Process -Examples
Get-Command -Name *process* # 模糊搜索命令
Get-Command -CommandType Cmdlet -Verb Get
alias                       # 查看所有别名
Get-Alias ls                # 某个别名指向哪个命令
```

## 别名对照表

| CMD/Linux | PowerShell |
| --- | --- |
| `dir` / `ls` | `Get-ChildItem` |
| `cd` | `Set-Location` |
| `cat` | `Get-Content` |
| `echo` | `Write-Output` |
| `type` | `Get-Content` |
| `cls` / `clear` | `Clear-Host` |
| `pwd` | `Get-Location` |
| `rm` / `del` | `Remove-Item` |
| `cp` / `copy` | `Copy-Item` |
| `mv` / `move` | `Move-Item` |
| `mkdir` | `New-Item -ItemType Directory` |
| `ps` | `Get-Process` |
| `kill` | `Stop-Process` |
| `curl`（歧义） | `Invoke-WebRequest` |
| `grep`（近似） | `Select-String` / `Where-Object` |

> PowerShell 中 `curl` 是 `Invoke-WebRequest` 的别名，调真正的 curl 用 `curl.exe`。

## 管道与对象

PowerShell 的管道传输的是**对象**而非文本，这是和 CMD/Linux shell 的核心区别。

```powershell
Get-Process | Where-Object { $_.CPU -gt 10 }          # 过滤（$_.成员）
Get-Process | Sort-Object WorkingSet64 -Descending | Select-Object -First 5   # 排序取前 5
Get-Process | Select-Object Name, ProcessId | Export-Csv procs.csv -NoTypeInformation   # 存 CSV
Get-Service | Format-Table -AutoSize
Get-ChildItem D:\ -Recurse -ErrorAction SilentlyContinue | Select FullName, Length
# 计数 / 统计
Get-Process | Measure-Object CPU -Sum
```

常用内置属性（`$_`）特殊写法：`$PSItem` 同 `$_`。

## 文本处理

```powershell
Get-Content file.txt | Select-String "error"            # 搜索，近似 grep
Get-Content file.txt | Select-String error -Context 2   # 前后各 2 行
Get-Content -Tail 100 app.log                           # 尾部 100 行（近似 tail）
Get-Content -Wait app.log                               # 实时跟踪（近似 tail -f）
Select-String -Path *.log -Pattern "^2024-.*ERROR"      # 全文件正则
$content = Get-Content file.txt                         # 存入变量
Set-Content file.txt -Value $content -Encoding UTF8     # 写回（注意编码）
```

## 变量与类型

```powershell
$name = "world"                     # 变量
$count = @(Get-Process).Count       # 数组元素个数
$list = 1..10                       # 数组
$hash = @{ name = "nginx"; port = 80 }  # 哈希表
"hello $name"                       # 插值（双引号）
'hello $name'                       # 原样输出（单引号）
$env:PATH                           # 环境变量
$HOME, $PWD, $PSHOME                # 内置变量
```

类型转换：

```powershell
[int]$port = "80"
[datetime]"2024-01-01 10:00"
$obj = [PSCustomObject]@{ Name = "a"; Size = 100 }   # 自定义对象
```

## 流程控制

```powershell
if ($x -gt 10) { ... } elseif ($x -eq 10) { ... } else { ... }
foreach ($f in Get-ChildItem *.txt) { Write-Output $f.Name }
foreach ($i in 1..10) { ... }
while ($true) { ... }               # 死循环用 break 跳出
switch ($x) { 1 { "one" } default { "other" } }
```

比较运算符：`-eq -ne -gt -ge -lt -le -like -match`（大小写不敏感默认，加 `c` 前缀区分：`-ceq`）。

## 函数与脚本

```powershell
function Backup([string]$src, [string]$dst) {
    robocopy $src $dst /E /R:1 /W:1
    return $LASTEXITCODE
}
Backup -src "C:\data" -dst "D:\backup"

# 脚本参数
param([Parameter(Mandatory=$true)][string]$Server, [int]$Port = 22)
# 运行脚本： .\script.ps1 -Server x
```

脚本执行策略（第一次报「禁止运行脚本」）：

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned   # 允许本地脚本
Get-ExecutionPolicy
```

## 错误处理

```powershell
$ErrorActionPreference = "Stop"           # 遇错误即停
try {
    Get-Item "C:\nofile"
} catch {
    Write-Host "出错：$_"
} finally {
    Write-Host "完成"
}
# 忽略错误继续
Get-ChildItem C:\ -Recurse -ErrorAction SilentlyContinue
```

## 远程执行（WinRM）

```powershell
# 需先启用 WinRM：Enable-PSRemoting（管理员）
Invoke-Command -ComputerName server01 -ScriptBlock { Get-Process }
Invoke-Command -ComputerName server01 -Credential (Get-Credential) -FilePath .\deploy.ps1
New-PSSession server01; Enter-PSSession server01      # 交互式远程会话
```

## 输出与日志

```powershell
Write-Host "带颜色：$(...)"; Write-Host "警告" -ForegroundColor Yellow
$output | Out-File result.txt -Encoding UTF8
$output | Export-Csv data.csv -NoTypeInformation
Start-Transcript -Path run.log        # 记录整个会话日志
Stop-Transcript
```

## 常用系统管理快捷操作

```powershell
# 服务 / 进程 / 网络见各篇
Get-NetIPAddress | Where-Object AddressFamily -eq IPv4
Test-NetConnection host -Port 443
Get-Service | Where-Object Status -eq Stopped
Restart-Computer
Get-ScheduledTask
```

## 每天用得最多的 20 条

```powershell
Get-ChildItem -Recurse file | Measure-Object Length -Sum          # 目录大小
Get-ChildItem -Force -Recurse | Where-Object Length -gt 100MB     # 找大文件
Get-Content run.log -Tail 50 -Wait                                # 跟日志
Select-String -Path run.log -Pattern "ERROR"                      # 查错误
Get-Process | Sort-Object CPU -Descending | Select -First 5       # TOP CPU
Get-Process | Sort-Object WorkingSet64 -Descending | Select -First 5   # TOP 内存
Get-NetTCPConnection -State Listen                                # 监听端口
Test-NetConnection 10.0.0.5 -Port 8080                            # 端口是否通
Get-WinEvent -LogName System -MaxEvents 100 | Where-Object Level -eq 2   # 系统错误
Get-CimInstance Win32_OperatingSystem | Select Caption, BuildNumber
Get-Command xxx | Select Source                                   # 命令在哪
(Get-Content f.csv).Count                                         # 行数
Get-Unique via sort: Get-Content f.txt | Sort-Object | Select-Object -Unique
Set-Service nginx -StartupType Automatic                          # 自启
Restart-Service nginx
Copy-Item -Recurse -Force D:\a D:\b
Remove-Item -Recurse -Force C:\tmp\*                             # 清理目录
New-Item -ItemType Directory -Force D:\logs
[System.Net.Dns]::GetHostAddresses("baidu.com")                   # DNS 解析
Start-Job { 长时间任务 }  ; Receive-Job -Wait JobId              # 后台任务
```