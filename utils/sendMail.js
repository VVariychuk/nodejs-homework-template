const { InternalServerError } = require('http-errors')
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendMail = async (data) => {
  try {
    await sgMail.send({ ...data, from: 'v.variychuk.90@gmail.com' })
  } catch (error) {
    throw new InternalServerError(error.message)
  }
}

module.exports = sendMail
