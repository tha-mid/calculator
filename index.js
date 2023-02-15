function operate (num1, num2, operator) {

    num1 = Number(num1);
    num2 = Number(num2);
    
    if (operator === '+') return (num1 + num2);
    if (operator === '-') return (num1 - num2);
    if (operator === '*') return (num1 * num2);
    if (operator === '/') return (num1 / num2);
    if (operator === '%') return (num1 / 100);

}

function start () { 
    console.log('start')
    
    let numBtn = document.querySelectorAll(".number");

    numBtn.forEach((btn) => {
        btn.addEventListener("click", function() {
            displayNumber(btn.value);
            btn.blur();
        });        
    });

    window.addEventListener("keydown", keyboardUse); 

    document.getElementById("dot").addEventListener("click", dot);

    let opBtn = document.querySelectorAll(".op");

    opBtn.forEach((btn) => {
        btn.addEventListener("click", function() {
            operatorBtn(btn.value);
            btn.blur();})
    });

    
    document.getElementById("percent").addEventListener("click", function() {
        console.log('aaa')
        let num1 = document.getElementById("current").textContent;
        document.getElementById("current").textContent = operate(num1, '', '%');
        document.getElementById("percent").blur();
    });

    document.getElementById("equal").addEventListener("click", equalBtn);

    document.getElementById("clear").addEventListener("click", clear);

    document.getElementById("backspace").addEventListener("click", backspace);

    console.log('fim')
}

function keyboardUse (e) {
    let keycode = e.keyCode;
    let value;

    switch (keycode) {
        case 48: case 96: 
            {value = 0; break;}
        case 49: case 97:
            {value = 1; break;}
        case 50: case 98:
            {value = 2; break;}
        case 51: case 99:
            {value = 3; break;}
        case 52: case 100:
            {value = 4; break;}
        case 53: case 101:
            {value = 5; break;}
        case 54: case 102:
            {value = 6; break;}
        case 55: case 103:
            {value = 7; break;}
        case 56: case 104:
            {value = 8; break;}
        case 57: case 105:
            {value = 9; break;}
        case 108:
            {dot(); break;} //dot
        case 106:
            {operatorBtn('*'); break;}
        case 107:
            {operatorBtn('+'); break;}
        case 109:
            {operatorBtn('-'); break;}
        case 111:
            {operatorBtn('/'); break;}
        case 13:
            {equalBtn(); break;} //equal
        case 8:
            {backspace(); break;} //backspace
        };

        if (value >= 0 && value <= 9) {
            console.log('teste')
            displayNumber(value);
        }
}

function displayNumber (btnValue) {
    let value = document.getElementById("current").textContent;
    let result = document.getElementsByClassName("result");

    if (result.length > 0) {
        value = '';
        document.getElementById("current").classList.remove("result");
        document.getElementById("operator").textContent = '';
    }

    value = '' + value + btnValue;
    
    document.getElementById("current").textContent = value;
}

function dot() {
    let current = document.getElementById("current").textContent;
    document.getElementById("dot").blur();

    if (!current.includes('.')) {
        displayNumber('.')
    }

    if (!current) {
        document.getElementById("current").textContent = '0.';
    }
}

function operatorBtn(op) {

    let cur = document.getElementById("current").textContent;
    let mem = document.getElementById("memory").textContent;
    
    if (!mem) {
        document.getElementById("memory").textContent = cur;
        document.getElementById("current").textContent = '';
    } else if (mem && cur && op) {
        equalBtn();
        document.getElementById("memory").textContent = document.getElementById("current").textContent;
        document.getElementById("current").textContent = '';
    }

    document.getElementById("current").classList.remove("result");
    document.getElementById("operator").textContent = op;
}

function equalBtn() {
    let cur = document.getElementById("current").textContent;
    let mem = document.getElementById("memory").textContent;
    let op = document.getElementById("operator").textContent;

    document.getElementById("equal").blur();

    if (cur && mem && op) {
       
        document.getElementById("current").textContent = operate(mem, cur, op);
        document.getElementById("memory").textContent = '';
        document.getElementById("current").classList.add("result");

    }
}

function clear() {
    document.getElementById("current").textContent = '';
    document.getElementById("memory").textContent = '';
    document.getElementById("operator").textContent = '';

    document.getElementById("clear").blur();
}

function backspace() {
    let string = document.getElementById("current").textContent;

    document.getElementById("backspace").blur();

    if (string > 0) {
        let array = string.split('');
            
        array.pop();
            
        string = '';

        array.forEach((num) => {
            string += '' + num;
        });

        document.getElementById("current").textContent = string;
    }
}

start();