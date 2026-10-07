/**
 * Evaluate Reverse Polish Notation — see README.md next to this file.
 */

// Search is not optimal, though that is not the goal to optimize this piece now
const isSign = (s: string) => typeof s === 'string' && ['+', '-', '*', '/'].includes(s);
const operate = (a: number, b: number, sign: string) => {
  switch (sign) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return Math.trunc(a / b);
    default:
      throw new Error('Not an operation symbol');
  }
};

export function evalRPN(tokens: readonly string[]): number {
  if (!tokens.length) throw new Error('Input is empty');
  const stack = [];

  for (let i = 0; i < tokens.length; i++) {
    const item = tokens[i];

    if (isSign(item)) {
      const a = stack.pop();
      const b = stack.pop();
      const result = operate(b!, a!, item);

      stack.push(result);
    } else {
      const digit = Number(item);
      stack.push(digit);
    }
  }

  return stack[0];
}
