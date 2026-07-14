/**
 * DocsPage — in-app documentation explaining the project and its features.
 * Args: none (static content, no data fetching).
 * Returns: documentation page JSX.
 */
export default function DocsPage() {
  return (
    <section className="max-w-2xl">
      <h1 className="text-2xl font-bold">Documentation</h1>

      <div className="mt-4">
        <h2 className="font-semibold">What this app does</h2>
        <p className="text-gray-500 mt-1">
          Tracks your recurring subscriptions (Netflix, Spotify, software tools, etc.) in one place.
          You see what's active, what's expiring soon, and get emailed before something renews —
          so nothing charges you by surprise.
        </p>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold">Features</h2>
        <ul className="mt-2 space-y-2">
          <li>
            <strong>Subscriptions</strong> — add, edit, delete your subscriptions. Each one tracks
            price, billing cycle, renewal date, and more (see field reference below).
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
            <strong>Reminder emails</strong> — a daily scheduled check emails you when a subscription
            enters its reminder window, so you never get charged without warning.
          </li>
          <li>
            <strong>Vendor link</strong> — jump straight to the vendor's site (e.g. netflix.com/account)
            to actually manage or cancel a subscription.
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold">Subscription fields</h2>
        <dl className="mt-2 divide-y border-t">
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
            <dd className="text-gray-500">How many days before the renewal date you want an email reminder. Default: 7.</dd>
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
      </div>
    </section>
  );
}
