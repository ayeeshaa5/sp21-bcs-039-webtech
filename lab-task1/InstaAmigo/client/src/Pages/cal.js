import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const Cal = () => {
  const [operand1, setOperand1] = useState(0);
  const [operand2, setOperand2] = useState(0);
  const [operator, setOperator] = useState('+');
  const [result, setResult] = useState(0);
  const [resultArray, setResultArray] = useState([]); // Initialize with an empty array

  useEffect(() => {
    const savedResults = Cookies.get('calculatorResults'); // Use Cookies.get instead of getJSON
    if (savedResults) {
      setResultArray(JSON.parse(savedResults)); // Parse the retrieved data
    }
  }, []);

  const calculateResult = () => {
    fetch('http://localhost:4000/api/cal/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operand1,
        operand2,
        operator,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data.result);
        const newResultArray = [
          ...resultArray,
          { operand1, operand2, operator, result: data.result },
        ];
        setResultArray(newResultArray);
        Cookies.set('calculatorResults', JSON.stringify(newResultArray), { expires: 7 }); // Stringify before setting
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>Simple Calculator</h1>
      <div>
        <input
          type="number"
          value={operand1}
          onChange={(e) => setOperand1(parseFloat(e.target.value))}
        />
        <select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
        >
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*"></option>
          <option value="/">/</option>
        </select>
        <input
          type="number"
          value={operand2}
          onChange={(e) => setOperand2(parseFloat(e.target.value))}
        />
        <button onClick={calculateResult}>Calculate</button>
      </div>
      <h2>Result: {result}</h2>

      <h3>Previous Results</h3>
      <table>
        <thead>
          <tr>
            <th>Operand 1</th>
            <th>Operand 2</th>
            <th>Operator</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {resultArray.map((item, index) => (
            <tr key={index}>
              <td>{item.operand1}</td>
              <td>{item.operand2}</td>
              <td>{item.operator}</td>
              <td>{item.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cal;