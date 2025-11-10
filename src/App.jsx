import React, { useState } from "react";

// Calculadora de 4 operações com UI pronta para testes BDD
// Decisões:
// - Execução imediata (como calculadoras de bolso): 2 + 3 × 4 => ((2+3)×4)
// - Botões: AC, C, ±, %, ÷, ×, −, +, =, dígitos e ponto
// - Acessibilidade: data-testid e aria-label para facilitar steps do BDD

const btnBase =
  "select-none rounded-2xl text-xl md:text-2xl py-3 md:py-4 shadow-sm active:scale-95 transition border border-black/5";
const btnLight = `${btnBase} bg-white hover:bg-gray-50`;
const btnDark = `${btnBase} bg-gray-900 text-white hover:bg-gray-800`;
const btnAccent = `${btnBase} bg-blue-600 text-white hover:bg-blue-700`;
const btnWarn = `${btnBase} bg-rose-600 text-white hover:bg-rose-700`;

function formatNumber(n) {
  if (n === Infinity) return "∞";
  if (n === -Infinity) return "-∞";
  if (Number.isNaN(n)) return "Erro";
  // Evita notação científica para números comuns
  const str = String(n);
  if (/e/i.test(str)) return n.toString();
  // Remove zeros à direita no decimal
  if (Number.isInteger(n)) return n.toString();
  return parseFloat(n.toFixed(12)).toString();
}

function compute(a, op, b) {
  const x = Number(a);
  const y = Number(b);
  switch (op) {
    case "+":
      return x + y;
    case "-":
      return x - y;
    case "×":
      return x * y;
    case "÷":
      return y === 0 ? NaN : x / y;
    default:
      return y; // sem operador, retorna último número digitado
  }
}

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [stash, setStash] = useState(null); // valor acumulado
  const [op, setOp] = useState(null); // operador pendente
  const [justEval, setJustEval] = useState(false); // se último evento foi '='

  const inputDigit = (d) => {
    setDisplay((prev) => {
      if (justEval) {
        setJustEval(false);
        return String(d);
      }
      if (prev === "0") return String(d);
      return prev + String(d);
    });
  };

  const inputDot = () => {
    setDisplay((prev) => {
      if (justEval) {
        setJustEval(false);
        return "0.";
      }
      if (prev.includes(".")) return prev;
      return prev + ".";
    });
  };

  const clearAll = () => {
    setDisplay("0");
    setStash(null);
    setOp(null);
    setJustEval(false);
  };

  const clearEntry = () => {
    setDisplay("0");
  };

  const toggleSign = () => {
    setDisplay((prev) => (prev === "0" ? "0" : prev.startsWith("-") ? prev.slice(1) : "-" + prev));
  };

  const percent = () => {
    setDisplay((prev) => {
      const n = Number(prev);
      return formatNumber(n / 100);
    });
  };

  const chooseOp = (nextOp) => {
    setJustEval(false);
    if (stash === null) {
      setStash(display);
      setOp(nextOp);
      setDisplay("0");
      return;
    }
    // cálculo encadeado imediato
    const result = compute(stash, op, display);
    setStash(String(result));
    setOp(nextOp);
    setDisplay("0");
  };

  const equals = () => {
    if (stash === null || !op) {
      setJustEval(true);
      return; // nada a fazer
    }
    const result = compute(stash, op, display);
    setDisplay(formatNumber(result));
    setStash(null);
    setOp(null);
    setJustEval(true);
  };

  return (
    <div className="min-h-screen w-full grid place-items-center bg-gradient-to-b from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-sm rounded-3xl bg-white shadow-xl border border-black/5 p-4 md:p-6">
        <div className="mb-3 text-sm text-gray-500">Calculadora</div>
        <div
          className="mb-4 md:mb-6 rounded-2xl bg-gray-900 text-white text-right p-4 md:p-6 font-mono overflow-x-auto"
          aria-live="polite"
          data-testid="display"
        >
          <div className="text-base md:text-lg text-gray-400">{op ? `${formatNumber(Number(stash))} ${op}` : "\u00A0"}</div>
          <div className="text-3xl md:text-5xl leading-tight" aria-label="visor">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 md:gap-3">
          {/* Linha 1 */}
          <button className={btnWarn} onClick={clearAll} aria-label="AC" data-testid="btn-AC">
            AC
          </button>
          <button className={btnLight} onClick={clearEntry} aria-label="C" data-testid="btn-C">
            C
          </button>
          <button className={btnLight} onClick={toggleSign} aria-label="trocar sinal" data-testid="btn-sign">
            ±
          </button>
          <button className={btnDark} onClick={() => chooseOp("÷")} aria-label="dividir" data-testid="op-div">
            ÷
          </button>

          {/* Linha 2 */}
          <button className={btnLight} onClick={() => inputDigit(7)} data-testid="d7" aria-label="7">7</button>
          <button className={btnLight} onClick={() => inputDigit(8)} data-testid="d8" aria-label="8">8</button>
          <button className={btnLight} onClick={() => inputDigit(9)} data-testid="d9" aria-label="9">9</button>
          <button className={btnDark} onClick={() => chooseOp("×")} aria-label="multiplicar" data-testid="op-mul">
            ×
          </button>

          {/* Linha 3 */}
          <button className={btnLight} onClick={() => inputDigit(4)} data-testid="d4" aria-label="4">4</button>
          <button className={btnLight} onClick={() => inputDigit(5)} data-testid="d5" aria-label="5">5</button>
          <button className={btnLight} onClick={() => inputDigit(6)} data-testid="d6" aria-label="6">6</button>
          <button className={btnDark} onClick={() => chooseOp("-")} aria-label="subtrair" data-testid="op-sub">
            −
          </button>

          {/* Linha 4 */}
          <button className={btnLight} onClick={() => inputDigit(1)} data-testid="d1" aria-label="1">1</button>
          <button className={btnLight} onClick={() => inputDigit(2)} data-testid="d2" aria-label="2">2</button>
          <button className={btnLight} onClick={() => inputDigit(3)} data-testid="d3" aria-label="3">3</button>
          <button className={btnDark} onClick={() => chooseOp("+")} aria-label="somar" data-testid="op-add">
            +
          </button>

          {/* Linha 5 */}
          <button className={btnLight} onClick={percent} aria-label="porcentagem" data-testid="btn-pct">%</button>
          <button className={`${btnLight} col-span-1`} onClick={() => inputDigit(0)} data-testid="d0" aria-label="0">0</button>
          <button className={btnLight} onClick={inputDot} aria-label="ponto" data-testid="btn-dot">.</button>
          <button className={btnAccent} onClick={equals} aria-label="igual" data-testid="op-eq">=</button>
        </div>

        <div className="mt-4 text-xs text-gray-500 leading-relaxed">
          Regras atuais: execução imediata; divisão por zero - "Erro"; visor limita casas ao necessário.
        </div>
      </div>
    </div>
  );
}
