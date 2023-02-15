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
        btn.addEventListener("click", function() {displayNumber(btn.value)});        
    });

    document.getElementById("dot").addEventListener("click", function() {
        let current = document.getElementById("current").textContent;

        if (!current.includes('.')) {
            displayNumber('.')
        }

        if (!current) {
            console.log(current)
            document.getElementById("current").textContent = '0.';
        }
    })

    let opBtn = document.querySelectorAll(".op");

    opBtn.forEach((btn) => {
        btn.addEventListener("click", function() {operatorBtn(btn.value)})
    })

    
    document.getElementById("percent").addEventListener("click", function() {
        console.log('aaa')
        let num1 = document.getElementById("current").textContent;
        document.getElementById("current").textContent = operate(num1, '', '%');
    })

    document.getElementById("equal").addEventListener("click", function() {
        equalBtn();
    })

    document.getElementById("clear").addEventListener("click", function() {
        document.getElementById("current").textContent = '';
        document.getElementById("memory").textContent = '';
        document.getElementById("operator").textContent = '';
    })

    document.getElementById("backspace").addEventListener("click", function() {
        let string = document.getElementById("current").textContent;
        
        if (string > 0) {
            let array = string.split('');
            
            array.pop();
            
            string = '';

            array.forEach((num) => {
                string += '' + num;
            });

            document.getElementById("current").textContent = string;
        }        
    })

    console.log('fim')
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

function operatorBtn(op) {

    let cur = document.getElementById("current").textContent;
    let mem = document.getElementById("memory").textContent;
    
    document.getElementById("current").classList.remove("result");

    document.getElementById("operator").textContent = op;

    if (!mem) {
        document.getElementById("memory").textContent = cur;
        document.getElementById("current").textContent = '';
    } else if (mem && cur && op) {
        console.log('aqui')
        equalBtn();
    }
}

function equalBtn() {
    let cur = document.getElementById("current").textContent;
    let mem = document.getElementById("memory").textContent;
    let op = document.getElementById("operator").textContent;
    console.log('eb 1')
    if (cur && mem && op) {
        console.log('eb 2')
        document.getElementById("current").textContent = operate(mem, cur, op);
        document.getElementById("memory").textContent = '';
        document.getElementById("current").classList.add("result");
    }
}

start();