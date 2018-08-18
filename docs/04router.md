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

1. 创建组件框架文件
    ```sh
    ng generate component dashboard
    ```
    * 会创建`src/app/dashboard`目录
    * 会创建`src/app/dashboard/dashboard.component.{ts,html,css,spec.ts}`四个组件文件
    * 会修改`src/app/app.module.ts`增加仪表盘组件的声明
2. 实现组件逻辑代码`src/app/dashboard/dashboard.component.ts`
    ```ts
    export class DashboardComponent implements OnInit {
      topHeroes: Hero[] = [];
      constructor(private heroService: HeroService) { }
      ngOnInit() {
        this.heroService.getHeroes()
          .subscribe(heroes => this.topHeroes = heroes.slice(0, 5));
      }
    }
    ```
    * 定义了一个属性`topHeroes`，只保存前5个
    * 通过依赖注入的`HeroService`来获取英雄
3. 实现组件视图`src/app/dashboard/dashboard.component.html`
    ```html
    <h3>Top Heroes</h3>
    <div class="grid grid-pad">
      <a *ngFor="let hero of topHeroes" class="col-1-4">
        <div class="module hero">
          <h4>{{hero.name}}</h4>
        </div>
      </a>
    </div>
    ```
    * 循环显示列表中所有的英雄

### 增加指向仪表盘的路由

1. 修改`src/app/app-routing.module.ts`:
    ```ts
    import { DashboardComponent } from './dashboard/dashboard.component';

    const routes: Routes = [
      { path: 'heroes', component: HeroesComponent },
      { path: 'dashboard', component: DashboardComponent }
    ];
    ```
2. 修改`src/app/app.component.html`增加指向仪表盘
    ```html
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/dashboard">Dashboard</a>
      <a routerLink="/heroes">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
    ```

### 设置默认路由

修改`src/app/app-routing.module.ts`，增加`path`为空时重定向，这样默认就打开仪表板路径了，浏览器地址栏中的URL会自动跳转。

```ts
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent }
];
```

## 导航到英雄详情

1. 在仪表盘点击某个英雄，会跳转到英雄详情页面
2. 在英雄列表点击某个英雄，会跳转到英雄详情页面
3. 直接在浏览器地址栏输入带有id的URL，会加载英雄详情页面

### 参数化路由

修改`src/app/app-routing.module.ts`，增加一条参数化路由：

```ts
{ path: 'detail/:id', component: HeroDetailComponent }
```

`:id`是个占位符，URL这个位置的值会作为参数传递到组件。

### 支持路由的英雄详情组件

以前父组件传递属性到详情组件，详情组件就显示英雄对象的详情，现在要改成详情组件被创建后获取是哪个路由创建的，然后提取参数，获取英雄对象，进行显示。

1. 修改`src/app/hero.service.ts`，增加函数`getHero()`支持通过id获取英雄对象。
    ```ts
    getHero(id: number): Observable<Hero> {
      return of(HEROES.find(hero => hero.id === id));
    }
    ```
2. 修改`src/app/hero-detail/hero-detail.component.ts`：
    ```ts
    import { ActivatedRoute } from '@angular/router';
    import { HeroService } from '../hero.service';

    constructor(private route: ActivatedRoute, private heroService: HeroService) { }
    ngOnInit() {
      const id = +this.route.snapshot.paramMap.get('id');
      this.heroService.getHero(id)
        .subscribe(hero => this.hero = hero);
    }
    ```
    * 导入2个服务符号，分别用于操作路由以及获取英雄对象。
    * 构造函数通过依赖注入获取两个服务的实例。
    * `ngOnInit`中`route.snapshot`在组件刚创建后抓取路由信息生成快照。
    * `ngOnInit`中`paramMap`是从URL中提取的路由参数值集合，通过参数名称就可以从这个集合获取到参数值。
    * `id = +`是利用`+`操作符把字符串转成数字。但如果字符串不合法就会是'NaN'。

### 指向详情的路由

* 仪表盘中指向英雄详情，修改`src/app/dashboard/dashboard.component.html`
    ```html
    <a *ngFor="let hero of topHeroes" class="col-1-4" routerLink="/detail/{{hero.id}}">
    ```
    增加了`routerLink`指令，并且指向的路由在生成的时候每个都不一样。
* 英雄列表中指向英雄详情，修改`src/app/heroes/heroes.component.html`
    ```html
    <ul class="heroes">
      <li *ngFor="let hero of heroes">
        <a routerLink="/detail/{{hero.id}}>
          <span class="badge">{{hero.id}}</span>{{hero.name}}
        </a>
      </li>
    </ul>
    ```
    每个列表项中放一个`<a>`元素，并且根据`hero.id`动态的生成路由。

### 返回上级页面

1. 修改`src/app/hero-detail/hero-detail.component.ts`，增加返回回调函数
    ```ts
    import { Location } from '@angular/common';
    constructor(private route: ActivatedRoute,
      private heroService: HeroService,
      private location: Location) { }
    goBack() {
      this.location.back()
    }
    ```
    * 导入`Location`符号
    * 构造函数通过依赖服务获取`Location`服务实例
    * 回调函数调用`back()`函数操作浏览器返回上一个URL
2. 修改`src/app/hero-detail/hero-detail.component.html`，增加返回按钮并绑定回调函数
    ```html
    <button (click)="goBack()">返回</button>
    ```

## 移除无用代码

1. 英雄列表视图中无用的英雄详情组件
2. 英雄列表中处理选中元素的逻辑代码

## 调试

1. Chrome浏览器，开发者工具界面`Sources`页
2. `top/webpack://./src`目录可以看到源代码，选中之后加断点就行了
