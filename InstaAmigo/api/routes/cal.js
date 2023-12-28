const express = require('express');
const router = express.Router();

router.post('/calculate', (req, res) => {
    const { operand1, operand2, operator } = req.body;
  
    let result;
    switch (operator) {
      case '+':
        result = operand1 + operand2;
        break;
      case '-':
        result = operand1 - operand2;
        break;
      case '*':
        result = operand1 * operand2;
        break;
      case '/':
        result = operand1 / operand2;
        break;
      default:
        result = 0;
    }
  
    // Sending back the result as JSON
    res.json({ result });
  });

module.exports = router;