export async function submitSheets(email: string): Promise<{ success: boolean; error?: string }> {
  const webhookUrl = import.meta.env.SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('[sheets] SHEETS_WEBHOOK_URL not set');
    return { success: false, error: 'Form service not configured.' };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      console.error('[sheets] Webhook error:', res.status);
      return { success: false, error: 'Failed to save submission.' };
    }

    return { success: true };
  } catch (err) {
    console.error('[sheets] Network error:', err);
    return { success: false, error: 'Form service unavailable.' };
  }
}
