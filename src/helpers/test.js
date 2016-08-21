import jsdom from 'jsdom';
import sinon from 'sinon';

function initTestEnv() {
  initTestEnv.initialized = true;

  const doc = jsdom.jsdom('<body></body>');

  global.document = doc;
  global.window = document.defaultView;
  global.navigator = window.navigator;
}
initTestEnv.initialized = false;

if (!initTestEnv.initialized) {
  initTestEnv();
}


export const reactWarnings = {
  watchConsole() {
    this.spy = sinon.spy(console, 'error');
  },
  propWarnings() {
    const propWarnings = [];
    for (let i = 0; i < this.spy.callCount; i++) {
      const spyCall = this.spy.getCall(i);
      if (/(Invalid prop|Failed prop)/.test(spyCall.args[0])) {
        propWarnings.push(spyCall.args[0]);
      }
    }
    console.error.restore();

    return propWarnings;
  },
};
