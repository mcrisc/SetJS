
//TODO MIT license notice

function Set(elements) {
	this.bag = [];
	var i;

	if (arguments.length > 0) { // optional args
		for (i=0; i < elements.length; i++) {
			this.add(elements[i]);
		}
	}
}

Set.prototype.search = function(e) {
	//TODO document this
	var i = 0;
	var j = this.bag.length;
	var pivot;

	while (i < j) {
		pivot = i + Math.floor((j - i) / 2);
		if (this.bag[pivot] == e) {
			return pivot;
		}

		if (e > this.bag[pivot]) {
			i = pivot + 1;
		} else {
			j = pivot;
		}
	}

	return i;
}

Set.prototype.add = function(e) {
	var p = this.search(e);
	if (this.bag[p] != e) {
		this.bag.splice(p, 0, e); // insert e at position p
	}
}

Set.prototype.contains = function(e) {
	var p = this.search(e);
	return (this.bag[p] == e);
}

