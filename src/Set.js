/*
 * Copyright (c) 2011 Marcelo Criscuolo (criscuolo.marcelo [at] gmail [dot] com)
 * Released under the MIT License.
 */

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

Set.prototype.getElements = function() {
	return this.bag_;
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
	for (i=0; i < this.bag_.length; i++) {
		if (this.bag_[i] > otherSet.bag_[j]) {
			j = otherSet.search(this.bag_[i], j); // finds First otherSet[j] Not Smaller than this[i]
			if (j == otherSet.bag_.length) {break;}  // end of otherSet
		}

		if (this.bag_[i] < otherSet.bag_[j]) {
			result.bag_.push(this.bag_[i]);
		}
	}
	result.bag_ = result.bag_.concat(this.bag_.slice(i)); // adds the remaining elements, if there are any
	
	return result;
}

Set.prototype.intersection = function(otherSet) {
	var result = new Set();
	if ((this.size() == 0) || (otherSet.size() == 0)) {return result;}

	var i;
	var j = 0;
	for (i=0; i < this.bag_.length; i++) {
		j = otherSet.search(this.bag_[i], j); // finds First otherSet[j] Not Smaller than this[i]
		if (j == otherSet.bag_.length) {break;} // end of otherSet

		if (this.bag_[i] == otherSet.bag_[j]) {
			result.bag_.push(this.bag_[i]);
		}
	}

	return result;
}

Set.prototype.union = function(otherSet) {
	var result = new Set();
	if ((this.size() == 0) && (otherSet.size() == 0)) {return result;}

	var base, merged;
	if (this.size() > otherSet.size()) {
		base = this;
		merged = otherSet;
	} else {
		base = otherSet;
		merged = this;
	}

	result.bag_ = base.bag_.slice(0); // make a copy
	var i;
	for (i=0; i < merged.bag_.length; i++) {
		result.add(merged.bag_[i]); // add() doesn't allow repetition
	}

	return result;
}

