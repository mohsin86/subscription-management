/**
 * sendTelegramMessage — sends a text message to a Telegram chat via the Bot API.
 * Args: chatId (string), text (string). Returns: Promise<boolean> — true if Telegram accepted it.
 */
export async function sendTelegramMessage(chatId: string, text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return false;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  return res.ok;
}
