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

