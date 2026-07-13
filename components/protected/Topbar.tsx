import UserMenu from "./UserMenu";

type TopbarProps = {
  name: string | null | undefined;
  email: string | null | undefined;
};

export default function Topbar({ name, email }: TopbarProps) {
  return (
    <header className="flex items-center justify-end border-b px-6 py-4">
      <UserMenu name={name} email={email} />
    </header>
  );
}
