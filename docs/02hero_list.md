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
