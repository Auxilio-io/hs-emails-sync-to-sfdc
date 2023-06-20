//use this in a contact workflow with the trigger "Last marketing email name is known" ans re-enrollment set to "ON"

const axios = require('axios')
const accessToken = process.env.OPS_TOKEN

exports.main = async (event, callback) => {
  // get last email campaign id
  // use this endpoint: GET https://api.hubapi.com/email/public/v1/events?recipent=lchausse@auxilio.io see doc: https://legacydocs.hubspot.com/docs/methods/email/get_events?_ga=2.248456007.1708526602.1683726259-445457235.1683726259&_gl=1*14mbczk*_ga*NDQ1NDU3MjM1LjE2ODM3MjYyNTk.*_ga_LXTM6CQ0XK*MTY4MzcyNjI1OC4xLjAuMTY4MzcyNjI1OC4wLjAuMA..

  // get preview link
  axios.get('https://api.hubapi.com/marketing-emails/v1/emails/40930142514', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
})
.then((res) => {

  const id = res.data.id 
  const previewKey = res.data.previewKey
  const portalId = res.data.portalId

  console.log(`https://${portalId}.hubspotpreview-na1.com/_hcms/preview/email/${id}?portalId=${portalId}&preview_key=${previewKey}&_preview=true&from_buffer=false&cacheBust=0`)
})
.catch((error) => {
  console.error(error)
})


  callback({
    outputFields: {
    }
  });
}