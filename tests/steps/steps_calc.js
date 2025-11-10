import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

function keyToTestId(symbol) {
  if (/^[0-9]$/.test(symbol)) return `d${symbol}`;
  const map = {
    "+": "op-add",
    "-": "op-sub",
    "×": "op-mul",
    "*": "op-mul",
    "÷": "op-div",
    "/": "op-div",
    "=": "op-eq",
    ".": "btn-dot",
    C: "btn-C",
    A: "btn-AC",
    "%": "btn-pct",
    "±": "btn-sign"
  };
  return map[symbol];
}

Given("abro a calculadora", async function () {
  await this.page.goto(this.baseURL);
});

When("pressiono {string}", async function (id) {
  await this.page.getByTestId(id).click();
});

When("pressiono a sequência {string}", async function (seq) {
  for (const ch of seq.split("")) {
    if (ch === " ") continue;
    const id = keyToTestId(ch);
    if (!id) throw new Error(`Tecla não mapeada: '${ch}'`);
    await this.page.getByTestId(id).click();
  }
});

Then("o visor deve mostrar {string}", async function (texto) {
  const visor = await this.page.locator('[aria-label="visor"]');
  await expect(visor).toHaveText(texto);
});
