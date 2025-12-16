const LAST_UPDATED = "December 16, 2025";

export default function SimpleTimePrivacyEN() {
  return (
    <main className="section">
      <div className="container max-w-3xl">
        <h1 className="h1">SimpleTime – Privacy Policy</h1>
        <p className="muted mt-2">Last updated: {LAST_UPDATED}</p>

        <p className="mt-6">
          SimpleTime does not collect personal data, does not require accounts,
          and does not track users.
        </p>

        <p className="mt-4">
          Any data entered into the app remains on your device unless explicitly
          shared by you.
        </p>

        <p className="mt-4">
          For questions, contact{" "}
          <a className="underline" href="mailto:contact@lacodea.com">
            contact@lacodea.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
