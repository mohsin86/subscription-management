import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

/**
 * DocsPage — in-app documentation explaining the project and its features.
 * Args: none (static content, no data fetching).
 * Returns: documentation page JSX with tabbed sections.
 */
export default function DocsPage() {
  return (
    <section className="max-w-2xl">
      <h1 className="text-2xl font-bold">Documentation</h1>

      <p className="text-gray-500 mt-2">
        Tracks your recurring subscriptions (Netflix, Spotify, software tools, etc.) in one place.
        You see what's active, what's expiring soon, and get notified before something renews —
        so nothing charges you by surprise.
      </p>

      <Tabs defaultValue="features" className="mt-6">
        <TabsList className="h-11">
          <TabsTrigger value="features" className="text-base px-4 py-2">Features</TabsTrigger>
          <TabsTrigger value="notifications" className="text-base px-4 py-2">Notifications</TabsTrigger>
          <TabsTrigger value="fields" className="text-base px-4 py-2">Subscription fields</TabsTrigger>
        </TabsList>


        <TabsContent value="features" className="mt-4">
          <ul className="space-y-2">
            <li>
              <strong>Subscriptions</strong> — add, edit, delete your subscriptions. Each one tracks
              price, billing cycle, renewal date, and more (see the Fields tab).
            </li>
            <li>
              <strong>Dashboard</strong> — total monthly and yearly spend, grouped by currency, plus
              a quick list of every active subscription.
            </li>
            <li>
              <strong>Status</strong> — every subscription shows as <em>Active</em>, <em>Renewing soon</em>,
              or <em>Expired</em>, calculated automatically from its renewal date.
            </li>
            <li>
              <strong>Vendor link</strong> — jump straight to the vendor's site (e.g. netflix.com/account)
              to actually manage or cancel a subscription.
            </li>
          </ul>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <div>
            <h3 className="font-medium text-sm">Email (automatic — nothing to set up)</h3>
            <p className="text-gray-500 mt-1">
              Reminders are sent automatically to your account's login email. Set "Remind me
              (days before renewal)" on each subscription to control the timing (default 7 days).
            </p>
          </div>

         
          <div className="mt-4">
            <h3 className="font-medium text-sm">Telegram (optional, 3 steps)</h3>
            
            <div className="mt-3 space-y-4">
              <div className="flex gap-4 items-start">
                <div className="shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-sm font-semibold">1</div>
                <div className="flex-1">
                  <p className="text-gray-500">
                    Open{" "}
                    <a href="https://t.me/Subscriptions_notification_bot" target="_blank" rel="noopener noreferrer" className="underline">
                      t.me/Subscriptions_notification_bot
                    </a>{" "}
                    and tap <strong>Start</strong> — this lets the bot message you in this chat when a subscription renewal is near (Telegram only allows a bot to message users who've messaged it first).
                  </p>

                  <div className="mt-2 border rounded-md p-3 bg-gray-50 max-w-xs">
                    <div className="border rounded px-2 py-1 text-xs text-gray-400 bg-white">🔍 Subscriptions_notification_bot</div>
                    <div className="mt-2 flex justify-end">
                      <div className="bg-blue-500 text-white text-xs rounded-lg px-3 py-1.5">Start</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-sm font-semibold">2</div>
                <div className="flex-1">
                  <p className="text-gray-500">
                    Open{" "}
                    <a href="https://t.me/userinfobot" target="_blank" rel="noopener noreferrer" className="underline">
                      t.me/userinfobot
                    </a>{" "}
                    and tap <strong>Start</strong> — it replies with your numeric Telegram ID, which is what tells the reminder bot where to send your messages. It's a separate one-time lookup tool; you won't need to message it again.
                  </p>

                  <div className="mt-2 border rounded-md p-3 bg-gray-50 max-w-xs">
                    <div className="flex justify-end">
                      <div className="bg-blue-500 text-white text-xs rounded-lg px-3 py-1.5">Start</div>
                    </div>
                    <div className="mt-2 flex justify-start">
                      <div className="bg-white border text-xs rounded-lg px-3 py-1.5">Id: <strong>123456789</strong></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-sm font-semibold">3</div>
                <div className="flex-1">
                  <p className="text-gray-500">
                    Go to <strong>Settings</strong>, paste that number into "Telegram Chat ID", and click Save.
                  </p>
                  <div className="mt-2 border rounded-md p-3 bg-gray-50 max-w-xs">
                    <label className="text-xs text-gray-500">Telegram Chat ID</label>
                    <div className="mt-1 border rounded px-2 py-1 text-xs bg-white">123456789</div>
                    <div className="mt-2 inline-block border rounded px-3 py-1 text-xs bg-zinc-900 text-white">Save</div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-500 mt-4">
              That's it — you'll now get both an email and a Telegram message before each subscription renews.
            </p>

            
          </div>
        </TabsContent>

        <TabsContent value="fields" className="mt-4">
          <dl className="divide-y border-t">
            <div className="py-2">
              <dt className="font-medium">Name</dt>
              <dd className="text-gray-500">What it's called — e.g. "Netflix", "Figma".</dd>
            </div>
            <div className="py-2">
              <dt className="font-medium">Category</dt>
              <dd className="text-gray-500">A label to group similar subscriptions — e.g. "Streaming", "Software".</dd>
            </div>
            <div className="py-2">
              <dt className="font-medium">Price</dt>
              <dd className="text-gray-500">Cost per billing cycle.</dd>
            </div>
            <div className="py-2">
              <dt className="font-medium">Currency</dt>
              <dd className="text-gray-500">Currency of the price — e.g. "USD". Dashboard totals are grouped by this.</dd>
            </div>
            <div className="py-2">
              <dt className="font-medium">Billing cycle</dt>
              <dd className="text-gray-500">How often it charges — Monthly or Yearly.</dd>
            </div>
            <div className="py-2">
              <dt className="font-medium">Renewal date</dt>
              <dd className="text-gray-500">The next date it renews/charges. Everything (status, reminders) is calculated from this.</dd>
            </div>
            <div className="py-2">
              <dt className="font-medium">Auto-renew</dt>
              <dd className="text-gray-500">Whether it renews on its own without you doing anything.</dd>
            </div>
            <div className="py-2">
              <dt className="font-medium">Remind me (days before renewal)</dt>
              <dd className="text-gray-500">How many days before the renewal date you want a reminder. Default: 7.</dd>
            </div>
            <div className="py-2">
              <dt className="font-medium">Vendor URL</dt>
              <dd className="text-gray-500">Optional link to the vendor's account/management page, for quick access.</dd>
            </div>
            <div className="py-2">
              <dt className="font-medium">Notes</dt>
              <dd className="text-gray-500">Optional free text for anything else worth remembering about it.</dd>
            </div>
          </dl>
        </TabsContent>
      </Tabs>
    </section>
  );
}
