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