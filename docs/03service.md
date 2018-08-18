# 服务

## 为什么需要服务？

组件应只聚焦于显示数据，不关注数据怎么来的（这样进行测试都会方便很多）。

* 服务可以用于获取数据
* 服务可以用于多个类之间通讯，类似于消息总线，多个类之间无需知道彼此
* 在Angular中是通过**依赖注入**机制创建服务的

## HeroService服务

用于提供英雄列表数据。

### 创建

```sh
ng generate service hero
```

* 会创建`src/app/hero.service.{.ts,.spec.ts}`两个文件
* 服务类的框架代码如下：
    ```ts
    import { Injectable } from '@angular/core';
    @Injectable({
      providedIn: 'root'
    })
    export class HeroService {
      constructor() { }
    }
    ```
    * `@Injectable` 修饰符表示后续这个服务是可注入的
    * `providedIn`字段的`root`值表示通过**根注入器**选择此`provider`。根注入器上的provider创建的是全局单一共享实例。

### 提供获取数据的接口

```ts
getHeroes(): Hero[] {
  return HEROES;
}
```

* 在`src/app/hero.sevice.ts`中定义获取数据的接口

### 使用服务

修改列表组件的代码：`src/app/heroes/heroes.component.ts`

* 导入服务：`import { HeroService } from '../hero.service';`
* 将原来`heroes`属性由定义改为声明`heroes: Hero[];`
* 导入`heroService`，通过构造函数指定需要这个类型的参数即可。
    ```ts
    constructor(hs: HeroService) {
      this.heroes = hs.getHeroes();
    }
    ```
    * 猜测（后面深入研究了依赖注入再改）：当这个组件被创建时，需要的参数类型已经在注入器上注册过，注入器找到对应的`provider`创建一个实例或者引用已经存在的实例，然后传给组件的构造函数。
    * 参数传过来的服务马上就可以使用了，但一般是把传过来的服务保存到私有属性，以便使用。并且一般不在构造函数中调用服务，而是在`ngOnInit()`中进行初始化，所以代码改成下面的样子：
      ```ts
      constructor(private heroService: HeroService) {
      }
      ngOnInit() {
        this.heroes = this.heroService.getHeroes();
      }
      ```
        * 通过ts语法，构造函数中声明属性，并用参数初始化此属性值。

此时再次编译工程，英雄列表再次可以正确运行了。

### 异步获取数据

通过网络获取数据更多的情况下是异步的，此处用RxJS库提供的`Observable`函数式编程来处理。

* 在服务`src/app/hero.service.ts`中返回`Observable`
    ```ts
    getHeroes(): Observable<Hero[]> {
      return of(HEROES);
    }
    ```
* 在列表组件`src/app/heroes/heroes.component.ts`中通过订阅接收事件，在事件处理的回调中获取值
    ```ts
    ngOnInit() {
      this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
    }
    ```
