## 一.移动端web新增touch事件

随着触屏设备的普及，w3c为移动端web新增了touch事件。

最基本的touch事件包括4个事件：

- touchstart

  当在屏幕上按下手指时触发

- touchmove

  当在屏幕上移动手指时触发

- touchend

  当在屏幕上抬起手指时触发

- touchcancel

  当一些更高级别的事件发生的时候（如电话接入或者弹出信息）会取消当前的touch操作，即触发touchcancel。一般会在touchcancel时暂停游戏、存档等操作。

## 二.相关知识详解

 与移动端相关的`interface`主要有三个：

1. TouchEvent

   **表示触摸状态发生改变时触发的event**

2. Touch

   **表示用户和触屏设备之间接触时单独的交互点(a single point of contact)**

3. TouchList

   **表示一组touches。当发生多点触摸的时候才用的到。**

## 2.1、TouchEvent详解

 为了区别触摸相关的状态改变，存在多种类型的触摸事件。可以通过检查触摸事件的 `TouchEvent.type` 属性来确定当前事件属于哪种类型。

 **注意:在很多情况下，触摸事件和鼠标事件会同时被触发（目的是让没有对触摸设备优化的代码仍然可以在触摸设备上正常工作）。如果你使用了触摸事件，可以调用 event.preventDefault()来阻止鼠标事件被触发。**

```
var i = 1;
var box = document.querySelector("div");
var ps = document.querySelectorAll("p");
box.addEventListener("touchstart", function (e){
   ps[0].innerHTML = e.type + i++;
})
box.addEventListener("touchmove", function (e){
   ps[1].innerHTML = e.type + i++;
})
box.addEventListener("touchend", function (e){
   ps[2].innerHTML = e.type + i++;
})123456789101112
```

### 2.1.1 touchstart

 当用户手指触摸到的触摸屏的时候触发。事件对象的 `target` 就是`touch` 发生位置的那个元素。

```
<div>
    <p></p>
</div>
<script>
    var i = 1;
    var box = document.querySelector("div");
    var p = document.querySelector("p");
    box.addEventListener("touchstart", function (e){
        p.innerHTML = e.target.tagName + ", " + i++;    //  P
    })

</script>123456789101112
```

![img](http://o7cqr8cfk.bkt.clouddn.com/17-5-29/84106584.jpg)

### 2.1.2 touchmove

 当用户在触摸屏上移动触点(手指)的时候，触发这个事件。一定是先要触发`touchstart`事件，再有可能触发 `touchmove` 事件。

 `touchmove` 事件的`target` 与最先触发的 `touchstart` 的 `target` 保持一致。`touchmove`事件和鼠标的`mousemove`事件一样都会多次重复调用，所以，事件处理时不能有太多耗时操作。不同的设备，移动同样的距离 `touchmove` 事件的触发频率是不同的。

 有一点需要注意：即使手指移出了 原来的`target` 元素，则 `touchmove` 仍然会被一直触发，而且 `target` 仍然是原来的 `target` 元素。

```
<div>
    <p></p>
</div>
<script>
    var i = 1;
    var box = document.querySelector("div");
    var p = document.querySelector("p");
    box.addEventListener("touchmove", function (e){
        p.innerHTML = e.target.tagName + ", " + i++;
    })
</script>1234567891011
```

![img](http://o7cqr8cfk.bkt.clouddn.com/17-5-29/90255570.jpg)

### 2.1.3 touchend

 当用户的手指抬起的时候，会触发 `touchend` 事件。如何用户的手指从触屏设备的边缘移出了触屏设备，也会触发 `touchend` 事件。

 `touchend` 事件的 `target` 也是与 `touchstart` 的 `target` 一致，即使已经移出了元素。

### 2.1.4 touchcancel

 当触点由于某些原因被中断时触发。有几种可能的原因如下(具体的原因根据不同的设备和浏览器有所不同):

- 由于某个事件取消了触摸：例如触摸过程被一个模态的弹出框打断。
- 触点离开了文档窗口，而进入了浏览器的界面元素、插件或者其他外部内容区域。
- 当用户产生的触点个数超过了设备支持的个数，从而导致 `TouchList` 中最早的 `Touch`对象被取消

**touchcancel 事件一般用于保存现场数据。比如：正在玩游戏，如果发生了 touchcancel 事件，则应该把游戏当前状态相关的一些数据保存起来。**

## 2.2 TouchList详解

 一个TouchList代表一个触摸屏幕上所有触点的列表。

 举例来讲, 如果一个用户用三根手指接触屏幕(或者触控板), 与之相关的`TouchList` 对于每根手指都会生成一个 `Touch`对象, 共计 3 个.

> TouchList有1个属性，2个方法

1. 只读属性：`length`

   返回这个`TouchList`中`Touch`对的个数。(就是有几个手指接触到了屏幕)

2. 方法：`identifiedTouch()`

   返回值是在`TouchList`中的第 1 个 `Touch` 对象，已经被标记为过时，虽然有的浏览器还可以使用，但是不建议使用。

3. 方法：`item(index)`

   返回`TouchList`中指定索引的`Touch`对象。

> 想获取 `TouchList`对象，`TouchEvent` 的三个属性可以获取到 `TouchList`:

1. `changedTouches`:(只读)

   这个 `TouchList`对象列出了和这个触摸事件对应的那些**发生了变化的 Touch 对象**。

   - 对于 `touchstart` 事件, 这个 `TouchList` 对象列出在此次事件中新增加的触点。
   - 对于 `touchmove 事件，列出和上一次事件相比较，发生了变化的触点。`
   - 对于 touchend 列出离开触摸平面的触点（这些触点对应已经不接触触摸平面的手指）

2. `targetTouches`:(只读)

   这个`TouchList`列出了那些 `touchstart`发生在这个元素，并且还没有离开 `touch surface` 的`touch point`(手指)。是`touches`的一个严格子集。

3. touches`:(只读)

   这个 `TouchList` 列出了事件触发时： `touch suface`上所有的 `touch point`。

touches.length>=targetTouches.lengthtouches.length>=targetTouches.length

> 1. 看下面的代码：

```
<div>
    <p style="font-size: 50px; color: #ffffff;"></p>
</div>
<script>
    var box = document.querySelector("div");
    var p = document.querySelector("p");
    box.addEventListener("touchend", function (e){
        p.innerHTML = e.changedTouches.length;  //返回Touch对象的个数
        for(var i = 0; i < e.changedTouches.length; i++){
            //遍历出来每个Touch对象
            console.log(e.changedTouches.item(i));
        }
    })

</script>123456789101112131415
```

![img](http://o7cqr8cfk.bkt.clouddn.com/17-5-29/60863336.jpg)

> 1. 看下面的代码

```
<div></div>
<p></p>
<script>
    var div = document.querySelector("div");
    var p = document.querySelector("p");
    div.addEventListener("touchstart", function (e){
        var msg = "touches.length: " + e.touches.length +
                "<br> targetTouches.length: " + e.targetTouches.length +
                "<br> changedTouches.length: " + e.changedTouches.length;
        p.innerHTML = msg;
    })
</script>123456789101112
```

操作：

1. 放1个手指在div上

![img](http://o7cqr8cfk.bkt.clouddn.com/17-5-30/16019350.jpg)

1. 先放1个手指在其他地方，然后再放1个手指在`div`上

![img](http://o7cqr8cfk.bkt.clouddn.com/17-5-30/96498021.jpg)

1. 先放1个手指在其他地方，然后再逐渐放2个手指在`div`上

![img](http://o7cqr8cfk.bkt.clouddn.com/17-5-30/58363205.jpg)

## 2.3 Touch详解

 表示用户和触摸设备之间接触时单独的交互点(`a single point of contact`)。

 这个交互点通常是一个手指或者触摸笔。

 触摸设备通常是触摸屏或者触摸板。

> js对象提供了多个属性来描述`Touch`对象。
>
> 这些属性分成两大部分：
>
> 1. 基本属性(`Basic properties`)
>
> 2. 触摸区域相关属性 (`Touch area`)
>
>    `Touch area` 目前还在试验阶段。我们先不做过多的讨论。
>
> 基本属性:
>
> 这些属性均是只读属性

1. `identifier`:

   表示每 1 个 `Touch` 对象 的独一无二的 `identifier`。有了这个 `identifier` 可以确保你总能追踪到这个 `Touch`对象。

   ```
   <div>
      <p style="font-size: 50px; color: #ffffff;"></p>
   </div>
   <script>
      var box = document.querySelector("div");
      var p = document.querySelector("p");
      box.addEventListener("touchend", function (e){
          var touchList = e.changedTouches;
          for (var i = 0; i < touchList.length; i++){
              console.log(touchList.item(i).identifier);  
          }
      })
   
   </script>1234567891011121314
   ```

2. `screenX`:

   触摸点相对于屏幕左边缘的 `x` 坐标。

3. `scre`enY:

   触摸点相对于屏幕上边缘的 `y` 坐标。

4. `clientX`:

   触摸点相对于浏览器的 `viewport`左边缘的 `x` 坐标。不会包括左边的滚动距离。

5. `clientY`:

   触摸点相对于浏览器的 `viewport`上边缘的 `y` 坐标。不会包括上边的滚动距离。

6. `pageX`:

   触摸点相对于 `document`的左边缘的 `x` 坐标。 与 `clientX` 不同的是，他包括左边滚动的距离，如果有的话。

7. `pageY`:

   触摸点相对于 `document`的左边缘的 `y` 坐标。 与 `clientY` 不同的是，他包括上边滚动的距离，如果有的话。

8. `target`:

   总是表示 手指最开始放在触摸设备上的触发点所在位置的 `element`。 即使已经移出了元素甚至移出了`document`, 他表示的`element`仍然不变

```
var box = document.querySelector("div");
var p = document.querySelector("p");
box.ontouchstart = function (e){
    var touchList = e.changedTouches;
    for (var i = 0; i < touchList.length; i++){
        var touch = touchList[i];
        var msg = `id : ${touch.identifier} <br>
                       screenX : ${touch.screenX} <br>
                       screenY : ${touch.screenY} <br>
                       clientX : ${touch.clientX} <br>
                       clientY : ${touch.clientY} <br>
                       pageX : ${touch.pageX} <br>
                       pageY : ${touch.pageY} <br>
                       target: ${touch.target.nodeName} <br>
                        `;
        p.innerHTML = msg;
    }
}123456789101112131415161718
```

没有左右滚动：

![img](http://o7cqr8cfk.bkt.clouddn.com/17-5-30/68983634.jpg)

左右滚动：`pageX` 明显大于 `clientX`

![img](http://o7cqr8cfk.bkt.clouddn.com/17-5-30/4732727.jpg)

## 三、封装移动端事件

> 前面的是最基本的事件，直接使用相对比较麻烦，所以有必要对一些常用事件进行封装。
>
> 比如：单击事件、双击事件、滑动方向等

```
(function (window){  //传入window，提高变量的查找效率
    function myQuery(selector){  //这个函数就是对外提供的接口。
        //调用这个函数的原型对象上的_init方法，并返回
        return myQuery.prototype._init(selector);
    }
    myQuery.prototype = {
        /*初始化方法，获取当前query对象的方法*/
        _init: function (selector){
            if (typeof selector == "string"){
                //把查找到的元素存入到这个原型对象上。
                this.ele = window.document.querySelector(selector);
                //返回值其实就是原型对象。
                return this;
            }
        },
        /*单击事件：
         * 为了规避click的300ms的延迟，自定义一个单击事件
         * 触发时间：
         *   当抬起手指的时候触发
         *   需要判断手指落下和手指抬起的事件间隔，如果小于500ms表示单击时间。
         *
         *   如果是大于等于500ms，算是长按时间
         * */
        tap: function (handler){
            this.ele.addEventListener("touchstart", touchFn);
            this.ele.addEventListener("touchend", touchFn);

            var startTime,
                endTime;

            function touchFn(e){
                e.preventDefault()
                switch (e.type){
                    case "touchstart":
                        startTime = new Date().getTime();
                        break;
                    case "touchend":
                        endTime = new Date().getTime();
                        if (endTime - startTime < 500){
                            handler.call(this, e);
                        }
                        break;
                }
            }
        },
        /**
         * 长按
         * @param handler
         */
        longTag: function (handler){
            this.ele.addEventListener("touchstart", touchFn);
            this.ele.addEventListener("touchmove", touchFn);
            this.ele.addEventListener("touchend", touchFn);
            var timerId;

            function touchFn(e){
                switch (e.type){
                    case "touchstart" :  //500ms之后执行
                        timerId = setTimeout(function (){
                            handler.call(this, e);
                        }, 500)
                        break;
                    case "touchmove" :
                        //如果中间有移动也清除定时器
                        clearTimeout(timerId)
                        break;
                    case "touchend" :
                        //如果在500ms之内抬起了手指，则需要定时器
                        clearTimeout(timerId);
                        break;
                }
            }
        },
        /**
         * 左侧滑动。
            记录手指按下的左边，在离开的时候计算 deltaX是否满足左滑的条件
         *
         */
        slideLeft: function (handler){
            this.ele.addEventListener("touchstart", touchFn);
            this.ele.addEventListener("touchend", touchFn);
            var startX, startY, endX, endY;

            function touchFn(e){
                e.preventDefault();
                var firstTouch = e.changedTouches[0];
                switch (e.type){
                    case "touchstart":
                        startX = firstTouch.pageX;
                        startY = firstTouch.pageY;
                        break;
                    case "touchend":
                        endX = firstTouch.pageX;
                        endY = firstTouch.pageY;
//x方向移动大于y方向的移动，并且x方向的移动大于25个像素，表示在向左侧滑动
                        if (Math.abs(endX - startX) >= Math.abs(endY - startY) && startX - endX >= 25){
                            handler.call(this, e);
                        }
                        break;
                }
            }
        },
        /**
         * 右侧滑动。
         *
         */
        rightLeft: function (e){
            //TODO:
        }
    }
    window.$ = window.myQuery = myQuery;
})(window);123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687888990919293949596979899100101102103104105106107108109110111112
```

> 使用：

```
$("div").tap(function (e){
    console.log("单击事件")
})
$("div").longTag(function (){
    console.log("长按事件");
})

$("div").slideLeft(function (e){
    console.log(this);
    this.innerHTML = "左侧滑动了....."
})
```