# 英雄编辑器

目标：创建一个显示英雄信息的组件

## 创建英雄列表组件

```sh
ng generate component heroes
```

此命令会：

1. 在`src/app`文件夹下面创建`heroes`目录。
2. 在`src/app/heroes`目录下面创建4个文件`heroes.component.{ts,html,css,spec.ts}`。
3. 在`src/app/app.module.ts`中声明`heroesComponent`。

### heroes.component.ts

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroName = 'WindStorm';
  heroId = 1;

  constructor() { }

  ngOnInit() {
  }

}
```

* `Component` 符号是从Angular核心库中导入的。
* `@Component` 是装饰器函数，用在组件类前面，为组件提供Angular所需要的元数据。
* 默认生成了3个元数据属性：
    * `selector` 属性定义了组件的选择器，网页中这个属性所定义的值对应的元素(此处是`<app-heroes>`)，用这个组件渲染。
    * `templateUrl` 组件模板文件(定义了组件长什么样子)的路径。
    * `styleUrls` 组件私有的样式表文件路径。
* `HeroesComponent`就是组件类，要`export`出去以便其他地方使用。
* `ngOnInit()` 当Angular创建完组件后就会调用，一般放一些初始化的逻辑。
* `heroName`和`heroId`是自定义的两个属性，在显示的时候会用到这两个属性值。

### heroes.component.html

```html
<div><span>id:</span>{{heroId}}</div>
<div><span>name:</span>{{heroName}}</div>
```

* 模板定义了组件的布局及内容。
* 通过双花括号语法绑定了组件类中定义的属性到组件视图中。

## 使用英雄列表组件

修改应用的主视图文件：`src/app/app.component.html`后重新编译工程就可以看到组件被加载了。

```html
<h1>
  {{ title }} <!-- 通过Angular的双花括号语法与组件的title属性绑定 -->
  <app-heroes></app-heroes> <!-- 和heroes组件代码装饰器中定义的元素选择器值一致 -->
</h1>
```

## 双向数据绑定

需求：提供一个输入框，可以编辑英雄的名字，并且输入框内容变化时，显示英雄名字的`div`内容自动变化。

1. 修改`src/app/heroes/heroes.component.html`，增加输入框，并和指定的组件属性建立双向数据绑定。
    ```html
    <div><span>id:</span>{{heroId}}</div>
    <div><span>name:</span>{{heroName}}</div>

    <div>
    <label>name:
        <input [(ngModel)]="heroName">
    </label>
    </div>
    ```
    [(ngModel)] 是Angular的双向数据绑定语法。这儿把`<input>`元素和组件的`heroName`属性绑定在了一起。当通过`<input>`元素输入内容时，`heroName`属性会跟着发生变化。
2. 修改`src/app/app.module.ts`导入FormsModule
    ```ts
    import { FormsModule } from '@angular/forms';

    @NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    })
    ```
    只有导入了`FormsModule`后，`[(ngModel)]`才能被使用。
