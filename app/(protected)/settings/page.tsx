import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import SettingsForm from "./SettingsForm";

/**
 * SettingsPage — lets the user connect Telegram for renewal reminders.
 * Args: none (server component; reads the session user's saved chat ID).
 * Returns: settings page JSX.
 */
export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { telegramChatId: true, telegramEnabled: true },
  });

  return (
    <section className="max-w-md">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="mt-4 text-gray-500 text-sm">
        <p>To get reminders on Telegram:</p>
        <ol className="list-decimal ml-5 mt-1 space-y-1">
          <li>Search for the bot on Telegram and send it any message.</li>
          <li>Message @userinfobot — it replies with your numeric Telegram ID.</li>
          <li>Paste that number below.</li>
        </ol>
      </div>

      <div className="mt-6">
        <SettingsForm defaultChatId={user?.telegramChatId ?? null} defaultEnabled={user?.telegramEnabled ?? true} />
      </div>
    </section>
  );
}
