// Query Elements
let h1 = document.querySelector('h1'),
    calculator = document.querySelector('.calculator'),
    displayScreen = document.querySelector('.display-screen'),
    inputDisplay = document.querySelector('.input-display'),
    outputDisplay = document.querySelector('.output-display'),
    shiftBtn = document.querySelector('.shift-btn'),
    powerBtn = document.querySelector('.power-btn');

// Datasets
let blackBtnLabels = [
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

// Storage
let userInput = [];

// BLACK BUTTONS //

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
createGrid(blkBtnObj);
// assign attribute "value" to each button
for (i=0;i<blkBtnObj.buttons.length;i++) {
    blkBtnObj.buttons[i].setAttribute("value", i);
}
addLabels(blkBtnObj);

// adjustments
hideMiddleTwoBlkBtns();
// custom assign labels for M+ button
modifyMBtn();

// REAL BUTTONS //

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
createGrid(realBtnObj);
addLabels(realBtnObj);

// adjustments
realBtnObj.buttons[3].style.backgroundColor = "var(--pink)"; // DEL btn
realBtnObj.buttons[4].style.backgroundColor = "var(--pink)"; // AC btn
// custom assign labels for num buttons "1" and "2" (S-SUM and S-VAR labels)
addSSUMandSVARLabels();

// NUMBER BUTTONS //

// store number buttons and decimal button in object
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
// num buttons object as array
let numBtnObjArr = Object.values(numBtnObj);

// OPERATOR BUTTONS //
// store operator buttons in object
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
// for each opButton, add click listener that CALLS operate(op, a, b)
// for (obj of Object.values(opBtnObj)) {
//     obj.addEventListener("click", operate);
// }


powerBtn.addEventListener("click", togglePower);
/////////////                  //////////////
/////////////                  //////////////
/////////////    FUNCTIONS     //////////////
/////////////    FUNCTIONS     //////////////
/////////////                  //////////////
/////////////                  //////////////


// create function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers
let storage = [];
let finalResults = [];
function modifyMBtn() {
    let dtLabel = document.createElement('h2');
    dtLabel.textContent = 'DT\u23a3CL\u23a6';
    dtLabel.classList.toggle('dt-label');
    blkBtnObj.buttons[blkBtnObj.buttons.length - 1].appendChild(dtLabel);
}

function hideMiddleTwoBlkBtns() {
    blkBtnObj.buttons[2].style.visibility = "hidden";
    blkBtnObj.buttons[3].style.visibility = "hidden";
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

function operate() {
    rotateCalcBack();
    // 'DEL' or 'AC' clicked: return out of function
    switch (this.value) {
        case "AC":
            allClear();
            // transform h1 back to original
            rotateH1Back();
            return;
        case "DEL":
            userInput.pop();
            inputDisplay.textContent = userInput.join('');
            return;
    }
    // No user input stored: return
    if (!userInput[0]) {
        return;
    }

    // '+', '−', '×', '÷', '=', 'EXP', or 'ANS' clicked: make userInput a number and store as newNum
    let newNum = +userInput.join('');
    // clear userInput
    userInput = [];
    // Prepare first number to be operated upon
    if (!storage[0]) {
        storage[0] = [];
        // Eacy array in storage: index 0: numbers, index 1: operators
        storage[0][0] = newNum; // user input number
        storage[0][1] = this.value; // operator
        console.log("first num and op stored in storage: " + storage[0]);
        outputDisplay.textContent = storage[storage.length-1][0];
        return;
    };

    // OPERATE
    storage[storage.length] = [];
    storage[storage.length-1][0] = newNum; // number
    storage[storage.length-1][1] = this.value; // operator
    let prevOp = storage[storage.length-2][1]; // previously stored operator
    console.log("before operation - storage: " + storage);
    switch (prevOp) {
        case '+':
            storage[storage.length-1][0] = add(storage[storage.length-2][0], storage[storage.length-1][0]);
            break;
        case '−':
            storage[storage.length-1][0] = subtract(storage[storage.length-2][0], storage[storage.length-1][0]);
            break;
        case '×':
            storage[storage.length-1][0] = multiply(storage[storage.length-2][0], storage[storage.length-1][0]);
            break;
        case '÷':
            // divide by 0:
            if (storage[storage.length-1][0] == 0) {
                allClear();
                vanishCalc();
                return;
            }
            storage[storage.length-1][0] = divide(storage[storage.length-2][0], storage[storage.length-1][0]);
            break;
        case 'EXP':
            storage[storage.length-1][0] = exp(storage[storage.length-2][0], storage[storage.length-1][0]);
            break;
    }
    console.log("after operation: " + storage);
    outputDisplay.textContent = storage[storage.length-1][0];
    // TODO: clear storage on "=" but keep repeating the final result when user keeps pressing it
    if (this.value == "=") {
        finalResults.push(storage[storage.length-1][0]);
        console.log("final results: " + finalResults);
        storage = [];
        inputDisplay.textContent = "";
        outputDisplay.textContent = finalResults[finalResults.length-1];
    } 
}
function vanishCalc() {
    calculator.classList.add("calculator-vanish");
}

function allClear() {
    storage = [];
    userInput = [];
    inputDisplay.textContent = '';
    outputDisplay.textContent = "0";
    console.log(storage);
}

function rotateH1Back() {
    h1.classList.remove('h1-rotate');
}

function displayInput() {
    rotateH1();
    rotateCalcBack();
    userInput.push(this.value);
    inputDisplay.textContent = userInput.join('');
}
function rotateH1() {
    h1.classList.add('h1-rotate');
}

function rotateCalcBack() {
    calculator.classList.remove('calculator-rotate');
}

function displayWord() {
    inputDisplay.textContent = words[this.value];
    rotate();
}

function rotateCalc() {
    calculator.classList.add("calculator-rotate");
}

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

// OPERATOR FUNCTIONS
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
// create function to create grid buttons
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
// create function to create grid button labels
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

function togglePower() {
    
    if (!powerBtn.hasAttribute("value")) {
        // assign event listener to shift button
        shiftBtn.addEventListener("click", toggleZoom);
        // assign event listeners to each number button
        numBtnObjArr.forEach((obj) => {
            // play Sound
            obj.addEventListener("click", playSoundNum)
            // displayInput
            obj.addEventListener("click", displayInput);
        });
        // assign event listeners to each operator button
        for (obj of Object.values(opBtnObj)) {
            // play Sound
            console.log(obj.value);
            if (obj.value != "DEL" && obj.value != "AC") {
                obj.addEventListener("click", playSoundOp)
            }
            // operate
            obj.addEventListener("click", operate);
        }
        // assign event listeners to each black button
        for (i=0;i<blkBtnObj.buttons.length;i++) {
            blkBtnObj.buttons[i].addEventListener("click", displayWord);
        }
        // display 0 on output display
        outputDisplay.textContent = 0;
        // turn display on
        displayScreen.classList.toggle("display-screen-on");
        // assign value to powerBtn
        powerBtn.setAttribute("value", "on");
        // play sound
        const audio = document.querySelector(`audio[name="on"]`);
        audio.currentTime = 0; // rewind to the start
        audio.play();
    } else {
        // remove event listener to shift button
        shiftBtn.removeEventListener("click", toggleZoom);
        // remove event listeners to each number button
        numBtnObjArr.forEach((obj) => {
            obj.removeEventListener("click", displayInput);
        });
        // remove event listeners to each operator button
        for (obj of Object.values(opBtnObj)) {
            obj.removeEventListener("click", operate);
        }
        // remove event listeners to each black button
        for (i=0;i<blkBtnObj.buttons.length;i++) {
            blkBtnObj.buttons[i].removeEventListener("click", displayWord);
        }
        // clear userInput
        userInput = [];
        // display nothing on input display
        inputDisplay.textContent = null;
        // display nothing on output display
        outputDisplay.textContent = null;
        // turn display off
        displayScreen.classList.toggle("display-screen-on");
        // remove value from powerBtn
        powerBtn.removeAttribute("value");
        // play sound
        const audio = document.querySelector(`audio[name="off2"]`);
        audio.currentTime = 0; // rewind to the start
        audio.play();
    }
}

// remove event listener to shift button
let zoomToggled = false;
function toggleZoom() {
    calculator.classList.toggle("calculator-zoom");
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

window.addEventListener('click', playSound);
function playSound(e) {
    const audio = document.querySelector(`audio[name="${e.target.value}"]`);
    if(!audio) return;
    audio.currentTime = 0; // rewind to the start
    audio.play();
  }

function playSoundNum(e) {
    const audio = document.querySelector(`audio[name="num"]`);
    if(!audio) return;
    audio.currentTime = 0; // rewind to the start
    audio.play();
}

function playSoundOp(e) {
    const audio = document.querySelector(`audio[name="op"]`);
    if(!audio) return;
    audio.currentTime = 0; // rewind to the start
    audio.play();
}