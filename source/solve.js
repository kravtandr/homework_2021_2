/** 
 * Solve the expression
 * @param {string} expression - expression to solve
 * @param {number} arg - expression argument
 * @returns {number} - solution of the expression
*/
function solve (expression, arg){
    if (expression == ''|| expression == undefined || isNaN(arg)) {
        return NaN;
    }
    expression = expression.replace(/x/g, arg);

    while(expression.indexOf(")") >= 0){
        rightBracketPos = expression.indexOf(")");
        leftBracketPos = expression.slice(0,rightBracketPos).lastIndexOf("(");
        let operation = expression.slice(leftBracketPos+1, rightBracketPos);

        let parsedOperation = parseOperation(operation);
        let a = +parsedOperation.a;
        let op = parsedOperation.operator;
        let b = +parsedOperation.b;
        parsedOperation = parsedOperation.parsedOperation;

        if(parsedOperation.length==1 && !isNaN(parsedOperation[0])){
            return Number(parsedOperation[0])
        }
        if(!isNaN(checkOperation(a, op, b))) return;
        
        expression = expression.substring(0,rightBracketPos) + expression.substring(rightBracketPos+1, expression.length);
        expression = expression.substring(0,leftBracketPos) + expression.substring(leftBracketPos+1, expression.length);
        expression = expression.replace(operation, methods[op](a, b));        
    }

    expression = formatOperation(expression);
    while(expression.length>=3){
        let a = +expression[0]
        let op = expression[1];
        let b = +expression[2];

        if(!isNaN(checkOperation(a, op, b))) return;

        expression = expression.slice(2,expression.length)
        expression[0] = methods[op](a, b)
    }

    return Number(expression[0]);
}

const methods = {
    "-": (a, b) => a - b,
    "+": (a, b) => a + b,
    "*": (a, b) => a * b
  };

/** 
 * format operation string to Array
 * @param {string} operation - operation string
 * @returns {Array} - formated operation Array
*/
function formatOperation(operation){
    operation = operation.split(' ').filter(item => item != '');
    return operation;
}

/** 
 * parse the operation
 * @param {string} operation - operation string
 * @returns {Object} - formated operation object literal
*/
function parseOperation(operation){
    let parsedOperation = formatOperation(operation);
    let a, op, b;
    a = +parsedOperation[0];
    op = parsedOperation[1];
    b = +parsedOperation[2];
    return { 
        a: a, 
        operator: op, 
        b: b, 
        parsedOperation: parsedOperation
    };
}

/** 
 * check the operation for the possibility of execution
 * @param {Number} a - operation string
 * @param {String} op - operation string
 * @param {Number} b - operation string
 * @returns - NaN if operation can not be executed
*/
function checkOperation(a, op, b){
    if (!methods[op] || isNaN(a) || isNaN(b)) {
        return NaN;
    }
}
