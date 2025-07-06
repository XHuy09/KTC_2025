import { useState } from 'react';
import styles from './Calculator.module.css';

const buttons = [
  ['7', '8', '9', '÷'],
  ['4', '5', '6', '×'],
  ['1', '2', '3', '-'],
  ['0', '.', 'C', '+']
];

const isOperator = (val: string) => ['+', '-', '×', '÷'].includes(val);

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (val: string) => {
    if (val === 'C') {
      setExpression('');
      setResult('');
      return;
    }
    if (val === '=') {
      calculate();
      return;
    }
    // Prevent multiple operators in a row
    if (isOperator(val)) {
      if (!expression || isOperator(expression.slice(-1))) return;
    }
    // Prevent multiple decimals in a number
    if (val === '.') {
      const parts = expression.split(/[+\-×÷]/);
      if (parts[parts.length - 1].includes('.')) return;
    }
    setExpression(expression + val);
  };

  const calculate = () => {
    const exp = expression.replace(/×/g, '*').replace(/÷/g, '/');
    try {
      // eslint-disable-next-line no-eval
      const evalResult = Function('return ' + exp)();
      if (evalResult === Infinity || evalResult === -Infinity || isNaN(evalResult)) {
        setResult('Error');
      } else {
        setResult(evalResult.toString());
      }
    } catch {
      setResult('Error');
    }
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.display}>
        <div className={styles.expression}>{expression || '0'}</div>
        <div className={styles.result}>{result}</div>
      </div>
      <div className={styles.buttons}>
        {buttons.flat().map((btn, i) => (
          <button
            key={btn + i}
            className={isOperator(btn) ? styles.operator : styles.button}
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}
        <button
          className={styles.equals}
          onClick={() => handleClick('=')}
        >
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
