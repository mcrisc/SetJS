function equalArrays(a1, a2, ignoreOrder) {
	if (a1.length != a2.length) {return false;} // avoids unnecessary sorting

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

describe("Set element storage", function() {
	var s;
	beforeEach(function() {
		s = new Set([32, 90, 32, 5, 15]);
	});

	it("should not allow repeated elements", function() {
		expect(equalArrays(s.bag_, [32, 90, 5, 15], true)).toBe(true);
	});

	it("should store elements ordered", function() {
		expect(equalArrays(s.bag_, [5, 15, 32, 90], false)).toBe(true);
	});

});


