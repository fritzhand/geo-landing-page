export async function submitResend(email: string): Promise<{ success: boolean; error?: string }> {
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[resend] RESEND_API_KEY not set');
    return { success: false, error: 'Email service not configured.' };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: import.meta.env.RESEND_FROM || 'onboarding@resend.dev',
        to: email,
        subject: 'Welcome to the waitlist!',
        html: '<p>Thanks for joining our waitlist! We\'ll keep you updated on our progress.</p>',
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error('[resend] API error:', body);
      return { success: false, error: 'Failed to send confirmation email.' };
    }

    return { success: true };
  } catch (err) {
    console.error('[resend] Network error:', err);
    return { success: false, error: 'Email service unavailable.' };
  }
}
