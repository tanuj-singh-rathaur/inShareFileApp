const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const send = (to, subject, text, html) => {
  sgMail.send({
    to,
    from: 'sameersinghrathour635@gmail.com',
    subject,
    text,
    html
  }).then(() => {
    console.log('Email sent successfuly')
  })
    .catch((error) => {
      console.error(error)
    })
}



module.exports = send