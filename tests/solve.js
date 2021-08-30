'use strict';

QUnit.module('Тестируем функцию solve', function () {
	QUnit.test('solve работает правильно ', function (assert) {
		assert.strictEqual(solve('x + 1', 1), 2);
		assert.strictEqual(solve('2 + x - 1', 5), 6);
		assert.strictEqual(solve('2 * x - 1', 5), 9);
		assert.strictEqual(solve('2 * ( x - 1 )', 5), 8);
		assert.strictEqual(solve('(5 - x) * (x + 5)', 3), 16);
		assert.strictEqual(solve('((5 - x) * (x + 5)) * x * x', 3), 144);
	});
});

QUnit.module('Дополнительно тестируем функцию solve', function () {
	QUnit.test('solve точно работает правильно ', function (assert) {
		assert.strictEqual(solve('((x + 1))', 1), 2);
		assert.strictEqual(solve('( (( (1 + x ) - 1) ))', 5), 5);
		assert.strictEqual(solve('( (2 * x ) * 2 ) * 2 - 1', 0), -1);
		assert.strictEqual(isNaN(solve('', 'q')), true)
		assert.strictEqual(isNaN(solve('((2 + x ) * 2 ) * 2 - 1', 'q')), true)
		assert.strictEqual(isNaN(solve('((2 + x ) * 2 ) * 2 - 1', undefined)), true)
		assert.strictEqual(isNaN(solve(undefined, 2)), true)
	});
});
