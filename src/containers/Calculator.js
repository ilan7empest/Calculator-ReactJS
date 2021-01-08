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
  renderCalculatorKey(...args) {
    const [char, cn, cb] = args;
    return (
      <CalcButton className={cn} onClick={cb}>
        {char}
      </CalcButton>
    );
  }
  //digit = string. returned value from the button
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
  //Basic Operators
  basicOperator = (selectedOperator) => {
    const { value, display, operator } = this.state;
    // Convert "display" from a string to a number
    const parseDisplay = parseInt(display);
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
          display: result.toString(),
          //TODO: create history
          // history: [...this.state.history, [value, operator, newValue]],
        });
      }
    }
  };

  click = (value) => {
    console.log(value);
  };
  render() {
    return (
      <div>
        <History history={this.state.history} />
        <Total total={this.state.display} />
        <div className='row'>
          {this.renderCalculatorKey('/', 'key', (e) => this.basicOperator('/'))}
          {this.renderCalculatorKey('*', 'key', (e) => this.basicOperator('*'))}
          {this.renderCalculatorKey('-', 'key', (e) => this.basicOperator('-'))}
          {this.renderCalculatorKey('+', 'key', (e) => this.basicOperator('+'))}
          {this.renderCalculatorKey('=', 'key', (e) => this.basicOperator(e))}
        </div>
        <div className='row'>
          {this.renderCalculatorKey('9', 'key', (e) => this.displayDigit(e))}
          {this.renderCalculatorKey('8', 'key', (e) => this.displayDigit(e))}
          {this.renderCalculatorKey('7', 'key', (e) => this.displayDigit(e))}
        </div>
        <div className='row'>
          {this.renderCalculatorKey('6', 'key', (e) => this.displayDigit(e))}
          {this.renderCalculatorKey('5', 'key', (e) => this.displayDigit(e))}
          {this.renderCalculatorKey('4', 'key', (e) => this.displayDigit(e))}
        </div>
        <div className='row'>
          {this.renderCalculatorKey('3', 'key', (e) => this.displayDigit(e))}
          {this.renderCalculatorKey('2', 'key', (e) => this.displayDigit(e))}
          {this.renderCalculatorKey('1', 'key', (e) => this.displayDigit(e))}
        </div>
        <div className='row'>
          {this.renderCalculatorKey('+/-', 'key', (e) => this.click(e))}
          {this.renderCalculatorKey('0', 'key', (e) => this.displayDigit(e))}
          {this.renderCalculatorKey('.', 'key', (e) => this.click(e))}
        </div>
      </div>
    );
  }
}

export default Calculator;
