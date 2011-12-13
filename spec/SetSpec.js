function equalArrays(a1, a2, ignoreOrder) {
	if (a1.length != a2.length) {return false;}

	function comparator(a, b) {
		return a - b;
	}

	if (ignoreOrder) {
		a1.sort(comparator);
		a2.sort(comparator);
	}
	var i;
	for (i=0; i < a1.length; i++) {
		if (a1[i] != a2[i]) {return false;}
	}

	return true;
}

describe("Set", function() {
	var s;
	beforeEach(function() {
		s = new Set([32, 90, 32, 5, 15]);
	});

	it("should not allow repeated elements", function() {
		expect(equalArrays(s.getElements(), [32, 90, 5, 15], true)).toBe(true);
	});

	it("should store elements in their natural order", function() {
		expect(equalArrays(s.getElements(), [5, 15, 32, 90], false)).toBe(true);
	});

	it("should have a 'contains' operation", function() {
		expect(s.contains(90)).toBe(true);
		expect(s.contains(99)).toBe(false);
	});

	it("should keep the set ordered when adding a new element", function() {
		s.add(17);
		expect(equalArrays(s.getElements(), [5, 15, 17, 32, 90], false)).toBe(true);
	});

	it("should find an element's position", function() {
		expect(s.search(15)).toBe(1);
	});

	it("should find the position where an element should be", function() {
		expect(s.search(17)).toBe(2);
	});

	it("should be able to tell its size", function() {
		var t = new Set();
		expect(t.size()).toBe(0);
		expect(s.size()).toBe(4);
	});

	it("should have an 'equals' operation", function() {
		var s1 = new Set([8, 9, 4, 2]);
		var s2 = new Set([2, 4, 8, 9]);
		expect(s1.equals(s2)).toBe(true);
	});

});

describe("Operation: difference (a - b)", function() {
	var s1, s2;
	beforeEach(function() {
		s1 = new Set([1, 2, 13, 15, 19, 20, 23, 26, 28, 32]);
		s2 = new Set([5, 15, 16, 20, 25]);
	});

	it('should work when |a| > |b|', function() {
		var a = s1; var b = s2;
		var resultSet = a.difference(b);
		expect(resultSet.equals(new Set([1, 2, 13, 19, 23, 26, 28, 32]))).toBe(true);
	});

	it('should work when |a| < |b|', function() {
		var a = s2; var b = s1;
		var resultSet = a.difference(b);
		expect(resultSet.equals(new Set([5, 16, 25]))).toBe(true);
	});

	it('should return a copy of a, when b is empty', function() {
		var a = s1; var b = new Set();
		expect(a.difference(b).equals(a)).toBe(true);
	});

	it('should return the empty set, when a is empty', function() {
		var a = new Set(); var b = s1;
		expect(a.difference(b).size()).toBe(0);
	});

	it('should return the empty set if sets are equal', function() {
		var result = s1.difference(s1);
		expect(result.size()).toBe(0);
	});
});

describe("Operation: intersection", function() {
	var s1, s2;
	beforeEach(function() {
		s1 = new Set([1, 2, 13, 15, 19, 20, 23, 26, 28, 32]);
		s2 = new Set([5, 15, 16, 20, 25]);
	});

	it('should return the empty set when any of the sets is empty', function() {
		var empty = new Set();
		expect(s1.intersection(empty).size()).toBe(0);
		expect(empty.intersection(s1).size()).toBe(0);
		expect(empty.intersection(empty).size()).toBe(0);
	});

	it('should return a copy of a if sets are equal', function() {
		var result = s1.intersection(s1);
		expect(result.equals(s1)).toBe(true);
	});

	it('should return a new set containing common elements in both sets', function() {
		var result = s1.intersection(s2);
		expect(result.equals(new Set([15, 20]))).toBe(true);
	});

	it('should generate the same result, no matter which set comes first', function() {
		expect(s1.intersection(s2).equals(s2.intersection(s1))).toBe(true);
	});
});

