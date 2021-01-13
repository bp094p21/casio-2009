// array of Black buttons id's in order from top left to bottom right
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
    ["X",""],
    ["",""],
    // 3rd row
    ["1","","","","\u23a1S-SUM\u23a4"],
    ["2","","","","\u23a1S-VAR\u23a4"],
    ["3",""],
    ["+",""],
    ["--",""],
    // 4th row
    ["0","Rnd"],
    [".","Ran#"],
    ["EXP","\u03c0"],
    ["Ans","DRG\u25b8"],
    ["=","%"],
];

// create objects to store grid values
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
// create black button grid!
createGrid(blackBtnGrid);
// assign grid labels to black buttons.
addLabels(blackBtnGrid);
// hide middle 2 buttons on first row of blackBtnGrid
blackBtnGrid.buttons[2].style.visibility = "hidden";
blackBtnGrid.buttons[3].style.visibility = "hidden";
// custom assign labels for M+ button
let dtLabel = document.createElement('h2');
dtLabel.textContent = 'DT\u23a3CL\u23a6';
dtLabel.classList.toggle('dt-label');
blackBtnGrid.buttons[blackBtnGrid.buttons.length-1].appendChild(dtLabel);


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
// create function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers
function operate(op, a, b) {
    let result;
    switch (op) {
        case '+':
            result = add(a,b);
            break;
        case '-':
            result = subtract(a,b);
            break;
        case '*':
            result = multiply(a,b);
            break;
        case '/':
            result = divide(a,b);
            break;
    }
    return result;
    //
}

// create functions that populate the display when you click the number buttons. store the 'display value' in a variable somewhere


// make the calculator work. store the first number that is input into the calculator when user pressed an operator, and also save which operation as been chosen --> then operate() on them when the user presses the "=" key
// 1. once operate() has been called, update the display with the 'solution' to the operation.
// 2. this is the hardest part of the project. You need to figure out how to store all the values and call the operate function with them. Don’t feel bad if it takes you a while to figure out the logic.

// fix bugs
// 1. Users should be able to string together several operations and get the right answer, with each pair of numbers being evaluated at a time. For example, 12 + 7 - 5 * 3 = should yield 42. An example of the behavior we’re looking for would be this student solution. Your calculator should not evaluate more than a single pair of numbers at a time. If you enter a number then an operator and another number that calculation should be displayed if your next input is an operator. The result of the calculation should be used as the first number in your new calculation.
// 2. You should round answers with long decimals so that they don’t overflow the screen.
// 3. Pressing = before entering all of the numbers or an operator could cause problems!
// 4. Pressing “clear” should wipe out any existing data.. make sure the user is really starting fresh after pressing “clear”
// 5. Display a snarky error message if the user tries to divide by 0… don’t let it crash your calculator!

// EXTRA CREDIT: Users can get floating point numbers if they do the math required to get one, but they can’t type them in yet. Add a . button and let users input decimals! Make sure you don’t let them type more than one though: 12.3.56.5. It is hard to do math on these numbers. (disable the decimal button if there’s already one in the display)

// EXTRA CREDIT: Make it look nice! This can be a good portfolio project… but not if it’s UGLY. At least make the operations a different color from the keypad buttons.

// EXTRA CREDIT: Add a “backspace” button, so the user can undo if they click the wrong number.

// EXTRA CREDIT: Add keyboard support!

