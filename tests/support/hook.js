/* eslint-env node */
import process from "node:process";
import { BeforeAll, AfterAll, Before, After } from "@cucumber/cucumber";
import { chromium } from "playwright";

BeforeAll(async function () {
  globalThis.__browser = await chromium.launch({ headless: !process.env.HEADED });
});

AfterAll(async function () {
  if (globalThis.__browser) await globalThis.__browser.close();
});

Before(async function () {
  this.context = await globalThis.__browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
});
