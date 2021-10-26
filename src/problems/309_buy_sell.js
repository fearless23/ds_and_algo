/**
 You are given an array prices where prices[i] is the price of
 a given stock on the ith day.

Find the maximum profit you can achieve. You may complete as
many transactions as you like (i.e., buy one and sell one share
  of the stock multiple times) with the following restrictions:

After you sell your stock, you cannot buy stock on the next day
(i.e., cooldown one day).
Note: You may not engage in multiple transactions simultaneously
 (i.e., you must sell the stock before you buy again).
 */

const maxProfit = function (prices) {
  const end = prices.length - 1;

  const memo = {};

  const buy = (start) => {
    const key = `buy_${start}`;
    console.log(key);
    const val = memo[key];
    if (val !== undefined) {
      console.log('from memo', key);
      return val;
    }

    if (start >= end) {
      memo[key] = 0;
      return 0;
    }

    // A: skip
    const profit1 = buy(start + 1);

    // b: buy at start
    const profit2 = sell(start + 1, prices[start]);

    const p = Math.max(profit1, profit2);
    memo[key] = p;
    return p;
  };

  const sell = (start, bp) => {
    const key = `sell_${start}_${bp}`;
    console.log(key);
    const val = memo[key];
    if (val !== undefined) {
      console.log('from memo', key);
      return val;
    }

    const len = end - start + 1;
    const p = prices[start] - bp;
    if (len === 1) {
      memo[key] = p;
      return p;
    }

    // A: skip
    const profit1 = sell(start + 1, bp);
    // B: sell at start
    const profit2 = p + buy(start + 2);

    const q = Math.max(profit1, profit2);
    memo[key] = q;
    return q;
  };

  return buy(0);
};

const p = [1];
const result = maxProfit(p);
console.log('result --> ', result);

// smarter solution, fast and less memory
// difficult to visualize -- master this
const maxProfit2 = function (prices) {
  let oldBuy = -prices[0];
  let oldSell = 0;
  let oldCool = 0;

  for (let i = 1; i < prices.length; i++) {
    const profit = oldBuy + prices[i];
    const cc = oldCool - prices[i];
    const newBuy = Math.max(oldBuy, cc);
    const newSell = Math.max(oldSell, profit);
    const newCool = Math.max(oldSell, oldCool);

    oldBuy = newBuy;
    oldSell = newSell;
    oldCool = newCool;
  }

  return Math.max(oldBuy, oldSell, oldCool);
};
