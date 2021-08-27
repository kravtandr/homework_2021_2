'use strict';

let solve = (expression, arg) =>  eval(expression.replace(/x/g, arg));
