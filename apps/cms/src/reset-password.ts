import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

const run = async () => {
  const payload = await getPayload({ config })

  const email = 'morasapreethi143@gmail.com' // the email you signed up with
  const newPassword = 'ChangeMe123!'   // pick anything you'll remember — change after login if you like

  const { docs } = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
  })

  if (!docs.length) {
    console.log('No user found with that email. Double-check the address and try again.')
    process.exit(1)
  }

  await payload.update({
    collection: 'users',
    id: docs[0].id,
    data: { password: newPassword },
  })

  console.log(`Password reset. Log in with: ${email} / ${newPassword}`)
  process.exit(0)
}

run()