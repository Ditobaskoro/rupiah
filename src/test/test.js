const assert = require('assert');


parse = (input) => {
  const validation = /(?=.*\d)^(rp|rp\s)?(([0]*[1-9]\d{0,2}(\.\d{3})*)|\d+)?(,0{2})?$/i;
  if(validation.test(input)){
    return parseInt(input.replace(/,.*|[^0-9]/g, ''), 10);
  } else {
    return false;
  }
}

describe('Test', () => {
  const tests = [
    {args: '18.215', expected: 18215},
    {args: 'Rp17500',expected: 17500},
    {args: 'rp20.000.000,00',expected: 20000000},
    {args: 'Rp17.500,00',expected: 17500},
    {args: 'Rp 120.325',expected: 120325},
    {args: '005.000',expected: 5000},
    {args: '00007.000',expected: 7000},
    {args: '001000',expected: 1000},
    {args: '00002000',expected: 2000},
    {args: '17,500',expected: false},
    {args: '2 500',expected: false},
    {args: '3000 Rp',expected: false},
    {args: '3.0000',expected: false},
    {args: 'Rp',expected: false},
    {args: 'rp0.239',expected: false},
    {args: '.424',expected: false},
    {args: '0.2',expected: false},
    {args: '-123',expected: false},
  ];
  tests.forEach((test) => {
    it('should return ' + test.expected, () => {
      const res = parse(test.args);
      assert.equal(res, test.expected);
    });
  });

});