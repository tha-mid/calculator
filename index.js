function operate (num1, num2, operator) {

    num1 = Number(num1);
    num2 = Number(num2);

    if (num2 === 0 && operator === '/') {
        return 'Error';
    } else {
        if (operator === '+') return (num1 + num2);
        if (operator === '-') return (num1 - num2);
        if (operator === '*') return (num1 * num2);
        if (operator === '/') return (num1 / num2);
        if (operator === '%') return (num1 / 100);
    }

}

function start () { 

    let numBtn = document.querySelectorAll(".number");

    numBtn.forEach((btn) => {
        btn.addEventListener("click", function() {
            playBeep();
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
        let num1 = document.getElementById("current").textContent;
        let value;
        playBeep();

        document.getElementById("percent").blur();

        if (num1 != 'Error') {

            value = operate(num1, '', '%');

            if (value.toString().length > 17) {
                document.getElementById("current").textContent = value.toFixed(15);
            } else {
                document.getElementById("current").textContent = value;
            }
            document.getElementById("current").classList.add("result");
        }
    });

    document.getElementById("equal").addEventListener("click", equalBtn);

    document.getElementById("clear").addEventListener("click", clear);

    document.getElementById("backspace").addEventListener("click", backspace);
}

function keyboardUse (e) {

    let keycode = e.keyCode;
    let value;

    switch (keycode) {
        case 48: case 96: 
            {value = 0; playBeep(); break;}
        case 49: case 97:
            {value = 1; playBeep(); break;}
        case 50: case 98:
            {value = 2; playBeep(); break;}
        case 51: case 99:
            {value = 3; playBeep(); break;}
        case 52: case 100:
            {value = 4; playBeep(); break;}
        case 53: case 101:
            {value = 5; playBeep(); break;}
        case 54: case 102:
            {value = 6; playBeep(); break;}
        case 55: case 103:
            {value = 7; playBeep(); break;}
        case 56: case 104:
            {value = 8; playBeep(); break;}
        case 57: case 105:
            {value = 9; playBeep(); break;}
        case 108:
            {dot(); playBeep(); break;} //dot
        case 106:
            {operatorBtn('*'); playBeep(); break;}
        case 107:
            {operatorBtn('+'); playBeep(); break;}
        case 109:
            {operatorBtn('-'); playBeep(); break;}
        case 111:
            {operatorBtn('/'); playBeep(); break;}
        case 13:
            {equalBtn(); playBeep(); break;} //equal
        case 8:
            {backspace(); playBeep(); break;} //backspace
        };

        if (value >= 0 && value <= 9) {
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
    
    if (value.length < 17) {
        document.getElementById("current").textContent = value;
    }
}

function dot() {
    let current = document.getElementById("current").textContent;
    playBeep();

    document.getElementById("dot").blur();

    if (!current.includes('.')) {
        document.getElementById("current").classList.remove("result");
        displayNumber('.');
    }

    if (!current) {
        document.getElementById("current").textContent = '0.';
    }
}

function operatorBtn(op) {

    let cur = document.getElementById("current").textContent;
    let mem = document.getElementById("memory").textContent;
    playBeep();

    if (cur !== 'Error') {

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
}

function equalBtn() {
    let cur = document.getElementById("current").textContent;
    let mem = document.getElementById("memory").textContent;
    let op = document.getElementById("operator").textContent;
    let value = 0;
    playBeep();

    document.getElementById("equal").blur();

    if (cur && mem && op) {
        
        value = operate(mem, cur, op);

        if (value.length > 17) {
            document.getElementById("current").textContent = value.toFixed(17);
        } else {
            document.getElementById("current").textContent = value;
        }

        document.getElementById("memory").textContent = '';
        document.getElementById("current").classList.add("result");

    }
}

function clear() {
    document.getElementById("current").textContent = '';
    document.getElementById("memory").textContent = '';
    document.getElementById("operator").textContent = '';
    playBeep();

    document.getElementById("clear").blur();
}

function backspace() {
    let string = document.getElementById("current").textContent;
    playBeep();

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

    if (string === 'Error') {
        clear();
    }
}

function playBeep() {

    const audio = document.getElementById("audio");

    audio.currentTime = 0;
    audio.play();
}

start();