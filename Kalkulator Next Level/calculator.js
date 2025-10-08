const exprEl = document.getElementById('expr');
const resEl = document.getElementById('result');

let expression = "";
let memory = 0;

function render() {
    exprEl.textContent = expression || "0";
    try {
        resEl.textContent = evaluate(expression) || "0";
    } catch {
        resEl.textContent = "Error";
    }
}

function press(val) { expression += val; render(); }
function clearAll() { expression = ""; render(); }
function backspace() { expression = expression.slice(0,-1); render(); }

/* factorial */
function factorial(n) {
    n = Math.floor(n);
    if(n<0) return NaN;
    if(n===0 || n===1) return 1;
    let f=1; for(let i=2;i<=n;i++) f*=i;
    return f;
}

function evaluate(expr) {
    if(!expr) return 0;
    let jsExpr = expr
        .replace(/π/g,"Math.PI")
        .replace(/e/g,"Math.E")
        .replace(/sin\(/g,"Math.sin(")
        .replace(/cos\(/g,"Math.cos(")
        .replace(/tan\(/g,"Math.tan(")
        .replace(/log\(/g,"Math.log10(")
        .replace(/√\(/g,"Math.sqrt(")
        .replace(/\^/g,"**")
        .replace(/(\d+)!/g,"factorial($1)");
    return Function('"use strict";return (' + jsExpr + ')')();
}

/* tombol */
document.querySelectorAll(".key").forEach(btn=>{
    const val = btn.dataset.value;
    const action = btn.dataset.action;
    const func = btn.dataset.func;

    btn.addEventListener("click", ()=>{
        if(val) press(val);
        else if(func){
            switch(func){
                case "sin": case "cos": case "tan": case "log": press(func+"("); break;
                case "sqrt": press("√("); break;
                case "pow": press("^"); break;
                case "pi": press("π"); break;
                case "e": press("e"); break;
                case "fact": press("!"); break;

                // Memory
                case "Mplus": memory += parseFloat(resEl.textContent)||0; break;
                case "Mminus": memory -= parseFloat(resEl.textContent)||0; break;
                case "MR": press(memory); break;
                case "MC": memory = 0; break;

                // Dark mode
                case "dark": document.body.classList.toggle("dark"); break;
            }
        }
        else if(action){
            if(action==="clear") clearAll();
            if(action==="back") backspace();
            if(action==="percent") press("/100");
            if(action==="equals"){
                try{
                    expression = String(evaluate(expression));
                    render();
                }catch{ resEl.textContent="Error"; }
            }
        }
    });
});

render();
