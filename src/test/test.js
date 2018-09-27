const assert = require('assert');


parse = (input) => {
  const validation = /(?=.*\d)^(rp|rp\s)?(([1-9]\d{0,2}(\.\d{3})*)|\d+)?(,0{2})?$/i;
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
    {args: 'Rp17.500,00',expected: 17500},
    {args: 'Rp 120.325',expected: 120325},
    {args: '005.000',expected: 5000},
    {args: '001000',expected: 1000},
    {args: '17,500',expected: false},
    {args: '2 500',expected: false},
    {args: '3000 Rp',expected: false},
    {args: 'Rp',expected: false},
  ];
  tests.forEach((test) => {
    it('should return ' + test.expected, () => {
      const res = parse(test.args);
      assert.equal(res, test.expected);
    });
  });

});