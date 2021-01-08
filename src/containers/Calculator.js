import React, { Component } from 'react';
import CalcButton from '../components/CalcButton';
import { Total } from '../components/total';
import { History } from '../components/history';

class Calculator extends Component {
  state = {
    value: null,
    totalDisplay: '0',
    operator: null,
    isOperatorClicked: false,
    history: [],
  };
  renderNumbers(...args) {
    const [child, cn, cb] = args;
    return (
      <CalcButton className={cn} onClick={cb}>
        {child}
      </CalcButton>
    );
  }
  displayDigit(digit) {
    const { isOperatorClicked, totalDisplay } = this.state;
    if (isOperatorClicked) {
      this.setState({
        totalDisplay: digit,
        isOperatorClicked: false,
      });
    } else {
      this.setState({
        totalDisplay: totalDisplay === '0' ? digit : totalDisplay + digit,
      });
    }
  }
  click = (value) => {
    console.log(value);
  };
  render() {
    return (
      <div>
        <History history={this.state.history} />
        <Total total={this.state.totalDisplay} />
        <div className='row'>
          {this.renderNumbers('9', 'key', (e) => this.displayDigit(e))}
          {this.renderNumbers('-', 'key', (e) => this.click(e))}
          {this.renderNumbers('+', 'key', (e) => this.click(e))}
        </div>
        <div className='row'>
          {this.renderNumbers('9', 'key', (e) => this.displayDigit(e))}
          {this.renderNumbers('8', 'key', (e) => this.displayDigit(e))}
          {this.renderNumbers('7', 'key', (e) => this.displayDigit(e))}
        </div>
        <div className='row'>
          {this.renderNumbers('6', 'key', (e) => this.displayDigit(e))}
          {this.renderNumbers('5', 'key', (e) => this.displayDigit(e))}
          {this.renderNumbers('4', 'key', (e) => this.displayDigit(e))}
        </div>
        <div className='row'>
          {this.renderNumbers('3', 'key', (e) => this.displayDigit(e))}
          {this.renderNumbers('2', 'key', (e) => this.displayDigit(e))}
          {this.renderNumbers('1', 'key', (e) => this.displayDigit(e))}
        </div>
        <div className='row'>
          {this.renderNumbers('+/-', 'key', (e) => this.click(e))}
          {this.renderNumbers('0', 'key', (e) => this.displayDigit(e))}
          {this.renderNumbers('.', 'key', (e) => this.click(e))}
        </div>
      </div>
    );
  }
}

export default Calculator;
