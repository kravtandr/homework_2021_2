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

    var methods = {
        "-": (a, b) => a - b,
        "+": (a, b) => a + b,
        "*": (a, b) => a * b
      };

    expression = expression.replace(/x/g, arg);

    while(expression.indexOf(")") != -1){
        rightBracketPos = expression.indexOf(")");
        leftBracketPos = expression.slice(0,rightBracketPos).lastIndexOf("(");
        let substr = expression.slice(leftBracketPos+1, rightBracketPos);

        let split = substr.split(' ').filter(item => item != ''),
            a = +split[0],
            op = split[1],
            b = +split[2]
        if(split.length==1 && !isNaN(split[0])){
            return Number(split[0])
        }
        if (!methods[op] || isNaN(a) || isNaN(b)) {
            return NaN;
        }

        expression = expression.substring(0,rightBracketPos) + expression.substring(rightBracketPos+1, expression.length);
        expression = expression.substring(0,leftBracketPos) + expression.substring(leftBracketPos+1, expression.length);
        expression = expression.replace(substr, methods[op](a, b));
    }

    expression = expression.split(' ').filter(item => item != '')

    while(expression.length>=3){
        a = +expression[0],
        op = expression[1],
        b = +expression[2]
        if (!methods[op] || isNaN(a) || isNaN(b)) {
            return NaN;
        }
        expression = expression.slice(2,expression.length)
        expression[0] = methods[op](a, b)
    }

    return Number(expression[0]);
}
