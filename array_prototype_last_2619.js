/**
 * @return {null|boolean|number|string|Array|Object}
 */
Array.prototype.last = function() {
    if(this.length == 0) {
        return -1;
    }
    const n = this.length - 1;
    const last = this[n];
    return last;
};


 const arr = [1, 2, 3];
 arr.last(); // 3


// Example 1:

// Input: nums = [null, {}, 3]
// Output: 3
// Explanation: Calling nums.last() should return the last element: 3.

// Example 2:

// Input: nums = []
// Output: -1
// Explanation: Because there are no elements, return -1.
 
 
