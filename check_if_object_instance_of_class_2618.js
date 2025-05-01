/**
 * @param {*} obj
 * @param {*} classFunction
 * @return {boolean}
 */
var checkIfInstanceOf = function(obj, classFunction) {
    if(obj === null || obj === undefined || typeof classFunction !== 'function') {
        return false;
    }

    if(typeof obj !== 'object') {
        obj = Object(obj);
    }

    return classFunction.prototype.isPrototypeOf(obj);
};


checkIfInstanceOf(new Date(), Date); // true


// Example 1:

// Input: func = () => checkIfInstanceOf(new Date(), Date)
// Output: true
// Explanation: The object returned by the Date constructor is, by definition, an instance of Date.

// Example 2:

// Input: func = () => { class Animal {}; class Dog extends Animal {}; return checkIfInstanceOf(new Dog(), Animal); }
// Output: true
// Explanation:
// class Animal {};
// class Dog extends Animal {};
// checkIfInstanceOf(new Dog(), Animal); // true

// Dog is a subclass of Animal. Therefore, a Dog object is an instance of both Dog and Animal.

// Example 3:

// Input: func = () => checkIfInstanceOf(Date, Date)
// Output: false
// Explanation: A date constructor cannot logically be an instance of itself.

// Example 4:

// Input: func = () => checkIfInstanceOf(5, Number)
// Output: true
// Explanation: 5 is a Number. Note that the "instanceof" keyword would return false. However, it is still considered an instance of Number because it accesses the Number methods. For example "toFixed()".


