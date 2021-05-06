const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = []

function getUserNumberInput() {
    return +userInput.value
} 

function crateAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
    const currentDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
    outputResult(currentResult, currentDescription);
}

function writeToLog(operationIdentifier, prevResult, operationNumber, newResult) {
const logEntry = {
        operation: operationIdentifier,
        prevresult: prevResult,
        number: operationNumber,
        result: newResult        
    };
    logEntries.push(logEntry);
    console.log(logEntries);

}

function add() {
    const enterNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult +=  enterNumber;
    crateAndWriteOutput('+', initialResult, enterNumber);
    writeToLog('ADD', initialResult, enterNumber, currentResult);
}


function subtract() {
    const enterNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult -= enterNumber;
    crateAndWriteOutput('-', initialResult, enterNumber);
    writeToLog('subtract', initialResult, enterNumber, currentResult);
}

function multiply() {
    const enterNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult *= enterNumber;
    crateAndWriteOutput('*', initialResult, enterNumber);
    writeToLog('multiply', initialResult, enterNumber, currentResult);
}

function divide() {
    const enterNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult /= enterNumber;
    crateAndWriteOutput('/', initialResult, enterNumber);
    writeToLog('divide', initialResult, enterNumber, currentResult);
}




addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);

