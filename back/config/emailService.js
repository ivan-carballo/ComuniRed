import dotenv from 'dotenv';
import Mailjet from 'node-mailjet';
dotenv.config();

// https://app.mailjet.com/account/apikeys
const apiKey = '4f9935f315b5d9cdb36645e5c31a0f7b'
const secretKey = 'e18f8d62f5f50f6326d516590f0c45bb'


.connect('****************************1234', '****************************abcd')
const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": "79.umaru@gmail.com",
        "Name": "Lacko"
      },
      "To": [
        {
          "Email": "79.umaru@gmail.com",
          "Name": "Lacko"
        }
      ],
      "Subject": "Greetings from Mailjet.",
      "TextPart": "My first Mailjet email",
      "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
      "CustomID": "AppGettingStartedTest"
    }
  ]
})
request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err.statusCode)
  })
