import { Resend } from 'resend'

interface ContactBody {
  name?: string
  email?: string
  message?: string
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default defineEventHandler(async (event) => {
  const { resendApiKey, contactToEmail } = useRuntimeConfig(event)

  if (!resendApiKey || !contactToEmail) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Contact form is not configured yet.',
    })
  }

  const body = await readBody<ContactBody>(event)
  const name = body?.name?.trim()
  const email = body?.email?.trim()
  const message = body?.message?.trim()

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Name, email, and message are required.' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Please provide a valid email address.' })
  }

  const resend = new Resend(resendApiKey)

  const { error } = await resend.emails.send({
    from: 'Portfolio contact form <onboarding@resend.dev>',
    to: contactToEmail,
    replyTo: email,
    subject: `New project inquiry from ${name}`,
    html: `
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    `,
  })

  if (error) {
    throw createError({ statusCode: 502, statusMessage: 'Failed to send message. Please try again.' })
  }

  return { success: true }
})
