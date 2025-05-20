/**
 * Express server to perform statistical operations:
 * mean, median, and mode.
 * 
 * Each route takes a query parameter `nums`, a comma-separated string of numbers.
 * Example: GET /mean?nums=1,2,3
 */

const express = require('express');
const { findMean, findMedian, findMode } = require('./stats');

const app = express();

/**
 * Helper function to parse and validate 'nums' query string.
 * Throws an error if any value is not a valid number.
 */
function parseNums(numsStr) {
  if (!numsStr) {
    throw new Error("nums are required.");
  }

  const nums = numsStr.split(',').map(n => {
    if (n === '') throw new Error("Empty value in list.");
    const val = Number(n);
    if (isNaN(val)) {
      throw new Error(`${n} is not a number.`);
    }
    return val;
  });

  return nums;
}

// Route to calculate mean
app.get('/mean', (req, res) => {
  try {
    const nums = parseNums(req.query.nums);
    const result = findMean(nums);
    return res.json({ operation: "mean", value: result });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// Route to calculate median
app.get('/median', (req, res) => {
  try {
    const nums = parseNums(req.query.nums);
    const result = findMedian(nums);
    return res.json({ operation: "median", value: result });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// Route to calculate mode
app.get('/mode', (req, res) => {
  try {
    const nums = parseNums(req.query.nums);
    const result = findMode(nums);
    return res.json({ operation: "mode", value: result });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = app;

// If this file is run directly (node app.js), start the server
if (require.main === module) {
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
}
