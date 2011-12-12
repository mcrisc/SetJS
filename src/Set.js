
//TODO MIT license notice

function Set(elements) {
	this.bag_ = [];
	var i;

	if (arguments.length > 0) { // optional args
		for (i=0; i < elements.length; i++) {
			this.add(elements[i]);
		}
	}
}

Set.prototype.search = function(e, start) {
	//TODO document this
	var j = this.bag_.length;
	var pivot;
	var i = arguments.length == 2 ? start : 0;

	while (i < j) {
		pivot = i + Math.floor((j - i) / 2);
		if (this.bag_[pivot] == e) {
			return pivot;
		}

		if (e > this.bag_[pivot]) {
			i = pivot + 1;
		} else {
			j = pivot;
		}
	}

	return i;
}

Set.prototype.add = function(e) {
	var p = this.search(e);
	if (this.bag_[p] != e) {
		this.bag_.splice(p, 0, e); // insert e at position p
	}
}

Set.prototype.contains = function(e) {
	var p = this.search(e);
	return (this.bag_[p] == e);
}

Set.prototype.size = function() {
	return this.bag_.length;
}

Set.prototype.equals = function(otherSet) {
	if (this.size() != otherSet.size()) {return false;}
	var i;
	for (i=0; i < this.bag_.length; i++) {
		if (this.bag_[i] != otherSet.bag_[i]) {
			return false;
		}
	}

	return true;
}

Set.prototype.difference = function(otherSet) {
	var result = new Set();

	if (this.size() == 0) {return result;}
	if (otherSet.size() == 0) {
		result.bag_ = this.bag_.slice(0); 
		return result;
	}

	var i;
	var j = 0;
	var a = this.bag_; var b = otherSet.bag_;
	for (i=0; i < a.length; i++) {
		if (a[i] > b[j]) {
			j = otherSet.search(a[i], j); // finds First b[j] Not Smaller than a[i]
		}

		if (j == b.length) { // end of b
			result.bag_ = result.bag_.concat(a.slice(i));
			break;
		}

		if (a[i] < b[j]) {
			result.bag_.push(a[i]);
		}
	}
	
	return result;
}

Set.prototype.intersection = function(otherSet) {
	var result = new Set();
	if ((this.size() == 0) || (otherSet.size() == 0)) {return result;}

	var i;
	var j = 0;
	var a = this.bag_; var b = otherSet.bag_;
	for (i=0; i < a.length; i++) {
		j = otherSet.search(a[i], j); // finds First b[j] Not Smaller than a[i]
		if (j == b.length) {break;} // end of b

		if (a[i] == b[j]) {
			result.bag_.push(a[i]);
		}
	}

	return result;
}

