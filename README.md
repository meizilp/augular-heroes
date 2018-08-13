# AngularHeroes 学习项目

## 环境安装及配置

### NodeJS 安装及配置

1. 下载：从 <https://nodejs.org> 下载最新版本后安装。
2. 配置registry，用于加速npm安装包时的速度。
    ```sh
    npm config set registry "https://registry.npm.taobao.org"
    ```
    * 配置之后可以通过`npm config ls`确认是否保存。
    * 整个项目所有人都要配置一样的registry，否则package-lock.json文件会因为url冲突不停的合并失败。
3. 升级npm版本。
    ```sh
    npm i npm -g
    ```
    如果以前全局安装过旧版本的`npm`，有可能会陷入旧版本的`npm`无法执行导致无法下载新版本`npm`的死循环。  
    此时删除`C:\Users\Administrator\AppData\Roaming\npm\node_modules\npm`就可以用第一步最新安装的`node`自带的`npm`来下载最新版本的`npm`(路径跟用户名有关)。
4. 有些时候某些包需要下载预编译的二进制包，此时网站可能访问不到，需要挂代理。在执行命令时带上参数`--proxy "http://127.0.0.1:1080"`即可。

### TypeScript 安装及配置

```sh
npm i typescript -g
tsc -v
```

### Angular 安装及配置

```sh
npm i -g @angular/cli
```

### Git 安装及配置

1. 在 <https://git-scm.com/download/win> 下载最新版本Git并安装。
2. 配置git的用户信息，用户名和邮件地址改成自己的。
    ```sh
    git config --global user.name "John Doe"
    git config --global user.email johndoe@example.com
    ```
3. 配置git记住仓库的密码，向远程推送时这样就只要输入一次密码就可以了。
    ```sh
    git config --global credential.helper wincred
    ```

## 创建项目

### 创建Angular项目

```sh
ng new angular-heroes
```

### 在Github上创建代码仓库并关联

1. 登录 <https://github.com/> 创建一个新的项目
2. 关联已有的代码到此项目
    ```sh
    cd angular-heroes
    git init
    git remote add origin https://github.com/meizilp/augular-heroes.git
    git push -u origin master
    ```
    最后一步需要输入github的账户名和密码。

## 运行

`ng serve -o`

## Git版本管理

```sh
git init
git remote add origin https://github.com/meizilp/augular-heroes.git
git push -u origin master
```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
