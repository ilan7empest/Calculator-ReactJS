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

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  // Handle Key Down = keypress indicates which character was entered. keydown event is fired for all keys
  handleKeyDown = (e) => {
    let { key, code } = e;
    // Todo: Focus elements
    if (!code) {
      return;
    }
    const currentKey = document.body.querySelector(`#${code}`);
    if (currentKey) {
      currentKey.focus();
    }

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

  // Handle Digit keys (0-9). @digit = string. returned value from the button
  displayDigit = (digit) => {
    const { isOperatorClicked, operator, display, history } = this.state;
    const lastHistoryChar = history[history.length - 1];

    if (operator === '=' || lastHistoryChar === '=') {
      this.setState({
        display: digit,
        isOperatorClicked: false,
        history: [],
        value: null,
      });
    } else if (isOperatorClicked && operator !== '=') {
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
    const { value, display, operator, history, isOperatorClicked } = this.state;
    // Convert "display" from a string to a number
    const parseDisplay = parseFloat(display);
    // Return new array on each operation click
    const logAction = history.concat([parseDisplay, selectedOperator]);
    const lastHistoryChar = history[history.length - 1];

    if (lastHistoryChar !== '=') {
      this.setState({
        operator: selectedOperator,
      });
    }

    // value set to 0 if no digit clicked
    if (value === null) {
      this.setState({
        value: parseDisplay,
      });
    }
    if (!isOperatorClicked) {
      this.setState({
        isOperatorClicked: true,
        history: logAction,
      });
    }

    // if basic operator clicked
    if (operator) {
      const result = basicOperators[operator](value || 0, parseDisplay); // returned calculated value based on the operator /*-+
      const stringResult = result + ''; // Convert result to string for comparison

      if (selectedOperator === '=' && operator !== '=') {
        this.setState((prevState) => {
          return {
            history: [...prevState.history],
            value: result,
            display: stringResult,
            log: [
              [...prevState.history.concat(+stringResult)],
              ...prevState.log,
            ],
            operator: selectedOperator,
          };
        });
        // Change operator sign if last history sign is an operator
      } else if (
        typeof lastHistoryChar === 'string' &&
        lastHistoryChar !== '=' &&
        this.state.isOperatorClicked &&
        selectedOperator !== '='
      ) {
        const updateLog = [...history];
        updateLog.splice(-1, 1, selectedOperator);
        this.setState({
          operator: selectedOperator,
          history: updateLog,
        });
      } else if (
        lastHistoryChar === '=' &&
        this.state.isOperatorClicked &&
        selectedOperator !== '='
      ) {
        this.setState({
          operator: selectedOperator,
          history: [display, selectedOperator],
        });
      } else if (
        lastHistoryChar === '=' &&
        this.state.isOperatorClicked &&
        selectedOperator === '='
      ) {
        return;
      } else if (stringResult === 'NaN' || stringResult === 'Infinity') {
        this.setState({
          value: null,
          display: stringResult === 'NaN' ? 'Result is NaN' : '∞',
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
      const [char, n, cn, cb] = args;
      return (
        <CalcButton name={n} type={char} className={cn} onClick={cb}>
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
              {renderCalculatorKey('AC', 'clearAll', 'digit', this.clearAll)}
              {renderCalculatorKey('C', 'clear', 'digit', this.clearDisplay)}
              {renderCalculatorKey(
                'BACKSPACE',
                'Backspace',
                'digit icon key-backspace',
                this.removeLastChar
              )}
            </div>
            <div className='d-flex flex-row flex-nowrap'>
              <div className='digits'>
                {renderCalculatorKey('9', 'Numpad9', 'digit', (e) =>
                  this.displayDigit(e)
                )}
                {renderCalculatorKey('8', 'Numpad8', 'digit', (e) =>
                  this.displayDigit(e)
                )}
                {renderCalculatorKey('7', 'Numpad7', 'digit', (e) =>
                  this.displayDigit(e)
                )}
                {renderCalculatorKey('6', 'Numpad6', 'digit', (e) =>
                  this.displayDigit(e)
                )}
                {renderCalculatorKey('5', 'Numpad5', 'digit', (e) =>
                  this.displayDigit(e)
                )}
                {renderCalculatorKey('4', 'Numpad4', 'digit', (e) =>
                  this.displayDigit(e)
                )}
                {renderCalculatorKey('3', 'Numpad3', 'digit', (e) =>
                  this.displayDigit(e)
                )}
                {renderCalculatorKey('2', 'Numpad2', 'digit', (e) =>
                  this.displayDigit(e)
                )}
                {renderCalculatorKey('1', 'Numpad1', 'digit', (e) =>
                  this.displayDigit(e)
                )}
                {renderCalculatorKey(
                  '·',
                  'NumpadDecimal',
                  'digit',
                  this.displayDecimal
                )}
                {renderCalculatorKey('0', 'Numpad0', 'digit', (e) =>
                  this.displayDigit(e)
                )}
                {renderCalculatorKey(
                  '±',
                  'toogleSign',
                  'digit',
                  this.toggleSign
                )}
              </div>
              <div className='basic-operators d-flex flex-row justify-content-around'>
                <div className='d-flex flex-column justify-content-between'>
                  {renderCalculatorKey(
                    'DIVIDE',
                    'NumpadDivide',
                    'basic icon',
                    () => this.basicOperator('/')
                  )}
                  {renderCalculatorKey(
                    'MULTIPLY',
                    'NumpadMultiply',
                    'basic icon',
                    () => this.basicOperator('*')
                  )}
                  {renderCalculatorKey('-', 'NumpadSubtract', 'basic', () =>
                    this.basicOperator('-')
                  )}
                  {renderCalculatorKey('+', 'NumpadAdd', 'basic', () =>
                    this.basicOperator('+')
                  )}
                </div>
                <div className='d-flex flex-column justify-content-end'>
                  {renderCalculatorKey('=', 'NumpadEnter', 'basic equal', () =>
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
