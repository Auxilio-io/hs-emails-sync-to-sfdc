const hubspot = require('@hubspot/api-client');
const token = process.env.HS_EMAILS_TO_SFDC

exports.main = async (event, callback) => {

  const contactId = event.inputFields['hs_object_id'];
  const url = event.inputFields['url'];
  const emailLastSendDate = event.inputFields['hs_email_last_send_date'];
  const emailbodyPlaintext = event.inputFields['emailbodyPlaintext'];
  const subject = event.inputFields['subject'];
  //*** Below is where you can change the body of the task
  const taskBody =`This is the URL to view the email: ${url} |---------------> This is the text of the email: ${emailbodyPlaintext}`
  // *** Above is where you can change the body of the task

  const hubspotClient = new hubspot.Client({"accessToken":token});

  const properties = {
    "hs_timestamp": emailLastSendDate,
    "hs_task_body": taskBody,
    "hubspot_owner_id": "309767323", // this is the SFDC integration user id
    "hs_task_subject": subject,
    "hs_task_status": "COMPLETED",
    "hs_task_type" : "EMAIL"
  };
  const SimplePublicObjectInputForCreate = { properties };

  try {
    const apiResponse = await hubspotClient.crm.objects.tasks.basicApi.create(SimplePublicObjectInputForCreate);
    const taskId = apiResponse.id
    console.log(taskId)
    callback({
      outputFields: {
        taskId: taskId
      }
    });
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
    : console.error(e)
  }



}