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

## 跳转链接两种方式
* 路由链接跳转
  * <Redirect to="/login"/>;
  * <Link to="/xxx">
  * 只适用于render方法中
* 编程式导航
  * this.props.history.replace('/');
  * this.props.history.push('/');
  * 适用于非render方法中，适用于事件回调函数中
* 切换路由组件只需要切换url地址就行

## 存储用户数据
* 内存存储
  * 缺点：刷新就没了
  * 优点：读/写速度快
* 本地持久化存储 localStorage
  * 缺点: 读/写速度慢
  * 优点：可以持久化存储数据

* 流程：
  * 登录成功，将用户数据存储在 内存 / 本地
  * Admin页面判断用户是否登录过
    * 先去内存中判断
      * 有
        * 直接使用
      * 没有
        * 访问本地
          * 有
            * 验证用户信息是否合法。通过存在内存中，在使用
            * 验证失败去登录页面
          * 没有
            * 去登录页面
  