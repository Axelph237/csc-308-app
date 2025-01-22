const pf = require('./portfolio.js');

test('Testing portfolio creation', () => {
    const target = [];
    const result = new pf.Portfolio();
    expect(result.shares).toStrictEqual(target);
});

test('Testing has shares', () => {
    const target = false;
    const result = (new pf.Portfolio()).hasShares();
    expect(result).toBe(target);
});

test('Testing add shares', () => {
    const target = {symbol: 'symb', shares: 4000};
    const result = (new pf.Portfolio()).addShares('symb', 4000);
    expect(result).toStrictEqual(target);
});

test('Testing add negative shares', () => {
    const target = "Only positive number of sales can be added";
    const result = (new pf.Portfolio()).addShares('symb', -1000);
    expect(result).toStrictEqual(target);
});

test('Testing add multiple same shares', () => {
    const portfolio = new pf.Portfolio();
    const target = {symbol: 'symb', shares: 100};

    let result;
    for (let i = 0; i < 10; i++) {
        result = portfolio.addShares('symb', 10)
    }
    expect(result).toStrictEqual(target);
});

test('Testing add multiple different shares', () => {
    const portfolio = new pf.Portfolio();

    const targetOne = {symbol: 'symb', shares: 100};
    const resultOne = portfolio.addShares('symb', 100);

    const targetTwo = {symbol: 'newsymb', shares: 500};
    const resultTwo = portfolio.addShares('newsymb', 500);


    expect(resultOne).toStrictEqual(targetOne);
    expect(resultTwo).toStrictEqual(targetTwo);
});

test('Testing sell shares', () => {
    const portfolio = new pf.Portfolio();
    portfolio.addShares('symb', 5000);

    const target = {symbol: 'symb', shares: 1000};
    const result = portfolio.sellShares('symb', 4000);
    expect(result).toStrictEqual(target);
});

test('Testing sell empty shares', () => {
    const portfolio = new pf.Portfolio();

    const target = "No shares to sell";
    const result = portfolio.sellShares('symb', 1);
    expect(result).toStrictEqual(target);
});

test('Testing sell too many shares', () => {
    const portfolio = new pf.Portfolio();
    portfolio.addShares('symb', 1);

    const target = "All shares sold";
    expect(() => {
        portfolio.sellShares('symb', 4000)
    }).toThrow('Not possible to sell this number of shares.')
});

test('Testing get number of symbols', () => {
    const portfolio = new pf.Portfolio();
    portfolio.addShares('symb', 1);
    portfolio.addShares('symb2', 1);
    portfolio.addShares('symb3', 1);

    const target = 3;
    const result = portfolio.getNumSymbols();
    expect(result).toStrictEqual(target);
});

test('Testing clean portfolio', () => {
    const portfolio = new pf.Portfolio();
    portfolio.addShares('symb', 0);
    portfolio.addShares('symb2', 0);
    portfolio.addShares('symb3', 0);

    const target = 0;
    const result = portfolio.getNumSymbols();
    expect(result).toStrictEqual(target);
});

test('Testing get number of shares', () => {
    const portfolio = new pf.Portfolio();
    portfolio.addShares('symb', 100);
    portfolio.addShares('symb', 2000);

    const target = 2100;
    const result = portfolio.getNumShares('symb');
    expect(result).toStrictEqual(target);
});

test('Testing get number of shares where symbol does not exist', () => {
    const portfolio = new pf.Portfolio();

    const target = 0;
    const result = portfolio.getNumShares('symb');
    expect(result).toStrictEqual(target);
});

/*
    REFLECTION

    Personally, I can see some of the benefit of this method.
    I was able to follow the Red/Green method, but I personally think it is a bad approach.
    This is possibly because I am new to Jest, but it seems that you can sometimes fail to create tests correctly.
    If this happens, you don't know because the test itself is faulty.
    So I had instances where I thought my code was bad, but it was actually that the initial test I wrote was incorrect.
    Regardless, I can see the usefulness of building code around passing tests rather than tests to pass code.
*/