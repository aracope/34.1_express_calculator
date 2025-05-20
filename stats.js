/**
 * Utility functions for calculating:
 * - mean (average)
 * - median (middle value)
 * - mode (most frequent number)
 */

// Returns the mean of a list of numbers
function findMean(nums) {
    const total = nums.reduce((acc, cur) => acc + cur, 0);
    return total / nums.length;
  }
  
  // Returns the median of a list of numbers
  function findMedian(nums) {
    nums.sort((a, b) => a - b);
    const mid = Math.floor(nums.length / 2);
  
    if (nums.length % 2 === 0) {
      return (nums[mid - 1] + nums[mid]) / 2;
    }
    return nums[mid];
  }
  
  // Returns the mode of a list of numbers
  function findMode(nums) {
    const freq = {};
    let maxFreq = 0;
    let mode;
  
    for (let num of nums) {
      freq[num] = (freq[num] || 0) + 1;
  
      if (freq[num] > maxFreq) {
        maxFreq = freq[num];
        mode = num;
      }
    }
  
    return Number(mode);
  }
  
  module.exports = { findMean, findMedian, findMode };
  