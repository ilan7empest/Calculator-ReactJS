import React, { Component } from 'react';
import CalcButton from '../components/CalcButton';
import { basicOperators } from '../utils/basicOperators';
import Log from '../components/Log';
import { Display } from '../components/display';
import { History } from '../components/History';

class Calculator extends Component {
  state = {
    value: null,
    display: '0',
    operator: null,
    isOperatorClicked: false,
    history: [],
    log: [],
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
    const { isOperatorClicked, operator, display } = this.state;
    if (isOperatorClicked && operator !== '=') {
      this.setState({
        display: digit,
        isOperatorClicked: false,
      });
    } else if (operator === '=') {
      this.setState({
        display: digit,
        isOperatorClicked: false,
        history: [],
      });
    } else {
      this.setState({
        display: display === '0' ? digit : display + digit,
      });
    }
  };

  // Handle Decimal Key
  displayDecimal = () => {
    const { display } = this.state;
    if (!display.includes('.')) {
      this.setState({
        display: `${display}.`,
        isOperatorClicked: false,
      });
    }
  };

  // Handle Toggle sign -+
  toggleSign = () => {
    const { display } = this.state;
    const parseDisplay = parseFloat(display) * -1;
    this.setState({
      display: parseDisplay.toString(),
    });
  };

  // Basic Operators
  basicOperator = (selectedOperator) => {
    const { value, display, operator, history } = this.state;
    // Convert "display" from a string to a number
    const parseDisplay = parseFloat(display);
    // Return new array on each
    let logAction = history.concat([display, selectedOperator]);

    this.setState({
      operator: selectedOperator,
      isOperatorClicked: true,
      history: logAction,
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
      } else if (selectedOperator === '=') {
        this.setState((prevState) => {
          return {
            history: [...prevState.history],
            value: result,
            display: stringResult,
            log: [
              [...prevState.history.concat(stringResult)],
              ...prevState.log,
            ],
          };
        });
      } else {
        this.setState({
          value: result,
          display: stringResult,
          history: logAction,
        });
      }
    }
  };

  // Handle remove last char
  removeLastChar = () => {
    const { display, value } = this.state;
    let sliced = display.slice(0, -1);
    if (display !== String(value))
      this.setState({
        display: sliced || '0',
      });
  };
  // Handle clear display
  clearDisplay = () => {
    this.setState({ display: '0' });
  };

  //handle clearall
  clearAll = () => {
    this.setState({
      value: null,
      display: '0',
      operator: null,
      isOperatorClicked: false,
      history: [],
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
      <div className='container'>
        <div className='calculator'>
          <div className='top-panel'>
            <Log log={this.state.log} />
            <History history={this.state.history} />
            <Display display={this.state.display} />
          </div>

          <div className='keypad'>
            <div className='special-operators justify-content-start'>
              {renderCalculatorKey('AC', 'digit', this.clearAll)}
              {renderCalculatorKey('C', 'digit', this.clearDisplay)}
              {renderCalculatorKey(
                '',
                'digit key-backspace',
                this.removeLastChar
              )}
            </div>
            <div className='d-flex flex-row flex-nowrap'>
              <div className='digits'>
                {renderCalculatorKey('9', 'digit', (e) => this.displayDigit(e))}
                {renderCalculatorKey('8', 'digit', (e) => this.displayDigit(e))}
                {renderCalculatorKey('7', 'digit', (e) => this.displayDigit(e))}
                {renderCalculatorKey('6', 'digit', (e) => this.displayDigit(e))}
                {renderCalculatorKey('5', 'digit', (e) => this.displayDigit(e))}
                {renderCalculatorKey('4', 'digit', (e) => this.displayDigit(e))}
                {renderCalculatorKey('3', 'digit', (e) => this.displayDigit(e))}
                {renderCalculatorKey('2', 'digit', (e) => this.displayDigit(e))}
                {renderCalculatorKey('1', 'digit', (e) => this.displayDigit(e))}
                {renderCalculatorKey('·', 'digit', this.displayDecimal)}
                {renderCalculatorKey('0', 'digit', (e) => this.displayDigit(e))}
                {renderCalculatorKey('±', 'digit', this.toggleSign)}
              </div>
              <div className='basic-operators d-flex flex-row justify-content-around'>
                <div className='d-flex flex-column justify-content-between'>
                  {renderCalculatorKey('/', 'basic', () =>
                    this.basicOperator('/')
                  )}
                  {renderCalculatorKey('*', 'basic', () =>
                    this.basicOperator('*')
                  )}
                  {renderCalculatorKey('-', 'basic', () =>
                    this.basicOperator('-')
                  )}
                  {renderCalculatorKey('+', 'basic', () =>
                    this.basicOperator('+')
                  )}
                </div>
                <div className='d-flex flex-column justify-content-end'>
                  {renderCalculatorKey('=', 'basic equal', () =>
                    this.basicOperator('=')
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
