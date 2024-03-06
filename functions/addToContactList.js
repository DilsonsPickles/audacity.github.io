const axios = require("axios");
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const handler = async (event, context) => {
  try {
    const requestBody = JSON.parse(event.body);

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
    };

    client
      .request(request)
      .then(([response, body]) => {
        console.log(response.statusCode);
        console.log(response.body);
      })
      .catch((error) => {
        console.error(error);
      });

    return {
      statusCode: 200,
      body: "User added to contact list successfully",
    };
  } catch (error) {
    console.error("Error adding user to contact list:", error);
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
};

module.exports = {
  handler,
};
