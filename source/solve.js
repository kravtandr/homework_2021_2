'use strict';
/** 
 * Solve the expression
 * @param {string} expression - expression to solve
 * @param {number} arg - expression argument
 * @returns {number} - solution of the expression
 */
const solve = (expression, arg) => {
    if (expression === '' || expression === undefined || isNaN(arg)) {
        return NaN;
    }
    expression = expression.replace(/x/g, arg);
    return evaluateFromPostfix(expressionToPostfix(formatOperation(expression)));
}

const methods = {
    '-': {
        priority: 2,
        func: (a, b) => a - b
    },
    '+': {
        priority: 2,
        func: (a, b) => a + b
    },
    '*': {
        priority: 1,
        func: (a, b) => a * b
    }
};

/** 
 * format operation string to Array
 * @param {string} operation - operation string
 * @returns {Array<number|string>} - formated operation Array
 */
const formatOperation = (operation) => operation.replace(/\)/g, ' ) ').replace(/\(/g, ' ( ').split(' ').filter(item => item != '');

/** 
 * check the operation for the possibility of execution
 * @param {Number} a - operation string
 * @param {String} op - operation string
 * @param {Number} b - operation string
 * @returns {Boolean} - 1 if operation can not be executed else 0
 */
const checkOperation = (a, op, b) => {
    if (!methods[op] || isNaN(a) || isNaN(b)) {
        return true;
    }
    return false;
}

/** 
 * evaluate postfix expression 
 * @param {String} expression - postfix expression string
 * @returns {Number} - result 
 */
const evaluateFromPostfix = (expression) => {
    return expression.reduce((stack,item) => {
        if (item in methods) {
            let [b, a] = [stack.pop(), stack.pop()];
            if(isNaN(checkOperation(a, item, b))) return;
            stack.push(methods[item].func(a, b));
        } else {
            stack.push(parseInt(item));
        }
        return stack
    },[]).pop()
};

/** 
 * Convert evaluate expression to postfix expression string
 * @param {String} expression - expression string
 * @returns {Array<number|string>} - postfix expression array
 */
const expressionToPostfix = (expression) => {
    const {postfixExpression, stack} = expression.reduce(({postfixExpression, stack}, item) => {
        if (item.match(/[0-9]+/)) {
            postfixExpression.push(item);
        }
        if (item == '(') {
            stack.push(item);
        }
        if (item == ')') {
            while (stack[stack.length - 1] != '(') {
                postfixExpression.push(stack.pop());
            }
            stack.pop();
        }
        if (item in methods) {
            while (stack !== undefined && stack[stack.length - 1] in methods && methods[stack[stack.length - 1]].priority <= methods[item].priority) {
                postfixExpression.push(stack.pop());
            }
            stack.push(item);
        }
        return {postfixExpression, stack};
    },{postfixExpression: [], stack: []})
    return postfixExpression.concat(stack);
};
