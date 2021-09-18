const { NotFound, BadRequest } = require('http-errors')

const { User } = require('../../model')
const { sendMail } = require('../../utils')

const sendLinkToVerifyUserEmail = async (req, res) => {
  const { email } = req.body

  if (!email) {
    throw new BadRequest('Email is required')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new NotFound('Not found')
  }

  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }

  const msg = {
    to: email,
    subject: 'Confirm registration on the site',
    html: `<a href="http://localhost:3000/api/users/verify/${user.verifyToken}">Confirm registration</a>`,
  }

  await sendMail(msg)

  res.json({ message: 'Verification email sent' })
}

module.exports = sendLinkToVerifyUserEmail
