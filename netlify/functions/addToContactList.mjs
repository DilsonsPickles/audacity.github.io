const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    // Ensure the request method is POST
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: 'Method Not Allowed',
      };
    }

    // Parse the incoming JSON data
    const data = JSON.parse(event.body);

    // Ensure required field (email) is present in the request body
    if (!data.email) {
      return {
        statusCode: 400,
        body: 'Missing required field: email',
      };
    }

    // Set SendGrid API key
    const apiKey = process.env.SENDGRID_API_KEY;

    // Replace 'your-list-id' with your actual SendGrid contact list ID
    const listId = 'fbbe4b78-46d9-4e9b-b3cf-e40a56fbab3f';

    // SendGrid API endpoint for adding a contact to a list
    const apiUrl = `https://api.sendgrid.com/v3/marketing/contacts`;

    // Compose the request payload
    const payload = {
      list_ids: [listId],
      contacts: [
        {
          email: data.email,
        },
      ],
    };

    // Send the request to SendGrid API
    const response = await axios.post(apiUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    });

    // Check if the request was successful
    if (response.status === 201) {
      return {
        statusCode: 200,
        body: `User with email ${data.email} added to the contact list successfully!`,
      };
    } else {
      console.error('Error adding user to contact list:', response.data);
      return {
        statusCode: response.status,
        body: 'Failed to add user to the contact list',
      };
    }
  } catch (error) {
    console.error('Error adding user to contact list:', error);

    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};
