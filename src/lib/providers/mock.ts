export async function submitMock(email: string): Promise<{ success: boolean; error?: string }> {
  console.log(`[mock] Waitlist submission: ${email}`);
  return { success: true };
}
