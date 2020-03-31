// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import mediaQuery from 'css-mediaquery';
const MutationObserver = require('@sheerun/mutationobserver-shim');
window.MutationObserver = MutationObserver;

function createMatchMedia(width: string|number) {
    return (query: string) => ({
        matches: mediaQuery.match(query, { width }),
        addListener: () => {},
        removeListener: () => {},
    });
}

window.matchMedia = window.matchMedia || createMatchMedia('1024px');
