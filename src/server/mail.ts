/**
 * Sends a verification code email via the Resend API.
 * Matches Go: resendMailService.SendVerifyCode
 */
export async function sendVerifyCode(email: string, code: string, lang: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY not configured')

  const isZh = lang === 'zh' || lang === 'zh-CN' || lang === 'zh-TW'
  const subject = isZh ? 'Athena 验证码' : 'Athena Verify Code'
  const greeting = isZh ? '您的验证码是：' : 'Your verification code is:'
  const footer = isZh
    ? '此验证码将在 10 分钟后过期。如果您没有请求此验证码，请忽略此邮件。'
    : 'This code will expire in 10 minutes. If you did not request this code, please ignore this email.'

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
    <h1 style="color: white; margin: 0;">Athena</h1>
  </div>
  <div style="padding: 20px; background: #f9f9f9; border-radius: 10px;">
    <p style="font-size: 16px; color: #333;">${greeting}</p>
    <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #667eea;">${code}</span>
    </div>
    <p style="font-size: 14px; color: #666;">${footer}</p>
  </div>
</body>
</html>`

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'athena@no-reply.annatarhe.com',
      to: [email],
      subject,
      html,
    }),
  })

  if (!resp.ok) {
    const body = await resp.text()
    throw new Error(`Resend API error (status ${resp.status}): ${body}`)
  }
}
