const funcs = require('./functions.js');

// div tests
test('Testing div: 2 positives', () => {
    const target = 4;
    const result = funcs.div(12, 3);
    expect(target).toBe(result);
});

test('Testing div: 1 positive / 1 negative', () => {
    const target = -4;
    const result = funcs.div(12, -3);
    expect(target).toBe(result);
});

test('Testing div: 2 negatives', () => {
    const target = 4;
    const result = funcs.div(-12, -3);
    expect(target).toBe(result);
});

test('Testing div: NaN', () => {
    const target = NaN;
    const result = funcs.div(NaN, 3);
    expect(target).toBe(result);
});

// containsNumbers tests
test('Testing containsNumbers: 12345', () => {
    const target = true;
    const result = funcs.containsNumbers('12345');
    expect(target).toBe(result);
});

test('Testing containsNumbers: hello1world', () => {
    const target = true;
    const result = funcs.containsNumbers('hello1world');
    expect(target).toBe(result);
});

test('Testing containsNumbers: helloworld', () => {
    const target = false;
    const result = funcs.containsNumbers('helloworld');
    expect(target).toBe(result);
});

test('Testing containsNumbers: hello world', () => { // bugged test
    const target = false;
    const result = funcs.containsNumbers('hello world');
    expect(target).toBe(result);
});