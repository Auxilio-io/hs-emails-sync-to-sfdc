// to view all commits view original repo: https://github.com/Auxilio-io/hubspot-custom-coded-actions-private/blob/main/get-data-such-as-url-and-the-preview-link-of-the-last-marketing-email-sent-to-a-contact.js

const axios = require('axios')
const accessToken = process.env.HS_EMAILS_TO_SFDC

exports.main = async (event, callback) => {

  const emailName = event.inputFields['hs_email_last_email_name'];

  //define getEmailbyName() function - see doc: https://legacydocs.hubspot.com/docs/methods/cms_email/get-all-marketing-emails

  async function getEmailbyName(name) {

    const options = {
      method: 'GET',
      url: `https://api.hubapi.com/marketing-emails/v1/emails?name__eq=${name}&limit=300`,
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'authorization': `Bearer ${accessToken}`
      }
    };

    try {
      const response = await axios(options);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }

  }

  //execute function
  const name = encodeURIComponent(emailName)
  getEmailbyName(name)
    .then(emailDetails => {
    const emailbodyPlaintext = emailDetails.objects[0].emailbodyPlaintext
    const subject = emailDetails.objects[0].subject
    const url = emailDetails.objects[0].url 
    const id = emailDetails.objects[0].id 
    const previewKey = emailDetails.objects[0].previewKey
    const portalId = emailDetails.objects[0].portalId
    callback({
      outputFields: {
        subject: subject,
        url: url,
        emailbodyPlaintext: emailbodyPlaintext
      }
    });
    console.log(subject)
    console.log(emailbodyPlaintext)
    console.log(url) //public url accessible by anyone - web version must be enabled in the email settings
    console.log(`https://${portalId}.hubspotpreview-na1.com/_hcms/preview/email/${id}?portalId=${portalId}&preview_key=${previewKey}&_preview=true&from_buffer=false&cacheBust=0`) //private preview link accessible only by users loggued into the HubSpot portal
  })
    .catch(error => {
    console.error(error);
  });

}