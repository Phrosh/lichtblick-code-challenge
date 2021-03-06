import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://localhost/',
});
const { window } = jsdom;

const copyProps = (src, target) => {
    Object.defineProperties(target, {
        ...Object.getOwnPropertyDescriptors(src),
        ...Object.getOwnPropertyDescriptors(target),
    });
}

global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: 'node.js',
};
copyProps(window, global);

Enzyme.configure({ adapter: new Adapter() });

global.console = {
    log: console.log,
    error: jest.fn(),
    warn: jest.fn(),
    info: console.info,
    debug: console.debug,
};
