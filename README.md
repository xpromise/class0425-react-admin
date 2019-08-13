# React后台管理项目
## git操作
* 创建脚手架项目
  * create-react-app xxx
  * 对里面内容进行修改（删除不要的内容）
  * 进行本地版本控制
    * git add .
    * git commit -m 'xxx'
* 创建远程仓库
* 本地仓库和远程仓库关联起来
  * git remote add origin xxx
* 将本地代码提交到远程仓库保管
  * git push -u origin master
* 本地开发需要新建dev分支
  * git checkout -b dev
* dev开发完提交
  * git add .
  * git commit -m 'xxx'
  * git push origin dev
* 全部开发完了，合并分支到master
  * 切换到master  git checkout master
  * 合并dev分支 git merge dev

* 要使用老师仓库
  * git clone xxx
* 只有master，需要dev
  * git fetch origin dev:dev  
  
## 开发流程
1. 配置antd  
2. 配置react-router-dom
  * 在App组件中使用BrowserRouter
3. 配置详细路由
  * /login
  * / 
    * /home
    * /category
    * ....
4. 实现login静态组件

## 服务器代理
* 问题：开发发送ajax请求遇到跨域    
* 解决: proxy 代理
* 原理：
  * 产生跨域的原因：浏览器会进行同源策略（协议名、域名、端口号）的检查
  * 浏览器和服务器通信会有跨域问题，但服务器和服务器之间通信是没有跨域问题
  * 浏览器的请求发送请求到代理服务器(3000)上，代理服务器将请求转发到目标服务器(5000)
  * 当代理服务器(3000)接收到目标服务器(5000)响应结果时，会将这个结果返回给浏览器
* 正向代理：隐藏真实的客户端
* 反向代理：隐藏真实的服务端
* 注意：
  * 只能用于开发阶段，不能用于生产上线
