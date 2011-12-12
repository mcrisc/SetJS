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
		expect(equalArrays(s.bag_, [32, 90, 5, 15], true)).toBe(true);
	});

	it("should store elements in their natural order", function() {
		expect(equalArrays(s.bag_, [5, 15, 32, 90], false)).toBe(true);
	});

	it("should have a 'contains' operation", function() {
		expect(s.contains(90)).toBe(true);
		expect(s.contains(99)).toBe(false);
	});

	it("should keep the set ordered when adding a new element", function() {
		s.add(17);
		expect(equalArrays(s.bag_, [5, 15, 17, 32, 90], false)).toBe(true);
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

});

// search and contains
describe("Operation: difference (a - b)", function() {
	var s1, s2;
	beforeEach(function() {
		s1 = new Set([1, 2, 13, 15, 19, 20, 23, 26, 28, 32]);
		s2 = new Set([5, 15, 16, 20, 25]);
	});

	it('should work when |a| > |b|', function() {
		var a = s1; var b = s2;
		var resultSet = a.difference(b);
		expect(equalArrays(resultSet.bag_, [1, 2, 13, 19, 23, 26, 28, 32], false)).toBe(true);
	});

	it('should work when |a| < |b|', function() {
		var a = s2; var b = s1;
		var resultSet = a.difference(b);
		expect(equalArrays(resultSet.bag_, [5, 16, 25], false)).toBe(true);
	});

	it('should return a copy of a, when b is empty', function() {
		var a = s1; var b = new Set();
		expect(equalArrays(a.difference(b).bag_, a.bag_, false)).toBe(true);
	});

	it('should return the empty set, when a is empty', function() {
		var a = new Set(); var b = s1;
		expect(equalArrays(a.difference(b).bag_, a.bag_, false)).toBe(true);
	});

	it('should return the empty set if sets are equal', function() {
		var result = s1.difference(s1);
		expect(result.size()).toBe(0);
	});
});

