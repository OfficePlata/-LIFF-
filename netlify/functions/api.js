const fetch = require('node-fetch');

// STEP 2で取得したGoogle Apps ScriptのウェブアプリURLに書き換えてください
const GAS_URL = "https://script.google.com/macros/s/AKfycbzs5_PZ0oL_AJLaS3zGsph3mfF46mok7QYbbNHwLT70JexUBlYmotAfQsW7GS6cpZE4/exec";

exports.handler = async (event, context) => {
  if (event.httpMethod === 'GET') {
    try {
      const response = await fetch(GAS_URL);
      const data = await response.json();
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch data' }) };
    }
  }

  if (event.httpMethod === 'POST') {
    try {
      const response = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: event.body,
      });
      const data = await response.json();
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to update data' }) };
    }
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};
