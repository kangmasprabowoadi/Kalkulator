const exprEl = document.getElementById('expr');
const resEl = document.getElementById('result');

let expression = "";

function render() {
    exprEl.textContent = expression || "0";
    try {
        resEl.textContent = evaluate(expression) || "0";
    } catch {
        resEl.textContent = "Error";
    }
}

function press(val) {
    expression += val;
    render();
}

function clearAll() {
    expression = "";
    render();
}

function backspace() {
    expression = expression.slice(0,-1);
    render();
}

function evaluate(expr) {
    if (!expr) return 0;
    let jsExpr = expr
        .replace(/π/g, "Math.PI")
        .replace(/sin\(/g, "Math.sin(")
        .replace(/cos\(/g, "Math.cos(")
        .replace(/tan\(/g, "Math.tan(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/√/g, "Math.sqrt")
        .replace(/\^/g, "**");
    return Function('"use strict";return (' + jsExpr + ')')();
}

/* tombol */
document.querySelectorAll(".key").forEach(btn=>{
    const val = btn.dataset.value;
    const action = btn.dataset.action;
    const func = btn.dataset.func;

    btn.addEventListener("click", ()=>{
        if (val) press(val);
        else if (func) {
            switch(func){
                case "sin": case "cos": case "tan": case "log":
                    press(func+"("); break;
                case "sqrt": press("√("); break;
                case "root": press("^(1/"); break; // contoh x^(1/y)
                case "pow": press("^"); break;
                case "pi": press("π"); break;
            }
        }
        else if (action){
            if (action==="clear") clearAll();
            if (action==="back") backspace();
            if (action==="percent") press("/100");
            if (action==="equals"){
                try{
                    expression = String(evaluate(expression));
                    render();
                } catch{ resEl.textContent="Error"; }
            }
        }
    });
});

/* awal */
render();
