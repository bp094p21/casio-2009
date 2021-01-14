////////////                 ////////////
////////////                 ////////////
////////////     H1          ////////////
////////////     H1          ////////////
////////////                 ////////////
////////////                 ////////////
let h1 = document.querySelector('h1')
console.log(h1);

////////////                 ////////////
////////////                 ////////////
////////////   CALCULATOR    ////////////
////////////   CALCULATOR    ////////////
////////////                 ////////////
////////////                 ////////////
let calculator = document.querySelector('.calculator')
console.log(calculator);

////////////                 ////////////
////////////                 ////////////
////////////     DISPLAY     ////////////
////////////     DISPLAY     ////////////
////////////                 ////////////
////////////                 ////////////
// store the user input in a variable somewhere
let userInput = [];
// get reference to display screen, input display and output display
let displayScreen = document.querySelector('.display-screen');
let inputDisplay = document.querySelector('.input-display');
let outputDisplay = document.querySelector('.output-display');

////////////                 ////////////
////////////                 ////////////
////////////     ON BTN      ////////////
////////////     ON BTN      ////////////
////////////                 ////////////
////////////                 ////////////
// get reference to on button
let powerBtn = document.querySelector('.power-btn');
console.log(powerBtn);

////////////                 ////////////
////////////                 ////////////
////////////  PLAIN BUTTONS  ////////////
////////////  PLAIN BUTTONS  ////////////
////////////                 ////////////
////////////                 ////////////
let shiftBtn = document.querySelector('.shift-btn');
// shiftBtn.addEventListener("click", () => {
//     calculator.classList.toggle("calculator-zoom");
// });

////////////                 ////////////
////////////                 ////////////
////////////  BLACK BUTTONS  ////////////
////////////  BLACK BUTTONS  ////////////
////////////                 ////////////
////////////                 ////////////
let blackBtnGridLabels = [
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
]
let calcWords = [
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
// create object to store black button grid
let blackBtnGrid = {
    element: document.querySelector(".black-buttons-grid"),
    columns: 6,
    rows: 4,
    columnGap: "5%",
    rowGap: "10%",
    type: "button",
    class: "black-button",
    buttons: [],
    labelValues: blackBtnGridLabels,
    centerLabels: [],
    leftLabels: [],
    rightLabels: [],
}
// create black button grid!
createGrid(blackBtnGrid);
// assign index attribute to each button
for (i=0;i<blackBtnGrid.buttons.length;i++) {
    blackBtnGrid.buttons[i].setAttribute("value", i);
}
// assign grid labels to black buttons.
addLabels(blackBtnGrid);

function displayWord() {
    inputDisplay.textContent = calcWords[this.value];
    calculator.classList.add("calculator-rotate");
}
// hide middle 2 buttons on first row of blackBtnGrid
blackBtnGrid.buttons[2].style.visibility = "hidden";
blackBtnGrid.buttons[3].style.visibility = "hidden";
// custom assign labels for M+ button
let dtLabel = document.createElement('h2');
dtLabel.textContent = 'DT\u23a3CL\u23a6';
dtLabel.classList.toggle('dt-label');
blackBtnGrid.buttons[blackBtnGrid.buttons.length-1].appendChild(dtLabel);

////////////                 ////////////
////////////                 ////////////
////////////  REAL BUTTONS   ////////////
////////////  REAL BUTTONS   ////////////
////////////                 ////////////
////////////                 ////////////
let realBtnGridLabels = [
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
];
let realBtnGrid = {
    element: document.querySelector(".real-buttons-grid"),
    columns: 5,
    rows: 4,
    columnGap: "5%",
    rowGap: "8%",
    type: "button",
    class: "real-button",
    buttons: [],
    labelValues: realBtnGridLabels,
    centerLabels: [],
    leftLabels: [],
    rightLabels: [],
}
// create real button grid : )
createGrid(realBtnGrid);
// make background color pink for last 2 buttons on 1st row of real button grid
realBtnGrid.buttons[3].style.backgroundColor = "var(--pink)";
realBtnGrid.buttons[4].style.backgroundColor = "var(--pink)";
// assign grid labels to real buttons!
addLabels(realBtnGrid);
// custom assign labels for 1 and 2 buttons (S-SUM and S-VAR labels)
let sSumLabel = document.createElement('h2');
sSumLabel.textContent = '\u23a1S-SUM\u23a4';
sSumLabel.classList.toggle('s-label');
realBtnGrid.buttons[10].appendChild(sSumLabel);
let sVarLabel = document.createElement('h2');
sVarLabel.textContent = '\u23a1S-VAR\u23a4';
sVarLabel.classList.toggle('s-label');
realBtnGrid.buttons[11].appendChild(sVarLabel);

/////////////                   //////////////
/////////////                   //////////////
/////////////  NUMBER  BUTTONS  //////////////
/////////////  NUMBER  BUTTONS  //////////////
/////////////                   //////////////
/////////////                   //////////////
// store number buttons in its own object
let numberButtons = {
    0: realBtnGrid.buttons[15],
    1: realBtnGrid.buttons[10],
    2: realBtnGrid.buttons[11],
    3: realBtnGrid.buttons[12],
    4: realBtnGrid.buttons[5],
    5: realBtnGrid.buttons[6],
    6: realBtnGrid.buttons[7],
    7: realBtnGrid.buttons[0],
    8: realBtnGrid.buttons[1],
    9: realBtnGrid.buttons[2],
    decimal: realBtnGrid.buttons[16],
}
// turn number buttons into array
let numberButtonsArr = Object.values(numberButtons);
// add event listeners to each number button and CALL the displayInput function
// numberButtonsArr.forEach((obj) => {
//     obj.addEventListener("click", displayInput);
// })

/////////////                  //////////////
/////////////                  //////////////
///////////// OPERATOR BUTTONS //////////////
///////////// OPERATOR BUTTONS //////////////
/////////////                  //////////////
/////////////                  //////////////
// store operator buttons in its own object
let opButtons = {
    del: realBtnGrid.buttons[3],
    ac: realBtnGrid.buttons[4],
    multiply: realBtnGrid.buttons[8],
    divide: realBtnGrid.buttons[9],
    add: realBtnGrid.buttons[13],
    subtract: realBtnGrid.buttons[14],
    exp: realBtnGrid.buttons[17],
    ans: realBtnGrid.buttons[18],
    equals: realBtnGrid.buttons[19],
}
// for each opButton, add click listener that CALLS operate(op, a, b)
// for (obj of Object.values(opButtons)) {
//     obj.addEventListener("click", operate);
// }


powerBtn.addEventListener("click", addEventListeners);
/////////////                  //////////////
/////////////                  //////////////
/////////////    FUNCTIONS     //////////////
/////////////    FUNCTIONS     //////////////
/////////////                  //////////////
/////////////                  //////////////


// create function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers
let storage = [];
let finalResults = [];
function operate()     {
    // transform calculator back
    calculator.classList.remove('calculator-rotate');
    // IF 'DEL' or 'AC' clicked -> return out of function
    switch (this.value) {
        // AC clicked -> clear all storage and return
        case "AC":
            storage = [];
            userInput = [];
            inputDisplay.textContent = '';
            outputDisplay.textContent = "0";
            console.log(storage);
            // transform h1 back to original
            h1.classList.remove('h1-transform');
            return;
        // DEL clicked -> pop last user input and return
        case "DEL":
            userInput.pop();
            inputDisplay.textContent = userInput.join('');
            return;
    } 
    // IF '+', '−', '×', '÷', '=', 'EXP', or 'ANS' clicked -> make userInput a number and store as currentValue
    // IF no user input, return
    if (!userInput[0]) {
        return;
    }
    let currentValue = +userInput.join('');
    // clear userInput
    userInput = [];
    // For INITIAL op button clicked (i.e. no result has been stored previously), store first item in storage array
    if (!storage[0]) {
        storage[0] = [];
        // for each array inside storage, the first index will store user input numbers, the second index will store operators
        storage[0][0] = currentValue; // user input number
        storage[0][1] = this.value; // operator
        console.log("first num and op stored in storage: " + storage[0]);
        outputDisplay.textContent = storage[storage.length-1][0];
        return;
    };
    storage[storage.length] = [];
    storage[storage.length-1][0] = currentValue; // number
    storage[storage.length-1][1] = this.value; // op
    console.log("before operation: " + storage);
    switch (storage[storage.length-2][1]) {
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
            if (storage[storage.length-1][0] == 0) {
                storage = [];
                inputDisplay.textContent = "";
                outputDisplay.textContent = "0";
                calculator.classList.add("calculator-flip");
                return;
            }
            storage[storage.length-1][0] = divide(storage[storage.length-2][0], storage[storage.length-1][0]);
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
function displayInput() {
    // transform logo when display is populated.
    h1.classList.add('h1-transform');
    // transform calculator back
    calculator.classList.remove('calculator-rotate');
    userInput.push(this.value);
    // apply display value to input display
    inputDisplay.textContent = userInput.join('');
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

// create functions to add, subtract, multiply and divide.
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

function addEventListeners() {
    // assign event listner to shift button
    shiftBtn.addEventListener("click", () => {
        calculator.classList.toggle("calculator-zoom");
    });
    // assign event listneres to each number button
    numberButtonsArr.forEach((obj) => {
        obj.addEventListener("click", displayInput);
    });
    // assign event listeners to each operator button
    for (obj of Object.values(opButtons)) {
        obj.addEventListener("click", operate);
    }
    // assign event listeners to each black button
    for (i=0;i<blackBtnGrid.buttons.length;i++) {
        blackBtnGrid.buttons[i].addEventListener("click", displayWord);
    }
    // display 0 on output display
    outputDisplay.textContent = 0;
    // turn display on
    displayScreen.classList.toggle("display-screen-on");
    
}