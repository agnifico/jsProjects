//jshint esversion:6

class Calculator {
  constructor(previousText, currentText) {
    this.previousText = previousText;
    this.currentText = currentText;
    this.clear();
  }

  clear() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operation = undefined;
  }

  delete() {
    if (this.currentOperand.length > 0) {
      this.currentOperand = this.currentOperand.slice(0, -1);
    }
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  updateDisplay() {
    this.currentText.innerText = this.currentOperand;
    this.previousText.innerText = this.previousOperand;
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousText = document.querySelector('[data-previous]');
const currentText = document.querySelector('[data-current]');
const equalsButton = document.querySelector('[data-equals]');

const calculator = new Calculator(previousText, currentText);

numberButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    calculator.appendNumber(this.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    calculator.chooseOperation(this.innerText);
    calculator.updateDisplay();
  });
});


deleteButton.addEventListener('click', function() {
  calculator.delete();
  calculator.updateDisplay();
});


allClearButton.addEventListener('click', function() {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener('click', function() {
  calculator.compute();
  calculator.updateDisplay();
});
