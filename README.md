> js 手动实现自定义事件监听

### 自定义事件监听，其实也是观察者模式的一种



我们在jquery中经常用

```javascript
dom.on('click', () => {})
```

来注册事件监听，那么他具体是怎么实现的呢，其实背后就是观察者模式的一种实现。

观察者模式，有几个要素:

1. 第一需要将需要观察的对象存放起来。

2. 第二需要在需要的地方调用该观察者。

3. 第三观察者需要分类，同一类的观察者可监听同一个事件，事件触发时，所有的观察者都需要被通知到。

下面来具体实现一个观察者模式。

```javascript
;(function(w) {
var Listen = function () {
	this.pool = new Map();
}
// 注册观察者
Listen.prototype.on = function(type, cb) {
	if (this.pool.get(type)) {
		this.pool.get(type).push(cb)
	} else {
		this.pool.set(type, [cb])
	}
}
// 触发观察者
Listen.prototype.emit = function(type, ...args) {
	if (this.pool.get(type)) {
		this.pool.get(type).forEach(listener => {
			listener.apply(type, args)
		})
	} else {
		console.log('undefined type:', type)
	}
}
// 删除观察者
Listen.prototype.remove = function(type) {
if (this.pool.get(type)) {
		this.pool.delete(type)
	} else {
		console.log('undefined type:', type)
	}
	return this;
}
w.Listen = Listen;
})(window)



```



上面代码里使用了es6 的Map对象来存储观察者。注册观察者的时候，每收到一个观察者注册，就按类型将他们分类存放，同一类的观察者存储在一个数组中。触发观察者的代码中，收到触发的命令后，找出触发的类型，调用所有已注册的同类的观察者。删除观察者，就将注册的所有观察者删除，return this方便链式调用。

调用示例如下：

```javascript
var listener = new Listen()
	listener.on('click', () => {
		console.log('clicked 1 ...')
	})
	listener.on('click', () => {
		console.log('clicked 2 ...')
	})
	listener.on('hover', () => {
		console.log('hover 1 ...')
	})
	listener.emit('click')
	listener.emit('hover')
	listener.remove('click').on('click', () => {
		console.log('click again ...')
	})
	listener.emit('click')

```





### 如上便用观察者模式实现了一个事件监听机制。

源代码见github[链接](https://github.com/zlx362211854/listener)


