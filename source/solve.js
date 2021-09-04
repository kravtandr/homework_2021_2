'use strict';
/** 
 * Solve the expression
 * @param {string} expression - expression to solve
 * @param {number} arg - expression argument
 * @returns {number} - solution of the expression
 */
let solve = (expression, arg) => {
    if (expression === '' || expression === undefined || isNaN(arg)) {
        return NaN;
    }
    expression = expression.replace(/x/g, arg);
    expression = formatOperation(expression);
    let postfixExpression = ExpressionToPostfix(expression);
    return evaluateFromPostfix(postfixExpression);
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
 * @returns {Array} - formated operation Array
 */
let formatOperation = (operation) => operation.replace(/\)/g, ' ) ').replace(/\(/g, ' ( ').split(' ').filter(item => item != '');

/** 
 * check the operation for the possibility of execution
 * @param {Number} a - operation string
 * @param {String} op - operation string
 * @param {Number} b - operation string
 * @returns - NaN if operation can not be executed
 */
let checkOperation = (a, op, b) => {
    if (!methods[op] || isNaN(a) || isNaN(b)) {
        return 1;
    }
    return 0;

}


/** 
 * evaluate postfix expression 
 * @param {String} expression - postfix expression string
 * @returns {Number} - result 
 */
let evaluateFromPostfix = (expression) => {
    let stack = [];
    expression.split(' ').filter(item => item != '').forEach((item) => {
        if (item in methods) {
            let [b, a] = [stack.pop(), stack.pop()];
            if(isNaN(checkOperation(a, item, b))) return;
            stack.push(methods[item].func(a, b));
        } else {
            stack.push(parseInt(item));
        }
    });
    return stack.pop();
};

/** 
 * Convert evaluate expression to postfix expression string
 * @param {String} expression - expression string
 * @returns {String} - postfix expression string
 */
let ExpressionToPostfix = (expression) => {
    let stack = [];
    let postfixExpression = '';
    expression.forEach((item) => {
        if (item.match(/[0-9]+/)) {
            postfixExpression += item + ' ';
        }
        if (item == '(') {
            stack.push(item);
        }
        if (item == ')') {
            while (stack[stack.length - 1] != '(') {
                postfixExpression += stack.pop() + ' ';
            }
            stack.pop();
        }
        if (item in methods) {
            while (stack.length > 0 && stack[stack.length - 1] in methods && methods[stack[stack.length - 1]].priority <= methods[item].priority) {
                postfixExpression += stack.pop() + ' ';
            }
            stack.push(item);
        }
    })
    stack.forEach((item => {
        postfixExpression += stack.pop() + ' ';
    }))
    return postfixExpression;
};
