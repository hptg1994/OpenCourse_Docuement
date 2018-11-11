# Node 原生项目，将所有的Node原生知识结合到一块做成一个项目

## Introduction

使用原生的Node工具

文件目录结构：

```markdown
root
│   README.md
│   server.js    
│
└───config
│   │   config.dev.js
│   │   config.prod.js
│   │	index.js
│   
└───libs
│   │   database.js
│
└───static
│   │   基础的前台文件结构
```

## 基本Flow

​	以server.js为入口点，当这个文件run起来后，里面的addRouter就会被调用，自动添加一些url，和与它们（url）相关的method（GET，POST…）和相对应的详细操作（DB）（所以现在在server中有两个addRoute即跑起来后会有两个route）


## 详细步骤

* HTTP端Server

  用原生的http包进行http.createServer 生成一个http server来处理request请求（参数request&response）

