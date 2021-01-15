// make the calculator work. store the first number that is input into the calculator when user pressed an operator, and also save which operation has been chosen --> then operate() on them when the user presses the "=" key
// 1. once operate() has been called, update the display with the 'solution' to the operation.
// 2. this is the hardest part of the project. You need to figure out how to store all the values and call the operate function with them. Don’t feel bad if it takes you a while to figure out the logic.

// fix bugs
// 1. Users should be able to string together several operations and get the right answer, with each pair of numbers being evaluated at a time. For example, 12 + 7 - 5 * 3 = should yield 42. An example of the behavior we’re looking for would be this student solution. Your calculator should not evaluate more than a single pair of numbers at a time. If you enter a number then an operator and another number that calculation should be displayed if your next input is an operator. The result of the calculation should be used as the first number in your new calculation.
// 2. You should round answers with long decimals so that they don’t overflow the screen.
// 3. Pressing = before entering all of the numbers or an operator could cause problems!
// 4. Pressing “clear” should wipe out any existing data.. make sure the user is really starting fresh after pressing “clear”
// 5. Display a snarky error message if the user tries to divide by 0… don’t let it crash your calculator!

// EXTRA CREDIT: Users can get floating point numbers if they do the math required to get one, but they can’t type them in yet. Add a . button and let users input decimals! Make sure you don’t let them type more than one though: 12.3.56.5. It is hard to do math on these numbers. (disable the decimal button if there’s already one in the display)

// EXTRA CREDIT: Add keyboard support!

// ██████╗  █████╗ ████████╗ █████╗ 
// ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
// ██║  ██║███████║   ██║   ███████║
// ██║  ██║██╔══██║   ██║   ██╔══██║
// ██████╔╝██║  ██║   ██║   ██║  ██║
// ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
                                 
// Elements
const elements = {
    h1: document.querySelector('h1'),
    calculator: document.querySelector('.calculator'),
    displayScreen: document.querySelector('.display-screen'),
    inputDisplay: document.querySelector('.input-display'),
    outputDisplay: document.querySelector('.output-display'),
    shiftBtn: document.querySelector('.shift-btn'),
    alphaBtn: document.querySelector('.alpha-btn'),
    replayBtn: document.querySelector('#replay-btn'),
    modeBtn: document.querySelector('.mode-clr-btn'),
    powerBtn: document.querySelector('.power-btn'),
}

// Datasets
const blackBtnLabels = [
    // 1st row
    ["𝒳\u207b\u00B9", "𝒳!"],
    ["nCr", "nPr"],
    [],
    [],
    ["Pol(", "Rec(", ":"],
    ["𝒳\u00b3", "\u221b"],
    // 2nd row
    ["a\u2106", "\u2105"],
    ["\u221a"],
    ["x\u00b2"],
    ["\u2227","\u221c"],
    ["\u33d2","10\u207f"],
    ["\u33d1","e\u207f", "\u0065"],
    // 3rd row
    ["\u0028\u2212\u0029","","A"],
    [`\u00b0\u2019\u201d`,"\u02ff", "B"],
    ["hyp","","C"],
    ["sin","sin\u207b\u00B9","D"],
    ["cos","cos\u207b\u00B9","E"],
    ["tan","tan\u207b\u00B9","F"],
    // 4th row
    ["RCL","STO"],
    ["ENG","\u02ff"],
    ["("],
    [")","","X"],
    ["\u275c",";","Y"],
    ["M+","M\u2212","M","DT","\u23a3CL\u23a6"],
],
    realBtnObjLabels = [
    // 1st row
    ["7",""],
    ["8",""],
    ["9",""],
    ["DEL","INS"],
    ["AC","OFF"],
    // 2nd row
    ["4",""],
    ["5",""],
    ["6",""],
    ["\u00d7",""],
    ["\u00f7",""],
    // 3rd row
    ["1","","","","\u23a1S-SUM\u23a4"],
    ["2","","","","\u23a1S-VAR\u23a4"],
    ["3",""],
    ["\u002b",""],
    ["\u2212",""],
    // 4th row
    ["0","Rnd"],
    [".","Ran#"],
    ["EXP","\u03c0"],
    ["Ans","DRG\u25b8"],
    ["=","%"],
],
    words = [
    "5317738", // BELLIES
    "618", // BIG
    "", // hidden btn
    "", // hidden btn
    "5318008", // BOOBIES
    "0.63", // EGO
    "0.70616", // GIGOLO
    "5318806", // GOBBIES
    "35006", // GOOSE
    "0.7734", // HELLO
    "53177187714", // HILLBILLIES
    "50804", // HOBOS
    "707", // LOL
    "35380", // OBESE
    "57735+345", // SHE SELLS
    "577345335", // SEESHELLS
    "4615", // SIGH
    "0.705", // SOLO
    "808", // BOB
    "351073", // ELOISE
    "337", // LEE
    "0.637", // LEO
    "31770", // OLLIE  
    "31220", // OZZIE
];

// Variables
let userInput = [],
    storage = [],
    answers = [],
    replayIndex = 0;
    zoomToggled = false;
    powerOn = false;
    calcUpright = true;
    displayScreenOn = false;

// ██╗      ██████╗  ██████╗ ██╗ ██████╗
// ██║     ██╔═══██╗██╔════╝ ██║██╔════╝
// ██║     ██║   ██║██║  ███╗██║██║     
// ██║     ██║   ██║██║   ██║██║██║     
// ███████╗╚██████╔╝╚██████╔╝██║╚██████╗
// ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝ ╚═════╝
                                         
// Plain Buttons

activatePowerBtn();

// Black Buttons

let blkBtnObj = {
    element: document.querySelector(".black-buttons-grid"),
    columns: 6,
    rows: 4,
    columnGap: "5%",
    rowGap: "10%",
    type: "button",
    class: "black-button",
    buttons: [],
    labelValues: blackBtnLabels,
    centerLabels: [],
    leftLabels: [],
    rightLabels: [],
};
createGrid(blkBtnObj); // create black button grid
setArrayIndexAsElementValue(blkBtnObj.buttons); // assign element values
addLabels(blkBtnObj); // add labels to black buttons
hideMiddleTwoBlkBtns();
modifyMBtn(); // custom assign label for M+ button

// REAL BUTTONS (NUM & OP)

let realBtnObj = {
    element: document.querySelector(".real-buttons-grid"),
    columns: 5,
    rows: 4,
    columnGap: "5%",
    rowGap: "8%",
    type: "button",
    class: "real-button",
    buttons: [],
    labelValues: realBtnObjLabels,
    centerLabels: [],
    leftLabels: [],
    rightLabels: [],
};
createGrid(realBtnObj); // create real button grid
addLabels(realBtnObj); // add labels to real buttons
let numBtnObj = {
    0: realBtnObj.buttons[15],
    1: realBtnObj.buttons[10],
    2: realBtnObj.buttons[11],
    3: realBtnObj.buttons[12],
    4: realBtnObj.buttons[5],
    5: realBtnObj.buttons[6],
    6: realBtnObj.buttons[7],
    7: realBtnObj.buttons[0],
    8: realBtnObj.buttons[1],
    9: realBtnObj.buttons[2],
    decimal: realBtnObj.buttons[16],
}
let opBtnObj = {
    del: realBtnObj.buttons[3],
    ac: realBtnObj.buttons[4],
    multiply: realBtnObj.buttons[8],
    divide: realBtnObj.buttons[9],
    add: realBtnObj.buttons[13],
    subtract: realBtnObj.buttons[14],
    exp: realBtnObj.buttons[17],
    ans: realBtnObj.buttons[18],
    equals: realBtnObj.buttons[19],
}
let numBtnObjArr = Object.values(numBtnObj);
styleBtnColor(opBtnObj.del, "pink");
styleBtnColor(opBtnObj.ac, "pink");
addSSUMandSVARLabels();

// ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
// ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
// █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
// ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
// ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
// ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝

function operate(e) {
    rotateCalcUpright();
    // 'DEL' or 'AC' clicked: return out of function
    switch (this.value) {
        case "AC":
            allClear();
            return;
        case "DEL":
            userInput.pop();
            elements.inputDisplay.textContent = userInput.join('');
            return;
        case "Ans":
            displayInput();
            return;
    }
    // No user input stored or (there is nothing in input display field and operator is "="): return
    if (!userInput[0] || (elements.inputDisplay.textContent == "" && this.value == "=")) {
        return;
    }
    // If user presses an operator after pressing "=" it will display the previous answer as the new input number to operate with.
    if (!(this.value == "=")) {
        displayInput();
    }
    // '+', '−', '×', '÷', '=', 'EXP', or 'ANS' clicked: make userInput a number and store as newNum
    let newNum = +userInput.join('');
    clearUserInput();
    // Prepare first number to be operated upon
    if (!storage[0]) {
        storeInitialNumAndOp();
        displayOutput();
        return;
    };

    // CALCULATE AND STORE ANSWERS
    storeNumAndOp();
    let prevOp = storage[storage.length-2][1]; // previously stored operator
    // Divide by Zero error
    if (storage[storage.length-1][0] == 0 && prevOp == '÷') {
        allClear();
        vanishCalc();
        return;
    }
    calculateAndStoreNum();
    displayOutput();
    if (this.value == "=") {
        storeAnswer();
        userInput.push(String(storage[storage.length - 1][0]));
        emptyStorage();
        clearInputDisplay();
        // elements.outputDisplay.textContent = answers[answers.length-1];
    }

    // Display Functions INNER
    function displayOutput() {
        elements.outputDisplay.textContent = storage[storage.length - 1][0];
    }

    // Data Functions INNER
    function storeInitialNumAndOp() {
        storage[0] = [];
        // Each array in storage: index 0: numbers, index 1: operators
        storage[0][0] = +(String(newNum).substr(0, 15)); // user input number
        storage[0][1] = e.target.value; // operator
        console.log("first num and op stored in storage: " + storage[0]);
    }
    function storeNumAndOp() {
        storage[storage.length] = [];
        storage[storage.length - 1][0] = newNum; // number
        storage[storage.length - 1][1] = e.target.value;
    }
    function calculateAndStoreNum() {
        console.log("before calculation - storage: " + storage);
        let answer;
        switch (prevOp) {
            case '+':
                answer = add(storage[storage.length - 2][0], storage[storage.length - 1][0]);
                break;
            case '−':
                answer = subtract(storage[storage.length - 2][0], storage[storage.length - 1][0]);
                break;
            case '×':
                answer = multiply(storage[storage.length - 2][0], storage[storage.length - 1][0]);
                break;
            case '÷':
                answer = divide(storage[storage.length - 2][0], storage[storage.length - 1][0]);
                break;
            case 'EXP':
                answer = exp(storage[storage.length - 2][0], storage[storage.length - 1][0]);
                break;
        }
        answer = +(String(answer).substr(0, 15));
        storage[storage.length - 1][0] = answer;
        console.log("after calculation: " + storage);
    }
    function storeAnswer() {
        answers.push(storage[storage.length - 1][0]);
        console.log("final results: " + answers);
    }
}


// Data Functions
function processInput() {
    if (userInput.length == 23) {
        playError();
        return;
    }
    if (this.value == "." && userInput[userInput.length-1] == ".") {
        playError();
        return;
    } else if (this.value == "." && userInput.includes(".")) {
        playError();
        return;
    } else {
        userInput.push(this.value);
        playNum();
        displayInput();
    }
    
}
function clearUserInput() {
    userInput = [];
}
function emptyStorage() {
    storage = [];
}
function allClear() {
    emptyStorage();
    clearUserInput();
    clearInputDisplay();
    outputDisplay0();
    rotateH1UpsideDown();
}
function hardClear() {
    allClear();
    answers = [];
}
function replay() {
    if (!answers[0]) {
        playError();
        return;
    }
    clearUserInput();
    userInput.push(String(answers[replayIndex]));
    displayInput();
    playReplay();
    if (replayIndex == answers.length-1) {
        replayIndex = 0;
    } else {
        replayIndex++;
    }
}

// Calculator Display Functions
function toggleDisplayScreen() {
    elements.displayScreen.classList.toggle("display-screen-on");
    displayScreenOn = !displayScreenOn;
}
function displayInput() {
    rotateH1Upright();
    rotateCalcUpright();
    elements.inputDisplay.textContent = userInput.join('');
}
function displayWord() {
    allClear();
    rotateH1Upright();
    rotateCalcUpsideDown();
    elements.inputDisplay.textContent = words[this.value];
}
function clearInputDisplay() {
    elements.inputDisplay.textContent = '';
}
function outputDisplay0() {
    elements.outputDisplay.textContent = "0";
}

// Audio Functions
function playShift() {
    if (!zoomToggled) {
        zoomToggled = true;
        const audio = document.querySelector(`audio[name="shiftup"]`);
        audio.currentTime = 0; // rewind to the start
        audio.playbackRate = 0.8;
        audio.play();
    } else {
        zoomToggled = false;
        const audio = document.querySelector(`audio[name="shiftdn"]`);
        audio.currentTime = 0; // rewind to the start
        audio.playbackRate = 0.7;
        audio.play();
    }
}
function playAlpha() {
    const audio = document.querySelector(`audio[name="alpha"]`);
    if(!audio) return;
    audio.currentTime = 0; // rewind to the start
    audio.play();
}
function playReplay() {
    const audio = document.querySelector(`audio[name="replay"]`);
    if(!audio) return;
    audio.currentTime = 0; // rewind to the start
    audio.play();
}
function playMode() {
    const audio = document.querySelector(`audio[name="mode"]`);
    if(!audio) return;
    audio.currentTime = 0; // rewind to the start
    audio.play();
}
function playPower() {
    if (!powerOn) {
        const audio = document.querySelector(`audio[name="on"]`);
        audio.currentTime = 0; // rewind to the start
        audio.play();
    } else {
        const audio = document.querySelector(`audio[name="off2"]`);
        audio.currentTime = 0; // rewind to the start
        audio.playbackRate = 1;
        audio.play();
    }
}
function playWord() {
    if (calcUpright) {
        const audio = document.querySelector(`audio[name="spiral"]`);
        if(!audio) return;
        audio.currentTime = 0; // rewind to the start
        audio.play();
    } else {
        const audio = document.querySelector(`audio[name="chime"]`);
        if(!audio) return;
        audio.currentTime = 0; // rewind to the start
        audio.playbackRate = 1;
        audio.play();
    }
    calcUpright = false;
}
function playNum() {
    const audio = document.querySelector(`audio[name="num"]`);
    if(!audio) return;
    audio.currentTime = 0; // rewind to the start
    audio.play();
}
function playOp() {
    const audio = document.querySelector(`audio[name="op"]`);
    if(!audio) return;
    audio.currentTime = 0; // rewind to the start
    audio.play();
}
function playDEL() {
    let audio;
    if (userInput[0]) {
        console.log(`if statement. userInput: ${userInput}`)
        audio = document.querySelector(`audio[name="DEL"]`);
    } else {
        console.log(`else statement. userInput: ${userInput}`)
        audio = document.querySelector(`audio[name="error"]`);
    }
    if(!audio) return;
    audio.currentTime = 0; // rewind to the start
    audio.play();
}
function playAC() {
    const audio = document.querySelector(`audio[name="AC"]`);
    if(!audio) return;
    audio.currentTime = 0; // rewind to the start
    audio.play();
}
function playError() {
    const audio = document.querySelector(`audio[name="error"]`);
    if(!audio) return;
    audio.currentTime = 0; // rewind to the start
    audio.play();
}
// window.addEventListener('click', playSound);
// function playSound(e) {
//     const audio = document.querySelector(`audio[name="${e.target.value}"]`);
//     if(!audio) return;
//     audio.currentTime = 0; // rewind to the start
//     audio.play();
// }

// Operator Functions
function add(a,b) {
    return a+b;
}
function subtract(a,b) {
    return a-b;
}
function multiply(a,b) {
    return a*b;
}
function divide(a,b) {
    return a/b;
}
function exp(a,b) {
    return (a) * (10**b);
}

// DOM Styling Functions
function createGrid(obj) {
    obj.element.style.gridTemplateColumns = `repeat(${obj.columns}, 1fr)`;
    obj.element.style.gridTempalateRows = `repeat(${obj.rows}, 1fr)`;
    obj.element.style.columnGap = obj.columnGap;
    obj.element.style.rowGap = obj.rowGap;
    for (i=0;i<obj.columns*obj.rows;i++) {
        obj.buttons[i] = document.createElement(obj.type);
        obj.buttons[i].classList.toggle(obj.class);
        obj.buttons[i].style.position = "relative";
        obj.buttons[i].setAttribute('value', obj.labelValues[i][0]);
        obj.element.appendChild(obj.buttons[i]);
    }
}
function addLabels(obj) {
    for (i=0;i<obj.labelValues.length;i++) {
        obj.buttons[i].textContent = obj.labelValues[i][0];
        if (obj.labelValues[i][2]) {
            //left label
            obj.leftLabels[i] = document.createElement('h2');
            obj.leftLabels[i].textContent = obj.labelValues[i][1];
            obj.leftLabels[i].classList.toggle('left-label');
            obj.leftLabels[i].classList.toggle('shift-h');
            obj.leftLabels[i].classList.toggle('btn-label');
            obj.buttons[i].appendChild(obj.leftLabels[i]);
            //right label
            obj.rightLabels[i] = document.createElement('h2');
            obj.rightLabels[i].textContent = obj.labelValues[i][2];
            obj.rightLabels[i].classList.toggle('right-label');
            obj.rightLabels[i].classList.toggle('alpha-h');
            obj.rightLabels[i].classList.toggle('btn-label');
            obj.buttons[i].appendChild(obj.rightLabels[i]);
        } else if (obj.labelValues[i][1]) {
            //center label
            obj.centerLabels[i] = document.createElement('h2');
            obj.centerLabels[i].textContent = obj.labelValues[i][1];
            obj.centerLabels[i].classList.toggle('center-label');
            obj.centerLabels[i].classList.toggle('shift-h');
            obj.centerLabels[i].classList.toggle('btn-label');
            obj.buttons[i].appendChild(obj.centerLabels[i]);
        }

    }
}
function hideMiddleTwoBlkBtns() {
    blkBtnObj.buttons[2].style.visibility = "hidden";
    blkBtnObj.buttons[3].style.visibility = "hidden";
}
function modifyMBtn() {
    let dtLabel = document.createElement('h2');
    dtLabel.textContent = 'DT\u23a3CL\u23a6';
    dtLabel.classList.toggle('dt-label');
    blkBtnObj.buttons[blkBtnObj.buttons.length - 1].appendChild(dtLabel);
}
function styleBtnColor(btn,color) {
    btn.style.backgroundColor = `var(--${color})`;
}
function addSSUMandSVARLabels() {
    let sSumLabel = document.createElement('h2');
    sSumLabel.textContent = '\u23a1S-SUM\u23a4';
    sSumLabel.classList.toggle('s-label');
    realBtnObj.buttons[10].appendChild(sSumLabel);
    let sVarLabel = document.createElement('h2');
    sVarLabel.textContent = '\u23a1S-VAR\u23a4';
    sVarLabel.classList.toggle('s-label');
    realBtnObj.buttons[11].appendChild(sVarLabel);
}

// DOM Transform Functions
function toggleZoom() {
    elements.calculator.classList.toggle("calculator-zoom");
    playShift();

}


function rotateH1Upright() {
    elements.h1.classList.add('h1-rotate');
}
function rotateH1UpsideDown() {
    elements.h1.classList.remove('h1-rotate');
}
function rotateCalcUpsideDown() {
    elements.calculator.classList.add("calculator-rotate");
}
function rotateCalcUpright() {
    elements.calculator.classList.remove('calculator-rotate');
    calcUpright = true;
}
function vanishCalc() {
    elements.calculator.classList.add("calculator-vanish");
}

// Variable Functions
function setArrayIndexAsElementValue(arr) {
    for (i=0;i<arr.length;i++) {
        arr[i].setAttribute("value", i);
    }
}

// Event Listener Functions

function activatePowerBtn() {
    elements.powerBtn.addEventListener("click", togglePower);
}
function togglePower() {
    if (!powerOn) { // Turn power on
        activateShiftBtn();
        activateReplayBtn();
        activateBlkBtns();
        activateNumBtns();
        activateOpBtns();
        allClear();
        toggleDisplayScreen(); // ON
        playPower();
    } else { // Turn power off
        deactivateShiftBtn();
        deactivateReplayBtn();
        deactivateBlkBtns();
        deactivateNumBtns();
        deactivateOpBtns();
        allClear();
        toggleDisplayScreen(); // OFF
        playPower();
    }
    powerOn = !powerOn;
}
function activateShiftBtn() {
    elements.shiftBtn.addEventListener("click", toggleZoom);
}
function deactivateShiftBtn() {
    elements.shiftBtn.removeEventListener("click", toggleZoom);
}
function activateReplayBtn() {
    elements.replayBtn.addEventListener("click", replay);
}
function deactivateReplayBtn() {
    elements.replayBtn.removeEventListener("click", replay);
}
function activateBlkBtns() {
    for (i = 0; i < blkBtnObj.buttons.length; i++) {
        blkBtnObj.buttons[i].addEventListener("click", displayWord);
        blkBtnObj.buttons[i].addEventListener("click", playWord);
    }
}
function deactivateBlkBtns() {
    for (i = 0; i < blkBtnObj.buttons.length; i++) {
        blkBtnObj.buttons[i].removeEventListener("click", displayWord);
        blkBtnObj.buttons[i].removeEventListener("click", playWord);
    }
}
function activateNumBtns() {
    numBtnObjArr.forEach((obj) => {
        obj.addEventListener("click", processInput);
    });
}
function deactivateNumBtns() {
    numBtnObjArr.forEach((obj) => {
        obj.removeEventListener("click", processInput);
    });
}
function activateOpBtns() {
    for (obj of Object.values(opBtnObj)) {
        if (obj.value != "DEL" && obj.value != "AC") {
            obj.addEventListener("click", playOp); // activate sound
        } else if (obj.value == "DEL") {
            obj.addEventListener("click", playDEL);
        } else if (obj.value == "AC") {
            obj.addEventListener("click", playAC);
        }
        obj.addEventListener("click", operate);
    }
}
function deactivateOpBtns() {
    for (obj of Object.values(opBtnObj)) {
        if (obj.value != "DEL" && obj.value != "AC") {
            obj.removeEventListener("click", playOp); // activate sound
        }
        obj.removeEventListener("click", operate);
    }
}