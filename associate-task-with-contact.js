const axios = require("axios")
const token = process.env.HS_EMAILS_TO_SFDC

exports.main = async (event, callback) => {

  const contactId = event.inputFields['hs_object_id'];
  const taskId = event.inputFields['taskId'];

  async function associate() {

    var fromObjectType = "contacts"
    var fromObjectId = contactId
    var toObjectType = "tasks"
    var toObjectId = taskId

    console.log(`trying to associate ${fromObjectType} of id ${fromObjectId} with ${toObjectType} of id ${toObjectId}...`)

    const options = {
      method: 'PUT',
      url: `https://api.hubapi.com/crm/v4/objects/${fromObjectType}/${fromObjectId}/associations/default/${toObjectType}/${toObjectId}`,
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'authorization': `Bearer ${token}`
      }
    };

    try {
      const response = await axios(options);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //exexute associate() function
  associate()
    .then(association => {
    console.log(association.status);
    console.log(association.results[0]);
  })
    .catch(error => {
    console.error(error);
  });

  callback({
    outputFields: {
    }
  });
}