import jsdom from 'jsdom';

const doc = jsdom.jsdom('<body></body>');

global.document = doc;
global.window = document.defaultView;
global.navigator = window.navigator;
