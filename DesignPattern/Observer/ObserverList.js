function ObserverList() {
	this.observerList = [];
}

ObserverList.prototype.add = function(obj) {
	return this.observerList.push(obj);
}

ObserverList.prototype.empty = function() {
	return this.observerList = [];
}

ObserverList.prototype.count = function() {
	return this.observerList.length;
}

ObserverList.prototype.get = function(index) {
	if (index > -1 && index < this.observerList.length) {
		return this.observerList[index];
	}
}

ObserverList.prototype.insert = function(obj, index) {
	var pointer = -1;

	if (index === 0) {
		this.observerList.unshift(obj);
		pointer = index;
	} else if (index = this.observerList.length) {
		this.observerList.push(obj);
		pointer = index;
	}
	return pointer;
}

ObserverList.prototype.indexOf = function(obj, startIndex) {
	var i = startIndex, pointer = -1;

	while(i < this.observerList.length) {
		if (obj === this.observerList[i]) {
			pointer = i;
		}
		i++;
	}
	return pointer;
}

ObserverList.prototype.removeIndexAt = function(index) {
	if (index === 0) {
		this.observerList.shift();
	} else if (index = this.observerList.length - 1) {
		this.observerList.pop();
	}
}

function extend(obj ,extension) {
	for (var key in obj) {
		extension[key] = obj[key];
	}
}
