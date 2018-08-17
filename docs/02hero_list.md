# 显示英雄列表

## 定义模拟数据

修改`src/app/heroes/heroes.component.ts`

1. 定义一个接口描述英雄对象的结构
    ```ts
    interface Hero {
        id: number;
        name: string;
    }
    ```
2. 定义一个数组模拟英雄数据
    ```ts
    const HEROES: Hero[] = [
        { id: 10, name: 'Mr. Ten' }
        { id: 11, name: 'Mr. Eleven' },
        { id: 12, name: 'Mr. Twelve' },
        { id: 13, name: 'Mr. Thirteen' },
        { id: 14, name: 'Mr. Fourteen' },
        { id: 15, name: 'Mr. Fifteen' },
        { id: 16, name: 'Mr. Sixteen' },
        { id: 17, name: 'Mr. Seventeen' },
        { id: 18, name: 'Mr. Eighteen' },
        { id: 19, name: 'Mr. Nineteen' },
    ];
    ```
3. 在组件类中定义一个`heroes`属性，提供给组件视图访问
    ```ts
    export class HeroesComponent implements OnInit {
        heroes = HEROES;
        constructor() { }
        ngOnInit() {
        }
    }
    ```

## 通过列表显示

修改`src/app/heroes/heroes.component.html`

```html
<ul>
  <li *ngFor="let hero of heroes">
    <span>{{hero.id}}</span>{{hero.name}}
  </li>
</ul>
```

* 通过`*ngFor`指令遍历数组中的元素，并生成多个宿主元素（此处是`<li>`）。
* `heroes`是组件中定义的属性。
* `hero`是每次迭代时的临时变量。

## 增加组件样式

1. 修改`src/app/heroes/heroes.component.css`，定义样式
2. 修改`src/app/heroes/heroes.component.html`，为元素增加CSS样式
    ```html
    <ul class="heroes">
        <li *ngFor="let hero of heroes">
            <span class="badge">{{hero.id}}</span>{{hero.name}}
        </li>
    </ul>
    ```

## 响应点击事件

1. 在`src/app/heroes/heroes.component.ts`定义事件响应函数
    ```ts
    selectedHero: Hero;

    onSelect(hero: Hero) {
        this.selectedHero = hero;
    }
    ```
    * 定义属性`selectedHero`保存点击事件回调函数传递过来的值。
    * 定义函数`onSelect()`用于绑定事件。
2. 修改`src/app/heroes/heroes.component.html`中的`<li>`，绑定事件响应函数到元素
    ```html
    <li *ngFor="let hero of heroes" (click)="onSelect(hero)">
    ```
    `(click)`语法绑定`onSelect()`响应宿主元素的点击事件，通过参数把值传递过去。
3. 修改`src/app/heroes/heroes.component.html`，增加元素详情的显示
    ```html
    <div *ngIf="selectedHero">
        <h2>{{selectedHero.name}}'s Details</h2>
        <div><span>id: </span>{{selectedHero.id}}</div>
        <div>
            <label>name:
                <input [(ngModel)]="selectedHero.name">
            </label>
        </div>
    </div>
    ```
    * 当点击元素时，回调函数被执行，修改组件的`selectedHero`属性
    * 通过双向绑定，视图中的HTML元素内容发生变化
    * 当没有选中任何列表元素时，`selectedHero`为`undefined`，所以用`*ngIf`指令来判断，值存在时才显示详情，否则会运行出错。(`*ngIf`注意大小写)
4. 动态修改`<li>`的样式，高亮选中元素
    ```html
    <li *ngFor="let hero of heroes"  
        (click)="onSelect(hero)"  
        [class.selected]="hero === selectedHero"></li>
    ```
    Angular可以动态的为元素添加或者删除CSS类，绑定或移除单个CSS类的语法是`[class.类名]="条件"`，当条件成立时就会为这个元素绑定这个类。
