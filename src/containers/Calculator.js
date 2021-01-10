import React, { Component } from 'react';
import CalcButton from '../components/CalcButton';
import { basicOperators } from '../utils/basicOperators';
import { Total } from '../components/total';
import { History } from '../components/history';

class Calculator extends Component {
  state = {
    value: null,
    display: '0',
    operator: null,
    isOperatorClicked: false,
    history: [],
  };

  // Handle Key Down = keypress indicates which character was entered. keydown event is fired for all keys
  handleKeyDown = (e) => {
    let { key } = e;
    /*Todo: Focus elements
    // let currentKeyEl = document.body.querySelector(`#key-${key}`);
    // currentKeyEl.focus();
    */
    if (key === 'Enter') {
      key = '=';
    }
    switch (key) {
      case /\d/.test(key) && key:
        this.displayDigit(key);
        break;
      case key in basicOperators && key:
        this.basicOperator(key);
        break;

      case '.':
        this.displayDecimal();
        break;
      case 'Backspace':
        this.removeLastChar();
        break;
      default:
        break;
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  // Handle Digit keys (0-9). @digit = string. returned value from the button
  displayDigit = (digit) => {
    const { isOperatorClicked, display } = this.state;
    if (isOperatorClicked) {
      this.setState({
        display: digit,
        isOperatorClicked: false,
      });
    } else {
      this.setState({
        display: display === '0' ? digit : display + digit,
      });
    }
  };

  // Handle Decimal Key
  displayDecimal() {
    const { display } = this.state;
    if (!display.includes('.')) {
      this.setState({
        display: `${display}.`,
        isOperatorClicked: false,
      });
    }
  }

  // Handle Toggle sign -+
  toggleSign() {
    const { display } = this.state;
    const parseDisplay = parseFloat(display) * -1;
    this.setState({
      display: parseDisplay.toString(),
    });
  }

  // Basic Operators
  basicOperator = (selectedOperator) => {
    const { value, display, operator } = this.state;
    // Convert "display" from a string to a number
    const parseDisplay = parseFloat(display);
    this.setState({
      operator: selectedOperator,
      isOperatorClicked: true,
    });
    // value set to 0 if no digit clicked
    if (value === null) {
      this.setState({
        value: parseDisplay,
      });
    }
    // if basic operator clicked
    if (operator) {
      const result = basicOperators[operator](value || 0, parseDisplay); // returned calculated value based on the operator /*-+
      const stringResult = result + ''; // Convert result to string for comparison
      if (stringResult === 'NaN' || stringResult === 'Infinity') {
        this.setState({
          value: null,
          display: stringResult === 'NaN' ? 'Result is NaN' : '∞',
        });
      } else {
        this.setState({
          value: result,
          display: stringResult,
          //TODO: create history
          // history: [...this.state.history, [value, operator, newValue]],
        });
      }
    }
  };

  // Handle remove last char
  removeLastChar = () => {
    const { display, value } = this.state;
    if (display !== String(value))
      this.setState({
        display: display.substr(0, display.length - 1) || '0',
      });
  };

  render() {
    const renderCalculatorKey = (...args) => {
      const [char, cn, cb] = args;
      return (
        <CalcButton className={cn} onClick={cb}>
          {char}
        </CalcButton>
      );
    };
    return (
      <div>
        <History history={this.state.history} />
        <Total total={this.state.display} />
        <div className='row'>
          {renderCalculatorKey('/', 'key', () => this.basicOperator('/'))}
          {renderCalculatorKey('*', 'key', () => this.basicOperator('*'))}
          {renderCalculatorKey('-', 'key', () => this.basicOperator('-'))}
          {renderCalculatorKey('+', 'key', () => this.basicOperator('+'))}
          {renderCalculatorKey('=', 'key', () => this.basicOperator('='))}
          {renderCalculatorKey('AC', 'key', () => this.basicOperator('='))}
          {renderCalculatorKey('last char', 'key', () => this.removeLastChar())}
        </div>
        <div className='row'>
          {renderCalculatorKey('9', 'key', (e) => this.displayDigit(e))}
          {renderCalculatorKey('8', 'key', (e) => this.displayDigit(e))}
          {renderCalculatorKey('7', 'key', (e) => this.displayDigit(e))}
        </div>
        <div className='row'>
          {renderCalculatorKey('6', 'key', (e) => this.displayDigit(e))}
          {renderCalculatorKey('5', 'key', (e) => this.displayDigit(e))}
          {renderCalculatorKey('4', 'key', (e) => this.displayDigit(e))}
        </div>
        <div className='row'>
          {renderCalculatorKey('3', 'key', (e) => this.displayDigit(e))}
          {renderCalculatorKey('2', 'key', (e) => this.displayDigit(e))}
          {renderCalculatorKey('1', 'key', (e) => this.displayDigit(e))}
        </div>
        <div className='row'>
          {renderCalculatorKey('±', 'key', () => this.toggleSign())}
          {renderCalculatorKey('0', 'key', (e) => this.displayDigit(e))}
          {renderCalculatorKey('.', 'key', () => this.displayDecimal())}
        </div>
      </div>
    );
  }
}

export default Calculator;
