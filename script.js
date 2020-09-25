
class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear()
    }
    clear(){  //to clear the different variables
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    delete(){  // for delete a single number
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNumber(number){  // to add number to the screen
        if(number === '.' && this.currentOperand.includes('.'))
        return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute(){  // to take values inside of the calculator and compute single value 
        let computation
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) 
        return
        switch(this.operation){
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break; 
            default:
                return       
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = ''
     }

     getDisplayNumber(number){
         return number;
     }
    updateDisplay(){
        this.currentOperandTextElement.innerText =  this.getDisplayNumber(this.currentOperand)
        if(this.operation != null) {    
        this.previousOperandTextElement.innerText =  '${this.getDisplayNumber   (this.previousOperand)} ${this.operation}'
    }
    }
}


const numberButtons = document.querySelectorAll('[number]');
const operationButtons = document.querySelectorAll('[operator]');
const equalsButton = document.querySelector('[data-equals]');
const daleteButton = document.querySelector('[delete]');
const allClearButton = document.querySelector('[all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator =  new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button =>{
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

daleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})