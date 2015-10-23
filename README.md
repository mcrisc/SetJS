SetJS
=====

SetJS is a pure-JavaScript implementation of the [set concept](https://en.wikipedia.org/wiki/Set_%28mathematics%29) aimed at efficient execution of *difference* (complement) and *intersection* operations.


### Usage Examples
```javascript
var res;

var a = new Set([32, 1, 5, 15, 19, 20, 20, 20, 20, 20]);
print(a);
// "Set [1, 5, 15, 19, 20, 32]"

var b = new Set([5, 15, 16, 20, 25]);
print(b);
// "Set [5, 15, 16, 20, 25]";


res = b.difference(a);
print(res);
// "Set [16, 25]";

res = b.intersection(a);
print(res);
// "Set [5, 15, 20]"

res.add(40);
print(res);
// "Set [5, 15, 20, 40]"
```

### Supported Operations
The following common set operations are supported by SetJS:

- Membership: `if (a.contains(x)) {...}`
- Equality: `if (a.equals(b)) {...}`
- Union: `res = a.union(b);`
- Difference: `res = b.difference(a);`
- Intersection: `res = b.intersection(a);`



#### Set objects in ECMAScript 2015 (ES6)

At the time SetJS was released (2011) JavaScript (ECMAScript) lacked a set object. The latest version of ECMAScript standard (ES6) introduced [set objects](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-set-objects) to JavaScript. But these are still being implemented by [some browsers](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Set#Browser_compatibility). Besides that, ES6 sets yet does not support some set operations.

Bellow there's a brief comparison of SetJS and ES6 set objects main features:

|Operation|SetJS|ES6|
|--------|----|----|
|iteration thru elements|no|yes|
|delete elements|no|yes|
|membership|yes|yes|
|equality|yes|no|
|difference|yes|no|
|intersection|yes|no|
