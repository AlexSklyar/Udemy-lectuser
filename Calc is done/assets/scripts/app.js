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
function calculateResult(calculationType) {
     const enterNumber = getUserNumberInput();
    if (calculationType !== 'ADD' &&
        calculationType !== 'SUBTRACT' &&
        calculationType !== 'MULTYPLY' &&
        calculationType !== 'DIVIDE' ||
        !enterNumber
    ) {
        return;
    }
    // if (calculationType === 'ADD' ||
    //     calculationType === 'SUBTRACT' ||
    //     calculationType === 'MULTYPLY' ||
    //     calculationType === 'DIVIDE'
    // ) {
   
    const initialResult = currentResult;
    let mathOperator;
    if (calculationType === 'ADD') {
        currentResult += enterNumber;
        mathOperator = '+';
    } else if (calculationType === 'SUBTRACT') {
        currentResult -= enterNumber;
        mathOperator = '-';
    } else if (calculationType === 'MULTYPLY') {
        currentResult *= enterNumber;
        mathOperator = '*';
    } else {
        currentResult /= enterNumber;
        mathOperator = '/';
    }
    crateAndWriteOutput(mathOperator, initialResult, enterNumber);
    writeToLog(calculationType, initialResult, enterNumber, currentResult);
    // }
}

addBtn.addEventListener('click', calculateResult.bind(this, 'ADD'));
subtractBtn.addEventListener('click', calculateResult.bind(this, 'SUBTRACT'));
multiplyBtn.addEventListener('click', calculateResult.bind(this, 'MULTYPLY'));
divideBtn.addEventListener('click', calculateResult.bind(this, 'DIVIDE'));
