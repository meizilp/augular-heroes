# 路由

## 创建路由模块

```sh
ng generate module app-routing --flat --module=app
```

* `--flat`声明把新创建的文件放在`src/app`目录
* `--module=app`告诉CLI把新创建的模块`AppRoutingModule`加入`AppModule`的`imports`数组中，建立引用关系
* 新创建了`src/app/app-routing.module.ts`文件，修改成以下这个样子：
    ```ts
    import { NgModule } from '@angular/core';

    @NgModule({
    })
    export class AppRoutingModule { }
    ```
    就通过`@NgModule`修饰符声明了一个Module。

## 在路由模块`src/app/app-routing.module.ts`中添加路由定义

```ts
import { Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent }
];

@NgModule({
})
export class AppRoutingModule { }
```

* 引入`Routes`符号
* 定义路由规则数组，每个元素描述了一条规则
* 每条规则中：`path`用于匹配浏览器地址栏中URL的字符串；`component`，当路径匹配时要创建的组件。

## 在路由模块`src/app/app-routing.module.ts`中初始化路由

```ts
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
```

* 引入`RouterModule`符号
* 调用`forRoot()`函数，因为我们现在是在为应用的顶级配置路由。

## 启用路由

1. 路由指令：通过`<router-outlet>`组件启用路由，此组件在`RouterModule`中由Angular定义。
2. 导出Angular路由模块： 在`AppRoutingModule`中导出`RouterModule`后，`AppModule`中也就因为导入了`AppRoutingModule`能够使用`RouterModule`了。
    ```ts
    @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule]
    })
    export class AppRoutingModule { }
    ```
3. 在要启用路由的页面加入`<router-outlet>`，此例中是APP组件`src/app/app.component.html`
    ```html
    <h1> {{ title }} </h1>
    <router-outlet></router-outlet>
    ```
    * 不再直接引用英雄列表组件，而是放上路由指令，根据路由不同加载不同内容，从而使得页面可以变化。
    * 修改之后页面上不显示英雄列表了，因为此时的URL是`/`不是`/heroes`，手动输入`/heroes`后可以看到列表又出现了。
4. 在APP组件的视图上加上`<a>`元素，指向要切换的路径，这样点击链接就可以了，不用手动在地址栏输入URL。
    ```html
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/heroes">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
    ```
    * `routerLink`指令是在`RouterModule`中由Angular提供的。
    * 通过`routerLink`指令来指向URL，这样当点击时切换只会更新路由组件，不会全页重新加载。
    * 如果指向的URL不存在，那么点击时，页面上不会有任何效果，只会在调试终端输出错误信息。

## 添加仪表盘页面

### 创建仪表盘组件

```sh
ng generate component dashboard
```

* 会创建`src/app/dashboard`目录
* 会创建`src/app/dashboard/dashboard.component.{ts,html,css,spec.ts}`四个组件文件
* 会修改`src/app/app.module.ts`增加仪表盘组件的声明

### 增加指向仪表盘的路由

### 设置默认路由

### 增加页面切换导航

## 导航到英雄详情

### 单独的英雄详情组件

### 参数化路由

### 参数化链接URL

`<a>`和`routerLink`的区别：页面重载区域不一样、参数？

### 从URL中提取参数

### 返回上级页面
