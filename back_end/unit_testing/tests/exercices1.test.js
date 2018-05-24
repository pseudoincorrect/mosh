const {fizzBuzz} = require('../exercise1');

describe('fizzBuzz', () => {
    it('should throw an exception if input is not a number', () => {
        expect(() => { fizzBuzz('this is a string'); }).toThrow();
        expect(() => { fizzBuzz(undefined); }).toThrow();
        expect(() => { fizzBuzz({}); }).toThrow();
        expect(() => { fizzBuzz([]); }).toThrow();
    });

    it('should return "FizzBuzz" if input is divisible by 3 and 5', () => {
        expect(fizzBuzz(15)).toBe('FizzBuzz');
    });

    it('should return "Fizz" if input is divisible by 3', () => {
        expect(fizzBuzz(9)).toBe('Fizz');
    });

    it('should return "Buzz" if input is divisible by 5', () => {
        expect(fizzBuzz(10)).toBe('Buzz');
    });

    it('should return input if input is a number not divisible by 3 and 5', () => {
       expect(fizzBuzz(NaN)).toBe(NaN);
       expect(fizzBuzz(7)).toBe(7);
    });
});