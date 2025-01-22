class Portfolio {
    shares;

    constructor() {
        this.shares = [];

        this.hasShares = this.hasShares.bind(this);
    }

    hasShares() {
        return this.shares.length > 0;
    }

    addShares(symbol, numShares) {
        if (numShares <= 0) {
            return "Only positive number of sales can be added";
        }

        for (let i = 0; i < this.shares.length; i++) {
            if (this.shares[i].symbol === symbol) {
                this.shares[i].shares += numShares;
                this.cleanPortfolio()
                return this.shares[i];
            }
        }

        const newShare = {
            symbol: symbol,
            shares: numShares
        };

        this.shares.push(newShare);

        return newShare;
    }

    sellShares(symbol, numShares) {
        for (let i = 0; i < this.shares.length; i++) {
            if (this.shares[i].symbol === symbol && numShares <= this.shares[i].shares) {   
                this.shares[i].shares -= numShares;         
                this.cleanPortfolio();
                return this.shares[i] === undefined ? "All shares sold" : this.shares[i];
            }
            else if (this.shares[i].symbol === symbol) {
                throw Error('Not possible to sell this number of shares.')
            }
        }

        return "No shares to sell";
    }

    getNumSymbols() {
        return this.shares.length;
    }

    getNumShares(symbol) {
        for (let i = 0; i < this.shares.length; i++) {
            if (this.shares[i].symbol === symbol) {
                return this.shares[i].shares;
            }
        }
        return 0;
    }

    cleanPortfolio() {
        for (let i = 0; i < this.shares.length; i++) {
            if (this.shares[i].shares <= 0) {
                this.shares.splice(i, 1);
            }
        }
    }
}

exports.Portfolio = Portfolio;