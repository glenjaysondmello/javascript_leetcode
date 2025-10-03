var TimeLimitedCache = function() {
    this.cache = new Map();
};

/** 
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function(key, value, duration) {
    const flag = this.cache.has(key);

    if(flag) clearTimeout(this.cache.get(key).ttl);

    this.cache.set(key, {
        value,
        ttl: setTimeout(() => this.cache.delete(key), duration)
    });

    return flag;
};

/** 
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function(key) {
    return this.cache.has(key) ? this.cache.get(key).value : -1;
};

/** 
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function() {
    return this.cache.size;
};

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */

// Example 1:

// Input: 
// actions = ["TimeLimitedCache", "set", "get", "count", "get"]
// values = [[], [1, 42, 100], [1], [], [1]]
// timeDelays = [0, 0, 50, 50, 150]

// Output: [null, false, 42, 1, -1]

// Explanation:
// At t=0, the cache is constructed.
// At t=0, a key-value pair (1: 42) is added with a time limit of 100ms. The value doesn't exist so false is returned.
// At t=50, key=1 is requested and the value of 42 is returned.
// At t=50, count() is called and there is one active key in the cache.
// At t=100, key=1 expires.
// At t=150, get(1) is called but -1 is returned because the cache is empty.

// Example 2:

// Input: 
// actions = ["TimeLimitedCache", "set", "set", "get", "get", "get", "count"]
// values = [[], [1, 42, 50], [1, 50, 100], [1], [1], [1], []]
// timeDelays = [0, 0, 40, 50, 120, 200, 250]

// Output: [null, false, true, 50, 50, -1, 0]

// Explanation:
// At t=0, the cache is constructed.
// At t=0, a key-value pair (1: 42) is added with a time limit of 50ms. The value doesn't exist so false is returned.
// At t=40, a key-value pair (1: 50) is added with a time limit of 100ms. A non-expired value already existed so true is returned and the old value was overwritten.
// At t=50, get(1) is called which returned 50.
// At t=120, get(1) is called which returned 50.
// At t=140, key=1 expires.
// At t=200, get(1) is called but the cache is empty so -1 is returned.
// At t=250, count() returns 0 because the cache is empty.

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// (Just for Curiosity)
// Simulation Logic and Execution

/**
 * Executes a series of actions on the TimeLimitedCache with specified time delays.
 * @param {string[]} actions - The list of methods to call.
 * @param {any[][]} values - The arguments for each method call.
 * @param {number[]} timeDelays - The absolute timestamp for each action.
 * @returns {Promise<any[]>} - A promise that resolves to the array of outputs.
 */
async function executeActions(actions, values, timeDelays) {
    let cache;
    const output = [];
    
    // Asynchronously loop through each action
    for (let i = 0; i < actions.length; i++) {
        // Calculate the delay needed before this action
        const delay = i === 0 ? timeDelays[i] : timeDelays[i] - timeDelays[i - 1];
        await new Promise(res => setTimeout(res, delay));

        const action = actions[i];
        const params = values[i];

        let result;
        switch (action) {
            case "TimeLimitedCache":
                cache = new TimeLimitedCache();
                result = null;
                break;
            case "set":
                // Use spread operator to pass arguments from the params array
                result = cache.set(...params); 
                break;
            case "get":
                result = cache.get(...params);
                break;
            case "count":
                result = cache.count();
                break;
        }
        output.push(result);
    }
    
    return output;
}

// --- Running the Examples ---

// Example 1
const actions1 = ["TimeLimitedCache", "set", "get", "count", "get"];
const values1 = [[], [1, 42, 100], [1], [], [1]];
const timeDelays1 = [0, 0, 50, 50, 150];

console.log("--- Running Example 1 ---");
executeActions(actions1, values1, timeDelays1).then(output => {
    console.log("Input Actions:", actions1);
    console.log("Output:       ", output);
    console.log("Expected:     ", [null, false, 42, 1, -1]);
    console.log("\n");
});


// Example 2
const actions2 = ["TimeLimitedCache", "set", "set", "get", "get", "get", "count"];
const values2 = [[], [1, 42, 50], [1, 50, 100], [1], [1], [1], []];
const timeDelays2 = [0, 0, 40, 50, 120, 200, 250];

// Using an async IIFE (Immediately Invoked Function Expression) to run the second example
(async () => {
    console.log("--- Running Example 2 ---");
    const output = await executeActions(actions2, values2, timeDelays2);
    console.log("Input Actions:", actions2);
    console.log("Output:       ", output);
    console.log("Expected:     ", [null, false, true, 50, 50, -1, 0]);
})();

