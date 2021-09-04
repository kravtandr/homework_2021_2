'use strict';

QUnit.module('Дополнительно тестируем функцию solve c негативными тестами', function () {
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
