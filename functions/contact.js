const axios = require('axios');
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

exports.handler = async (event) => {
  try {
    const { email, mailing_list_id } = JSON.parse(event.body);

    console.log("contact function ran");

    // Use the SendGrid API to add the email to the mailing list
    const sendGridResponse = await axios.post(
      'https://api.sendgrid.com/v3/marketing/contacts',
      {
        list_ids: [mailing_list_id],
        contacts: [{ email }],
      },
      {
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('SendGrid Response:', sendGridResponse.data);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Successfully added to mailing list' }),
    };
  } catch (error) {
    console.error('Error submitting form:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};