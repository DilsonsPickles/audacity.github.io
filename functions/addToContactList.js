const axios = require("axios");
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const handler = async (event, context) => {
  try {
    const requestBody = JSON.parse(event.body);
    console.log(requestBody);

    const { email } = requestBody;

    const data = {
      list_ids: ["fbbe4b78-46d9-4e9b-b3cf-e40a56fbab3f"],
      contacts: [
        {
          email: email,
        },
      ],
    };

    const request = {
      url: "https://api.sendgrid.com/v3/marketing/contacts",
      method: "PUT",
      body: data,
      timeout: 10000,
    };

    // Use async/await with try-catch for better error handling
    const [response, body] = await client.request(request);

    console.log(response.statusCode);
    console.log(response.body);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://audacity-test.netlify.app',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: "User added to contact list successfully",
    };
  } catch (error) {
    console.error("Error adding user to contact list:", error);

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': 'https://audacity-test.netlify.app',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: "Internal Server Error",
    };
  }
};

module.exports = {
  handler,
};
