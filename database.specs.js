const { expect } = require('chai');
const db = require ('./db/db')

describe('twoSum', () => {
    it('is a function', ()=>{
        expect(typeof twoSum).to.equal('function')
    })
    it('returns an array', () => {
      expect(Array.isArray(twoSum([1,2,3],5))).to.equal(true);
      });
    it('Returns empty array if empty array was provided', () => {
      expect(twoSum([],5)).to.eql([]);
    });
    it('returns an array of the indexes of the numbers that add up to the sum', ()=>{
        expect(twoSum([1,2,3],5)).to.eql([1,2])
    })
});