import { setWorldConstructor, setDefaultTimeout } from "@cucumber/cucumber";

class TestWorld {
  constructor({ parameters }) {
    this.baseURL = parameters.baseURL;
    this.browser = null;
    this.context = null;
    this.page = null;
  }
}

setDefaultTimeout(60 * 1000);
setWorldConstructor(TestWorld);
